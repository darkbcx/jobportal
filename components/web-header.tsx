import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function WebHeader() {
  return (
    <div className="w-full">
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
        </div>
      </div>
    </div>
  );
}
