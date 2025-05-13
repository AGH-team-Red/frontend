import { redirect } from 'next/navigation';

export default function Home() {
  const isAuthenticated = false;

  if (isAuthenticated) {
    redirect('/my-tasks');
  } else {
    redirect('/login');
  }
}
