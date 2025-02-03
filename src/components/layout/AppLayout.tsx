import { Outlet } from "react-router-dom";
import Footer from "./common/Footer";
import Header from "./common/Header";
import Sidebar from "./common/Sidebar";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { BLogListProps } from "../../types/BlogList";
import { useQuery } from "@tanstack/react-query";

const fetchBlogs = async (): Promise<BLogListProps[]> => {
  const response = await fetch("http://localhost:3001/api/blogs");
  const data = await response.json();

  return data.body.message ?? [];
};

const AppLayout = () => {
  const { setBlogList } = useAppContext();
  const [toggleSideMenu, setToggleSideMenu] = useState(false);

  const { data: blogDatas } = useQuery<BLogListProps[]>({
    queryKey: ["blogList"],
    queryFn: fetchBlogs,
    initialData: [],
  });

  useEffect(() => {
    if (blogDatas) {
      setBlogList(blogDatas);
    }
  }, [blogDatas]);

  return (
    <>
      <Header toggleSideMenu={toggleSideMenu} setToggleSideMenu={setToggleSideMenu} />
      <Sidebar toggleSideMenu={toggleSideMenu} setToggleSideMenu={setToggleSideMenu} />

      <Outlet />

      <Footer />
    </>
  );
};

export default AppLayout;
