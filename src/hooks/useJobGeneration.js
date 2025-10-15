import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Step 6: Job generation hook with TanStack Query
export function useJobGeneration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await fetch('/api/generate-jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Step 6: Cache successful job generation
      queryClient.setQueryData(['jobs', 'latest'], data);
    },
    // Step 6: Retry logic for failed requests
    retry: (failureCount, error) => {
      if (error.message.includes('Rate limit')) return false;
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Step 6: Job assistant chat hook
export function useJobAssistant() {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await fetch('/api/job-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Assistant unavailable');
      }

      return response.json();
    },
    retry: 1,
  });
}

// Step 6: Cache recent jobs with persistence
export function useCachedJobs() {
  return useQuery({
    queryKey: ['jobs', 'cached'],
    queryFn: () => {
      const cached = localStorage.getItem('jobBuster_cachedJobs');
      return cached ? JSON.parse(cached) : [];
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}