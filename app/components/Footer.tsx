export default function Footer() {
  return (
    <footer className="w-[90%] mx-auto lg:max-w-[800px] xl:max-w-[900px] 2xl:max-w-[1100px]">
      <hr />
      <h2 className="my-3 text-xl font-bold text-[var(--definition)]">
        相关链接
      </h2>
      <h3 className="my-3 text-[var(--gray)]">
        <a href="https://glossary.infil.net/index.html" target="_blank">
          Infil格斗游戏词典
        </a>
        、
        <a href="https://kakuge.com/wiki/" target="_blank">
          格ゲーム用語事典
        </a>
        、
        <a href="https://skullgirls.cn/" target="_blank">
          骷髅女孩Wiki
        </a>
      </h3>
      <h2 className="my-3 text-xl font-bold text-[var(--definition)]">
        备案号
      </h2>
      <h3 className="my-3 text-[var(--gray)]">
        <a href="https://beian.miit.gov.cn/" target="_blank">
          沪ICP备2024049967号-2
        </a>
      </h3>
    </footer>
  );
}
