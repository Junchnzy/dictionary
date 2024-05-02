import { NextRequest, NextResponse } from "next/server";
// 导入加密模块
const croypto = require("crypto");
export function encrypt(data: string) {
  let hash = croypto.createHmac("sha256", "十年之约");
  return hash.update(data).digest("hex");
}
// 管理员账号密码
export const admin = {
  username: "admin",
  password: "admin",
};
// 生成jwt
export function getjwt(username: string, request: NextRequest) {
  let jwth = Buffer.from(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT",
    }),
    "utf-8"
  ).toString("base64");
  let jwtb = Buffer.from(
    JSON.stringify({
      username: encodeURI(username),
      "user-agent": request.headers.get("user-agent"),
      // 登录过期时间24小时
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    }),
    "utf-8"
  ).toString("base64");
  let signature = encrypt(`${jwth}+'.'+${jwtb}`);
  return `${jwth}.${jwtb}.${signature}`;
}
// 更新jwt
export function setjwt(jwtb: any) {
  // 更新过期时间
  let jwth = Buffer.from(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT",
    }),
    "utf-8"
  ).toString("base64");
  jwtb.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
  jwtb = Buffer.from(JSON.stringify(jwtb), "utf-8").toString("base64");
  let signature = encrypt(`${jwth}+'.'+${jwtb}`);
  return `${jwth}.${jwtb}.${signature}`;
}
