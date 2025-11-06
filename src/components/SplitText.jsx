import React, { useRef, useEffect } from "react";
import { textIntro } from "../animations/textIntro";

export default function SplitText({ text, className = "" }) {
	const ref = useRef(null);

	useEffect(() => {
		textIntro(ref.current);
	}, []);

	return (
		<div ref={ref} className={`split-text ${className}`}>
			{text.split("").map((char, i) => (
				<span key={i} className="char">
					{char}
				</span>
			))}
		</div>
	);
}
