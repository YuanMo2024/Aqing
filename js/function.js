// 函数方法定义
function mouseDown(event) {
  let e = event || window.event;
  e.preventDefault(); // 取消浏览器默认操作
  return false;
}
function mouseMove(event) {
  let e = event || window.event;
  e.preventDefault(); // 取消浏览器默认操作
  mousepos.x =
    (event.touches && event.touches[0] && event.touches[0].clientX) ||
    event.clientX;
  mousepos.y =
    (event.touches && event.touches[0] && event.touches[0].clientY) ||
    event.clientY;
  // mousepos.x = event.touches[0].clientX || event.clientX;
  // mousepos.y = event.touches[0].clientY || event.clientY;
  if (aqingIsDrag) {
    aqingDrag();
  }
  // window.console.log(mousepos.x + "," + mousepos.y);
  return false;
}

// 菜单状态
function menuIsOn() {
  if ("none" != menuground.style.display) {
    return true;
  } else {
    return false;
  }
}

//隐藏菜单
function menuHide() {
  menuground.style.display = "none";
  menuhide.style.display = "none";
  return window.console.log("menuHide()");
}

// 显示菜单
function menuShow() {
  if (window.innerWidth < 1080) {
    menuground.style.display = "block";
  } else {
    menuground.style.display = "block";
    menuhide.style.display = "block";
  }
  return window.console.log("menuShow()");
}

// 阿晴悬浮球
// 显示悬浮球
function aqingShow() {
  window.console.log(tlButton.offsetLeft + "," + tlButton.offsetTop);
  // aqingball.style.left = tlButton.offsetLeft + "px";
  // aqingball.style.top = tlButton.offsetTop + "px";

  aqingball.style.left = tlButton.offsetLeft + ground0.offsetLeft + "px";
  aqingball.style.top = tlButton.offsetTop + "px";

  tlButton.style.display = "none";
  aqingball.style.display = "block";

  // 同步移动阿晴菜单
  aqingground.style.left =
    aqingball.offsetLeft - (3 * aqingball.offsetWidth) / 2 + "px";
  aqingground.style.top =
    aqingball.offsetTop - (3 * aqingball.offsetHeight) / 2 + "px";

  return window.console.log("aqingShow()");
}
// 隐藏悬浮球
function aqingHide() {
  aqingball.style.display = "none";
  tlButton.style.display = "block";
  return window.console.log("aqingHide()");
}

function aqingDown(event) {
  window.console.log("windowinnerHeight = " + window.innerHeight);
  let e = event || window.event;
  e.preventDefault(); // 取消浏览器默认操作
  aqingdownCount++;
  aqingActive();
  updateAqingpos(); // 更新阿晴悬浮球相关坐标参数
  // 长按计时器
  setAqingLongdown = setTimeout(() => {
    if (setAqingClick && 1 == aqingdownCount) {
      aqingClick();
    } else if (!aqingOut()) {
      aqingLongdown();
    }
    aqingdownCount = 0;
    clearTimeout(setAqingClick);
    setAqingClick = null;
    setAqingLongdown = null;
  }, longdownDelay);
  return false;
}
function aqingUp() {
  aqingIsDrag = false;
  aqingActive(true);
  aqingAbsorption(); // 阿晴悬浮球吸附
  clearTimeout(setAqingLongdown);
  setAqingLongdown = null;
  if (1 == aqingdownCount && !aqingOut()) {
    // 单击计时器
    setAqingClick = setTimeout(() => {
      clearTimeout(setAqingLongdown);
      setAqingClick = null;
      setAqingLongdown = null;
      if (1 == aqingdownCount) {
        aqingdownCount = 0;
        aqingClick();
      } else if (1 < aqingdownCount) {
        aqingdownCount = 0;
        aqingDbClick();
      }
    }, clickDelay);
  }
}
function aqingOut() {
  if (
    (aqingball.getBoundingClientRect().width / 2) ** 2 <
    (mousepos.x - aqingball.offsetLeft - aqingball.offsetWidth / 2) ** 2 +
      (mousepos.y - aqingball.offsetTop - aqingball.offsetHeight / 2) ** 2
  ) {
    // window.console.log("aqingout");
    return true;
  } else {
    // window.console.log("aqingin ");
    return false;
  }
}
function aqingClick() {
  window.console.log("aqingclick");
}
function aqingDbClick() {
  window.console.log("aqingdbclick");
}
function aqingLongdown() {
  aqingIsDrag = true;
  aqingball.style.left = mousepos.x - aqingMouseOffset.left + "px";
  aqingball.style.top = mousepos.y - aqingMouseOffset.top + "px";

  // 同步移动阿晴菜单
  aqingground.style.left =
    aqingball.offsetLeft - (3 * aqingball.offsetWidth) / 2 + "px";
  aqingground.style.top =
    aqingball.offsetTop - (3 * aqingball.offsetHeight) / 2 + "px";

  window.console.log("aqinglongdown");
}
function aqingActive(end = false) {
  if (end === false) {
    aqingball.style.scale = 0.9;
  } else {
    aqingball.style.scale = 1;
  }
}
function aqingDrag() {
  let aqingRadius = aqingball.offsetWidth / 2;
  if (
    //鼠标在区间内
    mousepos.x >= aqingMouseInterval.left - aqingRadius &&
    mousepos.x <= aqingMouseInterval.right + aqingRadius &&
    mousepos.y >= aqingMouseInterval.top - aqingRadius &&
    mousepos.y <= aqingMouseInterval.bottom + aqingRadius
  ) {
    aqingball.style.left = mousepos.x - aqingMouseOffset.left + "px";
    aqingball.style.top = mousepos.y - aqingMouseOffset.top + "px";
  } else if (
    // 鼠标在左上角
    mousepos.x < aqingMouseInterval.left - aqingRadius &&
    mousepos.y < aqingMouseInterval.top - aqingRadius
  ) {
    aqingball.style.left =
      aqingMouseInterval.left - aqingMouseOffset.left - aqingRadius + "px";
    aqingball.style.top =
      aqingMouseInterval.top - aqingMouseOffset.top - aqingRadius + "px";
  } else if (
    // 鼠标在上方
    mousepos.x > aqingMouseInterval.left - aqingRadius &&
    mousepos.x < aqingMouseInterval.right + aqingRadius &&
    mousepos.y < aqingMouseInterval.top - aqingRadius
  ) {
    aqingball.style.left = mousepos.x - aqingMouseOffset.left + "px";
    aqingball.style.top =
      aqingMouseInterval.top - aqingMouseOffset.top - aqingRadius + "px";
  } else if (
    // 鼠标在右上角
    mousepos.x > aqingMouseInterval.right + aqingRadius &&
    mousepos.y < aqingMouseInterval.top - aqingRadius
  ) {
    aqingball.style.left =
      aqingMouseInterval.right - aqingMouseOffset.left + aqingRadius + "px";
    aqingball.style.top =
      aqingMouseInterval.top - aqingMouseOffset.top - aqingRadius + "px";
  } else if (
    // 鼠标在右边
    mousepos.x > aqingMouseInterval.right + aqingRadius &&
    mousepos.y > aqingMouseInterval.top - aqingRadius &&
    mousepos.y < aqingMouseInterval.bottom + aqingRadius
  ) {
    aqingball.style.left =
      aqingMouseInterval.right - aqingMouseOffset.left + aqingRadius + "px";
    aqingball.style.top = mousepos.y - aqingMouseOffset.top + "px";
  } else if (
    // 鼠标在右下角
    mousepos.x > aqingMouseInterval.right + aqingRadius &&
    mousepos.y > aqingMouseInterval.bottom - aqingRadius
  ) {
    aqingball.style.left =
      aqingMouseInterval.right - aqingMouseOffset.left + aqingRadius + "px";
    aqingball.style.top =
      aqingMouseInterval.bottom - aqingMouseOffset.top + aqingRadius + "px";
  } else if (
    // 鼠标在下方
    mousepos.x > aqingMouseInterval.left - aqingRadius &&
    mousepos.x < aqingMouseInterval.right + aqingRadius &&
    mousepos.y > aqingMouseInterval.bottom - aqingRadius
  ) {
    aqingball.style.left = mousepos.x - aqingMouseOffset.left + "px";
    aqingball.style.top =
      aqingMouseInterval.bottom - aqingMouseOffset.top + aqingRadius + "px";
  } else if (
    // 鼠标在左下角
    mousepos.x < aqingMouseInterval.left - aqingRadius &&
    mousepos.y > aqingMouseInterval.bottom - aqingRadius
  ) {
    aqingball.style.left =
      aqingMouseInterval.left - aqingMouseOffset.left - aqingRadius + "px";
    aqingball.style.top =
      aqingMouseInterval.bottom - aqingMouseOffset.top + aqingRadius + "px";
  } else if (
    // 鼠标在左边
    mousepos.x < aqingMouseInterval.left - aqingRadius &&
    mousepos.y > aqingMouseInterval.top - aqingRadius &&
    mousepos.y < aqingMouseInterval.bottom + aqingRadius
  ) {
    aqingball.style.left =
      aqingMouseInterval.left - aqingMouseOffset.left - aqingRadius + "px";
    aqingball.style.top = mousepos.y - aqingMouseOffset.top + "px";
  }
  // 同步移动阿晴菜单
  aqingground.style.left =
    aqingball.offsetLeft - (3 * aqingball.offsetWidth) / 2 + "px";
  aqingground.style.top =
    aqingball.offsetTop - (3 * aqingball.offsetHeight) / 2 + "px";
}
function aqingAbsorption(Ishide = true) {
  // window.console.log(Ishide);
  let aqingRadius = aqingball.offsetWidth / 2;
  if (Ishide) {
    if (
      // 上吸附
      aqingball.offsetLeft > aqingInterval.left &&
      aqingball.offsetLeft < aqingInterval.right - 3 * aqingRadius &&
      aqingball.offsetTop <= aqingInterval.top + aqingRadius
    ) {
      aqingball.style.top = aqingInterval.top - aqingRadius + "px";
    } else if (
      // 下吸附
      aqingball.offsetLeft > aqingInterval.left &&
      aqingball.offsetLeft < aqingInterval.right - 3 * aqingRadius &&
      aqingball.offsetTop >= aqingInterval.bottom - 3 * aqingRadius
    ) {
      aqingball.style.top = aqingInterval.bottom - aqingRadius + "px";
    } else if (
      // 左吸附
      aqingball.offsetLeft <=
      aqingInterval.left + aqingRadius
    ) {
      aqingball.style.left = aqingInterval.left - aqingRadius + "px";
    } else if (
      // 右吸附
      aqingball.offsetLeft >=
      aqingInterval.right - 3 * aqingRadius
    ) {
      aqingball.style.left = aqingInterval.right - aqingRadius + "px";
    }
  } else {
    if ((aqingball.offsetTop = aqingInterval.top - aqingRadius)) {
      // 上露出
      aqingball.style.top = aqingInterval.top + "px";
    } else if ((aqingball.offsetTop = aqingInterval.bottom - aqingRadius)) {
      // 下露出
      aqingball.style.top = aqingInterval.bottom + "px";
    } else if ((aqingball.style.left = aqingInterval.left - aqingRadius)) {
      // 左露出
      aqingball.offsetLeft = aqingInterval.left + "px";
    } else if ((aqingball.style.left = aqingInterval.right - aqingRadius)) {
      // 右露出
      aqingball.offsetLeft = aqingInterval.right + "px";
    }
  }
  // 同步移动阿晴菜单
  aqingground.style.left =
    aqingball.offsetLeft - (3 * aqingball.offsetWidth) / 2 + "px";
  aqingground.style.top =
    aqingball.offsetTop - (3 * aqingball.offsetHeight) / 2 + "px";
}
function updateAqingpos() {
  // 更新鼠标与悬浮球的偏移
  // aqingMouseOffset.top = mousepos.y - aqingball.offsetTop;
  // aqingMouseOffset.left = mousepos.x - aqingball.offsetLeft;
  aqingMouseOffset.top = aqingball.offsetHeight / 2;
  aqingMouseOffset.left = aqingball.offsetWidth / 2;
  window.console.log("aqingMouseOffset = ");
  window.console.log(aqingMouseOffset);
  // 更新悬浮球移动区间
  aqingInterval.top = 0;
  aqingInterval.bottom = window.innerHeight;
  aqingInterval.left = ground0.offsetLeft;
  aqingInterval.right = ground0.offsetLeft + ground0.offsetWidth;
  window.console.log("aqingInterval = ");
  window.console.log(aqingInterval);
  // 更新鼠标拖拽悬浮球的移动区间
  aqingMouseInterval.top = aqingInterval.top + aqingMouseOffset.top;
  aqingMouseInterval.bottom =
    aqingInterval.bottom + aqingMouseOffset.top - aqingball.offsetHeight;
  aqingMouseInterval.left = aqingInterval.left + aqingMouseOffset.left;
  aqingMouseInterval.right =
    aqingInterval.right + aqingMouseOffset.left - aqingball.offsetWidth;
  window.console.log("mousepos = ");
  window.console.log(mousepos);
  window.console.log("aqingMouseInterval = ");
  window.console.log(aqingMouseInterval);
}

// 米游社链接
function gotoWiki() {
  window.open(
    "https://bbs.mihoyo.com/ys/obc/?bbs_presentation_style=no_header&utm_source=bbs&utm_medium=mys&utm_campaign=pcbox"
  );
  return window.console.log("gotoWiki");
}