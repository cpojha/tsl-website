import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";
import { Analytics } from "@vercel/analytics/react";
import { PostHogProvider } from "./posthog-provider";

const geist = Geist({
	variable: "--font-geist",
	subsets: ["latin"],
});

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL('https://invook.ai'),
	title: {
		template: "%s . Invook",
		default: "Invook | AI Agents for Workflows",
	},
	description: "Build AI agents that research, write, update tools, and hand off work across your business apps.",
	verification: {
		google: "vJ-6dPaGIkwacm6PDDYNLnbZAJVqClg6jDOa57rA424",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${geist.variable} ${inter.variable} antialiased`}
			>
				<PostHogProvider>
					<SiteShell>{children}</SiteShell>
					<Analytics />
				</PostHogProvider>
			</body>
		</html>
	);
}
