import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Building, ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { Briefcase, UserIcon, Settings, LogOut } from "lucide-react";
import { User } from "@/lib/types";

interface UserMenuProps {
  user: User;
  onLogout: () => void;
}

export default function UserMenu({ user, onLogout }: UserMenuProps) {
  const getUserIcon = () => {
    if (!user) return <UserIcon className="h-4 w-4" />;

    switch (user.user_type) {
      case "JOB_SEEKER":
        return <UserIcon className="h-4 w-4" />;
      case "EMPLOYER":
        return <Building className="h-4 w-4" />;
      case "ADMIN":
        return <Briefcase className="h-4 w-4" />;
      default:
        return <UserIcon className="h-4 w-4" />;
    }
  };

  const getUserDisplayName = (user: User | null): string => {
    if (!user) return "Unknown User";

    // if (user.user_type === "JOB_SEEKER" && isJobSeekerProfile(profile)) {
    //   return `${profile?.first_name} ${profile?.last_name}`;
    // } else if (user.user_type === "EMPLOYER" && isEmployerProfile(profile)) {
    //   return profile?.company_name;
    // } else if (user.user_type === "ADMIN" && isAdminProfile(profile)) {
    //   return profile?.admin_level;
    // } else {
    //   return user.email;
    // }

    return user.email;
  };


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            {getUserIcon()}
            <span className="hidden sm:inline">{getUserDisplayName(user)}</span>
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
            <Link href="/dashboard" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onLogout}
            className="flex items-center gap-2 text-red-600 focus:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
