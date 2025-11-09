import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

const temp = new THREE.Object3D();
const rnd = (min, max) => Math.random() * (max - min) + min;

export default function Bubbles({ count = 90, minSize = 0.02, maxSize = 0.08, speed = 0.012, area = 7 }) {
	const meshRef = useRef();

	// Per-instance state in eigen arrays
	const px = useRef(new Float32Array(count));
	const py = useRef(new Float32Array(count));
	const pz = useRef(new Float32Array(count));
	const baseScale = useRef(new Float32Array(count));
	const curScale = useRef(new Float32Array(count));
	const velY = useRef(new Float32Array(count));
	const driftAX = useRef(new Float32Array(count));
	const driftAZ = useRef(new Float32Array(count));
	const phaseX = useRef(new Float32Array(count));
	const phaseZ = useRef(new Float32Array(count));
	const ready = useRef(false);

	// Eén unit-sphere; we schalen per instance
	const geometry = new THREE.SphereGeometry(1, 12, 12);
	const material = new THREE.MeshStandardMaterial({
		color: new THREE.Color("#ffffff"),
		transparent: true,
		opacity: 0.2,
		roughness: 0.3,
		metalness: 0.05,
		emissive: new THREE.Color("#fff2e0"),
		emissiveIntensity: 0.12,
	});

	// initialise direct gespreid over heel volume
	useEffect(() => {
		const mesh = meshRef.current;
		if (!mesh) return;

		for (let i = 0; i < count; i++) {
			px.current[i] = rnd(-area, area);
			py.current[i] = rnd(-area, area);
			pz.current[i] = rnd(-area, area);

			const s = rnd(minSize, maxSize);
			baseScale.current[i] = s;
			curScale.current[i] = rnd(s * 0.6, s);

			velY.current[i] = rnd(speed * 0.7, speed * 1.5);
			driftAX.current[i] = rnd(0.0008, 0.003);
			driftAZ.current[i] = rnd(0.0006, 0.0025);
			phaseX.current[i] = rnd(0, Math.PI * 2);
			phaseZ.current[i] = rnd(0, Math.PI * 2);

			temp.position.set(px.current[i], py.current[i], pz.current[i]);
			temp.scale.setScalar(curScale.current[i]);
			temp.updateMatrix();
			mesh.setMatrixAt(i, temp.matrix);
		}
		mesh.instanceMatrix.needsUpdate = true;
		ready.current = true;
	}, [count, area, minSize, maxSize, speed]);

	useFrame(({ clock }) => {
		const mesh = meshRef.current;
		if (!mesh || !ready.current) return;

		const t = clock.getElapsedTime();

		for (let i = 0; i < count; i++) {
			// update posities in onze arrays
			py.current[i] += velY.current[i];
			px.current[i] += Math.sin(t * 1.2 + phaseX.current[i]) * driftAX.current[i];
			pz.current[i] += Math.cos(t * 0.9 + phaseZ.current[i]) * driftAZ.current[i];

			if (py.current[i] > area * 0.85) {
				curScale.current[i] = Math.max(curScale.current[i] * 0.96, baseScale.current[i] * 0.25);
			} else {
				curScale.current[i] = THREE.MathUtils.lerp(curScale.current[i], baseScale.current[i], 0.06);
			}

			// reset boven
			if (py.current[i] > area) {
				py.current[i] = -area;
				px.current[i] = rnd(-area, area);
				pz.current[i] = rnd(-area, area);

				curScale.current[i] = baseScale.current[i] * 0.2;
				velY.current[i] = rnd(speed * 0.7, speed * 1.5);
				driftAX.current[i] = rnd(0.0008, 0.003);
				driftAZ.current[i] = rnd(0.0006, 0.0025);
				phaseX.current[i] = rnd(0, Math.PI * 2);
				phaseZ.current[i] = rnd(0, Math.PI * 2);
			}

			temp.position.set(px.current[i], py.current[i], pz.current[i]);
			temp.scale.setScalar(curScale.current[i]);
			temp.updateMatrix();
			mesh.setMatrixAt(i, temp.matrix);
		}

		mesh.instanceMatrix.needsUpdate = true;
	});

	return <instancedMesh ref={meshRef} args={[geometry, material, count]} frustumCulled={false} />;
}
