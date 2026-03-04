const TriageBadge = ({ triage }) => {
  const config = {
    RED: {
      bg: 'bg-red-500',
      icon: '🚨',
      text: 'आपातकाल - तुरंत अस्पताल जाएं! / EMERGENCY - Go to hospital NOW!',
      textColor: 'text-white'
    },
    YELLOW: {
      bg: 'bg-yellow-500',
      icon: '⚠️',
      text: '24-48 घंटे में डॉक्टर से मिलें / Consult doctor within 24-48 hours',
      textColor: 'text-gray-900'
    },
    GREEN: {
      bg: 'bg-green-500',
      icon: '✅',
      text: 'घर पर देखभाल पर्याप्त है / Home care sufficient',
      textColor: 'text-white'
    }
  };

  const level = config[triage?.toUpperCase()] || config.YELLOW;

  return (
    <div className={`${level.bg} ${level.textColor} p-8 rounded-2xl text-center shadow-2xl`}>
      <div className="text-7xl mb-4">{level.icon}</div>
      <div className="text-3xl font-bold mb-3">{triage?.toUpperCase()}</div>
      <div className="text-base">{level.text}</div>
    </div>
  );
};

export default TriageBadge;