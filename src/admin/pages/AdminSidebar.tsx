import { useEffect, useState } from 'react';
import {
  PanelsTopLeft,
  ChartLine,
  Store,
  ShoppingCart,
  Wallet,
  TicketSlash,
  ReceiptText,
  MoveLeft,
  Bell,
  Flag,
  Settings,
  Eye
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);


  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  const mainMenuItems = [
    { icon: <PanelsTopLeft />, name: 'Overview', path: '/admin/overview' },
    { icon: <ChartLine />, name: 'Analytics', path: '/admin/analytics' },
    { icon: <Store />, name: 'Product', path: '/admin/products' },
    { icon: <ShoppingCart />, name: 'Sales', path: '/admin/sales' },
  ];

  const transactionMenuItems = [
    { icon: <Wallet />, name: 'Payment', path: '/admin/payment' },
    { icon: <TicketSlash />, name: 'Refunds', path: '/admin/refunds' },
    { icon: <ReceiptText />, name: 'Invoice', path: '/admin/invoice' },
    { icon: <MoveLeft />, name: 'Returns', path: '/admin/returns' },
  ];

  const generalMenuItems = [
    { icon: <Bell />, name: 'Notifications', path: '/admin/notifications' },
    { icon: <Flag />, name: 'Feedback', path: '/admin/feedback' },
    { icon: <Settings />, name: 'Setting', path: '/admin/settings' },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You would implement actual dark mode functionality here
  };

  return (
    <div className="w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-200 min-h-screen">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className="text-xl font-semibold">SalesSync</span>
        </div>
      </div>

      <div className="p-2 text-sm text-gray-500">Main Menu</div>
      <div className="py-1">
        {mainMenuItems.map((item) => (
          <Link key={item.name} to={item.path}>
            <div className={`flex items-center px-4 py-2 text-gray-700 ${location.pathname.startsWith(item.path) ? 'bg-green-100' : ''}`}>
              <div className="w-5 h-5 mr-3">
                {item.icon}
              </div>
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="p-2 mt-3 text-sm text-gray-500">Transaction</div>
      <div className="py-1">
        {transactionMenuItems.map((item) => (
          <Link key={item.name} to={item.path}>
            <div className={`flex items-center px-4 py-2 text-gray-700 ${location.pathname.startsWith(item.path) ? 'bg-green-100' : ''}`}>
              <div className="w-5 h-5 mr-3">
                {item.icon}
              </div>
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="p-2 mt-3 text-sm text-gray-500">General</div>
      <div className="py-1">
        {generalMenuItems.map((item) => (
          <Link key={item.name} to={item.path}>
            <div className={`flex items-center px-4 py-2 text-gray-700 ${location.pathname.startsWith(item.path) ? 'bg-green-100' : ''}`}>
              <div className="w-5 h-5 mr-3">
                {item.icon}
              </div>
              <span>{item.name}</span>
            </div>
          </Link>
        ))}

        <div className="flex items-center px-4 py-2 text-gray-700">
          <div className="w-5 h-5 mr-3">
            <Eye />
          </div>
          <span>Dark Mode</span>
          <div className="ml-auto">
            <button
              onClick={toggleTheme}
              className={`w-10 h-5 rounded-full transition-colors duration-200 ease-in-out ${theme === 'dark' ? 'bg-black' : 'bg-gray-200'} relative`}
            >
              <span
                className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${theme === 'dark' ? 'transform translate-x-5' : ''}`}
              ></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;