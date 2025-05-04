import ClientOrderCardDetails from '@/components/OrderCard/ClientOrderCardDetails';

type UserOrderPageProps = {
  params: Promise<{ requestId: string }>;
};

export default async function Page({ params }: UserOrderPageProps): Promise<React.ReactNode> {
  const { requestId } = await params;

  return <ClientOrderCardDetails requestId={requestId} />;
}
