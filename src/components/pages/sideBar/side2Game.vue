<template>
    <div class="Game">
        <div><input v-model="HardwareInfo1" class="inp"></div>
        <div><input v-model="tip1" class="inp"></div>
        <div><button class="btn" @click="GPP_LoadHardWareInfo">GPP_LoadHardWareInfo</button></div>

        <div><input v-model="HardwareInfo2" class="inp"></div>
        <div><input v-model="tip2" class="inp"></div>
        <div><button class="btn" @click="GPP_xml2json">GPP_xml2json</button></div>

        <div><input v-model="HardwareInfo3" class="inp"></div>
        <div><input v-model="tip3" class="inp"></div>
        <div><button class="btn" @click="GPP_XMLprocess">GPP_XMLprocess</button></div>

        <div><input v-model="HardwareInfo4" class="inp"></div>
        <div><input v-model="tip4" class="inp"></div>
        <div><button class="btn" @click="GPP_str2obj">GPP_str2obj</button></div>

        <div><input v-model="HardwareInfo5" class="inp"></div>
        <div><input v-model="tip5" class="inp"></div>
        <div><button class="btn" @click="GPP_LoadHardWareInfo">GPP_LoadHardWareInfo</button></div>
        
    </div>
</template>

<script>
import {HWInfoXMLPageDisplayProcess} from '../sideBar/side1/js/hardwareInfo'
import xml2js from 'xml-js'
export default {
    data() {
        return {
            HardwareInfo1: 'XMLData',
            HardwareInfo2: 'JSONData',
            HardwareInfo3: 'JSONData-processed',
            HardwareInfo4: '4',
            HardwareInfo5: '5',
            tip1: '1',
            tip2: '2',
            tip3: '3',
            tip4: '4',
            tip5: '5'
        }
    },
    beforeMount() {
        document.cookie = '1234321'
    },
    methods: {
        GPP_LoadHardWareInfo() {
            try {
                let str = document.cookie
                this.HardwareInfo1 = str
            }catch(err) {
                this.HardwareInfo1 = err
            }finally {
                this.tip1 = 'done'
            }
        },
        GPP_xml2json() {
            try {
                var jsonStr = xml2js.xml2json(this.HardwareInfo1,{compact:true,spaces: 0})
                this.HardwareInfo2 = jsonStr
            }catch(err) {
                this.HardwareInfo2 = err
            }finally {
                this.tip2 = 'done'
            }

            
        },
        GPP_XMLprocess() {
            try {
                var jsonObj = JSON.parse(this.HardwareInfo2)
                if(jsonObj.HWINFO) {
                  var processedData = HWInfoXMLPageDisplayProcess(jsonObj.HWINFO)
                  this.HardwareInfo3 = processedData
                }else {
                    this.HardwareInfo3 = this.HardwareInfo1
                }  
            }catch(err) {
                this.HardwareInfo3 = err
            }finally {
                this.tip3 = 'done'
            }
        },
        GPP_str2obj() {
            try {
                var json_Str = this.HardwareInfo3
                var json_Obj = JSON.parse(json_Str)
                var json_comObj = json_Obj.data
                var json_comStr = JSON.stringify(json_comObj)
                this.HardwareInfo4 = json_comStr
            }catch(err) {
                this.HardwareInfo4 = err
            }finally {
                this.tip4 = 'done'
            }
            
        }
    }
}
</script>

<style scoped>
.Game {
    position: relative;
    top: 50px;
    left: 300px;
    font-size: 30px;
    color: #fff;
}
.btn {
    width: 50px;height: 50px;
    color: #fff;
}
.inp {
    color: #fff;
}
</style>