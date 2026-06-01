// components/footer/Footer.js
import Link from "next/link";
import Image from "next/image";
import "./footer.scss";

/* =========================
   FOOTER CONFIGURATION
   Edit this section per project
   ========================= */

const inclusion = {
	image: {
		src: "/diversity.webp",
		alt: "Inclusion illustration",
		width: 100,
		height: 100,
	},
	text: "Committed to inclusion and respect for all people across genders, races, ethnicities, and identities.",
};

const seoLine = null;
// Example:
// const seoLine = {
// 	text: "Virtual therapy for thoughtful adults in",
// 	linkText: "43 U.S. states",
// 	linkHref: "/where-we-serve",
// 	suffix: ". East Coast based. Grounded in care and clarity.",
// };

const partners = [];
// Example:
// const partners = {
// 	label: "Trusted partners & directories",
// 	items: [
// 		{ label: "Journey Clinical", href: "https://journeyclinical.com" },
// 		{ label: "Zencare", href: "https://zencare.co" },
// 	],
// };

const footerLinks = [
	{ label: "Privacy Policy", href: "/privacy-policy" },
	{ label: "Contact", href: "/contact" },
];

const copyright = {
	name: "Binswar LLC",
	creditText: "Site Credit",
	creditHref: "https://binswar.com",
};

/* =========================
   COMPONENT
   ========================= */

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="footer" role="contentinfo">
			{/* Content band */}
			<section
				className="footer__content block"
				aria-label="Footer information"
			>
				<div className="block__content container">
					{/* Inclusion statement */}
					{inclusion && (
						<div className="footer__inclusion" aria-label="Inclusion statement">
							{inclusion.image && (
								<div className="footer__inclusion-media">
									<Image
										src={inclusion.image.src}
										alt={inclusion.image.alt}
										width={inclusion.image.width}
										height={inclusion.image.height}
										className="footer__inclusion-img"
									/>
								</div>
							)}
							<p className="footer__inclusion-text">{inclusion.text}</p>
						</div>
					)}

					{/* SEO line */}
					{seoLine && (
						<p className="footer__seo-line">
							{seoLine.text}{" "}
							<Link href={seoLine.linkHref} className="footer__link">
								{seoLine.linkText}
							</Link>
							{seoLine.suffix}
						</p>
					)}

					{/* Utilities */}
					<div className="footer__utilities">
						{/* Partners */}
						{partners?.items?.length > 0 && (
							<div className="footer__col" aria-label={partners.label}>
								{partners.label && (
									<p className="footer__col-label">{partners.label}</p>
								)}
								<ul className="footer__partners" role="list">
									{partners.items.map((item) => (
										<li key={item.href}>
											<Link
												href={item.href}
												className="footer__link"
												target="_blank"
												rel="noopener noreferrer"
											>
												{item.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						)}

						{/* Footer links */}
						{footerLinks?.length > 0 && (
							<div className="footer__col" aria-label="Footer links">
								<ul className="footer__links" role="list">
									{footerLinks.map((item) => (
										<li key={item.href}>
											<Link href={item.href} className="footer__link">
												{item.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Bottom bar */}
			<div className="footer__bottombar" aria-label="Copyright and site credit">
				<div className="container">
					<p className="footer__copy">
						© {year} {copyright.name}. All rights reserved.{" "}
						{copyright.creditHref && (
							<Link
								href={copyright.creditHref}
								className="footer__link"
								target="_blank"
								rel="noopener noreferrer"
							>
								{copyright.creditText}
							</Link>
						)}
					</p>
				</div>
			</div>
		</footer>
	);
}
