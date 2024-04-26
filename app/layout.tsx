import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./store/store";
import Edit from "./components/Edit";
import Item from "./components/Item";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "格斗术语-刘笑寒格斗游戏词典",
  description:
    "中国最好的格斗游戏词典，收录了各种格斗游戏中的术语，并提供相应的解释和解释视频。",
  keywords:
    "刘笑寒,Junchnzy,格斗游戏,格斗游戏词典,格斗游戏术语,格斗词典,格斗术语,格斗学术,街头霸王,拳皇,真人快打,铁拳,词典,街头霸王6术语,延迟拆,帧数,打拆,升龙",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="noScrollbar bg-[var(--bg)]">
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
