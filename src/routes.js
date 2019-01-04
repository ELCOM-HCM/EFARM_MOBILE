import NotFoundPage from "./components/pages/NotFoundPage";
import Device from "./components/pages/DevicePage";
import Report from "./components/pages/ReportPage";
import Account from "./components/pages/AccountPage";
import Farm from "./components/pages/FarmPage";
import Profile from "./components/pages/ProfilePage";
import Login from "./components/pages/LoginPage";
import Dashboard from "./components/pages/DashboardPage";
import Form from "./components/examples/FormPage";
import Route from "./components/examples/DynamicRoutePage";
import FagAddDevice from './components/pages/FagAddDevice';
import FagAddAccount from './components/pages/FagAddAccount';
export default [
  {
    path: "/",
    component: Login
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/dashboard",
    component: Dashboard
  },
  {
    path: "/device",
    component: Device
  },
  {
    path: "/report",
    component: Report
  },
  {
    path: "/account",
    component: Account
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/farm",
    component: Farm
  },
  {
    path: "/add-device",
    component: FagAddDevice
  },
  {
    path: "/add-account",
    component: FagAddAccount
  },
  // example
  {
    path: "/example/form",
    component: Form
  },
  {
    path: "/example/route",
    component: Route
  },
  {
    path: "(.*)",
    component: NotFoundPage
  }
];
