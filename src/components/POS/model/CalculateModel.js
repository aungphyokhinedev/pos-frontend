import constants from "../../../common/constants"
import numeral from "numeral"
export default {
    calculateRate(amount,rule){
      
        if(!amount || !rule) return 0
      
        const _flatRate = rule.flatRate ? rule.flatRate : 0
        const _percentage  = rule.percentage ? rule.percentage : 0
        return _flatRate + (amount * (_percentage/100))
  
      },
    calculate: (item) => {
        const _flatRate = item.discount ? item.discount.flatRate : 0;
        const _percentage = item.discount ? item.discount.percentage : 0;
        const _percentageRate = _percentage > 0 ? item.unitPrice * (_percentage / 100) : 0;
        const _totalDiscount = _flatRate + _percentageRate;
        const _discountInfo =  _totalDiscount > 0 ? "<br/>Discount: " + numeral(_totalDiscount).format(constants.numberFormat) 
        + " [" + (_percentage > 0 ? (_percentage + "%, ") : "") 
        + (_flatRate > 0 ? (numeral(_flatRate).format(constants.numberFormat)) : "") +"]" : ""

        const _discountDetail = _totalDiscount > 0 ? " (Discount: " +
        ((_flatRate> 0 ? numeral(_flatRate).format(constants.numberFormat) :"") +
        (_flatRate > 0 && _percentage > 0 ? " + " : "" ) +
        (_percentage> 0 ? _percentage + "%" :"") 
        ) + ")": ""
        
        let _item = {...item}

        _item.discountInfo = {
            name: item.discount ? item.discount.name : null,
            priceText: numeral(item.unitPrice).format(constants.numberFormat),
            flatRate: _flatRate,
            percentage: _percentage,
            percentageRate: _percentageRate,
            totalDiscount : _totalDiscount,
            discountText: numeral(_totalDiscount).format(constants.numberFormat),
            summary: _discountInfo,
            detail: _discountDetail,
            totalAmount: item.unitPrice  - _totalDiscount,
            totalText: numeral(item.unitPrice  - _totalDiscount).format(constants.numberFormat)
        }
        return _item
      }
  }