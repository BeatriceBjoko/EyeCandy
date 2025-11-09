import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function useIntroFloat(objectRef, { direction = "up", distance = 5, duration = 2.8, floatAmplitude = 0.4, floatSpeed = 1.8, rotationSpeed = 0.4 } = {}) {
	const started = useRef(false);
	const introDone = useRef(false);
	const startTime = useRef(0);
	const floatStartTime = useRef(0);
	const startPos = useRef([0, 0, 0]);
	const targetPos = useRef([0, 0, 0]);

	useFrame((state, delta) => {
		const obj = objectRef.current;
		if (!obj) return;

		if (!started.current) {
			targetPos.current = [obj.position.x, obj.position.y, obj.position.z];
			const offsetX = distance * 0.2;
			const startX = targetPos.current[0] + offsetX;
			const startY = direction === "up" ? targetPos.current[1] - distance : targetPos.current[1] + distance;
			const startZ = targetPos.current[2] + distance;
			startPos.current = [startX, startY, startZ];
			obj.position.set(startX, startY, startZ);
			startTime.current = state.clock.getElapsedTime();
			started.current = true;
		}

		if (!introDone.current) {
			const elapsed = state.clock.getElapsedTime() - startTime.current;
			let t = elapsed / duration;
			if (t >= 1) {
				t = 1;
				introDone.current = true;
				floatStartTime.current = state.clock.getElapsedTime();
			}
			const easedT = easeOutCubic(t);
			const [sx, sy, sz] = startPos.current;
			const [tx, ty, tz] = targetPos.current;
			obj.position.x = sx + (tx - sx) * easedT;
			obj.position.y = sy + (ty - sy) * easedT;
			obj.position.z = sz + (tz - sz) * easedT;
		} else {
			obj.rotation.y += rotationSpeed * delta;
			const floatElapsed = state.clock.getElapsedTime() - floatStartTime.current;
			obj.position.y = targetPos.current[1] + floatAmplitude * Math.sin(floatElapsed * floatSpeed);
		}
	});
}
