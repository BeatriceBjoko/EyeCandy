import gsap from "gsap";

export function textIntro(target) {
	if (!target) return;
	const chars = target.querySelectorAll(".char");

	gsap.fromTo(
		chars,
		{ y: 80, opacity: 0, rotate: 10 },
		{
			y: 0,
			opacity: 1,
			rotate: 0,
			stagger: 0.05,
			ease: "power3.out",
			duration: 1.3,
		}
	);
}
