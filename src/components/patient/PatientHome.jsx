import { useState } from 'react';
import VoiceInput from '../common/VoiceInput';
import LoadingSpinner from '../common/LoadingSpinner';
import DiagnosisResult from './DiagnosisResult';
import { analyzeSymptoms } from '../../utils/groqApi';
import { offlineDiagnose } from '../../utils/offlineAI';
import { useOffline } from '../../context/AppOfflineContext';

const PatientHome = () => {
  const [stage, setStage] = useState('input');
  const [result, setResult] = useState(null);
  const { isOnline } = useOffline();

  const handleVoiceResult = async (transcript) => {
    setStage('loading');

    let diagnosis;
    if (isOnline) {
      diagnosis = await analyzeSymptoms(transcript);
    } else {
      diagnosis = await offlineDiagnose(transcript);
    }
    
    setResult({ ...diagnosis, symptoms: transcript });
    setStage('result');
  };

  const handleReset = () => {
    setStage('input');
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-12 min-h-[600px] flex flex-col items-center justify-center">
        
        {stage === 'input' && (
          <div className="text-center space-y-8 w-full">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-3">
                अपने लक्षण बताएं
              </h2>
              <p className="text-2xl text-gray-600">
                Speak Your Symptoms
              </p>
            </div>
            
            <VoiceInput onResult={handleVoiceResult} />
            
            <div className="bg-gray-50 p-6 rounded-xl max-w-md mx-auto">
              <p className="text-sm text-gray-600 mb-3">उदाहरण / Example:</p>
              <div className="space-y-2">
                <p className="text-gray-800 font-medium">"मुझे बुखार और सिर दर्द है"</p>
                <p className="text-gray-800 font-medium">"I have fever and headache"</p>
              </div>
            </div>
          </div>
        )}

        {stage === 'loading' && <LoadingSpinner />}

        {stage === 'result' && (
          <div className="w-full space-y-8">
            <DiagnosisResult result={result} />
            
            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-xl shadow-lg transition-all hover:shadow-xl"
              >
                ← नया निदान / New Diagnosis
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PatientHome;