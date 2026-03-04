export const calculateTriage = (diagnosis, symptoms) => {
  const emergencyKeywords = [
    'chest pain', 'breathing', 'unconscious', 'seizure', 
    'bleeding', 'stroke', 'heart attack', 'emergency'
  ];
  
  const urgentKeywords = [
    'fever', 'persistent', 'severe', 'pain', 'infection',
    'days', 'weeks', 'worsening'
  ];

  const symptomsLower = symptoms.toLowerCase();
  const diagnosisLower = diagnosis.toLowerCase();
  const combined = symptomsLower + ' ' + diagnosisLower;

  // Check for emergency
  for (let keyword of emergencyKeywords) {
    if (combined.includes(keyword)) {
      return 'RED';
    }
  }

  // Check for urgent
  for (let keyword of urgentKeywords) {
    if (combined.includes(keyword)) {
      return 'YELLOW';
    }
  }

  return 'GREEN';
};