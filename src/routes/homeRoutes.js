import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import Profile from 'src/pages/Profile';
import DataGrid from 'src/pages/Grid';
import GridData from 'src/pages/GridData';
import GridDataDetails from 'src/pages/GridDataDetails';

export default function HomeRouter() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={`/`} replace />} />
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<DataGrid />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/grid-data" element={<GridData />} />
        <Route path="/grid-data-details" element={<GridDataDetails />} />
      </Route>
    </Routes>
  );
}
