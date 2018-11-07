/**
 * Created by pg on 2017/4/17.
 */
var editor = UE.getEditor("js_editor");
document.getElementById("J_qrcode").onclick  = function () {
  var extensionId = document.body.getAttribute("xmt-extension-id");
  chrome.runtime.sendMessage(extensionId,{event: "mhAddListener"})
  var xmt_mhapi = new mhapi();
  xmt_mhapi.domain = "https://mh.cli.im";
  xmt_mhapi.init();
  xmt_mhapi.open('',{
    "close": function(base64){
      chrome.runtime.sendMessage(extensionId,{event: "mhRemoveListener"})
      if(base64.length == 26590 && base64.substring(0,115) == 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAgAElEQVR4Xu2df5BV5XnHn91l2R/sLrhRWBSNsqIxCpXot') {
        return;
      }
      chrome.runtime.sendMessage(extensionId, {base64: base64,event:"uploadImg",ticket_id:wx.data.user_name,ticket:wx.data.ticket,token:wx.data.t}, function (res) {
        var data= res.body;
        if(data.base_resp.ret==0){
          var html = '<p style="text-align: center;"><img style="width:200px;height: 200px;" src="'+data.cdn_url+'" _src="'+data.cdn_url+'"></p>';
          editor.execCommand("inserthtml", html);
        }
      });
    }
  });
  $("#gjmh_zzc").click(function () {
    $("#gjmh_zzc").remove();
    $("#gjmh_dialog").remove();
  });
};