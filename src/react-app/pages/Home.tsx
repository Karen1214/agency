import Header from '@/react-app/components/Header';
import Hero from '@/react-app/components/Hero';
import Services from '@/react-app/components/Services';
import About from '@/react-app/components/About';
import Portfolio from '@/react-app/components/Portfolio';
import Contact from '@/react-app/components/Contact';
import Footer from '@/react-app/components/Footer';
import Chatbot from '@/react-app/components/Chatbot';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
}
