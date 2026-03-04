import { useState } from 'react';

const MedicineReminders = () => {
  const [medicines, setMedicines] = useState([
    { id:1, name:'Paracetamol 500mg', dosage:'1 tablet', frequency:'3x daily', timing:'After meals', taken:{morning:true,afternoon:false,evening:false}, refillDate:'Mar 10, 2026' },
    { id:2, name:'Amoxicillin 250mg', dosage:'1 capsule', frequency:'2x daily', timing:'After meals', taken:{morning:true,afternoon:false,evening:false}, refillDate:'Mar 8, 2026' },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMed, setNewMed] = useState({ name:'', dosage:'', frequency:'', timing:'' });
  const [refillToast, setRefillToast] = useState(null);

  const markTaken = (medId, timeSlot) => {
    setMedicines(prev => prev.map(med =>
      med.id===medId ? {...med, taken:{...med.taken,[timeSlot]:!med.taken[timeSlot]}} : med
    ));
  };

  const addMedicine = () => {
    if (!newMed.name) return;
    setMedicines(prev => [...prev, { id:Date.now(), ...newMed, taken:{morning:false,afternoon:false,evening:false}, refillDate:'Mar 15, 2026' }]);
    setNewMed({ name:'', dosage:'', frequency:'', timing:'' });
    setShowAddForm(false);
  };

  const requestRefill = (medName) => {
    setRefillToast(medName);
    setTimeout(() => setRefillToast(null), 3500);
  };

  const getAdherence = (taken) => {
    const total = Object.keys(taken).length;
    const done = Object.values(taken).filter(Boolean).length;
    return Math.round((done / total) * 100);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">

      {/* Refill Toast */}
      {refillToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-xl text-sm font-semibold max-w-sm">
          <p className="text-base font-bold mb-1">✅ Refill Requested!</p>
          <p><strong>{refillToast}</strong> refill request sent to your ASHA Worker.</p>
          <p className="text-green-200 text-xs mt-1">You will be notified when it's ready.</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">💊 Medicine Reminders</h2>
          <p className="text-gray-600 mt-1">दवा अनुस्मारक / Track your medications</p>
        </div>
        <button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
          + Add Medicine
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 border-2 border-green-300 p-5 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-600">{medicines.filter(m=>m.taken.morning).length}</div>
          <div className="text-gray-700 font-semibold mt-1">🌅 Morning</div>
          <div className="text-sm text-gray-500">Taken</div>
        </div>
        <div className="bg-yellow-50 border-2 border-yellow-300 p-5 rounded-xl text-center">
          <div className="text-3xl font-bold text-yellow-600">{medicines.filter(m=>!m.taken.afternoon).length}</div>
          <div className="text-gray-700 font-semibold mt-1">☀️ Afternoon</div>
          <div className="text-sm text-gray-500">Pending</div>
        </div>
        <div className="bg-blue-50 border-2 border-blue-300 p-5 rounded-xl text-center">
          <div className="text-3xl font-bold text-blue-600">{medicines.filter(m=>!m.taken.evening).length}</div>
          <div className="text-gray-700 font-semibold mt-1">🌙 Evening</div>
          <div className="text-sm text-gray-500">Pending</div>
        </div>
      </div>

      <div className="space-y-4">
        {medicines.map((med) => (
          <div key={med.id} className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{med.name}</h3>
                <p className="text-gray-600">{med.dosage} • {med.frequency} • {med.timing}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{getAdherence(med.taken)}%</div>
                <div className="text-sm text-gray-500">Today's adherence</div>
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              {['morning','afternoon','evening'].map((slot) => (
                <button key={slot} onClick={() => markTaken(med.id, slot)}
                  className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${med.taken[slot]?'bg-green-500 text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {med.taken[slot]?'✅':'⬜'} {slot.charAt(0).toUpperCase()+slot.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">🔄 Refill by: {med.refillDate}</p>
              <button
                onClick={() => requestRefill(med.name)}
                className="bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                Request Refill →
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Add Medicine</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Medicine name" value={newMed.name} onChange={(e) => setNewMed({...newMed,name:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
              <input type="text" placeholder="Dosage (e.g. 500mg)" value={newMed.dosage} onChange={(e) => setNewMed({...newMed,dosage:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
              <select value={newMed.frequency} onChange={(e) => setNewMed({...newMed,frequency:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                <option value="">Select frequency</option>
                <option value="1x daily">Once daily</option>
                <option value="2x daily">Twice daily</option>
                <option value="3x daily">Three times daily</option>
              </select>
              <select value={newMed.timing} onChange={(e) => setNewMed({...newMed,timing:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                <option value="">Select timing</option>
                <option value="Before meals">Before meals</option>
                <option value="After meals">After meals</option>
                <option value="Empty stomach">Empty stomach</option>
              </select>
            </div>
            <div className="flex gap-4 mt-6">
              <button onClick={addMedicine} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg">Add</button>
              <button onClick={() => setShowAddForm(false)} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineReminders;
