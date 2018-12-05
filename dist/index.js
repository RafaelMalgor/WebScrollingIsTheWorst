var WebScrollingIsTheWorst = /** @class */ (function () {
    function WebScrollingIsTheWorst() {
        var _this = this;
        this.bottomCallbacks = [];
        this.topCallbacks = [];
        this.upCallbacks = [];
        this.downCallbacks = [];
        this.moveCallbacks = [];
        this.latestPosition = this.getScrollXY();
        document.addEventListener("scroll", function (event) {
            if (_this.isOnBottom()) {
                _this.runCallbacks(_this.bottomCallbacks);
            }
            if (_this.isOnTop()) {
                _this.runCallbacks(_this.topCallbacks);
            }
            if (_this.movedUp()) {
                _this.runCallbacks(_this.upCallbacks);
            }
            if (_this.movedDown()) {
                _this.runCallbacks(_this.downCallbacks);
            }
            _this.runCallbacks(_this.moveCallbacks);
            _this.latestPosition = _this.getScrollXY();
        });
    }
    WebScrollingIsTheWorst.prototype.isOnBottom = function () {
        return this.getDocHeight() == this.getScrollXY().scrOfY + window.innerHeight;
    };
    WebScrollingIsTheWorst.prototype.isOnTop = function () {
        return this.getScrollXY().scrOfY == 0;
    };
    WebScrollingIsTheWorst.prototype.scrollToTop = function (duration, stepSize) {
        var _this = this;
        var dur = 1000;
        var stepS = 15;
        if (duration) {
            dur = duration;
        }
        if (stepSize) {
            stepS = stepSize;
        }
        var totalOfSteps = this.getScrollXY().scrOfY / stepS;
        var speed = totalOfSteps / dur;
        var intervalDur = 1 / speed;
        var interval = setInterval(function () {
            if (!_this.isOnTop()) {
                window.scrollBy(0, -stepS);
            }
            else {
                clearInterval(interval);
            }
        }, intervalDur);
    };
    WebScrollingIsTheWorst.prototype.scrollToBottom = function (duration, stepSize) {
        var _this = this;
        var dur = 1000;
        var stepS = 15;
        if (duration) {
            dur = duration;
        }
        if (stepSize) {
            stepS = stepSize;
        }
        var totalOfSteps = this.getScrollXY().scrOfY / stepS;
        var speed = totalOfSteps / dur;
        var intervalDur = 1 / speed;
        var interval = setInterval(function () {
            if (!_this.isOnBottom()) {
                window.scrollBy(0, stepS);
            }
            else {
                clearInterval(interval);
            }
        }, intervalDur);
    };
    WebScrollingIsTheWorst.prototype.onWindowTouchBottom = function (callback) {
        return this.registerCallback(this.bottomCallbacks, callback);
    };
    WebScrollingIsTheWorst.prototype.onWindowTouchTop = function (callback) {
        return this.registerCallback(this.topCallbacks, callback);
    };
    WebScrollingIsTheWorst.prototype.onScrollMoveUp = function (callback) {
        return this.registerCallback(this.upCallbacks, callback);
    };
    WebScrollingIsTheWorst.prototype.onScrollMoveDown = function (callback) {
        return this.registerCallback(this.downCallbacks, callback);
    };
    WebScrollingIsTheWorst.prototype.onScrollMove = function (callback) {
        return this.registerCallback(this.moveCallbacks, callback);
    };
    WebScrollingIsTheWorst.prototype.registerCallback = function (callbacks, callback) {
        if (callback) {
            callbacks.push(callback);
        }
        return this.generateUnsubscription(callbacks, callback);
    };
    WebScrollingIsTheWorst.prototype.movedUp = function () {
        return this.latestPosition.scrOfY > this.getScrollXY().scrOfY;
    };
    WebScrollingIsTheWorst.prototype.movedDown = function () {
        return this.latestPosition.scrOfY < this.getScrollXY().scrOfY;
    };
    WebScrollingIsTheWorst.prototype.runCallbacks = function (callbacks) {
        for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
            var callback = callbacks_1[_i];
            callback(true);
        }
    };
    WebScrollingIsTheWorst.prototype.generateUnsubscription = function (callbacks, callback) {
        var _this = this;
        return function () {
            var filtered = callbacks.filter(function (call) {
                call !== callback;
            });
            if (callbacks == _this.topCallbacks) {
                _this.topCallbacks = filtered;
            }
            if (callbacks == _this.bottomCallbacks) {
                _this.topCallbacks = filtered;
            }
            if (callbacks == _this.upCallbacks) {
                _this.topCallbacks = filtered;
            }
            if (callbacks == _this.downCallbacks) {
                _this.topCallbacks = filtered;
            }
            if (callbacks == _this.moveCallbacks) {
                _this.topCallbacks = filtered;
            }
        };
    };
    //below taken from http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
    WebScrollingIsTheWorst.prototype.getScrollXY = function () {
        var scrOfX = 0, scrOfY = 0;
        if (typeof (window.pageYOffset) == 'number') {
            //Netscape compliant
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        }
        else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            //DOM compliant
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        }
        else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }
        return { scrOfX: scrOfX, scrOfY: scrOfY };
    };
    //taken from http://james.padolsey.com/javascript/get-document-height-cross-browser/
    WebScrollingIsTheWorst.prototype.getDocHeight = function () {
        var D = document;
        return Math.max(D.body.scrollHeight, D.documentElement ? D.documentElement.scrollHeight : 0, D.body.offsetHeight, D.documentElement ? D.documentElement.offsetHeight : 0, D.body.clientHeight, D.documentElement ? D.documentElement.clientHeight : 0);
    };
    return WebScrollingIsTheWorst;
}());
export { WebScrollingIsTheWorst };
