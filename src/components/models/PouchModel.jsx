import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import useIntroFloat from "../../animations/useIntroFloat";

export default function PouchModel(props) {
	const ref = useRef();
	const { scene } = useGLTF("/models/pouch.glb");

	useIntroFloat(ref, {
		direction: "down",
		distance: 4,
		duration: 3.2,
		floatAmplitude: 0.35,
		floatSpeed: 1.4,
		rotationSpeed: 0.25,
	});

	return <primitive ref={ref} object={scene} {...props} scale={0.14} position={[3.9, -0.09, 0]} rotation={[0.03, -Math.PI / 10, 0.36]} />;
}

useGLTF.preload("/models/pouch.glb");
