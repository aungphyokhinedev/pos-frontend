export default {
removeOrder(shop,cart){
    let _newcart = cart.map(cart=>{
        return {
            _id: cart._id,
            shop: cart.shop,
            items: cart.items.map(a => ({...a}))
        }
    })
    let _index = _newcart.findIndex(order=>order._id == shop._id)
    _newcart.splice(_index,1)
    return _newcart;
},
remove(ids,shop,cart){
    let _newcart = cart.map(cart=>{
        return {
            _id: cart._id,
            shop: cart.shop,
            items: cart.items.map(a => ({...a}))
        }
    })
    let _index = _newcart.findIndex(order=>order._id == shop._id)
    if(_index >= 0){
       
        let _newitems = _newcart[_index].items.filter(item=>{ return ids.indexOf(item._id) ==  -1})
        if(_newitems.length > 0){
            _newcart[_index].items = _newitems
        }
        else{
            _newcart.splice(_index,1)
        }
        
    }
    return _newcart;
},
add(params,cart,update){

      let _newitem = {...params.item, qty: params.qty, options: params.options}
      let _newcart = cart.map(cart=>{
        return {
            _id: cart._id,
            shop: cart.shop,
            items: cart.items.map(a => ({...a}))
        }
    })
      let _index = _newcart.findIndex(order=>order._id == _newitem.shop._id )
     
      if(_index >= 0){
        let _items =  _newcart[_index].items;
        let _existings =  _items.filter(item=>item._id == _newitem._id &&  item.options == _newitem.options);
        if(_existings.length > 0){
          _items.map(item=>{
            if(item._id == _newitem._id &&  item.options == _newitem.options){
                if(update){
                    item.qty = _newitem.qty
                }
                else{
                    item.qty += _newitem.qty
                }
              
              
            }
          })
          
          }
          else{
            _items.push(_newitem)
          }
          cart[_index] = {...cart[_index],items:_items}
      }
      else{
        let _cart = {_id:_newitem.shop._id, shop:_newitem.shop, items:[_newitem] }
        _newcart.push(_cart);
      }
      return _newcart;
    }
}