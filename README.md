# WebScrollingIsTheWorst

## Docs
* new WebScrollingIsTheWorst();
    * onWindowTouchBottom(callback): unsubscriber
      * callback: a function that will be executed when the scroll touches the bottom of the page.
      * unsubscriber: a function to unsubscribe the callback.

    * onWindowTouchTop(callback): unsubscriber
      * callback: a function that will be executed when the scroll touches the top of the page.
      * unsubscriber: a function to unsubscribe the callback.

    * onScrollMoveUp(callback):unsubscriber
      * callback: a function that will be executed when the scroll moves upward.
      * unsubscriber: a function to unsubscribe the callback.


    * onScrollMoveDown(callback):unsubscriber
      * callback: a function that will be executed when the scroll moves downward.
      * unsubscriber: a function to unsubscribe the callback.

    * onScrollMove(callback):unsubscriber
      * callback: a function that will be executed when the scroll moves in any direction.
      * unsubscriber: a function to unsubscribe the callback.

    * scrollToTop(duration?: number, stepSize?: number)
      * duration?: how long should it take to get to the top in milliseconds.
      * stepSize?: how rough or smooth is the trip.

    * scrollToBottom(duration?: number, stepSize?: number)
      * duration?: how long should it take to get to the bottom in milliseconds.
      * stepSize?: how rough or smooth is the trip.

    * isOnBottom(): isit
      * isit: true if scroll already on bottom.

    * isOnTop(): isit
      * isit: true if scroll already on top.



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