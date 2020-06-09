const setPrarmsData = (params,data)=>{
    for(var key in params){
         
        if(params[key] && params[key].includes(":")){
            params[key] = data[params[key].replace(":","")]
          
        }
    }
    return params;

}

const setNestedValueData = (name,data)=>{
    if(name == null && data == null){
        return null;
    }

    let _params = name.split(".")
    let _value = data;
    for(var _param of _params){
        _value = _value[_param];
        if(_value == null) return null;
    }
    return _value;
}

const setUrlData = (url,data)=>{
  
    let _params = url.split("/")
    let _newparams = []
    for(var param of _params){
        
        if(data && param && param.includes(":")){
            param = data[param.replace(":","")]   
        }
        _newparams.push(param)
    }
    return _newparams.join("/");

}

const setClearOptions = (params) =>{
    if(!params) return null;
    const _items =  params.split(",").map(option=>{
            const _values = option.split(":")
            return _values[1] == "all" ? null : option
          }).filter(child => child != null)
   
    return _items.length > 0 ? _items.join(", ") : null
}

export default {
    setPrarmsData,
    setUrlData,
    setNestedValueData,
    setClearOptions
 }