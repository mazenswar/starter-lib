// components/sections/CTABanner/CTABanner.js
import Button from "../../ui/Button";
import "./ctabanner.scss";

/* =========================
   CTA BANNER CONFIGURATION
   Edit this section per project
   ========================= */

const ctaBannerConfig = {
	heading: "Ready to get started?",
	subheading:
		"Let us build something great together. Reach out today and we will get back to you within one business day.",
	variant: "brand", // "brand" | "dark" | "light"
	cta: {
		text: "Get in touch",
		href: "/contact",
		variant: "secondary",
	},
	secondaryCta: null,
	// Optional second button example:
	// secondaryCta: {
	// 	text: "Learn more",
	// 	href: "/services",
	// 	variant: "ghost",
	// },
};

/* =========================
   COMPONENT
   ========================= */

export default function CTABanner() {
	return (
		<section
			className={`block cta-banner cta-banner--${ctaBannerConfig.variant}`}
			aria-labelledby="cta-banner-heading"
		>
			<div className="block__content container">
				<div className="cta-banner__inner">
					<div className="cta-banner__copy">
						<h2 id="cta-banner-heading">{ctaBannerConfig.heading}</h2>
						{ctaBannerConfig.subheading && (
							<p className="cta-banner__sub">{ctaBannerConfig.subheading}</p>
						)}
					</div>
					<div className="cta-banner__actions">
						<Button
							text={ctaBannerConfig.cta.text}
							href={ctaBannerConfig.cta.href}
							variant={ctaBannerConfig.cta.variant ?? "primary"}
							external={ctaBannerConfig.cta.external ?? false}
							trackEvent={ctaBannerConfig.cta.trackEvent}
						/>
						{ctaBannerConfig.secondaryCta && (
							<Button
								text={ctaBannerConfig.secondaryCta.text}
								href={ctaBannerConfig.secondaryCta.href}
								variant={ctaBannerConfig.secondaryCta.variant ?? "ghost"}
							/>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
