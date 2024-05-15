export function timeAgo(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const secondsAgo = Math.floor((now.getTime() - past.getTime()) / 1000);

  const units = [
    { name: "year", seconds: 31536000 },
    { name: "month", seconds: 2592000 },
    { name: "week", seconds: 604800 },
    { name: "day", seconds: 86400 },
    { name: "hour", seconds: 3600 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const count = Math.floor(secondsAgo / unit.seconds);
    if (count > 0) {
      return `${count} ${unit.name}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}
