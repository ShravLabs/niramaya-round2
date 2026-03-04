import { useState } from "react";
import { useAuth } from '../context/AppAuthContext';

const DEMO_USERS = {
  patient: { phone:"9876543210", aadhaar:"1234 5678 9012", name:"Ramesh Kumar", age:42, village:"Demo Village" },
  asha:    { phone:"9123456789", aadhaar:"2345 6789 0123", employeeId:"ASHA-KA-00421", name:"Lakshmi Devi", age:31, village:"Hoskote", district:"Bengaluru Rural", qualification:"ANM", yearsExp:6 },
  doctor:  { phone:"9988776655", aadhaar:"3456 7890 1234", mciNumber:"KA-MCI-54321", name:"Dr. Arjun Rao", hospital:"PHC Hoskote", specialization:"General Medicine", email:"arjun.rao@phchoskote.gov.in" },
  admin:   { email:"admin@niramaya.gov.in", password:"Admin@123", adminId:"ADMN-KA-001", name:"Suresh Patil", department:"Karnataka Health Dept" },
};

const ROLES = [
  { id:"patient", label:"Patient",     icon:"🧑",  color:"#2563eb", desc:"Access health records & symptoms" },
  { id:"asha",    label:"ASHA Worker", icon:"👩‍⚕️", color:"#059669", desc:"Manage village health visits" },
  { id:"doctor",  label:"Doctor",      icon:"👨‍⚕️", color:"#7c3aed", desc:"Review cases & prescriptions" },
  { id:"admin",   label:"Admin / PHC", icon:"🏛️",  color:"#b45309", desc:"System-wide management" },
];

function OTPBox({ otp, setOtp }) {
  return (
    <div className="flex gap-2 justify-center my-4">
      {[0,1,2,3,4,5].map(i => (
        <input key={i} id={`otp-${i}`} type="text" maxLength={1} value={otp[i]||""}
          onChange={e => {
            const val = e.target.value.replace(/\D/,"");
            const arr = otp.split(""); arr[i]=val; setOtp(arr.join(""));
            if (val && i<5) document.getElementById(`otp-${i+1}`)?.focus();
          }}
          onKeyDown={e => { if(e.key==="Backspace"&&!otp[i]&&i>0) document.getElementById(`otp-${i-1}`)?.focus(); }}
          className="w-10 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-50"
          style={{ borderColor: otp[i]?"#2563eb":"#d1d5db" }}
        />
      ))}
    </div>
  );
}

export default function Login() {
  const { signIn } = useAuth();
  const [step, setStep]         = useState("role");
  const [role, setRole]         = useState(null);
  const [form, setForm]         = useState({});
  const [otp, setOtp]           = useState("");
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [docFile, setDocFile]   = useState(null);
  const [showPass, setShowPass] = useState(false);

  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const fmtAadhaar = v => v.replace(/\D/g,"").slice(0,12).replace(/(\d{4})(?=\d)/g,"$1 ").trim();

  const validate = () => {
    const e = {};
    if (role==="admin") {
      if (!form.email?.includes("@")) e.email="Valid email required";
      if (!form.password||form.password.length<6) e.password="Min 6 characters";
      if (!form.adminId) e.adminId="Admin ID required";
    } else {
      if (!form.phone||form.phone.length!==10) e.phone="10-digit phone required";
      if (!form.aadhaar||form.aadhaar.replace(/\s/g,"").length!==12) e.aadhaar="12-digit Aadhaar required";
      if (role==="asha"&&!form.employeeId) e.employeeId="Employee ID required";
      if (role==="asha"&&!form.village) e.village="Village name required";
      if ((role==="asha"||role==="doctor")&&!docFile) e.doc="Document upload required";
      if (role==="doctor"&&!form.mciNumber) e.mciNumber="MCI number required";
      if (role==="doctor"&&!form.hospital) e.hospital="Hospital name required";
    }
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const submitCredentials = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      role==="admin" ? finish() : setStep("otp");
    }, 1200);
  };

  const submitOtp = () => {
    if (otp.length!==6) { setErrors({otp:"Enter all 6 digits"}); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); finish(); }, 900);
  };

  const finish = () => {
    setStep("success");
    const user = { role, ...DEMO_USERS[role], ...form };
    signIn(user.phone || user.email, role);
  };

  const ri = ROLES.find(r=>r.id===role);
  const inp = (f) => `w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all ${errors[f]?"border-red-400 focus:ring-red-100":"border-gray-200 focus:ring-blue-100"}`;

  if (step==="role") return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{background:"linear-gradient(135deg,#0f172a 0%,#1e3a5f 55%,#0f2027 100%)"}}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-3"
            style={{background:"linear-gradient(135deg,#22c55e,#15803d)"}}>
            <span className="text-3xl">🏥</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">NirAmaya</h1>
          <p className="text-blue-300 text-sm mt-1">निरामया — AI Healthcare for Rural India</p>
        </div>
        <p className="text-center text-gray-500 text-xs uppercase tracking-widest mb-4">Select your role</p>
        <div className="grid grid-cols-2 gap-3">
          {ROLES.map(r=>(
            <button key={r.id} onClick={()=>{setRole(r.id);setStep("creds");}}
              className="p-5 rounded-2xl border text-left transition-all hover:scale-105 active:scale-95 group"
              style={{background:"rgba(255,255,255,0.05)",borderColor:"rgba(255,255,255,0.1)"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=r.color}
              onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"}>
              <div className="text-3xl mb-2">{r.icon}</div>
              <div className="font-bold text-white text-sm">{r.label}</div>
              <div className="text-gray-400 text-xs mt-0.5">{r.desc}</div>
            </button>
          ))}
        </div>
        <p className="text-center text-gray-600 text-xs mt-8">🔒 Aadhaar-verified · Govt of Karnataka</p>
      </div>
    </div>
  );

  if (step==="otp") return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{background:"linear-gradient(135deg,#0f172a,#1e3a5f,#0f2027)"}}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8">
        <button onClick={()=>setStep("creds")} className="text-gray-400 text-sm mb-4 flex items-center gap-1">← Back</button>
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">📱</div>
          <h2 className="text-2xl font-black text-gray-800">OTP Verification</h2>
          <p className="text-gray-500 text-sm">Sent to <strong>+91 {form.phone}</strong></p>
          <span className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{backgroundColor:ri.color}}>{ri.icon} {ri.label}</span>
        </div>
        <p className="text-center text-xs text-amber-600 bg-amber-50 rounded-lg py-2 mb-1">Demo OTP: <strong>123456</strong></p>
        <OTPBox otp={otp} setOtp={setOtp} />
        {errors.otp && <p className="text-red-500 text-xs text-center">{errors.otp}</p>}
        <button onClick={submitOtp} disabled={loading}
          className="w-full text-white font-bold py-3 rounded-xl mt-3 disabled:opacity-60"
          style={{backgroundColor:ri.color}}>
          {loading?"Verifying...":"Verify & Login →"}
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          Didn't receive? <button className="text-blue-500 hover:underline">Resend OTP</button>
        </p>
      </div>
    </div>
  );

  if (step==="success") return (
    <div className="min-h-screen flex items-center justify-center"
      style={{background:"linear-gradient(135deg,#0f172a,#1e3a5f,#0f2027)"}}>
      <div className="text-center">
        <div className="text-6xl animate-bounce mb-4">✅</div>
        <h2 className="text-2xl font-black text-white">Identity Verified!</h2>
        <p className="text-blue-300 mt-1">Welcome, {DEMO_USERS[role]?.name}</p>
        <p className="text-gray-400 text-sm mt-1">Loading {ri?.label} dashboard...</p>
      </div>
    </div>
  );

  // ── Credentials step ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{background:"linear-gradient(135deg,#0f172a,#1e3a5f,#0f2027)"}}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-5 text-white" style={{backgroundColor:ri.color}}>
          <button onClick={()=>{setStep("role");setErrors({});setForm({});setDocFile(null);}}
            className="text-white/70 hover:text-white text-sm mb-2">← Change Role</button>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{ri.icon}</span>
            <div>
              <h2 className="text-xl font-black">{ri.label} Login</h2>
              <p className="text-white/70 text-xs">{ri.desc}</p>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-3 overflow-y-auto" style={{maxHeight:"75vh"}}>

          {/* ADMIN */}
          {role==="admin" && <>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Admin ID *</label>
              <input className={inp("adminId")} placeholder="ADMN-KA-001"
                value={form.adminId||""} onChange={e=>set("adminId",e.target.value)} />
              {errors.adminId && <p className="text-red-500 text-xs mt-1">{errors.adminId}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Official Email *</label>
              <input className={inp("email")} type="email" placeholder="admin@niramaya.gov.in"
                value={form.email||""} onChange={e=>set("email",e.target.value)} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Password *</label>
              <div className="relative">
                <input className={inp("password")} type={showPass?"text":"password"} placeholder="••••••••"
                  value={form.password||""} onChange={e=>set("password",e.target.value)} />
                <button type="button" onClick={()=>setShowPass(s=>!s)}
                  className="absolute right-3 top-2.5 text-gray-400 text-sm">{showPass?"🙈":"👁"}</button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
              Demo → ID: <strong>ADMN-KA-001</strong> · Email: <strong>admin@niramaya.gov.in</strong> · Pass: <strong>Admin@123</strong>
            </div>
          </>}

          {/* COMMON: phone + aadhaar */}
          {role!=="admin" && <>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Mobile Number *</label>
              <div className="flex gap-2">
                <span className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-500 bg-gray-50">+91</span>
                <input className={`flex-1 ${inp("phone")}`} type="tel" placeholder="10-digit number"
                  maxLength={10} value={form.phone||""} onChange={e=>set("phone",e.target.value.replace(/\D/g,"").slice(0,10))} />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Aadhaar Number *</label>
              <input className={inp("aadhaar")} placeholder="1234 5678 9012"
                value={form.aadhaar||""} onChange={e=>set("aadhaar",fmtAadhaar(e.target.value))} />
              {errors.aadhaar && <p className="text-red-500 text-xs mt-1">{errors.aadhaar}</p>}
            </div>
          </>}

          {/* ASHA extras */}
          {role==="asha" && <>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">ASHA Employee ID *</label>
              <input className={inp("employeeId")} placeholder="ASHA-KA-00421"
                value={form.employeeId||""} onChange={e=>set("employeeId",e.target.value)} />
              {errors.employeeId && <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Assigned Village *</label>
              <input className={inp("village")} placeholder="e.g. Hoskote"
                value={form.village||""} onChange={e=>set("village",e.target.value)} />
              {errors.village && <p className="text-red-500 text-xs mt-1">{errors.village}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Upload ASHA Certificate *</label>
              <label className={`flex items-center gap-2 border-2 border-dashed rounded-xl px-4 py-3 cursor-pointer transition-all ${docFile?"border-green-400 bg-green-50":"border-gray-300 hover:border-green-400"}`}>
                <span className="text-xl">{docFile?"✅":"📄"}</span>
                <span className="text-sm text-gray-500">{docFile?docFile.name:"Click to upload (PDF/JPG/PNG)"}</span>
                <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e=>setDocFile(e.target.files[0])} />
              </label>
              {errors.doc && <p className="text-red-500 text-xs mt-1">{errors.doc}</p>}
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-700">
              Demo → Phone: <strong>9123456789</strong> · Aadhaar: <strong>2345 6789 0123</strong> · ID: <strong>ASHA-KA-00421</strong>
            </div>
          </>}

          {/* DOCTOR extras */}
          {role==="doctor" && <>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">MCI Registration Number *</label>
              <input className={inp("mciNumber")} placeholder="KA-MCI-54321"
                value={form.mciNumber||""} onChange={e=>set("mciNumber",e.target.value)} />
              {errors.mciNumber && <p className="text-red-500 text-xs mt-1">{errors.mciNumber}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Hospital / PHC Name *</label>
              <input className={inp("hospital")} placeholder="e.g. PHC Hoskote"
                value={form.hospital||""} onChange={e=>set("hospital",e.target.value)} />
              {errors.hospital && <p className="text-red-500 text-xs mt-1">{errors.hospital}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Specialization</label>
              <select className={inp("specialization")} value={form.specialization||""} onChange={e=>set("specialization",e.target.value)}>
                <option value="">Select specialization</option>
                {["General Medicine","Pediatrics","Gynecology","Orthopedics","Dermatology","Psychiatry"].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Upload Degree / Registration *</label>
              <label className={`flex items-center gap-2 border-2 border-dashed rounded-xl px-4 py-3 cursor-pointer transition-all ${docFile?"border-green-400 bg-green-50":"border-gray-300 hover:border-purple-400"}`}>
                <span className="text-xl">{docFile?"✅":"📄"}</span>
                <span className="text-sm text-gray-500">{docFile?docFile.name:"Click to upload (PDF/JPG/PNG)"}</span>
                <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e=>setDocFile(e.target.files[0])} />
              </label>
              {errors.doc && <p className="text-red-500 text-xs mt-1">{errors.doc}</p>}
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-xs text-purple-700">
              Demo → Phone: <strong>9988776655</strong> · Aadhaar: <strong>3456 7890 1234</strong> · MCI: <strong>KA-MCI-54321</strong>
            </div>
          </>}

          {/* PATIENT demo hint */}
          {role==="patient" && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
              Demo → Phone: <strong>9876543210</strong> · Aadhaar: <strong>1234 5678 9012</strong>
            </div>
          )}

          <button onClick={submitCredentials} disabled={loading}
            className="w-full text-white font-bold py-3 rounded-xl transition-all disabled:opacity-60 hover:opacity-90"
            style={{backgroundColor:ri.color}}>
            {loading?"Verifying details..." : role==="admin" ? "Login →" : "Send OTP →"}
          </button>
        </div>
      </div>
    </div>
  );
}
