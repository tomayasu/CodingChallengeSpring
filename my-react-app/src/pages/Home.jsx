import { Tabs } from "antd";
//import './Home.css';

const Home = () => {

	return (

		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
            <h1>
                Welcome to the website!!!
            </h1>
            <p>
                About this page: 
            </p>
            <img src="RecipeLogo.png" className="spinScaleAndMove"/>
		</div>
	);
};

export default Home;