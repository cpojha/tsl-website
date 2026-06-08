type EmptyMarketingPageProps = {
	eyebrow: string;
	title: string;
	description: string;
};

export function EmptyMarketingPage({
	eyebrow,
	title,
	description,
}: EmptyMarketingPageProps) {
	return (
		<main className="min-h-screen bg-[var(--marketing-background)] px-4 pb-24 pt-32 text-[#17181c] sm:px-6 lg:px-8">
			<section className="mx-auto flex min-h-[calc(100vh-280px)] w-full max-w-[1104px] items-center justify-center">
				<div className="mx-auto max-w-2xl text-center">
					<p className="mb-5 text-sm font-medium text-[#5b6f53]">{eyebrow}</p>
					<h1 className="text-balance text-[38px] font-semibold leading-[1.05] tracking-tight sm:text-[52px]">
						{title}
					</h1>
					<p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#68707b]">
						{description}
					</p>
				</div>
			</section>
		</main>
	);
}
