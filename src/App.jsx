import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRoutes from './routes/AppRoutes';

const GOOGLE_CLIENT_ID = "673691322527-64thd4doj29kdr0e6hm1aetqv57m11lb.apps.googleusercontent.com";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AppRoutes />
    </GoogleOAuthProvider>
  );
};

export default App;
