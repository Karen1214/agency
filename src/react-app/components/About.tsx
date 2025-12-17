import { Award, Users, Lightbulb, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  const values = [
    {
      icon: Award,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    },
    {
      icon: Users,
      title: t('about.values.collaboration.title'),
      description: t('about.values.collaboration.description')
    },
    {
      icon: Lightbulb,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: Target,
      title: t('about.values.results.title'),
      description: t('about.values.results.description')
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('about.title')}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> {t('about.titleGradient')}</span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t('about.description1')}
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t('about.description2')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('about.stats.experience')}</div>
                <div className="text-gray-600 dark:text-gray-400">{t('about.stats.experienceLabel')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('about.stats.team')}</div>
                <div className="text-gray-600 dark:text-gray-400">{t('about.stats.teamLabel')}</div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              {t('about.workWithUs')}
            </a>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <value.icon className="text-white" size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
