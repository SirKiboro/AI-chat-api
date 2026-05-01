require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allows external requests
app.use(express.json()); // Enables JSON parsing

let history = [
    { role: "system", content: "You are a helpful AI assistant running via the Groq Llama 3.1 model." }
]; 

app.get("/", (req, res) => {
    res.json({ status: "Server running" });
});

app.post("/chat", async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    history.push({ role: "user", content: message });

    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions", 
            {
                model: "llama-3.1-8b-instant", 
                messages: history.slice(-6) 
            },
            {
                headers: {
                
                    Authorization: `Bearer ${process.env.GROK_API_KEY}`, 
                    "Content-Type": "application/json"
                }
            }
        );

        const reply = response.data.choices[0].message.content;
        history.push({ role: "assistant", content: reply });
        res.json({ reply });

    } catch (error) {
        console.error("Groq API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "AI request failed" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});