"use client";

import { HTTP } from "@/HTTP";
import { useState } from "react";
import { useStore } from "../store/store";
import { useRouter } from "next/navigation";

export default function Edit() {
  const router = useRouter();
  const { showEdit, setShowEdit, editData, setMainData, mainData } = useStore();
  const [datas, setDatas] = useState<any>({});
  return (
    <>
      {showEdit && (
        <div className="fixed w-[80%] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[1000px] max-h-[80vh] noScrollbar overflow-auto z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--light)] p-4 rounded-3xl shadow-2xl">
          <div className="flex text-2xl font-bold text-[var(--title)]">
            Title：
            <textarea
              className="outline-none bg-[var(--light)] w-full px-1 h-8"
              defaultValue={editData.title}
              onChange={(e) => {
                setDatas({ ...datas, title: e.target.value });
              }}
            />
          </div>
          <div className="flex text-xl text-[var(--alias)]">
            Alias：
            <textarea
              className="outline-none bg-[var(--light)] w-full px-1 h-7"
              defaultValue={editData.alias}
              onChange={(e) => {
                setDatas({ ...datas, alias: e.target.value });
              }}
            />
          </div>
          <div className="flex text-[var(--english)]">
            English：
            <textarea
              className="outline-none bg-[var(--light)] w-full px-1 h-6"
              defaultValue={editData.english}
              onChange={(e) => {
                setDatas({ ...datas, english: e.target.value });
              }}
            />
          </div>
          <div className="flex text-[var(--japanese)]">
            Japanese：
            <textarea
              className="outline-none bg-[var(--light)] w-full px-1 h-6"
              defaultValue={editData.japanese}
              onChange={(e) => {
                setDatas({ ...datas, japanese: e.target.value });
              }}
            />
          </div>
          <div className="flex text-[var(--definition)] text-xl font-bold">
            Definition：
            <textarea
              className="outline-none bg-[var(--light)] w-full px-1 h-7"
              defaultValue={editData.definition}
              onChange={(e) => {
                setDatas({ ...datas, definition: e.target.value });
              }}
            />
          </div>
          <div className="flex text-sm text-[var(--gray)]">
            Description：
            <textarea
              className="outline-none bg-[var(--light)] w-full px-1 h-28"
              defaultValue={editData.description}
              onChange={(e) => {
                setDatas({ ...datas, description: e.target.value });
              }}
            />
          </div>
          <div className="flex text-[var(--a)]">
            BVideo：
            <textarea
              className="outline-none bg-[var(--light)] w-full px-1 h-6"
              defaultValue={editData.video}
              onChange={(e) => {
                setDatas({ ...datas, video: e.target.value });
              }}
            />
          </div>
          <div className="flex text-sm text-[var(--gray)]">
            Annotation：
            <textarea
              className="outline-none bg-[var(--light)] w-full px-1 h-12"
              defaultValue={editData.annotation}
              onChange={(e) => {
                setDatas({ ...datas, annotation: e.target.value });
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <button
              className="px-3 text-[var(--light)] bg-[var(--gray)] rounded-lg"
              onClick={() => {
                setShowEdit(false);
                setDatas({});
                if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                  document.documentElement.style.setProperty("--bg", "#000");
                  return false;
                }
                document.documentElement.style.setProperty("--bg", "#fff");
              }}
            >
              取消
            </button>
            <button
              className="px-3 text-[var(--light)] bg-[var(--failed)] rounded-lg"
              onClick={async () => {
                setShowEdit(false);
                if (localStorage.getItem("jwt") == null) {
                  router.push("/login");
                  return false;
                }
                let formData = new FormData();
                formData.append("title", editData.title);
                formData.append("jwt", localStorage.getItem("jwt") as string);
                let data = await fetch(`${HTTP}/api/dictionary`, {
                  method: "DELETE",
                  body: formData,
                });
                let res = await data.json();
                if (res.message == "Login failure!") {
                  localStorage.removeItem("jwt");
                  setShowEdit(false);
                  router.push("/login");
                  return false;
                }
                setMainData(
                  mainData.filter((item: any) => {
                    return item.title != editData.title;
                  })
                );
                if (res.jwt != undefined) {
                  localStorage.setItem("jwt", res.jwt.toString());
                }
                setDatas({});
                if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                  document.documentElement.style.setProperty("--bg", "#000");
                  return false;
                }
                document.documentElement.style.setProperty("--bg", "#fff");
              }}
            >
              删除
            </button>
            <button
              className="px-3 text-[var(--light)] bg-[var(--definition)] rounded-lg"
              onClick={async () => {
                setShowEdit(false);
                if (datas.title && datas.title != editData.title) {
                  let jwt = localStorage.getItem("jwt");
                  if (jwt == null) {
                    router.push("/login");
                    return false;
                  }
                  let username = decodeURI(
                    JSON.parse(window.atob(jwt.split(".")[1])).username
                  );
                  let formData = new FormData();
                  formData.append("title", editData.title);
                  formData.append("jwt", jwt as string);
                  formData.append("datas", JSON.stringify(datas));
                  let data = await fetch(`${HTTP}/api/dictionary`, {
                    method: "POST",
                    body: formData,
                  });
                  let res = await data.json();
                  if (res.message == "Login failure!") {
                    localStorage.removeItem("jwt");
                    setShowEdit(false);
                    router.push("/login");
                    return false;
                  }
                  let index;
                  mainData.forEach((item: any, i: number) => {
                    if (item.title == editData.title) {
                      index = i;
                    }
                  });
                  let current = JSON.parse(JSON.stringify(mainData));
                  if (index != undefined) {
                    current.splice(index + 1, 0, {
                      ...datas,
                      id: Date.now(),
                      updated: Date.now(),
                      username: username,
                    });
                    setMainData(current);
                  }
                  if (res.jwt != undefined) {
                    localStorage.setItem("jwt", res.jwt.toString());
                  }
                  setDatas({});
                }
                if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                  document.documentElement.style.setProperty("--bg", "#000");
                  return false;
                }
                document.documentElement.style.setProperty("--bg", "#fff");
              }}
            >
              添加
            </button>
            <button
              className="px-3 text-[var(--light)] bg-[var(--button)] rounded-lg"
              onClick={async () => {
                setShowEdit(false);
                let jwt = localStorage.getItem("jwt");
                if (jwt == null) {
                  router.push("/login");
                  return false;
                }
                let username = decodeURI(
                  JSON.parse(window.atob(jwt.split(".")[1])).username
                );
                let formData = new FormData();
                formData.append("title", editData.title);
                formData.append("jwt", jwt);
                formData.append("datas", JSON.stringify(datas));
                let data = await fetch(`${HTTP}/api/dictionary`, {
                  method: "PATCH",
                  body: formData,
                });
                let res = await data.json();
                if (res.message == "Login failure!") {
                  localStorage.removeItem("jwt");
                  setShowEdit(false);
                  router.push("/login");
                  return false;
                }
                let current = JSON.parse(JSON.stringify(mainData));
                current.forEach((item: any) => {
                  if (item.title === editData.title) {
                    Object.keys(datas).forEach((i) => {
                      item[i] = datas[i];
                      item.updated = Date.now();
                      item.username = username;
                    });
                  }
                });
                setMainData(current);
                if (res.jwt != undefined) {
                  localStorage.setItem("jwt", res.jwt.toString());
                }
                setDatas({});
                if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                  document.documentElement.style.setProperty("--bg", "#000");
                  return false;
                }
                document.documentElement.style.setProperty("--bg", "#fff");
              }}
            >
              应用
            </button>
          </div>
        </div>
      )}
    </>
  );
}
