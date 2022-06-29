import { useIsFirstRender } from "#hooks";
import { DependencyList, EffectCallback, useEffect } from "react";

/*
 * Just modified version of useEffect that is skipping the first render.
 */
function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
	// eslint-disable-next-line testing-library/render-result-naming-convention
	const isFirst = useIsFirstRender();

	useEffect(() => {
		if (!isFirst) {
			return effect();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
}

export default useUpdateEffect;
