import Header from '@/react-app/components/Header';
import AppointmentBooking from '@/react-app/components/AppointmentBooking';
import Footer from '@/react-app/components/Footer';
import Chatbot from '@/react-app/components/Chatbot';

export default function Booking() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-16">
        <AppointmentBooking />
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
}
