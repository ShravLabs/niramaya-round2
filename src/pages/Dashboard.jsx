import { useState, useEffect } from 'react';
import { useAuth } from '../context/AppAuthContext';
import PatientHome from '../components/patient/PatientHome';
import HealthHistory from '../components/patient/HealthHistory';
import MedicineReminders from '../components/patient/MedicineReminders';
import SymptomTracker from '../components/patient/SymptomTracker';
import AppointmentBooking from '../components/patient/AppointmentBooking';
import FamilyDashboard from '../components/family/FamilyDashboard';
import ASHADashboard from '../components/asha/ASHADashboard';
import DoctorDashboard from '../components/doctor/DoctorDashboard';
import AdminDashboard from '../components/admin/AdminDashboard';
import PHCDashboard from '../components/phc/PHCDashboard';
import FirstAid from '../components/common/FirstAid';
import EmergencyServices from '../components/common/EmergencyServices';
import HealthEducation from '../components/common/HealthEducation';

const Dashboard = () => {
  const { profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  // Listen for navigation events from child components
  useEffect(() => {
    const handler = (e) => setActiveTab(e.detail);
    window.addEventListener('niramaya-navigate', handler);
    return () => window.removeEventListener('niramaya-navigate', handler);
  }, []);

  const patientTabs = [
    { id: 'home', label: '🏠 Home', labelHindi: 'होम' },
    { id: 'family', label: '👨‍👩‍👧 Family', labelHindi: 'परिवार' },
    { id: 'medicines', label: '💊 Medicines', labelHindi: 'दवाइयां' },
    { id: 'symptoms', label: '📊 Symptoms', labelHindi: 'लक्षण' },
    { id: 'appointments', label: '📅 Appointments', labelHindi: 'अपॉइंटमेंट' },
    { id: 'history', label: '📋 History', labelHindi: 'इतिहास' },
    { id: 'firstaid', label: '🚑 First Aid', labelHindi: 'प्राथमिक चिकित्सा' },
    { id: 'emergency', label: '🚨 Emergency', labelHindi: 'आपातकाल' },
    { id: 'education', label: '📚 Health Tips', labelHindi: 'स्वास्थ्य टिप्स' },
  ];

  const renderContent = () => {
    if (profile?.role === 'asha') return <ASHADashboard user={profile} />;
    if (profile?.role === 'doctor') return <DoctorDashboard user={profile} />;
    if (profile?.role === 'admin') return <AdminDashboard user={profile} />;
    if (profile?.role === 'phc') return <PHCDashboard />;

    switch (activeTab) {
      case 'home': return <PatientHome />;
      case 'family': return <FamilyDashboard />;
      case 'medicines': return <MedicineReminders />;
      case 'symptoms': return <SymptomTracker />;
      case 'appointments': return <AppointmentBooking />;
      case 'history': return <HealthHistory />;
      case 'firstaid': return <FirstAid />;
      case 'emergency': return <EmergencyServices />;
      case 'education': return <HealthEducation />;
      default: return <PatientHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-white flex items-center">
                <span className="text-4xl mr-2">🏥</span>
                NirAmaya
              </h1>
              <span className="bg-blue-800 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                {profile?.role?.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-white text-right hidden md:block">
                <p className="font-semibold text-sm">{profile?.name}</p>
                <p className="text-xs text-blue-200">{profile?.village}</p>
              </div>
              <button
                onClick={signOut}
                className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs (Patient only) */}
      {(!profile?.role || profile?.role === 'patient') && (
        <div className="bg-white shadow-md sticky top-[68px] z-30 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-1 min-w-max">
              {patientTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 font-semibold text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center">
          <p className="text-gray-600 text-sm font-semibold">
            💡 AI Healthcare • 22 Languages • Works Offline • ₹10/month
          </p>
          <p className="text-gray-400 text-xs mt-1">Team Astrax • Round 2 Demo</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
