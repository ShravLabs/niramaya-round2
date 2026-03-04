import { useState } from "react";

const EmergencyServices = () => {
  const [locationShared, setLocationShared] = useState(false);
  const [ashaAlerted, setAshaAlerted] = useState(false);
  const [dirToast, setDirToast] = useState(null);

  const hospitals = [
    { name:"District Hospital Hoskote", distance:"12 km", phone:"08027976234", maps:"District+Hospital+Hoskote+Karnataka" },
    { name:"PHC Hoskote",               distance:"3 km",  phone:"08027976100", maps:"PHC+Hoskote+Karnataka" },
    { name:"Vydehi Hospital",           distance:"28 km", phone:"08028413381", maps:"Vydehi+Hospital+Bangalore+Karnataka" },
  ];

  const openMaps = (hospital) => {
    const url = `https://www.google.com/maps/search/${hospital.maps}`;
    window.open(url, '_blank');
    setDirToast(hospital.name);
    setTimeout(() => setDirToast(null), 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">

      {dirToast && (
        <div className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-semibold">
          🗺️ Opening Google Maps for {dirToast}...
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Emergency Services</h2>
        <p className="text-gray-600 mt-1">One-tap emergency help</p>
      </div>

      <div className="bg-red-500 text-white p-8 rounded-2xl mb-6 text-center">
        <p className="text-xl mb-4">Life-threatening emergency?</p>
        <a href="tel:108" className="inline-block bg-white text-red-600 font-bold text-4xl px-16 py-6 rounded-2xl">
          CALL 108
        </a>
        <p className="text-sm mt-4">Free ambulance - Available 24 hours</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button onClick={() => setLocationShared(true)}
          className="p-6 rounded-xl border-2 font-semibold text-lg text-left bg-blue-50 border-blue-300 text-blue-700">
          <div>{locationShared ? "✅ Location Shared!" : "📍 Share My Location"}</div>
          <p className="text-sm font-normal mt-1">{locationShared ? "Ambulance knows where you are" : "Help ambulance find you faster"}</p>
        </button>
        <button onClick={() => setAshaAlerted(true)}
          className="p-6 rounded-xl border-2 font-semibold text-lg text-left bg-purple-50 border-purple-300 text-purple-700">
          <div>{ashaAlerted ? "✅ ASHA Notified!" : "🔔 Alert ASHA Worker"}</div>
          <p className="text-sm font-normal mt-1">{ashaAlerted ? "Lakshmi is on her way" : "Nearest ASHA: Lakshmi - 500m away"}</p>
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Nearest Hospitals</h3>
        <div className="space-y-4">
          {hospitals.map((hospital, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
              <h4 className="text-xl font-bold text-gray-800 mb-1">{hospital.name}</h4>
              <p className="text-gray-500 mb-4">{hospital.distance} away</p>
              <div className="flex gap-3">
                <a href={"tel:"+hospital.phone} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold text-center hover:bg-green-700">
                  📞 Call
                </a>
                <button
                  onClick={() => openMaps(hospital)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  🗺️ Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Emergency Numbers</h3>
        <div className="grid grid-cols-2 gap-3">
          <a href="tel:108" className="text-white p-4 rounded-xl text-center font-bold block bg-red-500 hover:bg-red-600"><div className="text-2xl">108</div><div className="text-sm mt-1">Ambulance</div></a>
          <a href="tel:100" className="text-white p-4 rounded-xl text-center font-bold block bg-blue-500 hover:bg-blue-600"><div className="text-2xl">100</div><div className="text-sm mt-1">Police</div></a>
          <a href="tel:101" className="text-white p-4 rounded-xl text-center font-bold block bg-orange-500 hover:bg-orange-600"><div className="text-2xl">101</div><div className="text-sm mt-1">Fire</div></a>
          <a href="tel:1091" className="text-white p-4 rounded-xl text-center font-bold block bg-purple-500 hover:bg-purple-600"><div className="text-2xl">1091</div><div className="text-sm mt-1">Women Helpline</div></a>
        </div>
      </div>
    </div>
  );
};

export default EmergencyServices;
