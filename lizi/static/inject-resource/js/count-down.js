/* TODO: 1072 by name 2013-03-00  */
/* BUGFIX: 1072 by name 2012-03-00  */
(function ($){
	/*
	 *	beiginTime 开始日期时间戳 单位s
	 *	endTime 截止日期时间戳 单位s
	 *	conditions 按照条件输出计时器 1为时分秒(默认) 2为天时分秒 3为分秒
	 *	type 输出的计时类型 1为美式(默认) 2为中式
	 *	callback 倒计时结束执行的函数
	 *	isAddMs 是否加入毫秒(默认空)
	 *	animation 动画效果（待开发）
	 */
	window.go;
	$.fn.timer = function(beiginTime,endTime,conditions,type,callback,isAddMs,sign){
		$_this = $(this);
		var contain = document.querySelector('.'+$_this[0].className);
		var timeValue = isAddMs===true ? (endTime - beiginTime).toFixed(2) : Math.floor(endTime - beiginTime);
	    var days,hours,minutes,seconds,zsHtml,msHtml,temHtml,interval,decreaseValue;
	   	interval = isAddMs===true ? 10 : 1000;
	    decreaseValue = isAddMs===true ? 0.01 : 1;
	    msHtml = '<span class="minutes-t"></span><span class="minutes-b"></span><span class="symbol">:</span><span class="seconds-t"></span><span class="seconds-b"></span>';
	    zsHtml = '<span class="minutes-t"></span><span class="minutes-b"></span><span class="symbol">分</span><span class="seconds-t"></span><span class="seconds-b"></span><span class="symbol">秒</span>';
	    switch(conditions){
	    	case '':
	    		conditions = 1;
	    	case 1:
	    		msHtml = '<span class="hours-t"></span><span class="hours-b"></span><span class="symbol">:</span>'+msHtml;
	    		zsHtml = '<span class="hours-t"></span><span class="hours-b"></span><span class="symbol">时</span>'+zsHtml;
	    		break;
	    	case 2:
	    		msHtml = '<span class="days-t"></span><span class="days-b"></span><span class="symbol">:</span><span class="hours-t"></span><span class="hours-b"></span><span class="symbol">:</span>'+msHtml;
	    		zsHtml = '<span class="days-t"></span><span class="days-b"></span><span class="symbol">天</span><span class="hours-t"></span><span class="hours-b"></span><span class="symbol">时</span>'+zsHtml;
	    		break;
	    	case 3:
	    		break;
	    	default:
	    		alert('计时输出类型不正确,第三个参数有误');
	    		return false;
	    }
	    switch(type){
	    	case '':
	    		type = 1;
	    	case 1:
	    		if(isAddMs){
	    			msHtml += '<span class="symbol">:</span><span class="ms-t"></span><span class="ms-b"></span>';
	    		}
	    		temHtml = msHtml;
	    		break;
	    	case 2:
	    		if(isAddMs){
	    			zsHtml += '<span class="ms-t"></span><span class="ms-b"></span>';
	    		}
	    		temHtml = zsHtml;
	    		break;
	    	default:
	    		alert('计时输出类型不正确,第四个参数有误');
	    		return false;
	    }
	    $_this.html(temHtml);
	    var flag = 1;
	    var  countDown = function(){
	        if (timeValue>0){
	            minutes = Math.floor((timeValue % 3600) / 60);
	            seconds = Math.floor(timeValue % 60);
	            if(conditions==2){
	            	days = Math.floor(timeValue / (86400));
	            	contain.querySelector('.days-t').innerHTML = Math.floor(days / 10);
	            	contain.querySelector('.days-b').innerHTML = Math.floor(days % 10);
	            }
	            if(conditions==1||conditions==2){
	            	hours = Math.floor((timeValue % 86400) / 3600);
	            	contain.querySelector('.hours-t').innerHTML = Math.floor(hours / 10);
	            	contain.querySelector('.hours-b').innerHTML = Math.floor(hours % 10);
	            }
	            if(isAddMs){
	            	ms = timeValue * 100 % 100;
	            	contain.querySelector('.ms-t').innerHTML = Math.floor(ms / 10);
	            	contain.querySelector('.ms-b').innerHTML = Math.floor(ms % 10);
	            }
	           	contain.querySelector('.minutes-t').innerHTML = Math.floor(minutes / 10);
	            contain.querySelector('.minutes-b').innerHTML = Math.floor(minutes % 10);
	            contain.querySelector('.seconds-t').innerHTML = Math.floor(seconds / 10);
	            contain.querySelector('.seconds-b').innerHTML = Math.floor(seconds % 10);
	            timeValue-=decreaseValue;
	            go = setTimeout(function(){countDown()}, interval);
	        }
	        else{
 				if(conditions==2){
	            	contain.querySelector('.days-t').innerHTML = 0;
	            	contain.querySelector('.days-b').innerHTML = 0;
	            }
	            if(conditions==1||conditions==2){
		            contain.querySelector('.hours-t').innerHTML = 0;
		            contain.querySelector('.hours-b').innerHTML = 0;
		        }
	           	contain.querySelector('.minutes-t').innerHTML = 0;
	            contain.querySelector('.minutes-b').innerHTML = 0;
	            contain.querySelector('.seconds-t').innerHTML = 0;
	            contain.querySelector('.seconds-b').innerHTML = 0;
	            if(callback instanceof Function){
	            	callback();
	            }
	        }
	    };
	    var goTimer = setTimeout(function(){countDown();}, 0);
	};
})(jQuery);
