/**
 * Created by pg on 2017/4/27.
 */
var editor = UE.getEditor("js_editor");

var multiSelecting = false

// 当前操作的 style-block
var styleDom = {}

var findChildNodes = function(root, type){
  var domArr = []
  function findNodes(root){
    if(root.nodeType === type ){
      domArr.push(root)
    }
    if(root.nodeType === 1){
      var children = root.childNodes;
      for(var i = 0; i < children.length; i++) {
        findNodes(children[i]);
      }
    }
  }
  findNodes(root)
  return domArr
}

$('#xmt-style-checkbox').on('click', function(e){
  multiSelecting = e.target.checked
})

$('.xmt-style-menu-item.item_6').on('click', function(){
  multiSelecting = false
})

$('.style-switch').on('click',function(){
  multiSelecting = false
})

$(".xmt-template-list").on("click",".list-item",function (e) {
  if(!multiSelecting && e.target.className !== 'xmt-style-del' && e.target.className !== 'xmt-style-collect' && !e.currentTarget.classList.contains('style-list-tip')){
    editor.undoManger.save();
    var styleType = parseInt($(e.currentTarget).find('.xmt-style-block').data('style-type'))
    var tempDiv = $('<div></div>')
    tempDiv.append($(e.currentTarget).find('.xmt-style-block').clone())
    var dom = tempDiv.html();
    var selectedRange = editor.selection.getRange();
    var contents = selectedRange.cloneContents();
    var insertContentDom = document.createElement('div')
    if(contents){
      insertContentDom.appendChild(contents.cloneNode(true))
    }

    var insertTextNodesArr = findChildNodes(insertContentDom, 3)
    var parent = document.createElement("section");
    dom = dom.replace(/<img/g,'<img data-type="xmt-style-img"')
    parent.innerHTML = dom;
    if(contents){
      if(styleType == 6){
        // console.log(parent)
        var contentContainer = parent.querySelector('.xmt-style-block').querySelector('section').querySelector('section')
        contentContainer.innerHTML = ''
        contentContainer.appendChild(contents.cloneNode(true))
        // console.log(parent)
      } else {
        var textNodesArr = findChildNodes(parent, 3)
        var textNodesElArr = []
        // var longestNodeIndex = 0
        for(var i = 0; i < textNodesArr.length; i++){
          textNodesElArr.push($(textNodesArr[i]).parent())
        }
        if(textNodesArr.length == 1){
          textNodesElArr[0].text(contents.textContent);
        } else {
          for(var i = 0; i < insertTextNodesArr.length; i++){
            if(i < textNodesElArr.length){
              textNodesElArr[i].text(insertTextNodesArr[i].textContent);
            } else {
              textNodesElArr[textNodesArr.length-1].append(insertTextNodesArr[i]);
            }
          }
        }
      }
    }
    dom= parent.innerHTML
    editor.execCommand("inserthtml", dom)

    $(".xmt-template-list, .xmt-style, .appmsg_preview_area, #bottom_main, .xmt-style-menu-item.item_6").removeClass('expand')
    $(".xmt-style-menu-item.item_6").removeClass('current')
    $('#xmt-style-checkbox')[0].checked = false
    editor.undoManger.save()
  }
})


var selectObserver = new MutationObserver(function(mutations){
  mutations.forEach(function(mutation){
    if(mutation.type == 'childList' || mutation.type == 'attributes' || mutation.type == 'characterData'){
      selectDomModified()
    }
  })
});

function selectDomModified() {
  var saveBtn = $(".edui-editor-iframeholder").find('#xmt-style-save-btn')
  if(saveBtn){
    saveBtn.removeClass('disable').text('保存')
  }
  var h = $(styleDom).height();
  if(h==0){
    return removeTemplate();
  }
  var t = $(styleDom).offset().top;
  var top = t + 6;
  var bom = top + h + 10;
  var height = h + 10;
  $(".xmt-template-tool-menu").css({top:""+bom+"px"});
  $(".xmt-template-focus-border-top").css({top:""+top+"px"});
  $(".xmt-template-focus-border-bottom").css({top:""+bom+"px"});
  $(".xmt-template-focus-border-left,.xmt-template-focus-border-right").css({height:""+height+"px"});
}

var contentDocument = document.getElementById('ueditor_0').contentDocument;
$(contentDocument).on("click",".xmt-style-block",function (e) {
  removeTemplate();
  e.stopPropagation();
  styleDom=e.currentTarget;
  styleEdit();
  selectObserver.observe(styleDom,{childList:true,subtree:true})
})


function styleEdit() {
  var top = $(styleDom).offset().top + 6;
  var left = $(styleDom).offset().left - 6;
  var bom = top + $(styleDom).height() + 10;
  var height = $(styleDom).height() + 10;
  var width = $(styleDom).innerWidth()+10;
  var editDom = $('<div class="xmt-template"><div class="xmt-component xmt-template-tool-menu"><ul>' +
      '<li><a data-operate-type="1" href="javascript:void(0)">删除</a></li>' +
      '<li><a data-operate-type="2" href="javascript:void(0)" id="xmt-style-color-btn">修改主题颜色</a></li>'+
      '<li><a data-operate-type="3" href="javascript:void(0)">清除样式</a></li>'+
      '<li><a data-operate-type="4" href="javascript:void(0)">前空行</a></li>'+
      '<li><a data-operate-type="5" href="javascript:void(0)">后空行</a></li>'+
      (styleDom.getAttribute('data-style-type') == 5 ? '<li><a data-operate-type="6" id="xmt-style-save-btn" href="javascript:void(0)">保存</a></li>':'') +
      '</ul></div>' +
      '<div class="xmt-component xmt-template-focus-border-top" style="left: '+left+'px;top:'+top+'px;width: '+width+'px;"></div>'+
      '<div class="xmt-component xmt-template-focus-border-right" style="left: '+(width+left)+'px;top:'+top+'px;height:'+height+'px;"></div>'+
      '<div class="xmt-component xmt-template-focus-border-bottom" style="left: '+left+'px;top:'+bom+'px;width: '+width+'px;"></div>'+
      '<div class="xmt-component xmt-template-focus-border-left" style="left: '+left+'px;top: '+top+'px;height: '+height+'px;"></div></div>')
  $(".edui-editor-iframeholder").append(editDom);
  var menubar = editDom.find('.xmt-template-tool-menu')
  menubar.css({'top': bom+'px', 'left': (left+width-menubar.width())+'px'})

  color(styleDom);
  $(".xmt-template-tool-menu a").click(function (e) {
    editor.undoManger.save();
    var action = e.target.getAttribute('data-operate-type');
    switch(action){
      case "1":
        remove();
        removeTemplate();
        break;
      case "3":
        clearStyle();
        removeTemplate();
        break;
      case "4":
        frontBlank();
        top = top + 25;
        bom = bom + 25;
        $(".xmt-template-tool-menu").css({top:""+bom+"px"});
        $(".xmt-template-focus-border-top").css({top:""+top+"px"});
        $(".xmt-template-focus-border-bottom").css({top:""+bom+"px"});
        $(".xmt-template-focus-border-left,.xmt-template-focus-border-right").css({top:""+top+"px"});
        break;
      case "5":
        backBlank();
        break;
      case "6":
        if(!$(e.target).hasClass('disable')){
          $(e.target).addClass('disable')
          saveStyle(function(){
            $(e.target).text('已保存');
          }, function(){
            $(e.target).text('保存失败');
            setTimeout(function(){
              $(e.target).text('保存').removeClass('disable')
            }, 1000)
          })
        }
        break;
    }
    editor.undoManger.save();
  })
}
function removeTemplate() {
  $("#xmt-style-color-btn").spectrum("destroy");
  $(".xmt-template").remove();
  selectObserver.disconnect();
}


var regex = "[\\s\\S]*";
var regStr = {
  getRgba: ["rgba?" + regex + "?\\)|#[\\w\\d]*[^(?=;|\"|')]", "gi"],
  getInlineStyle: ["style=[\"']" + regex + "?[\"']", "gi"],
  getAllInlineStyle: ["style=['\"]|(;?)['\"]$", "gi"],
  getColorKeyAndVal: ["([-\\w]+):([\\s\\S]+)", ""],
  getObjKeyAndVal: ["\\s*:\\s*", "g"],
  getSharpCode: ["[\\s#]", "gi"],
  getColorHexVal: ["#[\\w\\d]*", "gi"]
};
for (var i in regStr){
  regStr[i] = new RegExp(regStr[i][0],regStr[i][1]);
}


var f_notGray = function(colors) {
  var newColor = colors.filter(function (c) {
    if (/rgba?/gi.test(c)) {
      var rgb = c.match(/\d+/g);
      if (rgb[0] == rgb[1] && rgb[1] == rgb[2]) {
        return !1;
      } else {
        return !0;
      }
    } else if (regStr.getColorHexVal.test(c)) {
      var hex = c.replace(regStr.getSharpCode, '');
      if (hex.length == 6) {
        if (hex.substr(0, 2) == hex.substr(2, 2) && hex.substr(2, 2) == hex.substr(4, 2)) {
          return !1;
        } else {
          return !0;
        }
      } else {
        var substr = hex.split("");
        if (substr[0] == substr[1] && substr[1] == substr[2]) {
          return !1;
        } else {
          return !0;
        }
      }
    }
  });
  return newColor.length > 0;
}


var htmlSetColor = function(html, bgColor, fontColor) {
  //替换模板中每一标签的字体颜色和背景色，边框色
  var v_colorReg = regStr.getRgba;//匹配颜色值
  var v_styleReg = regStr.getInlineStyle;//匹配行内样式
  var div = document.createElement('div');
  div.innerHTML = html;
  var children = div.querySelectorAll("[style*='color']");

  for (var i = 0, dom; dom = children[i++];) {
    var newDom = dom.cloneNode(!0);
    newDom.innerHTML = "";
    var out = newDom.outerHTML;
    var styleObj = "";
    //读取初始样式
    if (dom.getAttribute('data-css')) {
      styleObj = dom.getAttribute('data-css').split(";").sort();
    } else {
      styleObj = out.match(v_styleReg)[0]
      .replace(regStr.getAllInlineStyle, "")
      .replace(/\&quot;/gi, '"')
      .replace(/\&\#39;/gi, '"')
      .split(/\s*;\s*/).sort();
      //缓存初始样式
      dom.setAttribute('data-css', styleObj.join(";"));
    }
    var hasBg = !1;
    styleObj = styleObj.map(function(v) {
      v = v.replace(regStr.getObjKeyAndVal, ':');
      var color = regStr.getColorKeyAndVal.exec(v);
      if (color == null) {
        return "";
      }
      var key = color[1];
      var val = color[2];
      //判断是否有颜色值，并且不是纯色值
      if (val != 'transparent' && v_colorReg.test(val) && v.match(v_colorReg) && f_notGray(v.match(v_colorReg))) {
        //修改背景色
        if (/background/.test(key)) {
          hasBg = !0;
          val = bgColor;
          return key + ":" + val;
        } else if (key == 'color') {
          //如果是字体颜色，查看父元素是否有背景色
          if (hasBg) {
            val = fontColor;
            hasBg = !1;
          } else {
            val = bgColor;
          }
          return key + ":" + val;
        } else {
          //修改border,outline等颜色
          val = val.replace(v_colorReg, bgColor);
          return key + ":" + val;
        }
      }
      return key + ":" + val;
    });
    dom.setAttribute('style', styleObj.join(';'));
  }
  return div.innerHTML;
}


var lightOrdark = function(color) {
  //设置模板颜色
  var hslColor = color.toHsl();
  //var l = color.l > 0.4 && color.l < 0.6 ? (color.l + 0.4) : (1 - color.l);//更智能的调色功能，暂时不适用
  var l = hslColor.l > 0.5 ? 0.01 : 0.99;
  var bgColor = color.toRgbString();
  var fontColor = "hsla(" + hslColor.h + "," + 100 * hslColor.s + "%," + 100 * l + "%," + hslColor.a + ")";
  return [bgColor, fontColor]
}

function color() {
  var setColor= function(color){
    if (color) {
      var t = lightOrdark(color);
      if (styleDom) {
        var r = htmlSetColor(styleDom.innerHTML, t[0], t[1]);
        styleDom.innerHTML = r
      }
    }
  };
  $("#xmt-style-color-btn").spectrum({
    allowEmpty: true,
    showInput: true,
    className: "xmt-spectrum",
    showInitial: false,
    showPalette: true,
    chooseText: "确定",
    cancelText: "取消",
    showSelectionPalette: true,
    maxSelectionSize: 10,
    preferredFormat: "hex",
    palette: [
      ["#B30112", "#F0961C", "#F5E518", "#764520", "#6DCD19", "#AB00D7"], ["#AAE873", "#000101", "#383938", "#CECFCE", "#8393D1", "#CF3E44"], ["#B18850", "#31B16C"]
    ],
    change: function (color) {
      var xmt_color_arr = window.localStorage.getItem('xmt_color');
      if(xmt_color_arr !== null) {
          xmt_color_arr = xmt_color_arr.split(',');
      } else {
          xmt_color_arr = [];
      }
      if(xmt_color_arr.length < 3) {
        xmt_color_arr.push(color);
      } else {
        xmt_color_arr.splice(0,1);
        xmt_color_arr.push(color);
      }
      window.localStorage.setItem('xmt_color', xmt_color_arr.join(','));
      setColor(color)
    },
    move: function(color){
      setColor(color)
    }
  });

  var xmt_color_arr = window.localStorage.getItem('xmt_color');
  let version = document.body.getAttribute('xmt-extension-version') || 6.41;
  if(xmt_color_arr !== null || version < 5.52) {
    xmt_color_arr = xmt_color_arr.split(',');
    var html = '<div class="xmt_color_record" style="margin-top: 20px;"><p style="color: #666;font-size: 14px;">最近使用</p><ul>'
    for(var i = 0; i < xmt_color_arr.length; i++) {
      html += '<li style="cursor:pointer;" class="xmt_select_color" data-color='+xmt_color_arr[i]+'>' +
          '<span title="#b30112" style="position: relative;top: 2px;display:inline-block;width: 16px;height: 16px;margin: 2px 1px;border: solid 1px #d0d0d0;" class="sp-thumb-el sp-thumb-dark">' +
          '  <span class="sp-thumb-inner" style="background-color:'+ xmt_color_arr[i] +';"></span></span>' +
          '<span style="vertical-align: super;margin-left: 5px;color: #333333;">'+xmt_color_arr[i]+'</span></li>';
    }
    html += '</ul></div>';
    if($('.xmt_color_record').length === 0) {
      $('.sp-palette-container').append(html);
    }
    $(".xmt_select_color").click(function () {
      var color = $(this).data('color');
      setColor(tinycolor(color));
      $('.sp-cancel').trigger('click');
    });
  }
}




function remove() {
  styleDom.remove();
}
function clearStyle() {
  styleDom.removeAttribute("style");
  styleDom.removeAttribute("class");
  styleDom.removeAttribute("data-tools");
  $(styleDom).find("*").removeAttr("style").removeAttr("class").removeAttr("data-tools").removeAttr('data-type');
}
function frontBlank() {
  $(styleDom).before("<p><br/></p>");
}
function backBlank() {
  $(styleDom).after("<p><br/></p>");
}
$(contentDocument).click(function () {
  var template = $(".xmt-template");
  if(template.length != 0){
    removeTemplate();
  }
})


function saveStyle(resolve, reject){
  var type = styleDom.getAttribute('data-style-type')
  if(type == 5){
    var id = styleDom.getAttribute('data-id')
    var content = styleDom.innerHTML
  }
  var extensionId = document.body.getAttribute('xmt-extension-id')
  chrome.runtime.sendMessage(extensionId ,{event: "editCollectedStyle", id: id, content: content}, function(res){
    if(res.success){
      resolve()
    } else {
      reject()
    }
  })

}