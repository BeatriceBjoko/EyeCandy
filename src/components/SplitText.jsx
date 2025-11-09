import { useRef, useEffect } from "react";
import { textIntro } from "../animations/textIntro";

export default function SplitText({ text, className = "", trigger = true }) {
	const ref = useRef(null);

	useEffect(() => {
		if (trigger && ref.current) {
			textIntro(ref.current, className);
		}
	}, [trigger]);

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
