import { AdoptionStatus } from './adoption';
import { Gender } from './pet';

export const SPECIES_LABELS: Record<string, string> = {
  dog: 'Kutya',
  cat: 'Macska',
  rabbit: 'Nyúl',
};

export const GENDER_LABELS: Record<Gender, string> = {
  male: 'Hím',
  female: 'Nőstény',
  unknown: 'Ismeretlen',
};

export const HEALTH_LABELS: Record<string, string> = {
  healthy: 'Egészséges',
  'under observation': 'Megfigyelés alatt',
  'needs treatment': 'Kezelésre szorul',
};

export const STATUS_LABELS: Record<AdoptionStatus, string> = {
  pending: 'Függőben',
  approved: 'Jóváhagyva',
  rejected: 'Elutasítva',
};

export const STATUS_BADGES: Record<AdoptionStatus, string> = {
  pending: 'text-bg-warning',
  approved: 'text-bg-success',
  rejected: 'text-bg-danger',
};