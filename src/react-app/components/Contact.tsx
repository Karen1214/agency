import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContactFormType } from '@/shared/types';

export default function Contact() {
  const { t } = useTranslation();
  
  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.info.email.title'),
      info: 'hello@nexusdigital.com',
      description: t('contact.info.email.description')
    },
    {
      icon: Mail,
      title: 'Marketing Email',
      info: 'marketing1424@outlook.com',
      description: 'For marketing inquiries'
    }
  ];

  const services = t('contact.form.servicesList', { returnObjects: true }) as string[];

  const [formData, setFormData] = useState<ContactFormType>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    services: [],
    projectDetails: '',
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...(prev.services || []), service]
        : (prev.services || []).filter(s => s !== service)
    }));
  };

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
        services: formData.services?.join(', ') || '',
        projectDetails: formData.projectDetails,
        _subject: 'New Contact Form Submission - Nexus Digital'
      };

      const response = await fetch('https://formspree.io/f/mblnnnal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formspreeData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSuccess(true);
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        services: [],
        projectDetails: '',
      });
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('contact.title')}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> {t('contact.titleGradient')}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact form */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('contact.form.title')}</h3>
            
            {success && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center">
                <CheckCircle className="text-green-600 dark:text-green-400 mr-3" size={20} />
                <p className="text-green-800 dark:text-green-200">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center">
                <AlertCircle className="text-red-600 dark:text-red-400 mr-3" size={20} />
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.form.firstName')}
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
                    {t('contact.form.lastName')}
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
                  {t('contact.form.email')}
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
                  {t('contact.form.phone')}
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
                  {t('contact.form.services')}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service) => (
                    <label key={service} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.services?.includes(service) || false}
                        onChange={(e) => handleServiceChange(service, e.target.checked)}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.form.projectDetails')}
                </label>
                <textarea
                  rows={4}
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder={t('contact.form.projectPlaceholder')}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Sending...' : t('contact.form.sendMessage')}
                <Send className={`ml-2 ${loading ? 'animate-pulse' : ''}`} size={18} />
              </button>
            </form>
          </div>

          {/* Contact info and CTA */}
          <div className="space-y-8">
            {/* Contact methods */}
            <div className="space-y-6">
              {contactInfo.map((contact) => (
                <div key={contact.title} className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <contact.icon className="text-white" size={20} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{contact.title}</h4>
                    <p className="text-lg text-gray-900 dark:text-white font-medium">{contact.info}</p>
                    <p className="text-gray-600 dark:text-gray-300">{contact.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Response time */}
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('contact.response.title')}</h4>
              <p className="text-gray-600 dark:text-gray-300">{t('contact.response.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
