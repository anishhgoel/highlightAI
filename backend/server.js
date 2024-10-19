const express = require('express');
const cors = require('cors');
const app = express();
const PORT  = 5025;

app.use(cors());

app.get("/response",  (req, res) => {
    const text = req.query.text;
    const type = req.query.type;  // Get the type of response (analogy, example, explanation)

    let response = '';
    
    if (type === 'analogy') {
        response = `${text} is like a well-oiled machine.`;  // Analogy example
    } else if (type === 'example') {
        response = `An example of ${text} is when a machine runs smoothly without friction.`;  // Example
    } else if (type === 'explanation') {
        response = `${text} can be explained as a mechanism where all parts work together efficiently.`;  // Explanation
    } else {
        response = 'Invalid type. Please choose analogy, example, or explanation.';
    }

    res.json({ response });
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
