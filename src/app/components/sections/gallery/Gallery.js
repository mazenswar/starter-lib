// components/sections/Gallery/Gallery.js
"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import "./gallery.scss";

/* =========================
   GALLERY CONFIGURATION
   Edit this section per project
   ========================= */

const galleryConfig = {
	heading: "Our Work",
	subheading: "A look at some of the projects we are proud of.",
	layout: "grid", // "grid" or "before-after"
	filterable: true,
	columns: 3, // 2, 3, or 4
	categories: [
		{ id: "all", label: "All" },
		{ id: "lawn", label: "Lawn Care" },
		{ id: "landscaping", label: "Landscaping" },
		{ id: "cleanup", label: "Cleanups" },
	],
	images: [
		{
			id: "g1",
			src: "/gallery/assets/1.jpg",
			alt: "Freshly mowed lawn with clean edges",
			category: "lawn",
			width: 800,
			height: 600,
		},
		{
			id: "g2",
			src: "/gallery/assets/2.jpg",
			alt: "Landscaped front yard with flower beds",
			category: "landscaping",
			width: 800,
			height: 600,
		},
		{
			id: "g3",
			src: "/gallery/assets/3.jpg",
			alt: "Fall cleanup with leaf removal",
			category: "cleanup",
			width: 800,
			height: 600,
		},
		{
			id: "g4",
			src: "/gallery/assets/4.jpg",
			alt: "Backyard lawn maintenance",
			category: "lawn",
			width: 800,
			height: 600,
		},
		{
			id: "g5",
			src: "/gallery/assets/5.jpg",
			alt: "Garden bed installation",
			category: "landscaping",
			width: 800,
			height: 600,
		},
		{
			id: "g6",
			src: "/gallery/assets/6.jpg",
			alt: "Spring cleanup and mulching",
			category: "cleanup",
			width: 800,
			height: 600,
		},
	],
	// Before and after pairs (used when layout is "before-after")
	beforeAfter: [
		{
			id: "ba1",
			label: "Front Yard Transformation",
			before: {
				src: "/gallery/before-1.webp",
				alt: "Front yard before landscaping",
				width: 800,
				height: 600,
			},
			after: {
				src: "/gallery/after-1.webp",
				alt: "Front yard after landscaping",
				width: 800,
				height: 600,
			},
		},
		{
			id: "ba2",
			label: "Backyard Cleanup",
			before: {
				src: "/gallery/before-2.webp",
				alt: "Backyard before cleanup",
				width: 800,
				height: 600,
			},
			after: {
				src: "/gallery/after-2.webp",
				alt: "Backyard after cleanup",
				width: 800,
				height: 600,
			},
		},
	],
};

/* =========================
   LIGHTBOX
   ========================= */

function Lightbox({ image, onClose }) {
	const closeRef = useRef(null);
	const triggerRef = useRef(null);

	// Save the element that opened the lightbox
	useEffect(() => {
		triggerRef.current = document.activeElement;
		// Move focus to close button when lightbox opens
		requestAnimationFrame(() => closeRef.current?.focus());

		return () => {
			// Restore focus when lightbox closes
			triggerRef.current?.focus();
		};
	}, []);

	// Trap focus inside lightbox
	const handleKeyDown = useCallback(
		(e) => {
			if (e.key === "Escape") {
				onClose();
				return;
			}
			if (e.key !== "Tab") return;

			// Only one focusable element so just prevent leaving
			e.preventDefault();
			closeRef.current?.focus();
		},
		[onClose],
	);

	if (!image) return null;

	return (
		<dialog
			className="gallery__lightbox"
			open
			onClick={(e) => e.target === e.currentTarget && onClose()}
			onKeyDown={handleKeyDown}
			aria-label={image.alt}
			aria-modal="true"
		>
			<div className="gallery__lightbox-inner">
				<button
					ref={closeRef}
					className="gallery__lightbox-close"
					onClick={onClose}
					aria-label="Close image"
				>
					✕
				</button>
				<figure className="gallery__lightbox-figure">
					<Image
						src={image.src}
						alt={image.alt}
						width={image.width}
						height={image.height}
						style={{ width: "100%", height: "auto" }}
						priority
					/>
					{image.alt && (
						<figcaption className="gallery__lightbox-caption">
							{image.alt}
						</figcaption>
					)}
				</figure>
			</div>
		</dialog>
	);
}

/* =========================
   COMPONENT
   ========================= */

export default function Gallery() {
	const [activeCategory, setActiveCategory] = useState("all");
	const [lightboxImage, setLightboxImage] = useState(null);
	const isBeforeAfter = galleryConfig.layout === "before-after";

	const filteredImages =
		activeCategory === "all"
			? galleryConfig.images
			: galleryConfig.images.filter((img) => img.category === activeCategory);

	return (
		<section className="block gallery" aria-labelledby="gallery-heading">
			<div className="block__content container">
				{/* Header */}
				<div className="gallery__header">
					<h2 id="gallery-heading">{galleryConfig.heading}</h2>
					{galleryConfig.subheading && (
						<p className="gallery__sub">{galleryConfig.subheading}</p>
					)}
				</div>

				{/* Filter tabs */}
				{galleryConfig.filterable && !isBeforeAfter && (
					<div
						className="gallery__filters"
						role="tablist"
						aria-label="Filter gallery by category"
					>
						{galleryConfig.categories.map((cat) => (
							<button
								key={cat.id}
								role="tab"
								aria-selected={activeCategory === cat.id}
								className={`gallery__filter ${activeCategory === cat.id ? "is-active" : ""}`}
								onClick={() => setActiveCategory(cat.id)}
							>
								{cat.label}
							</button>
						))}
					</div>
				)}

				{/* Grid layout */}
				{!isBeforeAfter && (
					<div
						className="gallery__grid"
						style={{ "--gallery-cols": galleryConfig.columns }}
						role="list"
					>
						{filteredImages.map((image) => (
							<button
								key={image.id}
								className="gallery__item"
								role="listitem"
								onClick={() => setLightboxImage(image)}
								aria-label={`View larger: ${image.alt}`}
							>
								<Image
									src={image.src}
									alt={image.alt}
									width={image.width}
									height={image.height}
									sizes="(max-width: 768px) 90vw, 33vw"
									style={{ width: "100%", height: "auto" }}
								/>
								<div className="gallery__item-overlay" aria-hidden="true">
									<span>View</span>
								</div>
							</button>
						))}
					</div>
				)}

				{/* Before and after layout */}
				{isBeforeAfter && (
					<div className="gallery__before-after-list">
						{galleryConfig.beforeAfter.map((pair) => (
							<div key={pair.id} className="gallery__before-after">
								{pair.label && (
									<h3 className="gallery__before-after-label">{pair.label}</h3>
								)}
								<div className="gallery__before-after-grid">
									<figure className="gallery__before-after-item">
										<div className="gallery__before-after-badge">Before</div>
										<Image
											src={pair.before.src}
											alt={pair.before.alt}
											width={pair.before.width}
											height={pair.before.height}
											sizes="(max-width: 768px) 90vw, 45vw"
											style={{ width: "100%", height: "auto" }}
										/>
									</figure>
									<figure className="gallery__before-after-item">
										<div className="gallery__before-after-badge is-after">
											After
										</div>
										<Image
											src={pair.after.src}
											alt={pair.after.alt}
											width={pair.after.width}
											height={pair.after.height}
											sizes="(max-width: 768px) 90vw, 45vw"
											style={{ width: "100%", height: "auto" }}
										/>
									</figure>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Lightbox */}
			{lightboxImage && (
				<Lightbox
					image={lightboxImage}
					onClose={() => setLightboxImage(null)}
				/>
			)}
		</section>
	);
}
