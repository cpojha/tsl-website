"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CheckoutSuccessContent() {
	const searchParams = useSearchParams();
	const [status, setStatus] = useState<"success" | "failed">("success");

	useEffect(() => {
		const statusParam = searchParams.get("status");
		if (statusParam === "failed") {
			setStatus("failed");
		} else {
			setStatus("success");
		}
	}, [searchParams]);

	useEffect(() => {
		const timer = setTimeout(() => {
			const params = new URLSearchParams();
			const subscriptionId = searchParams.get("subscription_id");
			const emailParam = searchParams.get("email");
			const env = searchParams.get("env");

			if (subscriptionId) params.set("subscription_id", subscriptionId);
			if (status) params.set("status", status);
			if (emailParam) params.set("email", emailParam);

			const protocol = env === "dev" ? "invook-dev" : "invook";
			const query = params.toString();
			window.location.href = `${protocol}://payment/success${query ? `?${query}` : ""}`;
		}, 2000);

		return () => clearTimeout(timer);
	}, [searchParams, status]);

	const isDev = searchParams.get("env") === "dev";

	return (
		<div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--background)" }}>
			<div className="text-center max-w-md w-full">
				<div className="mb-8">
					<span className="text-3xl font-medium" style={{ color: status === "success" ? "var(--primary)" : "var(--destructive)" }}>
						{isDev ? "Invook Dev" : "Invook"}
					</span>
				</div>

				<div className="mb-6">
					<div
						className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center"
						style={{ background: status === "success" ? "oklch(0.9 0.1 150)" : "oklch(0.85 0.15 20)" }}
					>
						{status === "success" ? (
							<svg
								className="w-8 h-8"
								style={{ color: "oklch(0.55 0.15 150)" }}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						) : (
							<svg
								className="w-8 h-8"
								style={{ color: "oklch(0.6 0.18 20)" }}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						)}
					</div>
					<h1 className="text-2xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>
						{status === "success" ? "Payment Successful!" : "Payment Failed"}
					</h1>
					<p style={{ color: "var(--muted-foreground)" }}>
						{status === "success"
							? "Your payment has been processed successfully. You can now return to the app."
							: "There was an issue processing your payment. Please try again or contact support."}
					</p>
				</div>

				{searchParams.get("email") && (
					<div className="mb-4">
						<p style={{ color: "var(--muted-foreground)" }}>Logged in as:</p>
						<p className="font-mono text-lg" style={{ color: "var(--foreground)" }}>
							{searchParams.get("email")}
						</p>
					</div>
				)}

				{status === "failed" && (
					<div className="mb-4">
						<p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
							Redirecting to retry...
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default function CheckoutSuccessPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
					<span style={{ color: "var(--muted-foreground)" }}>Loading...</span>
				</div>
			}
		>
			<CheckoutSuccessContent />
		</Suspense>
	);
}
