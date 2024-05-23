import { IEmployeeList } from "@/interfaces";
import { create } from "zustand";

interface IUseStore {
  search: string;
  setSearch: (search: string) => void;

  tableRows: IEmployeeList | null;
  setTableRows: (tableRows: IEmployeeList) => void;

  tableRowsLoading: boolean;
  setTableRowsLoading: (tableRowsLoading: boolean) => void;

  analysisItem: {
    department: string;
    totalEmployees: number;
    participants: number;
  };
  setAnalysisItem: (analysisItem: {
    department: string;
    totalEmployees: number;
    participants: number;
  }) => void;
}

export const useStore = create<IUseStore>()((set) => ({
  search: "",
  setSearch: (search: string) => set({ search }),

  tableRows: null,
  setTableRows: (tableRows: IEmployeeList) => set({ tableRows }),

  tableRowsLoading: false,
  setTableRowsLoading: (tableRowsLoading: boolean) => set({ tableRowsLoading }),
  analysisItem: { department: "", participants: 0, totalEmployees: 0 },
  setAnalysisItem: (analysisItem: {
    department: string;
    totalEmployees: number;
    participants: number;
  }) => set({ analysisItem }),
}));
