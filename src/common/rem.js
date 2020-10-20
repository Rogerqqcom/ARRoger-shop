/*闭包形式*/
// 根据屏幕大小自动适配
(function(doc, win, deviceWidth) {
	//首先获取根节点
	var docEl = doc.documentElement,
		//(orientationchange->手机屏幕转屏事件), (resize->页面大小改变事件)
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		// 编写一个函数让根节点字体大小根据屏幕大小自适应
		recalc = function() {
			//首先获取可见区域宽度, 因为兼容所以要添加一个|| doc.body.clientWidth;
			var clientWidth = docEl.clientWidth || doc.body.clientWidth;
			//如果没有获取到就return
			if (!clientWidth) return;/*获取到后打印的clientWidth为false*/
			//如果获取到了就根据想要的比例计算大小
			if (clientWidth >= deviceWidth) {
				//如果获取到的可见区域宽度大于设备的宽度，将字体大小设置为100px
				docEl.style.fontSize = '100px';
			} else {
				docEl.style.fontSize = 100 * (clientWidth / deviceWidth) + 'px';
				/*页面元素的rem值 = 页面元素在一套标准尺寸750像素下的px值 / docEl.style.fontSize 里面的文字大小*/
			}
		};
	if (!doc.addEventListener) return;
	//在window上添加事件监听
	win.addEventListener(resizeEvt, recalc, false);
	//// DOMContentLoaded->dom加载完就执行,onload要dom/css/js都加载完才执行
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window, 750);
