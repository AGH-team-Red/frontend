'use client';

import { useState } from 'react';
import OrderCard from '@/components/OrderCard/OrderCard';
import { useOrders } from '@/hooks/api/use-orders';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type SortOption = 'reward-asc' | 'reward-desc' | 'samples-asc' | 'samples-desc';

export default function Requests() {
  const query = useOrders();
  const [sortOption, setSortOption] = useState<SortOption>('reward-asc');

  if (query.isLoading) {
    return <Skeleton />;
  }

  if (query.error || !query.data) {
    return <div>Error</div>;
  }

  const sortedOrders = [...query.data].sort((a, b) => {
    switch (sortOption) {
      case 'reward-asc':
        return (a.reward ?? 0) - (b.reward ?? 0);
      case 'reward-desc':
        return (b.reward ?? 0) - (a.reward ?? 0);
      case 'samples-asc':
        return a.minSamplesCount - b.minSamplesCount;
      case 'samples-desc':
        return b.minSamplesCount - a.minSamplesCount;
      default:
        return 0;
    }
  });

  return (
    <div className="p-4">
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2 font-medium">
          Sortuj:
        </label>
        <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Sortuj według" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="reward-asc">Nagroda rosnąco</SelectItem>
            <SelectItem value="reward-desc">Nagroda malejąco</SelectItem>
            <SelectItem value="samples-asc">Liczba próbek rosnąco</SelectItem>
            <SelectItem value="samples-desc">Liczba próbek malejąco</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 place-items-center gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {sortedOrders.map((order) => (
          <OrderCard key={order.id} userType="user" order={order} onClickRoute="requests/user" />
        ))}
      </div>
    </div>
  );
}
