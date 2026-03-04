import { useOffline } from '../../context/AppOfflineContext';

const OfflineIndicator = () => {
  const { isOnline } = useOffline();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white px-4 py-3 text-center z-50 shadow-lg">
      <p className="font-semibold">
        📶 ऑफ़लाइन मोड / Offline Mode - Limited features available
      </p>
    </div>
  );
};

export default OfflineIndicator;