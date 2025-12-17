import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import Calendar from 'react-calendar';
import { Clock, User, CheckCircle, AlertCircle, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import { useApi } from '@/react-app/hooks/useApi';
import { AppointmentFormType } from '@/shared/types';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function AppointmentBooking() {
  const { fetchAvailability } = useApi();
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [step, setStep] = useState<'date' | 'time' | 'details'>('date');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const [formData, setFormData] = useState<AppointmentFormType>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceType: '',
    appointmentDate: '',
    appointmentTime: '',
    message: '',
  });

  const services = [
    'Website Design & Development',
    'Social Media Content Creation',
    'AI Agents & Automation',
    'Chatbot Development',
    'Brand Identity Design',
    'Digital Marketing Strategy'
  ];

  // Format date for API
  const formatDateForAPI = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  // Load available slots when date changes
  useEffect(() => {
    if (selectedDate && selectedDate instanceof Date) {
      const dateStr = formatDateForAPI(selectedDate);
      fetchAvailability(dateStr).then((result) => {
        if (result.success && result.data) {
          setAvailableSlots(result.data.availableSlots || []);
        }
      }).catch(() => {
        setAvailableSlots([]);
      });
    }
  }, [selectedDate, fetchAvailability]);

  // Handle date selection
  const handleDateChange = (value: Value) => {
    setSelectedDate(value);
    setSelectedTime('');
    if (value instanceof Date) {
      setFormData(prev => ({
        ...prev,
        appointmentDate: formatDateForAPI(value)
      }));
      setStep('time');
    }
  };

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setFormData(prev => ({
      ...prev,
      appointmentTime: time
    }));
    setStep('details');
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError('');
    setLoading(true);

    try {
      const formspreeData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        serviceType: formData.serviceType,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        message: formData.message,
        _subject: 'New Appointment Booking - Nexus Digital'
      };

      const response = await fetch('https://formspree.io/f/mblnnnal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formspreeData),
      });

      if (!response.ok) {
        throw new Error('Failed to schedule appointment');
      }

      setSuccess(true);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        serviceType: '',
        appointmentDate: '',
        appointmentTime: '',
        message: '',
      });
      setSelectedDate(new Date());
      setSelectedTime('');
      setStep('date');
    } catch (err) {
      console.error('Appointment booking error:', err);
      setError('Failed to schedule appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Check if date is selectable (no weekends, no past dates)
  const tileDisabled = ({ date }: { date: Date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0 || date.getDay() === 6;
  };

  // Format time for display
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour24 = parseInt(hours);
    const hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <section id="booking" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Homepage Button */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Homepage
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Schedule a
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Consultation</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Book a free consultation with our agency manager to discuss your project and find the perfect solution for your business.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'date' ? 'bg-blue-600 text-white' : step === 'time' || step === 'details' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              <CalendarIcon size={20} />
            </div>
            <div className={`w-16 h-1 ${step === 'time' || step === 'details' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'time' ? 'bg-blue-600 text-white' : step === 'details' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              <Clock size={20} />
            </div>
            <div className={`w-16 h-1 ${step === 'details' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'details' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              <User size={20} />
            </div>
          </div>
        </div>

        {success && (
          <div className="mb-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="text-green-600 dark:text-green-400 mr-3" size={24} />
              <div>
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Appointment Scheduled!</h3>
                <p className="text-green-700 dark:text-green-300">Thank you for booking a consultation. We'll send you a confirmation email with all the details shortly.</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center">
            <AlertCircle className="text-red-600 dark:text-red-400 mr-3" size={20} />
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8">
          {/* Step 1: Date Selection */}
          {step === 'date' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Select a Date</h3>
              <div className="inline-block bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                <style>{`
                  .react-calendar {
                    width: 100%;
                    max-width: 400px;
                    background: transparent;
                    border: none;
                    font-family: inherit;
                  }
                  .react-calendar__tile {
                    background: none;
                    border: none;
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    margin: 0.125rem;
                    color: inherit;
                  }
                  .react-calendar__tile:enabled:hover {
                    background-color: rgb(59 130 246 / 0.1);
                  }
                  .react-calendar__tile--active {
                    background: linear-gradient(to right, rgb(37 99 235), rgb(147 51 234)) !important;
                    color: white !important;
                  }
                  .react-calendar__tile:disabled {
                    background-color: rgb(107 114 128 / 0.1);
                    color: rgb(107 114 128);
                  }
                  .react-calendar__navigation__label {
                    color: inherit;
                    font-weight: 600;
                  }
                  .react-calendar__navigation__arrow {
                    color: inherit;
                  }
                `}</style>
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  tileDisabled={tileDisabled}
                  minDate={new Date()}
                  className="text-gray-900 dark:text-white"
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Available Monday - Friday. Select a date to continue.
              </p>
            </div>
          )}

          {/* Step 2: Time Selection */}
          {step === 'time' && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Select a Time</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedDate instanceof Date && `Available slots for ${selectedDate.toLocaleDateString()}`}
                </p>
              </div>

              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {availableSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-200 font-medium"
                    >
                      {formatTime(time)}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">No available slots for this date.</p>
                  <button
                    onClick={() => setStep('date')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Choose Different Date
                  </button>
                </div>
              )}

              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setStep('date')}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium"
                >
                  ← Back to Date Selection
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Details Form */}
          {step === 'details' && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Details</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedDate instanceof Date && selectedTime && 
                    `Appointment: ${selectedDate.toLocaleDateString()} at ${formatTime(selectedTime)}`
                  }
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service of Interest *
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell us about your project or any specific questions..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => setStep('time')}
                    className="flex-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium py-3"
                  >
                    ← Back to Time Selection
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? 'Scheduling...' : 'Schedule Appointment'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
