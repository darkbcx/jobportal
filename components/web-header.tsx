"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronDownIcon, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserMenu from "./dropdown-menu/user-menu";
import { User } from "@/lib/types";

export default function WebHeader() {
  const { data: session, status: authStatus } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const user = session?.user;

  useEffect(() => {
    switch (authStatus) {
      case "authenticated":
        setIsAuthenticated(true);
        setIsLoading(false);
        break;
      case "unauthenticated":
        setIsAuthenticated(false);
        setIsLoading(false);
        break;
      case "loading":
        setIsAuthenticated(false);
        setIsLoading(true);
        break;
    }
  }, [authStatus,session]);

  return (
    <div className="w-full border-b bg-white">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={40}
              height={40}
              className="w-auto h-[40px]"
              priority
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {isAuthenticated ? (
                <UserMenu user={user as User} onLogout={() => signOut()} />
              ) : (
                <>
                  {/* Auth Buttons */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        Register
                        <ChevronDownIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link href="/register/jobseeker">Job Seeker</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/register/employer">Company</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="default" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
