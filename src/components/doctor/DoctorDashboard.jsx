import { useState } from "react";

const PATIENTS = [
  { id:1, name:"Ramesh Kumar", age:54, triage:"RED",    diagnosis:"Severe chest pain - possible cardiac event",  referredBy:"ASHA Lakshmi", time:"2 hrs ago",
    history:["Hypertension (5 yrs)","Diabetes Type 2 (3 yrs)","ECG: mild ST changes Jan 2024","Smoker 20 yrs"],
    vitals:{ bp:"160/100", temp:"98.8°F", spo2:"94%", pulse:"102" }, allergies:"Penicillin" },
  { id:2, name:"Sita Devi",    age:32, triage:"YELLOW", diagnosis:"Persistent fever (3 days) - possible typhoid", referredBy:"ASHA Lakshmi", time:"5 hrs ago",
    history:["No chronic conditions","Delivery 8 months ago","Vaccinations up to date"],
    vitals:{ bp:"110/70", temp:"103.2°F", spo2:"97%", pulse:"96" }, allergies:"None" },
  { id:3, name:"Mohan Lal",    age:67, triage:"YELLOW", diagnosis:"COPD exacerbation",                            referredBy:"ASHA Priya",   time:"1 day ago",
    history:["COPD 8 yrs","Ex-smoker","Hospitalised 2023: pneumonia"],
    vitals:{ bp:"128/84", temp:"99.4°F", spo2:"91%", pulse:"88" }, allergies:"Aspirin" },
  { id:4, name:"Priya Sharma", age:28, triage:"GREEN",  diagnosis:"Upper respiratory tract infection",            referredBy:"ASHA Kavya",   time:"2 days ago",
    history:["No chronic conditions","Seasonal allergies"],
    vitals:{ bp:"112/72", temp:"99.1°F", spo2:"98%", pulse:"78" }, allergies:"None" },
];

const TC = {
  RED:    { bg:"#fef2f2", border:"#fca5a5", badge:"#dc2626" },
  YELLOW: { bg:"#fefce8", border:"#fde047", badge:"#d97706" },
  GREEN:  { bg:"#f0fdf4", border:"#86efac", badge:"#16a34a" },
};

const MEDS = ["Paracetamol","Amoxicillin","Metformin","Amlodipine","Omeprazole","Azithromycin","Cetirizine","Ibuprofen","Ciprofloxacin","Aspirin"];

export default function DoctorDashboard({ user }) {
  const name   = user?.name           ?? "Dr. Arjun Rao";
  const hosp   = user?.hospital       ?? "PHC Hoskote";
  const mci    = user?.mciNumber      ?? "KA-MCI-54321";
  const spec   = user?.specialization ?? "General Medicine";
  const phone  = user?.phone          ?? "9988776655";

  const [filter, setFilter] = useState("ALL");
  const [toast, setToast]   = useState(null);
  const [histP, setHistP]   = useState(null);
  const [rxP, setRxP]       = useState(null);
  const [vidP, setVidP]     = useState(null);
  const [rx, setRx]         = useState([{med:"",dose:"",days:"",timing:""}]);
  const [inCall, setInCall] = useState(false);

  const toast3 = msg => { setToast(msg); setTimeout(()=>setToast(null),3000); };
  const upRx   = (i,k,v) => setRx(r=>r.map((row,j)=>j===i?{...row,[k]:v}:row));

  const counts = {RED:0,YELLOW:0,GREEN:0};
  PATIENTS.forEach(p=>counts[p.triage]++);
  const list = filter==="ALL"?PATIENTS:PATIENTS.filter(p=>p.triage===filter);

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && <div className="fixed top-4 right-4 z-50 bg-purple-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-semibold">{toast}</div>}

      {/* Identity header */}
      <div className="text-white px-5 py-4 shadow" style={{background:"linear-gradient(135deg,#6d28d9,#7c3aed)"}}>
        <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl font-black">
              {name.replace("Dr.","").trim().charAt(0)}
            </div>
            <div>
              <p className="font-black text-xl">{name}</p>
              <p className="text-purple-200 text-xs">{spec} · MCI: {mci}</p>
              <p className="text-purple-100 text-xs">🏥 {hosp}</p>
            </div>
          </div>
          <div className="text-right text-sm">
            <p className="text-purple-200">📞 +91 {phone}</p>
            <span className="inline-block mt-1 bg-white/20 px-2 py-0.5 rounded-full text-xs">🟢 Available</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Triage filter */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          <button onClick={()=>setFilter("ALL")}
            className={`rounded-xl p-3 border-2 text-center font-black text-sm transition-all ${filter==="ALL"?"bg-gray-700 border-gray-700 text-white":"bg-white border-gray-200 text-gray-700"}`}>
            📋 ALL<br/><span className="text-xl">{PATIENTS.length}</span>
          </button>
          {["RED","YELLOW","GREEN"].map(t=>{
            const icons={RED:"🚨",YELLOW:"⚠️",GREEN:"✅"};
            const active=filter===t;
            return (
              <button key={t} onClick={()=>setFilter(filter===t?"ALL":t)}
                className="rounded-xl p-3 border-2 text-center font-black text-sm transition-all"
                style={{backgroundColor:active?TC[t].badge:TC[t].bg,borderColor:active?TC[t].badge:TC[t].border,color:active?"white":TC[t].badge}}>
                {icons[t]} {t}<br/><span className="text-xl">{counts[t]}</span>
              </button>
            );
          })}
        </div>

        <h2 className="font-black text-gray-700 mb-3">Pending Referrals ({list.length})</h2>

        <div className="space-y-4">
          {list.map(p=>(
            <div key={p.id} className="bg-white rounded-2xl border-l-4 border border-gray-100 p-5 shadow-sm"
              style={{borderLeftColor:TC[p.triage].badge}}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-black text-gray-800 text-lg">{p.name}</h3>
                  <p className="text-gray-400 text-xs">Age {p.age} · By {p.referredBy} · {p.time}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-black text-white" style={{backgroundColor:TC[p.triage].badge}}>{p.triage}</span>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-3">
                {Object.entries(p.vitals).map(([k,v])=>(
                  <div key={k} className="bg-gray-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-gray-400 uppercase">{k}</p>
                    <p className="text-xs font-bold text-gray-700">{v}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-600 mb-3"><span className="font-bold">AI Dx:</span> {p.diagnosis}</p>

              <div className="flex gap-2 flex-wrap">
                <button onClick={()=>setHistP(p)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg">📋 View History</button>
                <button onClick={()=>{ setRxP(p); setRx([{med:"",dose:"",days:"",timing:""}]); }} className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg">💊 Prescription</button>
                <button onClick={()=>setVidP(p)} className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-lg">📹 Video Consult</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History Modal */}
      {histP && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor:"rgba(0,0,0,0.6)"}} onClick={()=>setHistP(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e=>e.stopPropagation()}>
            <div className="bg-blue-600 text-white p-5 flex justify-between">
              <div><h3 className="font-black text-lg">📋 {histP.name}</h3><p className="text-blue-200 text-xs">Age {histP.age} · {histP.triage}</p></div>
              <button onClick={()=>setHistP(null)} className="text-white/60 hover:text-white text-xl">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="font-bold text-gray-700 mb-2">🩺 Vitals</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(histP.vitals).map(([k,v])=>(
                    <div key={k} className="bg-gray-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-400 uppercase">{k}</p>
                      <p className="font-bold text-gray-800">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-bold text-gray-700 mb-2">📜 Medical History</p>
                {histP.history.map((h,i)=><p key={i} className="text-sm text-gray-600 flex gap-2"><span className="text-blue-400">•</span>{h}</p>)}
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-sm font-bold text-red-700">⚠️ Allergies: {histP.allergies}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prescription Modal */}
      {rxP && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor:"rgba(0,0,0,0.6)"}} onClick={()=>setRxP(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={e=>e.stopPropagation()}>
            <div className="bg-green-600 text-white p-5 flex justify-between">
              <div><h3 className="font-black text-lg">💊 Prescription — {rxP.name}</h3><p className="text-green-200 text-xs">{name} · {hosp} · MCI: {mci}</p></div>
              <button onClick={()=>setRxP(null)} className="text-white/60 hover:text-white text-xl">✕</button>
            </div>
            <div className="p-5 overflow-y-auto" style={{maxHeight:"60vh"}}>
              {rx.map((row,i)=>(
                <div key={i} className="grid grid-cols-2 gap-2 mb-3 p-3 bg-gray-50 rounded-xl">
                  <div className="col-span-2">
                    <label className="text-xs text-gray-500">Medicine</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-0.5 focus:outline-none focus:ring-2 focus:ring-green-300"
                      value={row.med} onChange={e=>upRx(i,"med",e.target.value)}>
                      <option value="">Select</option>
                      {MEDS.map(m=><option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Dosage</label>
                    <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-0.5 focus:outline-none" placeholder="500mg" value={row.dose} onChange={e=>upRx(i,"dose",e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Days</label>
                    <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-0.5 focus:outline-none" placeholder="5 days" value={row.days} onChange={e=>upRx(i,"days",e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-gray-500">Timing</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-0.5 focus:outline-none"
                      value={row.timing} onChange={e=>upRx(i,"timing",e.target.value)}>
                      <option value="">Select</option>
                      {["Once daily","Twice daily","Thrice daily","SOS","After meals","Before meals","At bedtime"].map(t=><option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              ))}
              <button onClick={()=>setRx(r=>[...r,{med:"",dose:"",days:"",timing:""}])} className="text-green-600 text-sm font-semibold hover:underline mb-4">+ Add Medicine</button>
              <div className="flex gap-3">
                <button onClick={()=>setRxP(null)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl">Cancel</button>
                <button onClick={()=>{ toast3("✅ Prescription saved & sent!"); setRxP(null); }} className="flex-1 bg-green-600 text-white font-bold py-2.5 rounded-xl">Send Prescription ✓</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Consult Modal */}
      {vidP && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor:"rgba(0,0,0,0.6)"}} onClick={()=>{ setVidP(null); setInCall(false); }}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center" onClick={e=>e.stopPropagation()}>
            {!inCall ? <>
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">📹</div>
              <h3 className="font-black text-xl text-gray-800">Video Consult</h3>
              <p className="text-gray-500 text-sm mt-1 mb-4">Patient: <strong>{vidP.name}</strong></p>
              <div className="bg-gray-50 rounded-xl p-3 mb-5 text-left text-xs text-gray-500 space-y-1">
                <p>Triage: <strong style={{color:TC[vidP.triage].badge}}>{vidP.triage}</strong></p>
                <p>Complaint: {vidP.diagnosis}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={()=>{ setVidP(null); setInCall(false); }} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl">Cancel</button>
                <button onClick={()=>setInCall(true)} className="flex-1 bg-purple-600 text-white font-bold py-2.5 rounded-xl">📹 Start Call</button>
              </div>
            </> : <>
              <div className="bg-gray-900 rounded-2xl p-6 mb-4">
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-2">👤</div>
                <p className="text-white font-bold">{vidP.name}</p>
                <p className="text-green-400 text-sm animate-pulse">● Connected</p>
                <div className="flex justify-center gap-4 mt-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-lg">🎤</div>
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-lg">📹</div>
                </div>
              </div>
              <button onClick={()=>{ toast3("📹 Call ended"); setInCall(false); setVidP(null); }} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl">🔴 End Call</button>
            </>}
          </div>
        </div>
      )}
    </div>
  );
}
