// Test script to verify the application's model configuration
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Your API key
const API_KEY = 'AIzaSyBC381ecHIpWZzZd6ZefP9DaP-nqYdk5FE';

// Initialize the API client
const genAI = new GoogleGenerativeAI(API_KEY);

// Models used in the application
const APP_MODELS = [
  {
    id: "gemini-pro",
    name: "Gemini 1.5 Pro",
    modelName: "gemini-1.5-pro"
  },
  {
    id: "gemini-flash",
    name: "Gemini 1.5 Flash",
    modelName: "gemini-1.5-flash"
  }
];

async function testAppModels() {
  console.log('Testing models used in the application...');
  
  for (const appModel of APP_MODELS) {
    try {
      console.log(`\nTesting model: ${appModel.name} (${appModel.modelName})`);
      
      const model = genAI.getGenerativeModel({ model: appModel.modelName });
      const prompt = 'Hello, can you tell me what time it is?';
      
      console.log(`Sending prompt: "${prompt}"`);
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('✅ Success! Response:', text.substring(0, 100) + (text.length > 100 ? '...' : ''));
    } catch (error) {
      console.error(`❌ Error with model ${appModel.modelName}:`, error.message);
    }
  }
}

// Run the test
testAppModels();
