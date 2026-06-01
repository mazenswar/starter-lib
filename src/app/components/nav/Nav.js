// components/nav/Nav.js
"use client";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";
import "./nav.scss";

/* =========================
  NAV CONFIGURATION
  Edit this section per project
   ========================= */

const logo = {
	src: "/logo.webp",
	alt: "Binswar",
	width: 140,
	height: 40,
};

const links = [
	{ label: "Services", href: "/services" },
	{ label: "About", href: "/about" },
	{ label: "Work", href: "/work" },
	{ label: "Contact", href: "/contact" },
];

const cta = {
	text: "Get a quote",
	href: "/contact",
	variant: "primary",
};

const homeHref = "/";

/* =========================
  COMPONENT
   ========================= */

export default function Nav() {
	const [openMobile, setOpenMobile] = useState(false);
	const [openDropdown, setOpenDropdown] = useState(null);
	const menuId = useId();
	const burgerRef = useRef(null);

	useEffect(() => {
		const cls = "nav-open";
		const root = document.documentElement;
		if (openMobile) root.classList.add(cls);
		else root.classList.remove(cls);
		return () => root.classList.remove(cls);
	}, [openMobile]);

	useEffect(() => {
		const handler = () => setOpenMobile(false);
		window.addEventListener("hashchange", handler);
		return () => window.removeEventListener("hashchange", handler);
	}, []);

	useEffect(() => {
		if (!openMobile) return;
		const onKey = (e) => {
			if (e.key === "Escape") {
				setOpenMobile(false);
				setOpenDropdown(null);
				requestAnimationFrame(() => burgerRef.current?.focus());
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [openMobile]);

	const handleLinkClick = () => {
		setOpenMobile(false);
		setOpenDropdown(null);
	};

	const toggleBurger = () => {
		setOpenDropdown(null);
		setOpenMobile((v) => !v);
	};

	return (
		<header className={`nav ${openMobile ? "is-open" : ""}`}>
			<div className="container nav__inner">
				<Link
					href={homeHref}
					className="nav__logo"
					aria-label={`${logo?.alt ?? "Home"} home`}
					onClick={handleLinkClick}
				>
					{logo ? (
						<Image
							src={logo.src}
							alt={logo.alt}
							width={logo.width ?? 140}
							height={logo.height ?? 40}
							priority
						/>
					) : (
						<span className="nav__logo-text">Logo</span>
					)}
				</Link>

				<button
					ref={burgerRef}
					className="nav__burger"
					aria-expanded={openMobile}
					aria-controls={menuId}
					aria-label={openMobile ? "Close menu" : "Open menu"}
					onClick={toggleBurger}
				>
					<span />
					<span />
					<span />
				</button>

				<nav id={menuId} className="nav__panel" aria-label="Primary">
					<ul className="nav__list" role="list">
						{links.map((item) => {
							const isOpen = openDropdown === item.label;
							return (
								<li
									key={item.label}
									className={`nav__item ${isOpen ? "has-open" : ""}`}
								>
									{item.items ? (
										<div className="nav__dropdownWrap">
											<button
												type="button"
												className="nav__toplink"
												aria-haspopup="menu"
												aria-expanded={isOpen}
												onClick={() =>
													setOpenDropdown((cur) =>
														cur === item.label ? null : item.label,
													)
												}
											>
												{item.label}
												<svg
													className="nav__caret"
													viewBox="0 0 20 20"
													aria-hidden="true"
													focusable="false"
												>
													<path
														d="M5 7l5 6 5-6"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
													/>
												</svg>
											</button>
											<div
												className={`nav__dropdown ${isOpen ? "is-open" : ""}`}
												role="menu"
											>
												{item.items.map((sub) => (
													<Link
														key={sub.href}
														href={sub.href}
														className="nav__dropdownLink"
														role="menuitem"
														onClick={handleLinkClick}
													>
														{sub.label}
													</Link>
												))}
											</div>
										</div>
									) : (
										<Link
											href={item.href}
											className="nav__toplink"
											onClick={handleLinkClick}
										>
											{item.label}
										</Link>
									)}
								</li>
							);
						})}
					</ul>

					{cta && (
						<div className="nav__cta">
							<Button
								text={cta.text}
								href={cta.href}
								variant={cta.variant ?? "primary"}
								external={cta.external ?? false}
								trackEvent={cta.trackEvent}
							/>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
}
