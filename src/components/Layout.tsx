import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-400">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
