import ProgressCircle from '@/components/ProgressCircle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type RequestHeaderData = {
  label: string;
  value: string;
};

type ProgressCircleData = {
  samplesCurrent: number;
  samplesTotal: number;
};

type DetailsHeaderProps = {
  orderDescription: string;
  progressCircleData: ProgressCircleData;
  orderHeaderData: RequestHeaderData[];
};

const DetailsHeader = ({ orderDescription, progressCircleData, orderHeaderData }: DetailsHeaderProps) => {
  return (
    <Card className="p-6">
      <CardContent className="flex flex-col gap-3 p-0">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="md:text-2xl">Challenge Overview</CardTitle>
        </CardHeader>
        <div className="flex items-center gap-2">
          <div className="mr-4 flex items-center">
            <ProgressCircle current={progressCircleData.samplesCurrent} total={progressCircleData.samplesTotal} />
          </div>
          <div className="flex w-full justify-between">
            {orderHeaderData.map((item) => (
              <div key={item.value} className="flex flex-col">
                <div className="text-xs text-gray-400 sm:text-base">{item.label}</div>
                <div className="text-xl font-bold sm:text-3xl">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-800 pt-4">
          <h3 className="mb-3 text-xl font-semibold">Description</h3>
          <p className="leading-relaxed text-gray-300">{orderDescription}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailsHeader;
