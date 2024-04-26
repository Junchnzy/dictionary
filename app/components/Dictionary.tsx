"use client";

import { useState } from "react";
import { useStore } from "@/app/store/store";

export default function Dictionary({ data }: { data: any }) {
  const {
    isLogin,
    setShowEdit,
    setEditData,
    setShowItem,
    mainData,
    setItemData,
    itemArray,
    setItemArray,
    search,
  } = useStore();
  type Data = {
    id?: string;
    title?: string;
    alias?: string;
    english?: string;
    japanese?: string;
    definition?: string;
    description?: string[];
    video?: string;
    annotation?: string;
    updated?: string;
    username: string;
  };
  return (
    <>
      {data.map((item: Data) => {
        return (
          <div
            className="w-[90%] mx-auto lg:max-w-[800px] xl:max-w-[900px] 2xl:max-w-[1100px]"
            key={item.id}
          >
            {item.title && (
              <h1 className="my-3">
                <span className="text-2xl font-bold text-[var(--title)] mr-3">
                  {item.title}
                </span>
                {item.alias != "" &&
                  item.alias != undefined &&
                  search != "" &&
                  item.alias.includes(search) &&
                  item.alias.split("/").map((i: any) => {
                    if (i == search) {
                      return (
                        <span
                          key={i}
                          className="text-xl text-[var(--alias)] mr-3"
                        >
                          {i}
                        </span>
                      );
                    }
                  })}
                {item.english && (
                  <span className="text-[var(--english)] mr-3">
                    {item.english}
                  </span>
                )}
                {item.japanese && (
                  <span className="text-[var(--japanese)] mr-3">
                    {item.japanese}
                  </span>
                )}
                {isLogin && item.id != "404" && (
                  <button
                    className=" float-right mt-[6px] px-1 text-[var(--light)] bg-[var(--button)] rounded-lg"
                    onClick={() => {
                      setEditData(item);
                      setShowEdit(true);
                      if (
                        window.matchMedia("(prefers-color-scheme: dark)")
                          .matches
                      ) {
                        document.documentElement.style.setProperty(
                          "--bg",
                          "#222"
                        );
                        return false;
                      }
                      document.documentElement.style.setProperty(
                        "--bg",
                        "#ccc"
                      );
                    }}
                  >
                    编辑
                  </button>
                )}
              </h1>
            )}
            {item.definition && (
              <h2 className="my-3 text-xl font-bold text-[var(--definition)]">
                {item.definition}
              </h2>
            )}
            {item.description && (
              <div
                className="my-3 text-sm text-[var(--gray)]"
                dangerouslySetInnerHTML={{ __html: item.description }}
                onClick={(e: any) => {
                  e.preventDefault();
                  if (e.target.getAttribute("href") == null) {
                    return false;
                  }
                  if (e.target.id == 1) {
                    window.open(e.target.getAttribute("href"), "_blank");
                    return false;
                  }
                  setShowItem(true);
                  mainData.forEach((item: any) => {
                    if (item.title == e.target.getAttribute("href")) {
                      setItemArray(itemArray.concat(item.title));
                      setItemData(item);
                      if (
                        window.matchMedia("(prefers-color-scheme: dark)")
                          .matches
                      ) {
                        document.documentElement.style.setProperty(
                          "--bg",
                          "#222"
                        );
                        return false;
                      }
                      document.documentElement.style.setProperty(
                        "--bg",
                        "#ccc"
                      );
                    }
                  });
                }}
              ></div>
            )}
            <Frames item={item} />
            {item.updated && (
              <div className="my-3 flex justify-between text-sm text-[var(--gray)]">
                <span>{new Date(item.updated).toLocaleString()}</span>
                <span>{item.username}</span>
              </div>
            )}
            <hr />
          </div>
        );
      })}
    </>
  );
}

function Frames(prop: any) {
  const [showvideo, setShowVideo] = useState(false);
  const item = prop.item;
  return (
    <>
      {item.video && (
        <button
          className="mb-3 px-1 text-[var(--light)] bg-[var(--a)] rounded-lg"
          onClick={() => setShowVideo(!showvideo)}
        >
          视频演示
        </button>
      )}
      {item.video && showvideo && (
        <iframe
          className="w-full aspect-video"
          src={`//player.bilibili.com/player.html?&autoplay=0&poster=1&bvid=${item.video}`}
          allowFullScreen
        ></iframe>
      )}
      {item.annotation && showvideo && (
        <p className="my-3 text-sm text-[var(--gray)]">{item.annotation}</p>
      )}
    </>
  );
}
