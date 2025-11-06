import "./App.css";
import SmoothScroll from "./components/SmoothScroll";
import SplitText from "./components/SplitText";

export default function App() {
	return (
		<SmoothScroll>
			<div className="app">
				<SplitText text="Mellow" className="mellow" />
				<SplitText text="Juice" className="juice" />
			</div>
		</SmoothScroll>
	);
}
