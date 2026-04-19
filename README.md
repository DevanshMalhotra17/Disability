# Nexus — Communication Bridge

![Nexus Banner](https://raw.githubusercontent.com/DevanshMalhotra17/Disability/main/logo.png)

> **"Every voice deserves to be heard."**
>
> **[Live Website: https://nexus-universal.vercel.app](https://nexus-universal.vercel.app)**

Nexus is a state-of-the-art accessibility platform designed to bridge the communication gap between individuals with different sensory and physical abilities. By leveraging real-time Machine Learning and Large Language Models, Nexus provides a seamless translation layer between **American Sign Language (ASL)**, **Speech**, and **Text**.

---

## Key Features

- **Real-Time ASL Translation**: Uses Google MediaPipe Gesture Recognition to translate hand signs directly into text and speech.
- **Universal Speech-to-Sign**: Converts spoken words into fluid ASL letter-by-letter animations for Deaf users.
- **AI Polishing (Groq LLM)**: Integrated with Llama 3.1 via Groq Cloud to refine raw transcriptions into natural, punctuated, and grammatically correct sentences.
- **Device Agnostic**: Optimized for both mobile devices (phones/tablets) and specialized handheld hardware (Raspberry Pi).
- **Multi-Modal Accessibility**:
  - **Blind Mode**: Voice-guided navigation and click-to-speak functionality.
  - **Deaf Mode**: Visual sign detection and text-to-sign display.
  - **Mute Mode**: Quick-type interface with high-quality text-to-speech.
- **Interactive ASL Tutor**: A built-in educational module that uses the camera to help users learn and practice sign language with real-time feedback.

---

## Tech Stack

- **Frontend**: Vanilla HTML5, CSS3 (Modern Glassmorphism & Fluid Typography).
- **Core Logic**: JavaScript (ES6+).
- **Machine Learning**: [Google MediaPipe](https://developers.google.com/mediapipe) for hand gesture and pose recognition.
- **Intelligence**: [Groq Cloud](https://groq.com/) (Llama 3.1 8B) for natural language refinement.
- **Animations**: Custom SVG-based ASL sign animations.

---

## Getting Started

### Prerequisites
- A modern web browser (Chrome or Edge recommended for best Speech API support).
- A working webcam or camera.
- (Optional) A [Groq API Key](https://console.groq.com/) for enhanced grammar polishing.

### Local Installation
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/DevanshMalhotra17/Disability.git
    cd Disability
    ```
2.  **Configuration**:
    Open `config.js` and add your Groq API key:
    ```javascript
    const CONFIG = {
        "GROQ_API_KEY": "YOUR_KEY_HERE"
    };
    ```
3.  **Run the application**:
    - **Windows**: Double-click `start_nexus.bat`.
    - **Mac/Linux/Other**: Run a local server in the project directory:
      ```bash
      python -m http.server 8000
      ```
      Then open `http://localhost:8000` in your browser.

---

## Architecture

Nexus operates as a decentralized communication hub. Instead of a one-size-fits-all interface, it adapts its UI and logic based on the user's identity and the identity of the person they are communicating with.

- **Identity Selection**: Users define themselves (Deaf, Blind, Mute, or Hearing) and their partner.
- **Translation Pipeline**: 
  1. Input (ASL Camera / Mic / Keyboard)
  2. Recognition (MediaPipe / Web Speech API)
  3. Processing (Groq LLM Refinement)
  4. Output (Text Display / ASL Animation / Text-to-Speech)

---

## Privacy
All camera and microphone processing for gesture and speech recognition happens **locally on the device** via MediaPipe and the browser's native Speech API. Only the anonymized text fragments are sent to Groq for grammar polishing if enabled.
