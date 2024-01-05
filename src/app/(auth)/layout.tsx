import Logo from "@/components/logo";
import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="bg-paleBlue min-h-[calc(100vh-96px)]">
      <div className="  flex-col pb-4">
        <div className="flex justify-center"></div>
        <hr className="h-[2px] bg-deepBlue bg-opacity-50 border-none mx-auto" />
      </div>
      <div className="flex  justify-center">
        <div className="md:px-20 px-6 flex text-center bg-white p-10 rounded-2xl shadow-lg md:mx-0 mx-5">
          <div className="md:max-w-[319px]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
