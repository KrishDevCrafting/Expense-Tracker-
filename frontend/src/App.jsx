import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/login";
import SignUp from "./pages/Auth/signUp";
import Income from "./Dashboard/Income";
import Home from "./Dashboard/Home";
import Expense from "./Dashboard/Expense";
import UserProvider from "./context/Context";
import ThemeProvider from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <ThemeProvider>
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
          <Toaster
            toastOptions={{
              className: "",
              style: {
                fontSize: "13px",
              },
            }}
          />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
