import Axios from 'axios'
import md5 from 'js-md5'

//请求携带cookie
Axios.defaults.withCredentials=true

export function encryptSign(str) {
    let str2 = 'seBz7FWtdGW60kvM' + str + 'seBz7FWtdGW60kvM'
    return str2
}
export function encryptMD5(data) {
    return md5(data)
}
export function sort_asc(obj) {
    let arr = new Array()
    let num = 0
    for (let i in obj) {
        arr[num] = i
        num++
    }
    let sortArr = arr.sort()
    let str = ''
    for (let i in sortArr) {
        str += sortArr[i] + obj[sortArr[i]]

    }
    let char = '&'
    str = str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'),'')
    return str
}

export function getCode (phone,sign) {
    Axios.get('https://www.machenike.com/api.php/sendcode', {
        params: {
            mobile: phone,
            sign: sign
        },
        timeout: 1000
    })
    .then(res => {
        console.log(res)
    }).catch(error => {
        console.log(error)
    })
}