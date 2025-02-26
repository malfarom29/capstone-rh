import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomColor(usedColors: string[]) {
  const colors = [
    '#D9ED92', '#B5E48C', '#99D98C', '#76C893', '#52B69A',
    '#34A0A4', '#168AAD', '#1A759F', '#1E6091', '#184E77'
  ];
  
  const availableColors = colors.filter(color => !usedColors.includes(color));
  if (availableColors.length === 0) return colors[0];
  
  return availableColors[Math.floor(Math.random() * availableColors.length)];
}