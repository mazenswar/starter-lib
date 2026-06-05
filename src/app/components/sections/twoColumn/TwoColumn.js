// components/sections/TwoColumn/TwoColumn.js
import Image from "next/image";
import Button from "../../ui/Button";
import "./twocolumn.scss";

// const twoColumn = {
// 	heading: "Our Approach",
// 	paragraphs: [
// 		"First paragraph of content.",
// 		"Second paragraph with more detail.",
// 	],
// 	list: [
// 		"First key point",
// 		"Second key point",
// 		"Third key point",
// 	],
// 	cta: {
// 		text: "Learn more",
// 		href: "/about",
// 		variant: "secondary",
// 	},
// 	image: {
// 		src: "/approach.webp",
// 		alt: "Descriptive alt text for the image",
// 		width: 400,
// 		height: 400,
// 	},
// 	imagePosition: "right", // "left" or "right"
// };

export default function TwoColumn({ twoColumnConfig }) {
	const imageFirst = twoColumnConfig.imagePosition === "left";

	return (
		<section
			className="block two-col-section"
			aria-labelledby="two-col-heading"
		>
			<div className="block__content container">
				<div
					className={`two-col-section__layout ${imageFirst ? "image-first" : ""}`}
				>
					{/* Copy */}
					<div className="two-col-section__copy">
						<h2 id="two-col-heading">{twoColumnConfig.heading}</h2>

						{twoColumnConfig.paragraphs?.map((para, i) => (
							<p key={i}>{para}</p>
						))}

						{twoColumnConfig.list?.length > 0 && (
							<ul className="two-col-section__list">
								{twoColumnConfig.list.map((item, i) => (
									<li key={i}>{item}</li>
								))}
							</ul>
						)}

						{twoColumnConfig.cta && (
							<div className="two-col-section__actions">
								<Button
									text={twoColumnConfig.cta.text}
									href={twoColumnConfig.cta.href}
									variant={twoColumnConfig.cta.variant ?? "secondary"}
								/>
							</div>
						)}
					</div>

					{/* Image */}
					<figure className="two-col-section__media">
						<Image
							src={twoColumnConfig.image.src}
							alt={twoColumnConfig.image.alt}
							width={twoColumnConfig.image.width}
							height={twoColumnConfig.image.height}
							sizes="(max-width: 768px) 92vw, 420px"
							style={{ width: "100%", height: "auto" }}
						/>
					</figure>
				</div>
			</div>
		</section>
	);
}
