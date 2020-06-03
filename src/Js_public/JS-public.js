export  function Qeach (obj,callback) {
    let type = (function() {
        switch (obj.constructor) {
            case Object:
                return 'Object';
                break;
            case Array:
                return 'Array';
                break;
            case NodeList:
                return 'NodeList';
                break;
            default:
                return 'null';
                break
        }
    })();

    if (type === 'Array' || type === 'NodeList') {
        [].every.call(obj,function(v,i) {
            return callback.call(v,i,v) === false ? false : true ;
        })
    } else if(type === 'Object') {
        for(var i in obj) {
            if(callback.call(obj[i],i,obj[i]) === false) {
                break
            }
        }
    }
}

export function isArray(data) {
    if(data instanceof Array) {
        return true
    } else {
        return false
    }
}
export function RemoveAllSpace(str) {
    return str.replace(/\s+/g, "");
}