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

  return { cases, loading, error };
}