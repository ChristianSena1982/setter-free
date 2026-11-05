const express = require('express');
const app = express();

app.use(express.json());

app.all('/incoming-voice', (req, res) => {
    const aiResponseText = "Pronto, buongiorno! Parlo con il titolare o il responsabile del ristorante? Vi chiamo per presentarvi Vocalis, il nostro assistente vocale con intelligenza artificiale che risponde automaticamente alle chiamate e gestisce le prenotazioni dei clienti su WhatsApp. Vi interesserebbe fare una prova gratuita?";

    try {
        // Genera direttamente l'URL dell'audio Google Translate senza librerie esterne
        const encodedText = encodeURIComponent(aiResponseText);
        const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=it&client=tw-ob`;

        res.json({
            status: "success",
            risposta_ai: aiResponseText,
            audio_url: audioUrl
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server attivo sulla porta ${PORT}`);
});
