import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NeedAuth from "./components/auth/NeedAuth";
function App() {
  return (
    <div className="App bg-neutral_dark h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <NeedAuth>
              <Dashboard />
            </NeedAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
