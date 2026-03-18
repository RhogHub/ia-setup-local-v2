const axios = require('axios')
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const { v4: uuid } = require('uuid')
const config = require('./config')

async function createCollection() {
  try {
    await axios.put(
      `${config.QDRANT_URL}/collections/${config.COLLECTION_NAME}`,
      {
        vectors: {
          size: 768,
          distance: "Cosine"
        }
      }
    )

    console.log('Collection criada/verificada')
  } catch (err) {
    console.log('Collection já existe ou erro ignorado')
  }
}

function chunkText(text) {
  const chunks = []
  const size = config.CHUNK_SIZE
  const overlap = config.CHUNK_OVERLAP

  for (let i = 0; i < text.length; i += size - overlap) {
    chunks.push(text.slice(i, i + size))
  }

  return chunks
}

async function generateEmbedding(text) {
  const res = await axios.post(
    `${config.OLLAMA_URL}/api/embeddings`,
    {
      model: config.EMBEDDING_MODEL,
      prompt: text
    }
  )

  return res.data.embedding
}

async function upsertPoints(points) {
  await axios.put(
    `${config.QDRANT_URL}/collections/${config.COLLECTION_NAME}/points`,
    {
      points
    }
  )
}

async function processFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8')

  const chunks = chunkText(content)

  const points = []

  for (const chunk of chunks) {
    const embedding = await generateEmbedding(chunk)

    points.push({
      id: uuid(),
      vector: embedding,
      payload: {
        text: chunk,
        source: filePath
      }
    })
  }

  await upsertPoints(points)

  console.log(`Indexado: ${filePath}`)
}

async function main() {
  await createCollection()

  const files = glob.sync(`${config.TARGET_FOLDER}/**/*.*`, {
    nodir: true
  })

  console.log(`Arquivos encontrados: ${files.length}`)

  for (const file of files) {
    await processFile(file)
  }

  console.log('Indexação concluída')
}

main()
