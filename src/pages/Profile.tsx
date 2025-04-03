import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Avatar, Grid, Button, Tabs, Tab } from '@mui/material';
import { User, Settings, ShoppingBag, CreditCard, Heart } from 'lucide-react';
import Axios from '../utils/axios';

// This would be replaced with actual user data from your API/state management
const fetchUserProfile = async () => {
    // Mock data - replace with actual API call

    const user = await Axios.get('/users/profile');
    return user?.data
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`profile-tabpanel-${index}`}
            aria-labelledby={`profile-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const Profile = () => {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const userData = await fetchUserProfile();
                setUser(userData);
            } catch (error) {
                console.error('Failed to load profile:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadProfile();
    }, []);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    if (isLoading) {
        return <Box sx={{ p: 4, textAlign: 'center' }}>Loading profile...</Box>;
    }

    if (!user) {
        return <Box sx={{ p: 4, textAlign: 'center' }}>User profile not found.</Box>;
    }

    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 2, py: 4 }}>
            <Paper elevation={2} sx={{ mb: 4, overflow: 'hidden' }}>
                {/* Profile Header */}
                <Box sx={{ p: 4, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Avatar
                        src={user.avatar}
                        alt={user.name}
                        sx={{ width: 100, height: 100, border: '4px solid white' }}
                    />
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>{user.email}</Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>Member since {user.joinDate}</Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        sx={{ ml: 'auto' }}
                    >
                        Edit Profile
                    </Button>
                </Box>

                {/* Tabs Navigation */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        aria-label="profile tabs"
                        sx={{ px: 2 }}
                    >
                        <Tab icon={<User size={16} />} label="Personal Info" />
                        {/* <Tab icon={<ShoppingBag size={16} />} label="Orders" /> */}
                        <Tab icon={<CreditCard size={16} />} label="Payment Methods" />
                        <Tab icon={<Heart size={16} />} label="Wishlist" />
                        <Tab icon={<Settings size={16} />} label="Settings" />
                    </Tabs>
                </Box>

                {/* Tab Content */}
                <TabPanel value={activeTab} index={0}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ mb: 2 }}>Contact Information</Typography>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">Email Address</Typography>
                                <Typography variant="body1">{user.email}</Typography>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">Phone Number</Typography>
                                <Typography variant="body1">{user.phone}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ mb: 2 }}>Shipping Address</Typography>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">Primary Address</Typography>
                                <Typography variant="body1">{user.address}</Typography>
                            </Box>
                            <Button variant="text" size="small">Add New Address</Button>
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* <TabPanel value={activeTab} index={1}>
                    <Typography variant="h6">Order History</Typography>
                    <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                        You haven't placed any orders yet.
                    </Typography>
                    <Button variant="contained" sx={{ mt: 2 }}>
                        Start Shopping
                    </Button>
                </TabPanel> */}

                <TabPanel value={activeTab} index={1}>
                    <Typography variant="h6">Payment Methods</Typography>
                    <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                        No payment methods saved yet.
                    </Typography>
                    <Button variant="contained" sx={{ mt: 2 }}>
                        Add Payment Method
                    </Button>
                </TabPanel>

                <TabPanel value={activeTab} index={2}>
                    <Typography variant="h6">Your Wishlist</Typography>
                    <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
                        Your wishlist is empty.
                    </Typography>
                    <Button variant="contained" sx={{ mt: 2 }}>
                        Explore Products
                    </Button>
                </TabPanel>

                <TabPanel value={activeTab} index={3}>
                    <Typography variant="h6">Account Settings</Typography>
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Password</Typography>
                        <Button variant="outlined" size="small">Change Password</Button>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Notifications</Typography>
                        <Button variant="outlined" size="small">Manage Notifications</Button>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle1" sx={{ color: 'error.main', fontWeight: 'bold', mb: 1 }}>Danger Zone</Typography>
                        <Button variant="outlined" color="error" size="small">Delete Account</Button>
                    </Box>
                </TabPanel>
            </Paper>
        </Box>
    );
};

export default Profile;