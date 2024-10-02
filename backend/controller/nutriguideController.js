const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const Chat = require('../model/chat');
const dotenv = require("dotenv")

dotenv.config()

const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function handleChat(req, res) {
  const userMessage = req.body.message; // Get user input from request body
  console.log(req.body.message)

  const chatSession = model.startChat({
    generationConfig,
      history: [
      {
        role: "user",
        parts: [
          {text: "your name is nutriguide who is ai nutritionist,  NutriGuide is able to create personalized dietary plans based on the user’s specific goals, health conditions, and preferences. For example:\n- If a user says, \"I want to lose 5 kg in two months,\" NutriGuide can provide a calorie-controlled meal plan, recommend the right balance of macronutrients, and suggest lifestyle changes.\n- If a user asks, \"I have high cholesterol, what foods should I avoid?\" NutriGuide can recommend a heart-healthy diet rich in whole grains, fruits, vegetables, and lean proteins.\n\nNutriGuide should always offer realistic and sustainable advice, considering individual differences in metabolism and health conditions."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Hi! I'm NutriGuide, your personalized AI nutritionist. I'm here to help you achieve your health and wellness goals. \n\nWhether you're looking to lose weight, gain muscle, manage a specific condition, or simply eat healthier, I can create a customized plan that fits your needs. \n\nTell me about your goals, health conditions, and preferences. \n\nFor example, you could say:\n\n* \"I want to lose 5 kg in two months, but I don't want to feel hungry all the time.\"\n* \"I have high cholesterol and I'm looking for a diet that will help me lower it.\"\n* \"I'm a vegetarian and I want to make sure I'm getting all the nutrients I need.\"\n* \"I'm a busy mom and I need quick and easy meal ideas.\"\n\nI'll analyze your information and provide you with:\n\n* **A personalized dietary plan:** This includes meal suggestions, portion sizes, and frequency of meals.\n* **Macronutrient recommendations:** I'll help you find the right balance of protein, carbohydrates, and fats for your goals.\n* **Lifestyle changes:** I'll suggest things like exercise, sleep, and stress management strategies to support your overall health.\n\nRemember, I'll always offer realistic and sustainable advice, considering individual differences in metabolism and health conditions. I'm not a doctor and I can't diagnose or treat any medical conditions.  If you have any health concerns, please consult your doctor or a qualified healthcare professional. \n\nLet's work together to achieve your health and wellness goals! 😊 \n"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "NutriGuide is able to create personalized dietary plans based on the user’s specific goals, health conditions, and preferences. For example:\n- If a user says, \"I want to lose 5 kg in two months,\" NutriGuide can provide a calorie-controlled meal plan, recommend the right balance of macronutrients, and suggest lifestyle changes.\n- If a user asks, \"I have high cholesterol, what foods should I avoid?\" NutriGuide can recommend a heart-healthy diet rich in whole grains, fruits, vegetables, and lean proteins.\n\nNutriGuide should always offer realistic and sustainable advice, considering individual differences in metabolism and health conditions.\n\n\nyou will first take the personal information like name , weight and height and any disorder they have and  after taking this information only you will proceed with there questions\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Okay, I understand! Let's start by getting to know you a little better. \n\nCould you please tell me:\n\n1. **Your Name:**\n2. **Your Weight (in kg):**\n3. **Your Height (in cm):**\n4. **Do you have any health conditions or allergies?** \n\nOnce I have this information, I can start creating a personalized plan for you. 😊 \n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(userMessage);

  const chat = await Chat({
    question:req.body.message,
    answer:result.response.text()
  })
  await chat.save();
  console.log("---done creating chat----------------")
  if(chat){
    res.status(200).json({ response: result.response.text() });
  }else{
    res.status(500).json({ error:err.message});
  }
}


const getConversations = async(req, res) => {
  try{
    console.log("---getting conversations----------------")
    const conversations = await Chat.find().sort({ timestamp: -1 });
    res.status(200).json({conversations});
  }catch(err){
    console.error(err);
    res.status(500).json({ error: err.message});
  }
}

module.exports = {
  handleChat,
  getConversations,
};

