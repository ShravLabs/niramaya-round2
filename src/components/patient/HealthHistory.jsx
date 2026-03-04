import { useState } from 'react';

const HealthHistory = () => {
  // Mock data for demo
  const [history] = useState([
    {
      id: 1,
      date: '2026-03-04',
      symptoms: 'Fever and headache',
      triage: 'YELLOW',
      diagnosis: 'Viral fever'
    },
    {
      id: 2,
      date: '2026-03-01',
      symptoms: 'Cough',
      triage: 'GREEN',
      diagnosis: 'Common cold'
    }
  ]);

  const getTriageColor = (triage) => {
    const colors = {
      RED: 'bg-red-100 text-red-800 border-red-300',
      YELLOW: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      GREEN: 'bg-green-100 text-green-800 border-green-300'
    };
    return colors[triage] || colors.GREEN;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        स्वास्थ्य इतिहास / Health History
      </h2>

      <div className="space-y-4">
        {history.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">{item.date}</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">{item.symptoms}</p>
              </div>
              <span className={`px-4 py-2 rounded-lg font-semibold border-2 ${getTriageColor(item.triage)}`}>
                {item.triage}
              </span>
            </div>
            <p className="text-gray-700">{item.diagnosis}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthHistory;