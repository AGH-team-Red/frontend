import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Link href="/requests">
        <Button className="cursor-pointer">Click me</Button>
      </Link>
    </div>
  );
}
