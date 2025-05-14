import CustomerOrderCardDetails from '@/components/OrderCard/customer/CustomerOrderCardDetails';

type CustomerOrderPageProps = {
  params: Promise<{ orderId: string }>;
};

export default async function Page({ params }: CustomerOrderPageProps): Promise<React.ReactNode> {
  const { orderId } = await params;

  return <CustomerOrderCardDetails orderId={orderId} />;
}
