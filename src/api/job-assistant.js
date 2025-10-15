// Step 7: Conversational UI API endpoint

const rateLimit = new Map();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5 minutes
  const maxRequests = 10; // More generous for chat

  // Clean expired entries
  for (const [key, value] of rateLimit.entries()) {
    if (now - value.firstRequest > windowMs) {
      rateLimit.delete(key);
    }
  }

  const userRequests = rateLimit.get(ip) || { count: 0, firstRequest: now };
  if (userRequests.count >= maxRequests) {
    return res.status(429).json({
      error: 'Too many chat requests. Please wait a moment.',
      retryAfter: Math.ceil((userRequests.firstRequest + windowMs - now) / 1000)
    });
  }

  userRequests.count++;
  rateLimit.set(ip, userRequests);

  try {
    const { messages, jobContext } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Content filtering for chat messages
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
    const bannedWords = ['hack', 'exploit', 'illegal', 'violence'];
    
    if (bannedWords.some(word => lastMessage.includes(word))) {
      return res.status(400).json({
        error: 'Message content not allowed'
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful job search assistant. Help users with job applications, career advice, resume tips, and job search strategies. Be professional, encouraging, and provide actionable advice. Keep responses concise and helpful."
          },
          ...messages,
          {
            role: "system",
            content: jobContext ? `Current job context: ${JSON.stringify(jobContext)}` : ""
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI error: ${response.status}`);
    }

    const data = await response.json();
    return res.json({ 
      reply: data.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.",
      usage: data.usage
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: 'Assistant temporarily unavailable' });
  }
}