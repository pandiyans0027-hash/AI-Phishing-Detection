import { Outlet } from 'react-router';
import { Navigation } from './Navigation';
import { Toaster } from './ui/sonner';

export function Layout() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Outlet />
      <Toaster position="top-right" richColors />
    </div>
  );
}