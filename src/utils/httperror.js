import router from "../router";
// import { setAlert } from "../utils/function";

//錯誤訊息
export const tip = (msg) => {
  alert(msg)
//   setAlert(true, "error", msg);
};

//跳轉回登入頁
export const toLogin = () => {
//   setAlert(true, "error", "驗證逾時,請重新登入");
  router.replace({ name: "login" });

  // alert('驗證逾時,請重新登入')
};
//跳轉回首頁
export const toHome = (msg) => {
//   setAlert(true, "error", msg);
console.log(msg);
  router.replace({ name: "main" });
};
