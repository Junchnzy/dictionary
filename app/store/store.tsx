"use client";

import { HTTP } from "@/app/HTTP";
import { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext<any>(null);

export function useStore() {
  return useContext(StoreContext);
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState();
  const [showItem, setShowItem] = useState(false);
  const [itemData, setItemData] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [itemArray, setItemArray] = useState([]);
  const [recover, setRecover] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${HTTP}/api/dictionary`)
      .then((res) => res.json())
      .then((data) => setMainData(data));
  }, []);

  return (
    <StoreContext.Provider
      value={{
        showEdit,
        setShowEdit,
        isLogin,
        setIsLogin,
        editData,
        setEditData,
        showItem,
        setShowItem,
        itemData,
        setItemData,
        mainData,
        setMainData,
        itemArray,
        setItemArray,
        search,
        setSearch,
        recover,
        setRecover,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
