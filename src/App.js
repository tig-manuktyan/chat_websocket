import React, { useContext } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import { AuthContext } from "./context";

const App = () => {
  const authContext = useContext(AuthContext);

  return authContext.isAuthenticated ? (
    <Routes>
      <Route path="/chat" element={<Chat />} />
      <Route path="/*" element={<Navigate to="/chat" />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
