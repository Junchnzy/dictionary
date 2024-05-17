import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./store/store";
import Edit from "./components/Edit";
import Item from "./components/Item";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "格斗术语-刘笑寒格斗游戏术语词典-中国最好的格斗游戏术语词典-江城子格斗游戏术语词典-格斗游戏术语",
  description:
    "中国最好的格斗游戏术语词典，收录了各种格斗游戏中的术语，并提供相应的解释和解释视频。内容包括但不限于2D格斗游戏术语、3D格斗游戏术语和平台格斗游戏术语，分别适用于《街头霸王》、《拳皇》、《铁拳》、《真人快打》、《罪恶装备》、《苍翼模式录》、《任天堂大乱斗》、《龙珠斗士Z》、《碧蓝幻想：对决》、《月姬格斗》、《夜下降生》、《骷髅女孩》和《2XKO》等热门格斗游戏和格斗游戏系列。由格斗游戏理论专家刘笑寒运营和格斗学者QQ群维护。",
  keywords:
    "格斗游戏术语,格斗游戏,格斗游戏术语词典,格斗词典,格斗术语,格斗学术,刘笑寒,Junchnzy,江城子，江城子格斗游戏术语词典，刘笑寒格斗游戏术语词典，街头霸王,拳皇,真人快打,铁拳,词典,街头霸王6术语,延迟拆,帧数,打拆,升龙，罪恶装备,苍翼默示录,任天堂大乱斗,龙珠斗士Z,碧蓝幻想：对决,GBVS,GBVSR,月姬格斗,MBTL,夜下降生,骷髅女孩,Skullgirls,英雄联盟格斗,2XKO",
    verification: {
      google: "QLXUFTt7O94K9_P6vGY4FLJ0-aamDn1YE7veO4-Y_0U",
      other: {
        "baidu-site-verification": ["codeva-3P3ocdNMYw"],
      },
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="noScrollbar bg-[var(--bg)]">
      <body className={inter.className}>
        <StoreProvider>
          <div className="progress"></div>
          <Edit />
          <Item />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
