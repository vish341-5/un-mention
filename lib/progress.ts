const STORAGE_KEY = "unmention_progress";

interface BookProgress {
  completedDays: number[];
  currentDay: number;
}

interface AllProgress {
  [slug: string]: BookProgress;
}

export function getProgress(slug: string): BookProgress {
  if (typeof window === "undefined") 
    return { completedDays: [], currentDay: 1 };
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return { completedDays: [], currentDay: 1 };
  
  const all: AllProgress = JSON.parse(stored);
  return all[slug] || { completedDays: [], currentDay: 1 };
}

export function completeDay(slug: string, day: number): void {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(STORAGE_KEY);
  const all: AllProgress = stored ? JSON.parse(stored) : {};
  const current = all[slug] || { completedDays: [], currentDay: 1 };

  if (!current.completedDays.includes(day)) {
    current.completedDays.push(day);
  }
  current.currentDay = Math.max(...current.completedDays) + 1;

  all[slug] = current;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function getProgressPercent(
  slug: string, 
  totalDays: number
): number {
  const { completedDays } = getProgress(slug);
  return Math.round((completedDays.length / totalDays) * 100);
}

export function isDayUnlocked(slug: string, day: number): boolean {
  if (day === 1) return true;
  const { completedDays } = getProgress(slug);
  return completedDays.includes(day - 1);
}