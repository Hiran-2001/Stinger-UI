import { Moon, Package, Search, SettingsIcon, ShoppingCart, Sun, User } from 'lucide-react';
import SearchBar from './SearchBar';
import Logo from "../assets/Stinger.png"
import { Link, useNavigate } from 'react-router-dom';
import Badge from "@mui/material/Badge";
import useCartStore from '../store/useCartStore';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const Header = () => {
  const cartCount = useCartStore(state => state.cartCount);
  const menuItems = [
    { label: 'Profile', path: '/profile', icon: <User size={16} /> },
    { label: 'Settings', path: '/settings', icon: <SettingsIcon size={16} /> },
    { label: 'Logout', action: 'logout' }
  ];
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate()
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleMenu = (action: any) => {
    if (action === "Logout") {
      localStorage.removeItem("token");
      navigate('/login')
    } else if (action.path) {
      navigate(action.path);
    }
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
          <div className="bg-black h-12 w-24 sm:h-16 sm:w-32 md:h-20 md:w-40 flex-shrink-0">
            <Link to="/">
              <img src={Logo} alt="Visa" className="h-12 w-24 sm:h-16 sm:w-32 md:h-24 md:w-40" />
            </Link>
          </div>

          <div className="hidden sm:block flex-grow max-w-md md:max-w-xl">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="text-gray-600 dark:text-gray-300" size={20} /> : <Sun className="text-gray-600 dark:text-gray-300" size={20} />}
            </button>

            <Link to='/cart'>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <Badge
                  badgeContent={cartCount}
                  color="warning"
                  id="cart-icon"
                  aria-haspopup="true"
                >
                  <ShoppingCart className="text-gray-600 dark:text-gray-300" size={20} />
                </Badge>
              </button>
            </Link>

            <Link to='/order'>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <Package className="text-gray-600 dark:text-gray-300" size={20} />
              </button>
            </Link>

            <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-full">
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Hiran Raj"
                      src="/static/images/avatar/2.jpg"
                      sx={{ width: { xs: 28, sm: 32, md: 40 }, height: { xs: 28, sm: 32, md: 40 } }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {menuItems.map((setting, _i) => (
                    <MenuItem onClickCapture={() => handleMenu(setting)} key={_i} onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: 'center' }}>{setting.label}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </button>
          </div>
        </div>

        {/* Full-width search bar for mobile - only visible on smallest screens */}
        <div className="sm:hidden mt-2">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;