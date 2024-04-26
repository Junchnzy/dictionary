import { encrypt, getjwt, admin } from "@/app/api/config";
// 导入请求、响应对象
import { NextRequest, NextResponse } from "next/server";
// 导入文件系统模块
const fs = require("fs");
// 请求用户数据接口
export function GET(request: NextRequest) {
  // 解析请求参数
  const searchParams = request.nextUrl.searchParams;
  let username = searchParams.get("username");
  let password = searchParams.get("password");
  // 判断是否为空
  if (username == "undefined" || password == "undefined") {
    return NextResponse.json({ message: "The form is not complete!" });
  }
  // 管理员账号、密码
  if (username == admin.username && password == admin.password) {
    const token = getjwt(username, request);
    return NextResponse.json({ message: "Success!", token: token });
  }
  return NextResponse.json({ message: "User name or password wrong!" });
}
// 获取所有用户状态接口
export async function POST() {
  let data = JSON.parse(fs.readFileSync("./app/api/user/user.json", "utf8"));
  return NextResponse.json(data);
}
// 改变用户状态
export async function PATCH(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let id = searchParams.get("id");
  let status = searchParams.get("status");
  let token = searchParams.get("token");
  let jwtb = JSON.parse(
    Buffer.from(token?.split(".")[1] as string, "base64").toString()
  );
  if (
    encrypt(`${token?.split(".")[0]}+'.'+${token?.split(".")[1]}`) !=
      token?.split(".")[2] ||
    jwtb.exp < Math.floor(Date.now() / 1000) ||
    jwtb["user-agent"] != request.headers.get("user-agent")
  ) {
    return NextResponse.json({ message: "Login failure!" });
  }
  let data = JSON.parse(fs.readFileSync("./app/api/user/user.json", "utf8"));
  data.forEach((item: any) => {
    if (item.id == id) {
      item.status = status;
    }
  });
  fs.writeFile(
    "./app/api/user/user.json",
    JSON.stringify(data),
    (error: any) => {}
  );
  return NextResponse.json({ message: "Success!" });
}
// 删除用户
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let id = searchParams.get("id");
  let token = searchParams.get("token");
  let jwtb = JSON.parse(
    Buffer.from(token?.split(".")[1] as string, "base64").toString()
  );
  if (
    encrypt(`${token?.split(".")[0]}+'.'+${token?.split(".")[1]}`) !=
      token?.split(".")[2] ||
    jwtb.exp < Math.floor(Date.now() / 1000) ||
    jwtb["user-agent"] != request.headers.get("user-agent")
  ) {
    return NextResponse.json({ message: "Login failure!" });
  }
  let data = JSON.parse(fs.readFileSync("./app/api/user/user.json", "utf8"));
  data = data.filter((item: any) => item.id != id);
  fs.writeFile(
    "./app/api/user/user.json",
    JSON.stringify(data),
    (error: any) => {}
  );
  return NextResponse.json({ message: "Success!" });
}
