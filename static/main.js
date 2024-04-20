// 全局参数
const pointer = {
  type: "",
  x: 0,
  y: 0,
};
let logLCount = 0;
let logRCount = 0;

// Button元素
const logTl = new Button("log-tl"); //log左上角拖拽按钮
const logTr = new Button("log-tr"); //log右上角关闭按钮
const tlbutton = new Button("tlbutton"); //左上阿晴图标
const trbutton = new Button("trbutton"); //右上按钮
const menu1 = new Daohang("menu1", "a-m-d-menu1"); //导航设置
const menu2 = new Daohang("menu2", "a-m-d-menu2"); //导航米游wiki
const menu3 = new Daohang("menu3", "a-m-d-menu3"); //导航优化方案
const menu4 = new Daohang("menu4", "a-m-d-menu4"); //导航DIY方案
const menu5 = new Daohang("menu5", "a-m-d-menu5"); //导航信息录入
const aqingBall = new Button("aqing-ball"); //阿晴悬浮按钮

// div元素
const menu = new Menu("menubox", "menuground");
const fixedbox = document.getElementById("fixedbox");

// 初始化
Init = () => {
  // DivHide("log", true);
  document.getElementById("logL").innerHTML +=
    "<p id = 'p0' >- logLCount : " + logLCount + "</p>";
  document.getElementById("logL").innerHTML +=
    "<p id = 'p01' >- logRCount : " + logRCount + "</p>";

  if (window.innerWidth > 600) {
    menu.isShow = true;

    this.menuboxGround.classList.add("menuboxGround-show-styleaf");
    this.menuboxGround.classList.remove("menuboxGround-show-stylebf");

    this.menuboxGround.classList.remove("menuboxGround-show-stylebf-over");

    this.menubox.classList.add("menubox-show-styleaf");
    this.menubox.classList.remove("menubox-show-stylebf");

    this.menu.classList.add("shadow");
  }
  if (window.innerWidth > 960) {
    this.menuground.classList.add("menuground-show-styleaf");
    this.menuground.classList.remove("menuground-show-stylebf");
  }
  window.console.log(menu);
  menu.AddWithAdapt();
};
Init();

// 全局监听
window.addEventListener("mousemove", (event) => {
  whenPointerMove(event);
});
window.addEventListener("touchmove", (event) => {
  whenPointerMove(event);
});

// 全局监听指针位置
function whenPointerMove(event) {
  log(event.type, 1);
  pointer.type = event.type;
  if (event.type === "touchmove") {
    pointer.x = Number(event.touches[0].clientX.toFixed(1));
    pointer.y = Number(event.touches[0].clientY.toFixed(1));
  } else if (event.type === "mousemove") {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  }
  log("pointer : " + pointer.x + "," + pointer.y, 2);

  log(
    "pointer in tlbutton? - " + IsInDiv(pointer.x, pointer.y, tlbutton.div),
    3
  );
}

log(window.innerWidth + "," + window.innerHeight);

// log面板
// tl按钮，拖拽
logTl.drag = new DivDrag(document.getElementById("log"));
logTl.AddButton();
logTl.TouchDown = () => {
  logTl.div.classList.add("bg-color--theme-color-a100-40");
  logTl.drag.DragStart();
};
logTl.MouseDownL = () => {
  logTl.drag.DragStart();
};
logTl.TouchUp = () => {
  logTl.div.classList.remove("bg-color--theme-color-a100-40");
  logTl.drag.DragEnd();
};
logTl.MouseUpL = () => {
  logTl.drag.DragEnd();
};
logTl.MouseUpOutL = () => {
  logTl.drag.DragEnd();
};
// tr按钮，关闭
logTr.AddButton();
logTr.Click = () => {
  DivHide("log", "grid", true);
};

// 顶栏按钮
// 左上阿晴图标
tlbutton.AddButton();
tlbutton.aniGround = document.getElementById("ani-ground-tlbutton");
tlbutton.aniGroundCircle1 = document.getElementById("ani-Circle1-tlbutton");
tlbutton.MouseIn = () => {
  tlbutton.UpdatePos();
  DivMove(tlbutton.pos.cx, tlbutton.pos.cy, tlbutton.aniGround);
  DivShow(tlbutton.aniGround);
  if (!tlbutton.isDown) {
    SetScale(tlbutton.div, 1.1);
  }
};
tlbutton.MouseOut = () => {
  DivHide(tlbutton.aniGround);
  if (!tlbutton.isDown) {
    SetScale(tlbutton.div, 1);
  }
};
tlbutton.TouchDown = () => {
  log("tltouchdown");
  tlbutton.div.classList.add("button-Click-scale");
  tlbutton.UpdatePos();
  DivMove(tlbutton.pos.cx, tlbutton.pos.cy, tlbutton.aniGround);
  DivShow(tlbutton.aniGround);
  setTimeout(() => {
    tlbutton.div.classList.remove("button-Click-scale");
    DivHide(tlbutton.aniGround);
  }, 150);
};
tlbutton.MouseDownL = () => {
  log("tlmousedownL");
  SetScale(tlbutton.div, 0.9);
  SetScale(tlbutton.aniGroundCircle1, 1);
};
tlbutton.WhenMouseUp = () => {
  log("tlUp");
  if (tlbutton.isMouseOut) {
    SetScale(tlbutton.div, 1);
  } else {
    SetScale(tlbutton.div, 1.1);
  }
  SetScale(tlbutton.aniGroundCircle1, 1.5);
};
tlbutton.Click = () => {
  setTimeout(() => {
    DivShowOrHide(aqingBall.ground);
  }, 150);
};

// 顶栏右上角图标
trbutton.AddButton();
trbutton.TouchDown = () => {
  trbutton.div.classList.add("button-Click-scale");
  setTimeout(() => {
    trbutton.div.classList.remove("button-Click-scale");
  }, 150);
};
trbutton.Click = () => {
  menu.ShowOrHide();
};

// 菜单栏
// 设置
menu1.Click = () => {
  DivShowOrHide("log", "grid", true);
};

// 米游wiki
menu2.Click = () => {
  window.open(
    "https://bbs.mihoyo.com/ys/obc/?bbs_presentation_style=no_header&utm_source=bbs&utm_medium=mys&utm_campaign=pcbox"
  );
};

// 优化方案
menu3.Click = () => {
  log("优化方案menu3-Click");
};

// DIY方案
menu4.Click = () => {
  log("DIY方案menu4-Click");
};

// 信息录入
menu5.Click = () => {
  log("信息录入menu5-Click");
};

// 阿晴悬浮球
aqingBall.AddButton(false);
aqingBall.ground = document.getElementById("aqing-ball-ground");
aqingBall.aniLongdown = document.getElementById("svg-circle-half-body");
aqingBall.buttonDIY = new Button("aqing-ball-zi");
aqingBall.buttonYou = new Button("aqing-ball-you");
aqingBall.drag = new DivDrag(aqingBall.ground);
aqingBall.setMagnetic = null;

aqingBall.MoveTo = function (x, y, div) {
  div.style.left = x + "%";
  div.style.top = y + "%";
};

aqingBall.UpdataMenuPos = function () {
  aqingBall.drag.UpdateMoveBoundary(
    0,
    window.innerHeight,
    fixedbox.offsetLeft,
    fixedbox.offsetLeft + fixedbox.offsetWidth
  );
  cx =
    this.div.getBoundingClientRect().left +
    this.div.getBoundingClientRect().width / 2;
  cy =
    this.div.getBoundingClientRect().top +
    this.div.getBoundingClientRect().height / 2;
  aqingOnWhere = OnWhere(
    cx,
    cy,
    aqingBall.drag.moveBoundary.top,
    aqingBall.drag.moveBoundary.bottom,
    aqingBall.drag.moveBoundary.left,
    aqingBall.drag.moveBoundary.right,
    2 * aqingBall.div.offsetHeight,
    2 * aqingBall.div.offsetHeight,
    2 * aqingBall.div.offsetWidth,
    2 * aqingBall.div.offsetWidth
  );
  log(aqingOnWhere);
  switch (aqingOnWhere) {
    case "top-left":
      aqingBall.MoveTo(150, 50, aqingBall.buttonDIY.div);
      aqingBall.MoveTo(50, 150, aqingBall.buttonYou.div);
      break;
    case "top-right":
      aqingBall.MoveTo(-150, 50, aqingBall.buttonDIY.div);
      aqingBall.MoveTo(-50, 150, aqingBall.buttonYou.div);
      break;
    case "bottom-left":
      aqingBall.MoveTo(50, -150, aqingBall.buttonDIY.div);
      aqingBall.MoveTo(150, -50, aqingBall.buttonYou.div);
      break;
    case "bottom-right":
      aqingBall.MoveTo(-50, -150, aqingBall.buttonDIY.div);
      aqingBall.MoveTo(-150, -50, aqingBall.buttonYou.div);
      break;
    case "top":
      aqingBall.MoveTo(-100, 150, aqingBall.buttonDIY.div);
      aqingBall.MoveTo(100, 150, aqingBall.buttonYou.div);
      break;
    case "bottom":
      aqingBall.MoveTo(-100, -150, aqingBall.buttonDIY.div);
      aqingBall.MoveTo(100, -150, aqingBall.buttonYou.div);
      break;
    case "right":
      aqingBall.MoveTo(-150, -100, aqingBall.buttonDIY.div);
      aqingBall.MoveTo(-150, 100, aqingBall.buttonYou.div);
      break;
    default:
      aqingBall.MoveTo(150, -100, aqingBall.buttonDIY.div);
      aqingBall.MoveTo(150, 100, aqingBall.buttonYou.div);
  }
};

aqingBall.MagneticHide = function (isPC = true, delay = 5000) {
  if (null != aqingBall.setMagnetic) {
    clearTimeout(aqingBall.setMagnetic);
  }
  aqingBall.setMagnetic = setTimeout(() => {
    if (!isPC || !IsInDiv(pointer.x, pointer.y, aqingBall.div)) {
      aqingBall.setMagnetic = null;
      aqingBall.drag.Magnetic();
      DivHide(aqingBall.buttonDIY.div, "flex");
      DivHide(aqingBall.buttonYou.div, "flex");
      aqingBall.div.style.opacity = 0.2;
    }
  }, delay);
};

aqingBall.TouchDown = () => {
  aqingBall.div.classList.add("scaledown");
  aqingBall.aniLongdown.classList.remove("displaynone");

  aqingBall.div.style.opacity = 0.6;
  aqingBall.drag.Magnetic(false);
};
aqingBall.TouchUp = () => {
  aqingBall.drag.DragEnd();
  aqingBall.div.classList.remove("scaledown");
  aqingBall.aniLongdown.classList.add("displaynone");

  aqingBall.MagneticHide(false);
};
aqingBall.Click = () => {
  log("aqing Click");
  aqingBall.UpdataMenuPos();
  DivShowOrHide(aqingBall.buttonDIY.div, "flex");
  DivShowOrHide(aqingBall.buttonYou.div, "flex");
};
aqingBall.DbClick = () => {
  log("aqing DbClick");
  setTimeout(() => {
    DivHide(aqingBall.ground);
    DivHide(aqingBall.buttonDIY.div, "flex");
    DivHide(aqingBall.buttonYou.div, "flex");
  }, 150);
};
aqingBall.LongDown = () => {
  // log("aqing Longdown");
  aqingBall.drag.UpdateMoveBoundary(
    0,
    window.innerHeight,
    fixedbox.offsetLeft,
    fixedbox.offsetLeft + fixedbox.offsetWidth
  );
  aqingBall.drag.DragStart("center", false);
};
aqingBall.MouseUpL = () => {
  // log("aqing ball Lup");
  aqingBall.drag.DragEnd();
};
aqingBall.MouseUpOutL = () => {
  aqingBall.drag.DragEnd();
};
aqingBall.MouseIn = () => {
  aqingBall.div.style.opacity = 0.6;
  aqingBall.drag.Magnetic(false);
};
aqingBall.MouseOut = () => {
  aqingBall.MagneticHide();
};

// 阿晴菜单 - DIY
aqingBall.buttonDIY.AddButton();
aqingBall.buttonDIY.Click = () => {
  log("阿晴悬浮球菜单 - DIY");
  aqingBall.MagneticHide(false);
};

// 阿晴菜单 - 优
aqingBall.buttonYou.AddButton();
aqingBall.buttonYou.Click = () => {
  log("阿晴悬浮球菜单 - 优化");
  aqingBall.MagneticHide(false);
};
