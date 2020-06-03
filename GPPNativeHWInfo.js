var TempeInfo = '';
var setTime = 0;

var cpu = 0;
var gpu = 0;
var harddisk = 0;
var mainboard = 0;
var memory = 0;


//获取电脑配置

//CPU
var NeedCPUInfoArr = ["CPU ID", "Original Processor Frequency", "Original Processor Frequency [MHz]", "CPU Stepping", "CPU Code Name", "CPU Technology", "CPU Thermal Design Power (TDP)", "CPU Power Limit 1 - Long Duration", "CPU Power Limit 2 - Short Duration", "CPU Max. Junction Temperature (Tj,max)", "CPU Platform", "Microcode Update Revision", "Number of CPU Cores", "Number of Logical CPUs", "CPU LFM (Minimum)", "CPU HFM (Base)", "CPU Turbo Max", "Turbo Ratio Limits", "CPU Current", "LLC/Ring Maximum", "LLC/Ring Current", "System Agent Current", "L1 Cache", "L2 Cache", "L3 Cache", "Instruction TLB", "Data TLB", "MMX Technology", "Streaming SIMD Extensions", "Streaming SIMD Extensions 2", "Streaming SIMD Extensions 3", "Streaming SIMD Extensions 4.1", "Streaming SIMD Extensions 4.2", "64-bit Extensions", "AVX Support", "Advanced Vector Extensions 2 (AVX2)", "Advanced Vector Extensions 512 (AVX-512)", "AES Cryptography Support", "Fused Multiply Add (FMA)", "Hardware Lock Elision (HLE)", "Restricted Transactional Memory (RTM)", "x86-64 Long Mode"];

//主板
var NeedMOBOInfoArr = ['Computer Brand Name', 'Motherboard Model', 'Motherboard Chipset', 'Motherboard Slots', 'PCI Express Version Supported', 'USB Version Supported', 'BIOS Vendor', 'BIOS Version', 'BIOS Release Date', 'BIOS Size', 'Mainboard Manufacturer', 'Mainboard Name', 'UUID'];

//显卡
var NeedGPUInfoArr = ['Video Chipset', 'Video Chipset Codename', 'Video Memory', 'Video Card', 'Video Bus', 'Graphics Processor Clock', 'Graphics Memory Clock', 'Graphics Memory Bus Width', 'Number Of ROPs', 'Number Of Unified Shaders', 'Number Of TMUs (Texture Mapping Units)', 'ASIC Quality', 'Driver Manufacturer', 'Driver Version', 'Driver Date', 'NVIDIA SLI Status', 'Hardware ID'];

//内存
var NeedMEMORYInfoArr = ['Total Memory Size', 'Total Memory Size [MB]', 'Current Memory Clock', 'Memory Channels Active', 'Current Timing (tCAS-tRCD-tRP-tRAS)', 'Command Rate', 'Read to Read Delay (tRD_RD) Same Rank', 'Read to Read Delay (tRD_RD) Different Rank', 'Read to Read Delay (tRD_RD) Different DIMM', 'Write to Write Delay (tWR_WR) Same Rank', 'Write to Write Delay (tWR_WR) Different Rank', 'Write to Write Delay (tWR_WR) Different DIMM', 'Read to Write Delay (tRD_WR) Same Rank', 'Read to Write Delay (tRD_WR) Different Rank', 'Read to Write Delay (tRD_WR) Different DIMM', 'Write to Read Delay (tWR_RD) Same Rank (tWTR)', 'Write to Read Delay (tWR_RD) Different Rank', 'Write to Read Delay (tWR_RD) Different DIMM', 'RAS# to RAS# Delay (tRRD)', 'Refresh Cycle Time (tRFC)', 'Four Activate Window (tFAW)', 'Module Number', 'Module Size', 'Memory Type', 'Memory Speed', 'Module Manufacturer', 'Module Part Number', 'Module Serial Number', 'Module Manufacturing Date', 'SDRAM Manufacturer'];

//显示器
var NeedMONITORInfoArr = ['Monitor Name', 'Monitor Name (Manuf)', 'Date Of Manufacture', 'Horizontal Frequency', 'Vertical Frequency', 'Maximum Pixel Clock', 'Serial Number', '1920 x 1080', '2560*1440', '4096×2160'];

//硬盘
var NeedDRIVESInfoArr = ['Drive Model', 'Drive Capacity', 'Drive Capacity [MB]', 'Media Rotation Rate', 'Drive Controller', '[09] Power-On Hours/Cycle Count', 'Drive Remaining Life', 'Drive Serial Number'];

//声卡
var NeedSOUNDInfoArr = ['Audio Adapter', 'High Definition Audio Codec', 'Driver Manufacturer', 'Driver Version', 'Driver Date'];

//网卡
var NeedNETWORKInfoArr = ['Network Card', 'Vendor Description', 'MAC Address', 'Maximum Link Speed', 'Driver Manufacturer', 'Driver Version', 'Driver Date'];


GPP_LoadHardWareInfo();

// 设置绘图参数
var options = {
    yaxis: {
        min: 10, max: 120, show: true, ticks: 5, tickFormatter: function (v, axis) {
            return (v + ' °C');
        }
    },
    xaxis: {show: false, max: 120}, // 不显示 X 轴
    colors: ["#4AB54F"],
    grid: {show: true, borderColor: ["#E5E5E5"], borderWidth: 1,},
    bars: {show: false},
    series: {
        shadowSize: 0, // 绘制线的阴影，不绘制设置 0
        lines: {
            show: true,//显示线段
            lineWidth: 1.5
        }
    }
};
var plot = $.plot($("#placeholder"), [[]], options);

//判断是否扫描过
IsShowHWProgress();

function IsShowHWProgress() {
    var IsShowStr = Client_CallNativeSync('GPP_IsShowHWProgress');
    Client_CallNativeSync('GPP_ShowAD', 0);
    // var IsShowStr = '{"value":1}';
    var IsShowStr_arr = JSON.parse(IsShowStr);
    var Time = 7000;//扫描时间控制
    if (IsShowStr_arr.value === 0) {
        $('#Loading').css('visibility', 'visible');
        $('#progressbar1').LineProgressbar({
            percentage: 100,//最大百分比
            fillBackgroundColor: 'linear-gradient(90deg,rgba(3,150,211,1),rgba(32,123,236,1));',
            height: '7px', radius: '50px',
            duration: Time,//速度控制
        });
        // GPP_LoadHardWareInfo();
        setTimeout(function () {
            PageLoadData(1);
        }, 3500);
        setTimeout(function () {
            $('#Loading').css('visibility', 'hidden');
            $('#DataPage').css('visibility', 'visible');
            $('#LoadingGifDiv img').remove();
            window.CallNative('{"func":"GPP_SetShowHWProgress","value":1}');
            GPP_ShowCustomSave(312, 1);
        }, Time)
    } else {
        try {
            RunStatus = top.window.GetFirstRunStatus();
        } catch (error) {
            RunStatus = 1;
        }
        if (RunStatus == 0) {
            $('#Loading').css('visibility', 'visible');
            ScanningMsg(eval(Languagevalue)['HdLoad'], '');
            $('#progressbar1').LineProgressbar({
                percentage: 100,//最大百分比
                fillBackgroundColor: 'linear-gradient(90deg,rgba(3,150,211,1),rgba(32,123,236,1));',
                height: '7px', radius: '50px',
                duration: 5000,//速度控制
            });
            setTimeout(function () {
                $('#Loading').css('visibility', 'hidden');
                $('#DataPage').css('visibility', 'visible');
                $('#LoadingGifDiv img').remove();
            }, 5000);

            setTimeout(function () {
                PageLoadData(0);
                GetHWTempInfo();
                UpdateData(window.CallNativeSync('{"func":"GPP_TemperatureListInfor","value":1}'), 'init');
            }, 3500);
            top.window.SetFirstRunStatus();
        } else {
            $('#DataPage').css('visibility', 'visible');
            $('#LoadingGifDiv img').remove();
            PageLoadData(0);
            GetHWTempInfo();
            UpdateData(window.CallNativeSync('{"func":"GPP_TemperatureListInfor","value":1}'), 'init');
        }
    }

}

//重新扫描硬件信息
function HDRescan() {
    $('#LoadingGifDiv').html('<img  src="dist/images/gif_saomiao1.gif" alt=""/>');
    var Time = 7000;//扫描时间控制
    GPP_LoadHardWareInfo();
    $('#Loading').css('visibility', 'visible');
    $('#progressbar1').LineProgressbar({
        percentage: 100,//最大百分比
        fillBackgroundColor: 'linear-gradient(90deg,rgba(3,150,211,1),rgba(32,123,236,1));',
        height: '7px', radius: '50px',
        duration: Time,//速度控制
    });
    clearInterval(TempeInfo);
    clearInterval(TempeInfo1);
    setTimeout(function () {
        $('#Loading').css('visibility', 'hidden');
        $('#DataPage').css('visibility', 'visible');

        PageLoadData(0);
        GetHWTempInfo();
        UpdateData(window.CallNativeSync('{"func":"GPP_TemperatureListInfor","value":1}'), 'init');

    }, Time);
    $('#TempOutermost').show();
}

// var DataStr = {"data":[]}

function PageLoadData(type) {
    if (type === 0) {
        // GPP_LoadHardWareInfo();
    }
    //获取硬件温度
    setInterval(function () {
        GetHWTempInfo();
    }, 2000);
    TempeInfo = setInterval(function () {
        // DataStr['data'].push(Math.floor(Math.random() * (20 - 70) + 70));
        // UpdateData(JSON.stringify(DataStr), 'update');
        UpdateData(window.CallNativeSync('{"func":"GPP_TemperatureListInfor","value":1}'), 'update');
    }, 2000);
}


function ScanningMsg(name, value) {
    setTimeout(function () {
        $('#ScanName').text(name);
        $('#ScanValue').text(value);
    }, setTime);
    if (setTime === 6000) {
        setTime = 0;
    } else {
        setTime = Number(setTime + 400);
    }
}


function string2XML(xmlString) {
    var parser = new DOMParser();
    var xmlobject = parser.parseFromString(xmlString, "text/xml");
    return xmlobject;
}

function GPP_LoadHardWareInfo() {
    var HWinfoStr = Client_CallNativeSync('GPP_DetectHareWareInfo');
    // $('#test').val(HWinfoStr);
    if (HWinfoStr !== '' && HWinfoStr !== null && HWinfoStr !== undefined) {
        //console.log(string2XML(HWinfoStr));
        var jsonObj = $.xml2json(string2XML(HWinfoStr));
        if (jsonObj.COMPUTER) {
            console.log('xml处理');
            HWInfoXMLPageDisplayProcess(jsonObj);//XML解析
        } else {
            console.log('Json处理');
            HWInfoPageDisplayProcess(JSON.parse(HWinfoStr));//Json解析
        }
    } else {
        setTimeout(function () {
            GPP_LoadHardWareInfo();
        }, 1000)
    }
    jsonObj = null;
    HWinfoStr = null;
}


//XML解析
function HWInfoXMLPageDisplayProcess(jsonObj) {
    console.log(jsonObj);
    // var data_arr = JSON.parse(str);
    var data_arr = jsonObj, HWInfoObj = [], COMPUTER = {}, COMPUTERValue = {}, CPUValue = {}, CPUPropertyValue = {},
        CPUSubNodeValue = {},
        MOBOValue = {}, MOBOPropertyValue = {}, MOBOBIOSValue = {}, MOBOMainboardValue = {}, MOBOSystemValue = {};
    var GPUPropertyValue = {}, GPUSubNodeValue = {};
    var MEMORYPropertyValue = {}, MEMORYValue = {}, MEMORYSubNodeValue = {};
    var MONITORPropertyValue = {}, MONITORValue = {};
    var DRIVESPropertyValue = {}, DRIVESSubNodeValue = {};
    var SOUNDPropertyValue = {}, SOUNDSubNodeValue = {};
    var NETWORKPropertyValue = {}, NETWORKSubNodeValue = {};
    COMPUTERValue['ScanTime'] = data_arr.COMPUTER.ScanTime;

    var HWinfoResolutionStr = Client_CallNativeSync('GPP_GetResolutionRefreshRate');
    if (HWinfoResolutionStr.length <= 20) {
        HWinfoResolutionArr = JSON.parse('{"CurrentDisplayFrequency":"-1","PelsHeight":1080,"PelsWidth":1920}');//分辨率读取异常
    } else {
        HWinfoResolutionArr = JSON.parse(HWinfoResolutionStr);
    }
    COMPUTER['Resolutions'] = HWinfoResolutionArr['PelsWidth'] + '*' + HWinfoResolutionArr['PelsHeight'];
    COMPUTER['RefreshFrequency'] = HWinfoResolutionArr['CurrentDisplayFrequency'];


    var MainDiskSerialNumber = Client_CallNativeSync('GPP_GetMainDiskSerialNumber');
    // var MainDiskSerialNumber = '{"value":"50026B7682BFBE2E"}';
    if (MainDiskSerialNumber.length <= 1) {
        MainDiskSerialNumberArr = JSON.parse('{"value":"0"}');//硬盘读取异常
    } else {
        MainDiskSerialNumberArr = JSON.parse(MainDiskSerialNumber);
    }

    L1Cache = 0;
    L2Cache = 0;
    L3Cache = 0;
    $.each(data_arr.COMPUTER, function (PropertyK, PropertyV) {
        switch (PropertyK) {
            case 'Property':
                $.each(PropertyV, function (PropertyChildK, PropertyChildV) {
                    // var regex1 = /\((.+?)\)/g; //正则匹配
                    // console.log((PropertyChildV.Description).match(regex1));
                    if (PropertyChildV.Entry !== 'Computer Brand Name') {
                        COMPUTERValue[RemoveAllSpace(PropertyChildV.Entry)] = PropertyChildV.Description;
                    }
                });
                break;
            case 'SubNodes':
                $.each(PropertyV, function (PropertyChildK, PropertyChildV) {
                    switch (PropertyChildK) {
                        case 'CPU':
                            $.each(PropertyChildV.Property, function (PropertyK, PropertyV) {
                                CPUValue[RemoveAllSpace(PropertyV.Entry)] = PropertyV.Description;
                            });
                            CPUPropertyValue['Property'] = CPUValue;
                            var CPUSubNodeArr = [];
                            CPUSubNodeValue['ProcessorName'] = PropertyChildV.SubNode.NodeName;
                            $.each(PropertyChildV.SubNode.Property, function (PropertyK, PropertyV) {
                                if ($.inArray(PropertyV.Entry, NeedCPUInfoArr) !== -1) {
                                    CPUSubNodeValue[RemoveAllSpace(PropertyV.Entry)] = PropertyV.Description;
                                }
                                if (PropertyV.Entry === 'L1 Cache') {
                                    if (PropertyV.Description.indexOf('MBytes') !== -1) {
                                        ByteNnitL1 = 1;
                                    } else {
                                        ByteNnitL1 = 1024;
                                    }
                                    if (PropertyV.Description.indexOf('x') !== -1) {
                                        L1CacheInstruction = PropertyV.Description.split(',')[0].split('x')[0].replace(/[^0-9]/ig, "") * PropertyV.Description.split(',')[0].split('x')[1].replace(/[^0-9]/ig, "");
                                        L1CacheData = PropertyV.Description.split(',')[1].split('x')[0].replace(/[^0-9]/ig, "") * PropertyV.Description.split(',')[1].split('x')[1].replace(/[^0-9]/ig, "").replace(/[^0-9]/ig, "");
                                    } else {
                                        L1CacheInstruction = PropertyV.Description.split(',')[0].replace(/[^0-9]/ig, "");
                                        L1CacheData = PropertyV.Description.split(',')[1].replace(/[^0-9]/ig, "");
                                    }
                                    L1Cache = Number((L1CacheInstruction + L1CacheData) / ByteNnitL1);
                                }
                                if (PropertyV.Entry === 'L2 Cache') {
                                    if (PropertyV.Description.indexOf('MBytes') !== -1) {
                                        ByteNnitL2 = 1;
                                    } else {
                                        ByteNnitL2 = 1024;
                                    }
                                    if (PropertyV.Description.indexOf('x') !== -1) {
                                        L2Cache0 = PropertyV.Description.split('x')[0].replace(/[^0-9]/ig, "");
                                        L2Cache1 = PropertyV.Description.split('x')[1].replace(/[^0-9]/ig, "");
                                    } else {
                                        L2Cache0 = PropertyV.Description.replace(/[^0-9]/ig, "");
                                        L2Cache1 = 1;
                                    }
                                    L2Cache = Number((L2Cache0 * L2Cache1) / ByteNnitL2);
                                }

                                if (PropertyV.Entry === 'L3 Cache') {
                                    if (PropertyV.Description.indexOf('x') !== -1) {
                                        var L3Cache0 = PropertyV.Description.split('x')[0].replace(/[^0-9]/ig, "");
                                        var L3Cache1 = PropertyV.Description.split('x')[1].replace(/[^0-9]/ig, "");
                                        L3Cache = Number(L3Cache0 * L3Cache1);
                                    } else {
                                        L3Cache = Number(PropertyV.Description.replace(/[^0-9]/ig, ""));
                                    }
                                }
                            });
                            if (L3Cache === 0) {
                                CPUSubNodeValue['L3Cache'] = 'Integrated: 0 MBytes';
                            }
                            CPUSubNodeValue['CACHE'] = L1Cache + L2Cache + L3Cache;
                            CPUSubNodeArr.push(CPUSubNodeValue);
                            CPUPropertyValue['SubNode'] = CPUSubNodeArr;
                            // CPUPropertyValue['SubNode'] = CPUSubNodeValue;
                            break;
                        case 'MOBO':
                            $.each(PropertyChildV.Property, function (PropertyK, PropertyV) {
                                if ($.inArray(PropertyV.Entry, NeedMOBOInfoArr) !== -1) {
                                    MOBOValue[RemoveAllSpace(PropertyV.Entry)] = PropertyV.Description;
                                    console.log();
                                }
                            });
                            MOBOPropertyValue['Property'] = MOBOValue;
                            $.each(PropertyChildV.SubNode, function (SubNodeK, SubNodeV) {
                                if (SubNodeV.NodeName === 'SMBIOS DMI') {
                                    $.each(SubNodeV.SubNode, function (SubNodeK1, SubNodeV1) {
                                        if (SubNodeV1.NodeName === 'BIOS') {
                                            $.each(SubNodeV1.Property, function (BIOSSubNodeK, BIOSSubNodeV) {
                                                if ($.inArray(BIOSSubNodeV.Entry, NeedMOBOInfoArr) !== -1) {
                                                    MOBOBIOSValue[RemoveAllSpace(BIOSSubNodeV.Entry)] = BIOSSubNodeV.Description;
                                                }
                                            })
                                        } else if (SubNodeV1.NodeName === 'Mainboard') {
                                            $.each(SubNodeV1.Property, function (MainboardSubNodeK, MainboardSubNodeV) {
                                                if ($.inArray(MainboardSubNodeV.Entry, NeedMOBOInfoArr) !== -1) {
                                                    MOBOMainboardValue[RemoveAllSpace(MainboardSubNodeV.Entry)] = MainboardSubNodeV.Description;
                                                }
                                            })
                                        } else if (SubNodeV1.NodeName === 'System') {
                                            $.each(SubNodeV1.Property, function (SystemSubNodeK, SystemSubNodeV) {
                                                if ($.inArray(SystemSubNodeV.Entry, NeedMOBOInfoArr) !== -1) {
                                                    MOBOSystemValue[RemoveAllSpace(SystemSubNodeV.Entry)] = SystemSubNodeV.Description;
                                                }
                                            })
                                        }
                                    })
                                }
                            });
                            MOBOPropertyValue['BIOS'] = MOBOBIOSValue;
                            MOBOPropertyValue['Mainboard'] = MOBOMainboardValue;
                            if (Object.keys(MOBOMainboardValue).length === 0) {
                                MOBOMainboardValue['MainboardManufacturer'] = '';
                                MOBOMainboardValue['MainboardName'] = '';
                                MOBOPropertyValue['Mainboard'] = MOBOMainboardValue;

                            }
                            MOBOPropertyValue['System'] = MOBOSystemValue;
                            if (Object.keys(MOBOSystemValue).length === 0) {
                                MOBOPropertyValue['UUID'] = '';
                                MOBOPropertyValue['System'] = MOBOSystemValue;
                            }
                            break;
                        case 'VIDEO':
                            var VIDEOSubNodeArr = [];
                            if (PropertyChildV.SubNode.length > 0) {
                                $.each(PropertyChildV.SubNode, function (PropertyK, PropertyV) {
                                    // console.log(PropertyV);
                                    var GPUSubNodeObj = {};
                                    $.each(PropertyV.Property, function (PropertyK1, PropertyV1) {
                                        if ($.inArray(PropertyV1.Entry, NeedGPUInfoArr) !== -1) {
                                            GPUSubNodeObj[RemoveAllSpace(PropertyV1.Entry)] = PropertyV1.Description;
                                        }
                                    });
                                    VIDEOSubNodeArr.push(GPUSubNodeObj);
                                });
                                GPUPropertyValue['SubNode'] = VIDEOSubNodeArr;
                            } else {
                                $.each(PropertyChildV.SubNode.Property, function (PropertyK, PropertyV) {
                                    if ($.inArray(PropertyV.Entry, NeedGPUInfoArr) !== -1) {
                                        GPUSubNodeValue[RemoveAllSpace(PropertyV.Entry)] = PropertyV.Description;
                                    }
                                });
                                if (!GPUSubNodeValue['NumberOfUnifiedShaders']) {
                                    GPUSubNodeValue['NumberOfUnifiedShaders'] = '';
                                }
                                if (!GPUSubNodeValue['NumberOfROPs']) {
                                    GPUSubNodeValue['NumberOfROPs'] = '';
                                }
                                if (!GPUSubNodeValue['GraphicsMemoryBusWidth']) {
                                    GPUSubNodeValue['GraphicsMemoryBusWidth'] = '';
                                }
                                VIDEOSubNodeArr.push(GPUSubNodeValue);
                                GPUPropertyValue['SubNode'] = VIDEOSubNodeArr;
                                // GPUPropertyValue['SubNode'] = GPUSubNodeValue;
                            }
                            break;
                        case 'MEMORY':
                            var MEMORYSubNodeArr = [];
                            $.each(PropertyChildV.Property, function (PropertyK, PropertyV) {
                                if ($.inArray(PropertyV.Entry, NeedMEMORYInfoArr) !== -1) {
                                    MEMORYValue[RemoveAllSpace(PropertyV.Entry)] = PropertyV.Description;
                                }
                            });
                            MEMORYPropertyValue['Property'] = MEMORYValue;
                            if (PropertyChildV.SubNode) {
                                if (PropertyChildV.SubNode.length > 0) {
                                    $.each(PropertyChildV.SubNode, function (PropertyK, PropertyV) {
                                        // console.log(PropertyV);
                                        var MEMORYSubNodeObj = {};
                                        $.each(PropertyV.Property, function (PropertyK1, PropertyV1) {
                                            if ($.inArray(PropertyV1.Entry, NeedMEMORYInfoArr) !== -1) {
                                                MEMORYSubNodeObj[RemoveAllSpace(PropertyV1.Entry)] = PropertyV1.Description;
                                            }
                                        });
                                        MEMORYSubNodeArr.push(MEMORYSubNodeObj);
                                    });
                                    MEMORYPropertyValue['SubNode'] = MEMORYSubNodeArr;
                                } else {
                                    $.each(PropertyChildV.SubNode.Property, function (PropertyK, PropertyV) {
                                        if ($.inArray(PropertyV.Entry, NeedMEMORYInfoArr) !== -1) {
                                            MEMORYSubNodeValue[RemoveAllSpace(PropertyV.Entry)] = PropertyV.Description;
                                        }
                                    });
                                    MEMORYSubNodeArr.push(MEMORYSubNodeValue);
                                    MEMORYPropertyValue['SubNode'] = MEMORYSubNodeArr;
                                }
                            } else {
                                var NotMemoryArr = data_arr['COMPUTER']['SubNodes']['MOBO']['SubNode'][1]['SubNode'][12];
                                if (NotMemoryArr['NodeName'] === 'Memory Devices') {
                                    ModuleNumber = -1;
                                    $.each(NotMemoryArr['SubNode'], function (NotMemoryK, NotMemoryV) {
                                        if (NotMemoryV['NodeName'] === 'Memory Device') {
                                            ModuleNumber += 1;
                                            if (NotMemoryV.Property[2]['Description'] !== '0 MBytes') {
                                                var MEMORYSubNodeObj = {};
                                                MEMORYSubNodeObj['ModuleNumber'] = ModuleNumber;
                                                MEMORYSubNodeObj['ModuleSize'] = ((NotMemoryV['Property'][2]['Description'].replace(/[^0-9]/ig, "")) / 1024) + ' GBytes';
                                                MEMORYSubNodeObj['MemoryType'] = NotMemoryV['Property'][6]['Description'] + ' SDRAM';
                                                MEMORYSubNodeObj['MemorySpeed'] = ((NotMemoryV['Property'][8]['Description'].replace(/[^0-9]/ig, "")) / 2) + ' MHz';
                                                MEMORYSubNodeObj['ModuleManufacturer'] = '';
                                                MEMORYSubNodeObj['ModulePartNumber'] = NotMemoryV['Property'][11]['Description'];
                                                MEMORYSubNodeObj['ModuleSerialNumber'] = NotMemoryV['Property'][10]['Description'];
                                                MEMORYSubNodeObj['ModuleManufacturingDate'] = 'N/A';
                                                MEMORYSubNodeObj['SDRAMManufacturer'] = '';
                                                MEMORYSubNodeObj['AssetTag'] = NotMemoryV['Property'][12]['Description'];
                                                MEMORYSubNodeArr.push(MEMORYSubNodeObj);
                                            }
                                        }
                                    });
                                    MEMORYPropertyValue['SubNode'] = MEMORYSubNodeArr;
                                }
                            }

                            break;
                        case 'MONITOR':
                            console.log();
                            if (PropertyChildV.SubNode) {
                                var MONITORSubNodeArr = [];
                                if (PropertyChildV.SubNode.length > 0) {
                                    $.each(PropertyChildV.SubNode, function (PropertyK, PropertyV) {
                                        // console.log(PropertyV);
                                        var MONITORSubNodeObj = {};
                                        $.each(PropertyV.Property, function (PropertyK1, PropertyV1) {
                                            if ($.inArray(PropertyV1.Entry, NeedMONITORInfoArr) !== -1) {
                                                MONITORSubNodeObj[RemoveAllSpace(PropertyV1.Entry)] = PropertyV1.Description;
                                                MONITORSubNodeObj['Resolutions'] = HWinfoResolutionArr['PelsWidth'] + '*' + HWinfoResolutionArr['PelsHeight'];
                                                MONITORSubNodeObj['RefreshFrequency'] = HWinfoResolutionArr['CurrentDisplayFrequency'];
                                            }
                                        });
                                        MONITORSubNodeArr.push(MONITORSubNodeObj);
                                    });
                                    MONITORPropertyValue['SubNode'] = MONITORSubNodeArr;
                                } else {
                                    if (PropertyChildV.SubNode.Property) {
                                        $.each(PropertyChildV.SubNode.Property, function (PropertyK, PropertyV) {
                                            if ($.inArray(PropertyV.Entry, NeedMONITORInfoArr) !== -1) {
                                                MONITORValue[RemoveAllSpace(PropertyV.Entry)] = PropertyV.Description;
                                            }
                                        });
                                    } else {
                                        MONITORValue['MonitorName'] = 'Default Display'
                                    }
                                    MONITORValue['Resolutions'] = HWinfoResolutionArr['PelsWidth'] + '*' + HWinfoResolutionArr['PelsHeight'];
                                    MONITORValue['RefreshFrequency'] = HWinfoResolutionArr['CurrentDisplayFrequency'];
                                    MONITORSubNodeArr.push(MONITORValue);
                                    MONITORPropertyValue['SubNode'] = MONITORSubNodeArr;
                                    // MONITORPropertyValue['SubNode'] = MONITORValue;
                                }
                            }
                            break;
                        case 'DRIVES':
                            if (PropertyChildV.SubNode.SubNode) {
                                var DRIVESSubNodeArr = [];
                                var DRIVESIsArrBool = $.isArray(PropertyChildV.SubNode.SubNode);
                                if (DRIVESIsArrBool) {
                                    if (PropertyChildV.SubNode.SubNode.length > 0) {
                                        $.each(PropertyChildV.SubNode.SubNode, function (PropertyK, PropertyV) {
                                            if (PropertyV.Property) {
                                                var DRIVESSubNodeObj = {};
                                                $.each(PropertyV.Property, function (PropertyK1, PropertyV1) {
                                                    if ($.inArray(PropertyV1.Entry, NeedDRIVESInfoArr) !== -1) {
                                                        DRIVESSubNodeObj[RemoveAllSpace(PropertyV1.Entry)] = PropertyV1.Description;
                                                    }
                                                });
                                                DRIVESSubNodeArr.push(DRIVESSubNodeObj);
                                            }
                                        });
                                    } else {
                                        $.each(PropertyChildV.SubNode.Property, function (PropertyK, PropertyV) {
                                            if ($.inArray(PropertyV.Entry, NeedDRIVESInfoArr) !== -1) {
                                                DRIVESSubNodeValue[RemoveAllSpace(PropertyV.Entry)] = PropertyV.Description;
                                            }
                                        });
                                        DRIVESSubNodeArr.push(DRIVESSubNodeValue);
                                    }
                                } else {
                                    $.each(PropertyChildV.SubNode.SubNode.Property, function (PropertyK, PropertyV) {
                                        if ($.inArray(PropertyV.Entry, NeedDRIVESInfoArr) !== -1) {
                                            DRIVESSubNodeValue[RemoveAllSpace(PropertyV.Entry)] = PropertyV.Description;
                                        }
                                    });
                                    DRIVESSubNodeArr.push(DRIVESSubNodeValue);
                                }
                                var MainDiskSerialNum = 0;
                                $.each(DRIVESSubNodeArr, function (DRIVESSubNodeArrUpK, DRIVESSubNodeArrUpV) {
                                    if (DRIVESSubNodeArrUpV['DriveSerialNumber'] === MainDiskSerialNumberArr['value']) {
                                        MainDiskSerialNum = DRIVESSubNodeArrUpK;
                                    }
                                });
                                if (MainDiskSerialNum !== 0) {
                                    ArrToFirst(DRIVESSubNodeArr, MainDiskSerialNum);
                                }
                                DRIVESPropertyValue['SubNode'] = DRIVESSubNodeArr;
                            }
                            break;
                        case 'SOUND':
                            if (PropertyChildV.SubNode.NodeName !== 'Unknown or none') {
                                var SOUNDSubNodeArr = [];
                                var IsArrBool = $.isArray(PropertyChildV.SubNode);
                                if (IsArrBool) {
                                    $.each(PropertyChildV.SubNode, function (PropertyK, PropertyV) {
                                        var SOUNDSubNodeObj = {};
                                        $.each(PropertyV.Property, function (PropertyK1, PropertyV1) {
                                            if ($.inArray(PropertyV1.Entry, NeedSOUNDInfoArr) !== -1) {
                                                SOUNDSubNodeObj[RemoveAllSpace(PropertyV1.Entry)] = PropertyV1.Description;
                                            }
                                        });
                                        SOUNDSubNodeArr.push(SOUNDSubNodeObj);
                                    });
                                    SOUNDPropertyValue['SubNode'] = SOUNDSubNodeArr;
                                } else {
                                    $.each(PropertyChildV.SubNode.Property, function (PropertyK, PropertyV) {
                                        if ($.inArray(PropertyV.Entry, NeedSOUNDInfoArr) !== -1) {
                                            SOUNDSubNodeValue[RemoveAllSpace(PropertyV.Entry)] = PropertyV.Description;
                                        }
                                    });
                                    SOUNDSubNodeArr.push(SOUNDSubNodeValue);
                                    SOUNDPropertyValue['SubNode'] = SOUNDSubNodeArr;
                                }
                            }
                            break;
                        case 'NETWORK':
                            // console.log(PropertyChildV);
                            var NETWORKSubNodeArr = [];
                            if (PropertyChildV.SubNode.length > 0) {
                                $.each(PropertyChildV.SubNode, function (PropertyK, PropertyV) {
                                    // console.log(PropertyV);
                                    var NETWORKSubNodeObj = {};
                                    $.each(PropertyV.Property, function (PropertyK1, PropertyV1) {
                                        if ($.inArray(PropertyV1.Entry, NeedNETWORKInfoArr) !== -1) {
                                            NETWORKSubNodeObj[RemoveAllSpace(PropertyV1.Entry)] = PropertyV1.Description;
                                        }
                                    });
                                    NETWORKSubNodeArr.push(NETWORKSubNodeObj);
                                });
                                NETWORKPropertyValue['SubNode'] = NETWORKSubNodeArr;
                            } else {
                                $.each(PropertyChildV.SubNode.Property, function (PropertyK, PropertyV) {
                                    if ($.inArray(PropertyV.Entry, NeedNETWORKInfoArr) !== -1) {
                                        NETWORKSubNodeValue[RemoveAllSpace(PropertyV.Entry)] = PropertyV.Description;
                                    }
                                });
                                NETWORKSubNodeArr.push(NETWORKSubNodeValue);
                                NETWORKPropertyValue['SubNode'] = NETWORKSubNodeArr;
                                // NETWORKPropertyValue['Property'] = NETWORKSubNodeValue;
                            }
                            break;
                    }
                });
                break;
        }
    });
    COMPUTER['COMPUTER'] = COMPUTERValue;
    COMPUTER['CPU'] = CPUPropertyValue;
    COMPUTER['MOBO'] = MOBOPropertyValue;
    COMPUTER['GPU'] = GPUPropertyValue;
    COMPUTER['MEMORY'] = MEMORYPropertyValue;
    COMPUTER['MONITOR'] = MONITORPropertyValue;
    COMPUTER['DRIVES'] = DRIVESPropertyValue;
    COMPUTER['SOUND'] = SOUNDPropertyValue;
    COMPUTER['NETWORK'] = NETWORKPropertyValue;


    HWInfoObj.push(COMPUTER);
    console.log((HWInfoObj[0]));
    var szSendData = {};
    szSendData['func'] = 'GPP_SaveHardWareInfo';
    szSendData['data'] = HWInfoObj[0];
    var strSendJosn = JSON.stringify(szSendData);
    // console.log(strSendJosn);
    // $('#test1').val(JSON.stringify(HWInfoObj[0]));
    HWInfoPageDisplayProcess(HWInfoObj[0]);
    window.CallNative(strSendJosn);
}

//Json解析
function HWInfoPageDisplayProcess(data) {
    $.each(data, function (HWInfoK, HWInfoV) {
        switch (HWInfoK) {
            case 'COMPUTER':
                var SystemName = (HWInfoV.OperatingSystem.replace('Home Basic', 'HomeBasic').replace('Home Premium', 'HomePremium')).split(' ');
                if (HWInfoV.OperatingSystem.indexOf('(x64)') !== -1) {
                    SystemBit = '64';
                } else if (HWInfoV.OperatingSystem.indexOf('(x32)')) {
                    SystemBit = '32';
                }
                if (RemoveAllSpace(HWInfoV.OperatingSystem).indexOf('Windows10') !== -1) {
                    WinName = 'Windows 10';
                    $.each(SystemName, function (SystemNameK, SystemNameV) {
                        if ($.inArray(SystemNameV, WinSystemVer) !== -1) {
                            SystemVer = eval(Languagevalue)[SystemNameV];
                        }
                    });
                    $('#system').text(WinName + '\xa0' + SystemVer + '\xa0' + SystemBit + eval(Languagevalue)['Bit']);
                    var SystemName1 = (HWInfoV.OperatingSystem).split('Build');
                    $('#system_ver').text(SystemName1[1]);
                } else if (RemoveAllSpace(HWInfoV.OperatingSystem).indexOf('Windows7') !== -1) {
                    SystemVer = eval(Languagevalue)[SystemName[3]];
                    SystemBit = SystemName[4].replace(/[^0-9]/ig, "");
                    SystemVerNum = (SystemName[6]);
                    $('#system').text(SystemName[1] + '\xa0' + SystemName[2] + '\xa0' + SystemVer + '\xa0' + SystemBit + eval(Languagevalue)['Bit']);
                    $('#system_ver').text(SystemVerNum);
                } else if (RemoveAllSpace(HWInfoV.OperatingSystem).indexOf('WindowsServer') !== -1) {
                    $('#system').text(HWInfoV.OperatingSystem.replace('Microsoft', ''));
                    $('#system_ver').text('null');
                    SystemVer = '';
                    SystemBit = ''
                }
                var ScanTime = HWInfoV.ScanTime.split(' ');
                var Years = ScanTime[0].split('.');
                var ScanTimeData = Years[2] + '-' + Years[1] + '-' + Years[0];
                $('#ScanTime').text('\xa0' + ScanTimeData + '\xa0' + ScanTime[1]);
                ScanningMsg(eval(Languagevalue)['system'], SystemName[1] + '\xa0' + SystemName[2] + '\xa0' + SystemVer + '\xa0' + SystemBit + eval(Languagevalue)['Bit']);
                break;
            case 'CPU':
                var CPUSubNode = HWInfoV['SubNode'][0];
                var CPUSubNodeClockVol = CPUSubNode['CPUCurrent'].split('@');
                $('#cpu_name').text(CPUSubNode['ProcessorName']);
                ScanningMsg(eval(Languagevalue)['cpu'], CPUSubNode['ProcessorName']);
                ScanningMsg(eval(Languagevalue)['Process'], CPUSubNode['NumberofLogicalCPUs']);
                $('#cpu_corecount').text(CPUSubNode['NumberofCPUCores']);
                $('#cpu_threadcount').text(CPUSubNode['NumberofLogicalCPUs']);
                var CpuClock = ((CPUSubNodeClockVol[0].split('='))[0].replace(' MHz', '') / 1000).toFixed(2) + 'GHz';
                $('#cpu_clock').text(CpuClock);
                ScanningMsg(eval(Languagevalue)['cpu'] + eval(Languagevalue)['frequency'], CpuClock);

                $('#cpu_voltage').text(CPUSubNodeClockVol[1]);
                break;
            case 'GPU':
                if (JSON.stringify(HWInfoV) !== '{}') {
                    var GPUHtml = '';
                    $.each(HWInfoV['SubNode'], function (CPUDataK, CPUDataV) {
                        ScanningMsg(eval(Languagevalue)['gpu'], CPUDataV.VideoChipset);
                        GPUHtml += '<p>' + CPUDataV.VideoChipset + '</p>';
                        GPUHtml += '<p>';
                        var CPUSubvendor = (CPUDataV.VideoCard).split(' ');
                        ScanningMsg(eval(Languagevalue)['gpu'] + eval(Languagevalue)['Brand'], CPUSubvendor[0])
                        GPUHtml += '<span><font> ' + eval(Languagevalue)['Brand'] + '</font> <em>' + CPUSubvendor[0] + '</em></span>';
                        if (CPUDataV.NumberOfUnifiedShaders) {
                            GPUHtml += '<span class="span2"><font>' + eval(Languagevalue)['numbrender'] + ' </font> <em id="gpu_shadres">' + CPUDataV.NumberOfUnifiedShaders + '</em></span>';
                        }
                        var VideoMemory = (CPUDataV.VideoMemory).split(' ');
                        if (VideoMemory[3]) {
                            VideoType = '(' + VideoMemory[3] + ')';
                        } else {
                            VideoType = '';
                        }
                        GPUHtml += '<span class="span2"><font> ' + eval(Languagevalue)['gpuram'] + ' </font> <em id="gpu_memorysize"></em>' + ((VideoMemory[0] / 1024)) + 'G' + VideoType + '</span>';
                        GPUHtml += '</p>';
                    });
                    $('#GPUHtml').html(GPUHtml);
                }
                break;
            case 'MOBO':
                var MOBOData = HWInfoV;
                $('#mainboard_name').text(MOBOData['Mainboard']['MainboardName']);
                ScanningMsg(eval(Languagevalue)['mainboard'], MOBOData['Mainboard']['MainboardName']);
                $('#mainboard_southmodule').text(MOBOData['Mainboard']['MainboardManufacturer']);
                $('#mainboard_biosversion').text(MOBOData['Property']['MotherboardChipset'].replace(/\(.*?\)/g, ''));
                break;
            case 'DRIVES':
                if (JSON.stringify(HWInfoV) !== '{}') {
                    var DRIVESHtml = '';
                    $.each(HWInfoV['SubNode'], function (DRIVESDataK, DRIVESDataV) {
                        if (DRIVESDataK < 4) {
                            if (JSON.stringify(DRIVESDataV) !== '{}') {
                                ScanningMsg(eval(Languagevalue)['drive'], DRIVESDataV.DriveModel);
                                if (DRIVESDataV['DriveCapacity[MB]']) {
                                    DRIVESHtml += '<div style=""><span>' + DRIVESDataV.DriveModel + '</span><span style="position:absolute;float: ;left: 400px"><font>' + eval(Languagevalue)['Capacity'] + ' : </font> <em id="harddisk_size">' + parseInt(DRIVESDataV['DriveCapacity[MB]'] / 1024) + '</em> GB</span></div>';
                                }
                            }
                        }

                    });
                    if (DRIVESHtml.length !== 0) {
                        $('#DRIVESHtml').html(DRIVESHtml);
                    } else {
                        $('#Li_harddisk').hide();
                    }
                }
                break;
            case 'MONITOR':
                if (JSON.stringify(HWInfoV) !== '{}') {
                    var MONITORHtml = '';
                    $.each(HWInfoV['SubNode'], function (MONITORDataK, MONITORDataV) {
                        if (MONITORDataV.MonitorName !== 'Unknown') {
                            ScanningMsg(eval(Languagevalue)['monitor'], MONITORDataV['MonitorName(Manuf)']);
                            MONITORHtml += '<p id="displayname">' + MONITORDataV['MonitorName(Manuf)'] + '</p><p><span><font>' + eval(Languagevalue)['resolution2'] + '</font> <em>' + MONITORDataV.Resolutions + '</em></span><span class="span2"><font>' + eval(Languagevalue)['irefresh1'] + '</font><em id="displayFreq">' + MONITORDataV.RefreshFrequency + 'Hz</em></span>';
                        }
                    });
                    if (MONITORHtml) {
                        $('#MONITORHtml').html(MONITORHtml);
                    } else {
                        $('#Li_displayscreen').hide();
                    }
                }
                break;
            case 'MEMORY':
                $("#HDSizeTotal").text(HWInfoV.Property["TotalMemorySize[MB]"] / 1024 + ' GB');
                $("#memory_type").text(HWInfoV.Property['MemoryChannelsActive']);
                if (HWInfoV.Property['CurrentMemoryClock']) {
                    $("#HDClockTotal").text((Math.ceil(HWInfoV.Property['CurrentMemoryClock'].split('MHz')[0])) * 2 + ' MHz');
                } else {
                    $("#HDClockTotal").text('-1');
                }
                var MEMORYHtml = '';
                if (HWInfoV['SubNode']) {
                    var MemoryNum = 1;
                    $.each(HWInfoV['SubNode'], function (k, v) {
                        if (k < 4) {
                            if (JSON.stringify(v) !== '{}') {
                                ScanningMsg(eval(Languagevalue)['memory'], v.ModuleManufacturer);
                                var regex1 = /\((.+?)\)/g; //正则匹配
                                var MEMORYSPD = ((v.MemorySpeed).match(regex1)[0]).split('/')[0].replace('(', '');
                                if (v.ModuleManufacturer) {
                                    if (k === 0) {
                                        tipsHtml = '<div class="ingame_tips_all" style="margin-left: 2px;"> <img class="ingame_tips_img" src="../img/ic_Exclamation.png"> <span  class="ingame_tips_fps" style="width: auto;">' + eval(Languagevalue)['frequencytips'] + '</span> </div>';
                                    } else {
                                        tipsHtml = '';
                                    }
                                    MEMORYHtml += '<li><span class="Card-slot">' + eval(Languagevalue)['memory'] + MemoryNum + '</span><span>' + (v.ModuleManufacturer) + "  " + MEMORYSPD + "  " + '(' + Math.floor(v.MemorySpeed.split(' ')[0]) + ' MHz) ' + (v.ModuleSize.split(' ')[0]) + 'GB</span>' + tipsHtml + '</li>';
                                } else {
                                    MEMORYHtml += '<li><span class="Card-slot">' + eval(Languagevalue)['memory'] + MemoryNum + '</span><span>' + (v.ModuleManufacturer) + "  " + MEMORYSPD + "  " + '' + Math.floor(v.MemorySpeed.split(' ')[0]) + 'MHz ' + (v.ModuleSize.split(' ')[0]) + 'GB</span>' + tipsHtml + '</li>';
                                }
                                MemoryNum++;
                            }
                        }
                    });
                    $("#memory").html(MEMORYHtml);
                }
                break;
        }
    });
}


// GetHWTempInfo();
function GetHWTempInfo() {
    var str = window.CallNativeSync('{"func":"GPP_TemperatureInfor"}');
    // var str = '{"cpu":{"id":1,"temperature":30},"gpu":{"id":2,"temperature":55.5},"harddisk":{"id":5,"temperature":65},"mainboard":{"id":4,"temperature":65},"memory":{"id":3,"temperature":34}}';
    // var str = '{"cpu":{"id":1},"gpu":{"id":2},"harddisk":{"id":5},"mainboard":{"id":4,"temperature":"1"},"memory":{"id":3,"temperature":"115"}}';
    // var str = '{"cpu":{"id":1,"temperature":' + Math.floor(Math.random() * (50 - 80) + 80) + '},"gpu":{"id":2,"temperature":' + Math.floor(Math.random() * (30 - 50) + 50) + '},"harddisk":{"id":5,"temperature":' + Math.floor(Math.random() * (1 - 100) + 100) + '},"mainboard":{"id":4,"temperature":' + Math.floor(Math.random() * (1 - 100) + 100) + '},"memory":{"id":3,"temperature":' + Math.floor(Math.random() * (1 - 100) + 100) + '}}';
    if (str !== '' && str !== null && str !== undefined) {
        var data_arr = JSON.parse(str);
        var CPUData = data_arr['cpu'];
        if (CPUData['clock'] !== 0) {
            $('#cpu_clock').text((CPUData['clock'] / 1000).toFixed(2) + 'GHz');
        }
        if (CPUData['voltage'] && CPUData['voltage'] !== 0) {
            $('#cpu_voltage').text(parseFloat(CPUData['voltage']).toFixed(2) + 'V');
        }
        $('#SelectFeom').find('.layui-anim dd').show();
        $.each(data_arr, function (m, n) {
            TempNum = (n.temperature);
            if (TempNum !== '' && TempNum !== null && TempNum !== 0 && TempNum < 100) {
                if (TempNum !== eval(m)) {
                    if (TempNum <= 35) {
                        DescClass = 'Cyan';
                        DescText = eval(Languagevalue)['good'];
                        DescColor = '#2fbd25';
                    } else if (TempNum <= 55) {
                        DescClass = 'blue';
                        DescText = eval(Languagevalue)['normal'];
                        DescColor = '#1289e0';
                    } else if (TempNum <= 75) {
                        DescClass = 'yellow';
                        DescText = eval(Languagevalue)['Higher'];
                        DescColor = '#e7b12e';
                    } else {
                        DescClass = 'orange';
                        DescText = eval(Languagevalue)['Toohigh'];
                        DescColor = '#d74720';
                    }

                    $('#' + m + 'temperature').removeClass('Cyan blue yellow orange').addClass(DescClass).show();
                    $('#' + m + 'temp_degree').text(Math.round(TempNum) + '℃');
                    $('#' + m + 'temp_text').text(DescText).css('color', DescColor);
                    $('#' + m + 'temp_bar').css('width', TempNum + '%');
                    eval("" + m + "=" + TempNum);
                }
            } else {
                $('#' + m + 'temperature').hide();
                // $('.' + 'op_' + m).remove();
                if (m === 'cpu') {
                    $('#SelectFeom').find('.layui-anim dd:eq(0)').hide();
                } else if (m === 'gpu') {
                    $('#SelectFeom').find('.layui-anim dd:eq(1)').hide();
                } else if (m === 'mainboard') {
                    $('#SelectFeom').find('.layui-anim dd:eq(2)').hide();
                } else if (m === 'harddisk') {
                    $('#SelectFeom').find('.layui-anim dd:eq(3)').hide();
                } else if (m === 'memory') {
                    $('#SelectFeom').find('.layui-anim dd:eq(4)').hide();
                }
                // if ($('#TempList').find('.progress:hidden').length === 5) {
                //     // $('#TempOutermost').hide();
                // }
            }
        });
    } else {
        setTimeout(function () {
            GetHWTempInfo();
        }, 2000)
    }
    data_arr = null;
    str = null;
    TempNum = null;
    DescClass = null;
    DescText = null;
    DescColor = null;
}

var TempeInfo1 = '';
setTimeout(function () {
    layui.use('form', function () {
        var form = layui.form;
        var element = layui.element;
        form.on('select(TempSelect1)', function (data) {
            var checkName = $(data.elem).find("option:selected").attr('name');
            clearInterval(TempeInfo);
            clearInterval(TempeInfo1);
            UpdateData(window.CallNativeSync('{"func":"GPP_TemperatureListInfor","value":' + checkName + '}'), 'update');
            TempeInfo1 = setInterval(function () {
                var DataStr = window.CallNativeSync('{"func":"GPP_TemperatureListInfor","value":' + checkName + '}');
                // var DataStr = '{"data":[53,52,52,52,50,50,50,51,51,51,50,50,50,50,50,50,50,50,50,51,51,51,51,51,51,50,50,50,49,49,49,49,49,49,48,48,48,48,48,48,49,49,49,49,49,49,49,49,49,49,50,50,50,48,48,48,48,48,48,47,47,47,48,48,48,48,48,48,48,48,48,48,48,48,47,47,47,51,51,51,48,48,48,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,46]}';
                UpdateData(DataStr, 'update')
            }, 2000);
        });
    });
}, 500);


//获取单项温度
function GetOneTemp(ArrDataStr, type) {
    var ArrData = JSON.parse(ArrDataStr);
    if (ArrData['data'].length < 120) {
        for (i = 0; i < (120 - ArrData['data'].length); i++) {
            ArrData['data'].unshift(0.5);
        }
        // console.log(ArrData);
        ArrDataSp = (ArrData['data']);
    } else {
        ArrDataSp = ArrData['data'];
    }
    DisplayArrData = ArrDataSp;
    var OnePoint = '';
    for (i = 0; i < (DisplayArrData.length) - 1; i++) {
        OnePoint += ',';
    }
    FormartXAxisData = OnePoint.split(',');
    var dom = document.getElementById("container-diag");
    var myChart = echarts.init(dom);

    if (type === 'init') {
        option = null;
        option = {
            title: {},
            tooltip: {
                trigger: 'item'
            },
            grid: {
                left: '0%',
                top: '5%',
                right: '0%',
                bottom: '0%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: FormartXAxisData,
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#E5E5E5',//左边线的颜色
                            width: '1'//坐标线的宽度
                        }
                    },
                    axisTick: { //x轴刻度线
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: ['#fff']//坐标值得具体的颜色
                        }
                    },
                    splitArea: {
                        show: false,
                        areaStyle: {
                            color: [
                                'rgba(37,39,47,.5)',
                                'rgba(100,100,100,.5)'
                            ]
                        }
                    },
                    splitLine: {
                        show: false,
                        //  改变轴线颜色
                        lineStyle: {
                            // 使用深浅的间隔色
                            color: ['#fff']
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    min: 0,
                    max: 100,
                    dataMax: "",
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#E5E5E5',//左边线的颜色
                            width: '1'//坐标线的宽度
                        }
                    },
                    axisLabel: {
                        formatter: '{value} °C',
                        color: "#4A515D"  //刻度线标签颜色
                    },
                    axisTick: { //y轴刻度线
                        show: false
                    },
                    splitLine: {
                        show: true,
                        //  改变轴线颜色
                        lineStyle: {
                            // 使用深浅的间隔色
                            color: ['#333645']
                        }
                    }
                }
            ],
            series: [
                {
                    type: 'line',
                    symbol: 'none',  //取消折点圆圈
                    data: DisplayArrData,
                    smooth: true,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: '#0089E9'//曲线颜色
                            }
                        }
                    }


                }
            ]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    } else {
        myChart.setOption({
            xAxis: {
                data: FormartXAxisData
            },
            series: [
                {
                    data: DisplayArrData,
                }
            ]
        });
    }


}

//转换时间戳
function FormatTime(time) {
    var date = new Date(time * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ' ';
    var h = ' ' + date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return Y + M + D + h + m;
}

//截图
function GPP_ScreenShot() {
    window.CallNative('{"func":"GPP_ScreenShot"}');
}

//复制
function GPP_Copy() {
    var szDataJson = [];
    $('#HDInfo .HDLi').each(function (l, i) {
        var name = $(i).find('.GPPNative-list').text().replace(/[\r\n]/g, "").trim();
        var value = $(i).find('.GPPNative-infor').text().replace(/[\r\n]/g, "").trim();
        szDataJson.push(getDataOption(name, value));
    });
    var szSendData = {};
    szSendData['func'] = 'GPP_CopyHardWareInfo';
    szSendData['data'] = szDataJson;
    var strSendJosn = JSON.stringify(szSendData).replace(/\s+/g, "");
    console.log(strSendJosn);
    window.CallNative(strSendJosn);
    layui.use('layer', function () {
        var layer = layui.layer;
        layer.msg(eval('js' + Languagevalue).GPP_Copy, {time: 2000, maxWidth: 300});
    });
}

function getDataOption(name, k) {
    var jsonData = {};
    jsonData['name'] = name;
    jsonData['iValue'] = k;
    return jsonData;
}


//打开硬件信息详情页面
function OpenDetailPage() {
    window.CallNativeSync('{"func":"GPP_ShowHWDetailInfo"}');//调用程序打开详细信息窗口
}

//重新获得电脑配置
function GPP_RefreshHareWareInfo() {
    // GPP_LoadHardWareInfo();
}

function UpdateData(ArrDataStr, type) {
    if (ArrDataStr !== '' && ArrDataStr !== null && ArrDataStr !== undefined) {
        var data = JSON.parse(ArrDataStr);
        ArrDataStr = null;
        if (data['data'].length < 120) {
            for (var t = 0; t < (240 - data['data'].length); t++) {
                data['data'].unshift(0.5);
            }
            ArrDataSp = (data['data']);
        } else {
            data['data'].shift();
            ArrDataSp = data['data'];
        }
        t = null;
        var res = [];
        for (var i = 0; i < ArrDataSp.length; ++i) {
            res.push([i, ArrDataSp[i]]);
        }
        i = null;
        plot.setData([res]); // 设置数据
        plot.draw();

        data = null;
        type = null;
        res = null;
        // plot = null;
        // options = null;
        ArrDataSp = null;
    } else {
        setTimeout(function () {
            UpdateData(window.CallNativeSync('{"func":"GPP_TemperatureListInfor","value":1}'), 'init');
        }, 2000)
    }
}

//调用基本设置 id:选项编号,status:开关,1开,0关
function GPP_ShowCustomSave(id, ivalue) {
    var JsonArr = {};
    JsonArr['func'] = 'GPP_WriteInteger';
    JsonArr['id'] = id;
    JsonArr['value'] = Number(ivalue);
    var str = JSON.stringify(JsonArr);
    console.log(str);
    window.CallNative(str);
}


function GPP_OpenURL(url) {
    var str = '{"func":"GPP_OpenURL","value":' + url + '}';
    window.CallNative(str);
}

function ArrToFirst(fieldData, index) {
    if (index != 0) {
        fieldData[index] = fieldData.splice(0, 1, fieldData[index])[0];
        // fieldData.unshift(fieldData.splice(index, 1)[0]);
    }
}
