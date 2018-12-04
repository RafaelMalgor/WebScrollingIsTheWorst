var WebScrollingIsTheWorst = /** @class */ (function () {
    function WebScrollingIsTheWorst() {
        var _this = this;
        this.callbacks = [];
        document.addEventListener("scroll", function (event) {
            if (_this.getDocHeight() == _this.getScrollXY().scrOfY + window.innerHeight) {
                _this.bottomTouched();
            }
        });
    }
    WebScrollingIsTheWorst.prototype.bottomTouched = function () {
        for (var _i = 0, _a = this.callbacks; _i < _a.length; _i++) {
            var callback = _a[_i];
            callback(true);
        }
    };
    WebScrollingIsTheWorst.prototype.onWindowTouchBottom = function (callback) {
        if (callback) {
            this.callbacks.push(callback);
        }
        return this.generateUnsubscription(callback);
    };
    WebScrollingIsTheWorst.prototype.generateUnsubscription = function (callback) {
        var _this = this;
        return function () {
            _this.callbacks.filter(function (call) {
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
