export const offlineDiagnose = async (symptoms) => {
  try {
    const response = await fetch('/offline-model.json');
    const data = await response.json();
    
    const symptomsLower = symptoms.toLowerCase();
    
    // Find matching condition
    for (let condition of data.conditions) {
      for (let keyword of condition.keywords) {
        if (symptomsLower.includes(keyword)) {
          return {
            diagnosis: condition.diagnosis,
            triage: condition.triage,
            recommendations: getRecommendations(condition.triage),
            offline: true
          };
        }
      }
    }
    
    // Default if no match
    return {
      diagnosis: 'Unable to diagnose offline. Please consult a doctor when online.',
      triage: 'YELLOW',
      recommendations: 'Connect to internet for AI diagnosis or visit nearest health center.',
      offline: true
    };
    
  } catch (error) {
    console.error('Offline diagnosis error:', error);
    return {
      diagnosis: 'Offline mode unavailable. Please try again.',
      triage: 'YELLOW',
      recommendations: 'Consult doctor if symptoms persist.',
      offline: true
    };
  }
};

const getRecommendations = (triage) => {
  switch(triage) {
    case 'RED':
      return 'EMERGENCY: Call 108 ambulance immediately. Go to hospital NOW.';
    case 'YELLOW':
      return 'Consult doctor within 24-48 hours. Monitor symptoms closely.';
    case 'GREEN':
      return 'Home care sufficient. Rest, fluids, monitor. See doctor if worsens.';
    default:
      return 'Consult healthcare provider.';
  }
};