/**
 * Created by pg on 2017/7/14.
 */

var i= 4
function al(){
  if(i!=0){
    setTimeout(function() {
      i--;
      al();
    }, 1000);
  }else{
    document.getElementById("xmt_diglog").remove()
    document.getElementById("xmt_mask").remove()
  }
}

var mask = document.createElement('div');
var html = document.createElement('div');
mask.id="xmt_mask";

mask.style="width: 100%;height: 100%;position: fixed;top: 0;left: 0;background: rgba(49,49,49,.71);z-index: 100;"
html.id="xmt_diglog";

html.style="position: fixed;width:678px;height:498px;left:50%;top:50%;margin-left:-339px;margin-top:-249px;background:url(https://tbimages.image.alimmdn.com/extension/welcome.png) no-repeat center;background-size: cover;border-radius: 4px;z-index:9999;"
//html.innerHTML = "<img src=\"http://page2image.image.alimmdn.com/img/make.png?t=1500347440097\" style=\"width:205px;height:180px;display:block;margin:40px auto;\"/>\n  <p style=\"font-size:16px;text-align:center;\">欢迎<span style=\"color:#1B93FB\">新媒体管家</span>的用户前来Maka<p>\n  <p id=\"J_xmt_close\" style=\"cursor:pointer;position:absolute;top: 20px;right: 30px;font-size: 12px;color: #999999;\"><span class=\"time\" style=\"display: inline-block;background: #90EAEF; width: 20px;height: 20px;border-radius: 10px;text-align: center;line-height: 20px;color: #fff;margin-right: 5px;vertical-align: middle;\">5</span><span style=\"    vertical-align: middle;\">关闭</span></p>";
//var html = "<div id=\"xmt_diglog\" style=\"position: absolute;width:320px;height:300px;left:50%;top:50%;margin-left:-175px;margin-top:-165px;background:#fff;border-radius: 4px;box-shadow: #ddd 0 1px 2px 0;padding:30px;\">\n  <img src=\"http://page2image.image.alimmdn.com/img/make.png?t=1500347440097\" style=\"width:205px;height:180px;display:block;margin:40px auto;\"/>\n  <p style=\"font-size:16px;text-align:center;\">欢迎<span style=\"color:#1B93FB\">新媒体管家</span>的用户前来Maka<p>\n  <p id=\"J_xmt_close\" style=\"cursor:pointer;position:absolute;top: 20px;right: 30px;font-size: 12px;color: #999999;\"><span class=\"time\" style=\"display: inline-block;background: #90EAEF; width: 20px;height: 20px;border-radius: 10px;text-align: center;line-height: 20px;color: #fff;margin-right: 5px;vertical-align: middle;\">5</span><span style=\"    vertical-align: middle;\">关闭</span></p><div>";
//html.innerHTML = '<p class="title" style="font-size:16px;text-align: center; position: relative;top: 250px;width: 312px;left: 126px;">欢迎<span style="color:#1B93FB;margin:0 5px;text-shadow:none;font-size: 16px;display: inline;">新媒体管家</span>的用户前来使用</p><a id="J_xmt_close" style="color: #333333;display: block;position: absolute;bottom: 0px;width: 312px;text-align: center;left: 126px;bottom: 6px;height: 45px;line-height: 45px;cursor: pointer;font-size: 16px;">立即使用</a>'
html.innerHTML = '<img class="J_xmt_remove" src="https://tbimages.image.alimmdn.com/extension/close.png" style="cursor:pointer;width: 16px;height: 16px;position: absolute;top: 135px;right: 135px;"><a href="javascript:void(0)" style="text-decoration:none;font-size:16px;font-weight: 300;cursor: pointer;display: block;width: 128px;height: 44px;margin: 0 auto;background: #4A90E2;text-align: center;color: #fff;line-height: 44px;border-radius: 22px;position: absolute;left: 50%;margin-left: -64px;bottom: 140px;" class="J_xmt_close">好的</a>'
if(!window.localStorage.getItem('xmt_fist')){
  document.body.appendChild(mask)
  document.body.appendChild(html)
  window.localStorage.setItem('xmt_fist',true);
  var close = document.querySelector('.J_xmt_close');
  close.addEventListener('click',function(){
    document.getElementById("xmt_diglog").remove();
    document.getElementById("xmt_mask").remove();
  },false);
  var remove = document.querySelector('.J_xmt_remove');
  remove.addEventListener('click',function(){
    document.getElementById("xmt_diglog").remove();
    document.getElementById("xmt_mask").remove();
  },false);
}

// al();

