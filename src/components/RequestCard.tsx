"use-client";

import ProgressCircle from "@/components/ProgressCircle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Citrus } from "lucide-react";
import Link from "next/link";
import { RequestStatus } from "@/lib/types";

type TBaseProps = {
  id: string;
  name: string;
  dueDate: Date;
  samplesCurrent: number;
  samplesTotal: number;
  onClickRoute: string;
};

type TClientCardProps = TBaseProps & {
  userType: "client";
  status: RequestStatus;
};

type TUserCardProps = TBaseProps & {
  userType: "user";
  reward: number;
  contributors: number;
  minContributors: number;
  entryFee: number;
};

type TRequestCardProps = TClientCardProps | TUserCardProps;

type TCardDetails = {
  icon: React.ReactNode;
  label: string;
  values: string;
};

const RequestCard = (props: TRequestCardProps) => {
  const { id, name, dueDate, samplesCurrent, samplesTotal, onClickRoute } =
    props;

  const isUser = props.userType === "user";

  const userDetails = [
    {
      icon: <Citrus size={16} />,
      label: "Contributors: ",
      values: isUser ? `${props.contributors}/${props.minContributors}` : "",
    },
    {
      icon: <Citrus size={16} />,
      label: "Entry fee: ",
      values: isUser ? `${props.entryFee} SOL` : "",
    },
    {
      icon: <Citrus size={16} />,
      label: "Active untill: ",
      values: dueDate.toLocaleDateString("en-GB"),
    },
  ];

  const clientDetails = [
    {
      icon: <Citrus size={16} />,
      label: "Samples collected: ",
      values: `${samplesCurrent}/${samplesTotal}`,
    },
    {
      icon: <Citrus size={16} />,
      label: "Active until:",
      values: dueDate.toLocaleDateString("en-GB"),
    },
  ];

  const renderDetails = (detailsData: TCardDetails[]) => {
    return (
      <div className="flex flex-1 flex-col space-y-2 text-xs">
        <p>{name}</p>
        {detailsData.map((detail) => (
          <div key={detail.label} className="flex items-center gap-2">
            {detail.icon}
            {detail.label}
            {detail.values}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Link key={id} href={`/${onClickRoute}/${id}`} className="block">
      <Card className="py-3">
        <CardContent className="flex gap-4 px-3">
          <div className="flex items-center">
            <ProgressCircle current={samplesCurrent} total={samplesTotal} />
          </div>
          {renderDetails(isUser ? userDetails : clientDetails)}
          <div className="flex flex-col justify-between">
            {isUser ? (
              <>
                <div className="flex flex-col items-center">
                  <p className="text-sm">Reward</p>
                  <p className="font-medium">{`${props.reward} SOL`}</p>
                </div>
                <Button>Join</Button>
              </>
            ) : (
              <Badge>{props.status}</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RequestCard;
