var editor = UE.getEditor("js_editor");
var el = document.createElement("div");

// 因为点击保存的时候，dom样式会更新，导致高清图片没有切换成功，这里改成没有编辑器Change的时候出发更换
var editorIframe = document.getElementById('ueditor_0');
editorInnerDoc = editorIframe.contentDocument;
editorBody = editorIframe.contentDocument || editorIframe.document;

var hd_image = window.localStorage.getItem("hd_image") || '0';


el.style = 'position: absolute;\n' +
    '    left: 400px;\n' +
    '    top: 28px;\n' +
    '    font-size: 12px;\n' +
    '    color: #1e1e1e;';
el.className = 'xmt-read-total';
var textLength = editor.body.innerText.replace(/^\s+|\s+$/g, '').length;
var emojiLength = editor.body.querySelectorAll("img[data-type='xmt-emoji']").length;
var imgLength = editor.body.querySelectorAll("img").length - emojiLength;
var readTime = Math.ceil(textLength / 400);
el.innerHTML = '<p><span class="label">正文共：</span>' +
    '<span class="count" id="J_xmt_text">'+textLength+'</span>&nbsp;字' +
    '              <span class="imgCount" id="J_xmt_img">'+imgLength+'</span>&nbsp;图' +
    '           </span>' +
    '          <p>' +
    '           <span class="label">预计阅读时间：</span>' +
    '           <span class="count" id="J_xmt_read">'+readTime+'</span>&nbsp;分钟' +
    '          </p>';
document.querySelector(".tool_bar").appendChild(el);

editor.addListener('contentChange', function (e) {
  var textLength = editor.body.innerText.replace(/\s/g,"").length;
  var emojiLength = editor.body.querySelectorAll("img[data-type='xmt-emoji']").length;
  var imgLength = editor.body.querySelectorAll("img").length - emojiLength;
  var readTime = Math.ceil(textLength / 400);
  document.querySelector("#J_xmt_text").innerText = textLength;
  document.querySelector("#J_xmt_img").innerText = imgLength;
  document.querySelector("#J_xmt_read").innerText = readTime;
  if(hd_image == '1') {
    replaceHD();
  }
});

function replaceHD() {
  var imgElList = editorBody.querySelectorAll('img');
  for(let i = 0, len = imgElList.length; i < len; i++) {
    var el = imgElList[i];
    var oriSrc = el.getAttribute('src');
    var regImage = new RegExp(/0\?wx_fmt=/);
    if(regImage.exec(oriSrc) !== null){
      let src = oriSrc.replace('/0?wx_fmt', '/?wx_fmt').replace('/640?wx_fmt', '/?wx_fmt');
      el.setAttribute('src', src);
      el.setAttribute('_src', src);
      console.log('---save img----');
      console.log(src);
      editor.undoManger.save();
    }
  }
}