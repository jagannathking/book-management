import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import NavRoutes from "./routes/NavRoutes";


const App = () => {
  return (
    <>
      {/* Nav bar */}
      <Navbar />

      {/* NavRoutes */}
      <NavRoutes />

      {/* Footer */}
    </>
  );
};

export default App;
