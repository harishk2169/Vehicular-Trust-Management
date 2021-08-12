import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ethers } from "ethers";

import { MainContextProvider } from "./context";
import "./App.css";
import MainPage from "./pages/MainPage";
import VHome from "./pages/VHome";
import VChat from "./pages/VChat";

function App() {
	const removeCache = async () => {
		// Remove any vehicle data in localStorage for a new hardhat chain
		if (typeof window.ethereum === undefined) return;
		await window.ethereum.request({ method: "eth_requestAccounts" });
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const transactionCount = await signer.getTransactionCount();
		if (transactionCount <= 2) {
			if (localStorage.getItem("rsuVehicles")) {
				localStorage.removeItem("rsuVehicles");
			}
		}
	};
	useEffect(() => {
		removeCache();
	}, []);
	return (
		<MainContextProvider>
			<Router>
				<Switch>
					<Route exact path="/">
						<MainPage />
					</Route>
					<Route exact path="/v2v">
						<VHome />
					</Route>
					<Route exact path="/chat/:room/:username">
						<VChat />
					</Route>
				</Switch>
			</Router>
		</MainContextProvider>
	);
}

export default App;
