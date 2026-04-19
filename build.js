const fs = require('fs');

const apiKey = process.env.GROQ_API_KEY || 'YOUR_GROQ_API_KEY';

const content = `const CONFIG = {
    "GROQ_API_KEY": "${apiKey}"
};`;

fs.writeFileSync('config.js', content);
console.log('Build: config.js generated successfully.');
