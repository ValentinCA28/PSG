'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password';

  return (
    <div className="flex h-screen overflow-hidden">
      {!isAuthPage && <Sidebar />}
      <main className="flex-1 overflow-y-auto w-full md:w-auto">
        {children}
      </main>
    </div>
  );
}

