import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

type DetailsData = {
  icon: LucideIcon;
  label: string;
  value: string;
};

type DetailsCardProps = {
  className?: string;
  header: string;
  detailsData: DetailsData[];
};

const DetailsCard = ({ header, detailsData, className }: DetailsCardProps) => {
  return (
    <Card className={cn('p-0 md:py-6', className)}>
      <CardContent className="space-y-2.5 p-3 md:space-y-4 md:py-0 lg:px-3 xl:px-6">
        <h2 className="font-medium">{header}</h2>

        {detailsData.map((item) => (
          <div key={item.value} className="flex items-center space-x-3">
            <item.icon className="text-primary" />
            <div>
              <div className="text-sm text-gray-400">{item.label}</div>
              <div>{item.value}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
