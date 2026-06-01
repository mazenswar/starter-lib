// components/sections/FAQ/FAQ.js
"use client";
import { useState, useMemo, useEffect } from "react";
import "./faq.scss";

/* =========================
   FAQ CONFIGURATION
   Edit this section per project
   ========================= */

const faqConfig = {
	heading: "Questions people often ask",
	subheading:
		"Clear answers about working with us. If you do not see your question here, get in touch.",
	contact: {
		text: "Get in touch",
		href: "/contact",
	},
	searchable: true,
	showToc: true,
	groups: [
		{
			id: "getting-started",
			title: "Getting Started",
			items: [
				{
					id: "first-question",
					q: "What is your first question?",
					a: "Your answer goes here. Keep it clear and human.",
					tags: ["getting-started"],
				},
				{
					id: "second-question",
					q: "What is your second question?",
					a: "Your answer goes here.",
					tags: ["getting-started"],
				},
			],
		},
		{
			id: "fees",
			title: "Fees & Insurance",
			items: [
				{
					id: "session-cost",
					q: "How much do sessions cost?",
					a: "Your pricing information goes here.",
					tags: ["fees"],
				},
			],
		},
	],
};

/* =========================
   HELPERS
   ========================= */

function useDebounced(value, ms = 200) {
	const [v, setV] = useState(value);
	useEffect(() => {
		const t = setTimeout(() => setV(value), ms);
		return () => clearTimeout(t);
	}, [value, ms]);
	return v;
}

/* =========================
   COMPONENT
   ========================= */

export default function FAQ() {
	const [query, setQuery] = useState("");
	const debounced = useDebounced(query, 200);

	const filteredGroups = useMemo(() => {
		const q = debounced.trim().toLowerCase();
		if (!q) return faqConfig.groups;
		return faqConfig.groups
			.map((g) => {
				const items = g.items.filter((item) => {
					const hay =
						`${item.q} ${item.a} ${(item.tags || []).join(" ")}`.toLowerCase();
					return hay.includes(q);
				});
				return items.length ? { ...g, items } : null;
			})
			.filter(Boolean);
	}, [debounced]);

	// Open item if page loads with a hash
	useEffect(() => {
		if (typeof window === "undefined") return;
		const hash = window.location.hash.replace("#", "");
		if (!hash) return;
		const el = document.getElementById(hash);
		if (el?.tagName === "DETAILS") {
			el.setAttribute("open", "");
			setTimeout(
				() => el.scrollIntoView({ behavior: "smooth", block: "start" }),
				60,
			);
		}
	}, []);

	return (
		<section className="block faq" aria-labelledby="faq-heading">
			<div className="block__content container">
				{/* Header */}
				<div className="faq__header">
					<h2 id="faq-heading">{faqConfig.heading}</h2>
					{faqConfig.subheading && (
						<p className="faq__sub">
							{faqConfig.subheading}{" "}
							{faqConfig.contact && (
								<a href={faqConfig.contact.href} className="link">
									{faqConfig.contact.text}
								</a>
							)}
						</p>
					)}

					{/* Search */}
					{faqConfig.searchable && (
						<div className="faq__search">
							<label htmlFor="faq-search" className="sr-only">
								Search FAQs
							</label>
							<input
								id="faq-search"
								type="search"
								placeholder="Search questions..."
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								aria-label="Search frequently asked questions"
							/>
						</div>
					)}
				</div>

				{/* Layout */}
				<div className={`faq__layout ${faqConfig.showToc ? "has-toc" : ""}`}>
					{/* TOC */}
					{faqConfig.showToc && (
						<nav className="faq__toc" aria-label="FAQ sections">
							<p className="faq__toc-title">On this page</p>
							<ul role="list">
								{faqConfig.groups.map((g) => (
									<li key={g.id}>
										<a href={`#${g.id}`} className="faq__toc-link">
											{g.title}
										</a>
									</li>
								))}
							</ul>
						</nav>
					)}

					{/* Content */}
					<div className="faq__content">
						{filteredGroups.length === 0 ? (
							<div className="faq__empty">
								<p>
									No results for <strong>{debounced}</strong>. Try a different
									search term.
								</p>
								<button className="btnGhost" onClick={() => setQuery("")}>
									Clear search
								</button>
							</div>
						) : (
							filteredGroups.map((group) => (
								<section
									key={group.id}
									id={group.id}
									className="faq__group"
									aria-labelledby={`${group.id}-title`}
								>
									<h3 id={`${group.id}-title`} className="faq__group-title">
										{group.title}
									</h3>

									<div className="faq__accordion">
										{group.items.map((item) => (
											<details key={item.id} id={item.id} className="faq__item">
												<summary className="faq__question">
													<span>{item.q}</span>
													<span className="faq__icon" aria-hidden="true" />
												</summary>
												<div
													className="faq__answer"
													dangerouslySetInnerHTML={{ __html: item.a }}
												/>
											</details>
										))}
									</div>
								</section>
							))
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
