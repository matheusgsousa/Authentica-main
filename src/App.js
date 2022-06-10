import { AppRoutes } from "./routes/routes";
import { UserAuthContextProvider } from "./contexts/authContext";
import 'bootstrap/dist/css/bootstrap.min.css'

export const App = () => {
  return (
    <UserAuthContextProvider>
      <AppRoutes />
    </UserAuthContextProvider>
  );
};
