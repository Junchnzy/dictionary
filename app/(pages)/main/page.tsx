"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/app/store/store";
import Dictionary from "@/app/components/Dictionary";
import Footer from "@/app/components/Footer";

export default function Main() {
  const router = useRouter();
  const { mainData, setIsLogin, search, setSearch } = useStore();
  const [temporary, setTemporary]: any = useState([]);
  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleColorSchemeChange = (event: any) => {
      const isDarkModePreferred = event.matches;
      if (isDarkModePreferred) {
        document.documentElement.style.setProperty("--bg", "#000");
      } else {
        document.documentElement.style.setProperty("--bg", "#fff");
      }
    };
    handleColorSchemeChange(darkModeQuery);
    darkModeQuery.addEventListener("change", handleColorSchemeChange);
    return () => {
      darkModeQuery.removeEventListener("change", handleColorSchemeChange);
    };
  }, []);
  useEffect(() => {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      let exp = decodeURI(JSON.parse(window.atob(jwt.split(".")[1])).exp);
      if (Math.floor(Date.now() / 1000) > Number(exp)) {
        localStorage.removeItem("jwt");
        setIsLogin(false);
        router.push("/login");
      } else {
        setIsLogin(true);
      }
    }
  });
  function handleKeyDown() {
    if (search == "") {
      return setTemporary([]);
    }
    let newSet = new Set();
    mainData.forEach((item: any) => {
      if (item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        newSet.add(item.title);
    });
    mainData.forEach((item: any) => {
      if (
        item.alias &&
        item.alias.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
        newSet.add(item.title);
    });
    mainData.forEach((item: any) => {
      if (
        item.english &&
        item.english.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
        newSet.add(item.title);
    });
    mainData.forEach((item: any) => {
      if (
        item.japanese &&
        item.japanese.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
        newSet.add(item.title);
    });
    mainData.forEach((item: any) => {
      if (
        item.definition &&
        item.definition.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
        newSet.add(item.title);
    });
    mainData.forEach((item: any) => {
      if (
        item.description &&
        item.description
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
      )
        newSet.add(item.title);
    });
    let newArray: any[] = [];
    newSet.forEach((item) => {
      mainData.forEach((item1: any) => {
        if (item == item1.title) newArray.push(item1);
      });
    });
    if (newArray.length == 0) {
      return setTemporary([{ id: "404", title: "Data Not Found!" }]);
    }
    setTemporary(newArray);
  }
  return (
    <>
      <div className="fixed z-10 top-0 left-1/2 -translate-x-1/2 py-2 w-[90%] mx-auto lg:max-w-[800px] xl:max-w-[900px] 2xl:max-w-[1100px] bg-[var(--bg)]">
        <input
          placeholder="输入框内容为空时搜索显示所有词条！"
          className="px-2 h-8 w-[calc(100%-65px)] mr-4 border border-[var(--gray)] outline-none rounded-xl"
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleKeyDown();
            }
          }}
        />
        <button
          className="px-2 h-8 text-[var(--light)] bg-[var(--button)] rounded-lg"
          onClick={handleKeyDown}
        >
          搜索
        </button>
      </div>
      <div className="h-12"></div>
      {temporary.length == 0 ? (
        <Dictionary data={mainData} />
      ) : (
        <Dictionary data={temporary} />
      )}
      <Footer />
      <div className="w-[90%] mx-auto lg:max-w-[800px] xl:max-w-[900px] 2xl:max-w-[1100px]">
        <hr />
        <button
          className="my-3 px-1 mx-2 text-[var(--light)] bg-[var(--button)] rounded-lg"
          onClick={() => {
            router.push("/");
          }}
        >
          返回首页
        </button>
      </div>
    </>
  );
}
