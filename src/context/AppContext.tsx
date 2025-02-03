import { createContext, ReactNode, useContext, useState } from "react";
import { BLogListProps } from "../types/BlogList";

interface AppContextType {
  blogList: BLogListProps[];
  setBlogList: React.Dispatch<React.SetStateAction<BLogListProps[]>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [blogList, setBlogList] = useState<BLogListProps[]>([]);

  return (
    <AppContext.Provider
      value={{
        blogList,
        setBlogList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("グローバルなデータはプロバイダーの中で取得してください。");
  }
  return context;
};
