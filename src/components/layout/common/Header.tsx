import { Link } from "react-router-dom";

interface HeaderProps {
  toggleSideMenu: boolean;
  setToggleSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ toggleSideMenu, setToggleSideMenu }: HeaderProps) => {
  const handleToggleSideMenu = () => {
    setToggleSideMenu(!toggleSideMenu);
  };

  return (
    <header className="l-header">
      <Link to="/" className="e-header-title">
        リスクんの防災ブログ
      </Link>

      <nav className="e-header-nav">
        <Link to="/" className="e-header-link">
          ホーム
        </Link>

        <Link to="/blogs" className="e-header-link">
          ブログ
        </Link>

        <Link to="/contact" className="e-header-link ">
          お問い合わせ
        </Link>
      </nav>

      <div className={`e-header-ham ${toggleSideMenu && "active"}`} onClick={handleToggleSideMenu}>
        <hr />
        <hr />
      </div>
    </header>
  );
};

export default Header;
