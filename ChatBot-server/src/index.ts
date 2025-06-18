import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not found' });
  }

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
          {
  role: 'system',
  content: `আপনি একজন অভিজ্ঞ কৃষি পরামর্শদাতা, যিনি বাংলায় পরামর্শ দেন। আপনার উত্তরটি সুন্দরভাবে ফরম্যাট করে দিন। নিচের স্ট্রাকচারে উত্তর দিন:

🌱 রোগের নাম:
- রোগটির সম্ভাব্য নাম লিখুন।

🧪 লক্ষণ:
- রোগের সাধারণ লক্ষণগুলো বলুন।

🧬 কারণ:
- রোগটি কী কারণে হয়ে থাকে?

💊 প্রতিকার:
- কী করতে হবে?
- ছত্রাকনাশকের নাম দিন।

⚠️ পরামর্শ:
- ভবিষ্যতে কীভাবে প্রতিরোধ করা যায়?

write in short and concise sentences, use bullet points for clarity.`,
},
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3001',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error: any) {
    console.error('API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});