import React, { useState } from "react";
import { userType } from "@/app/UserContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const LogoutBtn = ({ user, setUser, classNames }: { user: userType, setUser: React.Dispatch<React.SetStateAction<userType>>, classNames: string }) => {

  const [btnClicked, setBtnClicked] = useState(false);
  const { toast } = useToast();

  const handleLogOut = () => {
    setBtnClicked(true);
    axios
      .get("/api/logout", { withCredentials: true })
      .then((e) => {
        setUser({
          name: "",
          isLoggedin: false,
          isVarified: false,
          id: null,
          profilePic: "",
        });
        toast({
          title: "Logged out.",
          description: e.data.msg,
        });
      })
      .catch((e) => {
        console.log(e);
        toast({
          title: "Error",
          description: "Error occured.",
        });
      })
      .finally(() => setBtnClicked(false));
  };
  return (
    <button
      className={`fixed top-5 right-5 px-2 py-1 rounded-md bg-red-500 text-white font-bold transition duration-200 hover:bg-red-600 hover:text-white border-2 border-transparent z-[70] ${classNames} ${
        btnClicked ? "opacity-50" : ""
      }`}
      onClick={handleLogOut}
      style={!user.isLoggedin ? { display: "none" } : {}}
      disabled={btnClicked ? true : false}
    >
      Log out
    </button>
  );
};

export default LogoutBtn;
