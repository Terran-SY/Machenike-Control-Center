function SwitchLanguage(lan){Languagevalue=lan;$("[set-lan]").each(function(){var me=$(this);var a=me.attr("set-lan").split(":");var p=a[0];var m=a[1];switch(lan){case"cn":var t=cn[m];break;case"en":var t=en[m];break;default:break}if(t==undefined){t=cn[m]}if(t==undefined){t=en[m]}if(t==undefined){return true}switch(p){case"html":me.html(t);break;case"val":case"value":me.val(t);break;case"text":me.text(t);break;case"placeholder":me.attr("placeholder",t);break;case"title":me.attr("title",t);break;default:console.log(1);me.html(t)}})};
//添加点击统计
function GPP_SendStatics(id) {
    var str = '{"func":"GPP_SendStatics","value":' + id + '}';
    // layui.use('layer', function () {
    //     var layer = layui.layer;
    //     layer.msg(str, {time: 8500, area: '280px'}, function () {});
    // });
    console.log(str);
    window.CallNative(str);
}