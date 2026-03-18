module.exports = {
  OLLAMA_URL: 'http://localhost:11434',
  QDRANT_URL: 'http://localhost:6333',

  COLLECTION_NAME: 'documents',

  EMBEDDING_MODEL: 'nomic-embed-text',

  CHUNK_SIZE: 800,
  CHUNK_OVERLAP: 100,

  TARGET_FOLDER: '../data/files'
}
