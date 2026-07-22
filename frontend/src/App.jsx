import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import RentalRequests from "./pages/RentalRequests";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/rental-requests" element={<RentalRequests />} />

        <Route
          path="/properties/:id"
          element={<PropertyDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;