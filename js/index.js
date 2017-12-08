$(document).ready(function() {
	var startScale = +$('#ruler li').first().attr('data-size');		//标尺起始值,并转为number
	var endScale = +$('#ruler li').last().attr('data-size');		//标尺末端值,并转为number
	var scopeWidth = $('#scope').outerWidth();              		//滚动条长度
	var scale = (endScale - startScale) / scopeWidth;				//比例尺
	var initRontSize = parseInt($('#word').css('fontSize'));		//获取初始文字字号										
	var initLeft = Math.abs((initRontSize - startScale) / scale);	//滑块的起始左偏移量
	initLeft = Math.max(0, Math.min(initLeft, scopeWidth));			//初始左偏的取值范围

	setFontSize(initLeft);											//初始状态

	var active = function(e) {	
		e.stopPropagation();										//阻止事件冒泡
		var dX = e.pageX;											//获取点击滑块时鼠标相对页面的左偏移
		var dragerLeft = $('#dot').position().left;					//获取滑块当前相对父元素的左偏移量
		 $('#word').addClass('noselected');							//文本不可选 

		 var handler = function(e) {
		 	var currentX = e.pageX;									//获取鼠标移动时鼠标相对页面的左偏移
			var curLeft = dragerLeft + currentX - dX; 				//计算滑块需偏移的量
			curLeft = Math.max(0, Math.min(curLeft, scopeWidth)); 	//限定滑块的偏移量
		 	setFontSize(curLeft);									//设置字体及上标度数
		 };

		 $(document).mousemove(handler);							//鼠标移动事件
		 $(document).mouseup(function() {							//鼠标释放事件
		 	$(this).unbind('mousemove', handler);					//移除鼠标移动事件
		 	 $('#word').removeClass('noselected');					//回复文本可选
		 });
	};

	$('#dot').mousedown(active);									//滑块鼠标按下事件
	$('#scope').mousedown(function(e) {								//点击滚动条事件
		setFontSize(e.offsetX);		
		active(e);
	});


	function setFontSize(num) {										//设置文本字号及上标函数
		var iSize = startScale + num * scale;						//计算对应的字号
		if (iSize < 12) {											//谷歌浏览器字号12px时的处理方式
			$('#word').css({
				transform: "scale("+ iSize / 12 + ")",
				fontSize: iSize + 'px'
			});
		} else {
			$('#word').css({
				transform: "scale(1)",
				fontSize: iSize + 'px'
			});
		}
		$('#dot').attr('data-sub', parseInt(iSize) + 'px').css('left', num);
	}
});
