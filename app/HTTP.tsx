// 判断代码运行环境
let http;
if (process.env.NODE_ENV === "development") {
  http = "http://192.168.2.100:3000";
} else {
  http = "https://ftg.liuxiaohan.cn";
}
export const HTTP = http;
