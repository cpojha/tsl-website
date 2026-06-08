"use client";

import posthog from "posthog-js";
import { useCallback } from "react";

export const useAnalytics = () => {
	const capture = useCallback((eventName: string, properties?: Record<string, unknown>) => {
		posthog.capture(eventName, properties);
	}, []);

	const identify = useCallback((distinctId: string, properties?: Record<string, unknown>) => {
		posthog.identify(distinctId, properties);
	}, []);

	const reset = useCallback(() => {
		posthog.reset();
	}, []);

	return {
		capture,
		identify,
		reset,
	};
};
