import { useMutation } from '@tanstack/react-query';

export function useJobGeneration() {
  return useMutation({
    mutationFn: async ({ keyword, location }) => {
      const response = await fetch('/api/generate-jobs', {
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