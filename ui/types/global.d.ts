import * as React from "react";

export {};

declare global {
	interface Window {
		iris: IrisApp;
	}

	interface WindowEventMap {
		"local-storage": CustomEvent;
	}

	namespace JSX {
		interface IntrinsicElements {
			center: React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
			img: React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
		}
	}
}
