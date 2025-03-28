# Synthesizer
The **Synthesizer** is an innovative and interactive application that brings the power of a musical instrument to your fingertips. Designed with a focus on accessibility and usability, it offers a seamless and immersive sound creation experience. While optimized for mobile devices, it also serves as a versatile plugin for **DAWs (Digital Audio Workstations)**, making it a valuable tool for music production in any environment. Whether you're crafting melodies on the go or integrating it into your **DAW workflow**, the Synthesizer is designed to inspire creativity and elevate your musical projects.

## Key Features
### Interactive Virtual Keyboard
- **17 keys** (10 white and 7 black) representing the musical notes of a tenth or octave + a major third.
- The **white keys** correspond to natural notes (**C, D, E, F, G, A, B, C, D, E**).
- The **black keys** represent sharp notes (**C#, D#, F#, G#, A#, C#, D#**).

<img src="images/notation.png">

- Each key on the keyboard is mapped to a specific note.
- White keys: **A (C4), S (D4), D (E4), F (F4), G (G4), H (A4), J (B4), K (C5), L (D5)**.
- Black keys: **W (C#4), E (D#4), T (F#4), Y (G#4), U (A#4), O (C#5), P (D#5)**.

<img src="images/QWERTY_keyboard_diagram.svg">

### Sound Design
- **Waveform:** Choose from different waveforms (**Sine, Square, Triangle, and Sawtooth**).
- **Oscillator:** Creates rich and complex sound layers, allowing for multiple simultaneous harmonics.
- **Octave:** Selects the octave frequency of the sound.
- **ADSR:** Customizes the sound envelope parameters (**Attack, Decay, Sustain, and Release**).
- **Volume:** Adjusts the overall volume of the synthesizer.

<img src="images/waveforms.svg">
<img src="images/harmonics.svg">
<img src="images/octaves.svg">
<img src="images/ADSR.svg">

## Scales
A scale is an ordered sequence of notes within a specific range (usually an octave), following a pattern of intervals (distances between notes). Scales form the foundation of melody, harmony, and chords.

**Key elements:**
- **Tonic:** The root note that names the scale.
- **Intervals:** Steps (whole/half) between notes.
- **Degrees:** Numbered/tonal positions (e.g., I, II, III).

<img src="images/c-scales.svg">

## Chords
A chord is a set of three or more notes sounded simultaneously, arranged at specific intervals to create harmony. They are built from a root note (the one that gives the chord its name) and are formed by superimposing notes, usually at intervals of thirds (major or minor). They provide harmonic structure, generate emotion, and serve as a foundation for melodies and accompaniment.

<img src="images/c-chords.svg">

## Popular Note Movements
Feel free to explore the **audio** folder to listen to a variety of **sample tracks** and **sound demos**. These examples showcase the capabilities of the Synthesizer, offering inspiration and a glimpse into the creative possibilities it unlocks.

<img src="images/movements.svg">

## Usage Instructions
1. Open the application in a compatible web browser (**Chrome, Firefox, or Edge**).
2. Tap the virtual keyboard (on touch devices) or click the keys (on computers) to generate sounds.
3. Use the selectors and sliders to customize the sound by modifying the waveform, octave, oscillators, and ADSR parameters.
4. Adjust the overall volume according to your preferences.
5. Explore different combinations to create unique sounds and take advantage of oscillators to generate complex melodies.
6. In addition to using the mouse, you can play notes with your computer's keyboard!
7. Capture your performance by starting the recording, and simply stop when you’re done. Your audio file will be downloaded automatically.

## Technologies Used
- **HTML5:** For the structure of the application.
- **CSS3:** For responsive design and visual styles.
- **JavaScript:** For the application logic and DOM manipulation.
- **Web Audio API:** For real-time sound generation and manipulation.
- **Media Recorder API:** For recording and exporting audio.

## Web System Requirements
- **Web browser** compatible with the Web Audio API (**Chrome, Firefox, Edge, Safari**).
- **Mobile device** with a touch screen or a computer with keyboard and a mouse.
- **No internet connection required**, as the application works entirely on the client side.

## Win32-x64
- **Operating System:** Windows 7 or higher (Windows 10/11/12 recommended).
- **Memory:** At least 2 GB of RAM (4 GB or more recommended).
- **Disk Space:** At least 200 MB of free space.
- **Processor:** 1 GHz or higher (2 or more cores recommended).

## macOS-arm64

- **Operating System:** 10.14 or later
- **RAM:** 4 GB (8 GB recommended)
- **Storage:** At least 300 MB of free space.
- **Processor:** Intel or Apple Silicon