const express = require('express');
const app = express();

// Middleware per leggere il corpo delle richieste in formato JSON
app.use(express.json());

// Endpoint per gestire la chiamata e generare il pitch di Vocalis
app.post('/incoming-voice', (req, res) => {
    // Puoi leggere eventuali dati inviati da MacroDroid (es. il nome del contatto o del ristorante)
    const clientInput = req.body.text || "ristorante";
    
    console.log(`Chiamata ricevuta per il target: ${clientInput}`);

    // Testo di presentazione di Vocalis ottimizzato per i ristoranti
    const aiResponseText = "Pronto, buongiorno! Parlo con il titolare o il responsabile del ristorante? Vi chiamo per presentarvi Vocalis, il nostro assistente vocale con intelligenza artificiale che risponde automaticamente alle chiamate e gestisce le prenotazioni dei clienti su WhatsApp. Vi interesserebbe fare una prova gratuita di cinque minuti?";

    // Risposta JSON che MacroDroid catturerà e salverà nella variabile 'risposta_ai'
    res.json({
        status: "success",
        risposta_ai: aiResponseText
    });
});

// Porta di ascolto (Render assegna automaticamente la porta tramite process.env.PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Vocalis Setter in esecuzione sulla porta ${PORT}`);
});