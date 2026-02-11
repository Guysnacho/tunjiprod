import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserState {
  id: string | undefined;
  role: "admin" | "student" | "postdoctorial" | "professional" | undefined;
}

export interface UserActions {
  setId: (id?: string) => void;
  setRole: (role: UserState["role"]) => void;
}

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  id: undefined,
  role: undefined,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...defaultInitState,
      setId: (id?: string) => set(() => ({ id })),
      setRole: (role: UserState["role"]) => set(() => ({ role })),
    }),
    {
      name: "user",
    }
  )
);
