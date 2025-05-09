import CustomerOrderCardDetails from '@/components/OrderCard/CustomerOrderCardDetails';

type CustomerOrderPageProps = {
  params: Promise<{ requestId: string }>;
};

export default async function Page({ params }: CustomerOrderPageProps): Promise<React.ReactNode> {
  const { requestId } = await params;

  return <CustomerOrderCardDetails requestId={requestId} />;
}
