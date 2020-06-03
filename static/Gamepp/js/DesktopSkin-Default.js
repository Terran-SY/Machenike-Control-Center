// window.CallNative('SetWindowSize', 455, 429, 10);
// window.CallNative('SetWindowSize', 455, 500, 10);

$("#Outermost,#OutermostDefault").mousemove(function (e) {
    if (e.which == 1) {
        window.CallNativeSync('{"func":"WP_MouseMove"}');
    }
}).mousedown(function () {
    window.CallNativeSync('{"func":"WP_MouseDown"}');
}).mouseup(function () {
    window.CallNativeSync('{"func":"WP_MouseUp"}');
});

var DSLan = window.CallNativeSync('{"func":"WP_GetLanguage"}');
var data_arr = $.parseJSON(DSLan);
var Languagevalue = (data_arr.value).toLowerCase();
SwitchLanguage((Languagevalue));

var DATAArr0 = [], DATAArr1 = [], DATAArr2 = [], DATAArr3 = [], memoryload = 0;
// var str = '{"background":"../img/DesktopSkin/img_bg_default.png","cpu":[{"clock":3676,"fans":0,"power":21,"temperature":46,"usage":12}],"cpuswitch":1,"download":0,"gpu":[{"MemoryClock":1750,"MemorySize":4096,"MemoryUsage":"361M/4096M","MemoryUsed":360,"clock":309,"fans":748,"power":28,"temperature":46,"usage":0}],"gpumemswitch":1,"gpuswitch":1,"language":"CN","lock":0,"memoryload":34,"memoryswitch":1,"memorytotal":16336,"networkswitch":1,"titleswitch":0,"upload":0}';
// var str = '{"background":"../img/DesktopSkin/Wallpaper/img_bg_style1.png","cpu":[{"clock":2693,"fans":0,"maxclock":2694,"maxpower":15,"power":12,"temperature":41,"usage":28}],"cpuswitch":1,"download":0,"gpu":[{"MemoryClock":1066,"MemorySize":0,"MemoryUsage":"111M/0M","MemoryUsed":110,"clock":300,"fans":0,"maxclock":300,"power":0,"shadres":954,"temperature":44,"usage":0},{"MemoryClock":324,"MemorySize":2048,"MemoryUsage":"26M/2048M","MemoryUsed":26,"clock":135,"fans":0,"maxclock":300,"power":0,"shadres":384,"temperature":31,"usage":0}],"gpumemswitch":1,"gpuswitch":1,"language":"CN","lock":0,"memoryload":43,"memoryswitch":1,"memorytotal":8092,"networkswitch":1,"titleswitch":0,"type":1,"upload":0}';
// DS_LoadConfig_Child(str);

function DS_LoadConfig_Child(str) {
    // $('#OutermostI').val(str);
    var data_arr = $.parseJSON(str);
    // console.log(data_arr);style1
    $.each(data_arr, function (k, v) {
        switch (k) {
            case 'background':
                if ($('#background').val() != v) {
                    ChangePreviewBackground(v);
                }
                $('#background').val(v);
                break;
            case 'language':
                DataProcessLanguage(v);
                break;
            case 'cpu':
                DataProcessCpu(v);
                break;
            case 'gpu':
                DataProcessGpu(v);
                break;
            case 'memoryload':
            case 'memorytotal':
            case 'upload':
            case 'download':
                DataProcessOneArr(v, k);
                break;
            case 'cpuswitch':
            case 'gpuswitch':
            case 'gpumemswitch':
            case 'memoryswitch':
            case 'networkswitch':
            case 'titleswitch':
                StatusProcess(v, k);
                break;
            default:
                break;
        }
    });


}


scheduleX({
    fulfill: (0),   //选择数
    listAll: 100, speed: 25, bgColor: "rgba(255, 0, 0, 0)", listColor: "#ffca58;", scWidth: "90", scHeight: "6"
});

scheduleX2({
    fulfill: (0),   //选择数
    listAll: 100, speed: 25, bgColor: "rgba(255, 0, 0, 0)", listColor: "#ffca58;", scWidth: "90", scHeight: "6"
});

scheduleX3({
    fulfill: (0),   //选择数
    listAll: 100, speed: 25, bgColor: "rgba(255, 0, 0, 0)", listColor: "#ffca58;", scWidth: "90", scHeight: "6"
});

scheduleX4({
    fulfill: (0),   //选择数
    listAll: 100, speed: 25, bgColor: "rgba(255, 0, 0, 0)", listColor: "#ffca58;", scWidth: "90", scHeight: "6"
});


/*主程序改变背景*/
function ChangePreviewBackground(value) {
    console.log(value);
    if (value.indexOf('default') !== -1) {
        UseSkin = '../img/DesktopSkin/img_big_default.png';
        DefaultSkinStyle();
    } else if (value.indexOf('_style_') !== -1) {
        UseSkin = value.replace('_style_', '_big_');
    } else if (value.indexOf('_bg_style') !== -1) {
        UseSkin = value.replace('_bg_style', '_bg_plan');
        FloatingSkinStyleIMG(value);
    } else {
        UseSkin = value;//浮窗模式壁纸
        FloatingSkinStyle();
    }
    $('.Desktop-Skin').css('background', 'url("' + UseSkin + '")no-repeat');
}

function DefaultSkinStyle() {
    $('#Outermost').hide();
    $('#OutermostDefault').show();
    $('.skin_icon').each(function (k, v) {
        $(v).attr('src', $(v).attr('src').replace('_y', '_w'));
    });
    $('.ColTitle').css({"color": "white", "fontweight": "lighter"});
    $('.ColText').css({"color": "white", "fontweight": "normal"});
    // $('#OscheduleX2').css('border-color', '#177bca');
    // $('.xList2').css('background-color', '#177bca');
    // $('.container-diagram').css('border-bottom', '1px solid #908d8d')

    setTimeout(function () {
        $('#Outermost').hide();
        $('#OutermostDefault').show();
        $('#OutermostDefault .Skin-pattern-all,#OutermostDefault .Skin-pattern-Memory,#OutermostDefault .Skin-pattern-Network').css('visibility', 'visible');
        $('.DesktopSkinLoad').remove();
    }, 1000);
}


function FloatingSkinStyle() {
    $('.skin_icon').each(function (k, v) {
        $(v).attr('src', $(v).attr('src').replace('_w', '_y'));
    });
    $('.ColTitle').css({"color": "#FFCA58", "fontweight": "bold"});
    $('.ColText').css({"color": "#FFCA58", "fontweight": "bold"});
    $('.xList2').css('background', 'linear-gradient(90deg,rgba(216,132,1,1) 0%,rgba(240,203,72,1) 100%)');
    $('#OscheduleX2').css('border-color', '#FFCA58');
    setTimeout(function () {
        $('#Outermost').show();
        $('#OutermostDefault').hide();
        $('#Outermost .Skin-pattern-all,#Outermost .Skin-pattern-Memory,#Outermost .Skin-pattern-Network').css('visibility', 'visible');
        $('.DesktopSkinLoad').remove();
    }, 1000);
}

function FloatingSkinStyleIMG(value) {
    if (value.indexOf('style1') !== -1) {
        $('.skin_icon').each(function (k, v) {
            $(v).attr('src', $(v).attr('src').replace('_y', '_w'));
        });
        $('.ColTitle').css({"color": "white", "fontweight": "lighter"});
        $('.ColText').css({"color": "white", "fontweight": "normal"});

        $('#OscheduleX2').css('border-color', '#177bca');
        $('.xList2').css('background', 'linear-gradient(-90deg,rgba(74,156,214,1),rgba(23,90,225,1))');
    } else {
        $('.skin_icon').each(function (k, v) {
            $(v).attr('src', $(v).attr('src').replace('_w', '_y'));
        });
        $('.ColTitle').css({"color": "#FFCA58", "fontweight": "bold"});
        $('.ColText').css({"color": "#FFCA58", "fontweight": "bold"});
        $('#OscheduleX2').css('border-color', '#FFCA58');
        $('.xList2').css('background', 'linear-gradient(90deg,rgba(216,132,1,1) 0%,rgba(240,203,72,1) 100%)');
    }
    setTimeout(function () {
        $('#Outermost').show();
        $('#OutermostDefault').hide();
        $('#Outermost .Skin-pattern-all,#Outermost .Skin-pattern-Memory,#Outermost .Skin-pattern-Network').css('visibility', 'visible');
        $('.DesktopSkinLoad').remove();
    }, 1000);
}

function DataProcessLanguage(data) {
    if ($('#language').val() != data) {
        SwitchLanguage(((data).toLowerCase()));
    }
    $('#language').val(data);
}

function DataProcessCpu(data) {
    if (data.length === 0 || data === []) {
        $('.cpuswitch').remove();
    } else {
        $.each(data, function (k, v) {
            $.each(v, function (m, n) {
                if (m === 'temperature' || m === 'usage') {
                    if (m === 'usage') {
                        UpdateData(n, 'placeholder', DATAArr0, '#ffca58');
                        UpdateData(n, 'placeholder1', DATAArr0, '#ffca58');
                    } else if (m === 'temperature') {
                        UpdateData(n, 'placeholder-two', DATAArr1, '#ffca58');
                        UpdateData(n, 'placeholder-two1', DATAArr1, '#ffca58');
                    }
                    $('#CPU_' + m).text((n));
                    $('#CPU_' + m + '1').text((n));
                } else if (m === 'clock' || m === 'fans' || m === 'power') {
                    if (n !== 0 && n !== null) {
                        $('#OCPU_' + m).show();
                        $('#OCPU_' + m + '1').show();
                        $('#CPU_' + m).text((n));
                        $('#CPU_' + m + '1').text((n));
                    } else {
                        $('#OCPU_' + m).hide();
                        $('#OCPU_' + m + '1').hide();
                    }
                }
            });
        })
    }
}

function DataProcessGpu(data) {
    console.log(data);
    if (data.length === 0 || data === []) {
        $('.gpuswitch').remove();
    } else if (data.length === 2) {
        if (data[0]['shadres'] < data[1]['shadres']) {
            StandGPULoca = 1;
        } else {
            StandGPULoca = 0;
        }
        if (data[1]['usage'] === 0 && data[0]['usage'] !== 0) {
            StandGPULoca = 0;
        }
        $.each(data[StandGPULoca], function (m, n) {
            if (m === 'MemoryUsage') {
                MemoryUse = parseFloat(((data[StandGPULoca].MemoryUsed) / 1024).toFixed(1));
                MemoryTotal = parseFloat(((data[StandGPULoca].MemorySize) / 1024).toFixed(1));
                if (MemoryUse == 0) {
                    MemoryUse = 0.1;
                }
                $('#scheduleX2 .xList2').css('width', toPercent(MemoryUse, MemoryTotal) + '%');
                $('#scheduleX4 .xList4').css('width', toPercent(MemoryUse, MemoryTotal) + '%');
                $('#MemoryUsage').html('<span>' + MemoryUse + 'G</span><span style="margin-left: 4px;margin-right: 4px;">/</span><span>' + MemoryTotal + 'G</span>');
                $('#MemoryUsage1').html('<span>' + MemoryUse + 'G</span><span style="margin-left: 4px;margin-right: 4px;">/</span><span>' + MemoryTotal + 'G</span>');
            } else {
                if (($('#background').val()).indexOf('style1') !== -1) {
                    if (m === 'usage') {
                        UpdateData(n, 'placeholder-three', DATAArr2, '#177bca');
                        UpdateData(n, 'placeholder-three1', DATAArr2, '#177bca');
                    } else if (m === 'temperature') {
                        UpdateData(n, 'placeholder-four', DATAArr3, '#177bca');
                        UpdateData(n, 'placeholder-four1', DATAArr3, '#177bca');
                    }
                } else {
                    if (m === 'usage') {
                        UpdateData(n, 'placeholder-three', DATAArr2, '#ffca58');
                        UpdateData(n, 'placeholder-three1', DATAArr2, '#177bca');
                    } else if (m === 'temperature') {
                        UpdateData(n, 'placeholder-four', DATAArr3, '#ffca58');
                        UpdateData(n, 'placeholder-four1', DATAArr3, '#177bca');
                    }
                }
                if (n !== 0 && n !== null) {
                    $('#OGPU_' + m).show();
                    $('#OGPU_' + m + '1').show();
                    $('#GPU_' + m).text((n));
                    $('#GPU_' + m + '1').text((n));
                } else {
                    $('#OGPU_' + m).hide();
                    $('#OGPU_' + m + '1').hide();
                }
            }
        });

    } else {
        $.each(data, function (k, v) {
            $.each(v, function (m, n) {
                if (m === 'MemoryUsage') {
                    // MemoryUse = ((n).split('/')[0].replace('M', '') / 1024).toPrecision(1);
                    // MemoryTotal = ((n).split('/')[1].replace('M', '') / 1024).toPrecision(1);
                    MemoryUse = parseFloat(((v.MemoryUsed) / 1024).toFixed(1));
                    MemoryTotal = parseFloat(((v.MemorySize) / 1024).toFixed(1));
                    if (MemoryUse == 0) {
                        MemoryUse = 0.1;
                    }
                    $('#scheduleX2 .xList2').css('width', toPercent(MemoryUse, MemoryTotal) + '%');
                    $('#scheduleX4 .xList4').css('width', toPercent(MemoryUse, MemoryTotal) + '%');
                    $('#MemoryUsage').html('<span>' + MemoryUse + 'G</span><span style="margin-left: 4px;margin-right: 4px;">/</span><span>' + MemoryTotal + 'G</span>');
                    $('#MemoryUsage1').html('<span>' + MemoryUse + 'G</span><span style="margin-left: 4px;margin-right: 4px;">/</span><span>' + MemoryTotal + 'G</span>');
                } else {
                    if (($('#background').val()).indexOf('style1') !== -1) {
                        if (m === 'usage') {
                            UpdateData(n, 'placeholder-three', DATAArr2, '#177bca');
                            UpdateData(n, 'placeholder-three1', DATAArr2, '#177bca');
                        } else if (m === 'temperature') {
                            UpdateData(n, 'placeholder-four', DATAArr3, '#177bca');
                            UpdateData(n, 'placeholder-four1', DATAArr3, '#177bca');
                        }
                    } else {
                        if (m === 'usage') {
                            UpdateData(n, 'placeholder-three', DATAArr2, '#ffca58');
                            UpdateData(n, 'placeholder-three1', DATAArr2, '#177bca');
                        } else if (m === 'temperature') {
                            UpdateData(n, 'placeholder-four', DATAArr3, '#ffca58');
                            UpdateData(n, 'placeholder-four1', DATAArr3, '#177bca');
                        }
                    }


                    if (n !== 0 && n !== null) {
                        $('#OGPU_' + m).show();
                        $('#OGPU_' + m + '1').show();
                        $('#GPU_' + m).text((n));
                        $('#GPU_' + m + '1').text((n));
                    } else {
                        $('#OGPU_' + m).hide();
                        $('#OGPU_' + m + '1').hide();
                    }
                }
            });
        });

    }
}


function toPercent(num, total) {
    return (Math.round(num / total * 10000) / 100.00);
}

function DataProcessOneArr(data, type) {
    if (type === 'download' || type === 'upload') {
        $('#' + type).text(bytesToSize(data) + '/s');
        $('#' + type + '1').text(bytesToSize(data) + '/s');
    } else if (type === 'memoryload') {
        memoryload = data;
        $('#scheduleX .xList').css('width', data + '%');
        $('#scheduleX3 .xList3').css('width', data + '%')
    } else if (type === 'memorytotal') {
        var memoryloadM = (data * (memoryload / 100)).toFixed(2);
        $('#memoryload').text(Number(memoryloadM / 1024).toPrecision(2) + 'G');
        $('#memoryload1').text(Number(memoryloadM / 1024).toPrecision(2) + 'G');
        MemoryTotal = Number(data / 1024).toPrecision(2);
        $('#memorytotal').text(MemoryTotal + 'G');
        $('#memorytotal1').text(MemoryTotal + 'G');
    }
}


//格式化字节
function bytesToSize1(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1024;
    sizes = ['  KB', ' MB'];
    i = Math.floor(Math.log(bytes) / Math.log(k));
    return (Math.round((bytes / Math.pow(k, i)) * 100)) / 100 + sizes[i];
}


function bytesToSize(bytes) {
    if (bytes === 0) return '0 KB';
    var k = 1024, // or 1024
        sizes = ['  KB', ' MB'];
    i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}


function UpdateData(data, Element, DataArr, Color) {
    data = data < 100 ? data : 100;
    if (DataArr.length > 30) {
        DataArr.splice(DataArr, 1);
    }
    DataArr.push(data);
    var res = [];
    for (var i = 0; i < DataArr.length; ++i)
        res.push([i, DataArr[i]]);
    // 设置绘图参数
    var options = {
        yaxis: {min: 0, max: 100, show: true}, // Y 轴的最大值最小值
        xaxis: {show: false, max: 30}, // 不显示 X 轴
        colors: [Color],
        grid: {show: false, borderColor: 'rgba(0, 0, 0, 0)', borderWidth: 1},
        bars: {
            show: false
        },
        series: {
            shadowSize: 0, // 绘制线的阴影，不绘制设置 0
            lines: {
                show: true,//显示线段
                lineWidth: 1
            }
        }
    };
    // 绘图对象 参数为：绘制地点、数据、属性
    var plot = $.plot($('#' + Element), [res], options);
    // 要实现动态绘图，只需重新设置其数据即可
    plot.setData([res]); // 设置数据
    // 轴线不改变，不用调用 plot.setupGrid()
    plot.draw();
}


function StatusProcess(status, title) {
    if (title == 'titleswitch') {
        if (status == 1) {
            $('.' + title).hide();
        } else {
            $('.' + title).show();
        }
    } else {
        if (status == 1) {
            $('.' + title).show();
        } else {
            $('.' + title).hide();
        }
    }

}

//主程序调用解锁锁定
function WP_SetLockState_Child(value) {
    // var value = '{"lock":"0"}';
    var data_arr = $.parseJSON(value);
    if (data_arr.lock === 0) {
        $('.dragLayer-locking').show();
        // $('#titleswitch').hide().removeClass('titleswitch');
        // $('#titleswitch1').hide().removeClass('titleswitch');
    } else {
        $('.dragLayer-locking').hide();
        // $('#titleswitch').show().addClass('titleswitch');
        // $('#titleswitch1').show().addClass('titleswitch');
    }
}

function GPP_WinLock() {
    $('.dragLayer-locking').hide();
    window.CallNative('{"func":"WP_SetWindowPenetrate"}');
}