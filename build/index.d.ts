export interface PollingProps<T> {
    /** Finishes polling if return value is truthy. */
    predicate: () => T | undefined;
    timeout: number;
    interval: number;
}
export declare function poll<T>(input: PollingProps<T>): Promise<T>;
export declare function getVoice(): Promise<SpeechSynthesisVoice[]>;
export declare function talk(text: string, lang?: string): Promise<{}>;
export declare const VERSION = "1.0.1";
