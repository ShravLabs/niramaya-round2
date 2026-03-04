const PatientDetails = ({ patient }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Patient Details
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Name:</span>
          <span className="font-semibold">Demo Patient</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Age:</span>
          <span className="font-semibold">45 years</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Village:</span>
          <span className="font-semibold">Hoskote</span>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;