import { TCardDetails, UserDetails } from '@/components/OrderCard/types';
import { Users, HandCoins, Calendar } from 'lucide-react';

const createUserDetails = (userDetails: UserDetails): TCardDetails[] => {
  const {
    userType,
    order: { contributors, entryFee, endDate, minContributors }
  } = userDetails;
  const isUser = userType === 'user';

  return [
    {
      icon: <Users size={16} />,
      label: 'Contributors: ',
      values: isUser ? `${contributors}/${minContributors}` : ''
    },
    {
      icon: <HandCoins size={16} />,
      label: 'Entry fee: ',
      values: isUser ? `${entryFee} SOL` : ''
    },
    {
      icon: <Calendar size={16} />,
      label: 'Active until: ',
      values: new Date(`${endDate}`).toLocaleDateString('en-GB')
    }
  ];
};

export { createUserDetails };
