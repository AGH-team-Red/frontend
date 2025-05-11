import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Feature, Order } from '@/lib/types';
import { formatDateRange, STATUS_COLORS, STATUS_DISPLAY } from '@/lib/utils';
import { Calendar, CircleDollarSign, Clock, FileText, ImageIcon, Languages, SwatchBook } from 'lucide-react';
import { OrderInfoItem } from './OrderInfoItem';

export default function DesktopOrderView({ data }: { data: Order }) {
  return (
    <div className="mx-auto w-full max-w-3xl p-4">
      <Card className="col-span-2 row-span-3 w-full place-self-start lg:col-span-2">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl font-bold">{data.name}</CardTitle>
            <CardDescription className="mt-1">{data.datasetDescription}</CardDescription>
          </div>
          <Badge className={STATUS_COLORS[data.status]}>{STATUS_DISPLAY[data.status]}</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SwatchBook className="text-muted-foreground h-4 w-4" />
                  <span className="text-sm font-medium">Samples</span>
                </div>
                <span className="font-medium">
                  {data.currentSamplesCount}/{data.minSamplesCount}
                </span>
              </div>
              <Progress value={(data.currentSamplesCount / data.minSamplesCount) * 100} className="h-2 bg-white" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="text-muted-foreground h-4 w-4" />
                  <span className="text-sm font-medium">Start Date</span>
                </div>
                <p className="text-sm">{new Date(`${data.startDate}`).toLocaleDateString('en-GB')}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="text-muted-foreground h-4 w-4" />
                  <span className="text-sm font-medium">End Date</span>
                </div>
                <p className="text-sm">{new Date(`${data.endDate}`).toLocaleDateString('en-GB')}</p>
              </div>
            </div>

            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger className="cursor-pointer" value="overview">
                  Overview
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="parameters">
                  Parameters
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="details">
                  Details
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Budget</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{data.budget} SOL</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Completion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {(data.currentSamplesCount / data.minSamplesCount) * 100}%
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span>New samples added</span>
                        <span className="text-muted-foreground">2 hours ago</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Budget updated</span>
                        <span className="text-muted-foreground">Yesterday</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="parameters" className="space-y-4 pt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Order Parameters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <OrderInfoItem icon={Clock}>
                        Order duration: {formatDateRange(data.startDate, data.endDate)}
                      </OrderInfoItem>
                      <OrderInfoItem icon={CircleDollarSign}>Budget: {data.budget} SOL</OrderInfoItem>
                      <OrderInfoItem icon={Languages}>Label language: {data.labelingLanguage}</OrderInfoItem>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="details" className="space-y-4 pt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Dataset Image Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <OrderInfoItem icon={ImageIcon} label="Image guidelines">
                      <p className="text-muted-foreground mt-1 text-sm">{data.imageGuidelines}</p>
                    </OrderInfoItem>
                  </CardContent>
                </Card>

                {data.features && <FeaturesDisplay features={data.features} />}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function FeaturesDisplay({ features }: { features: Feature[] }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Dataset Features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {features.map((feature) => (
            <div key={feature.name} className="space-y-2">
              <h3 className="text-sm font-medium">{feature.name}</h3>
              <OrderInfoItem icon={FileText} label="Label guidelines">
                <p className="text-muted-foreground mt-1 text-sm">{feature.labelGuidelines}</p>
              </OrderInfoItem>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
