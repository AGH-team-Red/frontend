'use client';

import { ClipboardList, LifeBuoy, ListTodo, SearchCheck, Send } from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/Nav/NavMain';
import { NavSecondary } from '@/components/Nav/NavSecondary';
import { NavUser } from '@/components/Nav/NavUser';
import { Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';

const data = {
  user: {
    name: 'Example user',
    email: 'm@example.com',
    avatar: '/avatars/user.jpg'
  },
  navMain: [
    {
      title: 'Orders',
      url: '/',
      icon: ClipboardList
    },
    {
      title: 'Browse Tasks',
      url: '/order/browse',
      icon: SearchCheck
    },
    {
      title: 'My Tasks',
      url: '/my-tasks',
      icon: ListTodo
    }
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
