import request from "@/components/axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { WithChildren } from "@/_metronic/helpers";
import { getCurrentUser } from "../axios/request";
import { CompanyInfo, JwtDecode, UserInfo } from "../types/common";
import { useStateMachine, createStore } from "little-state-machine";
import { clearStateAction, updateAccouraCompany } from "@/_metronic/layout/components/header/config";
import { xorScramble, xorUnscramble } from "../utils";


type AuthContextProps = {
  currentUser: UserInfo | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserInfo | undefined>>;
  refreshToken: (token: string) => void;
  getUser: () => void;
  logout: () => void;

};

const initAuthContextPropsState = {
  currentUser: undefined,
  setCurrentUser: () => { },
  refreshToken: (token: string) => { },
  getUser: () => { },
  logout: () => { },
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserInfo | undefined>();

  const { state, actions } = useStateMachine({
    actions: {
      updateAccouraCompany,
      clearStateAction
    }
  });

  useEffect(() => {
    createStore({
      UserState: {
        searchCriteria: { pageSize: 10, currentPage: 1, total: 0 },
        infoFilter: { user_name: "", email: "", last_login: "", company_id: "" },
      },
      DocumentState: {
        searchCriteria: { pageSize: 10, currentPage: 1, total: 0 },
        infoFilter: { company_id: undefined, from_date: "", to_date: "", status_upload: "" },
        transactionFilter: { searchValue: "", statusUpload: "All" }
      }
    });
  }, [state]);

  const token = Cookies.get("token");

  const logout = () => {
    setCurrentUser(undefined);
    Cookies.remove("token");
    Cookies.remove("mode");
    Cookies.remove("typeActive");
    Cookies.remove("typeFilter");
    Cookies.remove("remember_me");
    Cookies.remove("FilterSession");
    actions.clearStateAction();
  };

  function handleLogout() {
    logout();
    return;
  }

  const refreshToken = async (token: string) => {
    if (!token) return handleLogout();

    const unScrambledData = xorUnscramble(token);
    if (!unScrambledData) return handleLogout();

    const { exp } = jwtDecode<JwtDecode>(unScrambledData || "");
    const timestamp = exp ? (+exp || 0) * 1000 : 0;

    const expires = exp ? new Date(timestamp) : undefined;
    if (!timestamp || !expires || !unScrambledData) {
      return handleLogout();
    }

    const scrambledToken = xorScramble(unScrambledData);
    
    Cookies.set("token", scrambledToken, {
      expires,
    });
    try {
      const [userResp] = await Promise.all([
        getCurrentUser(),
      ]);
      const { data: dataRes } = userResp || {};
      const { data, error } = dataRes || {};

      if (error || !data) {
        return handleLogout();
      }
      const unScrambledData = xorUnscramble(data);
      setCurrentUser(JSON.parse(unScrambledData));
    } catch (error: any) {
      return handleLogout();
    }
  };

  const getUser = async () => {
    try {
      const [userResp] = await Promise.all([
        getCurrentUser(),
      ]);
      const { data: dataRes } = userResp || {};
      const { data } = dataRes || {};
      if (data) {
        const unScrambledData = xorUnscramble(data);
        setCurrentUser(JSON.parse(unScrambledData));
      } else {
        console.warn("No user data found");
        logout();
      }
    } catch (error) {
      console.error(error);
      logout();
      window.location.replace('/login');
    }
  };

  useEffect(() => {
    if (token) {
      refreshToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        refreshToken,
        getUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
