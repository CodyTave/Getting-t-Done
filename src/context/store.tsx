import { Dispatch, SetStateAction, createContext, useContext } from "react";

interface UserContextType {
  username: string | null;
  setUser: Dispatch<SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType>({
  username: "",
  setUser: () => {},
});
export const useUserContext = () => useContext(UserContext);

interface modalContextType {
  taskId: string | null;
  setTaskId: Dispatch<SetStateAction<string | null>>;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
}

export const ModalContext = createContext<modalContextType>({
  taskId: null,
  setTaskId: () => {},
  isOpen: false,
  onOpen: () => {},
  onOpenChange: () => {},
});
export const useModalContext = () => useContext(ModalContext);

interface FilterContextType {
  status: string | null;
  setStatus: Dispatch<SetStateAction<string | null>>;
}

export const FilterContext = createContext<FilterContextType>({
  status: null,
  setStatus: () => {},
});
export const useFilterContext = () => useContext(FilterContext);
