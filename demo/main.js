import {WebScrollingIsTheWorst} from "../dist/index.js";
let wsitw = new WebScrollingIsTheWorst();
wsitw.onWindowTouchBottom(() => {
    alert("U touched me bottom!😳");
});
