const progressKey = (slug: string) => `unmention-progress-${slug}`;

export function getProgress(slug: string): number[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(progressKey(slug));
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}

export function completeDay(slug: string, day: number): void {
  if (typeof window === "undefined") return;
  const completedDays = getProgress(slug);
  if (!completedDays.includes(day)) {
    completedDays.push(day);
  }
  localStorage.setItem(progressKey(slug), JSON.stringify(completedDays));
}

export function isDayUnlocked(slug: string, day: number): boolean {
  if (day === 1) return true;
  return getProgress(slug).includes(day - 1);
}

export function getProgressPercent(slug: string, totalDays: number): number {
  return Math.round((getProgress(slug).length / totalDays) * 100);
}