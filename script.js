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
    'C': 261.63,
    'D': 293.66,
    'E': 329.63,
    'F': 349.23,
    'G': 392.00,
    'A': 440.00,
    'B': 493.88
};

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
        sustain: parseFloat(sustainControl.value) || 0.7,
        release: parseFloat(releaseControl.value) || 0.3
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
}