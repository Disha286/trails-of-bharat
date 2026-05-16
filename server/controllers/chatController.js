import Groq from 'groq-sdk';

export const chat = async (req, res) => {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { message, language } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const systemPrompt = `You are a helpful travel assistant for trails-of-bharat, an India eco and cultural tourism platform.
    You help tourists plan trips, answer questions about destinations, local culture, food, transport, and experiences across India.
    You are friendly, knowledgeable, and concise.
    You specialize in eco-tourism, heritage sites, tribal culture, wildlife, and adventure travel in India.
    If the user writes in Hindi, respond in Hindi. If in English, respond in English.
    Keep responses under 150 words. Always be helpful and encouraging about exploring India.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 200
    });

    const reply = completion.choices[0]?.message?.content;

    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({ message: 'Chat failed', error: error.message });
  }
};