import { useAuth } from '../context/AppAuthContext';

const RoleSelector = () => {
  const { signIn } = useAuth();

  const roles = [
    {
      id: 'patient',
      icon: '👤',
      title: 'Patient / रोगी',
      description: 'Get AI diagnosis and health guidance'
    },
    {
      id: 'asha',
      icon: '👩‍⚕️',
      title: 'ASHA Worker / आशा कार्यकर्ता',
      description: 'Monitor village health and urgent cases'
    },
    {
      id: 'doctor',
      icon: '👨‍⚕️',
      title: 'Doctor / डॉक्टर',
      description: 'View referrals and patient history'
    }
  ];

  const handleRoleSelect = (role) => {
    signIn('+919876543210', role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">🏥 NirAmaya</h1>
          <p className="text-2xl text-blue-100">Select Your Role</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="text-7xl mb-4">{role.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {role.title}
              </h3>
              <p className="text-gray-600">{role.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;