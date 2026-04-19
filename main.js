// Navigation
let prevScreen = localStorage.getItem('prevScreen') || 'index';

function goTo(name) {
    if (name === 'setup') name = 'index';
    const isLocal = window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.protocol === 'file:';

    window.location.href = name + (isLocal ? '.html' : '');
}

document.getElementById('use-phone-btn')?.addEventListener('click', () => {
    localStorage.setItem('isPiMode', 'false');
    goTo('identity1');
});

document.getElementById('use-pi-btn')?.addEventListener('click', () => {
    localStorage.setItem('isPiMode', 'true');
    // Auto-optimize for Pi: lower analysis rate to save CPU
    localStorage.setItem('analysisInterval', '2.0');
    localStorage.setItem('speechRate', '1.0');
    goTo('identity1');
});
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

// Blind mode global shortcut: Long press anywhere for 2 seconds to auto-select Blind Mode
let blindModeTimer;

function startBlindModeTimer() {
    // Only apply on the setup or identity screens
    if (window.location.pathname.includes('live') || window.location.pathname.includes('learn')) return;

    blindModeTimer = setTimeout(() => {
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance("Blind mode activated. Proceeding to next screen.");
            window.speechSynthesis.speak(utterance);
        }

        localStorage.setItem('myId', 'blind');
        goTo('identity2');
    }, 2000);
}

function cancelBlindModeTimer() {
    clearTimeout(blindModeTimer);
}

document.addEventListener('mousedown', startBlindModeTimer);
document.addEventListener('mouseup', cancelBlindModeTimer);
document.addEventListener('touchstart', startBlindModeTimer, { passive: true });
document.addEventListener('touchend', cancelBlindModeTimer);
document.addEventListener('touchcancel', cancelBlindModeTimer);

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
    const path = window.location.pathname;

    if (path.includes('identity2') && myId === 'blind') {
        // Blind user Voice Assistant for selecting the second person
        if ('speechSynthesis' in window) {
            setTimeout(() => {
                const utterance = new SpeechSynthesisUtterance("Who are you talking to? Please say Hearing, Deaf, Mute, or Blind.");
                utterance.onend = () => {
                    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                    if (SpeechRecognition) {
                        const rec = new SpeechRecognition();
                        // Play a tiny beep to indicate listening
                        if (navigator.vibrate) navigator.vibrate(100);

                        rec.onresult = (e) => {
                            const spoken = e.results[0][0].transcript.toLowerCase();
                            let detectedId = null;
                            if (spoken.includes('hearing') || spoken.includes('speak')) detectedId = 'hearing';
                            else if (spoken.includes('deaf') || spoken.includes('sign')) detectedId = 'deaf';
                            else if (spoken.includes('mute') || spoken.includes('type')) detectedId = 'mute';
                            else if (spoken.includes('blind')) detectedId = 'blind';

                            if (detectedId) {
                                window.speechSynthesis.speak(new SpeechSynthesisUtterance(`Selected ${detectedId}. Starting bridge.`));
                                localStorage.setItem('theirId', detectedId);
                                setTimeout(() => goTo('live'), 2000);
                            } else {
                                window.speechSynthesis.speak(new SpeechSynthesisUtterance("I didn't catch that. Please reload the page to try again."));
                            }
                        };
                        rec.onerror = () => {
                            window.speechSynthesis.speak(new SpeechSynthesisUtterance("Could not hear you."));
                        };
                        rec.start();
                    }
                };
                window.speechSynthesis.speak(utterance);
            }, 500);
        }
    } else if (path.includes('live')) {
        setupUniversalMode();
        if (needsCamera()) {
            startCamera();
        } else {
            const feed = document.getElementById('camera-feed');
            if (feed) feed.srcObject = null;
        }
    } else if (path.includes('learn')) {
        startLearnMode();
    }
});

function needsCamera() {
    return myId === 'deaf' || theirId === 'deaf' || myId === 'blind';
}

function setupUniversalMode() {
    const isPi = localStorage.getItem('isPiMode') === 'true';
    const statusLabel = document.getElementById('status-label');
    const piIndicator = document.getElementById('pi-hardware-indicator');

    if (isPi) {
        if (statusLabel) statusLabel.textContent = "Pi Camera (V2)";
        if (piIndicator) piIndicator.classList.remove('hidden');
    } else {
        if (statusLabel) statusLabel.textContent = "Phone Camera";
        if (piIndicator) piIndicator.classList.add('hidden');
    }

    document.getElementById('type-input-area')?.classList.add('hidden');
    document.getElementById('text-display')?.classList.add('hidden');

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
let configLoaded = true; // No longer async, loaded via script tag

if (typeof CONFIG !== 'undefined' && CONFIG.GROQ_API_KEY) {
    GROQ_API_KEY = CONFIG.GROQ_API_KEY;
}

const loadConfig = Promise.resolve(); // Keep promise for compatibility with startLearnMode

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
                model: "llama-3.1-8b-instant",
                messages: [{
                    role: "system",
                    content: "You are a literal transcription-to-text bridge. Your ONLY job is to add punctuation and capitalization to the input. NEVER answer questions. NEVER respond to the user. NEVER add new information. If the input is 'How are you', your output MUST be 'How are you?'. Do not be an assistant; be a filter."
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

let lastAnalyzeTS = 0;
function predictWebcam() {
    const video = document.getElementById('camera-feed');
    const narrationText = document.getElementById('narration-text');
    const isPi = localStorage.getItem('isPiMode') === 'true';
    const now = Date.now();

    const userInterval = parseFloat(localStorage.getItem('analysisInterval') || '0.2') * 1000;

    const threshold = isPi ? Math.max(userInterval, 400) : userInterval;

    if (now - lastAnalyzeTS > threshold && video.currentTime !== lastVideoTime && gestureRecognizer && video.readyState >= 2) {
        lastAnalyzeTS = now;
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

document.getElementById('action-btn')?.addEventListener('click', () => {
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
        const rate = localStorage.getItem('speechRate') || '1.0';
        u.rate = parseFloat(rate);
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

// Settings logic: Save to localStorage and apply
document.getElementById('analysis-interval')?.addEventListener('input', function () {
    const val = this.value;
    document.getElementById('interval-value').textContent = val + 's';
    localStorage.setItem('analysisInterval', val);
});

document.getElementById('speech-rate')?.addEventListener('input', function () {
    const val = parseFloat(this.value).toFixed(1);
    document.getElementById('rate-value').textContent = val + '×';
    localStorage.setItem('speechRate', val);
});

function syncSettingsUI() {
    const interval = localStorage.getItem('analysisInterval') || '0.2';
    const rate = localStorage.getItem('speechRate') || '1.0';

    const intervalSlider = document.getElementById('analysis-interval');
    const rateSlider = document.getElementById('speech-rate');

    if (intervalSlider) {
        intervalSlider.value = interval;
        const valEl = document.getElementById('interval-value');
        if (valEl) valEl.textContent = interval + 's';
    }
    if (rateSlider) {
        rateSlider.value = rate;
        const valEl = document.getElementById('rate-value');
        if (valEl) valEl.textContent = rate + '×';
    }
}

// Initialize logic for current page
window.addEventListener('DOMContentLoaded', () => {
    syncSettingsUI();
    const path = window.location.pathname;

    if (path.includes('identity2') && myId === 'blind') {
        // Blind user Voice Assistant for selecting the second person
        if ('speechSynthesis' in window) {
            setTimeout(() => {
                const utterance = new SpeechSynthesisUtterance("Who are you talking to? Please say Hearing, Deaf, Mute, or Blind.");
                utterance.onend = () => {
                    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                    if (SpeechRecognition) {
                        const rec = new SpeechRecognition();
                        // Play a tiny beep to indicate listening
                        if (navigator.vibrate) navigator.vibrate(100);

                        rec.onresult = (e) => {
                            const spoken = e.results[0][0].transcript.toLowerCase();
                            let detectedId = null;
                            if (spoken.includes('hearing') || spoken.includes('speak')) detectedId = 'hearing';
                            else if (spoken.includes('deaf') || spoken.includes('sign')) detectedId = 'deaf';
                            else if (spoken.includes('mute') || spoken.includes('type')) detectedId = 'mute';
                            else if (spoken.includes('blind')) detectedId = 'blind';

                            if (detectedId) {
                                window.speechSynthesis.speak(new SpeechSynthesisUtterance(`Selected ${detectedId}. Starting bridge.`));
                                localStorage.setItem('theirId', detectedId);
                                setTimeout(() => goTo('live'), 2000);
                            } else {
                                window.speechSynthesis.speak(new SpeechSynthesisUtterance("I didn't catch that. Please reload the page to try again."));
                            }
                        };
                        rec.onerror = () => {
                            window.speechSynthesis.speak(new SpeechSynthesisUtterance("Could not hear you."));
                        };
                        rec.start();
                    }
                };
                window.speechSynthesis.speak(utterance);
            }, 500);
        }
    } else if (path.includes('live')) {
        setupUniversalMode();
        if (needsCamera()) {
            startCamera();
        } else {
            const feed = document.getElementById('camera-feed');
            if (feed) feed.srcObject = null;
        }
    } else if (path.includes('learn')) {
        startLearnMode();
    }
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
    await loadConfig;
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

async function getGroqLesson(signName) {
    if (!GROQ_API_KEY || GROQ_API_KEY === "YOUR_GROQ_API_KEY") return "Show the hand sign for: " + signName;
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [{
                    role: "system",
                    content: "You are an ASL tutor. Given a basic hand sign name, generate a 1-sentence creative challenge. ONLY output the scenario."
                }, {
                    role: "user",
                    content: "Sign: " + signName
                }],
                temperature: 0.7,
                max_tokens: 100
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Groq API Error Details:", errorData);
            return "Show the hand sign for: " + signName;
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (e) {
        console.error("Network or parsing error:", e);
        return "Show the hand sign for: " + signName;
    }
}

async function pickNewLearnSign() {
    const oldTarget = learnTarget;
    learnTarget = null; // Clear target so we don't detect anything while "Thinking"

    let nextTarget = oldTarget;
    while (nextTarget === oldTarget || !nextTarget) {
        nextTarget = learnGestures[Math.floor(Math.random() * learnGestures.length)];
    }

    const signLabel = friendlyNames[nextTarget];
    document.getElementById('target-sign').textContent = signLabel;
    document.getElementById('target-sign').style.color = "var(--gold)";
    document.getElementById('learn-status').textContent = "Thinking of a challenge...";

    const scenario = await getGroqLesson(signLabel);
    const scenarioEl = document.getElementById('tutor-scenario');
    if (scenarioEl) scenarioEl.textContent = scenario;

    // ONLY set the target once the lesson is ready
    learnTarget = nextTarget;
    document.getElementById('learn-status').textContent = "Show your hand to the camera...";
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
                    const targetEl = document.getElementById('target-sign');
                    document.getElementById('learn-status').textContent = "✅ Correct! Great job!";
                    targetEl.style.color = "var(--green)";
                    targetEl.classList.add('success-pulse');

                    // Pause, then next sign
                    cancelAnimationFrame(learnTimer);
                    setTimeout(() => {
                        targetEl.classList.remove('success-pulse');
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
