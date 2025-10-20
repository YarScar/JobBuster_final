export default async function handler(req, res) {
  const { keyword, location } = req.body;

  const prompt = `
    Generate a list of verified jobs from businesses that are 1-5 years old.
    The jobs should match the keyword "${keyword}" and be located in "${location}".
    Each job should include:
    - id (number)
    - title (string)
    - company (string)
    - location (string)
    - salary (string)
    - description (string, max 200 chars)
    - verified (boolean)
    - requirements (array of strings)
    Return the data as a JSON array.
  `;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch jobs from OpenAI');
    }

    const data = await response.json();
    console.log('API Response:', data); // Log the API response
    const jobs = JSON.parse(data.choices[0].message.content);
    res.status(200).json({ jobs });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to generate jobs' });
  }
}