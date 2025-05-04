import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type TDetailsData = {
  icon: LucideIcon;
  label: string;
  value: string;
};

type TDetailsCardProps = {
  header: string;
  detailsData: TDetailsData[];
};

const DetailsCard = ({ header, detailsData }: TDetailsCardProps) => {
  return (
    <Card className="p-0">
      <CardContent className="space-y-2.5 p-3">
        <h2 className="font-medium">{header}</h2>

        {detailsData.map((item) => (
          <div key={item.value} className="flex items-center gap-2">
            <item.icon />
            <span className="text-sm">
              {item.label}
              {item.value}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
