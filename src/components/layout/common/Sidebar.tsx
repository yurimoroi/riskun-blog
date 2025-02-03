import { Link } from "react-router-dom";

interface SidebarProps {
  toggleSideMenu: boolean;
  setToggleSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ toggleSideMenu, setToggleSideMenu }: SidebarProps) => {
  const handleToggleSideMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setToggleSideMenu(false);
    }
  };

  return (
    <nav
      className={`l-slide-menu ${toggleSideMenu && "active"}`}
      onClick={(e) => {
        handleToggleSideMenu(e);
      }}
    >
      <div className="e-slide-menu-inner">
        <ul className="e-slide-menu-list">
          <li className="e-slide-menu-item">
            <Link
              to="/"
              onClick={(e) => {
                handleToggleSideMenu(e);
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69ZM12 3L2 12H5V20H11V14H13V20H19V12H22L12 3Z"
                  fill="#fff"
                />
              </svg>
              ホーム
            </Link>
          </li>
          <li className="e-slide-menu-item">
            <Link
              to="/blogs"
              onClick={(e) => {
                handleToggleSideMenu(e);
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 12H7V13H2V12ZM2 9H7V10H2V9ZM13 7H3C2.73478 7 2.48043 6.89464 2.29289 6.70711C2.10536 6.51957 2 6.26522 2 6V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H13C13.2652 2 13.5196 2.10536 13.7071 2.29289C13.8946 2.48043 14 2.73478 14 3V6C14 6.26522 13.8946 6.51957 13.7071 6.70711C13.5196 6.89464 13.2652 7 13 7ZM3 3V6H13V3H3ZM13 14H10C9.73478 14 9.48043 13.8946 9.29289 13.7071C9.10536 13.5196 9 13.2652 9 13V10C9 9.73478 9.10536 9.48043 9.29289 9.29289C9.48043 9.10536 9.73478 9 10 9H13C13.2652 9 13.5196 9.10536 13.7071 9.29289C13.8946 9.48043 14 9.73478 14 10V13C14 13.2652 13.8946 13.5196 13.7071 13.7071C13.5196 13.8946 13.2652 14 13 14ZM10 10V13H13V10H10Z"
                  fill="#fff"
                />
              </svg>
              ブログ一覧
            </Link>
          </li>
          <li className="e-slide-menu-item">
            <Link
              to="/contact"
              onClick={(e) => {
                handleToggleSideMenu(e);
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 19H5V5H19M19 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3ZM16.5 16.25C16.5 14.75 13.5 14 12 14C10.5 14 7.5 14.75 7.5 16.25V17H16.5M12 12.25C12.5967 12.25 13.169 12.0129 13.591 11.591C14.0129 11.169 14.25 10.5967 14.25 10C14.25 9.40326 14.0129 8.83097 13.591 8.40901C13.169 7.98705 12.5967 7.75 12 7.75C11.4033 7.75 10.831 7.98705 10.409 8.40901C9.98705 8.83097 9.75 9.40326 9.75 10C9.75 10.5967 9.98705 11.169 10.409 11.591C10.831 12.0129 11.4033 12.25 12 12.25Z"
                  fill="#fff"
                />
              </svg>
              お問い合わせ
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
