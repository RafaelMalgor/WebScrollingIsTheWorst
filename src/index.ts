type CallbackType = (a: boolean) => void;
type UnsubscribeType = () => void;
type ScrollPosition = { scrOfX: number, scrOfY: number };
export class WebScrollingIsTheWorst {
    private bottomCallbacks: CallbackType[] = [];
    private topCallbacks: CallbackType[] = [];
    private upCallbacks: CallbackType[] = [];
    private downCallbacks: CallbackType[] = [];
    private moveCallbacks: CallbackType[] = [];
    latestPosition: ScrollPosition;
    constructor() {
        this.latestPosition = this.getScrollXY();
        document.addEventListener("scroll", (event) => {
            if (this.isOnBottom()) {
                this.runCallbacks(this.bottomCallbacks);
            }
            if (this.isOnTop()) {
                this.runCallbacks(this.topCallbacks);
            }
            if (this.movedUp()) {
                this.runCallbacks(this.upCallbacks);
            }
            if (this.movedDown()) {
                this.runCallbacks(this.downCallbacks);
            }
            this.runCallbacks(this.moveCallbacks);
            this.latestPosition = this.getScrollXY();
        });
    }

    isOnBottom(): boolean {
        return this.getDocHeight() == this.getScrollXY().scrOfY + window.innerHeight;
    }

    isOnTop(): boolean {
        return this.getScrollXY().scrOfY == 0;
    }

    scrollToTop(duration?: number, stepSize?: number) {
        let dur = 1000;
        let stepS = 15;
        if (duration) {
            dur = duration;
        }
        if (stepSize) {
            stepS = stepSize;
        }
        let totalOfSteps = this.getScrollXY().scrOfY / stepS;
        let speed = totalOfSteps / dur;
        let intervalDur = 1 / speed;
        let interval = setInterval(() => {
            if (!this.isOnTop()) {
                window.scrollBy(0, -stepS);
            } else { clearInterval(interval) }
        }, intervalDur);
    }

    scrollToBottom(duration?: number, stepSize?: number) {
        let dur = 1000;
        let stepS = 15;
        if (duration) {
            dur = duration;
        }
        if (stepSize) {
            stepS = stepSize;
        }
        let totalOfSteps = this.getScrollXY().scrOfY / stepS;
        let speed = totalOfSteps / dur;
        let intervalDur = 1 / speed;
        let interval = setInterval(() => {
            if (!this.isOnBottom()) {
                window.scrollBy(0, stepS);
            } else { clearInterval(interval) }
        }, intervalDur);
    }

    onWindowTouchBottom(callback: CallbackType): UnsubscribeType {
        return this.registerCallback(this.bottomCallbacks, callback);
    }

    onWindowTouchTop(callback: CallbackType): UnsubscribeType {
        return this.registerCallback(this.topCallbacks, callback);
    }

    onScrollMoveUp(callback: CallbackType): UnsubscribeType {
        return this.registerCallback(this.upCallbacks, callback);
    }

    onScrollMoveDown(callback: CallbackType): UnsubscribeType {
        return this.registerCallback(this.downCallbacks, callback);
    }

    onScrollMove(callback: CallbackType): UnsubscribeType {
        return this.registerCallback(this.moveCallbacks, callback);
    }

    private registerCallback(callbacks: CallbackType[], callback: CallbackType): UnsubscribeType {
        if (callback) {
            callbacks.push(callback);
        }
        return this.generateUnsubscription(callbacks, callback);
    }

    private movedUp(): boolean {
        return this.latestPosition.scrOfY > this.getScrollXY().scrOfY;
    }

    private movedDown(): boolean {
        return this.latestPosition.scrOfY < this.getScrollXY().scrOfY;
    }

    private runCallbacks(callbacks: CallbackType[]) {
        for (let callback of callbacks) {
            callback(true);
        }
    }

    private generateUnsubscription(callbacks: CallbackType[], callback: CallbackType): UnsubscribeType {
        return () => {
            let filtered = callbacks.filter((call) => {
                call !== callback
            })
            if (callbacks == this.topCallbacks) { this.topCallbacks = filtered; }
            if (callbacks == this.bottomCallbacks) { this.topCallbacks = filtered; }
            if (callbacks == this.upCallbacks) { this.topCallbacks = filtered; }
            if (callbacks == this.downCallbacks) { this.topCallbacks = filtered; }
            if (callbacks == this.moveCallbacks) { this.topCallbacks = filtered; }
        };
    }

    //below taken from http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
    private getScrollXY(): ScrollPosition {
        var scrOfX = 0, scrOfY = 0;
        if (typeof (window.pageYOffset) == 'number') {
            //Netscape compliant
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            //DOM compliant
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }
        return { scrOfX, scrOfY };
    }

    //taken from http://james.padolsey.com/javascript/get-document-height-cross-browser/
    private getDocHeight(): number {
        var D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement ? D.documentElement.scrollHeight : 0,
            D.body.offsetHeight, D.documentElement ? D.documentElement.offsetHeight : 0,
            D.body.clientHeight, D.documentElement ? D.documentElement.clientHeight : 0
        );
    }
}

