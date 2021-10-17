import "./Header.css";
import { BiMoon } from "react-icons/bi";
import { BsMoon } from "react-icons/bs";

import { useContext } from "react";
import DarkContext from "../UI/dark-context";

const Header = () => {
	const ctx = useContext(DarkContext);

	return (
		<div className="title">
			<h3>Where in the world?</h3>
			<div onClick={ctx.onSwitchMode}>
				{ctx.darkMode === "dark" && <BsMoon className="moon" />}
				{ctx.darkMode === "light" && <BiMoon className="moon" />}
				Dark Mode
			</div>
		</div>
	);
};

export default Header;
