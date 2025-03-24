import { Package, ShoppingCart, User } from 'lucide-react';
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
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-8">
                    <div className="bg-black h-20 w-40">
                        <Link to="/">
                            <img src={Logo} alt="Visa" className="h-24 w-40" />
                        </Link>

                    </div>
                    <SearchBar />
                    {/* Icons */}
                    <div className="flex items-center space-x-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Link to='/cart'>
                                <Badge
                                    badgeContent={cartCount}
                                    color="warning"
                                    id="cart-icon"
                                    aria-haspopup="true"
                                >

                                    <ShoppingCart className="text-gray-600" size={24} />
                                </Badge>
                            </Link>

                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Link to='/order'>
                                {/* <Badge
                                    badgeContent={cartCount}
                                    color="warning"
                                    id="cart-icon"
                                    aria-haspopup="true"
                                > */}

                                <Package className="text-gray-600" size={24} />
                                {/* </Badge> */}
                            </Link>

                        </button>

                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Hiran Raj" src="/static/images/avatar/2.jpg" />
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
            </div>
        </header>
    );
};

export default Header;