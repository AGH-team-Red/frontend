import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Requests() {
  return (
    <div className="flex h-[calc(100vh_-_var(--header-height))] flex-col items-center justify-center gap-4">
      <Link href="/requests/customer">
        <Button className="cursor-pointer">Customer orders</Button>
      </Link>
      <Link href="/requests/user">
        <Button className="cursor-pointer">User orders</Button>
      </Link>
    </div>
  );
}
