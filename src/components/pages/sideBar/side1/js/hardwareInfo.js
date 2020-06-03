import {Qeach} from '../../../../../Js_public/JS-public'
import {isArray} from '../../../../../Js_public/JS-public'
import {RemoveAllSpace} from '../../../../../Js_public/JS-public'

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
//XML
export function HWInfoXMLPageDisplayProcess(jsonObj) {
    var data_arr = jsonObj, 
        HWInfoObj = [],
        COMPUTER = {},
        COMPUTERValue = {},
        CPUValue = {},
        CPUPropertyValue = {},
        CPUSubNodeValue = {},
        MOBOValue = {},
        MOBOPropertyValue = {},
        MOBOBIOSValue = {},
        MOBOMainboardValue = {},
        MOBOSystemValue = {};
    var GPUPropertyValue = {},
        GPUSubNodeValue = {};
    var MEMORYPropertyValue = {},
        MEMORYValue = {},
        MEMORYSubNodeValue = {};
    var MONITORPropertyValue = {},
        MONITORValue = {};
    var DRIVESPropertyValue = {},
        DRIVESSubNodeValue = {};
    var SOUNDPropertyValue = {},
        SOUNDSubNodeValue = {};
    var NETWORKPropertyValue = {},
        NETWORKSubNodeValue = {};
    COMPUTERValue['ScanTime'] = data_arr.COMPUTER.ScanTime._text;

    var HWinfoResolutionStr = window.CallNativeSync('{"func":"GPP_GetResolutionRefreshRate"}');
    // let HWinfoResolutionStr = ''
    let HWinfoResolutionArr = ''
    if (HWinfoResolutionStr.length <= 10) {
        HWinfoResolutionArr = JSON.parse('{"CurrentDisplayFrequency":"-1","PelsHeight":1080,"PelsWidth":1920}');//分辨率读取异常
    } else {
        HWinfoResolutionArr = JSON.parse(HWinfoResolutionStr);
    }
    COMPUTER['Resolutions'] = HWinfoResolutionArr['PelsWidth'] + '*' + HWinfoResolutionArr['PelsHeight'];
    COMPUTER['RefreshFrequency'] = HWinfoResolutionArr['CurrentDisplayFrequency'];
    let L1Cache = 0;
    let L2Cache = 0;
    let L3Cache = 0;
    Qeach(data_arr.COMPUTER, function (PropertyK, PropertyV) {
        switch (PropertyK) {
            case 'Property':
                Qeach(PropertyV, function (PropertyChildK, PropertyChildV) {
                    if (PropertyChildV.Entry._text !== 'Computer Brand Name') {
                        COMPUTERValue[RemoveAllSpace(PropertyChildV.Entry._text)] = PropertyChildV.Description._text;
                    }
                });
                break;
            case 'SubNodes':
                Qeach(PropertyV, function (PropertyChildK, PropertyChildV) {
                    switch (PropertyChildK) {
                        case 'CPU':
                            Qeach(PropertyChildV.Property, function (PropertyK, PropertyV) {
                                CPUValue[RemoveAllSpace(PropertyV.Entry._text)] = PropertyV.Description._text;
                            });
                            CPUPropertyValue['Property'] = CPUValue;
                            var CPUSubNodeArr = [];
                            CPUSubNodeValue['ProcessorName'] = PropertyChildV.SubNode.NodeName._text;
                            Qeach(PropertyChildV.SubNode.Property, function (PropertyK, PropertyV) {
                                let ByteNnitL1 = null
                                let L1CacheInstruction = null
                                let L1CacheData = null
                                let ByteNnitL2 = null
                                let L2CacheInstruction = null
                                let L2CacheData = null
                                let L2Cache0 = null
                                let L2Cache1 = null
                                let ByteNnitL3 = null
                                let L3CacheInstruction = null
                                let L3CacheData = null
                                
                                if (NeedCPUInfoArr.indexOf(PropertyV.Entry._text) !== -1) {
                                    CPUSubNodeValue[RemoveAllSpace(PropertyV.Entry._text)] = PropertyV.Description._text;
                                }
                                if (PropertyV.Entry._text === 'L1 Cache') {
                                    if (PropertyV.Description._text.indexOf('MBytes') !== -1) {
                                        ByteNnitL1 = 1;
                                    } else {
                                        ByteNnitL1 = 1024;
                                    }
                                    if (PropertyV.Description._text.indexOf('x') !== -1) {
                                        L1CacheInstruction = PropertyV.Description._text.split(',')[0].split('x')[0].replace(/[^0-9]/ig, "") * PropertyV.Description._text.split(',')[0].split('x')[1].replace(/[^0-9]/ig, "");
                                        L1CacheData = PropertyV.Description._text.split(',')[1].split('x')[0].replace(/[^0-9]/ig, "") * PropertyV.Description._text.split(',')[1].split('x')[1].replace(/[^0-9]/ig, "").replace(/[^0-9]/ig, "");
                                    } else {
                                        L1CacheInstruction = PropertyV.Description._text.split(',')[0].replace(/[^0-9]/ig, "");
                                        L1CacheData = PropertyV.Description._text.split(',')[1].replace(/[^0-9]/ig, "");
                                    }
                                    L1Cache = Number((L1CacheInstruction + L1CacheData) / ByteNnitL1);
                                }
                                if (PropertyV.Entry._text === 'L2 Cache') {
                                    if (PropertyV.Description._text.indexOf('MBytes') !== -1) {
                                        ByteNnitL2 = 1;
                                    } else {
                                        ByteNnitL2 = 1024;
                                    }
                                    if (PropertyV.Description._text.indexOf('x') !== -1) {
                                        L2Cache0 = PropertyV.Description._text.split('x')[0].replace(/[^0-9]/ig, "");
                                        L2Cache1 = PropertyV.Description._text.split('x')[1].replace(/[^0-9]/ig, "");
                                    } else {
                                        L2Cache0 = PropertyV.Description._text.replace(/[^0-9]/ig, "");
                                        L2Cache1 = 1;
                                    }
                                    L2Cache = Number((L2Cache0 * L2Cache1) / ByteNnitL2);
                                }

                                if (PropertyV.Entry._text === 'L3 Cache') {
                                    if (PropertyV.Description._text.indexOf('x') !== -1) {
                                        var L3Cache0 = PropertyV.Description._text.split('x')[0].replace(/[^0-9]/ig, "");
                                        var L3Cache1 = PropertyV.Description._text.split('x')[1].replace(/[^0-9]/ig, "");
                                        L3Cache = Number(L3Cache0 * L3Cache1);
                                    } else {
                                        L3Cache = Number(PropertyV.Description._text.replace(/[^0-9]/ig, ""));
                                    }
                                }
                            });
                            if (L3Cache === 0) {
                                CPUSubNodeValue['L3Cache'] = 'Integrated: 0 MBytes';
                            }
                            CPUSubNodeValue['CACHE'] = L1Cache + L2Cache + L3Cache;
                            CPUSubNodeArr.push(CPUSubNodeValue);
                            CPUPropertyValue['SubNode'] = CPUSubNodeArr;
                            break;
                        case 'MOBO':
                            Qeach(PropertyChildV.Property, function (PropertyK, PropertyV) {
                                if (NeedMOBOInfoArr.indexOf(PropertyV.Entry._text) !== -1) {
                                    MOBOValue[RemoveAllSpace(PropertyV.Entry._text)] = PropertyV.Description._text;
                                    console.log();
                                }
                            });
                            MOBOPropertyValue['Property'] = MOBOValue;
                            Qeach(PropertyChildV.SubNode, function (SubNodeK, SubNodeV) {
                                if (SubNodeV.NodeName._text === 'SMBIOS DMI') {
                                    Qeach(SubNodeV.SubNode, function (SubNodeK1, SubNodeV1) {
                                        if (SubNodeV1.NodeName._text === 'BIOS') {
                                            Qeach(SubNodeV1.Property, function (BIOSSubNodeK, BIOSSubNodeV) {
                                                if (NeedMOBOInfoArr.indexOf(BIOSSubNodeV.Entry._text) !== -1) {
                                                    MOBOBIOSValue[RemoveAllSpace(BIOSSubNodeV.Entry._text)] = BIOSSubNodeV.Description._text;
                                                }
                                            })
                                        } else if (SubNodeV1.NodeName._text === 'Mainboard') {
                                            Qeach(SubNodeV1.Property, function (MainboardSubNodeK, MainboardSubNodeV) {
                                                if (NeedMOBOInfoArr.indexOf(MainboardSubNodeV.Entry._text) !== -1) {
                                                    MOBOMainboardValue[RemoveAllSpace(MainboardSubNodeV.Entry._text)] = MainboardSubNodeV.Description._text;
                                                }
                                            })
                                        } else if (SubNodeV1.NodeName._text === 'System') {
                                            Qeach(SubNodeV1.Property, function (SystemSubNodeK, SystemSubNodeV) {
                                                if (NeedMOBOInfoArr.indexOf(SystemSubNodeV.Entry._text) !== -1) {
                                                    MOBOSystemValue[RemoveAllSpace(SystemSubNodeV.Entry._text)] = SystemSubNodeV.Description._text;
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
                                Qeach(PropertyChildV.SubNode, function (PropertyK, PropertyV) {
                                    var GPUSubNodeObj = {};
                                    Qeach(PropertyV.Property, function (PropertyK1, PropertyV1) {
                                        if (NeedGPUInfoArr.indexOf(PropertyV1.Entry._text) !== -1) {
                                            GPUSubNodeObj[RemoveAllSpace(PropertyV1.Entry._text)] = PropertyV1.Description._text;
                                        }
                                    });
                                    VIDEOSubNodeArr.push(GPUSubNodeObj);
                                });
                                GPUPropertyValue['SubNode'] = VIDEOSubNodeArr;
                            } else {
                                Qeach(PropertyChildV.SubNode.Property, function (PropertyK, PropertyV) {
                                    if (NeedGPUInfoArr.indexOf(PropertyV.Entry._text) !== -1) {
                                        GPUSubNodeValue[RemoveAllSpace(PropertyV.Entry._text)] = PropertyV.Description._text;
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
                            }
                            break;
                        case 'MEMORY':
                            var MEMORYSubNodeArr = [];
                            Qeach(PropertyChildV.Property, function (PropertyK, PropertyV) {
                                if (NeedMEMORYInfoArr.indexOf(PropertyV.Entry._text) !== -1) {
                                    MEMORYValue[RemoveAllSpace(PropertyV.Entry._text)] = PropertyV.Description._text;
                                }
                            });
                            MEMORYPropertyValue['Property'] = MEMORYValue;
                            if (PropertyChildV.SubNode) {
                                if (PropertyChildV.SubNode.length > 0) {
                                    Qeach(PropertyChildV.SubNode, function (PropertyK, PropertyV) {
                                        var MEMORYSubNodeObj = {};
                                        Qeach(PropertyV.Property, function (PropertyK1, PropertyV1) {
                                            if (NeedMEMORYInfoArr.indexOf(PropertyV1.Entry._text) !== -1) {
                                                MEMORYSubNodeObj[RemoveAllSpace(PropertyV1.Entry._text)] = PropertyV1.Description._text;
                                            }
                                        });
                                        MEMORYSubNodeArr.push(MEMORYSubNodeObj);
                                    });
                                    MEMORYPropertyValue['SubNode'] = MEMORYSubNodeArr;
                                } else {
                                    Qeach(PropertyChildV.SubNode.Property, function (PropertyK, PropertyV) {
                                        if (NeedMEMORYInfoArr.indexOf(PropertyV.Entry._text) !== -1) {
                                            MEMORYSubNodeValue[RemoveAllSpace(PropertyV.Entry._text)] = PropertyV.Description._text;
                                        }
                                    });
                                    MEMORYSubNodeArr.push(MEMORYSubNodeValue);
                                    MEMORYPropertyValue['SubNode'] = MEMORYSubNodeArr;
                                }
                            } else {
                                var NotMemoryArr = data_arr['COMPUTER']['SubNodes']['MOBO']['SubNode'][1]['SubNode'][12];
                                if (NotMemoryArr['NodeName']._text === 'Memory Devices') {
                                    ModuleNumber = -1;
                                    Qeach(NotMemoryArr['SubNode'], function (NotMemoryK, NotMemoryV) {
                                        if (NotMemoryV['NodeName']._text === 'Memory Device') {
                                            ModuleNumber += 1;
                                            if (NotMemoryV.Property[2]['Description']._text !== '0 MBytes') {
                                                var MEMORYSubNodeObj = {};
                                                MEMORYSubNodeObj['ModuleNumber'] = ModuleNumber;
                                                MEMORYSubNodeObj['ModuleSize'] = (((NotMemoryV['Property'][2]['Description']._text).replace(/[^0-9]/ig, "")) / 1024) + ' GBytes';
                                                MEMORYSubNodeObj['MemoryType'] = NotMemoryV['Property'][6]['Description']._text + ' SDRAM';
                                                MEMORYSubNodeObj['MemorySpeed'] = (((NotMemoryV['Property'][8]['Description']._text).replace(/[^0-9]/ig, "")) / 2) + ' MHz';
                                                MEMORYSubNodeObj['ModuleManufacturer'] = '';
                                                MEMORYSubNodeObj['ModulePartNumber'] = NotMemoryV['Property'][11]['Description']._text;
                                                MEMORYSubNodeObj['ModuleSerialNumber'] = NotMemoryV['Property'][10]['Description']._text;
                                                MEMORYSubNodeObj['ModuleManufacturingDate'] = 'N/A';
                                                MEMORYSubNodeObj['SDRAMManufacturer'] = '';
                                                MEMORYSubNodeObj['AssetTag'] = NotMemoryV['Property'][12]['Description']._text;
                                                MEMORYSubNodeArr.push(MEMORYSubNodeObj);
                                            }
                                        }
                                    });
                                    MEMORYPropertyValue['SubNode'] = MEMORYSubNodeArr;
                                }
                            }

                            break;
                        case 'MONITOR':
                            if (PropertyChildV.SubNode) {
                                var MONITORSubNodeArr = [];
                                if (PropertyChildV.SubNode.length > 0) {
                                    Qeach(PropertyChildV.SubNode, function (PropertyK, PropertyV) {
                                        var MONITORSubNodeObj = {};
                                        Qeach(PropertyV.Property, function (PropertyK1, PropertyV1) {
                                            if (NeedMONITORInfoArr.indexOf(PropertyV1.Entry._text) !== -1) {
                                                MONITORSubNodeObj[RemoveAllSpace(PropertyV1.Entry._text)] = PropertyV1.Description._text;
                                                MONITORSubNodeObj['Resolutions'] = HWinfoResolutionArr['PelsWidth'] + '*' + HWinfoResolutionArr['PelsHeight'];
                                                MONITORSubNodeObj['RefreshFrequency'] = HWinfoResolutionArr['CurrentDisplayFrequency'];
                                            }
                                        });
                                        MONITORSubNodeArr.push(MONITORSubNodeObj);
                                    });
                                    MONITORPropertyValue['SubNode'] = MONITORSubNodeArr;
                                } else {
                                    if (PropertyChildV.SubNode.Property) {
                                        Qeach(PropertyChildV.SubNode.Property, function (PropertyK, PropertyV) {
                                            if (NeedMONITORInfoArr.indexOf(PropertyV.Entry._text) !== -1) {
                                                MONITORValue[RemoveAllSpace(PropertyV.Entry._text)] = PropertyV.Description._text;
                                            }
                                        });
                                    } else {
                                        MONITORValue['MonitorName'] = 'Default Display'
                                    }
                                    MONITORValue['Resolutions'] = HWinfoResolutionArr['PelsWidth'] + '*' + HWinfoResolutionArr['PelsHeight'];
                                    MONITORValue['RefreshFrequency'] = HWinfoResolutionArr['CurrentDisplayFrequency'];
                                    MONITORSubNodeArr.push(MONITORValue);
                                    MONITORPropertyValue['SubNode'] = MONITORSubNodeArr;
                                }
                            }
                            break;
                        case 'DRIVES':
                            if (PropertyChildV.SubNode.SubNode) {
                                var DRIVESSubNodeArr = [];
                                var DRIVESIsArrBool = isArray(PropertyChildV.SubNode.SubNode);
                                if (DRIVESIsArrBool) {
                                    if (PropertyChildV.SubNode.SubNode.length > 0) {
                                        Qeach(PropertyChildV.SubNode.SubNode, function (PropertyK, PropertyV) {
                                            if (PropertyV.Property) {
                                                var DRIVESSubNodeObj = {};
                                                Qeach(PropertyV.Property, function (PropertyK1, PropertyV1) {
                                                    if (NeedDRIVESInfoArr.indexOf(PropertyV1.Entry._text) !== -1) {
                                                        DRIVESSubNodeObj[RemoveAllSpace(PropertyV1.Entry._text)] = PropertyV1.Description._text;
                                                    }
                                                });
                                                DRIVESSubNodeArr.push(DRIVESSubNodeObj);
                                            }
                                        });
                                        DRIVESPropertyValue['SubNode'] = DRIVESSubNodeArr;
                                    } else {
                                        Qeach(PropertyChildV.SubNode.Property, function (PropertyK, PropertyV) {
                                            if (NeedDRIVESInfoArr.indexOf(PropertyV.Entry._text) !== -1) {
                                                DRIVESSubNodeValue[RemoveAllSpace(PropertyV.Entry._text)] = PropertyV.Description._text;
                                            }
                                        });
                                        DRIVESSubNodeArr.push(DRIVESSubNodeValue);
                                        DRIVESPropertyValue['SubNode'] = DRIVESSubNodeArr;
                                    }
                                } else {
                                    Qeach(PropertyChildV.SubNode.SubNode.Property, function (PropertyK, PropertyV) {
                                        if (NeedDRIVESInfoArr.indexOf(PropertyV.Entry._text) !== -1) {
                                            DRIVESSubNodeValue[RemoveAllSpace(PropertyV.Entry._text)] = PropertyV.Description._text;
                                        }
                                    });
                                    DRIVESSubNodeArr.push(DRIVESSubNodeValue);
                                    DRIVESPropertyValue['SubNode'] = DRIVESSubNodeArr;
                                }
                            }
                            break;
                        case 'SOUND':
                            if (PropertyChildV.SubNode.NodeName._text !== 'Unknown or none') {
                                var SOUNDSubNodeArr = [];
                                var IsArrBool = isArray(PropertyChildV.SubNode);
                                if (IsArrBool) {
                                    Qeach(PropertyChildV.SubNode, function (PropertyK, PropertyV) {
                                        var SOUNDSubNodeObj = {};
                                        Qeach(PropertyV.Property, function (PropertyK1, PropertyV1) {
                                            if (NeedSOUNDInfoArr.indexOf(PropertyV1.Entry._text) !== -1) {
                                                SOUNDSubNodeObj[RemoveAllSpace(PropertyV1.Entry._text)] = PropertyV1.Description._text;
                                            }
                                        });
                                        SOUNDSubNodeArr.push(SOUNDSubNodeObj);
                                    });
                                    SOUNDPropertyValue['SubNode'] = SOUNDSubNodeArr;
                                } else {
                                    Qeach(PropertyChildV.SubNode.Property, function (PropertyK, PropertyV) {
                                        if (NeedSOUNDInfoArr.indexOf(PropertyV.Entry._text) !== -1) {
                                            SOUNDSubNodeValue[RemoveAllSpace(PropertyV.Entry._text)] = PropertyV.Description._text;
                                        }
                                    });
                                    SOUNDSubNodeArr.push(SOUNDSubNodeValue);
                                    SOUNDPropertyValue['SubNode'] = SOUNDSubNodeArr;
                                }
                            }
                            break;
                        case 'NETWORK':
                            var NETWORKSubNodeArr = [];
                            if (PropertyChildV.SubNode.length > 0) {
                                Qeach(PropertyChildV.SubNode, function (PropertyK, PropertyV) {
                                    var NETWORKSubNodeObj = {};
                                    Qeach(PropertyV.Property, function (PropertyK1, PropertyV1) {
                                        if (NeedNETWORKInfoArr.indexOf(PropertyV1.Entry._text) !== -1) {
                                            NETWORKSubNodeObj[RemoveAllSpace(PropertyV1.Entry._text)] = PropertyV1.Description._text;
                                        }
                                    });
                                    NETWORKSubNodeArr.push(NETWORKSubNodeObj);
                                });
                                NETWORKPropertyValue['SubNode'] = NETWORKSubNodeArr;
                            } else {
                                Qeach(PropertyChildV.SubNode.Property, function (PropertyK, PropertyV) {
                                    if (NeedNETWORKInfoArr.indexOf(PropertyV.Entry._text) !== -1) {
                                        NETWORKSubNodeValue[RemoveAllSpace(PropertyV.Entry._text)] = PropertyV.Description._text;
                                    }
                                });
                                NETWORKSubNodeArr.push(NETWORKSubNodeValue);
                                NETWORKPropertyValue['SubNode'] = NETWORKSubNodeArr;
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
    var szSendData = {};
    szSendData['func'] = 'GPP_SaveHardWareInfo';
    szSendData['data'] = HWInfoObj[0];
    var strSendJson = JSON.stringify(szSendData);
    window.CallNative(strSendJson);
    return strSendJson
}


