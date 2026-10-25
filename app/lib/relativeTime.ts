// "5 minutes ago", "3 days ago", "2 months ago" — computed at render
// time against the current request (pages here are already
// force-dynamic, so this is always accurate as of the request, no
// client-side ticking needed).
export function formatRelativeTime(isoDate: string): string {
  const then = new Date(isoDate).getTime();
  const now = Date.now();
  const seconds = Math.max(0, Math.floor((now - then) / 1000));

  const units: [string, number][] = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['week', 60 * 60 * 24 * 7],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
  ];

  for (const [label, unitSeconds] of units) {
    const count = Math.floor(seconds / unitSeconds);
    if (count >= 1) {
      return `${count} ${label}${count === 1 ? '' : 's'} ago`;
    }
  }

  return 'just now';
}
