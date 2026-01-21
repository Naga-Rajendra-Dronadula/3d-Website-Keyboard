import KeyboardScroll from '@/components/KeyboardScroll';
import Navigation from '@/components/Navigation';
import Specifications from '@/components/Specifications';
import Footer from '@/components/Footer';
import FeaturesGrid from '@/components/FeaturesGrid';
import SoundTest from '@/components/SoundTest';

export default function Home() {
  return (
    <main className="bg-[#ECECEC] min-h-screen">
      <Navigation />
      <KeyboardScroll />
      <FeaturesGrid />
      <SoundTest />
      <Specifications />
      <Footer />
    </main>
  );
}
