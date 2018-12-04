import { WebScrollingIsTheWorst } from "../dist/index.js";
let wsitw = new WebScrollingIsTheWorst();
wsitw.onWindowTouchBottom(() => {
    alert("You touched me bottom!😳");
});

wsitw.onWindowTouchTop(() => {
    alert("You touched me hat!🤭");
});

document.querySelector("#scroll-top").addEventListener("click", () => {
    wsitw.scrollToTop();
});

document.querySelector("#scroll-bottom").addEventListener("click", () => {
    wsitw.scrollToBottom();
});
