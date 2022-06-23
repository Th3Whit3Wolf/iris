export class RfEnvironment {
	#signals: Array<any> = [];
	#targets: any;
	#teams: any;
	#antennas: any;
	#specAs: any;
	#transmitters: any;
	#receivers: any;

	set signals(signals: Array<any>) {
		this.#signals = signals;
	}

	get signals() {
		return this.#signals;
	}

	set targets(targets: any) {
		this.#targets = targets;
	}

	get targets() {
		return this.#targets;
	}

	set teams(teams: any) {
		this.#teams = teams;
	}

	get teams() {
		return this.#teams;
	}

	set antennas(antennas: any) {
		this.#antennas = antennas;
	}

	get antennas() {
		return this.#antennas;
	}

	set specAs(specAs: any) {
		this.#specAs = specAs;
	}

	get specAs() {
		return this.#specAs;
	}

	set transmitters(transmitters: any) {
		this.transmitters = transmitters;
	}

	get transmitters() {
		return this.#transmitters;
	}

	set receivers(receivers: any) {
		this.#receivers = receivers;
	}

	get receivers() {
		return this.#receivers;
	}

	addSignal(signal: any) {
		this.#signals.push(signal);
	}

	getSignals() {
		return this.signals;
	}

	updateSignals(update: any) {
		// Purge all signals that are from this team
		this.signals = this.signals.filter((signal: any) => {
			return signal.team_id !== update[0].team_id;
		});
		// Add the new signals
		update.forEach((signal: any) => {
			if (signal.transmitting) {
				//this.signals.push({ ...{ team_id: signal.team_id }, ...signal });
				this.signals.push(signal);
			}
		});
	}

	clearSignals() {
		this.signals = [];
	}

	removeSignal(signal: any) {
		const index = this.signals.indexOf(signal);
		if (index > -1) {
			this.signals.splice(index, 1);
		}
	}
}
