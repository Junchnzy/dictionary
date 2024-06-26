"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store/store";
import { HTTP } from "@/HTTP";

export default function Admin() {
  const { setIsLogin } = useStore();
  const router = useRouter();
  const [datas, setDatas] = useState<any>({});
  const [message, setMessage] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  return (
    <>
      <div
        className={
          showLogin
            ? "w-screen h-screen bg-[url(https://image.liuxiaohan.cn/Dictionary/Public/Stage_Boardwalk_LRG.webp)] bg-cover"
            : "hidden"
        }
      >
        <form className="flex flex-col items-center backdrop-blur-lg rounded-3xl shadow-2xl fixed w-[350px] h-[350px] z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="mt-5 text-[var(--light)] tracking-widest text-3xl">
            编辑者登录
          </h1>
          <input
            type="text"
            placeholder="用户名"
            className="mt-5 w-[280px] px-2 h-10 outline-none text-[var(--light)] bg-[var(--input-bg)] rounded-xl"
            onChange={(e: any) => {
              setDatas({ ...datas, username: e.target.value });
            }}
          />
          <input
            type="password"
            placeholder="密码"
            className="mt-5 w-[280px] px-2 h-10 outline-none text-[var(--light)] bg-[var(--input-bg)] rounded-xl"
            onChange={(e: any) => {
              setDatas({ ...datas, password: e.target.value });
            }}
          />
          <div className="mt-5 w-[280px] flex justify-between">
            <p
              className="text-[var(--light)] cursor-pointer"
              onClick={(e: any) => {
                setMessage("请联系管理员重置！");
                e.target.parentElement.parentElement.reset();
              }}
            >
              忘记密码？
            </p>
            <a
              className="text-[var(--light)] cursor-pointer"
              onClick={(e: any) => {
                e.preventDefault();
                setShowLogin(false);
                setMessage("");
                setDatas({});
                e.target.parentElement.parentElement.reset();
              }}
            >
              注册
            </a>
          </div>
          <div className="mt-5 h-6">
            {message == "Success!" && (
              <p className="text-[var(--seccess)]">{message}</p>
            )}
            {message != "Success!" && (
              <p className="text-[var(--failed)]">{message}</p>
            )}
          </div>
          <input
            type="button"
            value="登录"
            className="mt-5 w-[280px] px-2 h-10 text-[var(--light)] bg-[var(--button)] rounded-xl cursor-pointer"
            onClick={async (e: any) => {
              e.preventDefault();
              let data = await fetch(
                `${HTTP}/api/user?username=${datas.username}&password=${datas.password}`
              );
              let res = await data.json();
              if (res.jwt) {
                localStorage.setItem("jwt", res.jwt.toString());
              }
              if (res.message == "Success!") {
                setTimeout(() => {
                  setIsLogin(true);
                  setShowLogin(true);
                  setMessage("");
                  router.push("/");
                }, 1000);
              }
              setMessage(res.message);
              setDatas({});
              e.target.parentElement.reset();
            }}
          ></input>
        </form>
      </div>
      <div
        className={
          showLogin
            ? "hidden"
            : "bg-[url(https://image.liuxiaohan.cn/Dictionary/Public/Stage_RooftopsDay_LRG.webp)] w-screen h-screen bg-cover"
        }
      >
        <form className="flex flex-col items-center backdrop-blur-lg rounded-3xl shadow-2xl fixed w-[350px] h-[470px] z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="mt-5 text-[var(--light)] tracking-widest text-3xl">
            成为编辑者
          </h1>
          <input
            type="password"
            placeholder="身份证号码（加密后站长也无法查询）"
            className="mt-5 w-[280px] px-2 h-10 outline-none text-[var(--light)] bg-[var(--input-bg)] rounded-xl"
            onChange={(e: any) => {
              setDatas({ ...datas, id: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="用户名"
            className="mt-5 w-[280px] px-2 h-10 outline-none text-[var(--light)] bg-[var(--input-bg)] rounded-xl"
            onChange={(e: any) => {
              setDatas({ ...datas, username: e.target.value });
            }}
          />
          <input
            type="password"
            placeholder="密码"
            className="mt-5 w-[280px] px-2 h-10 outline-none text-[var(--light)] bg-[var(--input-bg)] rounded-xl"
            onChange={(e: any) => {
              setDatas({ ...datas, password: e.target.value });
            }}
          />
          <input
            type="password"
            placeholder="确认密码"
            className="mt-5 w-[280px] px-2 h-10 outline-none text-[var(--light)] bg-[var(--input-bg)] rounded-xl"
            onChange={(e: any) => {
              setDatas({ ...datas, confirm: e.target.value });
            }}
          />
          <div
            className="mt-5 w-[280px] flex justify-between"
            onClick={(e: any) => {
              e.preventDefault();
              setShowLogin(true);
              setMessage("");
              setDatas({});
              e.target.parentElement.parentElement.reset();
            }}
          >
            <p className="text-[var(--light)] cursor-pointer">
              已有账号？
            </p>
            <a className="text-[var(--light)] cursor-pointer">登录</a>
          </div>
          <div className="mt-5 h-6">
            {message == "Success!" && (
              <p className="text-[var(--seccess)]">{message}</p>
            )}
            {message != "Success!" && (
              <p className="text-[var(--failed)]">{message}</p>
            )}
          </div>
          <input
            type="button"
            value="注册"
            className="mt-5 w-[280px] px-2 h-10 text-[var(--light)] bg-[var(--button)] rounded-xl cursor-pointer"
            onClick={async (e: any) => {
              e.preventDefault();
              let formData = new FormData();
              formData.append("datas", JSON.stringify(datas));
              let data = await fetch(`${HTTP}/api/user`, {
                method: "POST",
                body: formData,
              });
              let res = await data.json();
              if (res.message == "Success!") {
                setTimeout(() => {
                  setShowLogin(true);
                  setMessage("");
                }, 1000);
              }
              setMessage(res.message);
              setDatas({});
              e.target.parentElement.reset();
            }}
          ></input>
        </form>
      </div>
      <a
        href="https://beian.miit.gov.cn/"
        className="fixed bottom-10 left-1/2 -translate-x-1/2"
        target="_blank"
        style={{ color: "var(--light)" }}
      >
        沪ICP备2024049967号-2
      </a>
    </>
  );
}
