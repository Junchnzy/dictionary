"use client";

import { HTTP } from "@/app/HTTP";
import { useState, useId, Fragment } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store/store";

export default function Demo() {
  const key = useId;
  const router = useRouter();
  const { recover, setRecover } = useStore();
  return (
    <>
      {recover.length > 0 && (
        <div className="w-[90%] mx-auto lg:max-w-[800px] xl:max-w-[900px] 2xl:max-w-[1100px] text-center">
          <button
            className="mt-3 px-1 text-[var(--light)] bg-[var(--button)] rounded-lg"
            onClick={() => {
              if (confirm("确定清空恢复数据？")) {
                fetch(`${HTTP}/api/restore`, {
                  method: "DELETE",
                });
                setRecover([]);
                router.push("/admin");
              }
            }}
          >
            清空恢复数据
          </button>
        </div>
      )}
      {recover.length > 0 &&
        recover.map((item: any) => {
          return (
            <Fragment key={key()}>
              {item.deleted && (
                <div
                  className="w-[90%] mx-auto lg:max-w-[800px] xl:max-w-[900px] 2xl:max-w-[1100px]"
                  key={item.deleted}
                >
                  <h1 className="my-3">
                    {item.title && (
                      <span className="text-2xl font-bold text-[var(--title)] mr-3">
                        {item.title}
                      </span>
                    )}
                    {item.alias && (
                      <span className="text-xl text-[var(--alias)] mr-3">
                        {item.alias}
                      </span>
                    )}
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
                    <button
                      className="float-right mt-[6px] px-1 text-[var(--light)] bg-[var(--button)] rounded-lg"
                      onClick={async () => {
                        let token = localStorage.getItem("token");
                        if (token == null) {
                          router.push("/admin");
                          return false;
                        }
                        let str = prompt("恢复到输入的词条后面：");
                        if (str == null || str == "") {
                          return false;
                        }
                        let formData = new FormData();
                        formData.append("title", str);
                        formData.append("jwt", token as string);
                        formData.append("datas", JSON.stringify(item));
                        await fetch(`${HTTP}/api/dictionary`, {
                          method: "POST",
                          body: formData,
                        });
                      }}
                    >
                      恢复
                    </button>
                  </h1>
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
                      }}
                    ></div>
                  )}
                  <Frames item={item} />
                  <div className="my-3 flex justify-between text-sm text-[var(--failed)]">
                    <span>{new Date(item.deleted).toLocaleString()}</span>
                    <span>{item.dltuser}</span>
                  </div>
                  <hr />
                </div>
              )}
              {item.mdfdate && (
                <div
                  className="w-[90%] mx-auto lg:max-w-[800px] xl:max-w-[900px] 2xl:max-w-[1100px]"
                  key={item.mdfdate}
                >
                  <div className="my-3">
                    <span className="text-2xl font-bold text-[var(--title)]">
                      Title：{item.title}
                    </span>
                    {item.mdftitle != "" &&
                      item.mdftitle != undefined &&
                      item.mdftitle != item.title && (
                        <>
                          <span className="text-2xl font-bold mx-3">👉</span>
                          <span className="text-2xl font-bold text-lime-500">
                            {item.mdftitle}
                          </span>
                        </>
                      )}
                    <button
                      className="float-right mt-[6px] px-1 text-[var(--light)] bg-[var(--button)] rounded-lg"
                      onClick={async () => {
                        let token = localStorage.getItem("token");
                        if (token == null) {
                          router.push("/admin");
                          return false;
                        }
                        let str = prompt("恢复数据到指定词条上：");
                        if (str == null || str == "") {
                          return false;
                        }
                        let data: any = {};
                        if (item.title != undefined && item.title != "") {
                          data.title = item.title;
                        }
                        if (item.alias != undefined && item.alias != "") {
                          data.alias = item.alias;
                        }
                        if (item.english != undefined && item.english != "") {
                          data.english = item.english;
                        }
                        if (item.japanese != undefined && item.japanese != "") {
                          data.japanese = item.japanese;
                        }
                        if (
                          item.definition != undefined &&
                          item.definition != ""
                        ) {
                          data.definition = item.definition;
                        }
                        if (
                          item.description != undefined &&
                          item.description != ""
                        ) {
                          data.description = item.description;
                        }
                        if (item.video != undefined && item.video != "") {
                          data.video = item.video;
                        }
                        if (
                          item.annotation != undefined &&
                          item.annotation != ""
                        ) {
                          data.annotation = item.annotation;
                        }
                        let formData = new FormData();
                        formData.append("title", str);
                        formData.append("backups", "false");
                        formData.append("jwt", token as string);
                        formData.append("datas", JSON.stringify(data));
                        await fetch(`${HTTP}/api/dictionary`, {
                          method: "PATCH",
                          body: formData,
                        });
                      }}
                    >
                      恢复
                    </button>
                  </div>
                  {item.mdfalias && (
                    <div className="text-xl my-3 text-[var(--alias)]">
                      Alias：
                      {item.alias != "" && item.alias != undefined && (
                        <>
                          <span>{item.alias}</span>
                          <span className="mx-2">👉</span>
                        </>
                      )}
                      <span className="text-lime-500">{item.mdfalias}</span>
                    </div>
                  )}
                  {item.mdfenglish && (
                    <div className="my-3 text-[var(--english)]">
                      English：
                      {item.english != "" && item.english != undefined && (
                        <>
                          <span>{item.english}</span>
                          <span className="mx-2">👉</span>
                        </>
                      )}
                      <span className="text-lime-500">{item.mdfenglish}</span>
                    </div>
                  )}
                  {item.mdfjapanese && (
                    <div className="my-3 text-[var(--japanese)]">
                      Japanese：
                      {item.japanese != "" && item.japanese != undefined && (
                        <>
                          <span>{item.japanese}</span>
                          <span className="mx-2">👉</span>
                        </>
                      )}
                      <span className="text-lime-500">{item.mdfjapanese}</span>
                    </div>
                  )}
                  {item.mdfdescription && (
                    <div className="my-3 text-[var(--gray)]">
                      {item.description != "" &&
                        item.description != undefined && (
                          <p className="mb-3">{item.description}👉</p>
                        )}
                      <p className="text-lime-500">{item.mdfdescription}</p>
                    </div>
                  )}
                  {item.mdfvideo && (
                    <div className="my-3 text-[var(--a)]">
                      Bvideo：
                      {item.video != "" && item.video != undefined && (
                        <>
                          <span>{item.video}</span>
                          <span className="mx-2">👉</span>
                        </>
                      )}
                      <span className="text-lime-500">{item.mdfvideo}</span>
                    </div>
                  )}
                  {item.mdfannotation && (
                    <div className="my-3 text-[var(--gray)]">
                      {item.annotation != "" &&
                        item.annotation != undefined && (
                          <p className="mb-3">{item.annotation}👉</p>
                        )}
                      <p className="text-lime-500">{item.mdfannotation}</p>
                    </div>
                  )}
                  <div className="my-3 flex justify-between text-sm text-[var(--gray)]">
                    <span>{new Date(item.mdfdate).toLocaleString()}</span>
                    <span>{item.mdfuser}</span>
                  </div>
                  <hr />
                </div>
              )}
            </Fragment>
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
