import { useState } from 'react';

const AppointmentBooking = () => {
  const [appointments, setAppointments] = useState([
    { id:1, doctor:'Dr. Sharma', hospital:'PHC Hoskote', date:'Mar 6, 2026', time:'10:00 AM', status:'Confirmed', queueNo:5, reason:'General checkup', specialization:'General Medicine' }
  ]);
  const [showBooking, setShowBooking]   = useState(false);
  const [viewAppt, setViewAppt]         = useState(null);
  const [cancelAppt, setCancelAppt]     = useState(null);
  const [toast, setToast]               = useState(null);
  const [newAppointment, setNewAppointment] = useState({ hospital:'', doctor:'', date:'', time:'', reason:'' });

  // ── Payment flow states ──────────────────────────────────────────────
  const [showPayment, setShowPayment]   = useState(false);
  const [paymentStep, setPaymentStep]   = useState('form'); // 'form' | 'processing' | 'success'
  const [selectedUPI, setSelectedUPI]   = useState('');
  // ─────────────────────────────────────────────────────────────────────

  const hospitals = ['PHC Hoskote','District Hospital','Community Health Center'];
  const doctors   = ['Dr. Sharma (General)','Dr. Priya (Gynecologist)','Dr. Kumar (Pediatrician)'];
  const timeSlots = ['9:00 AM','10:00 AM','11:00 AM','2:00 PM','3:00 PM','4:00 PM'];
  const upiApps   = [
    { id:'gpay',    label:'Google Pay',  icon:'💳' },
    { id:'phonepe', label:'PhonePe',     icon:'📱' },
    { id:'paytm',   label:'Paytm',       icon:'💰' },
    { id:'upi',     label:'UPI ID',      icon:'🏦' },
  ];

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  // Called when user clicks "Proceed to Pay ₹10"
  const handleConfirmBooking = () => {
    if (!newAppointment.hospital || !newAppointment.date) return;
    setPaymentStep('form');
    setSelectedUPI('');
    setShowPayment(true);
  };

  // Called when user clicks "Pay ₹10" inside payment modal
  const handlePay = () => {
    if (!selectedUPI) return;
    setPaymentStep('processing');
    setTimeout(() => {
      setPaymentStep('success');
      setTimeout(() => {
        setShowPayment(false);
        setShowBooking(false);
        setAppointments(prev => [...prev, {
          id: Date.now(),
          ...newAppointment,
          status: 'Confirmed',
          queueNo: Math.floor(Math.random() * 15) + 1,
          specialization: 'General Medicine',
          paid: true,
        }]);
        setNewAppointment({ hospital:'', doctor:'', date:'', time:'', reason:'' });
        showToast('✅ Payment successful! Appointment booked & SMS sent.');
      }, 2000);
    }, 2000);
  };

  const confirmCancel = () => {
    setAppointments(prev => prev.filter(a => a.id !== cancelAppt.id));
    setCancelAppt(null);
    showToast('❌ Appointment cancelled.');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">

      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-gray-800 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-semibold">{toast}</div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">📅 Appointments</h2>
          <p className="text-gray-600 mt-1">अपॉइंटमेंट / Book and manage visits</p>
        </div>
        <button onClick={() => setShowBooking(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
          + Book Appointment
        </button>
      </div>

      <div className="space-y-4 mb-8">
        <h3 className="text-xl font-bold text-gray-700">Upcoming Appointments</h3>
        {appointments.length === 0 && (
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-10 text-center text-gray-400">
            No upcoming appointments. Book one above!
          </div>
        )}
        {appointments.map((appt) => (
          <div key={appt.id} className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-bold text-gray-800">{appt.doctor}</h4>
                <p className="text-gray-600">{appt.hospital}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-semibold text-sm">✅ {appt.status}</span>
                {appt.paid && <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-semibold text-xs">💳 ₹10 Paid</span>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4 text-center">
              <div className="bg-blue-50 p-3 rounded-lg"><div className="text-sm text-gray-500">Date</div><div className="font-bold text-gray-800">{appt.date}</div></div>
              <div className="bg-blue-50 p-3 rounded-lg"><div className="text-sm text-gray-500">Time</div><div className="font-bold text-gray-800">{appt.time}</div></div>
              <div className="bg-blue-50 p-3 rounded-lg"><div className="text-sm text-gray-500">Queue No.</div><div className="font-bold text-blue-600 text-xl">#{appt.queueNo}</div></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setViewAppt(appt)} className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 rounded-lg font-semibold">📋 View Details</button>
              <button onClick={() => setCancelAppt(appt)} className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded-lg font-semibold">❌ Cancel</button>
            </div>
          </div>
        ))}
      </div>

      {/* ── View Details Modal ─────────────────────────────────────────── */}
      {viewAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor:"rgba(0,0,0,0.55)"}} onClick={() => setViewAppt(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 flex justify-between items-center">
              <div>
                <h3 className="font-black text-xl">📋 Appointment Details</h3>
                <p className="text-blue-200 text-xs mt-0.5">Full information</p>
              </div>
              <button onClick={() => setViewAppt(null)} className="text-white/70 hover:text-white text-2xl font-bold">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Status</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">✅ {viewAppt.status}</span>
              </div>
              {[
                { label:"Doctor",           val: viewAppt.doctor },
                { label:"Hospital / PHC",   val: viewAppt.hospital },
                { label:"Specialization",   val: viewAppt.specialization || "General Medicine" },
                { label:"Date",             val: viewAppt.date },
                { label:"Time",             val: viewAppt.time },
                { label:"Queue Number",     val: `#${viewAppt.queueNo}` },
                { label:"Reason",           val: viewAppt.reason || "General checkup" },
                { label:"Consultation Fee", val: "₹10 (Paid)" },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center py-1">
                  <span className="text-gray-500 text-sm">{row.label}</span>
                  <span className="font-semibold text-gray-800 text-sm text-right max-w-[60%]">{row.val}</span>
                </div>
              ))}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mt-2">
                <p className="text-xs text-blue-700 font-semibold">💡 Tip: Arrive 10 minutes early. Bring your Aadhaar card and previous prescriptions.</p>
              </div>
              <button onClick={() => setViewAppt(null)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl mt-2">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Cancel Confirmation Modal ──────────────────────────────────── */}
      {cancelAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor:"rgba(0,0,0,0.55)"}} onClick={() => setCancelAppt(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center" onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-3">❌</div>
            <h3 className="text-xl font-black text-gray-800 mb-1">Cancel Appointment?</h3>
            <p className="text-gray-500 text-sm mb-1"><strong>{cancelAppt.doctor}</strong> at {cancelAppt.hospital}</p>
            <p className="text-gray-400 text-xs mb-5">{cancelAppt.date} · {cancelAppt.time}</p>
            <div className="flex gap-3">
              <button onClick={() => setCancelAppt(null)} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50">Keep It</button>
              <button onClick={confirmCancel} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl">Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Booking Modal ──────────────────────────────────────────────── */}
      {showBooking && !showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-2">Book Appointment</h3>
            {/* Fee notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-5 flex items-center gap-3">
              <span className="text-2xl">💳</span>
              <div>
                <p className="text-sm font-bold text-blue-800">Consultation Fee: ₹10</p>
                <p className="text-xs text-blue-600">One-time nominal fee per doctor visit</p>
              </div>
            </div>
            <div className="space-y-4">
              <select value={newAppointment.hospital} onChange={e => setNewAppointment({...newAppointment,hospital:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                <option value="">Select Hospital / PHC</option>
                {hospitals.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
              <select value={newAppointment.doctor} onChange={e => setNewAppointment({...newAppointment,doctor:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                <option value="">Select Doctor</option>
                {doctors.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <input type="date" value={newAppointment.date} onChange={e => setNewAppointment({...newAppointment,date:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
              <select value={newAppointment.time} onChange={e => setNewAppointment({...newAppointment,time:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                <option value="">Select Time Slot</option>
                {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <input type="text" placeholder="Reason for visit" value={newAppointment.reason} onChange={e => setNewAppointment({...newAppointment,reason:e.target.value})} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none" />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleConfirmBooking}
                disabled={!newAppointment.hospital || !newAppointment.date}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg"
              >
                Proceed to Pay ₹10 →
              </button>
              <button onClick={() => setShowBooking(false)} className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Payment Modal ──────────────────────────────────────────────── */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{backgroundColor:"rgba(0,0,0,0.65)"}}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">

            {/* FORM step */}
            {paymentStep === 'form' && (
              <>
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-black text-lg">💳 Pay Consultation Fee</h3>
                      <p className="text-blue-200 text-xs mt-0.5">Secure payment · NirAmaya Health</p>
                    </div>
                    <button onClick={() => setShowPayment(false)} className="text-white/70 hover:text-white text-2xl font-bold">×</button>
                  </div>
                  <div className="mt-4 bg-white/20 rounded-2xl px-5 py-3 text-center">
                    <p className="text-blue-100 text-xs mb-1">Amount to Pay</p>
                    <p className="text-white font-black text-4xl">₹10</p>
                    <p className="text-blue-200 text-xs mt-1">Doctor Consultation Fee</p>
                  </div>
                </div>
                <div className="px-5 pt-4 pb-5">
                  <div className="bg-gray-50 rounded-xl p-3 text-sm mb-4">
                    <p className="font-semibold text-gray-700 mb-1">📅 Booking Summary</p>
                    <p className="text-gray-500">{newAppointment.doctor || 'Doctor'} · {newAppointment.hospital}</p>
                    <p className="text-gray-500">{newAppointment.date} · {newAppointment.time}</p>
                  </div>
                  <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Choose Payment Method</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {upiApps.map(app => (
                      <button
                        key={app.id}
                        onClick={() => setSelectedUPI(app.id)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                          selectedUPI === app.id
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-lg">{app.icon}</span>
                        {app.label}
                        {selectedUPI === app.id && <span className="ml-auto text-blue-500">✓</span>}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handlePay}
                    disabled={!selectedUPI}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-black py-3.5 rounded-xl text-base mb-3 transition-all"
                  >
                    {selectedUPI ? `Pay ₹10 via ${upiApps.find(u => u.id === selectedUPI)?.label}` : 'Select payment method'}
                  </button>
                  <p className="text-center text-xs text-gray-400">🔒 100% Secure · Powered by NirAmaya Pay</p>
                </div>
              </>
            )}

            {/* PROCESSING step */}
            {paymentStep === 'processing' && (
              <div className="p-10 text-center">
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-2">Processing Payment…</h3>
                <p className="text-gray-500 text-sm">Please wait, do not close this screen</p>
                <p className="text-blue-600 font-bold text-lg mt-4">₹10</p>
              </div>
            )}

            {/* SUCCESS step */}
            {paymentStep === 'success' && (
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">✅</span>
                </div>
                <h3 className="text-2xl font-black text-green-600 mb-1">Payment Successful!</h3>
                <p className="text-gray-500 text-sm mb-4">₹10 paid · Appointment confirmed</p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-left mb-4">
                  <p className="text-xs text-green-700 font-semibold">Transaction ID: TXN{Date.now().toString().slice(-8)}</p>
                  <p className="text-xs text-green-600 mt-1">SMS confirmation will be sent shortly</p>
                </div>
                <p className="text-xs text-gray-400">Redirecting to your appointments…</p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default AppointmentBooking;