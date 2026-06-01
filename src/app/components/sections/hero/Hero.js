// components/sections/Hero/Hero.js
import Image from "next/image";
import Button from "../../ui/Button";
import "./hero.scss";

/* =========================
   HERO CONFIGURATION
   Edit this section per project
   ========================= */

const hero = {
	heading: "Your Heading Here",
	subheading:
		"A brief description of what you do and who you serve. Keep it clear and human.",
	cta: {
		text: "Get started",
		href: "/contact",
		variant: "primary",
	},
	image: {
		src: "/hero.jpg",
		alt: "Descriptive alt text",
		width: 400,
		height: 400,
	},
	caption: {
		name: "Your Name",
		title: "Your Title",
	},
};

/* =========================
   COMPONENT
   ========================= */

export default function Hero() {
	return (
		<section className="block blockHero">
			<div className="block__content container">
				{/* Left: copy */}
				<div className="hero__copy">
					<h1>{hero.heading}</h1>
					<p className="lead">{hero.subheading}</p>
					{hero.cta && (
						<Button
							text={hero.cta.text}
							href={hero.cta.href}
							variant={hero.cta.variant ?? "primary"}
							external={hero.cta.external ?? false}
							trackEvent={hero.cta.trackEvent}
						/>
					)}
				</div>

				{/* Right: image */}
				<div className="hero__media">
					<Image
						src={hero.image.src}
						alt={hero.image.alt}
						width={hero.image.width}
						height={hero.image.height}
						priority
						sizes="(max-width: 768px) 90vw, 480px"
						style={{ width: "100%", height: "auto" }}
					/>
					{hero.caption && (
						<div className="hero__caption">
							<p className="hero__caption-name">{hero.caption.name}</p>
							<p className="hero__caption-title">{hero.caption.title}</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
