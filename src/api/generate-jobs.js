// Steps 4 & 5: Secure API Proxy with Request/Response Contract

const rateLimit = new Map();

export default async function handler(req, res) {
  // CORS headers for local development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      code: 'METHOD_NOT_ALLOWED'
    });
  }

  // Step 5: Rate limiting
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;

  // Clean expired entries
  for (const [key, value] of rateLimit.entries()) {
    if (now - value.firstRequest > windowMs) {
      rateLimit.delete(key);
    }
  }

  // Check rate limit
  const userRequests = rateLimit.get(ip) || { count: 0, firstRequest: now };
  if (userRequests.count >= maxRequests) {
    const retryAfter = Math.ceil((userRequests.firstRequest + windowMs - now) / 1000);
    return res.status(429).json({
      error: 'Rate limit exceeded',
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter,
      message: `Too many requests. Try again in ${Math.ceil(retryAfter / 60)} minutes.`
    });
  }

  // Update rate limit
  userRequests.count++;
  rateLimit.set(ip, userRequests);

  try {
    // Step 4: Validate request payload
    const { 
      jobType = 'general',
      location = 'various',
      experienceLevel = 'all',
      industry = 'technology',
      requestId = Date.now().toString()
    } = req.body;

    // Step 5: Input validation
    if (typeof jobType !== 'string' || jobType.length > 50) {
      return res.status(400).json({
        error: 'Invalid job type',
        code: 'INVALID_JOB_TYPE'
      });
    }

    // Step 5: Content filtering
    const bannedWords = ['hack', 'exploit', 'illegal', 'violence', 'discrimination'];
    const inputText = `${jobType} ${location} ${industry}`.toLowerCase();
    
    if (bannedWords.some(word => inputText.includes(word))) {
      console.error(`Content filter triggered for IP ${ip}:`, {
        timestamp: new Date().toISOString(),
        requestId,
        reason: 'content_filter'
      });
      
      return res.status(400).json({
        error: 'Content not allowed',
        code: 'CONTENT_FILTERED'
      });
    }

    // Step 5: Secure OpenAI API call
    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: `You are a professional job listings generator. Create realistic, appropriate job postings for a job board. Focus on ${industry} positions in ${location} suitable for ${experienceLevel} experience levels. Generate ONLY valid JSON array format with no additional text.`
          },
          {
            role: "user",
            content: `Generate 15-20 diverse ${jobType} job openings. Each job must have: id (number), title (string), company (string), location (string), salary (string), description (string, max 200 chars), verified (boolean), requirements (array of strings). Ensure variety in companies, salaries, and positions. Return only valid JSON array.`
          }
        ],
        max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 2000,
        temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      })
    });

    if (!openAiResponse.ok) {
      console.error(`OpenAI API error for request ${requestId}:`, {
        status: openAiResponse.status,
        timestamp: new Date().toISOString()
      });

      if (openAiResponse.status === 429) {
        return res.status(503).json({
          error: 'Service temporarily busy',
          code: 'SERVICE_BUSY',
          retryAfter: 60
        });
      }

      throw new Error(`OpenAI API error: ${openAiResponse.status}`);
    }

    const openAiData = await openAiResponse.json();
    
    // Step 4: Return structured response
    const responsePayload = {
      success: true,
      data: {
        jobs: openAiData.choices[0]?.message?.content || '[]',
        generatedAt: new Date().toISOString(),
        requestId,
        metadata: {
          model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
          tokensUsed: openAiData.usage?.total_tokens || 0,
          processingTime: Date.now() - now
        }
      },
      suggestions: [
        'Try searching for specific job titles',
        'Filter by location or experience level',
        'Generate new listings for different industries'
      ]
    };

    return res.status(200).json(responsePayload);

  } catch (error) {
    console.error(`Server error:`, {
      message: error.message,
      timestamp: new Date().toISOString()
    });

    return res.status(500).json({
      error: 'Service temporarily unavailable',
      code: 'SERVICE_ERROR',
      message: 'Please try again in a few moments'
    });
  }
}