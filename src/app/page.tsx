import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <Link href="/requests">
        <Button className="cursor-pointer">My requests</Button>
      </Link>
      <Link href="/requests/new">
        <Button className="cursor-pointer">Create a request</Button>
      </Link>
    </div>
  );
}
