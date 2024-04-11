// 全局参数
const pointer = {
  type: "",
  x: 0,
  y: 0,
};
let logLCount = 0;
let logRCount = 0;

// div元素
const menu = new Menu("menubox", "menuground");

// 初始化
Init = () => {
  // DivHide("log", true);
  document.getElementById("logL").innerHTML +=
    "<p id = 'p0' >- logLCount : " + logLCount + "</p>";
  document.getElementById("logL").innerHTML +=
    "<p id = 'p01' >- logRCount : " + logRCount + "</p>";

  if (window.innerWidth > 600) {
    menu.isShow = true;
    menu.menuboxGround.style.width = "304px";
    menu.menubox.style.left = 0;
    menu.menu.classList.add("shadow");
  }
  if (window.innerWidth > 960) {
    menu.menuground.style.maxWidth = "280px";
    menu.menuground.style.marginRight = "12px";
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
  if (event.type === "touchmove") {
    pointer.x = event.touches[0].clientX.toFixed(1);
    pointer.y = event.touches[0].clientY.toFixed(1);
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

// 顶栏按钮
// 左上阿晴图标
const tlbutton = new Button("tlbutton");
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
  log("touchdown");
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
  log("mousedownL");
  SetScale(tlbutton.div, 0.9);
  SetScale(tlbutton.aniGroundCircle1, 1);
};
tlbutton.WhenMouseUp = () => {
  log("Up");
  if (tlbutton.isMouseOut) {
    SetScale(tlbutton.div, 1);
  } else {
    SetScale(tlbutton.div, 1.1);
  }
  SetScale(tlbutton.aniGroundCircle1, 1.5);
};
tlbutton.Click = () => {
  DivShowOrHide("log", "grid", true);
};

// 顶栏右上角图标
const trbutton = new Button("trbutton");
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
const menu1 = new Button("menu1");
menu1.AddButton();
menu1.ani = document.getElementById("a-m-d-menu1");
menu1.MouseDownL = () => {
  DivShowOrHide("log", "grid", true);

  menu1.ani.classList.add("ani-move-daohang-Click");
  menu1.div.classList.add("ani-bgColor-daohang");
  setTimeout(() => {
    menu1.ani.classList.remove("ani-move-daohang-Click");
    menu1.div.classList.remove("ani-bgColor-daohang");
  }, 100);
};
menu1.TouchDown = () => {
  DivShowOrHide("log", "grid", true);

  menu1.ani.classList.add("ani-move-daohang-ClickT");
  menu1.div.classList.add("ani-bgColor-daohang");
  setTimeout(() => {
    menu1.ani.classList.remove("ani-move-daohang-ClickT");
    menu1.div.classList.remove("ani-bgColor-daohang");
  }, 400);
};

// 米游wiki
const menu2 = new Button("menu2");
menu2.AddButton();
menu2.ani = document.getElementById("a-m-d-menu2");
menu2.MouseDownL = () => {
  window.open(
    "https://bbs.mihoyo.com/ys/obc/?bbs_presentation_style=no_header&utm_source=bbs&utm_medium=mys&utm_campaign=pcbox"
  );

  menu2.ani.classList.add("ani-move-daohang-Click");
  menu2.div.classList.add("ani-bgColor-daohang");
  setTimeout(() => {
    menu2.ani.classList.remove("ani-move-daohang-Click");
    menu2.div.classList.remove("ani-bgColor-daohang");
  }, 100);
};
menu2.TouchDown = () => {
  window.open(
    "https://bbs.mihoyo.com/ys/obc/?bbs_presentation_style=no_header&utm_source=bbs&utm_medium=mys&utm_campaign=pcbox"
  );

  menu2.ani.classList.add("ani-move-daohang-ClickT");
  menu2.div.classList.add("ani-bgColor-daohang");
  setTimeout(() => {
    menu2.ani.classList.remove("ani-move-daohang-ClickT");
    menu2.div.classList.remove("ani-bgColor-daohang");
  }, 400);
};

// 优化方案
const menu3 = new Button("menu3");
menu3.AddButton();
menu3.ani = document.getElementById("a-m-d-menu3");
menu3.MouseDownL = () => {
  log("优化方案menu3-Click");

  menu3.ani.classList.add("ani-move-daohang-Click");
  menu3.div.classList.add("ani-bgColor-daohang");
  setTimeout(() => {
    menu3.ani.classList.remove("ani-move-daohang-Click");
    menu3.div.classList.remove("ani-bgColor-daohang");
  }, 100);
};
menu3.TouchDown = () => {
  log("优化方案menu3-Click");

  menu3.ani.classList.add("ani-move-daohang-ClickT");
  menu3.div.classList.add("ani-bgColor-daohang");
  setTimeout(() => {
    menu3.ani.classList.remove("ani-move-daohang-ClickT");
    menu3.div.classList.remove("ani-bgColor-daohang");
  }, 400);
};

// DIY方案
const menu4 = new Button("menu4");
menu4.AddButton();
menu4.ani = document.getElementById("a-m-d-menu4");
menu4.MouseDownL = () => {
  log("DIY方案menu4-Click");

  menu4.ani.classList.add("ani-move-daohang-Click");
  menu4.div.classList.add("ani-bgColor-daohang");
  setTimeout(() => {
    menu4.ani.classList.remove("ani-move-daohang-Click");
    menu4.div.classList.remove("ani-bgColor-daohang");
  }, 100);
};
menu4.TouchDown = () => {
  log("DIY方案menu4-Click");

  menu4.ani.classList.add("ani-move-daohang-ClickT");
  menu4.div.classList.add("ani-bgColor-daohang");
  setTimeout(() => {
    menu4.ani.classList.remove("ani-move-daohang-ClickT");
    menu4.div.classList.remove("ani-bgColor-daohang");
  }, 400);
};

// 信息录入
const menu5 = new Button("menu5");
menu5.AddButton();
menu5.ani = document.getElementById("a-m-d-menu5");
menu5.MouseDownL = () => {
  log("信息录入menu5-Click");

  menu5.ani.classList.add("ani-move-daohang-Click");
  menu5.div.classList.add("ani-bgColor-daohang");
  setTimeout(() => {
    menu5.ani.classList.remove("ani-move-daohang-Click");
    menu5.div.classList.remove("ani-bgColor-daohang");
  }, 100);
};
menu5.TouchDown = () => {
  log("信息录入menu3-Click");

  menu5.ani.classList.add("ani-move-daohang-ClickT");
  menu5.div.classList.add("ani-bgColor-daohang");
  setTimeout(() => {
    menu5.ani.classList.remove("ani-move-daohang-ClickT");
    menu5.div.classList.remove("ani-bgColor-daohang");
  }, 400);
};
