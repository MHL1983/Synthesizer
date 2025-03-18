// Inicializa el contexto de audio para generar sonidos en el navegador
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Obtiene los elementos del DOM que controlan los parámetros ADSR y el volumen
const attackControl = document.getElementById('attack');
const decayControl = document.getElementById('decay');
const sustainControl = document.getElementById('sustain');
const releaseControl = document.getElementById('release');
const volumeControl = document.getElementById('volume');

// Permite al usuario seleccionar la forma de onda del oscilador
const waveformSelect = document.getElementById('waveform');

// Selector de octava, Permite al usuario ajustar la octava de las notas a reproducir
const octaveSelect = document.getElementById('octave');

// Selector de polifonía, Controla cuántas notas pueden reproducirse simultáneamente
const polyphonySelect = document.getElementById('polyphony');

// Mapeo de notas a frecuencias (afinación estándar), Asocia cada nota musical con su frecuencia correspondiente en Hz
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

// Mapeo de teclas del teclado a notas, relaciona las teclas del teclado físico con las notas musicales
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

// Conjunto para almacenar las teclas presionadas, evita que se reproduzcan múltiples instancias de la misma nota si una tecla se mantiene presionada
const pressedKeys = new Set();

// Variables para la grabación
let mediaRecorder;
let audioChunks = [];
let isRecording = false;

// Obtener el botón de grabación
const recordButton = document.getElementById('recordButton');

// Crear un nodo de destino para la grabación
const destination = audioContext.createMediaStreamDestination();
const gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);
gainNode.connect(destination);

// Función para comenzar o detener la grabación
recordButton.addEventListener('click', async () => {
    if (!isRecording) {
        // Comenzar grabación
        audioChunks = [];
        const stream = destination.stream;
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const a = document.createElement('a');
            a.href = audioUrl;
            a.download = 'grabacion.wav';
            a.click();
            URL.revokeObjectURL(audioUrl);
        };

        mediaRecorder.start();
        isRecording = true;
        recordButton.textContent = 'Stop';
    } else {
        // Detener grabación
        mediaRecorder.stop();
        isRecording = false;
        recordButton.textContent = 'Start';
    }
});

// Escuchar eventos de teclado, detecta cuando una tecla es presionada, reproduce la nota correspondiente y resalta visualmente la tecla.
document.addEventListener('keydown', (event) => {
    const note = keyboardMap[event.code];
    if (note && !pressedKeys.has(event.code)) {
        pressedKeys.add(event.code);
        const frequency = noteFrequencies[note];
        playNoteWithFrequency(frequency);
        const keyElement = document.querySelector(`[data-note="${note}"]`);
        if (keyElement) {
            keyElement.classList.add('active');
        }
    }
});

// Detecta cuando una tecla es liberada, detiene la reproducción de la nota y elimina el resaltado visual
document.addEventListener('keyup', (event) => {
    const note = keyboardMap[event.code];
    if (note) {
        pressedKeys.delete(event.code);
        const keyElement = document.querySelector(`[data-note="${note}"]`);
        if (keyElement) {
            keyElement.classList.remove('active');
        }
    }
});

// Maneja la interacción del teclado físico para reproducir notas y actualizar la interfaz gráfica
const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('mousedown', () => playNoteWithFrequency(noteFrequencies[key.dataset.note]));
});

// Ajusta la frecuencia de la nota según la octava seleccionada y genera múltiples osciladores para los armónicos
function playNoteWithFrequency(frequency) {
    const octave = parseInt(octaveSelect.value);
    const polyphony = parseInt(polyphonySelect.value);

    // Calcula la frecuencia base ajustada por la octava
    const baseFrequency = frequency * Math.pow(2, octave - 4);

    // Genera osciladores para los armónicos
    for (let i = 1; i <= polyphony; i++) {
        const harmonicFrequency = baseFrequency * i; // Múltiplo entero de la frecuencia fundamental
        playOscillator(harmonicFrequency);
    }
}

// Crea un oscilador con la forma de onda seleccionada, aplica el envelope ADSR y reproduce la nota
function playOscillator(frequency) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.type = waveformSelect.value || 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNode.connect(destination); // Conectar al destino de la grabación

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

// Alterna la visibilidad de los controles de configuración
function toggleControls() {
    const controls = document.querySelector('.controls');
    controls.classList.toggle('active');
}