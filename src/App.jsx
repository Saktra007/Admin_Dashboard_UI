import { UserProvider } from "./context/UserContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { RouterProvider } from "react-router-dom";
import routes from "./routes.jsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <RouterProvider router={routes} />
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
