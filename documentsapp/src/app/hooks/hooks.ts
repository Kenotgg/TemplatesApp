import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "@/app/appStore";
import type { IUser } from "@/entities/user/model/user";
interface UseUserData {
    user: IUser | null;
}
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useUserData = (): UseUserData => {
    const user = useSelector((state: RootState) => state.auth.user)
    return { user };
}