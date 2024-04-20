// 全局函数声明
function log(value, pn) {} //输出log信息
function RemoveDivLis(div) {} //移除div所有监听事件
function DivShowOrHide(divIn, block, isName) {} //显示或隐藏Div
function DivShow(divIn, block, isName) {} //显示Div
function DivHide(divIn, block, isName) {} //隐藏Div
function DivMove(x, y, divIn, isName) {} //移动Div坐标
function SetScale(divIn, scale, isName) {} //设置scale
function IsInDiv(x, y, div) {} //判断坐标是否在圆角矩形Div内
function OnWhere(x, y, top, bottom, left, right, rt, rb, rl, rr) {} //判断坐标在范围内的区域位置，井字分布

// 全局函数定义

// 调试信息
log = (value, pn = 0) => {
  const logL = document.getElementById("logL");
  const logR = document.getElementById("logR");
  if (0 != pn) {
    if (pn > logLCount) {
      logLCount++;
      logL.innerHTML += "<p id = 'p" + pn + "' >- " + value + "</p>";
      document.getElementById("p0").innerHTML = "- logLCount : " + logLCount;
      document.getElementById("p01").innerHTML = "- logRCount : " + logRCount;
    } else {
      let pnName = "p" + pn;
      document.getElementById(pnName).innerHTML = "- " + value;
      document.getElementById("p0").innerHTML = "- logLCount : " + logLCount;
      document.getElementById("p01").innerHTML = "- logRCount : " + logRCount;
    }
  } else {
    logR.innerHTML += "<p>- " + value + "</p>";
    logRCount++;
    document.getElementById("p0").innerHTML = "- logLCount : " + logLCount;
    document.getElementById("p01").innerHTML = "- logRCount : " + logRCount;
  }
};

// 移除div所有事件监听
RemoveDivLis = (div) => {
  const oldDiv = div;
  const newDiv = oldDiv.cloneNode(true);
  oldDiv.parentNode.replaceChild(newDiv, oldDiv);
};

// 显示或隐藏Div
DivShowOrHide = (divIn, block = "block", isName = false) => {
  let div = divIn;
  if (isName) {
    div = document.getElementById(divIn);
  }
  if ("none" === window.getComputedStyle(div).getPropertyValue("display")) {
    div.classList.remove("displaynone");
    div.classList.add("display" + block);
  } else {
    div.classList.remove("display" + block);
    div.classList.add("displaynone");
  }
};
DivShow = (divIn, block = "block", isName = false) => {
  let div = divIn;
  if (isName) {
    div = document.getElementById(divIn);
  }
  div.classList.remove("displaynone");
  div.classList.add("display" + block);
};
DivHide = (divIn, block = "block", isName = false) => {
  let div = divIn;
  if (isName) {
    div = document.getElementById(divIn);
  }
  div.classList.remove("display" + block);
  div.classList.add("displaynone");
};
DivMove = (x, y, divIn, isName = false) => {
  let div = divIn;
  if (isName) {
    div = document.getElementById(divIn);
  }
  div.style.left = x + "px";
  div.style.top = y + "px";
};
SetScale = (divIn, scale, isName = false) => {
  let div = divIn;
  if (isName) {
    div = document.getElementById(divIn);
  }
  div.style.scale = scale;
};

// 判断坐标是否在圆角矩形Div内
IsInDiv = (x, y, div) => {
  // 定义event记录di
  const event = {
    top: div.getBoundingClientRect().top,
    bottom: div.getBoundingClientRect().bottom,
    left: div.getBoundingClientRect().left,
    right: div.getBoundingClientRect().right,
    width: div.getBoundingClientRect().width,
    height: div.getBoundingClientRect().height,
    scaleX: div.getBoundingClientRect().width / div.offsetWidth,
    scaleY: div.getBoundingClientRect().height / div.offsetHeight,
    Rtl: {
      r: window
        .getComputedStyle(div)
        .getPropertyValue("border-top-left-radius"),
    },
    Rtr: {
      r: window
        .getComputedStyle(div)
        .getPropertyValue("border-top-right-radius"),
    },
    Rbl: {
      r: window
        .getComputedStyle(div)
        .getPropertyValue("border-bottom-left-radius"),
    },
    Rbr: {
      r: window
        .getComputedStyle(div)
        .getPropertyValue("border-bottom-left-radius"),
    },
  };
  // 定义函数统一圆角单位为px，并去除单位
  function toPx(R, drtL) {
    let val = parseFloat(R);
    let unit = R.replace(val, "");
    if (unit === "%") {
      return (drtL * val) / 100;
    } else {
      return val;
    }
  }
  // 计算并记录div的实际圆角
  event.Rtl.rX = event.scaleX * toPx(event.Rtl.r, event.width);
  event.Rtl.rY = event.scaleY * toPx(event.Rtl.r, event.height);
  event.Rtr.rX = event.scaleX * toPx(event.Rtr.r, event.width);
  event.Rtr.rY = event.scaleY * toPx(event.Rtr.r, event.height);
  event.Rbl.rX = event.scaleX * toPx(event.Rbl.r, event.width);
  event.Rbl.rY = event.scaleY * toPx(event.Rbl.r, event.height);
  event.Rbr.rX = event.scaleX * toPx(event.Rbr.r, event.width);
  event.Rbr.rY = event.scaleY * toPx(event.Rbr.r, event.height);
  // 计算并记录div的实际圆角中心坐标
  event.Rtl.rcX = event.left + event.Rtl.rX;
  event.Rtl.rcY = event.top + event.Rtl.rY;
  event.Rtr.rcX = event.right - event.Rtr.rX;
  event.Rtr.rcY = event.top + event.Rtr.rY;
  event.Rbl.rcX = event.left + event.Rbl.rX;
  event.Rbl.rcY = event.bottom - event.Rbl.rY;
  event.Rbr.rcX = event.right - event.Rbr.rX;
  event.Rbr.rcY = event.bottom - event.Rbr.rY;
  // window.console.log(event);
  // 是否在左上角外
  let outsideTL =
    x < event.left + event.width / 2 &&
    y < event.top + event.height / 2 &&
    ((x - event.Rtl.rcX) * event.Rtl.rY) ** 2 +
      ((y - event.Rtl.rcY) * event.Rtl.rX) ** 2 >
      (event.Rtl.rY * event.Rtl.rX) ** 2
      ? true
      : false;
  // 是否在右上角外
  let outsideTR =
    x > event.left + event.width / 2 &&
    y < event.top + event.height / 2 &&
    ((x - event.Rtr.rcX) * event.Rtr.rY) ** 2 +
      ((y - event.Rtr.rcY) * event.Rtr.rX) ** 2 >
      (event.Rtr.rY * event.Rtr.rX) ** 2
      ? true
      : false;
  // 是否在左下角外
  let outsideBL =
    x < event.left + event.width / 2 &&
    y > event.top + event.height / 2 &&
    ((x - event.Rbl.rcX) * event.Rbl.rY) ** 2 +
      ((y - event.Rbl.rcY) * event.Rbl.rX) ** 2 >
      (event.Rbl.rY * event.Rbl.rX) ** 2
      ? true
      : false;
  // 是否在右下角外
  let outsideBR =
    x > event.left + event.width / 2 &&
    y > event.top + event.height / 2 &&
    ((x - event.Rbr.rcX) * event.Rbr.rY) ** 2 +
      ((y - event.Rbr.rcY) * event.Rbr.rX) ** 2 >
      (event.Rbr.rY * event.Rbr.rX) ** 2
      ? true
      : false;
  if (
    x >= event.left &&
    x <= event.right &&
    y >= event.top &&
    y <= event.bottom &&
    !outsideTL &&
    !outsideTR &&
    !outsideBL &&
    !outsideBR
  ) {
    return true;
  } else {
    return false;
  }
};

// 判断坐标在区域中的位置,井字分布
OnWhere = (x, y, top, bottom, left, right, rt = 0, rb = 0, rl = 0, rr = 0) => {
  if (x < left + rl && y < top + rt) {
    return "top-left"; //左上
  } else if (x > right - rr && y < top + rt) {
    return "top-right"; //右上
  } else if (x < left + rl && y > bottom - rb) {
    return "bottom-left"; //左下
  } else if (x > right - rr && y > bottom - rb) {
    return "bottom-right"; //右下
  } else if (x >= left + rl && x <= right - rr && y <= top + rt) {
    return "top"; //上
  } else if (x >= left + rl && x <= right - rr && y >= bottom - rb) {
    return "bottom"; //下
  } else if (x <= left + rl && y >= top + rt && y <= bottom - rb) {
    return "left"; //左
  } else if (x >= right - rr && y >= top + rt && y <= bottom - rb) {
    return "right"; //右
  } else {
    return "center"; //中间
  }
};

// 构造按钮对象
// 菜单
function Menu(box, ground) {
  this.menuboxGround = document.getElementById("menuboxGround");
  this.menubox = document.getElementById(box);
  this.menu = document.getElementById("menu");
  this.menuground = document.getElementById(ground);
  this.isShow = false;
  this.used = false;

  // 菜单自适应
  this.WidthAdapt600 = window.matchMedia("screen and (max-width: 600px)");
  this.WidthAdapt960 = window.matchMedia("screen and (max-width: 960px)");
  this.AddWithAdapt = function () {
    this.WidthAdapt600.addEventListener("change", () => {
      if (!this.used) {
        if (this.WidthAdapt600.matches) {
          this.menuboxGround.classList.remove("menuboxGround-show-styleaf");
          this.menuboxGround.classList.add("menuboxGround-show-stylebf");
          this.menuboxGround.classList.add("menuboxGround-show-stylebf-over");

          this.menubox.classList.remove("menubox-show-styleaf");
          this.menubox.classList.add("menubox-show-stylebf");

          this.menu.classList.remove("shadow");
          this.isShow = false;
        } else {
          this.menuboxGround.classList.add("menuboxGround-show-styleaf");
          this.menuboxGround.classList.remove("menuboxGround-show-stylebf");
          this.menuboxGround.classList.remove(
            "menuboxGround-show-stylebf-over"
          );

          this.menubox.classList.add("menubox-show-styleaf");
          this.menubox.classList.remove("menubox-show-stylebf");

          this.menu.classList.add("shadow");
          this.isShow = true;
        }
      }
    });
    this.WidthAdapt960.addEventListener("change", () => {
      if (this.WidthAdapt960.matches) {
        this.menuground.classList.remove("menuground-show-styleaf");
        this.menuground.classList.add("menuground-show-stylebf");
      } else {
        if (this.isShow) {
          this.menuground.classList.add("menuground-show-styleaf");
          this.menuground.classList.remove("menuground-show-stylebf");
        } else {
          this.menuground.classList.remove("menuground-show-styleaf");
          this.menuground.classList.add("menuground-show-stylebf");
        }
      }
    });
  };

  // 显示菜单
  this.Show = function () {
    this.used = true;
    this.isShow = true;
    if (window.innerWidth > 960) {
      this.menuground.classList.remove("menuground-show-stylebf");
      this.menuground.classList.add("menuground-show-styleaf");
      this.menuground.classList.add("menuground-show");
    }
    this.menuboxGround.classList.remove("menuboxGround-show-stylebf");
    this.menuboxGround.classList.add("menuboxGround-show-styleaf");
    this.menuboxGround.classList.add("menuboxGround-show");
    this.menubox.classList.remove("menubox-show-stylebf");
    this.menubox.classList.add("menubox-show-styleaf");
    this.menubox.classList.add("menubox-show");

    setTimeout(() => {
      this.menuground.classList.remove("menuground-show");
      this.menuboxGround.classList.remove("menuboxGround-show");
      this.menuboxGround.classList.remove("menuboxGround-show-stylebf-over");
      this.menubox.classList.remove("menubox-show");
      this.menu.classList.add("shadow");
      window.console.log(this.menubox);
      window.console.log(this.menuground);
      window.console.log(this.menuboxGround);
    }, 220);
  };

  // 隐藏菜单
  this.Hide = function () {
    this.used = true;
    this.isShow = false;
    if (window.innerWidth > 960) {
      this.menuground.classList.remove("menuground-show-styleaf");
      this.menuground.classList.add("menuground-show-stylebf");
      this.menuground.classList.add("menuground-hide");
    }
    this.menuboxGround.classList.remove("menuboxGround-show-styleaf");
    this.menuboxGround.classList.add("menuboxGround-show-stylebf");
    this.menuboxGround.classList.add("menuboxGround-show-stylebf-over");
    this.menuboxGround.classList.add("menuboxGround-hide");
    this.menubox.classList.remove("menubox-show-styleaf");
    this.menubox.classList.add("menubox-show-stylebf");
    this.menubox.classList.add("menubox-hide");
    this.menu.classList.remove("shadow");

    setTimeout(() => {
      this.menuground.classList.remove("menuground-hide");
      this.menuboxGround.classList.remove("menuboxGround-hide");
      this.menubox.classList.remove("menubox-hide");
    }, 220);
  };

  // 显示或隐藏菜单
  this.ShowOrHide = function () {
    if (this.isShow) {
      this.Hide();
    } else {
      this.Show();
    }
  };
}

// 按钮
function Button(divname) {
  // 基本信息
  this.name = divname; //按钮名
  this.div = document.getElementById(this.name); //绑定元素
  this.onlyClick = true; //按钮是否仅有单击功能
  this.pos = {
    x: this.div.offsetLeft,
    y: this.div.offsetTop,
    cx: this.div.offsetLeft + this.div.offsetWidth / 2,
    cy: this.div.offsetTop + this.div.offsetHeight / 2,
    width: this.div.offsetWidth,
    height: this.div.offsetHeight,
  };

  // 外部自定义函数
  // 更新div坐标宽高信息
  this.UpdatePos = function () {};
  // 按下调用
  // this.Down = function () {};
  this.TouchDown = function () {};
  this.MouseDownL = function () {};
  this.MouseDownM = function () {};
  this.MouseDownR = function () {};
  // 抬起调用
  this.TouchUp = function () {};
  this.WhenTouchUp = function () {};
  this.WhenMouseUp = function () {};
  this.MouseUpL = function () {};
  this.MouseUpM = function () {};
  this.MouseUpR = function () {};
  this.MouseUpOutL = function () {};
  this.MouseUpOutM = function () {};
  this.MouseUpOutR = function () {};
  // 单击调用
  this.Click = function () {};
  this.ClickM = function () {};
  this.ClickR = function () {};
  // 双击调用
  this.DbClick = function () {};
  this.DbClickM = function () {};
  this.DbClickR = function () {};
  // 长按调用
  this.LongDown = function () {};
  this.LongDownM = function () {};
  this.LongDownR = function () {};
  // 鼠标出入调用
  this.MouseIn = function () {};
  this.MouseOut = function () {};

  // 按钮状态
  this.isDown = false; //按钮按下
  this.isTouchstart = false; //屏幕按下
  this.isMousedownL = false; //鼠标左键按下
  this.isMousedownM = false; //鼠标中键按下
  this.isMousedownR = false; //鼠标右键按下

  this.isMouseOut = true;

  this.isAlldocumentListenUp = false; //正在全局检测鼠标抬起

  // 计数器
  this.countToustart = 0;
  this.countMousedownL = 0;
  this.countMousedownM = 0;
  this.countMousedownR = 0;

  // 延时
  this.delayClick = 300; //单击延时
  this.delayLongdown = 600; //长按延时
  this.delayTouchNow = 10; //屏幕事件 "刚" 发生延时判定

  // 延时执行函数命名
  this.setClickT = null; //触控单击
  this.setClickL = null; //左键单击
  this.setClickM = null; //中键单击
  this.setClickR = null; //右键单击

  this.setLongT = null; //触控长按
  this.setLongL = null; //左键长按
  this.setLongM = null; //中键长按
  this.setLongR = null; //右键长按

  // 对象初始化
  this.div.oncontextmenu = (e) => {
    e.preventDefault();
  }; //屏蔽默认右键菜单

  // 对象函数
  // 更新坐标宽高信息
  this.UpdatePos = () => {
    this.pos.x = this.div.offsetLeft;
    this.pos.y = this.div.offsetHeight;
    this.pos.cx = this.div.offsetLeft + this.div.offsetWidth / 2;
    this.pos.cy = this.div.offsetTop + this.div.offsetHeight / 2;
    this.pos.width = this.div.offsetWidth;
    this.pos.height = this.div.offsetHeight;
  };

  // 添加按钮监听，默认为一个单击按钮，输入为false解锁更多功能
  this.AddButton = function (onlyClick = true) {
    this.onlyClick = onlyClick; //定义按钮功能

    //按下事件
    this.div.addEventListener("touchstart", (event) => {
      this.ButtonDown(event);
    });
    this.div.addEventListener("mousedown", (event) => {
      this.ButtonDown(event);
    });

    // 抬起事件
    this.div.addEventListener(
      "touchend",
      (event) => {
        this.ButtonUp(event);
      },
      true
    );
    this.div.addEventListener(
      "mouseup",
      (event) => {
        this.ButtonUp(event);
      },
      true
    );

    // 鼠标出入
    this.div.addEventListener("mouseenter", (event) => {
      this.InsideButtonMouseIn(event);
    });
    this.div.addEventListener("mouseout", (event) => {
      this.InsideButtonMouseOut(event);
    });
  };

  // 事件响应
  // 按下事件
  this.ButtonDown = function (event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    } else {
      window.event.returnValue = false;
    } //取消浏览器默认事件

    this.isDown = true;

    if ("touchstart" === event.type) {
      window.addEventListener(
        "touchend",
        () => {
          if (!this.isTouchstart) {
            // 按钮内抬起
            this.InsideTouchUp();
          }
          this.isTouchstart = false;
          if (
            !this.isTouchstart &&
            !this.isMousedownL &&
            !this.isMouseDownM &&
            !this.isMouseDownR
          ) {
            this.isDown = false;
            this.WhenTouchUp();
          }
        },
        { once: true }
      );
      pointer.x = Number(event.touches[0].clientX.toFixed(1));
      pointer.y = Number(event.touches[0].clientY.toFixed(1));
      this.InsideTouchDown();
    } else if ("mousedown" === event.type && !this.isTouchstart) {
      if (0 === event.button) {
        this.InsideMouseDownL();
      } else if (1 === event.button) {
        this.InsideMouseDownM();
      } else if (2 === event.button) {
        this.InsideMouseDownR();
      }
      if (!this.isAlldocumentListenUp) {
        this.AlldocumentListenUp();
      }
    }
  };

  // 抬起事件
  this.ButtonUp = function (event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    } else {
      window.event.returnValue = false;
    } //取消浏览器默认事件

    if ("touchend" === event.type) {
      this.isTouchstart = false;
    } else if ("mouseup" === event.type && !this.isTouchstart) {
      if (0 === event.button) {
        this.isMousedownL = false;
        // window.console.log("isMousedownL = " + this.isMousedownL);
      } else if (1 === event.button) {
        this.isMousedownM = false;
        // window.console.log("isMousedownM = " + this.isMousedownM);
      } else if (2 === event.button) {
        this.isMousedownR = false;
        // window.console.log("isMousedownR = " + this.isMousedownR);
      }
    }
  };

  // 鼠标出入
  this.InsideButtonMouseIn = function () {
    this.isMouseOut = false;

    this.MouseIn();
  };
  this.InsideButtonMouseOut = function () {
    this.isMouseOut = true;

    if (null != this.setLongL) {
      clearTimeout(this.setLongL);
      this.setLongL = null;
    }
    if (null != this.setLongM) {
      clearTimeout(this.setLongM);
      this.setLongM = null;
    }
    if (null != this.setLongR) {
      clearTimeout(this.setLongR);
      this.setLongR = null;
    }

    this.MouseOut();
  };

  // 全局鼠标抬起检测
  this.AlldocumentListenUp = function () {
    this.isAlldocumentListenUp = true;
    window.addEventListener(
      "mouseup",
      (event) => {
        // window.console.log(event.button);
        if (0 === event.button) {
          if (!this.isMousedownL) {
            // log(this.name + "mouseUpL");
            this.InsideMouseUpL();
          } else {
            // log(this.name + "mouseUpL");
            this.InsideMouseUpOutL();
          }
        } else if (1 === event.button) {
          if (!this.isMousedownM) {
            this.InsideMouseUpM();
          } else {
            this.InsideMouseUpOutL();
          }
        } else if (2 === event.button) {
          if (!this.isMousedownR) {
            this.InsideMouseUpR();
          } else {
            this.InsideMouseUpOutL();
          }
        }
        if (
          !this.isTouchstart &&
          !this.isMousedownL &&
          !this.isMousedownM &&
          !this.isMousedownR
        ) {
          this.isDown = false;
          this.WhenMouseUp();
        }
        if (this.isMousedownL || this.isMousedownM || this.isMousedownR) {
          this.AlldocumentListenUp();
        } else {
          this.isAlldocumentListenUp = false;
        }
      },
      { once: true }
    );
  };

  // 内部函数
  // 按下调用
  this.InsideTouchDown = function () {
    this.isTouchstart = true;
    this.countToustart++;
    if (this.onlyClick) {
      this.Click();
    } else {
      if (null != this.setClickT) {
        clearTimeout(this.setClickT);
        this.setClickT = null;
        this.countToustart = 0;
        this.DbClick();
      } else {
        this.setLongT = setTimeout(() => {
          this.setLongT = null;
          this.countToustart = 0;
          if (IsInDiv(pointer.x, pointer.y, this.div)) {
            this.LongDown();
          }
        }, this.delayLongdown);
      }
    }

    this.TouchDown();
  };
  this.InsideMouseDownL = function () {
    this.isMousedownL = true;
    // window.console.log("isMousedownL = " + this.isMousedownL);

    if (!this.onlyClick) {
      this.countMousedownL++;
      if (null != this.setClickL) {
        clearTimeout(this.setClickL);
        this.setClickL = null;
        this.countMousedownL = 0;
        this.DbClick();
      } else {
        this.setLongL = setTimeout(() => {
          this.setLongL = null;
          this.countMousedownL = 0;
          this.LongDown();
        }, this.delayLongdown);
      }
    }

    this.MouseDownL();
  };
  this.InsideMouseDownM = function () {
    this.isMousedownM = true;
    // window.console.log("isMousedownM = " + this.isMousedownM);

    if (!this.onlyClick) {
      this.countMousedownM++;
      if (null != this.setClickM) {
        clearTimeout(this.setClickM);
        this.setClickM = null;
        this.countMousedownM = 0;
        this.DbClickM();
      } else {
        this.setLongM = setTimeout(() => {
          this.setLongM = null;
          this.countMousedownM = 0;
          this.LongDownM();
        }, this.delayLongdown);
      }
    }

    this.MouseDownM();
  };
  this.InsideMouseDownR = function () {
    this.isMousedownR = true;
    // window.console.log("isMousedownR = " + this.isMousedownR);

    if (!this.onlyClick) {
      this.countMousedownR++;
      if (null != this.setClickR) {
        clearTimeout(this.setClickR);
        this.setClickR = null;
        this.countMousedownR = 0;
        this.DbClickR();
      } else {
        this.setLongR = setTimeout(() => {
          this.setLongR = null;
          this.countMousedownR = 0;
          this.LongDownR();
        }, this.delayLongdown);
      }
    }

    this.MouseDownR();
  };

  // 抬起调用
  this.InsideTouchUp = function () {
    if (!this.onlyClick) {
      if (null === this.setClickT && 1 === this.countToustart) {
        this.setClickT = setTimeout(() => {
          this.setClickT = null;
          this.countToustart = 0;
          this.Click();
        }, this.delayClick);
      }
      if (null != this.setLongT) {
        clearTimeout(this.setLongT);
        this.setLongT = null;
      }
    }

    this.TouchUp();
  };
  this.InsideMouseUpL = function () {
    if (this.onlyClick) {
      this.Click();
    } else {
      if (null === this.setClickL && 1 === this.countMousedownL) {
        this.setClickL = setTimeout(() => {
          this.setClickL = null;
          this.countMousedownL = 0;
          this.Click();
        }, this.delayClick);
      }
      if (null != this.setLongL) {
        clearTimeout(this.setLongL);
        this.setLongL = null;
      }
    }

    this.MouseUpL();
  };
  this.InsideMouseUpM = function () {
    if (this.onlyClick) {
      this.ClickM();
    } else {
      if (null === this.setClickM && 1 === this.countMousedownM) {
        this.setClickM = setTimeout(() => {
          this.setClickM = null;
          this.countMousedownM = 0;
          this.ClickM();
        }, this.delayClick);
      }
      if (null != this.setLongM) {
        clearTimeout(this.setLongM);
        this.setLongM = null;
      }
    }

    this.MouseUpM();
  };
  this.InsideMouseUpR = function () {
    if (this.onlyClick) {
      this.ClickR();
    } else {
      if (null === this.setClickR && 1 === this.countMousedownR) {
        this.setClickR = setTimeout(() => {
          this.setClickR = null;
          this.countMousedownR = 0;
          this.ClickR();
        }, this.delayClick);
      }
      if (null != this.setLongR) {
        clearTimeout(this.setLongR);
        this.setLongR = null;
      }
    }

    this.MouseUpR();
  };
  this.InsideMouseUpOutL = function () {
    this.isMousedownL = false;

    this.MouseUpOutL();
  };
  this.InsideMouseUpOutM = function () {
    this.isMousedownM = false;

    this.MouseUpOutM();
  };
  this.InsideMouseUpOutR = function () {
    this.isMousedownR = false;

    this.MouseUpOutR();
  };
}

// 菜单栏导航按钮
function Daohang(name, aniName) {
  // 基本参数
  this.name = name;
  this.aniName = aniName;
  this.menuButton = new Button(name);
  this.ani = document.getElementById(aniName);

  // 调用方法
  this.Click = function () {};

  // 动画效果及功能实现
  this.menuButton.AddButton();
  this.menuButton.MouseDownL = () => {
    this.Click();

    this.ani.classList.add("ani-move-daohang-Click");
    this.menuButton.div.classList.add("ani-bgColor-daohang");
    setTimeout(() => {
      this.ani.classList.remove("ani-move-daohang-Click");
      this.menuButton.div.classList.remove("ani-bgColor-daohang");
    }, 100);
  };
  this.menuButton.TouchDown = () => {
    this.Click();

    this.ani.classList.add("ani-move-daohang-ClickT");
    this.menuButton.div.classList.add("ani-bgColor-daohang");
    setTimeout(() => {
      this.ani.classList.remove("ani-move-daohang-ClickT");
      this.menuButton.div.classList.remove("ani-bgColor-daohang");
    }, 400);
  };
}

// 拖拽
function DivDrag(div) {
  this.div = div;
  this.isOnDrag = false;
  this.moveAns = "top-left";

  this.moveOrigin = {
    x: pointer.x,
    y: pointer.y,
  }; //鼠标原点
  this.divOrigin = {
    x: this.div.offsetLeft,
    y: this.offsetTop,
  }; //div原点
  this.dPos = {
    x: 0,
    y: 0,
  }; //鼠标坐标变化量
  this.moveBoundary = {
    top: 0,
    bottom: window.innerHeight,
    left: 0,
    right: window.innerWidth,
  }; //拖拽边界
  this.mouseLimit = {
    top: this.moveBoundary.top,
    bottom: this.moveBoundary.bottom,
    left: this.moveBoundary.left,
    right: this.moveBoundary.right,
  }; //鼠标边界

  // 初始化原点
  this.InitOrigin = function (isLimitDiv = true) {
    // 鼠标原点
    this.moveOrigin.x = pointer.x;
    this.moveOrigin.y = pointer.y;

    dx = pointer.x - this.div.getBoundingClientRect().x;
    dy = pointer.y - this.div.getBoundingClientRect().y;
    pw = this.div.getBoundingClientRect().width;
    ph = this.div.getBoundingClientRect().height;

    // Div原点
    if (this.moveAns != "center") {
      this.divOrigin.x = this.div.offsetLeft;
      this.divOrigin.y = this.div.offsetTop;
    } else {
      this.divOrigin.x = Number((this.div.offsetLeft + dx - pw / 2).toFixed(1));
      this.divOrigin.y = Number((this.div.offsetTop + dy - ph / 2).toFixed(1));
      log(this.divOrigin.x + "," + this.divOrigin.y);
    }

    //鼠标边界
    if (isLimitDiv) {
      this.mouseLimit.top = this.moveBoundary.top + dy;
      this.mouseLimit.bottom = this.moveBoundary.bottom + dy - ph;
      this.mouseLimit.left = this.moveBoundary.left + dx;
      this.mouseLimit.right = this.moveBoundary.right + dx - pw;
    } else {
      this.mouseLimit.top = this.moveBoundary.top;
      this.mouseLimit.bottom = this.moveBoundary.bottom;
      this.mouseLimit.left = this.moveBoundary.left;
      this.mouseLimit.right = this.moveBoundary.right;
    }
  };

  // 更新拖拽边界
  this.UpdateMoveBoundary = function (top, bottom, left, right) {
    this.moveBoundary.top = top;
    this.moveBoundary.bottom = bottom;
    this.moveBoundary.left = left;
    this.moveBoundary.right = right;
  };

  this.DragStart = function (moveAns = "top-left", isLimitDiv = true) {
    this.isOnDrag = true;
    this.moveAns = moveAns;
    this.InitOrigin(isLimitDiv);
    this.UpdateDpos();
    this.Move(this.divOrigin.x + this.dPos.x, this.divOrigin.y + this.dPos.y);
    this.DragNext();
  };
  this.DragEnd = function () {
    this.isOnDrag = false;
  };
  this.DragNext = function () {
    window.addEventListener(
      "mousemove",
      () => {
        this.DragNextTodo();
      },
      { once: true }
    );
    window.addEventListener(
      "touchmove",
      () => {
        this.DragNextTodo();
      },
      { once: true }
    );
  };
  this.DragNextTodo = function () {
    if (this.isOnDrag) {
      this.UpdateDpos();
      this.Move(this.divOrigin.x + this.dPos.x, this.divOrigin.y + this.dPos.y);

      this.DragNext();
    }
  };
  this.Move = function (x, y) {
    DivMove(x, y, this.div);
  };

  // 更新鼠标坐标变化量
  this.UpdateDpos = function () {
    pointerOnWhere = OnWhere(
      pointer.x,
      pointer.y,
      this.mouseLimit.top,
      this.mouseLimit.bottom,
      this.mouseLimit.left,
      this.mouseLimit.right
    );
    switch (pointerOnWhere) {
      case "center":
        this.dPos.x = pointer.x - this.moveOrigin.x;
        this.dPos.y = pointer.y - this.moveOrigin.y;
        break;
      case "top-left":
        this.dPos.x = this.mouseLimit.left - this.moveOrigin.x;
        this.dPos.y = this.mouseLimit.top - this.moveOrigin.y;
        break;
      case "top-right":
        this.dPos.x = this.mouseLimit.right - this.moveOrigin.x;
        this.dPos.y = this.mouseLimit.top - this.moveOrigin.y;
        break;
      case "bottom-left":
        this.dPos.x = this.mouseLimit.left - this.moveOrigin.x;
        this.dPos.y = this.mouseLimit.bottom - this.moveOrigin.y;
        break;
      case "bottom-right":
        this.dPos.x = this.mouseLimit.right - this.moveOrigin.x;
        this.dPos.y = this.mouseLimit.bottom - this.moveOrigin.y;
        break;
      case "top":
        this.dPos.x = pointer.x - this.moveOrigin.x;
        this.dPos.y = this.mouseLimit.top - this.moveOrigin.y;
        break;
      case "bottom":
        this.dPos.x = pointer.x - this.moveOrigin.x;
        this.dPos.y = this.mouseLimit.bottom - this.moveOrigin.y;
        break;
      case "left":
        this.dPos.x = this.mouseLimit.left - this.moveOrigin.x;
        this.dPos.y = pointer.y - this.moveOrigin.y;
        break;
      case "right":
        this.dPos.x = this.mouseLimit.right - this.moveOrigin.x;
        this.dPos.y = pointer.y - this.moveOrigin.y;
        break;
    }
  };

  // 边界吸附
  this.Magnetic = function (
    ishide = true,
    rt = this.div.getBoundingClientRect().height,
    rb = this.div.getBoundingClientRect().height,
    rl = this.div.getBoundingClientRect().width,
    rr = this.div.getBoundingClientRect().width,
    ofsX = 0,
    ofsY = 0
  ) {
    // div中心坐标
    cx =
      this.div.getBoundingClientRect().left +
      this.div.getBoundingClientRect().width / 2;
    cy =
      this.div.getBoundingClientRect().top +
      this.div.getBoundingClientRect().height / 2;

    divCenterOnWhere = OnWhere(
      cx,
      cy,
      this.moveBoundary.top,
      this.moveBoundary.bottom,
      this.moveBoundary.left,
      this.moveBoundary.right,
      rt,
      rb,
      rl,
      rr
    );

    switch (divCenterOnWhere) {
      case "top-left":
        if (ishide) {
          this.Move(
            this.moveBoundary.left - ofsX,
            this.moveBoundary.top - ofsY
          );
        } else {
          this.Move(
            this.moveBoundary.left - ofsX + rl / 2,
            this.moveBoundary.top - ofsY + rt / 2
          );
        }
        break;
      case "top-right":
        if (ishide) {
          this.Move(
            this.moveBoundary.right + ofsX,
            this.moveBoundary.top - ofsY
          );
        } else {
          this.Move(
            this.moveBoundary.right + ofsX - rr / 2,
            this.moveBoundary.top - ofsY + rt / 2
          );
        }
        break;
      case "bottom-left":
        if (ishide) {
          this.Move(
            this.moveBoundary.left - ofsX,
            this.moveBoundary.bottom + ofsY
          );
        } else {
          this.Move(
            this.moveBoundary.left - ofsX + rl / 2,
            this.moveBoundary.bottom + ofsY - rb / 2
          );
        }
        break;
      case "bottom-right":
        if (ishide) {
          this.Move(
            this.moveBoundary.right + ofsX,
            this.moveBoundary.bottom + ofsY
          );
        } else {
          this.Move(
            this.moveBoundary.right + ofsX - rr / 2,
            this.moveBoundary.bottom + ofsY - rb / 2
          );
        }
        break;
      case "top":
        if (ishide) {
          this.Move(this.div.offsetLeft, this.moveBoundary.top - ofsY);
        } else {
          this.Move(this.div.offsetLeft, this.moveBoundary.top - ofsY + rt / 2);
        }
        break;
      case "bottom":
        if (ishide) {
          this.Move(this.div.offsetLeft, this.moveBoundary.bottom + ofsY);
        } else {
          this.Move(
            this.div.offsetLeft,
            this.moveBoundary.bottom + ofsY - rb / 2
          );
        }
        break;
      case "left":
        if (ishide) {
          this.Move(this.moveBoundary.left - ofsX, this.div.offsetTop);
        } else {
          this.Move(this.moveBoundary.left - ofsX + rl / 2, this.div.offsetTop);
        }
        break;
      case "right":
        if (ishide) {
          this.Move(this.moveBoundary.right + ofsX, this.div.offsetTop);
        } else {
          this.Move(
            this.moveBoundary.right + ofsX - rr / 2,
            this.div.offsetTop
          );
        }
        break;
    }
  };
}
