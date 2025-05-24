// Simple test script to verify Gemini API key
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Your API key
const API_KEY = 'AIzaSyBC381ecHIpWZzZd6ZefP9DaP-nqYdk5FE';

// Initialize the API client
const genAI = new GoogleGenerativeAI(API_KEY);

async function listAvailableModels() {
  try {
    console.log('Listing available Gemini models...');

    // Make a direct fetch request to list models
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1/models',
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Available models:');
    data.models.forEach(model => {
      console.log(`- ${model.name} (${model.displayName})`);
    });

    return data.models;
  } catch (error) {
    console.error('Failed to list models:');
    console.error(error);
    return [];
  }
}

async function testGeminiAPI() {
  try {
    console.log('Testing Gemini API with provided key...');

    // List available models first
    const models = await listAvailableModels();

    if (models.length === 0) {
      throw new Error('No models available or failed to list models');
    }

    // Use the first available model or a specific one if we know it exists
    // Most likely it will be gemini-1.5-pro or gemini-1.5-flash
    const modelName = 'gemini-1.5-flash'; // Try this model first
    console.log(`Using model: ${modelName}`);

    const model = genAI.getGenerativeModel({ model: modelName });

    // Simple prompt
    const prompt = 'Hello, can you tell me what time it is?';

    console.log(`Sending prompt: "${prompt}"`);

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('API call successful!');
    console.log('Response:', text);

    return { success: true, response: text };
  } catch (error) {
    console.error('API call failed with error:');
    console.error(error);

    return {
      success: false,
      error: error.message,
      details: error.toString()
    };
  }
}

// Run the test
testGeminiAPI().then(result => {
  if (result.success) {
    console.log('✅ API key is working correctly');
  } else {
    console.log('❌ API key test failed');
  }
});
