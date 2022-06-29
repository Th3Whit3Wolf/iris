import { tmpRxData } from "./tmpRxData";
import { RxModem } from "#components";
import { render } from "#utils";
import { describe, expect, test, beforeEach } from "vitest";

test.skip("renders server and team name", () => {
	render(<RxModem unit={1} tmpRxData={tmpRxData.filter(y => y.unit === 1)} />);
});
