"use client";

import { useState } from "react";
import { HTTP } from "@/app/HTTP";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store/store";

export default function Admin() {
  const [datas, setDatas] = useState<any>({});
  const [data, setData] = useState<any>([]);
  const router = useRouter();
  const { setRecover } = useStore();

  return (
    <>
      <video
        className="bgvideo"
        src="https://skullgirlswiki.cn/Dictionary/Public/sea.mp4"
        muted
        loop
        autoPlay
      ></video>
      {data.length == 0 && (
        <form className="flex flex-col items-center rounded-3xl shadow-2xl fixed w-[350px] h-[260px] z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="mt-5 text-[var(--light)] tracking-widest text-3xl">
            LOGIN
          </h1>
          <input
            type="text"
            placeholder="Username"
            className="mt-5 w-[280px] px-2 h-10 outline-none text-[var(--light)] bg-[var(--input-bg)] rounded-xl"
            onChange={(e: any) => {
              setDatas({ ...datas, username: e.target.value });
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="mt-5 w-[280px] px-2 h-10 outline-none text-[var(--light)] bg-[var(--input-bg)] rounded-xl"
            onChange={(e: any) => {
              setDatas({ ...datas, password: e.target.value });
            }}
          />
          <input
            type="button"
            value="Sign in"
            className="mt-5 w-[280px] px-2 h-10 text-[var(--light)] bg-[var(--button)] rounded-xl cursor-pointer"
            onClick={async (e: any) => {
              e.preventDefault();
              let data = await fetch(
                `${HTTP}/api/admin?username=${datas.username}&password=${datas.password}`
              );
              let res = await data.json();
              if (res.message == "Success!") {
                localStorage.setItem("token", res.token.toString());
                fetch(`${HTTP}/api/admin`, {
                  method: "POST",
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setData(data);
                  });
              }
              setDatas({});
              e.target.parentElement?.reset();
            }}
          ></input>
        </form>
      )}
      {data.length > 0 && (
        <div className="absolute right-10 top-4 z-20">
          <button
            className="px-1 text-[var(--light)] bg-[var(--button)] rounded-lg"
            onClick={() => {
              fetch(`${HTTP}/api/restore`)
                .then((res) => res.json())
                .then((data) => setRecover(data));
              router.push("/recover");
            }}
          >
            数据恢复
          </button>
        </div>
      )}
      {data.length > 0 && (
        <div className="absolute max-h-[350px] overflow-auto noScrollbar z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <table>
            <thead>
              <tr className="text-[var(--light)]">
                <th className="pr-10">username</th>
                <th className="pr-10">status</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any) => {
                return (
                  <tr key={item.id}>
                    <td className="text-[var(--light)]">{item.username}</td>
                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          id="switchButton"
                          defaultChecked={item.status == "true" ? true : false}
                          onClick={async (e: any) => {
                            if (localStorage.getItem("token") == null) {
                              setData([]);
                              return false;
                            }
                            let data = await fetch(
                              `${HTTP}/api/admin?id=${item.id}&status=${
                                e.target.checked
                              }&token=${localStorage.getItem("token")}`,
                              {
                                method: "PATCH",
                              }
                            );
                            let res = await data.json();
                            if (res.message == "Login failure!") {
                              localStorage.clear();
                              setData([]);
                            }
                          }}
                        />
                        <span className="slider"></span>
                      </label>
                    </td>
                    <td>
                      <button
                        className="px-1 text-[var(--light)] bg-[var(--failed)] rounded-lg"
                        onClick={async (e: any) => {
                          if (localStorage.getItem("token") == null) {
                            setData([]);
                            return false;
                          }
                          let data = await fetch(
                            `${HTTP}/api/admin?id=${
                              item.id
                            }&token=${localStorage.getItem("token")}`,
                            {
                              method: "DELETE",
                            }
                          );
                          let res = await data.json();
                          if (res.message == "Login failure!") {
                            localStorage.removeItem("token");
                            setData([]);
                          }
                          e.target.parentElement.parentElement.remove();
                        }}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
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
