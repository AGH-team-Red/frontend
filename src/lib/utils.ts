import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB');
}

export function formatDateRange(startDate: string, endDate: string) {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export const STATUS_DISPLAY: Record<string, string> = {
  active: 'ACT',
  pending: 'PEN',
  completed: 'CMP',
  expired: 'EXP'
};

export const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-500 hover:bg-green-600',
  pending: 'bg-yellow-500 hover:bg-yellow-600',
  completed: 'bg-blue-500 hover:bg-blue-600',
  expired: 'bg-gray-500 hover:bg-gray-600'
};
