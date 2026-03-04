import { AuthProvider, useAuth } from './context/AppAuthContext';
import { OfflineProvider } from './context/AppOfflineContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import OfflineIndicator from './components/common/OfflineIndicator';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <OfflineIndicator />
      {isAuthenticated ? <Dashboard /> : <Login />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <OfflineProvider>
        <AppContent />
      </OfflineProvider>
    </AuthProvider>
  );
}

export default App;