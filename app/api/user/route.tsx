import { encrypt, getjwt } from "@/app/api/config";
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
  // 读取JSON文件
  let data = JSON.parse(fs.readFileSync("./app/api/user/user.json", "utf8"));
  // 判断用户是否存在
  password = encrypt(password as string);
  if (
    data.find(
      (item: any) =>
        item.username == username &&
        item.password == password &&
        item.status == "false"
    )
  ) {
    return NextResponse.json({
      message: "Please contact the administrator!",
    });
  }
  if (
    data.find(
      (item: any) => item.username == username && item.password == password
    )
  ) {
    let jwt = getjwt(username!, request);
    return NextResponse.json({ message: "Success!", jwt: jwt });
  }
  return NextResponse.json({ message: "User name or password wrong!" });
}
// 添加用户接口
export async function POST(request: NextRequest) {
  // 解析表单数据
  const formData = await request.formData();
  let datas: any = formData.get("datas");
  datas = JSON.parse(datas as string);
  let { id, username, password, confirm } = datas;
  // 判断是否为空
  if (
    id == undefined ||
    username == undefined ||
    password == undefined ||
    confirm == undefined
  ) {
    return NextResponse.json({ message: "The form is not complete!" });
  }
  // 判断密码是否一致
  if (password != confirm) {
    return NextResponse.json({ message: "The passwords are not the same!" });
  }
  // 正则验证身份证
  let reg =
    /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/;
  if (!reg.test(id as string)) {
    return NextResponse.json({ message: "The ID number is not correct!" });
  }
  // 读取JSON文件
  let data = JSON.parse(fs.readFileSync("./app/api/user/user.json", "utf8"));
  // 判断用户名是否已存在
  if (data.find((item: any) => item.username == username)) {
    return NextResponse.json({ message: "The user name already exists!" });
  }
  // 判断身份证是否已存在
  if (data.find((item: any) => item.id == encrypt(id as string))) {
    return NextResponse.json({ message: "The id card already exists!" });
  }
  // 加密
  id = encrypt(id as string);
  password = encrypt(password as string);
  // 添加新用户
  data.push({ username: username, password: password, id: id, status: "true" });
  // 写入JSON文件
  fs.writeFile(
    "./app/api/user/user.json",
    JSON.stringify(data),
    (error: any) => {}
  );
  return NextResponse.json({ message: "Success!" });
}
