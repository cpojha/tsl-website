"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, Check, ChevronDown } from "lucide-react";
import { APP_SIGN_UP_URL } from "@/lib/app-url";
import { useAnalytics } from "@/hooks/use-analytics";

type PricingFeature = {
	label: string;
	tone?: "default" | "warning";
};

type PricingPlan = {
	id: string;
	name: string;
	description: string;
	price: string;
	features: PricingFeature[];
	button: string;
	featured?: boolean;
};

type PricingFaq = {
	question: string;
	answer: string[];
};

const pricingPlans: PricingPlan[] = [
	{
		id: "free",
		name: "Free",
		description: "Try Invook",
		price: "$0",
		features: [
			{ label: "500 credits per month" },
			{ label: "Limited usage" },
			{ label: "10 executions per trigger", tone: "warning" },
			{ label: "Limited file upload size", tone: "warning" },
		],
		button: "Start free",
	},
	{
		id: "starter",
		name: "Starter",
		description: "For casual users",
		price: "$20",
		features: [
			{ label: "4,000 credits per month" },
			{ label: "Agent web browser" },
			{ label: "Full size file uploads" },
			{ label: "Email support" },
		],
		button: "Start Starter",
	},
	{
		id: "pro",
		name: "Pro",
		description: "For power users",
		price: "$100",
		features: [
			{ label: "40,000 credits per month" },
			{ label: "Agent web browser" },
			{ label: "Full size file uploads" },
			{ label: "Email support" },
		],
		button: "Start Pro",
		featured: true,
	},
];

const pricingFaqs: PricingFaq[] = [
	{
		question: "How do credits work?",
		answer: [
			"Each Invook request uses credits. The amount depends on task complexity, context size, connected tools, trigger frequency, and the intelligence level selected for the work.",
			"Monthly credits renew every billing cycle and do not roll over. To use credits efficiently, keep agents focused, remove unnecessary tools, and choose the right intelligence level for the task.",
		],
	},
	{
		question: "What are the different intelligence levels?",
		answer: [
			"Intelligence levels control how capable an agent is for harder work. Higher levels can handle more complex reasoning, but they also use more credits.",
		],
	},
	{
		question: "How many services can I connect? How many agents can I create?",
		answer: [
			"Paid plans are designed for multiple agents and app connections. You can connect your tools, APIs, inboxes, documents, and browser workflows as your use cases grow.",
		],
	},
	{
		question: "Can my agents use a browser or run code?",
		answer: [
			"Yes. Paid plans include an agent web browser for navigating websites, gathering context, logging into tools you authorize, and completing browser-based workflows.",
			"Agents can also use a sandboxed execution environment for file handling, scripts, and developer-style tasks when the workflow requires it.",
		],
	},
	{
		question: "Can I buy more credits?",
		answer: [
			"If you need more credits than your current plan includes, you can upgrade to a higher plan or contact us for a custom usage package.",
		],
	},
	{
		question: "Can I cancel or change my plan at any time?",
		answer: [
			"Yes. You can change or cancel your plan from your account. Upgrades are available immediately, while downgrades or cancellations apply based on the current billing period.",
		],
	},
	{
		question: "Can I try Invook for free?",
		answer: [
			"Yes. The Free plan gives you 500 monthly credits so you can try Invook before choosing a paid plan.",
		],
	},
	{
		question: "Do you offer refunds?",
		answer: [
			"If something is not working for you, contact us. Refunds are reviewed case by case based on billing status, usage, and the timing of the request.",
		],
	},
];

export default function PricingContent() {
	const { capture } = useAnalytics();
	const tracked = useRef(false);
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: pricingFaqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer.join(" "),
			},
		})),
	};

	useEffect(() => {
		if (!tracked.current) {
			capture("pricing_page_viewed");
			tracked.current = true;
		}
	}, [capture]);

	const handleAction = (planId: string) => {
		capture("pricing_button_clicked", {
			plan_id: planId,
		});

		const url = new URL(APP_SIGN_UP_URL);
		url.searchParams.set("plan", planId);
		window.location.assign(url.toString());
	};

	return (
		<main className="min-h-screen bg-[var(--marketing-background)] px-4 pb-24 pt-32 text-[#17181c] sm:px-6 lg:px-8">
			<section className="mx-auto max-w-[1400px]">
				<div className="mx-auto mb-14 max-w-2xl text-center">
					<p className="mb-5 text-sm font-medium text-[#5b6f53]">Invook Beta</p>
					<h1 className="text-balance text-[38px] font-semibold leading-[1.05] tracking-tight sm:text-[52px]">
						Simple plans that scale with your work.
					</h1>
					<p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#68707b]">
						Start free. Upgrade when you need to get more done. Cancel anytime.
					</p>
				</div>

				<div className="mx-auto grid max-w-[1040px] gap-4 md:grid-cols-3">
					{pricingPlans.map((plan) => {
						return (
							<article
								key={plan.id}
								className={`relative flex min-h-[420px] flex-col rounded-[8px] border p-6 ${
									plan.featured
										? "border-[#9fbf91] bg-[#eef8ea]"
										: "border-[#dfe3e8] bg-white"
								}`}
							>
								{plan.featured && (
									<p className="absolute right-5 top-5 rounded-full bg-[#d7f8be] px-3 py-1 text-xs font-semibold text-[#173112]">
										Recommended
									</p>
								)}

								<div className="mb-8">
									<h2 className="text-xl font-semibold tracking-tight">{plan.name}</h2>
									<p className="mt-3 min-h-[48px] text-sm leading-6 text-[#68707b]">{plan.description}</p>
								</div>

								<div className="mb-8">
									<div className="flex items-end gap-2">
										<span className="text-[42px] font-semibold leading-none tracking-tight">{plan.price}</span>
										<span className="pb-1 text-sm text-[#69717d]">/mo</span>
									</div>
								</div>

								<ul className="mb-8 space-y-3">
									{plan.features.map((feature) => (
										<li key={feature.label} className="flex gap-3 text-sm leading-5 text-[#4f5865]">
											{feature.tone === "warning" ? (
												<AlertTriangle className="mt-0.5 size-4 shrink-0 text-[#b94a38]" />
											) : (
												<Check className="mt-0.5 size-4 shrink-0 text-[#4d7c43]" />
											)}
											<span>{feature.label}</span>
										</li>
									))}
								</ul>

								<button
									type="button"
									onClick={() => handleAction(plan.id)}
									className={`mt-auto h-11 rounded-[6px] px-4 text-sm font-semibold transition-colors ${
										plan.featured
											? "bg-[#11140f] text-white hover:bg-[#2a3225]"
											: "bg-[#eef1f4] text-[#17181c] hover:bg-[#e3e7ec]"
									}`}
								>
									{plan.button}
								</button>
							</article>
						);
					})}
				</div>

				<section className="mx-auto mt-20 flex w-full max-w-[760px] flex-col gap-6">
					<div className="text-center">
						<h2 className="text-[30px] font-semibold leading-tight tracking-tight text-[#17181c] sm:text-[34px]">
							Frequently Asked Questions
						</h2>
					</div>

					<div className="flex flex-col gap-3">
						{pricingFaqs.map((faq) => (
							<details
								key={faq.question}
								className="group rounded-[8px] border border-[#dfe3e8] bg-white transition-colors open:border-[#cfd8df]"
							>
								<summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[#17181c]">
									<span>{faq.question}</span>
									<ChevronDown className="size-4 shrink-0 text-[#69717d] transition-transform duration-200 group-open:rotate-180" />
								</summary>
								<div className="border-t border-[#edf0f2] px-5 py-4">
									<div className="space-y-3 text-sm leading-7 text-[#68707b]">
										{faq.answer.map((paragraph) => (
											<p key={paragraph}>{paragraph}</p>
										))}
									</div>
								</div>
							</details>
						))}
					</div>

				</section>
			</section>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
		</main>
	);
}
