declare type CallbackType = (a: boolean) => void;
declare type UnsubscribeType = () => void;
export declare class WebScrollingIsTheWorst {
    private callbacks;
    constructor();
    private bottomTouched;
    onWindowTouchBottom(callback: CallbackType): UnsubscribeType;
    private generateUnsubscription;
    private getScrollXY;
    private getDocHeight;
}
export {};
