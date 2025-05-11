import { useIsMobile } from '@/hooks/use-mobile';

export default function ProgressCircle({ current, total }: { current: number; total: number }) {
  const isMobile = useIsMobile();
  const percentage = total === 0 ? 0 : Math.round((current / total) * 100);
  const strokeWidth = isMobile ? 4 : 8;
  const size = isMobile ? 40 : 80;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = (percentage / 100) * circumference;

  return (
    <div className={`relative flex items-center justify-center ${isMobile ? 'h-10 w-10' : 'h-20 w-20'}`}>
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
