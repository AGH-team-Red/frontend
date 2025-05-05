import { IconTooltip } from "@/components/IconTooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Citrus } from "lucide-react";
import Image from "next/image";

export default function CrossCheckTask({ userLabel }: { userLabel: string }) {
  return (
    <>
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={"https://picsum.photos/350/160"}
          className="rounded-md object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          alt="Example image"
        />
      </div>
      <div className="flex items-center gap-2">
        <IconTooltip text="Dummy text">
          <Citrus size={16} />
        </IconTooltip>
        Feature name
      </div>
      <Card className="py-3">
        <CardContent className="flex flex-col space-y-2 px-3 text-xs">
          <p>{userLabel}</p>
        </CardContent>
      </Card>
      <div className="flex items-center justify-between">
        <Button variant="destructive">Incorrect</Button>
        <Button variant="secondary">Correct</Button>
      </div>
    </>
  );
}
