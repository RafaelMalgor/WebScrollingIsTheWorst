declare type CallbackType = (a: boolean) => void;
declare type UnsubscribeType = () => void;
declare type ScrollPosition = {
    scrOfX: number;
    scrOfY: number;
};
export declare class WebScrollingIsTheWorst {
    private bottomCallbacks;
    private topCallbacks;
    private upCallbacks;
    private downCallbacks;
    latestPosition: ScrollPosition;
    constructor();
    isOnBottom(): boolean;
    isOnTop(): boolean;
    scrollToTop(duration?: number, stepSize?: number): void;
    scrollToBottom(duration?: number, stepSize?: number): void;
    onWindowTouchBottom(callback: CallbackType): UnsubscribeType;
    onWindowTouchTop(callback: CallbackType): UnsubscribeType;
    onScrollMoveUp(callback: CallbackType): UnsubscribeType;
    onScrollMoveDown(callback: CallbackType): UnsubscribeType;
    private movedUp;
    private movedDown;
    private runCallbacks;
    private generateUnsubscription;
    private getScrollXY;
    private getDocHeight;
}
export {};
