import { 
  Globe, 
  Camera, 
  Bot, 
  MessageSquare, 
  Share2, 
  Palette, 
  TrendingUp,
  Zap,
  Shield
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Services() {
  const { t } = useTranslation();
  const services = [
    {
      icon: Globe,
      title: t('services.website.title'),
      description: t('services.website.description'),
      features: t('services.website.features', { returnObjects: true }) as string[],
      gradient: 'from-blue-500 to-cyan-500',
      image: 'https://mocha-cdn.com/0199e594-8dc6-7382-8973-8c52e2c86744/website-development.jpg'
    },
    {
      icon: Camera,
      title: t('services.socialMedia.title'),
      description: t('services.socialMedia.description'),
      features: t('services.socialMedia.features', { returnObjects: true }) as string[],
      gradient: 'from-pink-500 to-rose-500',
      image: 'https://mocha-cdn.com/0199e594-8dc6-7382-8973-8c52e2c86744/servicios.png'
    },
    {
      icon: Bot,
      title: t('services.aiAgents.title'),
      description: t('services.aiAgents.description'),
      features: t('services.aiAgents.features', { returnObjects: true }) as string[],
      gradient: 'from-purple-500 to-violet-500',
      image: 'https://mocha-cdn.com/0199e594-8dc6-7382-8973-8c52e2c86744/ai-agents.jpg'
    },
    {
      icon: Share2,
      title: t('services.socialMediaMarketing.title'),
      description: t('services.socialMediaMarketing.description'),
      features: t('services.socialMediaMarketing.features', { returnObjects: true }) as string[],
      gradient: 'from-orange-500 to-red-500',
      image: 'https://mocha-cdn.com/0199e594-8dc6-7382-8973-8c52e2c86744/image.png_1132.png'
    },
    {
      icon: MessageSquare,
      title: t('services.chatbot.title'),
      description: t('services.chatbot.description'),
      features: t('services.chatbot.features', { returnObjects: true }) as string[],
      gradient: 'from-green-500 to-emerald-500',
      image: 'https://mocha-cdn.com/0199e594-8dc6-7382-8973-8c52e2c86744/chatbot-service.jpg'
    }
  ];

  const additionalServices = [
    { icon: Palette, title: t('services.additional.brandIdentity.title'), description: t('services.additional.brandIdentity.description') },
    { icon: TrendingUp, title: t('services.additional.digitalMarketing.title'), description: t('services.additional.digitalMarketing.description') },
    { icon: Zap, title: t('services.additional.performance.title'), description: t('services.additional.performance.description') },
    { icon: Shield, title: t('services.additional.security.title'), description: t('services.additional.security.description') },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('services.title')}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> {t('services.titleGradient')}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Main services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-80`}></div>
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <service.icon className="text-white" size={24} />
                  </div>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {service.features.map((feature: string) => (
                    <div key={feature} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-2`}></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <button className={`bg-gradient-to-r ${service.gradient} text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 w-full`}>
                  {t('services.learnMore')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional services */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">{t('services.additional.title')}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service) => (
              <div key={service.title} className="text-center group cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <service.icon className="text-white" size={20} />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
