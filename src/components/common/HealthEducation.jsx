import { useState } from 'react';

const HealthEducation = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = ['all', 'prevention', 'nutrition', 'hygiene', 'maternal', 'child'];

  const articles = [
    {
      id: 1,
      category: 'prevention',
      icon: '🦟',
      title: 'Malaria Prevention',
      titleHindi: 'मलेरिया से बचाव',
      summary: 'How to prevent malaria in rural areas',
      content: 'Use mosquito nets at night. Eliminate standing water near home. Wear full-sleeve clothes in evenings. Use mosquito repellent. Seek treatment immediately if fever with chills.',
      readTime: '2 min'
    },
    {
      id: 2,
      category: 'nutrition',
      icon: '🥗',
      title: 'Balanced Diet Guide',
      titleHindi: 'संतुलित आहार गाइड',
      summary: 'Eat right with local affordable foods',
      content: 'Include dal, rice, vegetables daily. Eat seasonal fruits. Drink 8 glasses of water. Include milk or curd for calcium. Avoid excessive oil and spicy food.',
      readTime: '3 min'
    },
    {
      id: 3,
      category: 'hygiene',
      icon: '🧼',
      title: 'Hand Washing Technique',
      titleHindi: 'हाथ धोने की तकनीक',
      summary: 'Proper handwashing saves lives',
      content: 'Wet hands with clean water. Apply soap. Rub for 20 seconds. Clean between fingers. Rinse thoroughly. Dry with clean cloth. Wash before eating, after toilet.',
      readTime: '2 min'
    },
    {
      id: 4,
      category: 'maternal',
      icon: '🤱',
      title: 'Pregnancy Care',
      titleHindi: 'गर्भावस्था देखभाल',
      summary: 'Stay healthy during pregnancy',
      content: 'Attend all antenatal checkups. Take iron and folic acid tablets. Eat nutritious food. Avoid heavy lifting. Sleep 8 hours. Deliver at hospital or PHC.',
      readTime: '4 min'
    },
    {
      id: 5,
      category: 'child',
      icon: '👶',
      title: 'Child Vaccination Schedule',
      titleHindi: 'बच्चे का टीकाकरण',
      summary: 'Complete immunization guide',
      content: 'At birth: BCG, Hepatitis B, OPV. At 6 weeks: DPT, IPV, Hib. At 14 weeks: Same vaccines. At 9 months: Measles, Vitamin A. At 16-24 months: Booster doses.',
      readTime: '3 min'
    },
    {
      id: 6,
      category: 'hygiene',
      icon: '🚽',
      title: 'Sanitation & ODF',
      titleHindi: 'स्वच्छता',
      summary: 'Open defecation free village guide',
      content: 'Always use toilet. Wash hands after toilet. Keep surroundings clean. Dispose waste properly. Drink only filtered or boiled water. Keep food covered.',
      readTime: '2 min'
    }
  ];

  const filtered = activeCategory === 'all'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">📚 Health Education</h2>
        <p className="text-gray-600 mt-1">स्वास्थ्य शिक्षा / Learn to stay healthy</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm capitalize transition-all ${
              activeCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article Grid */}
      {!selectedArticle ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((article) => (
            <button
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 text-left hover:shadow-xl hover:border-blue-300 transition-all"
            >
              <div className="text-4xl mb-3">{article.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{article.title}</h3>
              <p className="text-gray-500 text-sm mb-2">{article.titleHindi}</p>
              <p className="text-gray-600 text-sm mb-3">{article.summary}</p>
              <div className="flex justify-between items-center">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-semibold capitalize">
                  {article.category}
                </span>
                <span className="text-gray-400 text-xs">⏱ {article.readTime} read</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200">
          <button
            onClick={() => setSelectedArticle(null)}
            className="text-blue-600 font-semibold mb-6 flex items-center"
          >
            ← Back to articles
          </button>
          <div className="text-6xl mb-4">{selectedArticle.icon}</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedArticle.title}</h2>
          <p className="text-gray-500 mb-6">{selectedArticle.titleHindi}</p>
          <p className="text-gray-700 text-lg leading-relaxed">{selectedArticle.content}</p>
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 font-semibold">💡 For more information, ask your ASHA worker!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthEducation;