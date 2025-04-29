export default function ProgressCircle({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const percentage = total === 0 ? 0 : Math.round((current / total) * 100);
  const strokeWidth = 4;
  const size = 40;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = (percentage / 100) * circumference;

  return (
    <div className="relative flex h-10 w-10 items-center justify-center">
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted-foreground opacity-20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dash}
          className="text-primary"
        />
      </svg>
    </div>
  );
}
