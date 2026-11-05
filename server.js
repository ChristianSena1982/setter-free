const express = require('express');
const googleTTS = require('google-tts-api'); // Installa con: npm install google-tts-api
const app = express();

app.use(express.json());

app.post('/incoming-voice', (req, res) => {
    const textToSpeech = "Pronto, buongiorno! Parlo con il titolare del ristorante? Vi chiamo per presentarvi Vocalis, l'assistente vocale con intelligenza artificiale per le prenotazioni su WhatsApp. Vi interessa fare una prova gratuita?";

    // Genera l'URL dell'audio MP3 in italiano
    const audioUrl = googleTTS.getAudioUrl(textToSpeech, {
        lang: 'it',
        slow: false,
        host: 'https://translate.google.com',
        timeout: 10000,
    });

    res.json({
        status: "success",
        risposta_ai: textToSpeech,
        audio_url: audioUrl
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server attivo sulla porta ${PORT}`));
