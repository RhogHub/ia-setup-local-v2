# 🚀 Setup IA Local II

Projeto simples para rodar uma stack de IA local com suporte a GPU, chat interface e base para RAG (Retrieval-Augmented Generation).

---

## 🧠 Stack Utilizada

* **Ollama** → execução de modelos LLM local
* **OpenWebUI** → interface de chat
* **Qdrant** → vector database (memória semântica)
* **Redis** → cache e sessões
* **Docker Compose** → orquestração
* **WSL2 + NVIDIA GPU** → aceleração local

---

## ⚙️ Pré-requisitos

* Docker + Docker Compose
* WSL2 (Windows)
* GPU NVIDIA configurada (opcional, mas recomendado)

---

## 🚀 Subindo o ambiente

```bash
docker compose up -d
```

---

## 🌐 Acessos

* Chat UI: http://localhost:3000
* Qdrant Dashboard: http://localhost:6333/dashboard

---

## 🤖 Modelos

```bash
docker exec -it ollama ollama pull phi3
docker exec -it ollama ollama pull deepseek-coder:6.7b
docker exec -it ollama ollama pull nomic-embed-text
```

---

## 📦 Indexador (RAG)

Projeto inclui um indexador simples que:

* lê arquivos locais
* gera embeddings
* armazena no Qdrant

---

## 📂 Estrutura

```
data/
  ├── ollama/
  ├── openwebui/
  ├── qdrant/
  ├── redis/
  └── files/
```

---

## ⚡ Observações

* Tudo roda **100% offline** após download dos modelos
* Base para evolução com:

  * RAG
  * agentes
  * backend custom (Go/Node)

---

## 🧪 Comandos úteis

```bash
nvidia-smi
docker compose up -d
docker exec -it ollama bash
```

---

## 📌 Objetivo

Explorar IA local com foco em:

* privacidade
* performance
* arquitetura moderna

---
