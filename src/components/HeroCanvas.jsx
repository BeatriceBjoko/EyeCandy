import { Canvas } from "@react-three/fiber";
import BottleModel from "./models/BottleModel";
import PouchModel from "./models/PouchModel";
import Bubbles from "../animations/Bubbles";

export default function HeroCanvas() {
	return (
		<div className="hero-canvas" style={{ position: "relative" }}>
			<Canvas
				camera={{ position: [0, 0, 9], fov: 45 }}
				style={{
					width: "100%",
					height: "100vh",
					position: "absolute",
					inset: 0,
				}}
			>
				<ambientLight intensity={0.6} />
				<directionalLight position={[2, 3, 2]} intensity={1.2} />

				<BottleModel />
				<PouchModel />
				<Bubbles />
			</Canvas>
		</div>
	);
}
