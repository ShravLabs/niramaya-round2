import TriageBadge from '../common/TriageBadge';

const DiagnosisResult = ({ result }) => {
  if (!result) return null;

  return (
    <div className="w-full space-y-6">
      <TriageBadge triage={result.triage} />

      {result.offline && (
        <div className="bg-yellow-50 border-2 border-yellow-400 p-4 rounded-lg">
          <p className="text-yellow-800 font-semibold text-center">
            📶 Offline Mode - Limited AI diagnosis
          </p>
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-4xl mr-3">🏥</span>
          निदान / Diagnosis
        </h3>
        <p className="text-gray-700 leading-relaxed text-lg">{result.diagnosis}</p>
      </div>

      <div className="bg-blue-50 p-8 rounded-2xl border-2 border-blue-200">
        <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
          <span className="text-4xl mr-3">💊</span>
          सिफारिशें / Recommendations
        </h3>
        <p className="text-gray-700 leading-relaxed text-lg">{result.recommendations}</p>
      </div>

      {result.triage?.toUpperCase() === 'RED' && (
        <div className="bg-red-50 border-4 border-red-500 p-8 rounded-2xl">
          <p className="text-red-900 font-bold text-2xl mb-4">⚡ तत्काल कार्रवाई / Immediate Actions:</p>
          <ul className="text-red-800 space-y-3 text-lg">
            <li>✓ ASHA worker को सूचित किया गया / ASHA worker notified</li>
            <li>✓ परिवार को सतर्क किया गया / Family alerted</li>
            <li>✓ एम्बुलेंस कॉल करें / Call ambulance: 108</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DiagnosisResult;