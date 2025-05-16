import { LoginForm } from '@/components/LoginForm/LoginForm';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={128} height={32} className="h-8 w-32" />
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
