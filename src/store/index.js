
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import usergroup from './modules/user_group'
import service from './modules/service'
import application from './modules/application'
import rule from './modules/rule'
import accessrule from './modules/access_rule'
import permission from './modules/permission'
import checkPermission from './modules/check_permission'
import checkAppPermission from './modules/check_app_permission'
import admin from './modules/admin'
import log from './modules/log'
import common from './modules/common'
import audit from './modules/audit'
import summary from './modules/summary'

import accounttype from './modules/account_type'
import accountunit from './modules/account_unit'
import accountjournal from './modules/account_journal'
import accountposting from './modules/account_posting'
import accountaccessrule from './modules/account_access_rule'
import account from './modules/account'
import accountperiod from './modules/account_period'
import accounttransactioncode from './modules/account_transaction_code'
import accountlock from './modules/account_lock'

import commonaddress from './modules/common_address'
import commoncode from './modules/common_code'
import commoncontact from './modules/common_contact'
import commongeolocation from './modules/common_geolocation'
import commonranking from './modules/common_ranking'

import inventoryitem from './modules/inventory_item';
import inventorybrand from './modules/inventory_brand';
import inventorycategory from './modules/inventory_category';
import inventorysku from './modules/inventory_sku';
import inventorysupplier from './modules/inventory_supplier';
import inventorysupplieritem from './modules/inventory_supplier_item';
import inventorysuppliercontact from './modules/inventory_supplier_contact';
import inventorystock from './modules/inventory_stock';

import socket from './modules/socket';
import socketevent from './modules/socket_event';
import socketroom from './modules/socket_room';
import socketroomuser from './modules/socket_room_user';

import commercecategory from './modules/commerce_category';
import commercecustomer from './modules/commerce_customer';
import commercediscount from './modules/commerce_discount';
import commerceinfo from './modules/commerce_info';
import commerceorder from './modules/commerce_order';
import commerceorderdetail from './modules/commerce_order_detail';
import commercepayment from './modules/commerce_payment';
import commerceproductinfo from './modules/commerce_product_info';
import commerceproduct from './modules/commerce_product';
import commerceshipping from './modules/commerce_shipping';

import scheduletask from './modules/schedule_task';
import scheduletaskparam from './modules/schedule_task_param';
import scheduletaskrule from './modules/schedule_task_rule';
import schedulerule from './modules/schedule_rule';
import schedulelog from './modules/schedule_log';

import posbill from './modules/pos_bill';
import poscategory from './modules/pos_cateogry';
import poscustomer from './modules/pos_customer';
import posdiscount from './modules/pos_discount';
import positem from './modules/pos_item';
import posorder from './modules/pos_order';
import posorderdetail from './modules/pos_orderdetail';
import posowner from './modules/pos_owner';
import posrating from './modules/pos_rating';
import possale from './modules/pos_sale';
import possaledetail from './modules/pos_saledetail';
import posshipping from './modules/pos_shipping';
import posshopuser from './modules/pos_shop_user';
import posshop from './modules/pos_shop';
import posuser from './modules/pos_user';


import poscommon from './modules/pos_common';
import posadmin from './modules/pos_admin';
import possalelogin from './modules/pos_sale_login';
import poslogin from './modules/pos_login';
import posfrontend from './modules/pos_frontend';
import pospublic from './modules/pos_public';
import possocket from './modules/pos_socket';
import file from './modules/file'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
 
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export const store =  new Vuex.Store({
  modules: {
    log,
    user,
    usergroup,
    service,
    application,
    rule,
    accessrule,
    permission,
    checkPermission,
    checkAppPermission,
    admin,
    common,
    audit,
    summary,

    accounttype,
    accountunit,
    accountjournal,
    accountposting,
    accountaccessrule,
    account,
    accountperiod,
    accounttransactioncode,
    accountlock,

    commonaddress,
    commoncode,
    commoncontact,
    commonranking,
    file,
    commongeolocation,

    inventoryitem,
    inventorybrand,
    inventorycategory,
    inventorysku,
    inventorystock,
    inventorysupplier,
    inventorysupplieritem,
    inventorysuppliercontact,

    socket,
    socketevent,
    socketroom,
    socketroomuser,

    commercecategory,
    commercecustomer,
    commercediscount,
    commerceinfo,
    commerceorder,
    commerceorderdetail,
    commercepayment,
    commerceproduct,
    commerceproductinfo,
    commerceshipping,

    scheduletask,
    scheduletaskrule,
    scheduletaskparam,
    schedulerule,
    schedulelog,


    posbill,
    poscategory,
    poscustomer,
    posdiscount,
    positem,
    posorder,
    posorderdetail,
    posowner,
    posrating,
    possale,
    possaledetail,
    posshipping,
    posshop,
    posshopuser,
    posuser,
    poscommon,
    posadmin,
    possalelogin,
    poslogin,
    posfrontend,
    pospublic,
    possocket

  },
  strict: debug,
  plugins: [vuexLocal.plugin]
//  plugins: debug ? [createLogger()] : []
})

export function resetState() {
  store.replaceState({
    log:log.state,
    user: user.state,
    usergroup: usergroup.state,
    service:service.state,
    application:application.state,
    rule:rule.state,
    accessrule:accessrule.state,
    permission:permission.state,
    checkPermission:checkPermission.state,
    checkAppPermission:checkAppPermission.state,
    admin: admin.state,
    common: common.state,
    audit: audit.state,
    summary: summary.state,

    accounttype:accounttype.state,
    accountunit: accountunit.state,
    accountjournal: accountjournal.state,
    accountposting: accountposting.state,
    accountaccessrule: accountaccessrule.state,
    account: account.state,
    accountperiod: accountperiod.state,
    accounttransactioncode: accounttransactioncode.state,
    accountlock: accountlock.state,

    file: file.state,

    inventoryitem: inventoryitem.state,
    inventorybrand: inventorybrand.state,
    inventorycategory: inventorycategory.state,
    inventorysku: inventorysku.state,
    inventorysupplier: inventorysupplier.state,
    inventorysuppliercontact: inventorysuppliercontact.state,
    inventorysupplieritem: inventorysupplieritem.state,
    inventorystock: inventorystock.state,

    socket: socket.state,
    socketevent: socketevent.state,
    socketroom: socketroom.state,
    socketroomuser: socketroomuser.state,

    commercecategory: commercecategory.state,
    commercecustomer: commercecustomer.state,
    commercediscount: commercediscount.state,
    commerceinfo: commerceinfo.state,
    commerceorder: commerceorder.state,
    commerceorderdetail: commerceorderdetail.state,
    commercepayment: commercepayment.state,
    commerceproduct: commerceproduct.state,
    commerceproductinfo: commerceproductinfo.state,
    commerceshipping: commerceshipping.state,

    scheduletask: scheduletask.state,
    scheduletaskrule: scheduletaskrule.state,
    scheduletaskparam: scheduletaskparam.state,
    schedulerule: schedulerule.state,
    schedulelog: schedulelog.state,
  
    commonranking: commonranking.state,


    posbill: posbill.state,
    poscategory: poscategory.state,
    poscustomer: poscustomer.state,
    posdiscount: posdiscount.state,
    positem: positem.state,
    posorder: posorder.state,
    posorderdetail: posorderdetail.state,
    posowner: posowner.state,
    posrating: posrating.state,
    possale: possale.state,
    possaledetail: possaledetail.state,
    posshipping: posshipping.state,
    posshop: posshop.state,
    posshopuser: posshopuser.state,
    posuser: posuser.state,
    poscommon: poscommon.state,
    posadmin: posadmin.state,
    possalelogin: possalelogin.state,
    poslogin: poslogin.state,
    posfrontend: posfrontend.state,
    pospublic:pospublic.state,
    possocket:possocket.state
  })
}