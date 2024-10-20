const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 5025;

app.use(cors());

// Set up OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route to handle text processing and OpenAI request
app.get("/response", async (req, res) => {
  const text = req.query.text;
  const type = req.query.type;  // analogy, explanation, example

  console.log(`Received request for type: ${type} with text: ${text}`); // Log incoming request

  let prompt = '';

  if (type === 'analogy') {
    prompt = `Provide an analogy for the following text: "${text}"`;
  } else if (type === 'example') {
    prompt = `Provide an example that illustrates the following text: "${text}"`;
  } else if (type === 'explanation') {
    prompt = `Provide a detailed explanation for the following text: "${text}"`;
  } else {
    return res.json({ response: 'Invalid type. Please choose analogy, explanation, or example.' });
  }

  try {
    console.log(`Sending prompt to OpenAI: ${prompt}`);  // Log the prompt

    // Call OpenAI to get the response
    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Adjust the model as needed
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    const generatedText = openaiResponse.choices[0].message.content.trim();
    console.log(`Generated response: ${generatedText}`);  // Log the response from OpenAI
    res.json({ response: generatedText });
  } catch (error) {
    console.error(`Error calling OpenAI: ${error.message}`);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
