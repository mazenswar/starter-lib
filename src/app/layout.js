// app/layout.js
import { generateMeta, generateJsonLd } from "../../config/metadata";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import "./styles/index.scss";

// Root metadata — applies to all pages unless overridden
export const metadata = generateMeta({
	path: "/",
});

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				{/* JSON-LD structured data */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: generateJsonLd() }}
				/>

				{/* Skip navigation */}
				<a href="#main-content" className="skip-nav">
					Skip to main content
				</a>

				<Nav />

				{children}

				<Footer />
			</body>
		</html>
	);
}
