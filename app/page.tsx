"use client";

import { useEffect } from "react";
import { useStore } from "@/app/store/store";
import { useRouter } from "next/navigation";
import Footer from "./components/Footer";
export default function Root() {
  const router = useRouter();
  const { setIsLogin, mainData } = useStore();
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setIsLogin(true);
    }
  });
  return (
    <>
      <div className="w-[90%] mx-auto lg:max-w-[800px] xl:max-w-[900px] 2xl:max-w-[1100px]">
        <h1 className="pt-3 text-2xl font-bold text-[var(--title)]">
          中国最好的格斗游戏术语词典
        </h1>
        <h2 className="my-3 text-xl font-bold text-[var(--definition)]">
          页面简介
        </h2>
        <h3 className="my-3 text-[var(--gray)]">
          本站共收录{mainData.length}个词条， 点击查看
          <button
            className="px-1 mx-2 text-[var(--light)] bg-[var(--button)] rounded-lg"
            onClick={() => {
              router.push("/main");
            }}
          >
            所有词条
          </button>
          。
        </h3>
        <h3 className="my-3 text-[var(--gray)]">
          想要维护本页面请加入
          <a
            href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=4RWNZ1gHwejTeerX2-JxrjK6X1MJg_W-&authKey=ofZAvlYPkze%2FcUG4WA0mgQoot23z3dq5vmyXbGLPCmurWgqvoXFfqJCH%2FZlZYUnZ&noverify=0&group_code=741908688"
            target="_blank"
          >
            格斗学者
          </a>
          QQ群联系管理员。
        </h3>
        <h3 className="my-3 text-[var(--gray)]">
          我们始终提供高质量的内容，有能力可以
          <a href="https://afdian.net/a/skullgirls" target="_blank">
            赞助我们
          </a>
          。
        </h3>
        <h2 className="my-3 text-xl font-bold text-[var(--definition)]">
          相关链接
        </h2>
        <h3 className="my-3 text-[var(--gray)]">
          <a href="https://glossary.infil.net/" target="_blank">
          The Fighting Game Glossary by Infil（英）
          </a>
          <br/>
          <a href="https://kakuge.com/wiki/" target="_blank">
          格ゲー用語事典（日）
          </a>
          
        </h3>
      </div>
      <Footer />
    </>
  );
}
