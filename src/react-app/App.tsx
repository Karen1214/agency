import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ThemeProvider } from "@/react-app/contexts/ThemeContext";
import HomePage from "@/react-app/pages/Home";
import BookingPage from "@/react-app/pages/Booking";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
