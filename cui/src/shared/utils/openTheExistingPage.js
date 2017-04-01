export default function (mypage, myname, w, h, scroll) {
  let offset = 20,
    winl = screen.width - parseInt(w),
    wint = (screen.height - parseInt(h)) / 2,
    winprops = '',
    win = null;

  if ((parseFloat(w) + parseFloat(offset)) < screen.width) {
    winl = (screen.width - parseInt(w) - offset) / 2;
  }

  winprops = 'height=' + h + ',width=' + w + ',top=' + wint + ',left=' + winl + ',toolbar=yes,menubar=yes,scrollbars=' + scroll + ',resizable';

  if (mypage.indexOf('?') > 0) {
    mypage = mypage + "&popup_window=yes";
  } else {
    mypage = mypage + "?popup_window=yes";
  }

  win = window.open(mypage, myname, winprops);
  try {
    if (parseInt(navigator.appVersion, 10) >= 4) {
      win.window.focus();
    }
  } catch (err) {
    console.log(err);
  }
}
