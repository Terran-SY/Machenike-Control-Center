<template>
  <div class="diskContant">
    <img class="com_machenike" src="~@/assets/img/side1/machenikeimg.png" />
    <div class="dk_tit">
      桌面监控
      <div class="dk_btnBox" @click="btnClick" :style="{'background':btnLeft>0?'#10a9fd':''}">
        <div class="dk_con">
          <div class="dk_btn" :style="{'left':btnLeft+'px','background':btnLeft>0?'#fff':''}"></div>
        </div>
      </div>
    </div>
    <div class="dk_text">开启功能后监控硬件数据显示在桌面上，让您更方便查看硬件状态</div>
    <div class="dk_titItem">桌面实时监控硬件，更了解您的电脑状态</div>
    <img class="dk_screen" src="/static/img/disk.png" />
    <div class="dk_setting" v-show="btnLeft>-1">
      <div class="dk_setItem">
        <div class="dk_setTit">显示模式</div>
        <ul class="dk_setPoint">
          <li class="dk_point" v-for="item,index in displayMode">
            <div class="dk_pieBox" @click="chackDispaly(index)">
              <div class="dk_pie" v-show="item.chacked"></div>
            </div>
            {{item.name}}
          </li>
        </ul>
      </div>
      <div class="dk_setItem dk_setItem3">
        <div class="dk_setTit">背景样式</div>
        <div class="dk_styleTips" @click="redefault">恢复默认</div>
        <div class="dk_styleList">
          <div class="dk_styleItem dk_styleItem1" @click='monitorBgColor(13)'></div>
          <div class="dk_styleItem dk_styleItem2" @click='monitorBgColor(16)'></div>
          <div class="dk_styleItem dk_styleItem3" @click='monitorBgColor(17)'></div>
          <div class="dk_styleItem dk_styleItem4" @click='monitorBgColor(15)'></div>
          <div class="dk_styleItem dk_styleItem5" @click='monitorBgColor(14)'></div>
        </div>
      </div>
      <div class="dk_setItem">
        <div class="dk_setTit">移动窗口</div>
        <div class="dk_setPoint">
          <span class="dk_moveMode" :style="{'color':btnLeft2>0?'#fff':''}">当前已锁定</span>/
          <span :style="{'color':btnLeft2>0?'':'#fff'}" class="dk_moveMode">当前可移动</span>
          <div class="dk_btnBox" @click="btnClick2" :style="{'background':btnLeft2>0?'#10a9fd':''}">
            <div class="dk_con">
              <div class="dk_btn" :style="{'left':btnLeft2+'px','background':btnLeft2>0?'#fff':''}"></div>
            </div>
          </div>
          <span class="dk_xts">小提示：解锁后可移动桌面监控位置</span>
        </div>
      </div>
      <div class="dk_setItem dk_setItem2">
        <div class="dk_setTit">监控内容</div>
        <ul class="dk_setPoint">
          <li class="dk_point" v-for="item,index in monitor">
            <div class="dk_pieBox" @click="monitorOptions(index)">
              <div class="dk_pie" v-show="item.chacked"></div>
            </div>
            {{item.name}}
          </li>
        </ul>
      </div>
      <div class="dk_setItem">
        <div class="dk_setTit">其他</div>
        <ul class="dk_setPoint">
          <li class="dk_point dk_point2">
            <div class="dk_pieBox" @click="elseSetting=!elseSetting">
              <div class="dk_pie" v-show="elseSetting"></div>
            </div>当启动游戏时，关闭桌面监控
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {Qeach} from '../../../../Js_public/JS-public'
export default {
  name: "Disktop",
  data() {
    return {
      msg: "",
      btnLeft: -1,
      btnLeft2: 13,
      elseSetting: true,
      displayMode: [
        {
          name: "默认",
          chacked: true
        },
        {
          name: "科技",
          chacked: false
        },
        {
          name: "简约",
          chacked: false
        }
      ],
      monitor: [
        {
          name: "处理器",
          chacked: true
        },
        {
          name: "显卡",
          chacked: false
        },
        {
          name: "内存",
          chacked: false
        },
        {
          name: "显存",
          chacked: true
        },
        {
          name: "网络",
          chacked: false
        }
      ]
    };
  },
  beforeMount() {
    this.getInitSetting()
  },
  methods: {
    getInitSetting() {
      let that = this
      // var str = '{ "data": [  {   "svalue": "",   "ivalue": 1,   "id": 173  },{   "svalue": "",   "ivalue": 0,   "id": 222  },{   "svalue": "",   "ivalue": 0,   "id": 223  },{   "svalue": "",   "ivalue": 0,   "id": 224  },{   "svalue": "",   "ivalue": 0,   "id": 225  },{   "svalue": "",   "ivalue": 0,   "id": 226  },{   "svalue": "",   "ivalue": 0,   "id": 227  },{   "svalue": "",   "ivalue": 1,   "id": 228  },{   "svalue": "",   "ivalue": 0,   "id": 307  },{   "svalue": "..\\/img\\/DesktopSkin\\/Wallpaper\\/img_bg_style1.png",   "ivalue": 0,   "id": 308  },{   "svalue": "..\\/img\\/DesktopSkin\\/Wallpaper\\/img_bg_style2.png",   "ivalue": 0,   "id": 309  },{   "svalue": "",   "ivalue": 0,   "id": 310  },{   "svalue": "",   "ivalue": 1,   "id": 311  },{   "svalue": "",   "ivalue": 3,   "id": 314  }]}';
      let str = window.CallNativeSync('{"func":"GPP_LoadDesktopOverlay"}')
      let data_arr = JSON.parse(str)
      Qeach(data_arr.data,function(i,v) {
        switch(v.id) {
          case 173:
            if(v.ivalue == 1) {
              that.btnLeft = '-1'
              that.btnClick()
            } else {
              that.btnLeft = '17'
              that.btnClick()
            }
            break;
          case 222:
            v.ivalue == 1?that.monitor[0].chacked = true:that.monitor[0].chacked = false;
            break;
          case 223:
            v.ivalue == 1?that.monitor[1].chacked = true:that.monitor[1].chacked = false;
            break;
          case 224:
            v.ivalue == 1?that.monitor[2].chacked = true:that.monitor[2].chacked = false;
            break;
          case 225:
            v.ivalue == 1?that.monitor[3].chacked = true:that.monitor[3].chacked = false;
            break;
          case 226:
            v.ivalue == 1?that.monitor[4].chacked = true:that.monitor[4].chacked = false;
            break;
          case 310:
            v.ivalue == 1?that.elseSetting = true:that.elseSetting = false;
          case 314:
            if(v.ivalue == 1) {that.chackDispaly(0)}
            else if(v.ivalue == 2) {that.chackDispaly(2)}
            else if(v.ivalue == 3) {that.chackDispaly(1)}
            break;
          case 309:
            return
            break;
          case 311:
            if(v.ivalue == 1) {
              that.btnLeft2 = '13'
              that.btnClick2()
            } else {
              that.btnLeft2 = '-1'
              that.btnClick2()
            }
            break;
        }
      })
    },
    btnClick() {
      if (this.btnLeft == "-1") {
        this.btnLeft = "17";
        window.CallNativeSync('{"func":"GPP_ActiveDesktop","value":0}')
        window.CallNativeSync('{"func":"GPP_SendStatics","value":9080}')
        window.CallNative('{"func":"GPP_WriteInteger","id":173,"value":1}')
      } else {
        this.btnLeft = "-1";
        window.CallNativeSync('{"func":"GPP_ActiveDesktop","value":1}')
        window.CallNativeSync('{"func":"GPP_SendStatics","value":9064}')
        window.CallNative('{"func":"GPP_WriteInteger","id":173,"value":0}')
        this.showDisplayMonitor()
      }
    },
    btnClick2() {
      if (this.btnLeft2 == "-1") {
        this.btnLeft2 = "13";
        window.CallNative('{"func":"GPP_WriteInteger","id":311,"value":0}')

      } else {
        this.btnLeft2 = "-1";
        window.CallNative('{"func":"GPP_WriteInteger","id":311,"value":1}')
      }
    },
    chackDispaly(index) {
      this.displayMode.forEach(item => {
        item.chacked = false;
      });
      this.displayMode[index].chacked = true;
      this.showDisplayMonitor()
      
    },
    showDisplayMonitor() {
      for(let i in this.displayMode) {
        if(this.displayMode[i].chacked) {
          if(i == 0) {
            window.CallNative('{"func":"GPP_SendStatics","value":9118}')
            window.CallNative('{"func":"GPP_WriteInteger","id":314,"value":1}')
            }
          else if(i == 1) {
            window.CallNative('{"func":"GPP_SendStatics","value":9120}')
            window.CallNative('{"func":"GPP_WriteInteger","id":314,"value":3}')
            }
          else if(i == 2) {
            window.CallNative('{"func":"GPP_SendStatics","value":9119}')
            window.CallNative('{"func":"GPP_WriteInteger","id":314,"value":2}')
          }
        }
      }
    },
    redefault() {
      window.CallNative('{"func":"GPP_WriteString", "id":309,"value":"../img/DesktopSkin/img_bg_default.png"}')
    },
    monitorBgColor(num) {
      let str = '{"func":"GPP_WriteString","id":309,"value":"../img/DesktopSkin/Wallpaper/img_bg_style' + num + '.png"}'
      window.CallNative(str)
    },
    monitorOptions(index) {
      this.monitor[index].chacked = !this.monitor[index].chacked
      let num = 222, value = null;
      let id = (+num) + (+index)
      this.monitor[index].chacked?value = 1:value = 0;
      let str = '{"func":"GPP_WriteInteger","id":' + id + ',"value":' + value + '}'
      window.CallNative(str)
    }
  }
};
</script>

<style lang='stylus' scoped>
.diskContant {
  height 100%
  width 100%
  color #10a9fd
  overflow hidden
  padding-left 28px
  padding-top 30px
  position relative
  .dk_setting {
    width 100%
    height 520px
    background #050b24
    position absolute
    top 130px
    left 0
    padding-top 20px
  }
  .dk_tit {
    height 36px
    font-size 20px
    position relative
  }
  .dk_text {
    font-size 12px
    width 350px
    height 20px
    border-bottom 1px solid #10a9fd
  }
  .dk_titItem {
    height 30px
    width 330px
    margin-top 20px
    font-size 14px
    line-height 30px
    padding-left 14px
    background url('~@/assets/img/side1/disktit.png') no-repeat 100% 100%
  }
  .dk_screen {
    margin-top 20px
    height 400px
    margin-left -2px
  }
  .dk_setItem {
    width 100%
    height 50px
    padding-left 28px
    font-size 12px
    padding-top 12px
    display flex
    .dk_setTit {
      height 26px
      width 78px
      text-align center
      box-shadow inset 0px 0px 5px 2px #10abff
      border 1px solid #10abff
      line-height 26px
    }
    .dk_setPoint {
      flex 1
      padding-left 50px
      position relative
      .dk_point {
        position relative
        display inline-block
        height 50px
        width 160px
        padding-left 20px
        line-height 26px
      }
      .dk_btnBox {
        left 184px
        top 2px
        height 12px
        width 24px
        .dk_btn {
          height 12px
          width 12px
        }
      }
      .dk_xts {
        margin-left 46px
      }
      .dk_point2 {
        width 200px
      }
    }
  }
  .dk_setItem2 {
    height 80px
    margin-bottom 20px
    .dk_point {
      height 40px !important
    }
  }
  .dk_setItem3 {
    height 160px
    display block
    position relative
    .dk_styleTips{
      width: 70px;
      height: 20px;
      background-color: #10abff;
      border-radius: 10px;
      color #fff;
      text-align center;
      line-height 20px;
      cursor pointer
      position absolute;
      top 14px;
      left 152px;
    }
    .dk_styleList {
      height 90px
      width 100%
      margin-top 20px
      padding-left 126px
      display flex
      .dk_styleItem1{
        background linear-gradient(to bottom right, rgba(245,79,91,1),rgba(194,114,237,1), rgba(47,188,235,1))
        }
      .dk_styleItem2{
        background linear-gradient(to bottom right, rgba(86,180,210,.5), rgba(52,143,81,.5))
        }
      .dk_styleItem3{
        background linear-gradient(to bottom right, rgba(86,180,211,.5), rgba(58,124,213,.5))
        }
      .dk_styleItem4{
        background linear-gradient(to bottom right, rgba(60,67,113,.5), rgba(241,143,79,.5))
        }
      .dk_styleItem5{
        background linear-gradient(to bottom right, rgba(184,43,40,.5), rgba(23,100,190,.5))
        }  
      .dk_styleItem {
        
        height 90px
        width 90px
        border 1px solid #10abff
        border-radius 12px
        box-shadow inset 0px 0px 5px 2px #10abff
        margin-right 20px
      }
    }
  }
  .dk_pieBox {
    width 12px
    height 12px
    border 1px solid #10abff
    border-radius 6px
    padding 1px
    position absolute
    top 7px
    left 0
    cursor pointer
    .dk_pie {
      height 8px
      width 8px
      border-radius 4px
      background #10abff
    }
  }
  .dk_btnBox {
    height 16px
    width 32px
    border 1px solid #10a9fd
    border-radius 8px
    position absolute
    top 6px
    left 130px
    cursor pointer
    .dk_con {
      height 100%
      width 100%
      position relative
    }
    .dk_btn {
      height 16px
      width 16px
      border-radius 8px
      background #10a9fd
      position absolute
      top -1px
      left -1px
    }
  }
}
</style>