"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  ChevronDownIcon,
  User,
  LogOut,
  Settings,
  Building,
  Briefcase,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { useUser } from "@/lib/contexts/UserContext";
import { User as UserType, JobSeeker, Employer, Admin } from "@/lib/types";

export default function WebHeader() {
  const {
    state: { user, isAuthenticated, isLoading },
    logout,
  } = useUser();

  const handleLogout = async () => {
    await logout();
  };

  const getUserIcon = () => {
    if (!user) return <User className="h-4 w-4" />;

    switch (user.user_type) {
      case "JOB_SEEKER":
        return <User className="h-4 w-4" />;
      case "EMPLOYER":
        return <Building className="h-4 w-4" />;
      case "ADMIN":
        return <Briefcase className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getUserDisplayName = (
    user: UserType | JobSeeker | Employer | Admin | null
  ): string => {
    if (!user) return "Unknown User";

    if (user.user_type === "JOB_SEEKER") {
      const jobSeeker = user as JobSeeker;
      return (
        `${jobSeeker.first_name || ""} ${jobSeeker.last_name || ""}`.trim() ||
        user.email
      );
    }

    if (user.user_type === "EMPLOYER") {
      const employer = user as Employer;
      return employer.company_name || user.email;
    }

    return user.email;
  };

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
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!isLoading && (
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      {getUserIcon()}
                      <span className="hidden sm:inline">
                        {getUserDisplayName(user)}
                      </span>
                      <ChevronDownIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm font-medium">
                      {getUserDisplayName(user)}
                    </div>
                    <div className="px-2 py-1.5 text-xs text-muted-foreground">
                      {user.email}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2"
                      >
                        <Briefcase className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/settings"
                        className="flex items-center gap-2"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-600 focus:text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
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
          </div>
        )}
      </div>
    </div>
  );
}
