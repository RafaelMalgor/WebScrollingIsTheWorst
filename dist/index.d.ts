declare type CallbackType = (a: boolean) => void;
declare type UnsubscribeType = () => void;
export declare class WebScrollingIsTheWorst {
    private bottomCallbacks;
    private topCallbacks;
    constructor();
    private windowBottomTouched;
    private windowTopTouched;
    onWindowTouchBottom(callback: CallbackType): UnsubscribeType;
    onWindowTouchTop(callback: CallbackType): UnsubscribeType;
    private generateUnsubscription;
    private getScrollXY;
    private getDocHeight;
}
export {};
