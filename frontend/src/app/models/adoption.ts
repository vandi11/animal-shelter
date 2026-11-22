import { Pet } from './pet';
import { User } from './user';

export type AdoptionStatus = 'pending' | 'approved' | 'rejected';

export interface Adoption {
  id: number;
  status: AdoptionStatus;
  pet?: Pet;
  user?: User;
  created_at: string;
  updated_at: string;
}