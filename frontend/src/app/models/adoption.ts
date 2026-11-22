import { Pet } from './pet';

export type AdoptionStatus = 'pending' | 'approved' | 'rejected';

export interface Adoption {
  id: number;
  status: AdoptionStatus;
  pet?: Pet;
  created_at: string;
  updated_at: string;
}