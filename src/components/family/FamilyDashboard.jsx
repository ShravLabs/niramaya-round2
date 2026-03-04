import { useState } from "react";

const familyMembers = [
  {
    id: 1, name: "Ramesh Kumar (You)", age: 42, status: "Healthy", lastCheck: "Feb 14", statusColor: "green",
    vitals: { bp: "120/80", temp: "98.6°F", weight: "72 kg", spo2: "98%" },
    medications: ["Metformin 500mg - twice daily", "Vitamin D3 - once daily"],
    history: ["Diabetes Type 2 (controlled)", "Annual checkup Feb 2024 - Normal"],
  },
  {
    id: 2, name: "Priya Kumar", age: 38, status: "Persistent headache", lastCheck: "Today", statusColor: "yellow",
    vitals: { bp: "130/85", temp: "99.1°F", weight: "58 kg", spo2: "97%" },
    medications: ["Paracetamol 500mg - as needed", "Iron supplements - daily"],
    history: ["Migraine history", "Last visited: Today - Persistent headache reported"],
  },
  {
    id: 3, name: "Aarav Kumar", age: 8, status: "Healthy", lastCheck: "Feb 10", statusColor: "green",
    vitals: { bp: "100/65", temp: "98.4°F", weight: "28 kg", spo2: "99%" },
    medications: ["Vitamin C - daily", "Calcium syrup - daily"],
    history: ["Vaccinations up to date", "Feb 2024 checkup - Healthy"],
  },
];

const statusDotColor = { green: "#22c55e", yellow: "#eab308", red: "#ef4444" };

export default function FamilyDashboard() {
  const [selectedMember, setSelectedMember] = useState(null);

  const navigateToSymptoms = () => {
    setSelectedMember(null);
    window.dispatchEvent(new CustomEvent('niramaya-navigate', { detail: 'symptoms' }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">👨‍👩‍👦 Family Dashboard</h2>
          <p className="text-gray-500">Monitor all family members</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
          + Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {familyMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-2xl">👤</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-800 text-sm">{member.name}</h3>
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: statusDotColor[member.statusColor] }} />
                </div>
                <p className="text-gray-500 text-xs">Age: {member.age}</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-1"><span className="text-gray-400">Status: </span><span className="font-semibold">{member.status}</span></div>
            <div className="text-sm text-gray-600 mb-4"><span className="text-gray-400">Last Check: </span><span className="font-semibold">{member.lastCheck}</span></div>
            <button onClick={() => setSelectedMember(member)} className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold py-2 rounded-lg transition-colors">
              View Details →
            </button>
          </div>
        ))}
      </div>

      {familyMembers.some((m) => m.statusColor === "yellow" || m.statusColor === "red") && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="font-bold text-yellow-800">⚠️ Attention Required</p>
          {familyMembers.filter((m) => m.statusColor !== "green").map((m) => (
            <p key={m.id} className="text-yellow-700 text-sm mt-1">{m.name} needs medical consultation. Last check: {m.lastCheck}</p>
          ))}
        </div>
      )}

      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={() => setSelectedMember(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-screen overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">👤</div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedMember.name}</h2>
                    <p className="text-blue-200 text-sm">Age: {selectedMember.age}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedMember(null)} className="text-white/70 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center">×</button>
              </div>
              <div className="mt-3">
                <span className="px-3 py-1 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: selectedMember.statusColor==="green"?"#dcfce7":selectedMember.statusColor==="yellow"?"#fef9c3":"#fee2e2",
                    color: selectedMember.statusColor==="green"?"#15803d":selectedMember.statusColor==="yellow"?"#854d0e":"#991b1b",
                  }}>
                  {selectedMember.status}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <h3 className="font-bold text-gray-700 mb-3">🩺 Vitals</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(selectedMember.vitals).map(([key, val]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400 uppercase tracking-wide">{key}</p>
                      <p className="font-bold text-gray-800 mt-1">{val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-700 mb-3">💊 Current Medications</h3>
                <ul className="space-y-2">
                  {selectedMember.medications.map((med, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600"><span className="text-green-500 mt-0.5">✓</span>{med}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-700 mb-3">📋 Health History</h3>
                <ul className="space-y-2">
                  {selectedMember.history.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600"><span className="text-blue-400 mt-0.5">•</span>{item}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={navigateToSymptoms}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors"
              >
                🔍 Check Symptoms for {selectedMember.name.split(" ")[0]}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
