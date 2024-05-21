import { IEmployeeList } from "@/interfaces";
import { create } from "zustand";

interface IUseStore {
  search: string;
  setSearch: (search: string) => void;

  tableRows: IEmployeeList | null;
  setTableRows: (tableRows: IEmployeeList) => void;

  tableRowsLoading: boolean;
  setTableRowsLoading: (tableRowsLoading: boolean) => void;
}

export const useStore = create<IUseStore>()((set) => ({
  search: "",
  setSearch: (search: string) => set({ search }),

  tableRows: null,
  setTableRows: (tableRows: IEmployeeList) => set({ tableRows }),

  tableRowsLoading: false,
  setTableRowsLoading: (tableRowsLoading: boolean) => set({ tableRowsLoading }),
}));
