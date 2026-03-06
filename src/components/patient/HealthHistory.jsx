import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AppAuthContext';

const HealthHistory = () => {
  const { profile } = useAuth();
  const [selectedMember, setSelectedMember] = useState(null);
  
  // Mock data for demo - in real app, fetch from database
  const [historyData] = useState({
    1: [ // Ramesh Kumar
      {
        id: 1,
        date: '2026-03-04',
        symptoms: 'Fever and headache',
        triage: 'YELLOW',
        diagnosis: 'Viral fever',
        memberName: 'Ramesh Kumar (You)'
      },
      {
        id: 2,
        date: '2026-03-01',
        symptoms: 'Cough',
        triage: 'GREEN',
        diagnosis: 'Common cold',
        memberName: 'Ramesh Kumar (You)'
      }
    ],
    2: [ // Priya Kumar
      {
        id: 3,
        date: '2026-03-05',
        symptoms: 'Persistent headache',
        triage: 'YELLOW',
        diagnosis: 'Migraine',
        memberName: 'Priya Kumar'
      }
    ],
    3: [ // Aarav Kumar
      {
        id: 4,
        date: '2026-02-10',
        symptoms: 'Mild fever',
        triage: 'GREEN',
        diagnosis: 'Common cold',
        memberName: 'Aarav Kumar'
      }
    ]
  });

  // Get all history or specific member's history
  const getHistory = () => {
    if (selectedMember) {
      return historyData[selectedMember] || [];
    }
    // Return all history combined
    return Object.values(historyData).flat().sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
  };

  const history = getHistory();

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            स्वास्थ्य इतिहास / Health History
          </h2>
          <p className="text-gray-600">
            {profile?.name || 'Patient'} - Complete medical records
          </p>
        </div>
        
        {/* Filter by family member */}
        <select 
          className="px-4 py-2 border-2 border-gray-300 rounded-lg bg-white font-semibold"
          value={selectedMember || ''}
          onChange={(e) => setSelectedMember(e.target.value ? parseInt(e.target.value) : null)}
        >
          <option value="">All Family Members</option>
          <option value="1">Ramesh Kumar (You)</option>
          <option value="2">Priya Kumar</option>
          <option value="3">Aarav Kumar</option>
        </select>
      </div>

      {history.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-gray-600 text-lg">No health history found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {item.memberName}
                    </span>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                  <p className="text-xl font-semibold text-gray-800 mt-1">{item.symptoms}</p>
                </div>
                <span className={`px-4 py-2 rounded-lg font-semibold border-2 ${getTriageColor(item.triage)}`}>
                  {item.triage}
                </span>
              </div>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                <span className="font-semibold">Diagnosis:</span> {item.diagnosis}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthHistory;