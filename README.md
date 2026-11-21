# EX - React useRef Signup

<img src="public/favicon.svg" alt="React Context API icon" width="48" />

Esercizio di React su useRef e form, dal mio corso web dev (specializzazione Frontend).

## Sviluppo locale

Per avviare l'applicazione in locale, clonare il repository ed eseguire i seguenti comandi:

```bash
npm install
npm run dev
```

## Consegna

Crea un form di registrazione per una piattaforma dedicata ai giovani sviluppatori web, in cui gli utenti possano indicare le proprie competenze e specializzazioni.

### Milestone 1 — Creare un form con campi controllati

Crea un form di registrazione con i seguenti campi controllati, gestiti con `useState`:

- Nome completo: input di testo.
- Username: input di testo.
- Password: input di tipo password.
- Specializzazione: select con le opzioni "Full Stack", "Frontend" e "Backend".
- Anni di esperienza: input di tipo number.
- Breve descrizione sullo sviluppatore: textarea.

Al submit, verifica che tutti i campi siano compilati, che gli anni di esperienza siano un numero positivo e che sia stata selezionata una specializzazione.

Se il form è valido, stampa i dati in console.

### Milestone 2 — Validare in tempo reale

Aggiungi la validazione in tempo reale per i seguenti campi:

- Username: deve contenere almeno 6 caratteri, solo lettere e numeri, senza spazi o simboli.
- Password: deve contenere almeno 8 caratteri, di cui almeno una lettera, un numero e un simbolo.
- Descrizione: deve contenere tra 100 e 1000 caratteri, senza contare gli spazi iniziali e finali.

Per ciascuno di questi campi, mostra un messaggio di errore rosso quando il valore non è valido oppure un messaggio di conferma verde quando è valido.

Suggerimento: puoi definire tre stringhe con lettere, numeri e simboli e usare `.includes()` per verificare a quale categoria appartiene ciascun carattere.

### Milestone 3 — Convertire i campi non controllati

Analizza il form e identifica quali campi devono rimanere controllati e quali possono essere non controllati senza influire sull'interfaccia durante la compilazione.

Converti i campi che non richiedono aggiornamenti a ogni carattere usando `useRef()`, recuperandone il valore solo al submit.

Assicurati che anche i campi non controllati continuino a essere validati correttamente quando l'utente invia il form.

### Bonus — Migliorare l'usabilità

Usa `useRef()` per aggiungere le seguenti funzionalità:

- Porta automaticamente il focus sul primo input (Nome) al mount del componente.
- Aggiungi un bottone "Reset" in fondo al form: riporta i campi controllati ai valori iniziali e resetta manualmente quelli non controllati tramite i ref.
- Aggiungi una freccia fissa in basso a destra, con `position: fixed`, che al click riporti l'utente all'inizio del form.

## License

- [MIT](LICENSE.md)
