// components/sections/CardGrid/CardGrid.js
import Link from "next/link";
import Button from "../../ui/Button";
import "./cardgrid.scss";

/* =========================
   CARD GRID CONFIGURATION
   Edit this section per project
   ========================= */

// const cardGrid = {
// 	heading: "What We Can Help With",
// 	subheading:
// 		"We are here to offer care and perspective as you navigate your journey.",
// 	cta: {
// 		text: "See all services",
// 		href: "/services",
// 		variant: "secondary",
// 	},
// 	cards: [
// 		{
// 			title: "Service One",
// 			description:
// 				"A brief description of this service and how it helps your clients.",
// 			href: "/services/one",
// 			cta: "Learn more",
// 		},
// 		{
// 			title: "Service Two",
// 			description:
// 				"A brief description of this service and how it helps your clients.",
// 			href: "/services/two",
// 			cta: "Learn more",
// 		},
// 		{
// 			title: "Service Three",
// 			description:
// 				"A brief description of this service and how it helps your clients.",
// 			href: "/services/three",
// 			cta: "Learn more",
// 		},
// 	],
// };

/* =========================
   COMPONENT
   ========================= */

export default function CardGrid({ cardGridConfig }) {
	return (
		<section
			className="block blockTint card-grid"
			aria-labelledby="card-grid-heading"
		>
			<div className="block__content container">
				{/* Header */}
				<div className="card-grid__header">
					<h2 id="card-grid-heading">{cardGridConfig.heading}</h2>
					{cardGridConfig.subheading && (
						<p className="card-grid__sub">{cardGridConfig.subheading}</p>
					)}
				</div>

				{/* Cards */}
				<div className="card-grid__grid" role="list">
					{cardGridConfig.cards.map((card) => (
						<Link
							key={card.href}
							href={card.href}
							className="card"
							aria-label={card.title}
							role="listitem"
						>
							<div className="card__inner">
								<h3 className="card__title">{card.title}</h3>
								<p className="card__description">{card.description}</p>
								{card.cta && <span className="card__cta">{card.cta} →</span>}
							</div>
						</Link>
					))}
				</div>

				{/* Footer CTA */}
				{cardGridConfig.cta && (
					<div className="card-grid__footer">
						<Button
							text={cardGridConfig.cta.text}
							href={cardGridConfig.cta.href}
							variant={cardGridConfig.cta.variant ?? "secondary"}
						/>
					</div>
				)}
			</div>
		</section>
	);
}
