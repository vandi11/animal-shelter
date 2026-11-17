export type Gender = 'male' | 'female' | 'unknown';

export interface Pet {
  id: number;
  species: string;
  name: string;
  photo_path: string | null;
  gender: Gender;
  birth_date: string | null;
  weight: string | number | null;
  color: string | null;
  adopted: boolean;
  health_status: string | null;
  sterilized: boolean;
  arrival_date: string | null;
  adopted_at: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface PetFilters {
  species?:string;
  gender?: Gender;
  adopted?: boolean;
}