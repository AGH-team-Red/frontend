import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <Link href="/requests/customer">
        <Button className="cursor-pointer">Customer requests</Button>
      </Link>
      <Link href="/requests/user">
        <Button className="cursor-pointer">User requests</Button>
      </Link>
    </div>
  );
}
