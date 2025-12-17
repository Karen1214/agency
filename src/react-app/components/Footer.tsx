import { Mail, Facebook, Instagram } from 'lucide-react';
import { Music2 } from 'lucide-react'; // Using Music2 as TikTok icon
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  
  const services = t('footer.services.list', { returnObjects: true }) as string[];
  const company = t('footer.company.list', { returnObjects: true }) as string[];
  const support = t('footer.support.list', { returnObjects: true }) as string[];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/NexuMarketDigit/', name: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/marketdigit_2414/', name: 'Instagram' },
    { icon: Music2, href: 'https://tiktok.com/@marketin730', name: 'TikTok' }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              {t('header.logo')}
            </h3>
            <p className="text-gray-300 dark:text-gray-400 mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 dark:text-gray-400">
                <Mail size={16} className="mr-3 text-blue-400" />
                hello@nexusdigital.com
              </div>
              <div className="flex items-center text-gray-300 dark:text-gray-400">
                <Mail size={16} className="mr-3 text-blue-400" />
                marketing1424@outlook.com
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.services.title')}</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.company.title')}</h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.support.title')}</h4>
            <ul className="space-y-2">
              {support.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8">
          <div className="max-w-md">
            <h4 className="text-lg font-semibold mb-4">{t('footer.newsletter.title')}</h4>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              {t('footer.newsletter.description')}
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-r-lg font-medium hover:shadow-lg transition-all duration-200">
                {t('footer.newsletter.subscribe')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            {t('footer.copyright')}
          </p>
          
          {/* Social links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="w-10 h-10 bg-gray-800 dark:bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                aria-label={social.name}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
