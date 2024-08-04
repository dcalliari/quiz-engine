import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.scss";

export const metadata = {
	title: "Quiz Engine",
	description: "A quiz engine built with Next.js",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				{children}
				<SpeedInsights />
			</body>
		</html>
	);
}
