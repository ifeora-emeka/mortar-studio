
export function generateRandomID(length?: number): string {
  return Math.random().toString(36).substring(2, (length || 9) + 2);
}

export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
