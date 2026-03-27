//root app component it loads the routing structure 
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

export default function App() { // entry component that loads the routing structure thats defined in AppRoutes.jsx
  return <AppRoutes />;
}