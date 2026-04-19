// Navigation
const screens = {
    setup: document.getElementById('screen-setup'),
    identity1: document.getElementById('screen-identity1'),
    identity2: document.getElementById('screen-identity2'),
    live: document.getElementById('screen-live'),
    settings: document.getElementById('screen-settings'),
};
let prevScreen = 'identity1';

function goTo(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
}

document.getElementById('use-phone-btn').addEventListener('click', () => goTo('identity1'));
document.getElementById('use-pi-btn').addEventListener('click', () => goTo('identity1'));

document.getElementById('id1-back-btn').addEventListener('click', () => goTo('setup'));
document.getElementById('id2-back-btn').addEventListener('click', () => goTo('identity1'));
document.getElementById('live-back-btn').addEventListener('click', () => goTo('identity2'));
document.getElementById('settings-btn').addEventListener('click', () => { prevScreen = 'live'; goTo('settings'); });
document.getElementById('settings-back-btn').addEventListener('click', () => goTo(prevScreen));

// State
let myId = 'hearing';
let theirId = 'hearing';

// Identity 1 selection
document.querySelectorAll('.id1-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        myId = btn.dataset.id;
        goTo('identity2');
    });
});

// Identity 2 selection
document.querySelectorAll('.id2-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        theirId = btn.dataset.id;
        setupUniversalMode();
        goTo('live');
        if (needsCamera()) {
            startCamera();
        } else {
            document.getElementById('camera-feed').srcObject = null;
        }
    });
});

function needsCamera() {
    return myId === 'deaf' || theirId === 'deaf' || myId === 'blind' || theirId === 'blind';
}

function setupUniversalMode() {
    document.getElementById('type-input-area').classList.add('hidden');
    document.getElementById('text-display').classList.add('hidden');
    
    if (myId === 'mute') {
        document.getElementById('type-input-area').classList.remove('hidden');
    }
    
    const actionLabel = document.querySelector('.action-label');
    if (myId === 'blind' || myId === 'hearing') {
        actionLabel.textContent = "Hold to Speak";
    } else if (myId === 'deaf') {
        actionLabel.textContent = "Record ASL";
    } else {
        actionLabel.textContent = "Capture";
    }
}

async function startCamera() {
    try {
        let stream;
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        } catch (err) {
            stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        }
        document.getElementById('camera-feed').srcObject = stream;
    } catch (e) {
        console.warn('Camera unavailable', e);
    }
}

// ASL Animation logic
let aslTimer = null;
function playASLAnimation(text) {
    const display = document.getElementById('asl-display');
    const textDisplay = document.getElementById('display-text');
    document.getElementById('text-display').classList.remove('hidden');

    const letters = text.toUpperCase().split('').filter(ch => ASL_SIGNS[ch] || ch === ' ');
    display.innerHTML = '';
    textDisplay.textContent = '';

    if (aslTimer) clearInterval(aslTimer);
    let i = 0;

    aslTimer = setInterval(() => {
        if (i >= letters.length) {
            clearInterval(aslTimer);
            setTimeout(() => {
                document.getElementById('text-display').classList.add('hidden');
            }, 4000);
            return;
        }
        const ch = letters[i];
        if (ASL_SIGNS[ch]) {
            display.innerHTML = ASL_SIGNS[ch](120);
        } else {
            display.innerHTML = '';
        }
        textDisplay.textContent = text.substring(0, i + 1);
        i++;
    }, 600);
}

// Real Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
}

let isRecording = false;
let demoIdx = 0;
const demoASLToText = ["I NEED WATER", "WHERE IS THE RESTROOM", "THANK YOU VERY MUCH"];

function processTranslationResult(textResult) {
    const narrationText = document.getElementById('narration-text');
    
    if (theirId === 'deaf') {
        playASLAnimation(textResult);
    } else if (theirId === 'blind' || theirId === 'hearing') {
        speakText(textResult);
    } else if (theirId === 'mute') {
        showTextOnScreen(textResult);
    }
}

document.getElementById('action-btn').addEventListener('click', () => {
    const btn = document.getElementById('action-btn');
    const narrationText = document.getElementById('narration-text');
    const textDisplayBlock = document.getElementById('text-display');
    const display = document.getElementById('display-text');
    const actionLabel = document.querySelector('.action-label');

    if (!isRecording) {
        isRecording = true;
        btn.style.borderColor = 'var(--red)';
        document.querySelector('.action-ring').style.borderColor = 'var(--red)';
        document.querySelector('.action-ring-2').style.borderColor = 'rgba(232, 112, 96, 0.5)';
        
        if (myId === 'deaf') {
            narrationText.textContent = "Recording ASL... (Sign now)";
            actionLabel.textContent = "Stop Recording";
        } else if (myId === 'blind' || myId === 'hearing') {
            narrationText.textContent = "Listening to speech...";
            actionLabel.textContent = "Stop Listening";
            if (recognition) {
                recognition.start();
                recognition.onresult = (event) => {
                    const text = event.results[0][0].transcript;
                    narrationText.textContent = "Recognized: " + text;
                    processTranslationResult(text);
                    stopRecordingUI();
                };
                recognition.onerror = (e) => {
                    narrationText.textContent = "Speech recognition error: " + e.error;
                    stopRecordingUI();
                };
            } else {
                narrationText.textContent = "Speech API not supported in this browser.";
                stopRecordingUI();
            }
            return; // Exit early since SpeechRecognition is asynchronous
        }
    } else {
        stopRecordingUI();
        
        if (myId === 'deaf') {
            narrationText.textContent = "Translating ASL...";
            setTimeout(() => {
                let textResult = demoASLToText[demoIdx % demoASLToText.length];
                demoIdx++;
                narrationText.textContent = "Translated ASL: " + textResult;
                processTranslationResult(textResult);
            }, 1000);
        } else if (myId === 'blind' || myId === 'hearing') {
            if (recognition) recognition.stop();
        }
    }
});

function stopRecordingUI() {
    isRecording = false;
    const btn = document.getElementById('action-btn');
    btn.style.borderColor = '';
    document.querySelector('.action-ring').style.borderColor = '';
    document.querySelector('.action-ring-2').style.borderColor = '';
    setupUniversalMode(); // reset label
}

function showTextOnScreen(text) {
    const textDisplayBlock = document.getElementById('text-display');
    const display = document.getElementById('display-text');
    const aslDisplay = document.getElementById('asl-display');
    
    aslDisplay.innerHTML = '';
    textDisplayBlock.classList.remove('hidden');
    display.textContent = text;
    setTimeout(() => textDisplayBlock.classList.add('hidden'), 5000);
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(u);
    }
}

// Mute Person Typing
document.getElementById('speak-typed-btn')?.addEventListener('click', () => {
    const txt = document.getElementById('type-input').value.trim();
    if (!txt) return;
    
    document.getElementById('narration-text').textContent = "Typed: " + txt;
    processTranslationResult(txt);
    
    document.getElementById('type-input').value = '';
});

// Settings sliders
document.getElementById('analysis-interval').addEventListener('input', function () {
    document.getElementById('interval-value').textContent = this.value + 's';
});
document.getElementById('speech-rate').addEventListener('input', function () {
    document.getElementById('rate-value').textContent = parseFloat(this.value).toFixed(1) + '×';
});
