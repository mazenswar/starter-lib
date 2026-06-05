// components/sections/BookingCTA/BookingCTA.js
import Button from "../../ui/Button";
import "./bookingcta.scss";

/* =========================
   BOOKING CTA CONFIGURATION
   Edit this section per project
   ========================= */

const bookingConfig = {
	heading: "Ready to take the first step?",
	subheading:
		"Reaching out is often the hardest part. We offer a free 15 minute consultation so you can get a sense of how we work and whether it feels like a good fit. No commitment required.",
	steps: [
		{
			number: "01",
			text: "Click the button below to access our scheduling portal",
		},
		{
			number: "02",
			text: "Choose a time that works for you",
		},
		{
			number: "03",
			text: "We will confirm your consultation and send you everything you need",
		},
	],
	cta: {
		text: "Schedule a free consultation",
		href: "https://your-ehr-booking-link.com",
		variant: "primary",
		external: true,
		trackEvent: null,
	},
	note: "By clicking the button above you will be taken to our secure scheduling portal.",
};

/* =========================
   COMPONENT
   ========================= */

export default function BookingCTA() {
	return (
		<section
			className="block blockTint booking-cta"
			aria-labelledby="booking-heading"
		>
			<div className="block__content container">
				<div className="booking-cta__layout">
					{/* Left: heading and steps */}
					<div className="booking-cta__intro">
						<h2 id="booking-heading">{bookingConfig.heading}</h2>
						<p className="booking-cta__sub">{bookingConfig.subheading}</p>

						{bookingConfig.steps?.length > 0 && (
							<ol className="booking-cta__steps">
								{bookingConfig.steps.map((step) => (
									<li key={step.number} className="booking-cta__step">
										<span
											className="booking-cta__step-number"
											aria-hidden="true"
										>
											{step.number}
										</span>
										<span className="booking-cta__step-text">{step.text}</span>
									</li>
								))}
							</ol>
						)}
					</div>

					{/* Right: CTA card */}
					<div className="booking-cta__card">
						<div className="booking-cta__card-inner">
							<p className="booking-cta__card-label">
								Free 15 minute consultation
							</p>

							<Button
								text={bookingConfig.cta.text}
								href={bookingConfig.cta.href}
								variant={bookingConfig.cta.variant ?? "primary"}
								external={bookingConfig.cta.external ?? true}
								trackEvent={bookingConfig.cta.trackEvent}
							/>

							{bookingConfig.note && (
								<p className="booking-cta__note">{bookingConfig.note}</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
