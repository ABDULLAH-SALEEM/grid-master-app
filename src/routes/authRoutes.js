import SigninPage from '../pages/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from 'src/pages/SignUp';
import OTPVerification from 'src/pages/OTPVerification';
import RecoverAccount from 'src/pages/RecoverAccount';
import SimpleLayout from 'src/layouts/simple';
import ChangePassword from 'src/pages/ChangePassword';

export default function AuthRouter() {
  return (
    <Routes>
      <Route element={<SimpleLayout />}>
        <Route path="*" element={<Navigate to={`/`} replace />} />
        <Route path={'/'} element={<SigninPage />} />
        <Route path="/recover-account" element={<RecoverAccount />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/otp" element={<OTPVerification />} />
      </Route>
    </Routes>
  );
}
