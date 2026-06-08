"use client";

import { FormEvent, KeyboardEvent, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUp, ChevronDown, Plus } from "lucide-react";
import { getAppAuthUrl } from "@/lib/app-url";

const tabs = ["Comms", "Operations", "Admin", "Growth", "Insights"] as const;
type HeroTab = (typeof tabs)[number];

const logoMap = {
	gmail: {
		src: "/svgs/gmail.svg",
		alt: "Gmail",
	},
	slack: {
		src: "https://api.iconify.design/logos:slack-icon.svg",
		alt: "Slack",
	},
	googleDocs: {
		src: "https://cdn.simpleicons.org/googledocs",
		alt: "Google Docs",
	},
	googleCalendar: {
		src: "https://cdn.simpleicons.org/googlecalendar",
		alt: "Google Calendar",
	},
	googleSheets: {
		src: "https://cdn.simpleicons.org/googlesheets",
		alt: "Google Sheets",
	},
	googleDrive: {
		src: "https://cdn.simpleicons.org/googledrive",
		alt: "Google Drive",
	},
	notion: {
		src: "/svgs/Notion.svg",
		alt: "Notion",
	},
	salesforce: {
		src: "https://api.iconify.design/logos:salesforce.svg",
		alt: "Salesforce",
	},
	linkedin: {
		src: "https://api.iconify.design/logos:linkedin-icon.svg",
		alt: "LinkedIn",
	},
	hubspot: {
		src: "https://cdn.simpleicons.org/hubspot",
		alt: "HubSpot",
	},
	chrome: {
		src: "https://cdn.simpleicons.org/googlechrome",
		alt: "Chrome",
	},
} as const;

type LogoKey = keyof typeof logoMap;

const examplePrompts: Record<
	HeroTab,
	Array<{ title: string; prompt: string; apps: LogoKey[] }>
> = {
	Comms: [
		{
			title: "Support inbox triage",
			prompt:
				"When a new customer email arrives, look up account context, find the relevant answer in our docs, draft a reply, and flag anything that needs escalation.",
			apps: ["gmail", "notion"],
		},
		{
			title: "Daily team briefing",
			prompt:
				"Every weekday morning, summarize calendar events, urgent emails, and Slack updates into a short briefing with priorities, blockers, and owners.",
			apps: ["googleCalendar", "slack"],
		},
		{
			title: "Meeting follow-ups",
			prompt:
				"After meeting notes are added, extract decisions and action items, assign owners, and draft a recap email for everyone who attended.",
			apps: ["googleDocs", "gmail"],
		},
		{
			title: "Slack reply nudges",
			prompt:
				"When I'm mentioned in Slack and haven't replied within two hours, summarize the thread and draft a short response with the missing context.",
			apps: ["slack", "googleDocs"],
		},
		{
			title: "Friday inbox cleanup",
			prompt:
				"Every Friday, archive non-actionable emails, label threads by priority, and surface unanswered customer or partner messages that need a reply.",
			apps: ["gmail", "googleDrive"],
		},
		{
			title: "Customer update draft",
			prompt:
				"Pull recent account notes, open questions, and timeline changes into a concise customer update I can review before sending.",
			apps: ["salesforce", "gmail"],
		},
	],
	Operations: [
		{
			title: "Vendor invoice match",
			prompt:
				"Use Gmail and Drive to find new vendor invoices, match them against the payment tracker, and list approvals or missing details before finance closes the week.",
			apps: ["gmail", "googleSheets"],
		},
		{
			title: "Weekly ops dashboard",
			prompt:
				"Every Monday, combine open tasks, overdue owners, and calendar milestones into a live operations dashboard with risks and next actions.",
			apps: ["notion", "googleCalendar"],
		},
		{
			title: "CRM data cleanup",
			prompt:
				"Find duplicate or incomplete CRM records, compare them with the spreadsheet source of truth, and prepare a merge list for review.",
			apps: ["salesforce", "googleSheets"],
		},
		{
			title: "Inventory reorder check",
			prompt:
				"Check inventory levels against the reorder sheet, identify low-stock SKUs, and draft supplier emails for items that need replenishment.",
			apps: ["googleSheets", "gmail"],
		},
		{
			title: "Project handoff brief",
			prompt:
				"When a project changes owner, collect recent notes, open tasks, key files, and risks into a handoff brief the new owner can act on.",
			apps: ["notion", "googleDrive"],
		},
		{
			title: "Renewal risk list",
			prompt:
				"Every week, review upcoming renewals, recent support threads, and CRM notes to flag accounts that may need attention before renewal.",
			apps: ["salesforce", "gmail"],
		},
	],
	Admin: [
		{
			title: "Meeting prep brief",
			prompt:
				"Before each calendar meeting, research attendees, pull recent emails and notes, and prepare a one-page brief with agenda, context, and open questions.",
			apps: ["googleCalendar", "gmail"],
		},
		{
			title: "Expense reminders",
			prompt:
				"Review submitted expense rows, spot missing receipts or policy issues, and draft reminder emails for employees who need to fix them.",
			apps: ["gmail", "googleSheets"],
		},
		{
			title: "Drive filing assistant",
			prompt:
				"When new files land in Drive, rename them consistently, move them into the right project folder, and summarize what changed.",
			apps: ["googleDrive", "googleDocs"],
		},
		{
			title: "Travel itinerary prep",
			prompt:
				"Build a travel brief from calendar events, booking emails, and destination notes with addresses, timing, confirmation numbers, and risks.",
			apps: ["googleCalendar", "gmail"],
		},
		{
			title: "Policy rollout",
			prompt:
				"When a policy doc changes, summarize the update, identify who is affected, and draft a Slack announcement with the action required.",
			apps: ["googleDocs", "slack"],
		},
		{
			title: "Contract review brief",
			prompt:
				"Read new contract files, extract renewal dates, payment terms, unusual clauses, and open questions into an approval checklist.",
			apps: ["googleDrive", "googleDocs"],
		},
	],
	Growth: [
		{
			title: "LinkedIn lead sourcing",
			prompt:
				"Use the browser to find LinkedIn leads that match our ICP, enrich each one with company context, and add a clean outreach list to HubSpot.",
			apps: ["linkedin", "hubspot"],
		},
		{
			title: "Opened-email follow-up",
			prompt:
				"When a prospect opens an outbound email, research their company, check CRM context, and draft a personalized follow-up I can approve.",
			apps: ["gmail", "hubspot"],
		},
		{
			title: "Sales qualification",
			prompt:
				"Handle new inbound sales replies, ask qualifying questions, update the opportunity stage, and notify me when the lead is ready for handoff.",
			apps: ["gmail", "salesforce"],
		},
		{
			title: "Campaign angle research",
			prompt:
				"Review recent CRM wins, customer notes, and competitor positioning, then draft three campaign angles with audience, proof, and CTA.",
			apps: ["salesforce", "googleDocs"],
		},
		{
			title: "Competitor outreach",
			prompt:
				"Monitor competitor releases and customer comments, identify accounts showing buying intent, and prepare a targeted outreach list.",
			apps: ["chrome", "hubspot"],
		},
		{
			title: "Pipeline hygiene",
			prompt:
				"Every Friday, review stale opportunities, summarize the next best action for each deal, and flag accounts without a clear owner.",
			apps: ["salesforce", "googleSheets"],
		},
	],
	Insights: [
		{
			title: "Competitor watch",
			prompt:
				"Monitor competitor websites, release notes, and pricing pages, then send a weekly summary of meaningful changes and likely customer impact.",
			apps: ["chrome", "googleDocs"],
		},
		{
			title: "Buying signal report",
			prompt:
				"Find accounts with new funding, hiring, product releases, or leadership changes and explain why each one deserves follow-up this week.",
			apps: ["salesforce", "chrome"],
		},
		{
			title: "Market brief",
			prompt:
				"Research market news for our category and write a short brief with trend shifts, risks, opportunities, and suggested actions.",
			apps: ["chrome", "googleDocs"],
		},
		{
			title: "Weekly KPI readout",
			prompt:
				"Analyze weekly KPI sheets, call out unusual changes, and draft a leadership update with causes, risks, and recommended next steps.",
			apps: ["googleSheets", "salesforce"],
		},
		{
			title: "Customer theme mining",
			prompt:
				"Review recent customer emails and notes, cluster recurring requests or objections, and produce a prioritized product feedback summary.",
			apps: ["gmail", "notion"],
		},
		{
			title: "Board memo draft",
			prompt:
				"Turn this month's metrics, customer themes, pipeline changes, and risks into a crisp board memo draft with charts and open questions.",
			apps: ["googleDocs", "googleSheets"],
		},
	],
};

export function Hero() {
	const [prompt, setPrompt] = useState("");
	const [activeTab, setActiveTab] = useState<HeroTab>("Growth");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const submitPrompt = (event?: FormEvent<HTMLFormElement>) => {
		event?.preventDefault();
		window.location.assign(getAppAuthUrl(prompt));
	};

	const applyExamplePrompt = (examplePrompt: string) => {
		setPrompt(examplePrompt);
		textareaRef.current?.focus();
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			submitPrompt();
		}
	};

	return (
		<section className="relative min-h-screen overflow-hidden bg-[var(--marketing-background)] pt-16 text-[#17181c]">
			<div className="relative z-10 flex min-h-[calc(100vh-64px)] items-center justify-center px-4 pb-20 pt-12 sm:px-6">
				<div className="w-full max-w-[clamp(580px,54vw,740px)] max-[640px]:max-w-full">
					<div>
						<div className="mx-auto mb-9 max-w-[680px] text-center">
							<p className="mb-6 text-sm font-medium text-[#68707b]">
								Invook Beta
							</p>
							<h1 className="text-balance [font-family:var(--font-heading)] text-[38px] font-semibold leading-[1.05] tracking-tight text-[#17181c] sm:text-[52px]">
								Your AI command center
							</h1>
							<p className="mx-auto mt-5 max-w-xl text-balance text-base leading-7 text-[#68707b]">
								One place for your team&apos;s agents, connections, apps, and knowledge. Scale productivity without adding headcount.
							</p>
						</div>

						<form
							onSubmit={submitPrompt}
							className="overflow-hidden rounded-[18px] border border-[#dfe5ec] bg-white"
						>
							<div className="min-h-[104px] px-4 pb-4 pt-4 sm:px-5">
								<textarea
									ref={textareaRef}
									value={prompt}
									onChange={(event) => setPrompt(event.target.value)}
									onKeyDown={handleKeyDown}
									placeholder="Do anything"
									aria-label="Do anything"
									rows={2}
									style={{ outline: "none", boxShadow: "none" }}
									className="block max-h-36 min-h-[56px] w-full resize-none appearance-none border-0 bg-transparent text-base leading-6 text-[#17181c] outline-none ring-0 placeholder:text-[#a7adb7] focus:!border-0 focus:!outline-none focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0"
								/>

								<div className="flex items-center justify-between">
									<button
										type="button"
										aria-label="Add context"
										className="inline-flex size-7 items-center justify-center rounded-full text-[#8f98a3] transition-colors hover:bg-[#f2f4f7] hover:text-[#17181c]"
									>
										<Plus className="size-4" />
									</button>

									<div className="flex items-center gap-2">
										<button
											type="button"
											className="inline-flex h-8 items-center gap-1 rounded-full bg-[#f3f5f8] px-3 text-xs font-medium text-[#68717d] transition-colors hover:bg-[#edf0f4]"
										>
											Claude Sonnet 4.6
											<ChevronDown className="size-3.5" />
										</button>
										<button
											type="submit"
											aria-label="Send"
											className="inline-flex size-8 items-center justify-center rounded-full bg-[#eef1f5] text-[#8f98a3] transition-colors hover:bg-[#dfe5ec] hover:text-[#17181c]"
										>
											<ArrowUp className="size-4" />
										</button>
									</div>
								</div>
							</div>
						</form>

					</div>

					<div className="mt-9 flex flex-wrap items-center justify-center gap-7">
						{tabs.map((tab) => (
							<button
								key={tab}
								type="button"
								onClick={() => setActiveTab(tab)}
								className={`relative px-1 pb-2 text-sm font-medium tracking-[0] transition-colors ${
									activeTab === tab ? "text-[#11140f]" : "text-[#7a828c] hover:text-[#17181c]"
								} outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[#cfd5dc] focus-visible:ring-offset-4 focus-visible:ring-offset-white`}
							>
								{tab}
								{activeTab === tab && (
									<span className="absolute inset-x-0 bottom-0 h-px rounded-full bg-[#11140f]" />
								)}
							</button>
						))}
					</div>

					<div className="mt-7 grid gap-3 md:grid-cols-3">
						{examplePrompts[activeTab].map((example) => (
							<button
								key={example.title}
								type="button"
								onClick={() => applyExamplePrompt(example.prompt)}
								className="group rounded-[10px] border border-transparent p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#e2e7ee] hover:bg-[#f8fafc] hover:shadow-[0_18px_42px_rgba(15,23,42,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cfd5dc] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
							>
								<div className="mb-4 flex items-center justify-between gap-3">
									<h3 className="text-sm font-semibold tracking-[0] text-[#24262d] transition-colors group-hover:text-[#17181c]">
										{example.title}
									</h3>
									<div className="flex shrink-0 items-center -space-x-1.5">
										{example.apps.map((app) => (
											<span
												key={`${example.title}-${app}`}
												title={logoMap[app].alt}
												className="flex size-6 items-center justify-center rounded-full border border-white bg-[#f1f4f7] shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition-colors group-hover:border-[#eef2f6] group-hover:bg-white"
											>
												<Image
													src={logoMap[app].src}
													alt={logoMap[app].alt}
													width={14}
													height={14}
													unoptimized={logoMap[app].src.startsWith("https://")}
													className="size-3.5 object-contain"
												/>
											</span>
										))}
									</div>
								</div>
								<p className="min-h-[84px] text-sm leading-6 text-[#69717d] transition-colors group-hover:text-[#4f5865]">
									{example.prompt}
								</p>
								<span className="mt-5 inline-flex text-xs font-semibold text-[#9098a3] transition-colors group-hover:text-[#17181c]">
									Try it
								</span>
							</button>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
