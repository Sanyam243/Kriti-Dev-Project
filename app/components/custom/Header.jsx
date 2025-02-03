


"use client";
import React, { useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { UserContext } from "../../context/UserContext";
import { LucideDownload } from "lucide-react";
import { ActionContext } from "../../context/ActionContext";
import SignInPopUp from "./SignInPopUp";

function Header() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const { action, setAction } = useContext(ActionContext);
  const path = usePathname();
  const [openDialog, setOpenDialog] = useState(false);

  const login = () => {
    setOpenDialog(true);
  };

  const onAction = (actionType) => {
    setAction({
      actionType,
      timeStamp: Date.now(),
    });
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <div className="flex p-4 items-center justify-between bg-customPurple">
      <Image
        onClick={handleLogoClick}
        src={"/logo.png"}
        alt="logo"
        width={40}
        height={40}
        className="cursor-pointer"
      />
      {!user?.name ? (
        <div className="flex gap-3 ml-auto">
          <Button
            className="bg-purple-700 text-gray-300 rounded font-semibold px-2 hover:bg-customPurple"
            onClick={login}
          >
            Sign In
          </Button>
          {/* <Button className="bg-purple-700 text-gray-300 rounded font-semibold px-2 hover:bg-customPurple">
            Get Started
          </Button> */}
          
        </div>
      ) : (
        path?.includes("workspace") && (
          <div className="flex gap-2 items-center ml-auto">
            <Button
              variant="ghost"
              className="bg-black text-white hover:bg-gray-800"
              onClick={() => onAction("export")}
            >
              <LucideDownload /> Export
            </Button>
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => onAction("deploy")}
            >
              Deploy
            </Button>
          </div>
        )
      )}
      {/* Include the SignInPopUp component */}
      <SignInPopUp
        openDialog={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </div>
  );
}

export default Header;
