import FontFaceObserver from "fontfaceobserver";

export default function() {
  new FontFaceObserver("ProximaNova").load().then(() => {
    return document.documentElement.classList.add("ProximaNova--loaded");
  });
  new FontFaceObserver("aui_icons").load().then(() => {
    document.documentElement.classList.add("aui_icons--loaded");
  });
}
