import { useState } from "react";

const PENDING = [
  { id:1, name:"Meena Kumari",     role:"ASHA",   empId:"ASHA-KA-00502", village:"Devanahalli", phone:"9845001234", doc:"ASHA_Certificate.pdf",  submitted:"Today" },
  { id:2, name:"Dr. Ravi Shankar", role:"Doctor", empId:"KA-MCI-98765",  village:"PHC Hoskote", phone:"9844003456", doc:"Medical_Degree.pdf",    submitted:"Yesterday" },
  { id:3, name:"Sunita Bai",       role:"ASHA",   empId:"ASHA-KA-00503", village:"Sulibele",    phone:"9845004567", doc:"ASHA_Cert.pdf",         submitted:"2 days ago" },
];

const VILLAGES = [
  { name:"Hoskote",     total:34, red:3, yellow:12, green:19, asha:2 },
  { name:"Devanahalli", total:28, red:1, yellow:9,  green:18, asha:1 },
  { name:"Sulibele",    total:19, red:0, yellow:7,  green:12, asha:1 },
  { name:"Nandagudi",   total:22, red:2, yellow:8,  green:12, asha:2 },
];

const DOCTORS = [
  { id:1, name:"Dr. Arjun Rao",    spec:"General Medicine", hospital:"PHC Hoskote",     mci:"KA-MCI-54321", status:"Active",   cases:18 },
  { id:2, name:"Dr. Priya Nair",   spec:"Pediatrics",       hospital:"CHC Devanahalli", mci:"KA-MCI-67890", status:"Active",   cases:12 },
  { id:3, name:"Dr. Suresh Gowda", spec:"Gynecology",       hospital:"PHC Hoskote",     mci:"KA-MCI-11234", status:"On Leave", cases:0  },
];

export default function AdminDashboard({ user }) {
  const adminName = user?.name       ?? "Suresh Patil";
  const adminId   = user?.adminId    ?? "ADMN-KA-001";
  const dept      = user?.department ?? "Karnataka Health Dept";
  const email     = user?.email      ?? "admin@niramaya.gov.in";

  const [tab, setTab]       = useState("Overview");
  const [regs, setRegs]     = useState(PENDING);
  const [toast, setToast]   = useState(null);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertVil, setAlertVil] = useState("All Villages");
  const [alertType, setAlertType] = useState("INFO");
  const [doctors, setDoctors] = useState(DOCTORS);

  const toast3 = (msg, err=false) => { setToast({msg,err}); setTimeout(()=>setToast(null),3500); };
  const approve = id => { setRegs(r=>r.filter(x=>x.id!==id)); toast3("✅ Registration approved!"); };
  const reject  = id => { setRegs(r=>r.filter(x=>x.id!==id)); toast3("❌ Registration rejected.", true); };
  const toggleDoc = id => {
    setDoctors(ds=>ds.map(d=>d.id===id?{...d,status:d.status==="Active"?"On Leave":"Active"}:d));
    toast3("Doctor status updated.");
  };
  const sendAlert = () => {
    if (!alertMsg.trim()) { toast3("Write a message first", true); return; }
    toast3(`📢 Alert sent to ${alertVil}!`);
    setAlertMsg("");
  };

  const total = VILLAGES.reduce((a,v)=>a+v.total,0);
  const reds  = VILLAGES.reduce((a,v)=>a+v.red,0);
  const ashas = VILLAGES.reduce((a,v)=>a+v.asha,0);

  const TABS = ["Overview","Registrations","Villages","Doctors","Send Alert"];

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-semibold ${toast.err?"bg-red-500":"bg-amber-600"}`}>
          {toast.msg}
        </div>
      )}

      <div className="text-white px-5 py-4 shadow" style={{background:"linear-gradient(135deg,#92400e,#b45309)"}}>
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-xl font-black">{adminName.charAt(0)}</div>
            <div>
              <p className="font-black text-xl">🏛️ {adminName}</p>
              <p className="text-amber-200 text-xs">Admin · ID: {adminId}</p>
              <p className="text-amber-100 text-xs">{dept}</p>
            </div>
          </div>
          <div className="text-right text-sm">
            <p className="text-amber-200 text-xs">{email}</p>
            <span className="inline-block mt-1 bg-white/20 px-2 py-0.5 rounded-full text-xs">🟢 Active</span>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 overflow-x-auto">
        <div className="max-w-5xl mx-auto flex">
          {TABS.map(t=>(
            <button key={t} onClick={()=>setTab(t)}
              className={`px-4 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-all ${tab===t?"border-amber-500 text-amber-700":"border-transparent text-gray-500 hover:text-gray-700"}`}>
              {t}{t==="Registrations"&&regs.length>0&&<span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{regs.length}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4">

        {tab==="Overview" && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {[
                {label:"Total Patients",val:total, color:"#2563eb",bg:"#eff6ff"},
                {label:"🚨 RED Cases",   val:reds,  color:"#dc2626",bg:"#fef2f2"},
                {label:"ASHA Workers",  val:ashas, color:"#059669",bg:"#f0fdf4"},
                {label:"Pending Regs",  val:regs.length,color:"#b45309",bg:"#fffbeb"},
              ].map(c=>(
                <div key={c.label} className="rounded-2xl p-4 border" style={{backgroundColor:c.bg,borderColor:c.color+"40"}}>
                  <p className="text-3xl font-black" style={{color:c.color}}>{c.val}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{c.label}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <h3 className="font-black text-gray-700 mb-3">🗺️ Village Triage Summary</h3>
                {VILLAGES.map(v=>(
                  <div key={v.name} className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-gray-700">{v.name}</span>
                      <span className="text-gray-400">{v.total}</span>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden">
                      <div style={{width:`${(v.red/v.total)*100}%`,backgroundColor:"#dc2626"}}/>
                      <div style={{width:`${(v.yellow/v.total)*100}%`,backgroundColor:"#d97706"}}/>
                      <div style={{width:`${(v.green/v.total)*100}%`,backgroundColor:"#16a34a"}}/>
                    </div>
                    <div className="flex gap-3 mt-0.5 text-xs">
                      <span className="text-red-500">🔴{v.red}</span>
                      <span className="text-yellow-500">🟡{v.yellow}</span>
                      <span className="text-green-500">🟢{v.green}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <h3 className="font-black text-gray-700 mb-3">👨‍⚕️ Doctors</h3>
                {doctors.map(d=>(
                  <div key={d.id} className="flex justify-between items-center mb-3 pb-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{d.name}</p>
                      <p className="text-gray-400 text-xs">{d.spec} · {d.cases} cases</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${d.status==="Active"?"bg-green-100 text-green-700":"bg-gray-100 text-gray-500"}`}>{d.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab==="Registrations" && (
          <div>
            <h2 className="font-black text-gray-700 mb-3">Pending Approvals ({regs.length})</h2>
            {regs.length===0
              ? <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center"><p className="text-4xl mb-2">✅</p><p className="font-bold text-green-700">All clear!</p></div>
              : <div className="space-y-3">
                {regs.map(r=>(
                  <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-black text-gray-800">{r.name}</h3>
                        <p className="text-gray-500 text-sm">{r.role} · {r.empId}</p>
                        <p className="text-gray-400 text-xs">📍 {r.village} · 📞 {r.phone}</p>
                        <p className="text-gray-400 text-xs">📄 {r.doc} · {r.submitted}</p>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${r.role==="ASHA"?"bg-green-100 text-green-700":"bg-purple-100 text-purple-700"}`}>{r.role}</span>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={()=>approve(r.id)} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-sm">✅ Approve</button>
                      <button onClick={()=>reject(r.id)}  className="flex-1 bg-red-500  hover:bg-red-600  text-white font-bold py-2.5 rounded-xl text-sm">❌ Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            }
          </div>
        )}

        {tab==="Villages" && (
          <div>
            <h2 className="font-black text-gray-700 mb-3">Village Report</h2>
            <div className="space-y-3">
              {VILLAGES.map(v=>(
                <div key={v.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex justify-between mb-3">
                    <h3 className="font-black text-gray-800">{v.name}</h3>
                    <span className="text-gray-400 text-sm">{v.total} patients · 👩‍⚕️ {v.asha} ASHA</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-red-50 rounded-xl p-3 text-center"><p className="text-xl font-black text-red-600">{v.red}</p><p className="text-xs text-red-400">🚨 RED</p></div>
                    <div className="bg-yellow-50 rounded-xl p-3 text-center"><p className="text-xl font-black text-yellow-600">{v.yellow}</p><p className="text-xs text-yellow-500">⚠️ YELLOW</p></div>
                    <div className="bg-green-50 rounded-xl p-3 text-center"><p className="text-xl font-black text-green-600">{v.green}</p><p className="text-xs text-green-500">✅ GREEN</p></div>
                  </div>
                  {v.red>2&&<p className="mt-2 text-xs bg-red-50 text-red-600 font-bold px-3 py-1.5 rounded-lg">⚠️ High RED cases — immediate review needed</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="Doctors" && (
          <div>
            <h2 className="font-black text-gray-700 mb-3">Doctor Management</h2>
            <div className="space-y-3">
              {doctors.map(d=>(
                <div key={d.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-black text-gray-800">{d.name}</h3>
                      <p className="text-gray-500 text-sm">{d.spec} · {d.hospital}</p>
                      <p className="text-gray-400 text-xs">MCI: {d.mci} · {d.cases} active cases</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${d.status==="Active"?"bg-green-100 text-green-700":"bg-gray-100 text-gray-500"}`}>
                        {d.status==="Active"?"🟢":"⚪"} {d.status}
                      </span>
                      <button onClick={()=>toggleDoc(d.id)} className="text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                        Toggle Status
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="Send Alert" && (
          <div>
            <h2 className="font-black text-gray-700 mb-3">📢 Send Health Alert</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="mb-4">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Alert Type</label>
                <div className="flex gap-2">
                  {["INFO","WARNING","EMERGENCY"].map(t=>(
                    <button key={t} onClick={()=>setAlertType(t)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all ${alertType===t
                        ?t==="EMERGENCY"?"bg-red-600 border-red-600 text-white"
                          :t==="WARNING"?"bg-yellow-500 border-yellow-500 text-white"
                          :"bg-blue-600 border-blue-600 text-white"
                        :"bg-white border-gray-200 text-gray-500"}`}>
                      {t==="EMERGENCY"?"🚨":t==="WARNING"?"⚠️":"ℹ️"} {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Target</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none" value={alertVil} onChange={e=>setAlertVil(e.target.value)}>
                  <option>All Villages</option>
                  {VILLAGES.map(v=><option key={v.name}>{v.name}</option>)}
                </select>
              </div>
              <div className="mb-4">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Message *</label>
                <textarea className="w-full border border-gray-200 rounded-xl p-3 text-sm h-28 resize-none focus:outline-none focus:ring-2 focus:ring-amber-300"
                  placeholder="e.g. Dengue outbreak reported — use mosquito nets, visit PHC if fever persists..."
                  value={alertMsg} onChange={e=>setAlertMsg(e.target.value)} />
              </div>
              <button onClick={sendAlert}
                className="w-full text-white font-bold py-3 rounded-xl"
                style={{backgroundColor:alertType==="EMERGENCY"?"#dc2626":alertType==="WARNING"?"#d97706":"#2563eb"}}>
                📢 Send to {alertVil}
              </button>
            </div>
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="font-bold text-amber-800 text-sm mb-2">📋 Recent Alerts</p>
              {[
                {msg:"Dengue prevention: use mosquito nets",village:"All Villages",date:"Feb 12"},
                {msg:"PHC closed Feb 10 for maintenance",  village:"Hoskote",     date:"Feb 9"},
              ].map((a,i)=>(
                <div key={i} className="flex justify-between text-xs text-amber-700 py-1 border-b border-amber-100 last:border-0">
                  <span>{a.msg}</span><span className="text-amber-400 ml-2 whitespace-nowrap">{a.village} · {a.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
