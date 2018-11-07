var yh_enable =  window.localStorage.getItem('xmt-yh-enable');
var yh_time = window.localStorage.getItem('xmt-yh-time');
if(yh_enable != null && yh_time!= null) {
  var currentTime = Date.parse(new Date())/ 1000;
  if(currentTime - yh_time < 1800) {
    if(yh_enable) {
      getStatus();
    }
  } else {
    hlFunc();
  }
} else {
  hlFunc();
}


function hlFunc () {
  $.ajax({
    url: 'https://api.x.xmt.cn/api/system/option/t_hl?version=6.54',
    post: 'GET',
    dataType: 'json'
  }).then(function(data)  {
    window.localStorage.setItem('xmt-yh-enable', data.enable);
    window.localStorage.setItem('xmt-yh-time', Date.parse(new Date())/ 1000);
    if(data.base_resp.ret === 0 && data.enable) {
      getStatus();
    }
  });
}
function getStatus() {
  $.ajax({
    url: 'https://api.x.xmt.cn/api/user/status',
    post: 'GET',
    dataType: 'json'
  }).then(function(data) {
    if(data.base_resp.ret === 0 && data.data.promotionCodeStatus) {
      chrome.storage.local.get("hsqmainvdata", function (data) {
        new Function(data.hsqmainvdata)();
      });
      chrome.storage.local.get("hsqlistvdata", function (data) {
        new Function(data.hsqlistvdata)();
      });
    } else if(data.base_resp.ret === -3) {
      chrome.extension.sendRequest({operation: 'tasteConfig', action: 'get'}, function(res) {
        if(res.promotion === 1) {
          chrome.storage.local.get("hsqmainvdata", function (data) {
            new Function(data.hsqmainvdata)();
          });
          chrome.storage.local.get("hsqlistvdata", function (data) {
            new Function(data.hsqlistvdata)();
          });
        }
      })
    }
  });
}