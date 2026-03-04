import { useState } from 'react';

const AppointmentBooking = () => {
  const [appointments, setAppointments] = useState([
    { id:1, doctor:'Dr. Sharma', hospital:'PHC Hoskote', date:'Mar 6, 2026', time:'10:00 AM', status:'Confirmed', queueNo:5, reason:'General checkup', specialization:'General Medicine' }
  ]);
  const [showBooking, setShowBooking]     = useState(false);
  const [viewAppt, setViewAppt]           = useState(null);
  const [cancelAppt, setCancelAppt]       = useState(null);
  const [toast, setToast]                 = useState(null);
  const [newAppointment, setNewAppointment] = useState({ hospital:'', doctor:'', date:'', time:'', reason:'' });

  const hospitals   = ['PHC Hoskote','District Hospital','Community Health Center'];
  const doctors     = ['Dr. Sharma (General)','Dr. Priya (Gynecologist)','Dr. Kumar (Pediatrician)'];
  const timeSlots   = ['9:00 AM','10:00 AM','11:00 AM','2:00 PM','3:00 PM','4:00 PM'];

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const bookAppointment = () => {
    if (!newAppointment.hospital || !newAppointment.date) return;
    setAppointments(prev => [...prev, { id:Date.now(), ...newAppointment, status:'Confirmed', queueNo:Math.floor(Math.random()*15)+1, specialization:'General Medicine' }]);
    setNewAppointment({ hospital:'', doctor:'', date:'', time:'', reason:'' });
    setShowBooking(false);
    showToast('✅ Appointment booked! SMS confirmation sent.');
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
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-semibold text-sm">✅ {appt.status}</span>
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

      {/* View Details Modal */}
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
                { label:"Doctor",         val: viewAppt.doctor },
                { label:"Hospital / PHC", val: viewAppt.hospital },
                { label:"Specialization", val: viewAppt.specialization || "General Medicine" },
                { label:"Date",           val: viewAppt.date },
                { label:"Time",           val: viewAppt.time },
                { label:"Queue Number",   val: `#${viewAppt.queueNo}` },
                { label:"Reason",         val: viewAppt.reason || "General checkup" },
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

      {/* Cancel Confirmation Modal */}
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

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">Book Appointment</h3>
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
              <button onClick={bookAppointment} className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg">Confirm Booking</button>
              <button onClick={() => setShowBooking(false)} className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;
