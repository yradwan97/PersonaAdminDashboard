import { configureStore } from '@reduxjs/toolkit';

// general
import sidebarSlice from './sidebar/sidebarSlice';

// pages
import authSlice from "./auth/authSlice";

//header
import homeHeaderSlice from "./settings/home/homeHeaderSlice";
import homeOfferSlice from "./settings/home/homeOfferSlice";
import homeAboutSlice from "./settings/home/homeAboutSlice";
import homeRegisterSlice from "./settings/home/homeRegisterSlice";
import globalConfigSlice from "./settings/global/globalConfigSlice";
import globalDiscoverSlice from "./settings/global/globalDiscoverSlice";
import blogsSlice from "./features/featuresSlice";
import usersSlice from "./users/usersSlice";
import alertsSlice from "./alerts/alertsSlice";
import featuresSlice from "./features/featuresSlice";
import testmonialsSlice from "./testmonials/testmonialsSlice";

export default configureStore({
  reducer: {
    sidebar: sidebarSlice,
    auth: authSlice,
    homeHeader: homeHeaderSlice,
    homeOffer: homeOfferSlice,
    homeAbout: homeAboutSlice,
    homeRegister: homeRegisterSlice,
    globalConfig: globalConfigSlice,
    globalDiscover: globalDiscoverSlice,
    blogs: blogsSlice,
    alerts: alertsSlice,
    users: usersSlice,
    features: featuresSlice,
    testmonials: testmonialsSlice
  },
});