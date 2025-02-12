const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Controladores de ADSR
const attackControl = document.getElementById('attack');
const decayControl = document.getElementById('decay');
const sustainControl = document.getElementById('sustain');
const releaseControl = document.getElementById('release');
const volumeControl = document.getElementById('volume');

// Selector de forma de onda
const waveformSelect = document.getElementById('waveform');

// Selector de octava
const octaveSelect = document.getElementById('octave');

// Selector de polifonía
const polyphonySelect = document.getElementById('polyphony');

// Mapeo de notas a frecuencias (afinación estándar)
const noteFrequencies = {
    'C4': 261.63,
    'C#4': 277.18,
    'D4': 293.66,
    'D#4': 311.13,
    'E4': 329.63,
    'F4': 349.23,
    'F#4': 369.99,
    'G4': 392.00,
    'G#4': 415.30,
    'A4': 440.00,
    'A#4': 466.16,
    'B4': 493.88,
    'C5': 523.25,
    'C#5': 554.37,
    'D5': 587.33,
    'D#5': 622.25,
    'E5': 659.25
};

// Mapeo de teclas del teclado a notas
const keyboardMap = {
    'KeyA': 'C4',
    'KeyW': 'C#4',
    'KeyS': 'D4',
    'KeyE': 'D#4',
    'KeyD': 'E4',
    'KeyF': 'F4',
    'KeyT': 'F#4',
    'KeyG': 'G4',
    'KeyY': 'G#4',
    'KeyH': 'A4',
    'KeyU': 'A#4',
    'KeyJ': 'B4',
    'KeyK': 'C5',
    'KeyO': 'C#5',
    'KeyL': 'D5',
    'KeyP': 'D#5',
    'keyÑ': 'E5',
};

// Conjunto para almacenar las teclas presionadas
const pressedKeys = new Set();

// Escuchar eventos de teclado
document.addEventListener('keydown', (event) => {
    const note = keyboardMap[event.code];
    if (note && !pressedKeys.has(event.code)) { // Evitar duplicados
        pressedKeys.add(event.code); // Agregar la tecla al conjunto
        const frequency = noteFrequencies[note];
        playNoteWithFrequency(frequency);
        // Resaltar la tecla correspondiente
        const keyElement = document.querySelector(`[data-note="${note}"]`);
        if (keyElement) {
            keyElement.classList.add('active');
        }
    }
});

document.addEventListener('keyup', (event) => {
    const note = keyboardMap[event.code];
    if (note) {
        pressedKeys.delete(event.code); // Eliminar la tecla del conjunto
        // Desactivar el resaltado de la tecla correspondiente
        const keyElement = document.querySelector(`[data-note="${note}"]`);
        if (keyElement) {
            keyElement.classList.remove('active');
        }
    }
});

const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('mousedown', () => playNoteWithFrequency(noteFrequencies[key.dataset.note]));
});

function playNoteWithFrequency(frequency) {
    const octave = parseInt(octaveSelect.value);
    const polyphony = parseInt(polyphonySelect.value);
    for (let i = 0; i < polyphony; i++) {
        const freqOffset = (i - Math.floor(polyphony / 2)) * 2; // Desplazamiento de frecuencia para polifonía
        playOscillator(frequency * Math.pow(2, octave - 4) + freqOffset);
    }
}

function playOscillator(frequency) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.type = waveformSelect.value || 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    const adsr = {
        attack: parseFloat(attackControl.value) || 0.1,
        decay: parseFloat(decayControl.value) || 0.2,
        sustain: parseFloat(sustainControl.value) || 0.2,
        release: parseFloat(releaseControl.value) || 0.1
    };
    const now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volumeControl.value, now + adsr.attack);
    gainNode.gain.linearRampToValueAtTime(adsr.sustain * volumeControl.value, now + adsr.attack + adsr.decay);
    gainNode.gain.setValueAtTime(adsr.sustain * volumeControl.value, now + adsr.attack + adsr.decay);
    oscillator.start(now);
    const sustainTime = 1;
    const releaseStart = now + adsr.attack + adsr.decay + sustainTime;
    gainNode.gain.linearRampToValueAtTime(0, releaseStart + adsr.release);
    oscillator.stop(releaseStart + adsr.release);
    return oscillator;
}

// Función para mostrar/ocultar controles
function toggleControls() {
    const controls = document.querySelector('.controls');
    controls.classList.toggle('active');
}

// Escuchar eventos de teclado
document.addEventListener('keydown', (event) => {
    const note = keyboardMap[event.code];
    if (note) {
        const frequency = noteFrequencies[note];
        playNoteWithFrequency(frequency);
        document.querySelector(`[data-note="${note}"]`).classList.add('active');
    }
});

document.addEventListener('keyup', (event) => {
    const note = keyboardMap[event.code];
    if (note) {
        document.querySelector(`[data-note="${note}"]`).classList.remove('active');
    }
});