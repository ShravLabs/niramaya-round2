const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <div className="w-24 h-24 border-8 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-3xl">
          🏥
        </div>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-800">लक्षणों का विश्लेषण...</p>
        <p className="text-xl text-gray-600 mt-2">Analyzing symptoms...</p>
        <p className="text-sm text-gray-500 mt-3">AI processing your input</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;