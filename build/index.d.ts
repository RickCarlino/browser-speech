export interface PollingProps<T> {
    /** Performs polling until return value is truthy. */
    pollingFunction: () => T | undefined;
    timeout: number;
    interval: number;
}
export declare function poll<T>(input: PollingProps<T>): Promise<T>;
export declare function getVoice(): Promise<SpeechSynthesisVoice[]>;
export declare function talk(text: string, lang?: string): Promise<{}>;
export declare const VERSION = "1.1.1";
