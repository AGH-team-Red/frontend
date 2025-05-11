import { LucideIcon } from 'lucide-react';
import React from 'react';

interface OrderInfoItemProps {
  icon: LucideIcon;
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export function OrderInfoItem({ icon: Icon, label, children, className = '' }: OrderInfoItemProps) {
  return (
    <li className={`flex items-center gap-3 ${className}`}>
      <Icon className="text-muted-foreground h-4 w-4" />
      <div>
        {label && <span className="text-sm font-medium">{label}:</span>}
        {typeof children === 'string' ? <span className="text-sm">{children}</span> : children}
      </div>
    </li>
  );
}
