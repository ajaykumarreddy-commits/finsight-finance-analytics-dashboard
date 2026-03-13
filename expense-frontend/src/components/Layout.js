import { Link } from "react-router-dom";
import { FaChartPie, FaWallet } from "react-icons/fa";

function Layout({ children }) {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (

    <div className="flex">

      {/* Sidebar */}

      <div className="w-64 bg-gray-900 text-white min-h-screen p-5">

        <h2 className="text-2xl font-bold mb-10">
          Expense Tracker
        </h2>

        <nav className="flex flex-col gap-4">

         <Link to="/" className="flex items-center gap-2 hover:text-blue-400">
         <FaWallet/>Dashboard
         </Link>
         <Link to="/analytics" className="flex items-center gap-2 hover:text-blue-400">
         <FaChartPie/>Analytics</Link>

          <button
            onClick={logout}
            className="bg-red-500 mt-10 p-2 rounded"
          >
            Logout
          </button>

        </nav>

      </div>

      {/* Page Content */}

      <div className="flex-1 bg-gray-100 p-10">

        {children}

      </div>

    </div>

  );

}

export default Layout;