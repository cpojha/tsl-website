"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { APP_SIGN_IN_URL, APP_SIGN_UP_URL } from "@/lib/app-url";

const navItems = [
	{ label: "Pricing", href: "/pricing" },
	{ label: "Changelog", href: "/changelog" },
	{ label: "Blog", href: "/blog" },
];

export function Navigation() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<nav className="fixed left-0 top-0 z-50 w-full bg-[var(--marketing-background)] text-[#11140f]">
			<div className="mx-auto w-full max-w-[1104px] px-4 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="flex shrink-0 items-center gap-2.5">
						<Link href="/" className="flex items-center" aria-label="Invook home">
							<Image
								src="/svgs/black_logo.svg"
								alt="Invook"
								width={112}
								height={26}
								className="h-6 w-auto"
								priority
							/>
						</Link>
						<span className="inline-flex h-5 items-center rounded-sm bg-[#fff0df] px-2 text-[11px] font-semibold leading-none text-[#c65a13]">
							Beta
						</span>
					</div>

					<div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
						{navItems.map((item) => (
							<Link
								key={item.label}
								href={item.href}
								className="text-sm font-medium text-[#3f453a] transition-colors hover:text-[#11140f]"
							>
								{item.label}
							</Link>
						))}
					</div>

					<div className="hidden items-center gap-3 lg:flex">
						<a
							href={APP_SIGN_IN_URL}
							className="inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium text-[#3f453a] transition-colors hover:text-[#11140f]"
						>
							Sign in
						</a>
						<a
							href={APP_SIGN_UP_URL}
							className="inline-flex h-9 items-center justify-center rounded-full bg-[#11140f] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#2a3225]"
						>
							Sign up
						</a>
					</div>

					<div className="flex items-center gap-2 lg:hidden">
						<a
							href={APP_SIGN_UP_URL}
							onClick={() => setIsMobileMenuOpen(false)}
							className="inline-flex h-9 items-center justify-center rounded-full bg-[#11140f] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#2a3225]"
						>
							Sign up
						</a>
						<button
							type="button"
							onClick={() => setIsMobileMenuOpen((open) => !open)}
							className="inline-flex size-10 items-center justify-center rounded-[8px] text-[#11140f] transition-colors hover:bg-black/[0.04]"
							aria-label="Toggle mobile menu"
						>
							{isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
						</button>
					</div>
				</div>

				{isMobileMenuOpen && (
					<div className="border-t border-black/10 py-4 lg:hidden">
						<div className="flex flex-col gap-2">
							{navItems.map((item) => (
								<Link
									key={item.label}
									href={item.href}
									className="rounded-[8px] px-3 py-3 text-sm font-medium text-[#3f453a] transition-colors hover:bg-black/[0.04] hover:text-[#11140f]"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{item.label}
								</Link>
							))}
							<div className="pt-3">
								<a
									href={APP_SIGN_IN_URL}
									onClick={() => setIsMobileMenuOpen(false)}
									className="inline-flex h-10 w-full items-center justify-center rounded-full border border-black/10 text-sm font-medium text-[#11140f]"
								>
									Sign in
								</a>
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
