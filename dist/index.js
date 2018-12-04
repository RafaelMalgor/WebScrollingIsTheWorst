var WebScrollingIsTheWorst = /** @class */ (function () {
    function WebScrollingIsTheWorst() {
        var _this = this;
        this.bottomCallbacks = [];
        this.topCallbacks = [];
        document.addEventListener("scroll", function (event) {
            if (_this.getDocHeight() == _this.getScrollXY().scrOfY + window.innerHeight) {
                _this.windowBottomTouched();
            }
            if (_this.getScrollXY().scrOfY == 0) {
                _this.windowTopTouched();
            }
        });
    }
    WebScrollingIsTheWorst.prototype.windowBottomTouched = function () {
        for (var _i = 0, _a = this.bottomCallbacks; _i < _a.length; _i++) {
            var callback = _a[_i];
            callback(true);
        }
    };
    WebScrollingIsTheWorst.prototype.windowTopTouched = function () {
        for (var _i = 0, _a = this.topCallbacks; _i < _a.length; _i++) {
            var callback = _a[_i];
            callback(true);
        }
    };
    WebScrollingIsTheWorst.prototype.onWindowTouchBottom = function (callback) {
        if (callback) {
            this.bottomCallbacks.push(callback);
        }
        return this.generateUnsubscription(this.bottomCallbacks, callback);
    };
    WebScrollingIsTheWorst.prototype.onWindowTouchTop = function (callback) {
        if (callback) {
            this.topCallbacks.push(callback);
        }
        return this.generateUnsubscription(this.topCallbacks, callback);
    };
    WebScrollingIsTheWorst.prototype.generateUnsubscription = function (callbacks, callback) {
        return function () {
            callbacks.filter(function (call) {
                call !== callback;
            });
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