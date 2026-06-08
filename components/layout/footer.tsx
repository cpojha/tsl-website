import Image from "next/image";
import Link from "next/link";

const footerColumns = [
	{
		title: "Product",
		links: [
			{ label: "Pricing", href: "/pricing" },
			{ label: "Changelog", href: "/changelog" },
		],
	},
	{
		title: "Company",
		links: [
			{ label: "Careers", href: "https://invook.notion.site/Careers-2917f199308b80aead5dfb1c2d6142dd?source=copy_link", external: true },
			{ label: "About", href: "https://invook.notion.site/About-2917f199308b8035a4efc8204a1293f9?source=copy_link", external: true },
		],
	},
	{
		title: "Legal",
		links: [
			{ label: "Terms of Service", href: "https://invook.notion.site/Terms-of-Use-2917f199308b8085ae78ce56ba9fd0b3", external: true },
			{ label: "Privacy Policy", href: "/privacy-policy" },
		],
	},
	{
		title: "Connect",
		links: [
			{ label: "Twitter", href: "https://x.com/Invook_ai", external: true },
			{ label: "LinkedIn", href: "https://linkedin.com/company/thinking-sound-lab-25", external: true },
			{ label: "support@thinkingsoundlab.com", href: "mailto:support@thinkingsoundlab.com" },
		],
	},
];

export function Footer() {
	return (
		<footer className="border-t border-white/10 bg-[#0b0d0a] text-white">
			<div className="mx-auto w-full max-w-[1104px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
				<div className="mb-12 max-w-xl">
					<Image
						src="/svgs/white_logo.svg"
						alt="Invook"
						width={112}
						height={26}
						className="h-6 w-auto"
					/>
					<p className="mt-3 text-sm leading-6 text-white/56">
						Your AI command center for agents, apps, knowledge, and recurring work.
					</p>
				</div>

				<div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-12">
					{footerColumns.map((column) => (
						<div key={column.title}>
							<h3 className="mb-4 text-sm font-normal text-white/42">{column.title}</h3>
							<ul className="space-y-1">
								{column.links.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className="py-2 text-sm font-normal text-white/70 transition-colors hover:text-white"
											target={link.external ? "_blank" : undefined}
											rel={link.external ? "noopener noreferrer" : undefined}
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="border-t border-white/10 pt-6">
					<p className="text-sm text-white/48">© 2026 Thinking Sound Lab. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
