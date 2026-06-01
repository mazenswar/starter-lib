// components/sections/TwoColumn/TwoColumn.js
import Image from "next/image";
import Button from "../../ui/Button";
import "./twocolumn.scss";

/* =========================
   TWO COLUMN CONFIGURATION
   Edit this section per project
   ========================= */

const twoColumn = {
	heading: "Our Approach",
	paragraphs: [
		"First paragraph of content. Describe your approach, philosophy, or whatever this section is about.",
		"Second paragraph with more detail. Keep it concise and human.",
	],
	list: [
		"First key point about your approach or offering",
		"Second key point that reinforces your value",
		"Third key point that builds trust",
	],
	cta: {
		text: "Learn more",
		href: "/about",
		variant: "secondary",
	},
	image: {
		src: "/approach.webp",
		alt: "Descriptive alt text for the image",
		width: 400,
		height: 400,
	},
	imagePosition: "right", // "left" or "right"
};

/* =========================
   COMPONENT
   ========================= */

export default function TwoColumn() {
	const imageFirst = twoColumn.imagePosition === "left";

	return (
		<section className="block two-col-section">
			<div className="block__content container">
				<div
					className={`two-col-section__layout ${imageFirst ? "image-first" : ""}`}
				>
					{/* Copy */}
					<div className="two-col-section__copy">
						<h2>{twoColumn.heading}</h2>

						{twoColumn.paragraphs?.map((para, i) => (
							<p key={i}>{para}</p>
						))}

						{twoColumn.list?.length > 0 && (
							<ul className="two-col-section__list">
								{twoColumn.list.map((item, i) => (
									<li key={i}>{item}</li>
								))}
							</ul>
						)}

						{twoColumn.cta && (
							<div className="two-col-section__actions">
								<Button
									text={twoColumn.cta.text}
									href={twoColumn.cta.href}
									variant={twoColumn.cta.variant ?? "secondary"}
								/>
							</div>
						)}
					</div>

					{/* Image */}
					<figure className="two-col-section__media">
						<Image
							src={twoColumn.image.src}
							alt={twoColumn.image.alt}
							width={twoColumn.image.width}
							height={twoColumn.image.height}
							sizes="(max-width: 768px) 92vw, 420px"
							style={{ width: "100%", height: "auto" }}
						/>
					</figure>
				</div>
			</div>
		</section>
	);
}
