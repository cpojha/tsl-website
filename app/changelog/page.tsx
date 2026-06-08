import type { Metadata } from "next";
import { EmptyMarketingPage } from "@/features/placeholder/empty-marketing-page";

export const metadata: Metadata = {
	title: "Changelog",
	description: "Invook product updates and release notes.",
};

export default function ChangelogPage() {
	return (
		<EmptyMarketingPage
			eyebrow="Changelog"
			title="Product notes are coming soon."
			description="We will publish product updates, fixes, and release notes here when Invook is ready."
		/>
	);
}
