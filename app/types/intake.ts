// src/types/intake.ts
export interface FormData {
  description: string;
  state: string;
  caseType: string;
  additionalInfo: string;
}

export interface IntakeData extends FormData {
  id: string;
  timestamp: string;
   description: string;
  state: string;
  caseType: string;
  additionalInfo: string;
}