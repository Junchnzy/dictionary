"use client";

import { useState } from "react";
import { useStore } from "../store/store";

export default function Item() {
  const [showvideo, setShowVideo] = useState(false);
  const {
    showItem,
    setShowItem,
    itemData,
    setItemData,
    mainData,
    itemArray,
    setItemArray,
  } = useStore();
  return (
    <>
      {showItem && itemData && (
        <div className="fixed w-[80%] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[1000px] max-h-[80vh] noScrollbar overflow-auto z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--light)] p-4 rounded-3xl shadow-2xl">
          <h1 className="my-3">
            <span className="text-2xl font-bold text-[var(--title)] mr-3">
              {itemData.title}
            </span>
            {itemData.alias && (
              <span className="hidden text-xl text-[var(--alias)] mr-3">
                {itemData.alias}
              </span>
            )}
            {itemData.english && (
              <span className="text-[var(--english)] mr-3">
                {itemData.english}
              </span>
            )}
            {itemData.japanese && (
              <span className="text-[var(--japanese)] mr-3">
                {itemData.japanese}
              </span>
            )}
          </h1>
          {itemData.definition && (
            <h2 className="my-3 text-xl font-bold text-[var(--definition)]">
              {itemData.definition}
            </h2>
          )}
          {itemData.description && (
            <div
              className="my-3 text-sm text-[var(--gray)]"
              dangerouslySetInnerHTML={{ __html: itemData.description }}
              onClick={(e: any) => {
                e.preventDefault();
                if (e.target.getAttribute("href") != null) {
                  setShowItem(true);
                  mainData.forEach((item: any) => {
                    if (item.title == e.target.getAttribute("href")) {
                      setItemArray(itemArray.concat(item.title));
                      setItemData(item);
                    }
                  });
                }
              }}
            ></div>
          )}
          {itemData.video && showvideo && (
            <iframe
              className="w-full aspect-video"
              src={`//player.bilibili.com/player.html?&autoplay=0&poster=1&bvid=${itemData.video}`}
              allowFullScreen
            ></iframe>
          )}
          {itemData.annotation && showvideo && (
            <p className="my-3 text-sm text-[var(--gray)]">
              {itemData.annotation}
            </p>
          )}
          {itemData.updated && (
            <div className="my-3 flex justify-between text-sm text-[var(--gray)]">
              <span>{new Date(itemData.updated).toLocaleString()}</span>
              <span>{itemData.username}</span>
            </div>
          )}
          <div className="flex justify-between">
            <div>
              {itemData.video && (
                <button
                  className="px-1 text-[var(--light)] bg-[var(--a)] rounded-lg"
                  onClick={() => setShowVideo(!showvideo)}
                >
                  视频演示
                </button>
              )}
            </div>
            {itemArray.length > 1 && (
              <button
                className="px-1 text-[var(--light)] bg-[var(--button)] rounded-lg"
                onClick={async () => {
                  itemArray.pop();
                  mainData.forEach((item: any) => {
                    if (item.title == itemArray[itemArray.length - 1]) {
                      setItemData(item);
                    }
                  });
                }}
              >
                返回上级
              </button>
            )}
            <button
              className="px-1 text-[var(--light)] bg-[var(--gray)] rounded-lg"
              onClick={async () => {
                setShowVideo(false);
                setShowItem(false);
                setItemArray([]);
                if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                  document.documentElement.style.setProperty("--bg", "#000");
                  return false;
                }
                document.documentElement.style.setProperty("--bg", "#fff");
              }}
            >
              关闭弹窗
            </button>
          </div>
        </div>
      )}
    </>
  );
}
