import { useState } from "react";

const INIT = [
  { id:1, name:"Ramesh Kumar", age:54, phone:"9876501234", village:"Hoskote", triage:"RED",    symptoms:"Severe chest pain",        time:"2 hours ago", visited:false, notes:"" },
  { id:2, name:"Sita Devi",    age:32, phone:"9876502345", village:"Hoskote", triage:"YELLOW", symptoms:"Persistent fever (3 days)", time:"5 hours ago", visited:false, notes:"" },
  { id:3, name:"Mohan Lal",    age:67, phone:"9876503456", village:"Hoskote", triage:"YELLOW", symptoms:"Breathing difficulty",      time:"1 day ago",   visited:false, notes:"" },
  { id:4, name:"Priya Sharma", age:28, phone:"9876504567", village:"Hoskote", triage:"GREEN",  symptoms:"Mild cold and cough",       time:"2 days ago",  visited:false, notes:"" },
  { id:5, name:"Baby Kaveri",  age:2,  phone:"9876505678", village:"Hoskote", triage:"GREEN",  symptoms:"Low-grade fever",           time:"3 days ago",  visited:false, notes:"" },
];

const TC = {
  RED:    { bg:"#fef2f2", border:"#fca5a5", badge:"#dc2626" },
  YELLOW: { bg:"#fefce8", border:"#fde047", badge:"#d97706" },
  GREEN:  { bg:"#f0fdf4", border:"#86efac", badge:"#16a34a" },
};

export default function ASHADashboard({ user }) {
  const name    = user?.name       ?? "Lakshmi Devi";
  const empId   = user?.employeeId ?? "ASHA-KA-00421";
  const village = user?.village    ?? "Hoskote";
  const district= user?.district   ?? "Bengaluru Rural";
  const phone   = user?.phone      ?? "9123456789";

  const [pts, setPts]         = useState(INIT);
  const [filter, setFilter]   = useState("ALL");
  const [toast, setToast]     = useState(null);
  const [callP, setCallP]     = useState(null);
  const [noteP, setNoteP]     = useState(null);
  const [noteText, setNoteText] = useState("");

  const showToast = (msg, err=false) => {
    setToast({ msg, err });
    setTimeout(() => setToast(null), 3000);
  };

  const markVisited = id => {
    setPts(ps => ps.map(p => p.id===id ? {...p, visited:true} : p));
    showToast("✅ Marked as visited!");
  };

  const saveNote = () => {
    if (!noteText.trim()) { showToast("Write a note first", true); return; }
    setPts(ps => ps.map(p => p.id===noteP.id ? {...p, notes:noteText} : p));
    showToast("📝 Note saved!");
    setNoteP(null); setNoteText("");
  };

  const counts = { RED:0, YELLOW:0, GREEN:0 };
  pts.forEach(p => counts[p.triage]++);
  const list = filter==="ALL" ? pts : pts.filter(p=>p.triage===filter);

  return (
    <div className="min-h-screen bg-gray-50">

      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-semibold ${toast.err?"bg-red-500":"bg-green-600"}`}>
          {toast.msg}
        </div>
      )}

      {/* Identity header */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 text-white px-5 py-4 shadow">
        <div className="max-w-3xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/25 border-2 border-white/50 flex items-center justify-center text-xl font-black">
              {name.charAt(0)}
            </div>
            <div>
              <p className="font-black text-lg leading-tight">{name}</p>
              <p className="text-green-200 text-xs">ASHA Worker · {empId}</p>
              <p className="text-green-100 text-xs">📍 {village}, {district}</p>
            </div>
          </div>
          <div className="text-right text-sm">
            <p className="text-green-200">📞 +91 {phone}</p>
            <span className="inline-block mt-1 bg-white/20 px-2 py-0.5 rounded-full text-xs">🟢 On Duty</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4">
        {/* Triage filter */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {["RED","YELLOW","GREEN"].map(t => {
            const icons = { RED:"🚨", YELLOW:"⚠️", GREEN:"✅" };
            const active = filter===t;
            return (
              <button key={t} onClick={()=>setFilter(filter===t?"ALL":t)}
                className="rounded-xl p-3 border-2 text-center font-black transition-all text-sm"
                style={{ backgroundColor:active?TC[t].badge:TC[t].bg, borderColor:active?TC[t].badge:TC[t].border, color:active?"white":TC[t].badge }}>
                {icons[t]} {t}<br/><span className="text-xl">{counts[t]}</span>
              </button>
            );
          })}
        </div>

        <h2 className="font-black text-gray-700 mb-3">
          {filter==="ALL"?"All Cases":`${filter} Cases`} ({list.length})
          {filter!=="ALL" && <button onClick={()=>setFilter("ALL")} className="ml-3 text-xs text-blue-500 font-normal hover:underline">Show all</button>}
        </h2>

        <div className="space-y-3">
          {list.map(p => (
            <div key={p.id} className={`rounded-2xl border-2 p-4 ${p.visited?"opacity-55":""}`}
              style={{ backgroundColor:TC[p.triage].bg, borderColor:TC[p.triage].border }}>
              <div className="flex justify-between mb-1">
                <div>
                  <span className="font-black text-gray-800">{p.name}</span>
                  {p.visited && <span className="ml-2 text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">✓ Visited</span>}
                  <p className="text-gray-500 text-xs">Age {p.age} · {p.village}</p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-black text-white h-fit" style={{backgroundColor:TC[p.triage].badge}}>{p.triage}</span>
              </div>

              <p className="text-sm text-gray-700 mb-2"><span className="font-semibold">Symptoms:</span> {p.symptoms}</p>

              {p.notes && (
                <div className="bg-white/60 border border-gray-200 rounded-lg px-3 py-2 mb-2">
                  <p className="text-xs font-bold text-gray-500">📝 Note</p>
                  <p className="text-xs text-gray-600 mt-0.5">{p.notes}</p>
                </div>
              )}

              <div className="flex gap-2 flex-wrap mt-2">
                <button onClick={()=>setCallP(p)}
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-3 py-2 rounded-lg">
                  📞 Call Patient
                </button>
                <button onClick={()=>markVisited(p.id)} disabled={p.visited}
                  className={`flex items-center gap-1 text-sm font-semibold px-3 py-2 rounded-lg ${p.visited?"bg-gray-200 text-gray-400 cursor-not-allowed":"bg-green-600 hover:bg-green-700 text-white"}`}>
                  {p.visited?"✓ Visited":"✅ Mark Visited"}
                </button>
                <button onClick={()=>{ setNoteP(p); setNoteText(p.notes||""); }}
                  className="flex items-center gap-1 bg-gray-700 hover:bg-gray-800 text-white text-sm font-semibold px-3 py-2 rounded-lg">
                  📝 {p.notes?"Edit Notes":"Add Notes"}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">🕐 {p.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call Modal */}
      {callP && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor:"rgba(0,0,0,0.55)"}} onClick={()=>setCallP(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xs p-6 text-center" onClick={e=>e.stopPropagation()}>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">📞</div>
            <h3 className="text-lg font-black text-gray-800">{callP.name}</h3>
            <p className="text-gray-400 text-sm mb-4">Age {callP.age} · {callP.village}</p>
            <div className="bg-gray-50 rounded-xl p-3 mb-5">
              <p className="text-2xl font-black text-gray-800 tracking-wider">+91 {callP.phone}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={()=>setCallP(null)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl">Cancel</button>
              <a href={`tel:+91${callP.phone}`} onClick={()=>{ showToast(`📞 Calling ${callP.name}...`); setCallP(null); }}
                className="flex-1 bg-green-600 text-white font-bold py-2.5 rounded-xl flex items-center justify-center">
                📞 Call
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {noteP && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor:"rgba(0,0,0,0.55)"}} onClick={()=>setNoteP(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6" onClick={e=>e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-black text-gray-800">📝 Notes — {noteP.name}</h3>
              <button onClick={()=>setNoteP(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <p className="text-xs text-gray-400 mb-2">Symptoms: {noteP.symptoms}</p>
            <textarea
              autoFocus
              className="w-full border border-gray-200 rounded-xl p-3 text-sm h-28 resize-none focus:outline-none focus:ring-2 focus:ring-green-300"
              placeholder="BP: 130/90, advised rest, follow-up in 2 days..."
              value={noteText}
              onChange={e=>setNoteText(e.target.value)}
            />
            <div className="flex gap-3 mt-3">
              <button onClick={()=>setNoteP(null)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl">Cancel</button>
              <button onClick={saveNote} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl">Save ✓</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
