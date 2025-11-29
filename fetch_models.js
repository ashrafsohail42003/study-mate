const https = require('https');

https.get('https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyBj6ErCq2Xr_2_5CWLQJTbnFX9V9daKjYw', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.models) {
                console.log("Available Models:");
                json.models.forEach(m => console.log(m.name));
            } else {
                console.log("No models found or error:", json);
            }
        } catch (e) {
            console.error("Failed to parse JSON:", e.message);
            console.log("Raw data:", data);
        }
    });
}).on('error', (err) => {
    console.error('Error: ' + err.message);
});
