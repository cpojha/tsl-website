import type { Metadata } from "next";
import { EmptyMarketingPage } from "@/features/placeholder/empty-marketing-page";

export const metadata: Metadata = {
	title: "Blog",
	description: "Invook product essays and AI workflow ideas.",
};

export default function BlogPage() {
	return (
		<EmptyMarketingPage
			eyebrow="Blog"
			title="Stories are coming soon."
			description="We will publish product thinking and practical AI workflow ideas here when Invook is ready."
		/>
	);
}
