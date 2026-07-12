import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SiteHeader from '@/components/SiteHeader';
import Portfolio from '@/components/Portfolio';
import Footer from '@/components/Footer';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('portfolioTitle'),
    description: t('portfolioDescription'),
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <SiteHeader />
      <Portfolio standalone />
      <Footer />
    </main>
  );
}
