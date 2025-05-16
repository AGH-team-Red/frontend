import { ClientDetails, TCardDetails } from '@/components/OrderCard/types';
import { SwatchBook, Calendar } from 'lucide-react';

const createClientDetails = (clientDetails: ClientDetails): TCardDetails[] => {
  const {
    order: { currentSamplesCount, minSamplesCount, endDate }
  } = clientDetails;

  return [
    {
      icon: <SwatchBook size={16} />,
      label: 'Samples collected: ',
      values: `${currentSamplesCount}/${minSamplesCount}`
    },
    {
      icon: <Calendar size={16} />,
      label: 'Active until:',
      values: new Date(`${endDate}`).toLocaleDateString('en-GB')
    }
  ];
};

export { createClientDetails };
