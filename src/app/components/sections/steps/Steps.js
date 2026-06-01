// components/sections/Steps/Steps.js
import "./steps.scss";

/* =========================
   STEPS CONFIGURATION
   Edit this section per project
   ========================= */

const stepsConfig = {
	heading: "How It Works",
	subheading:
		"A simple, straightforward process from first contact to ongoing care.",
	steps: [
		{
			id: "step-1",
			title: "Step One Title",
			description:
				"Describe what happens in this step. Keep it clear and human.",
		},
		{
			id: "step-2",
			title: "Step Two Title",
			description: "Describe what happens in this step.",
		},
		{
			id: "step-3",
			title: "Step Three Title",
			description: "Describe what happens in this step.",
		},
		{
			id: "step-4",
			title: "Step Four Title",
			description: "Describe what happens in this step.",
		},
	],
};

/* =========================
   COMPONENT
   ========================= */

export default function Steps() {
	return (
		<section className="block steps" aria-labelledby="steps-heading">
			<div className="block__content container">
				{/* Header */}
				<div className="steps__header">
					<h2 id="steps-heading">{stepsConfig.heading}</h2>
					{stepsConfig.subheading && (
						<p className="steps__sub">{stepsConfig.subheading}</p>
					)}
				</div>

				{/* Steps list */}
				<ol className="steps__list" role="list">
					{stepsConfig.steps.map((step, index) => (
						<li key={step.id} className="steps__item">
							<div className="steps__number" aria-hidden="true">
								{index + 1}
							</div>
							<div className="steps__content">
								<h3 className="steps__title">{step.title}</h3>
								<p className="steps__description">{step.description}</p>
							</div>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
