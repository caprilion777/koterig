import Hero from '@/components/Hero';
import Services from '@/components/Services';
import AboutUs from '@/components/AboutUs';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="top">
      <Hero />
      <Services />
      <AboutUs />
      <Contact />
      <Footer />
    </main>
  );
}
