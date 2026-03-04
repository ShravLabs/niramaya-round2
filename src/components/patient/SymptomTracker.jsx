import { useState } from 'react';

const SymptomTracker = () => {
  const [symptoms, setSymptoms] = useState([
    { id: 1, name: 'Fever', severity: 6, date: 'Mar 4', note: 'Temperature 101°F' },
    { id: 2, name: 'Headache', severity: 4, date: 'Mar 3', note: 'Mild, morning only' },
    { id: 3, name: 'Cough', severity: 3, date: 'Mar 2', note: 'Dry cough' },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newSymptom, setNewSymptom] = useState({ name: '', severity: 5, note: '' });

  const bodyParts = ['Head', 'Chest', 'Stomach', 'Back', 'Legs', 'Arms', 'Throat', 'Eyes'];
  const commonSymptoms = ['Fever', 'Headache', 'Cough', 'Cold', 'Nausea', 'Fatigue', 'Pain', 'Vomiting'];

  const getSeverityColor = (severity) => {
    if (severity >= 8) return 'bg-red-500';
    if (severity >= 5) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getSeverityText = (severity) => {
    if (severity >= 8) return 'Severe';
    if (severity >= 5) return 'Moderate';
    return 'Mild';
  };

  const addSymptom = () => {
    if (!newSymptom.name) return;
    setSymptoms(prev => [...prev, {
      id: Date.now(),
      ...newSymptom,
      date: 'Today'
    }]);
    setNewSymptom({ name: '', severity: 5, note: '' });
    setShowAdd(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">📊 Symptom Tracker</h2>
          <p className="text-gray-600 mt-1">लक्षण ट्रैकर / Monitor your symptoms daily</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
        >
          + Log Symptom
        </button>
      </div>

      {/* Quick Add Buttons */}
      <div className="mb-6">
        <p className="text-gray-700 font-semibold mb-3">Quick Log:</p>
        <div className="flex flex-wrap gap-2">
          {commonSymptoms.map((sym) => (
            <button
              key={sym}
              onClick={() => {
                setNewSymptom({ name: sym, severity: 5, note: '' });
                setShowAdd(true);
              }}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-200"
            >
              + {sym}
            </button>
          ))}
        </div>
      </div>

      {/* Symptom Timeline */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-700">Recent Symptoms</h3>
        {symptoms.map((symptom) => (
          <div key={symptom.id} className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h4 className="text-xl font-bold text-gray-800">{symptom.name}</h4>
                <p className="text-gray-500 text-sm">{symptom.date}</p>
              </div>
              <div className="text-right">
                <span className={`${getSeverityColor(symptom.severity)} text-white px-3 py-1 rounded-lg font-semibold text-sm`}>
                  {getSeverityText(symptom.severity)}
                </span>
                <p className="text-gray-500 text-sm mt-1">Severity: {symptom.severity}/10</p>
              </div>
            </div>

            {/* Severity Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div
                className={`${getSeverityColor(symptom.severity)} h-3 rounded-full transition-all`}
                style={{ width: `${symptom.severity * 10}%` }}
              ></div>
            </div>

            {symptom.note && (
              <p className="text-gray-600 text-sm">📝 {symptom.note}</p>
            )}
          </div>
        ))}
      </div>

      {/* Trend Summary */}
      <div className="mt-8 bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
        <h3 className="text-xl font-bold text-blue-800 mb-3">📈 Pattern Analysis</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{symptoms.length}</div>
            <div className="text-gray-600 text-sm">Symptoms logged</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {Math.round(symptoms.reduce((a, b) => a + b.severity, 0) / symptoms.length)}
            </div>
            <div className="text-gray-600 text-sm">Avg severity</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-gray-600 text-sm">Days tracked</div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6">Log Symptom</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Symptom name"
                value={newSymptom.name}
                onChange={(e) => setNewSymptom({ ...newSymptom, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Severity: {newSymptom.severity}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newSymptom.severity}
                  onChange={(e) => setNewSymptom({ ...newSymptom, severity: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
              <input
                type="text"
                placeholder="Note (optional)"
                value={newSymptom.note}
                onChange={(e) => setNewSymptom({ ...newSymptom, note: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={addSymptom} className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg">Save</button>
              <button onClick={() => setShowAdd(false)} className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomTracker;