import { Routes, Route } from "react-router-dom";
import LoginPanel from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <Routes>
      {/* Home Route (can be replaced with your Home component if needed) */}
      <Route path="/" element={<h1>Welcome to the App! Please login or register.</h1>} />
      
      {/* Login Route */}
      <Route path="/login" element={<LoginPanel />} />
      
      {/* Register Route */}
      <Route path="/register" element={<Register />} />

      {/* Fallback Route for undefined paths */}
      <Route path="*" element={<h1>404: Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
