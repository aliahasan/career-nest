import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const App = () => {
  return (
    <div className="max-w-screen-2xl mx-auto min-h-screen flex flex-col">
      <Navbar></Navbar>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer>
      <Footer />
      </footer>
    </div>
  );
};

export default App;
