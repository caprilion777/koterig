import type { Metadata } from 'next';
import SiteHeader from '../../components/SiteHeader';
import Portfolio from '../../components/Portfolio';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Портфолио | Koterig OÜ',
  description: 'Наши проекты - Koterig OÜ',
};

export default function PortfolioPage() {
  return (
    <main>
      <SiteHeader />
      <Portfolio standalone />
      <Footer />
    </main>
  );
}
