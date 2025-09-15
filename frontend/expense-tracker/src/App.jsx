import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/login";
import SignUp from "./pages/Auth/signUp";
import Income from "./Dashboard/Income";
import Home from "./Dashboard/Home";
import Expense from "./Dashboard/Expense";
import UserProvider from "./context/Context";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
