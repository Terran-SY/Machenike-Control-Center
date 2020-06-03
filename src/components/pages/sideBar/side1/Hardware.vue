<template>
  <div class="contant">
    <div class="hardwareContant">
      <div class="hardwareLoader" v-show="showLoader">
        <img class="hw_loadIcon" src="../../../../../static/img/loadicon.png" />
        <div class="hw_tips hw_tips1">Machenike正在读取硬件信息</div>
        <div class="hw_tips hw_tips2">硬件信息载入中：</div>
        <div class="hw_loadBox">
          <div class="hw_loadContant">
            <div class="hw_loadBar" :style="{'width':progress+'%'}"></div>
          </div>
          <div class="hw_progress">{{progress+'%'}}</div>
        </div>
        <div class="hw_tips hw_tips3">信息源来自CPU-Z/GPU-Z/Machenike官方数据库</div>
      </div>
      <div class="hardwareInfo" v-show="!showLoader">
        <img class="com_machenike" src="~@/assets/img/side1/machenikeimg.png" />
        <div class="hw_infoBox">
          <div class="hw_infoLeft">
            <!-- scanTime -->
            <div class="hw_infoTips">
              <span class="hw_tipsName">扫描时间</span>
              <span class="hw_infoTime" v-html="HWINFO.COMPUTER.ScanTime[0] + '-' + HWINFO.COMPUTER.ScanTime[1] + '-' + HWINFO.COMPUTER.ScanTime[2] + '&nbsp;|&nbsp;' + HWINFO.COMPUTER.ScanTime[3] + ':' + HWINFO.COMPUTER.ScanTime[4]"></span>
              <div class="hw_reBtn" @click="GPP_reScan">重新扫描</div>
              <div class="hw_details">详情</div>
            </div>
            <ul class="hw_infoItems">
              <!-- system -->
              <li class="hw_infoItem">
                <div class="hw_itemName">
                  <img class="hw_ItemIcon drives" :src="itemList[0].icon" />
                  <span>{{itemList[0].name}}</span>
                </div>
                <div class="hw_itemDesc">
                  <div class="hw_descItem" v-html="'windows&nbsp;' + HWINFO.COMPUTER.system.version + '&nbsp;' + HWINFO.COMPUTER.system.cate + '&nbsp;' + HWINFO.COMPUTER.system.bit + '位<br>' + '版本号' + HWINFO.COMPUTER.system.build">
                  </div>
                </div>
              </li>
              <!-- cpu -->
              <li class="hw_infoItem">
                <div class="hw_itemName">
                  <img class="hw_ItemIcon drives" :src="itemList[1].icon" />
                  <span>{{itemList[1].name}}</span>
                </div>
                <div class="hw_itemDesc">
                  <div class="hw_descItem" v-html="HWINFO.CPU.name+ '<br>核心数' + HWINFO.CPU.core +'&nbsp;&nbsp;线程数'+ HWINFO.CPU.thread +'&nbsp;&nbsp;频率'+ HWINFO.CPU.clock +'MHz&nbsp;&nbsp;电压'+ HWINFO.CPU.voltage + 'V'"></div>
                </div>
              </li>
              <!-- gpu -->
              <li class="hw_infoItem">
                <div class="hw_itemName">
                  <img class="hw_ItemIcon drives" :src="itemList[2].icon" />
                  <span>{{itemList[2].name}}</span>
                </div>
                <div class="hw_itemDesc">
                  <div class="hw_descItem" v-html="HWINFO.GPU.integratedGraphics.name +'<br>流处理器&nbsp;'+ HWINFO.GPU.integratedGraphics.shaders + '&nbsp;显存&nbsp;' + HWINFO.GPU.integratedGraphics.memory + 'G'"></div>
                  <div class="hw_desctit">{{itemList[2].desctit}}</div>
                  <div class="hw_descNc hw_descNc1" v-html="HWINFO.GPU.discreteGraphics.name +'<br>流处理器&nbsp;'+ HWINFO.GPU.discreteGraphics.shaders + '&nbsp;显存&nbsp;' + HWINFO.GPU.discreteGraphics.memory + 'G'"></div>
                </div>
              </li>
              <!-- harddisk -->
              <li class="hw_infoItemhd">
                <div class="hw_itemName">
                  <img class="hw_ItemIcon drives" :src="itemList[3].icon" />
                  <span>{{itemList[3].name}}</span>
                </div>
                <div class="hw_itemDesc">
                  <div class="hw_descItem" v-if="HWINFO.DRIVES[0].show" v-html="HWINFO.DRIVES[0].name +  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;实际容量：' + HWINFO.DRIVES[0].size + 'GB'"></div>
                  <div class="hw_descItem" v-if="HWINFO.DRIVES[1].show" v-html="HWINFO.DRIVES[1].name +  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;实际容量：' + HWINFO.DRIVES[1].size + 'GB'"></div>
                  <div class="hw_descItem" v-if="HWINFO.DRIVES[2].show" v-html="HWINFO.DRIVES[2].name +  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;实际容量：' + HWINFO.DRIVES[2].size + 'GB'"></div>
                </div>
              </li>
              <!-- motherboard -->
              <li class="hw_infoItem">
                <div class="hw_itemName">
                  <img class="hw_ItemIcon drives" :src="itemList[4].icon" />
                  <span>{{itemList[4].name}}</span>
                </div>
                <div class="hw_itemDesc">
                  <div class="hw_descItem" v-html="HWINFO.MOBO.name + '<br>品牌&nbsp;' + HWINFO.MOBO.brand + '&nbsp;&nbsp;芯片组&nbsp;' + HWINFO.MOBO.chipset"></div>
                </div>
              </li>
              <!-- MONITOR -->
              <li class="hw_infoItem">
                <div class="hw_itemName">
                  <img class="hw_ItemIcon drives" :src="itemList[5].icon" />
                  <span>{{itemList[5].name}}</span>
                </div>
                <div class="hw_itemDesc">
                  <div class="hw_descItem" v-html="HWINFO.MONITOR.name + '<br>分辨率'+ HWINFO.MONITOR.resolution +'&nbsp;&nbsp;刷新率'+ HWINFO.MONITOR.vertrefresh +'Hz'"></div>
                </div>
              </li>
              <!-- MEMORY -->
              <li class="hw_infoItem">
                <div class="hw_itemName">
                  <img class="hw_ItemIcon drives" :src="itemList[6].icon" />
                  <span>{{itemList[6].name}}</span>
                </div>
                <div class="hw_itemDesc">
                  <div class="hw_desctit" v-html="'总大小' + HWINFO.MEMORY.TotalSize/1024 + 'GB 通道' + HWINFO.MEMORY.Channels + ' 频率' + HWINFO.MEMORY.clock + ' 类型' + HWINFO.MEMORY.DDR"></div>
                  <div class="hw_descItem" v-if="HWINFO.MEMORY.MEMORYArr[0].show" v-html="HWINFO.MEMORY.MEMORYArr[0].brand + '&nbsp;' +  HWINFO.MEMORY.MEMORYArr[0].clock + 'MHz&nbsp;' + HWINFO.MEMORY.MEMORYArr[0].size + 'GB'"></div>
                  <div class="hw_descNc hw_descNc1" v-if="HWINFO.MEMORY.MEMORYArr[1].show" v-html="HWINFO.MEMORY.MEMORYArr[1].brand + '&nbsp;' +  HWINFO.MEMORY.MEMORYArr[1].clock + 'MHz&nbsp;' + HWINFO.MEMORY.MEMORYArr[1].size + 'GB'"></div>
                </div>
              </li>
              <!-- <li class="hw_infoItem" v-for="item in itemList">
                <div class="hw_itemName">
                  <img class="hw_ItemIcon drives" :src="item.icon" />
                  <span>{{item.name}}</span>
                </div>
                <div class="hw_itemDesc">
                  <div class="hw_descItem" v-for="i,index in item.desc" :class="'hw_descItem'+index" v-html="i"></div>
                  <div class="hw_desctit">{{item.desctit}}</div>
                  <div class="hw_descNc" v-for="i,index in item.items" :class="'hw_descNc'+index" v-html="i"></div>
                </div>
              </li> -->
            </ul>
          </div>
          <div class="hw_infoRight">
            <div class="hw_tempBox">
              <div class="hw_line1"></div>
              <div class="hw_line2"></div>
              <div class="hw_tempTips">温度监控</div>
              <div class="hw_copyBox">
                 <img class="" src="~@/assets/img/side1/copy2.png" />
                 <img class="copy1" src="~@/assets/img/side1/copy1.png" />
                 复制
              </div>
              <div class="hw_screenshot">
                <img class="" src="~@/assets/img/side1/screen2.png" />
                <img class="screen1" src="~@/assets/img/side1/screen1.png" />
                截图
              </div>
              
            </div>
            <ul class="hw_tempItems">
              <!-- CPU_Temperature -->
              <li class="hw_tempItem">
                <div class="hw_startPoint"></div>
                <div class="hw_tipsName">{{tempList[0].name}}</div>
                <div class="hw_value">{{HWINFO.CPU.temperature}}°</div>
                <img class="hw_tempLine" src="~@/assets/img/side1/templine.png" />
                <div class="hw_tempBorder"><div class="hw_tempBar" id="hw_tempBar0" :style="{'width':HWINFO.CPU.temperature+'%'}"></div></div>
              </li>
              <!-- GPU_Temperature -->
              <li class="hw_tempItem">
                <div class="hw_startPoint"></div>
                <div class="hw_tipsName">{{tempList[1].name}}</div>
                <div class="hw_value">{{HWINFO.GPU.discreteGraphics.temperature}}°</div>
                <img class="hw_tempLine" src="~@/assets/img/side1/templine.png" />
                <div class="hw_tempBorder"><div class="hw_tempBar" id="hw_tempBar1" :style="{'width':HWINFO.GPU.discreteGraphics.temperature+'%'}"></div></div>
              </li>
              <!-- HD_Temperature -->
              <li class="hw_tempItem">
                <div class="hw_startPoint"></div>
                <div class="hw_tipsName">{{tempList[2].name}}</div>
                <div class="hw_value">{{HWINFO.DRIVES[0].temperature}}°</div>
                <img class="hw_tempLine" src="~@/assets/img/side1/templine.png" />
                <div class="hw_tempBorder"><div class="hw_tempBar" id="hw_tempBar2" :style="{'width':HWINFO.DRIVES[0].temperature+'%'}"></div></div>
              </li>
            </ul>
            <div class="hw_secTemp">
              <div class="hw_tempBox">
                <div class="hw_line1"></div>
                <div class="hw_line2"></div>
                <div class="hw_tempTips" @mouseenter="showSelect=true;" @mouseleave="showSelect=false;">
                  <p>{{showTemp.name}}</p>
                  <img class="hw_dowmSj" src="~@/assets/img/side1/sj.png" />
                  <ul class="hw_tempItems" v-show="showSelect">
                    <li class="hw_tempItem"  @click="choseTemp(tempList[0])">{{tempList[0].name}}</li>
                    <li class="hw_tempItem"  @click="choseTemp(tempList[1])">{{tempList[1].name}}</li>
                    <li class="hw_tempItem"  @click="choseTemp(tempList[2])">{{tempList[2].name}}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="hw_chartBox">
              <img class="hw_chartBg" src="../../../../../static/img/imgbg.png" />
              <div class="hw_chartCon">
                <div id="cpuLine" :style="{width: '272px', height: '140px'}" v-show="tempList[0].show"></div>
                <div id="gpuLine" :style="{width: '272px', height: '140px'}" v-show="tempList[1].show"></div>
                <div id="mhdLine" :style="{width: '272px', height: '140px'}" v-show="tempList[2].show"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Qeach} from '../../../../Js_public/JS-public'
import {HWInfoXMLPageDisplayProcess} from '../side1/js/hardwareInfo'
import ItemIcon1 from "@/assets/img/side1/item1.png";
import ItemIcon2 from "@/assets/img/side1/item2.png";
import ItemIcon3 from "@/assets/img/side1/item3.png";
import ItemIcon4 from "@/assets/img/side1/item4.png";
import ItemIcon5 from "@/assets/img/side1/item5.png";
import ItemIcon6 from "@/assets/img/side1/item6.png";
import ItemIcon7 from "@/assets/img/side1/item7.png";
import CopyIcon1 from "@/assets/img/side1/copy1.png";
import CopyIcon2 from "@/assets/img/side1/copy2.png";
import ScreenIcon1 from "@/assets/img/side1/screen1.png";
import ScreenIcon2 from "@/assets/img/side1/screen2.png";
import TempLine from "@/assets/img/side1/templine.png";
import xml2js from 'xml-js'
export default {
  name: "",
  data() {
    return {
      tempInterval: null,
      HWINFO: {
        COMPUTER: {
          ScanTime:[0,0,0,0,0],
          system: {
            version:0,
            cate:'',
            bit:0,
            build:0
          }
        },
        CPU: {
          name:'',
          core:0,
          thread:0,
          clock:0,
          voltage:0,
          temperature:0
        },
        GPU: {
          integratedGraphics: {
            name:'',
            shaders:0,
            memory:0,
            temperature:0
          },
          discreteGraphics: {
            name: '',
            shaders:0,
            memory:0,
            temperature:0
          }
        },
        DRIVES: [
          {
            show: true,
            name: '',
            size: 0,
            temperature:0
          },
          {
            show: true,
            name: '',
            size: 0
          },
          {
            show: true,
            name: '',
            size: 0
          }
        ],
        MOBO: {
          name: '',
          brand: '',
          chipset: ''
        },
        MONITOR: {
          resolution: '',
          vertrefresh: 0,
          name: ''
        },
        MEMORY: {
          TotalSize: 0,
          DDR: '',
          Channels: 0,
          clock: '',
          MEMORYArr: [
            {
              brand: '',
              clock: 0,
              size: 0,
              show: true
            },
            {
              brand: '',
              clock: 0,
              size: 0,
              show: true
            }
          ]
        }
      },
      progress: 63,
      itemList: [
        {
          name: "系统",
          icon: ItemIcon1
        },
        {
          name: "处理器",
          icon: ItemIcon2
        },
        {
          name: "显卡",
          icon: ItemIcon3
        },
        {
          name: "主硬盘",
          icon: ItemIcon4
        },
        {
          name: "主板",
          icon: ItemIcon5
        },
        {
          name: "显示器",
          icon: ItemIcon6
        },
        {
          name: "内存",
          icon: ItemIcon7
        }
      ],
      tempList: [
        {
          name: "处理器温度",
          arr: [],
          show:true
          },
        {
          name: "显卡温度",
          arr: [],
          show:false
          },
        {
          name: "主硬盘温度",
          arr: [],
          show:false
          }
      ],
      showSelect: false,
      showTemp: {name: ""},
      showLoader:true
    };
  },
  beforeMount() {
    this.GPP_LoadHardWareInfo()   
  },
  mounted() {
    this.GPP_GetTempInfo()
    var that = this;
    var t = setInterval(() => {
      if (that.progress < 100) {
        that.progress += 1;
      } else {
        that.showLoader = false;
        clearInterval(t);
      }
    }, 100);
    that.choseTemp(that.tempList[0])
  },
  beforeDestroy() {
    clearInterval(this.tempInterval)
    this.tempInterval = null
    console.log(this.tempInterval)
  },
  methods: {
    GPP_reScan() {
      
    },
    GPP_GetTempInfo() {
      var that = this
      this.tempInterval = setInterval(function() {
        let temperatureData = window.CallNativeSync('{"func":"GPP_TemperatureInfor"}')
        that.GPP_temperature_process(JSON.parse(temperatureData))
      },2000)
    },
    GPP_LoadHardWareInfo() {
      var that = this
      var HWinfoStr = window.CallNativeSync('{"func":"GPP_DetectHareWareInfo"}')
      if(HWinfoStr !== '' && HWinfoStr !== null && HWinfoStr !== undefined) {
        if(HWinfoStr.indexOf('xml') == -1) {
          //数据初始为JSON
          var HWinfoObj = JSON.parse(HWinfoStr)
          this.HWInfoJSONPageDisplayProcess(HWinfoObj)
        }else {
          //xml2json
          var jsonStr = xml2js.xml2json(HWinfoStr,{compact:true,spaces: 0})
          var jsonObj = JSON.parse(jsonStr)
          //数据初始为XML
          HWInfoXMLPageDisplayProcess(jsonObj.HWINFO)
          var retStr = HWInfoXMLPageDisplayProcess(jsonObj.HWINFO)
          var retObj = JSON.parse(retStr)
          this.HWInfoJSONPageDisplayProcess(retObj.data)          
        }
        jsonStr = null
        jsonObj = null        
      } else {
        setTimeout(
          function() {
            that.GPP_LoadHardWareInfo()
          },1000)
      }
      HWinfoStr = null
    },
    HWInfoJSONPageDisplayProcess(obj) {
      var that = this
      Qeach(obj,function (i,v) {
        switch(i) {
          case 'COMPUTER':
            that.COMPUTER(this)
          break;
          case 'CPU':
            that.CPU(this)
          break;
          case 'GPU':
            that.GPU(this)
          break;
          case 'DRIVES':
            that.DRIVES(this)
          break;
          case 'MOBO':
            that.MOBO(this)
          break;
          case 'MONITOR':
            that.MONITOR(this)
          break;
          case 'MEMORY':
            that.MEMORY(this)
        }
      })
    },
    COMPUTER(data) {
      var cateEnList = ["Professional", "Home", "Education", "Enterprise", "Ultimate", "HomePremium", "HomeBasic", "Starter"]
      var cateCnList = ["专业版", "家庭版", "教育版", "企业版", "旗舰版", "家庭高级版", "家庭普通版", "初级版"]
      var system = {
        version: 0,
        bit: 0,
        cate: '',
        build: '',
        scanTime: []
      }
      var systemName = null
      for (var i in data) {
        if(i == 'OperatingSystem') {
          systemName = (data[i].replace('Home Basic', 'HomeBasic').replace('Home Premium', 'HomePremium').replace('Windows 10','Windows10').replace('Windows 7','Windows7')).split(' ')
        } else if (i == 'ScanTime') {
          var tep = data[i].split(' ')
          var date = tep[0].split('.')
          var minutes = tep[1].split(':')
          system.scanTime = [date[2],date[1],date[0],minutes[0],minutes[1]]
        }
      }
      //windows10 or windows7 ?
      if(systemName.indexOf('Windows10') !== -1) {
        system.version = 10
      } else if (systemName.indexOf('Windows7') !== -1) {
        system.version = 7
      }
      // 64bit or 32bit ?
      if(systemName.indexOf('(x64)') !== -1) {
        system.bit = 64
      } else if(systemName.indexOf('(x32)') !== -1) {
        system.bit = 32
      }
      //category
      for (var i in systemName) {
        var num = cateEnList.indexOf(systemName[i])
        if(num !== -1) {
          system.cate = cateCnList[num]
        }
      }
      //build
      if(systemName.indexOf('Build') !== -1) {
        var num = systemName.indexOf('Build')
        system.build = systemName[num+1]
      }
      for (let i in this.HWINFO.COMPUTER.ScanTime) {
        this.HWINFO.COMPUTER.ScanTime[i] = system.scanTime[i]
      }
      this.HWINFO.COMPUTER.system.version = system.version
      this.HWINFO.COMPUTER.system.cate = system.cate
      this.HWINFO.COMPUTER.system.bit = system.bit
      this.HWINFO.COMPUTER.system.build = system.build
    },
    CPU(data) {
      var cpu = {
        name: data.SubNode[0].ProcessorName,
        core: data.Property.NumberOfProcessorCores,
        thread:data.Property.NumberOfLogicalProcessors,
        clock: 0,
        voltage: 0
      }
      
      for (var i in data.SubNode[0]) {
        if(i == 'CPUCurrent') {
          var cpuArr = data.SubNode[0][i].split('@')
          cpu.voltage = cpuArr[1].replace(' V','')
          
          cpu.clock = (cpuArr[0].split('MHz'))[0].replace(' ','')
        }
      }
      this.HWINFO.CPU.name = cpu.name
      this.HWINFO.CPU.core = cpu.core
      this.HWINFO.CPU.thread = cpu.thread
      this.HWINFO.CPU.clock = cpu.clock
      this.HWINFO.CPU.voltage = (+cpu.voltage).toFixed(2)
    },
    GPU(data) {
      function eachGPU(data,str) {
        var returnData = '0'
        for (var i in data) {
          if(str == 'VideoMemory' && i == str) {
            var memArr = data[i].split(' ')
            returnData = memArr[0] /1024
          } else if (i == str) {
            returnData = data[i]
          }
        }
        return returnData
      }
      var integratedGraphics = {
        name: data.SubNode[0].VideoChipset,
        memory: eachGPU(data.SubNode[0],'VideoMemory'),
        shaders: eachGPU(data.SubNode[0],'NumberOfUnifiedShaders')
      }
      var discreteGraphics = {
        name: data.SubNode[1].VideoChipset,
        memory: eachGPU(data.SubNode[1],'VideoMemory'),
        shaders: eachGPU(data.SubNode[1],'NumberOfUnifiedShaders')
      }
      this.HWINFO.GPU.integratedGraphics.name = integratedGraphics.name
      this.HWINFO.GPU.integratedGraphics.memory = integratedGraphics.memory
      this.HWINFO.GPU.integratedGraphics.shaders = integratedGraphics.shaders
      this.HWINFO.GPU.discreteGraphics.name = discreteGraphics.name
      this.HWINFO.GPU.discreteGraphics.memory = discreteGraphics.memory
      this.HWINFO.GPU.discreteGraphics.shaders = discreteGraphics.shaders
    },
    DRIVES(data) {
      var drives = [
        {name: '',size:0,show:false},
        {name: '',size:0,show:false},
        {name: '',size:0,show:false}
      ]
      Qeach(data.SubNode, function(i,v) {
        for (let k in v) {
          let num = ''
          if(k == 'DriveCapacity[MB]') {
            num = v[k]
            drives[i].size = parseInt(num / 1024)
          } else if(k == 'DriveModel') {
            drives[i].name = v[k]
          }
        }
        drives[i].show = true
      })
      this.HWINFO.DRIVES = drives
    },
    MOBO(data) {
      var motherboard = {
        name: data.Property.MotherboardModel,
        brand: data.Mainboard.MainboardManufacturer,
        chipset: data.Property.MotherboardChipset
      }
      this.HWINFO.MOBO = motherboard
    },
    MONITOR(data) {
      var name = ''
      this.HWINFO.MONITOR.resolution = data.SubNode[0].Resolutions
      this.HWINFO.MONITOR.vertrefresh = data.SubNode[0].RefreshFrequency
      for(let i in data.SubNode[0]) {
        if(i == 'MonitorName(Manuf)') {
          name = data.SubNode[0][i]
        }
      this.HWINFO.MONITOR.name = name
      }
    },
    MEMORY(data) {
      var memory = {
        TotalSize: 0,
        DDR: EachMemory(data.SubNode[0], 'MemoryType'),
        Channels: data.Property.MemoryChannelsActive,
        clock: data.Property.CurrentMemoryClock,
        MEMORYArr: [
          {
            brand: '',
            clock:0,
            size: 0,
            show: false
          },
          {
            brand: '',
            clock:0,
            size: 0,
            show: false
          }
        ]
      }
      Qeach(data.SubNode, function(i,v) {
        for (let k in data.Property) {
          if(k == 'TotalMemorySize[MB]') {
            memory.TotalSize = data.Property[k]
          }
        }
        memory.MEMORYArr[i].show = true
        memory.MEMORYArr[i].brand = EachMemory(data.SubNode[i],'ModuleManufacturer')
        memory.MEMORYArr[i].clock = EachMemory(data.SubNode[i],'MemorySpeed')
        memory.MEMORYArr[i].size = EachMemory(data.SubNode[i],'ModuleSize')
      })
      function EachMemory(data,str) {
        var returnData = ''
        for(var i in data) {
          if(str == 'ModuleManufacturer' && i == str) {
            returnData = data[i]
          } else if(str == 'MemorySpeed' && i == str) {
            var c = data[i].split(' ')
            returnData = c[0] * 2
          } else if(str == 'ModuleSize' && i == str) {
            var n = data[i].split(' ')
            returnData = n[0]
          } else if(str == 'MemoryType' && i == str) {
            var d = data[i].split(' ')
            returnData = d[0]
          }
        }
        return returnData
      }
      this.HWINFO.MEMORY = memory
    },
    GPP_temperature_process(data) {
      var that = this
      Qeach(data,function(i,v) {
        switch(i) {
          case 'cpu':
            that.HWINFO.CPU.clock = v.clock
            that.HWINFO.CPU.voltage = (+v.voltage).toFixed(2)
            that.HWINFO.CPU.temperature = v.temperature
            that.tempList[0].arr.length = 6
            that.tempList[0].arr.push(v.temperature)
            that.tempList[0].arr.shift()
            that.drawLine(that.tempList[0])
          break;
         case 'gpu':
            that.HWINFO.GPU.discreteGraphics.temperature = v.temperature
            that.tempList[1].arr.length = 6
            that.tempList[1].arr.push(v.temperature)
            that.tempList[1].arr.shift()
            that.drawLine(that.tempList[1])
         break;
         case 'harddisk':
            that.HWINFO.DRIVES[0].temperature = v.temperature
            that.tempList[2].arr.length = 6
            that.tempList[2].arr.push(v.temperature)
            that.tempList[2].arr.shift()
            that.drawLine(that.tempList[2])
         break;
        }
      })
    },
    choseTemp(obj) {
      var that = this;
      that.showSelect = false;
      that.showTemp.name = obj.name
      if(obj.name == '处理器温度') {
        that.tempList[0].show = true
        that.tempList[1].show = false
        that.tempList[2].show = false
      } else if(obj.name == '显卡温度') {
        that.tempList[0].show = false
        that.tempList[1].show = true
        that.tempList[2].show = false
      } else if(obj.name == '主硬盘温度'){
        that.tempList[0].show = false
        that.tempList[1].show = false
        that.tempList[2].show = true
      }
    },
    drawLine(data) {
      var that = this;
      var cpuChart = that.$echarts.init(document.getElementById("cpuLine"));
      var gpuChart = that.$echarts.init(document.getElementById("gpuLine"));
      var mhdChart = that.$echarts.init(document.getElementById("mhdLine"));
      // 绘制图表
      var option = {
        tooltip: {
          trigger: 'axis',
          formatter: function(data) {
            var ALLDataHtml = []
            if(data[0].value == undefined) {
              return ALLDataHtml
            } else {
              ALLDataHtml.push(data[0].data + '℃')
              return ALLDataHtml.join('')
            }
          }
        },
        grid: {
          x: "12%", //x 偏移量
          y: "7%", // y 偏移量
          width: "87%", // 宽度
          height: "79%" // 高度
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#094776"
              // width:2
            }
          },
            axisLabel: {
                    textStyle: {
                        color: '#10abff',//坐标值得具体的颜色
 
                    }
                },
          data: ["0","1", "2", "3", "4", "5"]
        },
        yAxis: {
          type: "value",
          min:-5,
          max:120,
          axisLine: {
            lineStyle: {
              color: "#10abff"
              // width:2
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#094776"],
              width: 1,
              type: "solid"
            }
          },
          axisTick:{
            inside:true,
            length:10,
            lineStyle:{
               width:1,
            }
           
          },
          scale: true
        },
        series: [
          {
            name: "temperature",
            type: "line",
            symbol:'circle',
            smooth: false,
            animation: false,
            areaStyle: {
              normal: {
                color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#10abff" },
                  { offset: 1, color: "#050b24" }
                ])
              }
            }, //填充区域样式
            lineStyle:{
               color: '#10abff',
            },
            itemStyle:{
              color: '#10abff',
            },
            data: []
          }
        ]
      };
      function setData(data) {
        option.series[0].data = data.arr
        if(data.name == '处理器温度') {
          cpuChart.setOption(option)
        } else if(data.name ==  '显卡温度') {
          gpuChart.setOption(option)
        } else if(data.name == '主硬盘温度') {
          mhdChart.setOption(option)
        }
      }
      setData(data)
    }
  }
};
</script>

<style lang='stylus' scoped>
.hardwareContant {
  height 100%
  width 100%
  color #10a9fd
  overflow hidden
}
.hardwareLoader {
  height 120px
  width 100%
  margin-top 250px
  padding-left 144px
  position relative
  .hw_tips {
    width 414px
    height 16px
    line-height 16px
    position absolute
    left 300px
  }
  .hw_tips1 {
    font-size 14px
    top 15px
  }
  .hw_tips2 {
    font-size 12px
    top 32px
  }
  .hw_tips3 {
    font-size 12px
    top 90px
    text-align right
  }
  .hw_loadBox {
    width 414px
    height 14px
    border-radius 7px
    border solid 1px #10a9fd
    position absolute
    left 300px
    top 54px
  }
  .hw_loadContant {
    height 100%
    width 100%
    position relative
    overflow hidden
  }
  .hw_progress {
    position absolute
    right 0
    top -20px
    font-size 12px
  }
  .hw_loadBar {
    height 14px
    width 0%
    position absolute
    left -1px
    top -1px
    border-radius 8px
    background linear-gradient(to right, #0962db 0%, #83d3ff 100%)
  }
}
.hw_infoRight {
  flex 1
  padding-left 15px
  position relative;
  .hw_tempBox {
    width 100%
    height 20px
    display flex
    .hw_line1 {
      height 100%
      width 1px
      background #10abff
      margin-right 1px
    }
    .hw_line2 {
      height 100%
      width 5px
      background #10abff
      margin-right 2px
    }
    .hw_tempTips {
      height 100%
      width 60px
      border 1px solid #10abff
      font-size 12px
      text-align center
      line-height 20px
    }
    .hw_copyBox{
      position absolute;
      top -10px;
      right 50px;
      font-size 12px;
      cursor pointer
      img{
        position absolute;
        top 3px;
        right 26px;
      }
      &:hover{
        color:#fff;
        .copy1{
          display none;
        }
      }
    }
    .hw_screenshot{
      position absolute;
      top -10px;
      right 0;
      font-size 12px;
      cursor pointer
      img{
        position absolute;
        top 3px;
        right 26px;
      }
      &:hover{
        color:#fff;
        .screen1{
          display none;
        }
      }
    }
  }
  .hw_tempItems {
    margin-top 20px
    .hw_tempItem {
      position relative
      width 100%
      height 40px
      margin-bottom 20px
      padding-top 10px
      cursor pointer
      .hw_tipsName {
        font-size 12px
        position absolute
        top -4px
        left 40px
      }
      .hw_value {
        font-size 12px
        position absolute
        top -4px
        right 0
      }
      .hw_tempLine {
        display block
        position absolute
        top 2px
        left 20px
      }
      .hw_startPoint {
        height 28px
        width 28px
        background #10abff
        border-radius 100%
      }
      .hw_tempBorder {
        height 10px
        width 294px
        border-radius 5px
        position absolute
        top 20px
        left 22px
        border 1px solid #10abff
      }
      .hw_tempBar {
        height 10px
        width 30%
        border-radius 5px
        background linear-gradient(to right, #10abff 0%, #aa53cf 100%)
      }
      #hw_tempBar2 {
        background linear-gradient(to right, #10abff 0%, #53cf7f 100%)
      }
    }
  }
  .hw_secTemp {
    height 20px
    width 100%
    margin-top 30px
    position relative
    .hw_tempBox {
      width 92px
      position absolute
      top 0
      right 0
      cursor pointer
      .hw_tempTips {
        width 82px
        text-align left
        padding-left 4px
        position relative
        .hw_dowmSj {
          height 10px
          position absolute
          top 4px
          right 2px
        }
        .hw_tempItems {
          width 82px
          height 60px
          border 1px solid #10abff
          position absolute
          top -1px
          left -1px
          z-index 10000
          background #050b24
          .hw_tempItem {
            height 20px
            width 100%
            line-height 20px
            padding 0
            margin 0
            padding-left 4px
            &:hover {
              box-shadow inset 0px 0px 5px 1px #10abff
            }
          }
          .hw_tempItem1 {
            border-bottom 1px solid #10abff
            border-top 1px solid #10abff
          }
        }
      }
    }
  }
  .hw_chartBox {
    width 100%
    height 188px
    margin-top 20px
    position relative
    .hw_chartBg {
      height 100%
      width 100%
    }
    .hw_chartCon {
      height 140px
      width 272px
      position absolute
      top 24px
      left 24px
    }
  }
}
.hardwareInfo {
  height 100%
  width 100%
  padding-left 28px
  padding-top 30px
}
.hw_infoBox {
  width 835px
  height 500px
  padding-left 8px
  display flex
}
.hw_infoLeft {
  height 100%
  width 498px
}
.hw_infoTips {
  font-size 20px
  height 20px
  position relative
  .hw_tipsName {
    margin-right 10px
  }
  .hw_infoTime {
    font-size 18px
    line-height 20px
    margin-left 10px
  }
  .hw_reBtn {
    width 72px
    height 26px
    line-height 28px
    color #fff
    text-align center
    font-size 12px
    background url('~@/assets/img/side1/rebg.png') no-repeat 100% 100%
    position absolute
    top 0
    right 134px
    cursor pointer
  }
  .hw_details {
    width 39px
    height 20px
    font-size 12px
    line-height 20px
    text-align center
    border solid 1px #10abff
    position absolute
    top 3px
    right 80px
    cursor pointer
  }
}
.hw_infoItems {
  width 100%
  height auto
  overflow hidden
  margin-top 6px
  .hw_infoItemhd {
    width 488px
    height 72px
    background url('~@/assets/img/side1/infobg75.png') no-repeat 100% 100%
    margin-top 14px
    display flex
    .hw_itemName {
      position relative
      height 100%
      width 124px
      line-height 72px
      font-size 12px
      img {
        display inline-block
        vertical-align middle
        margin-left 24px
        margin-right 12px
      }
      span {
        display inline-block
        position absolute
        top 0
        left 74px
      }
    }
    .hw_itemDesc {
      flex 1
      padding-left 24px
      padding-top 8px
      .hw_descItem {
        font-size 12px
        display inline-block
      }
      .hw_descItem1 {
        margin-left 20px
      }
      .hw_descNc, .hw_desctit {
        font-size 12px
        display inline-block
      }
      .hw_descNc1 {
        margin-left 20px
      }
    }
  }
  .hw_infoItem {
    width 488px
    height 48px
    background url('~@/assets/img/side1/infobg.png') no-repeat 100% 100%
    margin-top 14px
    display flex
    .hw_itemName {
      position relative
      height 100%
      width 124px
      line-height 48px
      font-size 12px
      img {
        display inline-block
        vertical-align middle
        margin-left 24px
        margin-right 12px
      }
      span {
        display inline-block
        position absolute
        top 0
        left 74px
      }
    }
    .hw_itemDesc {
      flex 1
      padding-left 24px
      padding-top 8px
      .hw_descItem {
        font-size 12px
        display inline-block
      }
      .hw_descItem1 {
        margin-left 20px
      }
      .hw_descNc, .hw_desctit {
        font-size 12px
        display inline-block
      }
      .hw_descNc1 {
        margin-left 20px
      }
    }
  }
}
</style>