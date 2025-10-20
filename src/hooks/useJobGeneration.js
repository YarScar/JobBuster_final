import { useMutation } from '@tanstack/react-query';

export function useJobGeneration() {
  return useMutation({
    mutationFn: async ({ keyword, location }) => {
      try {
        // Validate inputs
        if (!keyword || !location) {
          throw new Error('Keyword and location are required.');
        }

        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        if (!apiKey) {
          throw new Error('Missing OpenAI API key');
        }

        // Prepare the request body for the OpenAI API
        const requestBody = {
          model: 'gpt-4.1-nano', // Replace 'gpt-3.5-turbo' with 'gpt-4' if available
          messages: [
            {
              role: 'system',
              content:  `You are a helpful assistant that generates job opportunities. 
                Always respond with a valid JSON array. 
                Each job should include the following fields:
                - id (number)
                - title (string)
                - company (string)
                - location (string)
                - salary (string)
                - description (string, max 200 characters)
                - requirements (array of strings).`,
            },
            {
              role: 'user',
              content: `Find jobs related to "${keyword}" in "${location}".`,
            },
          ],
        };

        // Make the API request
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(requestBody),
        });

        // Handle non-OK responses
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Response Error:', errorData);
          throw new Error(errorData.error?.message || 'Failed to fetch job opportunities.');
        }

         // Parse the response data
        const data = await response.json();
        let jobs = [];
        try {
          jobs = JSON.parse(data.choices[0]?.message?.content || '[]'); // Parse the jobs array
        } catch (parseError) {
          console.error('Failed to parse jobs:', parseError.message);
          throw new Error('The API response is not valid JSON. Please try again.');
        }

        return jobs;
      } catch (error) {
        console.error('Error in useJobGeneration:', error.message);
        throw error; // Propagate the error to be handled by react-query
      }
    },
    onError: (error) => {
      console.error('Job Generation error:', error.message);
    },
  });
}