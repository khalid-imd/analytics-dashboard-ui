import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./page/overview/Dashboard";
import Traffic from "./page/analytics/Traffic";
import Revenue from "./page/analytics/Revenue";
import Conversion from "./page/analytics/Conversion";
import SavedReport from "./page/reports/SavedReport";
import Scheduled from "./page/reports/Scheduled";
import Sources from "./page/data/Sources";
import Segments from "./page/data/Segments";

function App() {
  console.log(
    "%cLEST GET IN TOUCH",
    "color: #5865F2; font-size: 40px; font-weight: bold;",
  );
  console.log("%cmuhamadkhalid899@gmail.com", "color: #888; font-size: 16px;");

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics/traffic" element={<Traffic />} />
          <Route path="/analytics/revenue" element={<Revenue />} />
          <Route path="/analytics/conversions" element={<Conversion />} />
          <Route path="/reports/saved-report" element={<SavedReport />} />
          <Route path="/reports/scheduled" element={<Scheduled />} />
          <Route path="/data/sources" element={<Sources />} />
          <Route path="/data/segments" element={<Segments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
