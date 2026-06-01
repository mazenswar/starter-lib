// components/ui/ChipNav/ChipNav.js
"use client";
import { useEffect } from "react";
import "./chipnav.scss";

/* =========================
   CHIP NAV CONFIGURATION
   Edit this section per project
   ========================= */

const chipNavConfig = {
	label: "Jump to section",
	chips: [
		{ id: "section-one", label: "Section One" },
		{ id: "section-two", label: "Section Two" },
		{ id: "section-three", label: "Section Three" },
	],
};

/* =========================
   COMPONENT
   ========================= */

export default function ChipNav() {
	useEffect(() => {
		const nav = document.querySelector(".chip-nav");
		if (!nav) return;

		const getOffset = () => {
			const header = document.querySelector(".nav");
			return header ? header.getBoundingClientRect().height + 16 : 80;
		};

		const onClick = (e) => {
			const a = e.target.closest("a[href^='#']");
			if (!a) return;

			const id = a.getAttribute("href").slice(1);
			const el = document.getElementById(id);
			if (!el) return;

			e.preventDefault();
			const top =
				window.pageYOffset + el.getBoundingClientRect().top - getOffset();

			window.scrollTo({ top, behavior: "smooth" });
		};

		nav.addEventListener("click", onClick);
		return () => nav.removeEventListener("click", onClick);
	}, []);

	return (
		<nav className="chip-nav" aria-label={chipNavConfig.label}>
			<div className="container">
				<ul className="chip-nav__list" role="list">
					{chipNavConfig.chips.map((chip) => (
						<li key={chip.id}>
							<a href={`#${chip.id}`} className="chip-nav__chip">
								{chip.label}
							</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}
