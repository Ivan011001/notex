import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

interface LogoProps {
  title?: boolean;
}

export const Logo = ({ title = false }: LogoProps) => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image src="/logo.svg" height="40" width="40" alt="Logo" className="dark:hidden" />
      <Image
        src="/logo-dark.svg"
        height="40"
        width="40"
        alt="Logo"
        className="hidden dark:block"
      />
      {title && <p className={cn("font-semibold", poppins.className)}>Notex</p>}
    </div>
  );
};
