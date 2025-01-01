'use client';

import { useState, useEffect } from 'react';

interface Case {
  id: string;
  description: string;
  state: string;
  caseType: string;
  additionalInfo?: string;
  timestamp: string;
}

export function useCases(ids?: string[]) {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const url = ids?.length
          ? `/api/cases?ids=${ids.join(',')}`
          : '/api/cases';

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch cases');

        const data = await response.json();
        setCases(data.cases);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [ids]);

  const deleteCase = async (id: string) => {
    setError(null); // Clear any previous errors

    try {
      const response = await fetch(`/api/cases/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete case');
      }

      setCases(prevCases => prevCases.filter(c => c.id !== id));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete case';
      setError(errorMessage);
      throw new Error(errorMessage); // Re-throw the error for the component to handle
    }
  };
  return { cases, loading, error, deleteCase };
}