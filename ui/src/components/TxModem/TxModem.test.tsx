import { TxModem } from "#components";
import { tmpRxData } from "../RxModem/tmpRxData";
import { render } from "@testing-library/react";
import { describe, expect, test, beforeEach } from "vitest";

test.skip("renders server and team name", () => {
	render(<TxModem unit={1} tmpTxData={tmpRxData.filter(y => y.unit === 1)} />);
});
