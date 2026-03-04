const PHCDashboard = () => {
  const villageData = [
    { village: 'Hoskote', population: 2400, users: 287, redCases: 3, yellowCases: 18, greenCases: 89 },
    { village: 'Devanahalli', population: 1800, users: 145, redCases: 1, yellowCases: 12, greenCases: 67 },
    { village: 'Vijayapura', population: 3200, users: 312, redCases: 5, yellowCases: 24, greenCases: 102 },
    { village: 'Sulibele', population: 1200, users: 98, redCases: 0, yellowCases: 8, greenCases: 45 },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">🏥 PHC Dashboard</h1>
        <p className="text-gray-600 mt-1">Primary Health Center - Village Health Overview</p>
      </div>

      {/* Alert Banner */}
      <div className="bg-red-50 border-2 border-red-400 p-5 rounded-xl mb-6 flex items-center justify-between">
        <div>
          <p className="text-red-800 font-bold text-lg">⚠️ Possible Outbreak Alert</p>
          <p className="text-red-700">Viral fever cases up 40% in Vijayapura this week</p>
        </div>
        <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold">
          Take Action
        </button>
      </div>

      {/* Village Table */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 mb-8 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Village Health Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700 font-bold">Village</th>
                <th className="px-6 py-4 text-center text-gray-700 font-bold">Population</th>
                <th className="px-6 py-4 text-center text-gray-700 font-bold">NirAmaya Users</th>
                <th className="px-6 py-4 text-center text-red-600 font-bold">🔴 Red</th>
                <th className="px-6 py-4 text-center text-yellow-600 font-bold">🟡 Yellow</th>
                <th className="px-6 py-4 text-center text-green-600 font-bold">🟢 Green</th>
                <th className="px-6 py-4 text-center text-gray-700 font-bold">Coverage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {villageData.map((village) => (
                <tr key={village.village} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-800">{village.village}</td>
                  <td className="px-6 py-4 text-center text-gray-700">{village.population.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center text-blue-600 font-semibold">{village.users}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-lg font-bold ${village.redCases > 0 ? 'bg-red-100 text-red-700' : 'text-gray-400'}`}>
                      {village.redCases}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 rounded-lg bg-yellow-100 text-yellow-700 font-bold">
                      {village.yellowCases}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 font-bold">
                      {village.greenCases}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(village.users / village.population) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {Math.round((village.users / village.population) * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Referrals', value: '127', icon: '📋', color: 'bg-blue-500' },
          { label: 'Resolved', value: '89', icon: '✅', color: 'bg-green-500' },
          { label: 'Pending', value: '38', icon: '⏳', color: 'bg-yellow-500' },
          { label: 'Emergency', value: '9', icon: '🚨', color: 'bg-red-500' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} text-white p-5 rounded-xl text-center`}>
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-sm mt-1 opacity-90">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Report Button */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Government Reports</h3>
        <div className="flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
            📥 Monthly Report
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold">
            📊 HMIS Export
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold">
            🗺️ Disease Heatmap
          </button>
        </div>
      </div>
    </div>
  );
};

export default PHCDashboard;