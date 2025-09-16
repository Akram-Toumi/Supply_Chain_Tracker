import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

const Layout = ({ children, sidebar }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0F1F17]">
      {sidebar}
      <main className="ml-64 p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
