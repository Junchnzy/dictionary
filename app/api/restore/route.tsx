// 导入请求、响应对象
import { NextRequest, NextResponse } from "next/server";
// 导入文件系统模块
const fs = require("fs");
// 请求用户数据接口
export function GET() {
  let data = JSON.parse(
    fs.readFileSync("./app/api/restore/restore.json", "utf8")
  );
  return NextResponse.json(data);
}
export async function DELETE() {
  fs.writeFile(
    "./app/api/restore/restore.json",
    JSON.stringify([]),
    (error: any) => {}
  );
  return NextResponse.json({ message: "Data deleted successfully!" });
}
