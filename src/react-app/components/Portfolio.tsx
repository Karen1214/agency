import { ExternalLink, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Portfolio() {
  const { t } = useTranslation();
  const projects = [
    {
      title: t('portfolio.projects.ecommerce.title'),
      category: t('portfolio.projects.ecommerce.category'),
      description: t('portfolio.projects.ecommerce.description'),
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['React', 'E-commerce', 'AI Integration']
    },
    {
      title: t('portfolio.projects.social.title'),
      category: t('portfolio.projects.social.category'),
      description: t('portfolio.projects.social.description'),
      image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Video Editing', 'Social Media', 'Viral Content']
    },
    {
      title: t('portfolio.projects.customerBot.title'),
      category: t('portfolio.projects.customerBot.category'),
      description: t('portfolio.projects.customerBot.description'),
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['AI', 'Chatbot', 'Automation']
    },
    {
      title: t('portfolio.projects.restaurant.title'),
      category: t('portfolio.projects.restaurant.category'),
      description: t('portfolio.projects.restaurant.description'),
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Restaurant', 'Online Ordering', 'Multi-location']
    },
    {
      title: t('portfolio.projects.fitness.title'),
      category: t('portfolio.projects.fitness.category'),
      description: t('portfolio.projects.fitness.description'),
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Fitness', 'Video Ads', 'Instagram']
    },
    {
      title: t('portfolio.projects.salesBot.title'),
      category: t('portfolio.projects.salesBot.category'),
      description: t('portfolio.projects.salesBot.description'),
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Sales AI', 'Lead Generation', 'Conversion']
    }
  ];

  const categories = t('portfolio.categories', { returnObjects: true }) as string[];

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('portfolio.title')}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> {t('portfolio.titleGradient')}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            {t('portfolio.subtitle')}
          </p>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-200 shadow-md"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Project image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay buttons */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-3">
                    <button className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors">
                      <ExternalLink size={18} className="text-gray-700 dark:text-gray-300" />
                    </button>
                    {project.category === 'Content Creation' && (
                      <button className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors">
                        <Play size={18} className="text-gray-700 dark:text-gray-300 ml-0.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Project content */}
              <div className="p-6">
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">{project.category}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{t('portfolio.cta.description')}</p>
          <a
            href="#contact"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            {t('portfolio.cta.button')}
          </a>
        </div>
      </div>
    </section>
  );
}
