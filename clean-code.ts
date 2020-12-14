
type EnumDictionary<T extends string | number, U> = {
    [K in T]: U;
};

enum Signal {
    PERFECT = "PERFECT",
    EXCELLENT = "EXCELLENT",
    OK = "OK",
    AVERAGE = "AVERAGE",
    POOR = "POOR",
    BAD = "BAD"
}

enum SpeedColor {
    PERFECT = "GREEN",
    Average = "YELLOW",
    BED = "RED"
}

interface InternetConnection {
    signal: string;
    color: string;
    speedValue: number;
}

interface SignalRange {
    min: number;
    max: number;
}

const SLOW_INTERNAT_MIN_RANGE: number = 40
const FAST_INTERNAT_MIN_RANGE: number = 80

class InternetSignal {
    private signalStatus: string[] = [];

    private signalDictioneryRangeNumber: EnumDictionary<Signal, SignalRange> = {
        [Signal.PERFECT]: { min: 96, max: 100, },
        [Signal.EXCELLENT]: { min: 81, max: 95 },
        [Signal.OK]: { min: 61, max: 80 },
        [Signal.AVERAGE]: { min: 41, max: 60 },
        [Signal.POOR]: { min: 31, max: 40 },
        [Signal.BAD]: { min: 0, max: 30 },
    }
    public fastConnetionGroup: InternetConnection[] = [];
    public mediumConnetionGroup: InternetConnection[] = [];
    public slowConnetionGroup: InternetConnection[] = [];

    constructor(signalStatus: string[]) {
        this.signalStatus = signalStatus
    }

    getRandomRangeSignalNumber(signal: string): number {
        const signalRange: SignalRange = this.signalDictioneryRangeNumber[signal.toUpperCase()];
        return Math.floor(Math.random() * (signalRange.max - signalRange.min + 1) + signalRange.min);
    }

    getConnection(signal: Signal, speedValue: number, color: string): InternetConnection {
        return { signal, speedValue, color };
    }

    isFastConnection(speedValue: number): boolean {
        return speedValue >= FAST_INTERNAT_MIN_RANGE;
    }

    isMediumConnection(speedValue: number): boolean {
        return speedValue >= SLOW_INTERNAT_MIN_RANGE && speedValue < FAST_INTERNAT_MIN_RANGE;
    }

    parseInternetConnection(): void {
        this.signalStatus.forEach((signal: string) => {

            const speedValue: number = this.getRandomRangeSignalNumber(signal);
            const color: string = this.getSpeedColorByNumber(speedValue);

            const isInternetFast: boolean = this.isFastConnection(speedValue);
            const isInternetMediumSpeed: boolean = this.isMediumConnection(speedValue);

            if (isInternetFast) {
                this.addConnectionToGroup({ signal, speedValue, color }, this.fastConnetionGroup);
                return;
            }

            else if (isInternetMediumSpeed) {
                this.addConnectionToGroup({ signal, speedValue, color }, this.mediumConnetionGroup);
                return;
            }

            this.addConnectionToGroup({ signal, speedValue, color }, this.slowConnetionGroup);
        })

    }

    addConnectionToGroup(connection: InternetConnection, connetcionGroup: InternetConnection[]): void {
        connetcionGroup.push(connection)
    }

    getSpeedColorByNumber(colorNumber: number): SpeedColor {
        const isInternetFast: boolean = this.isFastConnection(colorNumber);
        const isInternetMediumSpeed: boolean = this.isMediumConnection(colorNumber);

        if (isInternetFast) {
            return SpeedColor.PERFECT
        }
        if (isInternetMediumSpeed) {
            return SpeedColor.Average
        }
        return SpeedColor.BED
    }

}
const internetSignalArray: string[] = ["Perfect", "OK", "Average",
    "Bad", "Bad", "Poor", "Excellent", "Poor", "Perfect"]

const internetSignal = new InternetSignal(internetSignalArray);
internetSignal.parseInternetConnection();


console.table(internetSignal.fastConnetionGroup);
console.table(internetSignal.slowConnetionGroup);
console.table(internetSignal.mediumConnetionGroup);







