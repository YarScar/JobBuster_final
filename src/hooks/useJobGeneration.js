export function useJobGeneration() {
  return useMutation({
    mutationFn: async ({ keyword, location, newMessages }) => { // Add newMessages to the arguments
      const response = await fetch('/api/ChatBotJobAssistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // Pass the API key from environment variables
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // Just changed the model of gpt and it worked lmfao
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful job finder. Based on the keyword and location you will get job oppenings or aplications from bussinesses that are 1-5 years old.',
            },
            ...newMessages, // Use the passed newMessages
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch job generation response');
      }

      return await response.json();
    },
  });
}