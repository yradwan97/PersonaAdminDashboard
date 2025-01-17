import { Routes, Route } from 'react-router-dom';

import ProtectedRoutes from './ProtectedRoutes';

import Login from '../modules/auth/Login';

import Dashboard from '../modules/dashboard/Dashboard';

import SettingsHome from "../modules/settings/home/Home";
import SettingsHomeHeader from "../modules/settings/home/tabs/Header";
import SettingsHomeOffer from "../modules/settings/home/tabs/Offer";
import SettingsHomeAbout from "../modules/settings/home/tabs/About";
import SettingsHomeRegister from "../modules/settings/home/tabs/Register";

import SettingsGlobal from "../modules/settings/global/Global";
import SettingsGlobalConfig from "../modules/settings/global/tabs/Config";

import Users from "../modules/users/Users";
import Alerts from "../modules/alerts/Alerts";
import Features from "../modules/features/Features";
import Testmonials from "../modules/testmonials/Testmonials";

const Navigations = () => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path='' element={<Dashboard />} />
        <Route path="settings/home" element={<SettingsHome />}>
          <Route path='' element={<SettingsHomeHeader />} />
          <Route path='offer' element={<SettingsHomeOffer />} />
          <Route path='about' element={<SettingsHomeAbout />} />
          <Route path='register' element={<SettingsHomeRegister />} />
        </Route>
        <Route path="settings/global" element={<SettingsGlobal />}>
          <Route path='' element={<SettingsGlobalConfig />} />
        </Route>

        <Route path="users" element={<Users />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="features" element={<Features />} />
        <Route path="testmonials" element={<Testmonials />} />
      </Route>
    </Routes>
  )
}

export default Navigations