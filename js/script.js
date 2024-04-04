//元素
// 菜单
const menuground = document.getElementById("menuground");
const menuhide = document.getElementById("menuhide");
// 主体
const ground = document.getElementById("ground");
const ground0 = document.getElementById("ground0");
const start = document.getElementById("start");
// 标题栏
const tlButton = document.getElementById("tlButton");
const trButton = document.getElementById("trButton");
// 阿晴悬浮球
const aqingball = document.getElementById("aqingball");
const aqingground = document.getElementById("aqingground");

// 函数方法名变量
let menufloating = window.matchMedia("screen and (max-width: 1079px)");
let setAqingClick = null; //双击阿晴悬浮球
let setAqingLongdown = null; //长按阿晴悬浮球
let setAbsorption = null;

// 状态变量
let aqingIsDrag = false; //阿晴悬浮球拖动

// 计数变量
let aqingdownCount = 0; //阿晴悬浮球按下次数

// 参数变量
let clickDelay = 300; //单击延时
let dbclickDelay = 300; //双击延时
let longdownDelay = 600; //长按延时
let aqingAbsorptionDelay = 3000; //悬浮球吸附延时
const mousepos = {
  x: 0,
  y: 0,
}; //鼠标位置
const aqingMouseOffset = {
  top: aqingball.offsetHeight / 2,
  left: aqingball.offsetWidth / 2,
}; //鼠标与悬浮球的偏移
const aqingInterval = {
  top: 0,
  bottom: window.innerHeight,
  left: ground0.offsetLeft,
  right: ground0.offsetLeft + ground0.offsetWidth,
}; //悬浮球移动区间
const aqingMouseInterval = {
  top: aqingInterval.top + aqingMouseOffset.top,
  bottom: aqingMouseOffset.top - aqingball.offsetHeight,
  left: aqingInterval.left + aqingMouseOffset.left,
  right: aqingInterval.right + aqingMouseOffset.left - aqingball.offsetWidth,
}; //鼠标的移动区间

//初始化
if (window.innerWidth <= 600) {
  menuHide();
}
window.console.log("windowinnerHeight = " + window.innerHeight);
window.console.log("groundheight = " + ground.offsetHeight);
window.console.log("bodyheight = " + document.body.offsetHeight);

//功能实现

// 监听事件
// 动态调整菜单栏是否悬浮
menufloating.addEventListener("change", function () {
  if (menufloating.matches) {
    menuhide.style.display = "none";
  } else if (menuIsOn()) {
    menuhide.style.display = "block";
  } else if (!menuIsOn()) {
    menuhide.style.display = "none";
  }
});
window.addEventListener("mousedown", mouseDown); //监听鼠标按下，阻止浏览器默认操作
window.addEventListener("touchstart", mouseDown);

// 按钮事件
// 左上角tr阿晴图标,启动阿晴悬浮球
tlButton.onclick = (event) => {
  let e = event || window.event;
  e.preventDefault(); // 取消浏览器默认操作
  aqingShow();

  window.addEventListener("mousemove", mouseMove);
  window.addEventListener("touchmove", mouseMove);

  aqingball.addEventListener("mousedown", aqingDown); //鼠标按下
  aqingball.addEventListener("touchstart", aqingDown); //触控按下

  aqingball.addEventListener("mouseup", aqingUp); //鼠标抬起
  aqingball.addEventListener("touchend", aqingUp); //触控抬起
  window.addEventListener("mouseup", aqingUp);
  window.addEventListener("touchend", aqingUp);

  aqingball.addEventListener("mouseout", aqingMouseOut); //鼠标离开
  aqingball.addEventListener("mouseover", aqingMouseIn); //鼠标进入
};

// 右上角tr按钮
trButton.onclick = (event) => {
  // let e = event || window.event;
  // e.preventDefault(); // 取消浏览器默认操作
  if (menuIsOn()) {
    menuHide();
  } else {
    menuShow();
  }
  window.console.log("trButton is onclick");
  // window.console.log(Date.now());
  // return false;
};

// 阿晴悬浮球

// 菜单栏
// 设置
function F0() {
  window.console.log(Date.now());
  // return false;
}
// 米游社wiki
function F1() {
  gotoWiki();
  // return false;
}

// 初始界面
start.onclick = (event) => {
  let e = event || window.event;
  e.preventDefault(); // 取消浏览器默认操作
  menuShow();
  // start.style.display = "none";
  start.onclick = null;
  // return false;
};
