import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import useIntroFloat from "../../animations/useIntroFloat";

export default function BottleModel(props) {
	const ref = useRef();
	const { scene } = useGLTF("/models/bottle-mr.glb");

	useIntroFloat(ref, {
		direction: "up",
		distance: 4,
		duration: 3.2,
		floatAmplitude: 0.3,
		floatSpeed: 1.2,
		rotationSpeed: 0.2,
	});

	return <primitive ref={ref} object={scene} {...props} scale={0.05} position={[-3.9, -1, 0]} rotation={[0.02, Math.PI / 10, -0.32]} />;
}

useGLTF.preload("/models/bottle-mr.glb");
