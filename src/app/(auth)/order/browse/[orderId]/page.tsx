import ClientOrderCardDetails from '@/components/OrderCard/ClientOrderCardDetails';

type CustomerOrderPageProps = {
  params: Promise<{ orderId: string }>;
};

export default async function Page({ params }: CustomerOrderPageProps): Promise<React.ReactNode> {
  const { orderId } = await params;

  return <ClientOrderCardDetails orderId={orderId} />;
}
