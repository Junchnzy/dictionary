export default function Footer() {
  return (
    <footer className="w-[90%] mx-auto lg:max-w-[800px] xl:max-w-[900px] 2xl:max-w-[1100px]">
      <hr />
      <h2 className="my-3 text-xl font-bold text-[var(--definition)]">
        备案号
      </h2>
      <h3 className="my-3 text-[var(--gray)]">
        <a href="https://beian.miit.gov.cn/" target="_blank">
          沪ICP备2024049967号-2
        </a>
        <br />
        <a href="https://beian.mps.gov.cn/#/query/webSearch?code=31012102000145" target="_blank">
        沪公网安备31012102000145号
        </a>
      </h3>
    </footer>
  );
}
