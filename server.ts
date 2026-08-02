import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Stylist Endpoint (Gemini)
  app.post('/api/stylist', async (req, res) => {
    try {
      const { occasion, bodyType, stylePreference, colorPalette, budget } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        // Smart fallback response if API key is not set
        return res.json({
          recommendation: `Based on your request for a ${occasion || 'special occasion'} in ${colorPalette || 'luxurious tones'}, we recommend looking at our Royal Velvet Empress Gown and Aurelia Draped Chiffon Gown. Both silhouetting options cater to ${bodyType || 'versatile'} figures with hand-tailored precision.`,
          suggestedCategories: ['Bridal Dresses', 'Luxury Pret', 'Formal Dresses'],
          fashionTip: 'Pair statement velvet or organza gowns with minimalist pearl earrings and an updo hairstyle to highlight hand-embroidered necklines.'
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a high-fashion haute couture stylist at Aria Vance Atelier (a world-renowned luxury designer brand).
A client asks for recommendations:
- Occasion: ${occasion || 'Evening Gala / Wedding'}
- Silhouette / Body Consideration: ${bodyType || 'Classic Elegance'}
- Style Preference: ${stylePreference || 'Glamorous & Timeless'}
- Color Palette: ${colorPalette || 'Gold, Emerald, Ivory, or Velvet Midnight'}
- Budget Range: ${budget || 'High Couture ($500 - $3,000+)'}

Provide an elegant, bespoke 2-paragraph recommendation response with direct advice on fabrics (Silk Organza, Italian Micro Velvet, Chiffon, French Lace), cuts, accessorizing tips, and 2 category recommendations from [Bridal Dresses, Formal Dresses, Casual Wear, Luxury Pret, Party Wear, Kids Collection, Men's Collection]. Maintain a refined, ultra-polished tone.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const text = response.text || '';
      return res.json({
        recommendation: text,
        suggestedCategories: ['Luxury Pret', 'Bridal Dresses', 'Formal Dresses'],
        fashionTip: 'For couture gowns, schedule our complimentary custom stitching fitting service prior to final hem finishes.'
      });
    } catch (err: any) {
      console.error('Stylist API Error:', err);
      res.status(500).json({
        error: 'Stylist consultation unavailable',
        details: err.message
      });
    }
  });

  // Vite middleware in Development mode
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
