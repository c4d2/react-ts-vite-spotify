import { Spotify } from "./pages/Spotify";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import OtherLogin from "./pages/OtherLogin";
import { Route, Routes, Navigate } from "react-router-dom";
// n
import { BrowserRouter } from "react-router-dom";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Spotify />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/otherlogin" element={<OtherLogin />}></Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
