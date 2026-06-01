// components/ui/ThemeSwitcher/ThemeSwitcher.js
"use client";
import { useState } from "react";
import "./themeswitcher.scss";

const themes = [
	{ id: "warm", label: "Warm", color: "#7f5a83" },
	{ id: "clean", label: "Clean", color: "#1e3a5f" },
	{ id: "bold", label: "Bold", color: "#f97316" },
	{ id: "earth", label: "Earth", color: "#3d6b4f" },
	{ id: "minimal", label: "Minimal", color: "#111111" },
];

export default function ThemeSwitcher({ defaultTheme = "warm" }) {
	const [active, setActive] = useState(defaultTheme);

	function applyTheme(themeId) {
		document.documentElement.setAttribute("data-theme", themeId);
		setActive(themeId);
	}

	return (
		<div className="theme-switcher" aria-label="Choose a theme">
			<p className="theme-switcher__label label">Theme</p>
			<div className="theme-switcher__options" role="radiogroup">
				{themes.map((theme) => (
					<button
						key={theme.id}
						className={`theme-switcher__option ${active === theme.id ? "is-active" : ""}`}
						onClick={() => applyTheme(theme.id)}
						aria-pressed={active === theme.id}
						aria-label={`${theme.label} theme`}
						title={theme.label}
					>
						<span
							className="theme-switcher__swatch"
							style={{ background: theme.color }}
						/>
						<span className="theme-switcher__name">{theme.label}</span>
					</button>
				))}
			</div>
		</div>
	);
}
