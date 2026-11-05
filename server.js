const express = require('express');
const googleTTS = require('google-tts-api');
const app = express();

app.use(express.json());

// Gestisce sia POST (da MacroDroid) che GET (per test da browser)
app.all('/incoming-voice', (req, res) => {
    const aiResponseText = "Pronto, buongiorno! Parlo con il titolare o il responsabile del ristorante? Vi chiamo per presentarvi Vocalis, il nostro assistente vocale con intelligenza artificiale che risponde automaticamente alle chiamate e gestisce le prenotazioni dei clienti su WhatsApp. Vi interesserebbe fare una prova gratuita?";

    try {
        const audioUrl = googleTTS.getAudioUrl(aiResponseText, {
            lang: 'it',
            slow: false,
            host: 'https://translate.google.com',
            timeout: 10000,
        });

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
