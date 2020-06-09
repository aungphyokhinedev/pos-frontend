import saleUserLogin from "./SaleUserLoginModel";
import saleUserReset from "./SaleUserPasswordResetModel";
import saleUserSendReset from "./SaleUserResendModel";
import userLogin from "./UserLoginModel";
import userReset from "./UserPasswordResetModel";
import userRegister from "./UserRegisterModel";
import userSendReset from "./UserResendModel";
export default {
    user: {
        store: "poslogin",
        login: userLogin,
        register: userRegister,
        resend: userSendReset,
        reset: userReset
    },
    saleUser: {
        store: "possalelogin",
        login: saleUserLogin,
        resend: saleUserSendReset,
        reset: saleUserReset
    }
}