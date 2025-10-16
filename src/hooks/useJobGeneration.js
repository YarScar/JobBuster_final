import { useMutation } from '@tanstack/react-query';

export function useJobGeneration() {
  return useMutation({
    mutationFn: async ({ keyword, location }) => {
      const response = await fetch('/api/getJobOpportunity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword, location }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate jobs');
      }

      const data = await response.json();
      return data;
    },
  });
}

export function useJobAssistant() {
  return useMutation({
    mutationFn: async ({ messages, jobContext }) => {
      // Input validation
      if (!Array.isArray(messages)) {
        throw new Error('Messages must be an array');
      }

      // Prepare request payload
      const requestBody = {
        messages: messages,
        jobContext: jobContext || null
      };

      // Make API call to chat assistant
      const response = await fetch('/api/job-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      // Handle response
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || 'Failed to get assistant response';
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    },

    // Enhanced error handling
    onError: (error) => {
      console.error('Job Assistant error:', error.message);
    },

    // Retry configuration
    retry: (failureCount, error) => {
      // Don't retry rate limiting errors
      if (error.message.includes('429') || error.message.includes('rate limit')) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },

    // Progressive retry delay
    retryDelay: (attemptIndex) => {
      return Math.min(1000 * 2 ** attemptIndex, 5000); // Max 5 second delay
    }
  });
}