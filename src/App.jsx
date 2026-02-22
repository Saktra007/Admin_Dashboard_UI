import Dashboard from "./pages/Dashboard.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import Users from "./pages/Users.jsx";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
