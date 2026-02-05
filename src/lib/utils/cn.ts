/**
 * CN Utility
 * 
 * Combina clsx y tailwind-merge para clases condicionales
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
