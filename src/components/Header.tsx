import { Package, Search, ShoppingCart, User } from 'lucide-react';
import SearchBar from './SearchBar';
import Logo from "../assets/Stinger.png"
import { Link, useNavigate } from 'react-router-dom';
import Badge from "@mui/material/Badge";
import useCartStore from '../store/useCartStore';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';

const Header = () => {
    const cartCount = useCartStore(state => state.cartCount);
    const settings = ['Profile', 'Logout'];
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const navigate = useNavigate()

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
        }
    }

    return (
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
            <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
              {/* Logo - smaller on mobile */}
              <div className="bg-black h-12 w-24 sm:h-16 sm:w-32 md:h-20 md:w-40 flex-shrink-0">
                <Link to="/">
                  <img src={Logo} alt="Visa" className="h-12 w-24 sm:h-16 sm:w-32 md:h-24 md:w-40" />
                </Link>
              </div>
      
              {/* Search Bar - hidden on smallest screens, visible from small screens up */}
              <div className="hidden sm:block flex-grow max-w-md md:max-w-xl">
                <SearchBar />
              </div>
      
              {/* Icons - more compact on mobile */}
              <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
                {/* Mobile search icon - only visible on smallest screens */}
                {/* <button className="sm:hidden p-1 hover:bg-gray-100 rounded-full">
                  <Search className="text-gray-600" size={20} />
                </button> */}
                
                <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-full">
                  <Link to='/cart'>
                    <Badge
                      badgeContent={cartCount}
                      color="warning"
                      id="cart-icon"
                      aria-haspopup="true"
                    >
                      <ShoppingCart className="text-gray-600" size={20} sm={22} md={24} />
                    </Badge>
                  </Link>
                </button>
                
                <button className="p-1 sm:p-2 hover:bg-gray-100 rounded-full">
                  <Link to='/order'>
                    <Package className="text-gray-600" size={20} sm={22} md={24} />
                  </Link>
                </button>
      
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
                      {settings.map((setting) => (
                        <MenuItem onClickCapture={() => handleMenu(setting)} key={setting} onClick={handleCloseUserMenu}>
                          <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
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