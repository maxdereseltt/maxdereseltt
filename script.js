const CORRECT_PASSWORD = "FREEVBUCKS";
const TOTAL_DURATION_MS = 48 * 60 * 60 * 1000; // 48 Stunden in Millisekunden

// ===============================================================
// ELEMENTE ABFRAGEN
// ===============================================================
const headline = document.getElementById('headline');
const statusMessage = document.getElementById('status-message');
const inputArea = document.getElementById('input-area');
const passwordInput = document.getElementById('passwordInput');
const unlockButton = document.getElementById('unlockButton');
const timerDisplay = document.getElementById('timer-display');
const timeRemainingSpan = document.getElementById('timeRemaining');
const contentArea = document.getElementById('content-area');
const lockButtonSecondary = document.getElementById('lockButtonSecondary');

// ===============================================================
// ZUSTANDSVERWALTUNG
// ===============================================================
let isLocked = true;

// Funktion zum Aktualisieren der Anzeige
function updateUI() {
    if (isLocked) {
        // Sperr-Zustand
        headline.style.color = '#ffffff';
        statusMessage.textContent = "SYSTEM GESPERRT – Bitte um Zugangscode eingeben.";
        inputArea.style.display = 'block';
        contentArea.style.display = 'none';

        // Timer-Anzeige aktualisieren
        const timeLeft = calculateTimeLeft();
        timeRemainingSpan.textContent = formatTime(timeLeft);

    } else {
        // Entsperrter Zustand
        headline.style.color = '#4CAF50';
        statusMessage.textContent = "System voll funktionsfähig.";
        inputArea.style.display = 'none';
        contentArea.style.display = 'block';
    }
}

// Funktion zur Berechnung der verbleibenden Zeit
function calculateTimeLeft() {
    // Hier simulieren wir den Zustand: Wir nehmen an, dass die Laufzeit gesichert ist, 
    // und wir aktualisieren einfach den Zähler.
    // In einem echten Szenario müssten Sie hier die Zeit seit dem Start auslesen.
    // Da es eine statische Seite ist, simulieren wir den Countdown:
    return TOTAL_DURATION_MS; 
}

// Funktion zur Formatierung der Zeit
function formatTime(milliseconds) {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours} Stunden, ${minutes} Minuten`;
    return `${minutes} Minuten und ${seconds} Sekunden`;
}

// ===============================================================
// EVENT HANDLER
// ===============================================================

// Funktion zum manuellen Entsperren durch Passwort
function handleUnlock() {
    const input = passwordInput.value.trim();
    if (input === CORRECT_PASSWORD) {
        isLocked = false;
        alert('Zugriff gewährt!');
        // Den Timer automatisch neu starten, um die Frist zu simulieren
        startTimer();
    } else {
        alert('❌ Falsches Passwort. Bitte versuchen Sie erneut.');
        // Bei falschem Passwort bleibt der Zustand gesperrt
    }
    updateUI();
}

// Funktion zum manuellen Sperren
function handleLock() {
    isLocked = true;
    updateUI();
}

// Timer-Funktion zur automatischen Entsperrung
function startTimer() {
    // Wir simulieren, dass der Timer läuft und nach 48h entsperrt.
    const timerInterval = setInterval(() => {
        const timeLeft = calculateTimeLeft();

        // Wenn die Zeit abgelaufen ist (Simulierte Logik)
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            isLocked = false;
            alert('⏰ Zeit abgelaufen! System automatisch entsperrt.');
            updateUI();
        } else {
            // Timer-Anzeige aktualisieren (wird durch updateUI übernommen)
            updateUI();
        }
    }, 1000); // Prüft jede Sekunde
}

// ===============================================================
// INITIALISIERUNG
// ===============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Event Listener einrichten
    unlockButton.addEventListener('click', handleUnlock);
    lockButtonSecondary.addEventListener('click', handleLock);

    // Tastendruck-Listener für schnelles Eingeben
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUnlock();
        }
    });

    // Initialen Zustand laden und Timer starten
    updateUI();
    startTimer(); 
});