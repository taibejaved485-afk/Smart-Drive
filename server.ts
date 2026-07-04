import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Lazy initialization for Gemini
let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    throw new Error("Gemini API key is not configured. Please add a valid GEMINI_API_KEY in the Settings > Secrets panel of Google AI Studio to enable AI features.");
  }
  
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

app.use(express.json());

// API Routes
app.post("/api/marketing/generate-email", async (req, res) => {
  const { prompt, tone } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const toneGuideline = 
      tone === 'professional' ? "Use a formal, authoritative, and corporate tone." :
      tone === 'urgent' ? "Create a sense of FOMO, use scarcity, and high urgency." :
      tone === 'friendly' ? "Use a warm, casual, and community-focused tone with many emojis." :
      "Use a highly persuasive, benefits-driven sales tone with clear calls to action.";

    const systemPrompt = `You are a world-class conversational sales copywriter for GoDriveify, Pakistan's leading smart driving school. ${toneGuideline} Generate a beautiful, highly engaging, bilingual (English & Urdu mixed) marketing newsletter email. Return your response strictly in JSON format matching this schema: {"subject": "string", "bodyHtml": "string"}. Use strong tags for emphasis. Mention fuel savings, safety, or licensing hacks. Support personalization tags like {{name}}.`;

    const aiClient = getGeminiClient();
    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [{ parts: [{ text: `${systemPrompt}\n\nUser Idea: ${prompt}` }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            bodyHtml: { type: Type.STRING }
          },
          required: ["subject", "bodyHtml"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    res.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Gemini Error:", error);
    let errorMsg = error.message || "Failed to generate email content";
    if (errorMsg.includes("API key not valid") || errorMsg.includes("API_KEY_INVALID") || errorMsg.includes("key") || errorMsg.includes("api_key")) {
      errorMsg = "Your Gemini API Key is invalid or not configured. Please verify/add a valid GEMINI_API_KEY in the Settings > Secrets panel of Google AI Studio.";
    }
    res.status(500).json({ error: errorMsg });
  }
});

// Vite middleware setup
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite();
