import { useMutation } from "@tanstack/react-query";

export function useJobGeneration() {
  return useMutation({
    mutationFn: async ({ keyword, location }) => {
      try {
        if (!keyword || !location) {
          throw new Error("Keyword and location are required.");
        }

        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        if (!apiKey) {
          throw new Error("Missing OpenAI API key");
        }

        const requestBody = {
          model: "gpt-4.1-nano", // Use the correct model
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant that generates job opportunities. 
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
              role: "user",
              content: `Find jobs related to "${keyword}" in "${location}".`,
            },
          ],
        };

        console.log("Sending API request with body:", requestBody);

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API Response Error:", errorData);
          throw new Error(errorData.error?.message || "Failed to fetch job opportunities.");
        }

        const data = await response.json();
        console.log("API response received:", data);

        const choices = data.choices;
        if (!choices || choices.length === 0) {
          throw new Error("No choices returned from the API.");
        }

        let jobs = [];
        try {
          const content = choices[0]?.message?.content;
          console.log("Raw content from API:", content);
          jobs = JSON.parse(content); // Parse the JSON string
        } catch (parseError) {
          console.error("Failed to parse jobs:", parseError.message);
          throw new Error("The API response is not valid JSON. Please try again.");
        }

        return jobs;
      } catch (error) {
        console.error("Error in useJobGeneration:", error.message);
        throw error;
      }
    },
    onError: (error) => {
      console.error("Job Generation error:", error.message);
    },
  });
}