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

    const systemPrompt = `You are a world-class conversational sales copywriter and email designer for GoDriveify, Pakistan's leading smart driving school. ${toneGuideline} Generate a beautiful, highly engaging, premium corporate newsletter. Every generated email MUST use high-quality inline-styled HTML wrapped in a premium modern layout box exactly matching this structure:
<div style="font-family: 'Plus Jakarta Sans', 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
  <!-- Top Banner -->
  <div style="background-color: #002060; padding: 24px; text-align: center;">
    <img src="https://i.pinimg.com/736x/ca/5b/12/ca5b1205f038143bc578baaa8f07ff29.jpg" alt="GoDriveify Logo" style="height: 60px; width: auto; border-radius: 8px; display: inline-block;" />
    <p style="color: #ffffff; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 10px 0 0 0; font-weight: 700;">Pakistan's #1 Smart Driving School</p>
  </div>
  
  <!-- Body -->
  <div style="padding: 32px 24px; color: #334155; line-height: 1.6; font-size: 14px;">
    [Insert the highly professional, bilingual roman urdu/urdu & english marketing copy, with headers and structured paragraph tags]
    
    <!-- Info Highlight Box -->
    <div style="background-color: #f8fafc; border-left: 4px solid #FF7112; padding: 16px; border-radius: 0 8px 8px 0; margin: 24px 0;">
      [Insert key discount, offer details, or driving hack here]
    </div>

    <!-- Call to Action Button -->
    <div style="text-align: center; margin: 30px 0 10px 0;">
      <a href="https://wa.me/923000000000?text=I%20want%20to%20learn%20more" style="background-color: #FF7112; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 30px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 12px rgba(255, 113, 18, 0.25);">[Descriptive CTA Button Text]</a>
    </div>
  </div>

  <!-- Footer -->
  <div style="background-color: #f8fafc; border-top: 1px solid #f1f5f9; padding: 24px; text-align: center; font-size: 12px; color: #94a3b8;">
    <p style="margin: 0 0 8px 0; font-weight: 700; color: #64748b;">GoDriveify Faisalabad</p>
    <p style="margin: 0 0 16px 0;">Canal Road, Near Faisalabad Campus, Punjab, Pakistan</p>
    <div style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
      <a href="#" style="color: #64748b; text-decoration: none; margin: 0 10px; font-weight: 600;">Website</a> | 
      <a href="#" style="color: #64748b; text-decoration: none; margin: 0 10px; font-weight: 600;">Unsubscribe</a> | 
      <a href="#" style="color: #64748b; text-decoration: none; margin: 0 10px; font-weight: 600;">Support</a>
    </div>
  </div>
</div>

Ensure your response is valid JSON matching this schema: {"subject": "string", "bodyHtml": "string"}. Do not return raw markdown blocks or code block format tags inside JSON values. Use strong tags for key points.`;

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
