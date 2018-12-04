# WebScrollingIsTheWorst

## Docs
* new WebScrollingIsTheWorst();
    * onWindowTouchBottom(callback): unsubscriber
      * callback: a function that will be executed when the scroll touches the bottom of the page.
      * un-subscriber: a function to unsubscribe the callback.

    * onWindowTouchTop(callback): unsubscriber
      * callback: a function that will be executed when the scroll touches the top of the page.
      * un-subscriber: a function to unsubscribe the callback.

## Example
```javascript
import {WebScrollingIsTheWorst} from "../dist/index.js";
let wsitw = new WebScrollingIsTheWorst();
wsitw.onWindowTouchBottom(() => {
    alert("You touched me bottom!😳");
});

wsitw.onWindowTouchTop(() => {
    alert("You touched me hat!🤭");
});
```
See demo directory for a working demo.