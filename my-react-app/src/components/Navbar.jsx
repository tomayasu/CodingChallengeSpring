import { Menu, Divider } from "antd";
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HomeOutlined, MessageOutlined, StarOutlined, UserOutlined, FormOutlined, UnorderedListOutlined } from '@ant-design/icons';


const menuItems = [
    { key: '1', label: 'Home', path: '/', icon: <HomeOutlined /> },
    { key: '2', label: 'Post', path: '/Post', icon: <UnorderedListOutlined /> },
    { key: '3', label: 'Message', path: '/Message', icon: <MessageOutlined /> },
    { key: '4', label: 'Recipes Posts', path: '/RecipePost', icon: <UnorderedListOutlined /> },
    { key: '5', label: 'Create Recipes Post', path: '/RecipeCreate', icon: <FormOutlined /> },
    { key: '6', label: 'Favorite / Edit recipe', path: '/Favorite', icon: <StarOutlined /> },
    { key: '7', label: 'Profile', path: '/', icon: <UserOutlined /> },
    {/*{ key: '8', label: 'Nutrious Analysis', path: '/Nutrious'},*/}
];

const Navbar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const currentKey = menuItems.find(item => item.path === location.pathname)?.key || '1';
    const [selectedKey, setSelectedKey] = useState(currentKey);

    const handleLogoClick = () => {
        setSelectedKey('1'); // '1' is the key for the 'Home' menu item
        navigate('/');
    };

    const handleMenuClick = e => {
        setSelectedKey(e.key);
    };

    const theme = 'light'; // replace this with your actual theme state or prop

    return (
        <div style={{ position: 'sticky', top: 0, display: 'flex', alignItems: 'center', height: '50px', width: '100%', zIndex: 100}}>
            <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                
                {theme === 'dark' &&
                    <img src="DarkRecipeLogo.png" alt="Logo" style={{ height: '46px', marginTop: '4px' }}/>
                }

                {theme === 'light' &&
                    <img src="RecipeLogo.png" alt="Logo" style={{ height: '46px', marginTop: '4px' }}/>
                }
            </div>
            {theme === 'dark' && 
                <div style={{ backgroundColor: '#001529', width: '100%', height: '46px' }}></div>
            }
            {theme === 'light' &&
                <div style={{width: '100%', height: '46px', backgroundColor: 'white'}}>
                    <Divider type="horizontal" style={{marginTop: '45px'}} />
                </div>
            }
            
            <div style={{ marginLeft: 'auto' }}>
                <Menu
                    theme={theme}
                    mode="horizontal"
                    selectedKeys={[selectedKey]}
                    onClick={handleMenuClick}
                >
                    {menuItems.map(item => (
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.path}>{item.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
        </div>
    );
};

export default Navbar;