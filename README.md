# LipariBank Dashboard - Day 2 - Fix Mission

Benvenuto al secondo progetto di debugging! Questo sprint si concentra su **componenti, props, state e lifecycle**. Troverai 3 bug legati all'uso scorretto di `useState`, `useEffect` e closures nelle callback.

---

## Come avviare

```bash
npm install
npm run dev
```

L'applicazione sarà disponibile su [http://localhost:5173](http://localhost:5173).

---

## Le tue 3 missioni

### Missione 1 — Freeze del browser o rallentamento estremo

Appena apri la pagina Dashboard, il browser si blocca o diventa irresponsivo. La scheda di DevTools mostra una quantità abnorme di render in pochi secondi. La sezione "Movimenti Recenti" è l'indiziata principale.

Individua il ciclo infinito che causa il problema e correggi la causa radice.

### Missione 2 — Il saldo non si aggiorna

Il saldo visualizzato nel componente `AccountBalanceCard` non cambia mai, anche se aprendo React DevTools puoi vedere che il componente padre (`DashboardPage`) aggiorna correttamente la prop `balance` ogni pochi secondi.

Il componente `AccountBalanceCard` mostra sempre il valore iniziale. Trova perché lo state interno non riflette le prop aggiornate e correggi il problema.

### Missione 3 — Contatore di operazioni impazzito

Nella card del conto corrente ci sono i pulsanti "+ Aggiungi operazione" e "− Rimuovi operazione". Cliccando rapidamente più volte di seguito sui pulsanti, il contatore mostra valori inattesi: salta numeri, va in negativo quando non dovrebbe, o non si aggiorna correttamente.

Il problema si manifesta chiaramente con 3 o più click rapidi in successione. Individua il motivo per cui gli aggiornamenti di stato vengono "persi" e applica la correzione corretta.

---

## Strumenti consigliati

- **React DevTools — Profiler** — per visualizzare la frequenza dei re-render
- **React DevTools — Components** — per ispezionare props e state in tempo reale
- **Browser DevTools — Console** — per messaggi di errore e warning
- **ESLint** — `npm run lint` per warning sui React Hooks

---

## Bonus Mission — Feature da Implementare (opzionale, ~1 ora)

Una volta risolti i 3 bug, aggiungi un componente `OperationHistory` che mostra le ultime 5 operazioni eseguite (deposito/prelievo simulato) con tipo, importo e timestamp.

### Requisiti

- La lista usa `useState` come array FIFO di massimo 5 elementi
- Aggiungi due pulsanti (**Deposita €100** / **Preleva €100**) che aggiornano il saldo e inseriscono la voce nello storico tramite props e callback, senza usare Context
- Un `useEffect` logga in console ogni aggiornamento dello storico

### Criteri di accettazione

- [ ] Cliccando i pulsanti, il saldo si aggiorna e la voce appare nello storico
- [ ] Lo storico non supera mai 5 voci (FIFO: la voce più vecchia viene rimossa)
- [ ] Ogni voce mostra tipo, importo e timestamp formattati con `toLocaleString`
- [ ] Il `useEffect` di log si attiva solo quando cambia lo storico (dependency array corretto)
- [ ] Nessun bug risolto in precedenza viene reintrodotto
