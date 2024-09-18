import { useEffect } from "react";
import NavigationBar from "../components/NavigationBar/TopBar/NavigationBar ";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import NavigationLinks from "../components/NavigationBar/BottomBar/NavigationLinks";



const HomeLayout = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<NavigationBar />
			<NavigationLinks/>
			    <Outlet />
			<Footer />
		</>
	);
};

export default HomeLayout;