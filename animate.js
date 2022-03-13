function animate(obj, target, callback) {
    clearInterval(obj.timer);
    // var step = Math.ceil((target - obj.offsetLeft) / 10);
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetLeft) / 10;
        // 正值为ceil，负值为floor
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // if (callback) {
            //     callback();
            // }
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}