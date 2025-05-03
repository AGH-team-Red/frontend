import ProgressCircle from "@/components/ProgressCircle";
import { Card, CardContent } from "@/components/ui/card";

type TRequestHeaderData = {
  label: string;
  value: string;
};

type TProgressCircleData = {
  samplesCurrent: number;
  samplesTotal: number;
};

type TDetailsHeaderProps = {
  datasetName: string;
  requestDescrption: string;
  progressCircleData: TProgressCircleData;
  requestHeaderData: TRequestHeaderData[];
};

const DetailsHeader = ({
  datasetName,
  requestDescrption,
  progressCircleData,
  requestHeaderData,
}: TDetailsHeaderProps) => {
  return (
    <Card className="p-6">
      <CardContent className="flex flex-col gap-3 p-0">
        <div className="flex gap-2">
          <div className="flex items-center pr-4">
            <ProgressCircle
              current={progressCircleData.samplesCurrent}
              total={progressCircleData.samplesTotal}
            />
          </div>
          <div className="flex flex-1 flex-col space-y-2">
            <h1 className="text-base">{datasetName}</h1>
            <div className="flex gap-3">
              {requestHeaderData.map((item) => (
                <div key={item.value} className="flex flex-col">
                  <h2 className="text-xs">{item.label}</h2>
                  <p className="text-2xl">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm">{requestDescrption}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailsHeader;
