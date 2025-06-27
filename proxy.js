require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const fetch   = require("node-fetch");

const app  = express();
const PORT = process.env.PORT || 3001;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { messages, temperature = 0.7 } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        temperature
      })
    });

    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al consultar OpenAI" });
  }
});

app.listen(PORT, () => console.log(`Proxy escuchando en http://localhost:${PORT}`));
