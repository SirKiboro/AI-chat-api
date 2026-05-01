require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors()); // Allows external requests
app.use(express.json()); // Enables JSON parsing

app.get("/", (req, res) => {
    res.json({ status: "Server running" });
});

app.post("/chat", async (req, res) => {
    const { message } = req.body;

    // Validation
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        // External API Call to OpenAI
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o-mini",
                messages: [
                    { role: "user", content: message }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const reply = response.data.choices[0].message.content;
        res.json({ reply });

    } catch (error) {
        
        console.error("AI Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "AI request failed" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});