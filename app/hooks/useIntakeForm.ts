'use client';

import { useState, FormEvent } from 'react';
import { useSaveIntake } from './useSaveIntake';
import { FormData } from '@/app/types/intake';

interface UseIntakeForm {
  formData: FormData;
  errors: Partial<FormData>;
  isLoading: boolean;
  error: string | null;
  handleChange: (field: keyof FormData) => (event: { target: { value: string } }) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
}

export const useIntakeForm = (onComplete: () => void): UseIntakeForm => {
  const [formData, setFormData] = useState<FormData>({
    description: '',
    state: '',
    caseType: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const { saveIntake, isLoading, error } = useSaveIntake();

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Please enter your question';
    }
    if (!formData.state) {
      newErrors.state = 'Please select a state';
    }
    if (!formData.caseType) {
      newErrors.caseType = 'Please select case type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData) =>
    (event: { target: { value: string } }) => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value
      }));

      if (errors[field]) {
        setErrors(prev => ({
          ...prev,
          [field]: undefined
        }));
      }
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await saveIntake(formData);
      onComplete();
    } catch (err) {
      console.error('Failed to save intake data:', err);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    error,
    handleChange,
    handleSubmit
  };
};