# AI Chat API (Groq + LLaMA 3.1)

A simple backend service that provides an AI-powered chat endpoint using the Groq API and LLaMA 3.1 model.

This project demonstrates:
- API design using Express
- Integration with an external LLM service
- Basic conversational memory handling

---

## Tech Stack

- Node.js
- Express
- Axios
- Groq API (LLaMA 3.1 model)

---

## Features

- `/chat` endpoint for AI interaction
- Maintains short conversation history (last 6 messages)
- Environment-based API key management
- Basic error handling

---

## Project Structure

.
├── index.js
├── package.json
├── .env
└── .gitignore


---

## Setup Instructions

### 1. Clone the repository

[https://github.com/SirKiboro/AI-chat-api.git](https://github.com/SirKiboro/AI-chat-api.git)

cd AI-chat-api


### 2. Install dependencies

npm install


### 4. Run the server

node index.js
   
---

## API Endpoints

### message:
     "Explain quantum computing in one sentence."

### reply:
     "Quantum computing is a revolutionary technology that uses the principles of quantum mechanics to perform complex calculations exponentially faster than classical computers by harnessing the power of superposition, entanglement, and interference."

### Run:
    Invoke-RestMethod -Uri http://localhost:3000/chat -Method Post -Body '{"message": "Hello AI"}' -ContentType "application/json"

### Response:
    Hello again. How can I assist you today?