import { encrypt, setjwt } from "@/app/api/config";
// 导入加密模块
const croypto = require("crypto");
// 导入请求、响应对象
import { NextRequest, NextResponse } from "next/server";
// 导入文件系统模块
const fs = require("fs");
// 请求用户数据接口
export function GET() {
  let data = JSON.parse(
    fs.readFileSync("./app/api/dictionary/dictionary.json", "utf8")
  );
  return NextResponse.json(data);
}
// 新增数据接口
export async function POST(request: NextRequest) {
  // 解析表单数据
  const formData = await request.formData();
  let title = formData.get("title");
  let datas = JSON.parse(formData.get("datas") as string);
  if (datas.title == undefined) {
    return NextResponse.json({ message: "The title is required!" });
  }
  if (datas.title == title) {
    return NextResponse.json({ message: "Title already exists!" });
  }
  let index;
  let jwt = formData.get("jwt") as string;
  let jwtb = JSON.parse(
    Buffer.from(jwt?.split(".")[1] as string, "base64").toString()
  );
  if (
    encrypt(`${jwt?.split(".")[0]}+'.'+${jwt?.split(".")[1]}`) !=
      jwt?.split(".")[2] ||
    jwtb.exp < Math.floor(Date.now() / 1000) ||
    jwtb["user-agent"] != request.headers.get("user-agent")
  ) {
    return NextResponse.json({ message: "Login failure!" });
  }
  let users = fs.readFileSync("./app/api/user/user.json", "utf8");
  users = JSON.parse(users);
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == decodeURI(jwtb.username)) {
      if (users[i].status == "false") {
        return NextResponse.json({ message: "Login failure!" });
      }
    }
  }
  if (Object.keys(datas).length === 0) {
    return NextResponse.json({ message: "No change in data!" });
  }
  // 更新jwt
  jwt = setjwt(jwtb);
  // 读取文件
  let data = JSON.parse(
    fs.readFileSync("./app/api/dictionary/dictionary.json", "utf8")
  );
  data.forEach((item: any, i: number) => {
    if (item.title == title) {
      index = i;
    }
  });
  if (index != undefined) {
    data.splice(index + 1, 0, {
      ...datas,
      id: croypto.randomUUID(),
      updated: Date.now(),
      username: decodeURI(jwtb.username),
    });
  }
  fs.writeFile(
    "./app/api/dictionary/dictionary.json",
    JSON.stringify(data),
    (error: any) => {}
  );

  return NextResponse.json({ message: "Data added successfully!", jwt: jwt });
}
// 更新数据接口
export async function PATCH(request: NextRequest) {
  // 解析表单数据
  if (request.method == "OPTIONS") {
    return NextResponse.next();
  }
  const formData = await request.formData();
  let title = formData.get("title");
  let datas = JSON.parse(formData.get("datas") as string);
  let backups = formData.get("backups") as string;
  let jwt = formData.get("jwt") as string;
  let jwtb = JSON.parse(
    Buffer.from(jwt?.split(".")[1] as string, "base64").toString()
  );
  if (
    encrypt(`${jwt?.split(".")[0]}+'.'+${jwt?.split(".")[1]}`) !=
      jwt?.split(".")[2] ||
    jwtb.exp < Math.floor(Date.now() / 1000) ||
    jwtb["user-agent"] != request.headers.get("user-agent")
  ) {
    return NextResponse.json({ message: "Login failure!" });
  }
  let users = fs.readFileSync("./app/api/user/user.json", "utf8");
  users = JSON.parse(users);
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == decodeURI(jwtb.username)) {
      if (users[i].status == "false") {
        return NextResponse.json({ message: "Login failure!" });
      }
    }
  }
  if (Object.keys(datas).length === 0) {
    return NextResponse.json({ message: "No change in data!" });
  }
  // 更新jwt
  jwt = setjwt(jwtb);
  // 读取文件
  let data = JSON.parse(
    fs.readFileSync("./app/api/dictionary/dictionary.json", "utf8")
  );
  data.forEach((item: any) => {
    if (item.title == title) {
      let patchdata: any = {
        mdfdate: Date.now(),
        mdfuser: decodeURI(jwtb.username),
        title: item.title,
      };
      Object.keys(datas).forEach((i) => {
        patchdata[i] = item[i];
        item[i] = datas[i];
        patchdata["mdf" + i] = datas[i];
      });
      item.updated = Date.now();
      item.username = decodeURI(jwtb.username);
      if (backups == "false") {
        return false;
      }
      let updtdata = JSON.parse(
        fs.readFileSync("./app/api/restore/restore.json", "utf8")
      );
      updtdata.unshift(patchdata);
      fs.writeFile(
        "./app/api/restore/restore.json",
        JSON.stringify(updtdata),
        (error: any) => {}
      );
    }
  });
  // 写入文件
  fs.writeFile(
    "./app/api/dictionary/dictionary.json",
    JSON.stringify(data),
    (error: any) => {}
  );
  return NextResponse.json({ message: "Data updated successfully!", jwt: jwt });
}
export async function DELETE(request: NextRequest) {
  // 解析表单数据
  const formData = await request.formData();
  let title = formData.get("title");
  let jwt = formData.get("jwt") as string;
  let jwtb = JSON.parse(
    Buffer.from(jwt?.split(".")[1] as string, "base64").toString()
  );
  if (
    encrypt(`${jwt?.split(".")[0]}+'.'+${jwt?.split(".")[1]}`) !=
      jwt?.split(".")[2] ||
    jwtb.exp < Math.floor(Date.now() / 1000) ||
    jwtb["user-agent"] != request.headers.get("user-agent")
  ) {
    return NextResponse.json({ message: "Login failure!" });
  }
  let users = fs.readFileSync("./app/api/user/user.json", "utf8");
  users = JSON.parse(users);
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == decodeURI(jwtb.username)) {
      if (users[i].status == "false") {
        return NextResponse.json({ message: "Login failure!" });
      }
    }
  }
  // 更新jwt
  jwt = setjwt(jwtb);
  // 读取文件
  let data = JSON.parse(
    fs.readFileSync("./app/api/dictionary/dictionary.json", "utf8")
  );
  data = data.filter((item: any) => {
    if (item.title == title) {
      let dltdata = JSON.parse(
        fs.readFileSync("./app/api/restore/restore.json", "utf8")
      );
      item.deleted = Date.now();
      item.dltuser = decodeURI(jwtb.username);
      dltdata.unshift(item);
      fs.writeFileSync(
        "./app/api/restore/restore.json",
        JSON.stringify(dltdata)
      );
    }
    return item.title != title;
  });
  // 写入文件
  fs.writeFile(
    "./app/api/dictionary/dictionary.json",
    JSON.stringify(data),
    (error: any) => {}
  );
  return NextResponse.json({ message: "Data deleted successfully!" });
}
