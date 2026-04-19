// Navigation
let prevScreen = localStorage.getItem('prevScreen') || 'index';

function goTo(name) {
    if (name === 'setup') name = 'index';
    window.location.href = name + '.html';
}

document.getElementById('use-phone-btn')?.addEventListener('click', () => goTo('identity1'));
document.getElementById('use-pi-btn')?.addEventListener('click', () => goTo('identity1'));
document.getElementById('learn-asl-btn')?.addEventListener('click', () => goTo('learn'));

document.getElementById('id1-back-btn')?.addEventListener('click', () => goTo('setup'));
document.getElementById('id2-back-btn')?.addEventListener('click', () => goTo('identity1'));
document.getElementById('live-back-btn')?.addEventListener('click', () => {
    stopLearnMode();
    goTo('identity2');
});
document.getElementById('learn-back-btn')?.addEventListener('click', () => {
    stopLearnMode();
    goTo('setup');
});
document.getElementById('settings-btn')?.addEventListener('click', () => { 
    let current = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    localStorage.setItem('prevScreen', current);
    goTo('settings'); 
});
document.getElementById('settings-back-btn')?.addEventListener('click', () => goTo(prevScreen));

// State
let myId = localStorage.getItem('myId') || 'hearing';
let theirId = localStorage.getItem('theirId') || 'hearing';

// Blind mode "Tap anywhere" to speak
document.body.addEventListener('click', (e) => {
    if (window.location.pathname.includes('live') && myId === 'blind') {
        if (!e.target.closest('.sl-header') && !e.target.closest('.live-top') && !e.target.closest('.live-controls')) {
            const btn = document.getElementById('action-btn');
            if (btn) btn.click();
        }
    }
});

// Identity 1 selection
document.querySelectorAll('.id1-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        myId = btn.dataset.id;
        localStorage.setItem('myId', myId);
        goTo('identity2');
    });
});

// Identity 2 selection
document.querySelectorAll('.id2-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        theirId = btn.dataset.id;
        localStorage.setItem('theirId', theirId);
        goTo('live');
    });
});

// Initialize logic for current page
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('live.html')) {
        setupUniversalMode();
        if (needsCamera()) {
            startCamera();
        } else {
            const feed = document.getElementById('camera-feed');
            if (feed) feed.srcObject = null;
        }
    } else if (window.location.pathname.includes('learn.html')) {
        startLearnMode();
    }
});

function needsCamera() {
    return myId === 'deaf' || theirId === 'deaf' || myId === 'blind';
}

function setupUniversalMode() {
    document.getElementById('type-input-area').classList.add('hidden');
    document.getElementById('text-display').classList.add('hidden');

    if (myId === 'mute') {
        document.getElementById('type-input-area').classList.remove('hidden');
    }

    let source = "Text";
    let dest = "Text";

    if (myId === 'hearing' || myId === 'blind') source = "Speech";
    else if (myId === 'deaf') source = "ASL";

    if (theirId === 'hearing' || theirId === 'blind') dest = "Audio";
    else if (theirId === 'deaf') dest = "ASL";

    document.getElementById('mode-label').textContent = `${source} → ${dest}`;

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

// Real ASL Camera Recognition (MediaPipe ML)
let gestureRecognizer = null;

async function initGestureRecognizer() {
    if (!window.FilesetResolver || !window.GestureRecognizer) {
        setTimeout(initGestureRecognizer, 500);
        return;
    }
    try {
        const vision = await window.FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm");
        gestureRecognizer = await window.GestureRecognizer.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
                delegate: "GPU"
            },
            runningMode: "VIDEO"
        });
        console.log("Real ASL ML Model Loaded!");
    } catch (e) {
        console.error("Failed to load ML Model", e);
    }
}
initGestureRecognizer();

let isRecording = false;
let demoIdx = 0;
const demoSpeechToText = ["Hello, how can I help you?", "The weather is nice today.", "Let's go get some coffee."];

let GROQ_API_KEY = "YOUR_GROQ_API_KEY";

// Fetch the API key from config.json
fetch('config.json')
    .then(response => response.json())
    .then(data => {
        if (data.GROQ_API_KEY) GROQ_API_KEY = data.GROQ_API_KEY;
    })
    .catch(err => console.warn("config.json not found. API key won't be loaded."));

async function addPunctuationViaGroq(rawText) {
    if (!GROQ_API_KEY || GROQ_API_KEY === "YOUR_GROQ_API_KEY") return rawText;
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [{
                    role: "system",
                    content: "You are an assistant that adds correct punctuation and capitalization to raw transcribed speech or sign language outputs. ONLY output the corrected text. Do not add any conversational filler like 'Here is the text'."
                }, {
                    role: "user",
                    content: rawText
                }],
                temperature: 0.1,
                max_tokens: 150
            })
        });
        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (e) {
        console.error("Groq API error", e);
        return rawText;
    }
}

async function processTranslationResult(textResult) {
    const narrationText = document.getElementById('narration-text');

    // Check if we have a key before overriding the text
    if (GROQ_API_KEY !== "YOUR_GROQ_API_KEY") {
        narrationText.textContent = "Polishing grammar (Groq LLM)...";
    }

    const polishedText = await addPunctuationViaGroq(textResult);

    // Update display with final text
    if (GROQ_API_KEY !== "YOUR_GROQ_API_KEY") {
        narrationText.textContent = "Final: " + polishedText;
    }

    if (theirId === 'deaf') {
        playASLAnimation(polishedText);
    } else if (theirId === 'blind' || theirId === 'hearing') {
        speakText(polishedText);
    } else if (theirId === 'mute') {
        showTextOnScreen(polishedText);
    }
}

let lastVideoTime = -1;
let recognizeLoop = null;

function predictWebcam() {
    const video = document.getElementById('camera-feed');
    const narrationText = document.getElementById('narration-text');

    if (video.currentTime !== lastVideoTime && gestureRecognizer && video.readyState >= 2) {
        lastVideoTime = video.currentTime;
        const results = gestureRecognizer.recognizeForVideo(video, Date.now());
        if (results.gestures.length > 0) {
            const categoryName = results.gestures[0][0].categoryName;
            if (categoryName !== "None") {
                narrationText.textContent = `Sign Detected: ${categoryName}`;
                window.lastRecognizedGesture = categoryName;
            }
        }
    }

    if (isRecording) {
        recognizeLoop = window.requestAnimationFrame(predictWebcam);
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
            narrationText.textContent = "Recording Real ASL... (Show sign)";
            actionLabel.textContent = "Stop Recording";
            window.lastRecognizedGesture = null;
            if (gestureRecognizer) {
                predictWebcam(); // Start ML loop
            } else {
                narrationText.textContent = "ML Model still loading, please wait...";
            }
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
                let rawSign = window.lastRecognizedGesture || "No sign detected";

                // Map the ML output to human phrases
                const gestureMap = {
                    "Thumb_Up": "Good job! / Yes!",
                    "Thumb_Down": "No / Bad",
                    "Open_Palm": "Stop / Wait",
                    "Closed_Fist": "Ready / Solid",
                    "Pointing_Up": "Look up / Attention",
                    "Victory": "Peace / Two",
                    "ILoveYou": "I love you!"
                };

                let textResult = gestureMap[rawSign] || rawSign;

                narrationText.textContent = "Translated ASL: " + textResult;
                processTranslationResult(textResult);
            }, 500);
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
document.getElementById('analysis-interval')?.addEventListener('input', function () {
    document.getElementById('interval-value').textContent = this.value + 's';
});
document.getElementById('speech-rate')?.addEventListener('input', function () {
    document.getElementById('rate-value').textContent = parseFloat(this.value).toFixed(1) + '×';
});

// --- Education Hack: Interactive ASL Tutor ---
let learnTimer = null;
let learnTarget = "";
let learnStream = null;

const learnGestures = ["Thumb_Up", "Thumb_Down", "Open_Palm", "Closed_Fist", "Victory", "ILoveYou"];
const friendlyNames = {
    "Thumb_Up": "Thumbs Up 👍",
    "Thumb_Down": "Thumbs Down 👎",
    "Open_Palm": "Open Palm 🖐️",
    "Closed_Fist": "Closed Fist ✊",
    "Victory": "Peace Sign ✌️",
    "ILoveYou": "I Love You 🤟"
};

async function startLearnMode() {
    pickNewLearnSign();
    try {
        learnStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        const video = document.getElementById('learn-camera-feed');
        video.srcObject = learnStream;

        document.getElementById('learn-status').textContent = gestureRecognizer ? "Show your hand to the camera..." : "Loading ML Model...";
        learnTimer = requestAnimationFrame(learnLoop);
    } catch (e) {
        document.getElementById('learn-status').textContent = "Camera access denied.";
    }
}

function stopLearnMode() {
    cancelAnimationFrame(learnTimer);
    if (learnStream) {
        learnStream.getTracks().forEach(t => t.stop());
    }
}

function pickNewLearnSign() {
    const oldTarget = learnTarget;
    while (learnTarget === oldTarget || !learnTarget) {
        learnTarget = learnGestures[Math.floor(Math.random() * learnGestures.length)];
    }
    document.getElementById('target-sign').textContent = friendlyNames[learnTarget];
    document.getElementById('learn-status').textContent = "Show your hand to the camera...";
    document.getElementById('target-sign').style.color = "var(--gold)";
}

let learnVideoTime = -1;
function learnLoop() {
    const video = document.getElementById('learn-camera-feed');
    if (video && video.readyState >= 2 && gestureRecognizer) {
        if (video.currentTime !== learnVideoTime) {
            learnVideoTime = video.currentTime;
            const results = gestureRecognizer.recognizeForVideo(video, Date.now());
            if (results.gestures.length > 0) {
                const detected = results.gestures[0][0].categoryName;
                if (detected === learnTarget) {
                    document.getElementById('learn-status').textContent = "✅ Correct! Great job!";
                    document.getElementById('target-sign').style.color = "var(--green)";
                    // Pause, then next sign
                    cancelAnimationFrame(learnTimer);
                    setTimeout(() => {
                        pickNewLearnSign();
                        learnTimer = requestAnimationFrame(learnLoop);
                    }, 2000);
                    return;
                } else if (detected !== "None") {
                    document.getElementById('learn-status').textContent = `I see ${friendlyNames[detected] || detected}. Try again!`;
                }
            } else {
                document.getElementById('learn-status').textContent = "No hand detected...";
            }
        }
    }
    learnTimer = requestAnimationFrame(learnLoop);
}

document.getElementById('next-sign-btn')?.addEventListener('click', () => {
    pickNewLearnSign();
});
