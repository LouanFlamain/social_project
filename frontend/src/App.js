import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Test from "./pages/test";
import Homepage from "./pages/homePage";
import Error404 from "./pages/404";
import NeedAuth from "./components/auth/needAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NeedAuth children={<Homepage />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
