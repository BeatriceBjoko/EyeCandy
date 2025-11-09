import "./App.css";
import SplitText from "./components/SplitText";
import HeroCanvas from "./components/HeroCanvas";
import { useEffect, useState } from "react";

export default function App() {
	const [showJuice, setShowJuice] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowJuice(true);
		}, 880);

		return () => clearTimeout(timeout);
	}, []);

	return (
		<div className="app">
			<SplitText text="Mellow" className="mellow" />
			{showJuice && <SplitText text="Juice" className="juice" />}
			<HeroCanvas />
		</div>
	);
}
