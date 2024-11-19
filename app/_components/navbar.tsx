"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const selectedClassname = "text-primary font-bold";
  const defaultClassname = "text-muted-foreground";

  return (
    <nav className="flex justify-between px-8 py-4 border-b border-solid">
      {/* Left: */}
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="Finance AI logo" width={173} height={39} />
        <Link href='/' className={pathname === '/' ? selectedClassname : defaultClassname}>Dashboard</Link>
        <Link href='/transactions' className={pathname === '/transactions' ? selectedClassname : defaultClassname}>Transactions</Link>
        <Link href='/subscription' className={pathname === '/subscription' ? selectedClassname : defaultClassname}>Subscription</Link>
      </div>

      {/* Right: */}
      <UserButton showName />
    </nav>
  )
};

export default Navbar;
