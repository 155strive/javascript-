window.addEventListener('load', function() {
    var left = document.querySelector('.left');
    var right = document.querySelector('.right');
    var focus = document.querySelector('.focus');
    // 全局声明
    var focusWidth = focus.offsetWidth;
    // 1.鼠标经过
    focus.addEventListener('mouseenter', function() {
        left.style.display = 'block';
        right.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    // 2.鼠标离开
    focus.addEventListener('mouseleave', function() {
        left.style.display = 'none';
        right.style.display = 'none';
        timer = setInterval(function() {
            right.click();
        }, 2000);
    });
    // 3.动态生成小圆圈，有几张图片就生成几张图片
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个小li
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号，通过自定义属性来做
        li.setAttribute('index', i);
        // 把小li插入到ol里面
        ol.appendChild(li);
        // 4.小圆圈的排他思想，生成小圆圈的同时绑定点击事件
        li.addEventListener('click', function() {
            // 干点所有人
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下我自己  当前的小li  设置current类名0
            this.className = 'current';
            // 5.点击小圆圈。移动图片  移动的是ul
            // ul的移动距离  小圆圈的索引号 乘以 图片的宽度 注意是负值
            // 当我们点击了某个小li  就拿到了当前小li的索引号
            var index = this.getAttribute('index');
            // 当我们点击某个小li 就要把这个小li的索引号给num
            num = index;
            // 当我们点击某个小li 就要把这个小li的索引号给circle
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个小li设置类名为current
    ol.children[0].className = 'current';
    // 6.克隆第一张图片(li)放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7.点击右侧按钮，图片向右移动一张
    var num = 0;
    // 控制小圆圈的播放
    var circle = 0;
    // flag 节流阀
    var flag = true;
    right.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // 如果走到了最后复制的这张图片，此时，我们的ul 要快速复原 left改为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // 8.点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle==5 说明走到最后的这张图片了我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 调用函数circleChange
            circleChange();
        }

    });

    left.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // 如果走到了最后复制的这张图片，此时，我们的ul 要快速复原 left改为0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--;
            // 如果circle<0 说明第一张图片，则小圆圈要改为第5个小圆圈
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            // 调用函数circleChange
            circleChange();
        }

    });

    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈的current的类名
        ol.children[circle].className = 'current';
    }
    // 10.手动调用点击事件
    var timer = setInterval(function() {
        right.click();
    }, 2000)
})