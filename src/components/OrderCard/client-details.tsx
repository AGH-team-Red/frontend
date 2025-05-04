import { ClientDetails, TCardDetails } from '@/components/OrderCard/types';
import { Citrus } from 'lucide-react';

const createClientDetails = (clientDetails: ClientDetails): TCardDetails[] => {
  const {
    order: { samplesCurrent, samplesCount, endDate }
  } = clientDetails;

  return [
    {
      icon: <Citrus size={16} />,
      label: 'Samples collected: ',
      values: `${samplesCurrent}/${samplesCount}`
    },
    {
      icon: <Citrus size={16} />,
      label: 'Active until:',
      values: new Date(`${endDate}`).toLocaleDateString('en-GB')
    }
  ];
};

export { createClientDetails };
