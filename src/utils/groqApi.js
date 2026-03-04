export const analyzeSymptoms = async (symptoms) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  
  if (!apiKey) {
    console.warn('Groq API key missing - using mock data');
    return getMockDiagnosis(symptoms);
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are a medical AI assistant for rural India. Analyze symptoms and provide diagnosis in JSON format:
{
  "diagnosis": "Brief diagnosis in 2-3 sentences",
  "triage": "RED or YELLOW or GREEN",
  "recommendations": "What patient should do"
}`
          },
          {
            role: 'user',
            content: `Patient symptoms: ${symptoms}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) throw new Error('API request failed');

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      return JSON.parse(content);
    } catch {
      return {
        diagnosis: content,
        triage: 'YELLOW',
        recommendations: 'Please consult a doctor for proper evaluation.'
      };
    }

  } catch (error) {
    console.error('Groq API Error:', error);
    return getMockDiagnosis(symptoms);
  }
};

const getMockDiagnosis = (symptoms) => {
  const lower = symptoms.toLowerCase();
  
  if (lower.includes('chest pain') || lower.includes('breathing') || lower.includes('unconscious')) {
    return {
      diagnosis: 'Possible cardiac or respiratory emergency detected. Immediate medical attention required.',
      triage: 'RED',
      recommendations: 'Call ambulance (108) immediately. Do not wait. Go to nearest hospital NOW.'
    };
  }
  
  if (lower.includes('fever') && lower.includes('days')) {
    return {
      diagnosis: 'Persistent fever detected. Could indicate bacterial infection requiring medical evaluation.',
      triage: 'YELLOW',
      recommendations: 'Consult doctor within 24-48 hours. Monitor temperature. Stay hydrated.'
    };
  }
  
  return {
    diagnosis: `Based on symptoms "${symptoms}", this appears to be a minor condition. Rest and monitoring recommended.`,
    triage: 'GREEN',
    recommendations: 'Rest, drink fluids, monitor symptoms. Consult doctor if symptoms worsen or persist beyond 3 days.'
  };
};
