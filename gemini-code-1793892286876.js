const express = require('express');
const Groq = require('groq-sdk');
const app = express();

app.use(express.json());
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Endpoint chiamato dall'app Android quando la chiamata si connette
app.post('/incoming-voice', async (req, res) => {
    const userText = req.body.text; // Testo convertito dall'STT dell'app/server

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            { 
                role: "system", 
                content: "Sei l'assistente vocale di Vocalis. Parla in italiano semplice e diretto. Massimo 2 frasi. Il tuo unico scopo è chiedere se puoi inviare una demo di 30 secondi su WhatsApp per gestire le prenotazioni del ristorante nei momenti di pieno carico." 
            },
            { role: "user", content: userText }
        ],
    });

    const aiReply = completion.choices[0]?.message?.content;
    
    // Ritorna la risposta di testo che l'app sul telefono leggerà con il TTS
    res.json({ reply: aiReply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Setter Webhook attivo su porta ${PORT}`));