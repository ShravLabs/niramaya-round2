const CasesList = ({ cases }) => {
  const getTriageStyle = (triage) => {
    const styles = {
      RED: 'bg-red-50 border-red-500 border-l-8',
      YELLOW: 'bg-yellow-50 border-yellow-500 border-l-8',
      GREEN: 'bg-green-50 border-green-500 border-l-8'
    };
    return styles[triage] || styles.GREEN;
  };

  const getTriageBadge = (triage) => {
    const badges = {
      RED: 'bg-red-500 text-white',
      YELLOW: 'bg-yellow-500 text-gray-900',
      GREEN: 'bg-green-500 text-white'
    };
    return badges[triage] || badges.GREEN;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🚨 Urgent Cases / तत्काल मामले
      </h2>

      {cases
        .filter(c => c.triage === 'RED' || c.triage === 'YELLOW')
        .map((caseItem) => (
          <div
            key={caseItem.id}
            className={`${getTriageStyle(caseItem.triage)} p-6 rounded-xl shadow-lg`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {caseItem.patientName}
                </h3>
                <p className="text-gray-600">
                  Age: {caseItem.age} | {caseItem.village}
                </p>
              </div>
              <span className={`px-4 py-2 rounded-lg font-bold ${getTriageBadge(caseItem.triage)}`}>
                {caseItem.triage}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 font-semibold mb-1">Symptoms:</p>
              <p className="text-gray-800 text-lg">{caseItem.symptoms}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                📞 Call Patient
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                🏥 Mark Visited
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                📝 Add Notes
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-4">⏰ {caseItem.time}</p>
          </div>
        ))}

      {/* GREEN cases - collapsed */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200 mt-8">
        <h3 className="text-xl font-bold text-gray-700 mb-2">
          ✅ Routine Cases ({cases.filter(c => c.triage === 'GREEN').length})
        </h3>
        <p className="text-gray-600">No immediate action required</p>
      </div>
    </div>
  );
};

export default CasesList;