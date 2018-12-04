declare type CallbackType = (a: boolean) => void;
declare type UnsubscribeType = () => void;
export declare class WebScrollingIsTheWorst {
    private bottomCallbacks;
    private topCallbacks;
    constructor();
    isOnBottom(): boolean;
    isOnTop(): boolean;
    scrollToTop(duration?: number, stepSize?: number): void;
    scrollToBottom(duration?: number, stepSize?: number): void;
    onWindowTouchBottom(callback: CallbackType): UnsubscribeType;
    onWindowTouchTop(callback: CallbackType): UnsubscribeType;
    private windowBottomTouched;
    private windowTopTouched;
    private generateUnsubscription;
    private getScrollXY;
    private getDocHeight;
}
export {};
