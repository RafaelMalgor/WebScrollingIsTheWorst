type CallbackType = (a: boolean) => void;
type UnsubscribeType = () => void;
type ScrollPosition = { scrOfX: number, scrOfY: number };
export class WebScrollingIsTheWorst {
    private bottomCallbacks: CallbackType[] = [];
    private topCallbacks: CallbackType[] = [];
    private upCallbacks: CallbackType[] = [];;
    private downCallbacks: CallbackType[] = [];;
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
        if (callback) {
            this.bottomCallbacks.push(callback);
        }
        return this.generateUnsubscription(this.bottomCallbacks, callback);
    }

    onWindowTouchTop(callback: CallbackType): UnsubscribeType {
        if (callback) {
            this.topCallbacks.push(callback);
        }
        return this.generateUnsubscription(this.topCallbacks, callback);
    }

    onScrollMoveUp(callback: CallbackType) {
        if (callback) {
            this.upCallbacks.push(callback);
        }
        return this.generateUnsubscription(this.upCallbacks, callback);
    }

    onScrollMoveDown(callback: CallbackType) {
        if (callback) {
            this.downCallbacks.push(callback);
        }
        return this.generateUnsubscription(this.downCallbacks, callback);
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
            callbacks.filter((call) => {
                call !== callback
            })
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

