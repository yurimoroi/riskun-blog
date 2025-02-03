import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
};

const Footer = () => {
  const width = useWindowWidth();
  const pathname = useLocation().pathname;
  const iconDisplayFlg = pathname !== "/" ? true : 1024 < width ? true : false;

  const handleArrowUpClick = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="l-footer">
      <div className="e-footer-icons">
        {iconDisplayFlg && (
          <img src="./images/riskun.JPG" alt="イラスト" className="e-footer-icons-img" />
        )}

        <p className="e-footer-icons-title">リスクんの防災ブログ</p>
      </div>

      <nav className="e-footer-nav">
        <Link to="/" className="e-footer-nav-link">
          ホーム
        </Link>

        <hr className="e-footer-nav-line" />

        <Link to="/blogs" className="e-footer-nav-link">
          ブログ一覧
        </Link>

        <hr className="e-footer-nav-line" />

        <Link to="/contact" className="e-footer-nav-link ">
          お問い合わせ
        </Link>
      </nav>

      <svg
        className="e-footer-arrow"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        onClick={handleArrowUpClick}
      >
        <path
          d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z"
          stroke="#fff"
          strokeWidth="2"
        />
        <path
          d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z"
          stroke="#fff"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 13.5L12 9L7.5 13.5"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="e-foooter-copyright">&copy; リスクんの防災ブログ</span>
    </footer>
  );
};

export default Footer;
