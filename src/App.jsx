import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./page/overview/Dashboard";
import Traffic from "./page/analytics/Traffic";
import Revenue from "./page/analytics/Revenue";
import Conversion from "./page/analytics/Conversion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics/traffic" element={<Traffic />} />
          <Route path="/analytics/revenue" element={<Revenue />} />
          <Route path="/analytics/conversions" element={<Conversion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
