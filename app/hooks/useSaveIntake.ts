'use client';

import { useState } from 'react';
import { FormData } from '@/app/types/intake';

interface SaveIntakeResponse {
 success: boolean;
 id: string;
}

export function useSaveIntake() {
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const saveIntake = async (data: FormData): Promise<SaveIntakeResponse> => {
   setIsLoading(true);
   setError(null);

   try {
     const response = await fetch('/api/intake', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(data),
     });

     if (!response.ok) {
       throw new Error('Failed to save intake data');
     }

     return await response.json();
   } catch (err) {
     setError(err instanceof Error ? err.message : 'An error occurred');
     throw err;
   } finally {
     setIsLoading(false);
   }
 };

 return {
   saveIntake,
   isLoading,
   error
 };
}