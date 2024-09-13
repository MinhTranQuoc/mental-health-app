import { useEffect } from "react";
import NavigationBar from "../components/NavigationBar/TopBar/NavigationBar ";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";



const HomeLayout = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<NavigationBar />
			    <Outlet />
			<Footer />
		</>
	);
};

export default HomeLayout;