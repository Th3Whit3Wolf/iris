import { useRef } from "react";

/*
 * Simple React hook that return a boolean;
 *
 * - True at the mount time
 * - Then always false
 */
function useIsFirstRender(): boolean {
	const isFirst = useRef(true);

	if (isFirst.current) {
		isFirst.current = false;

		return true;
	}

	return isFirst.current;
}

export default useIsFirstRender;
