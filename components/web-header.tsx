import { LogIn } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function WebHeader() {
  return (
    <div className="w-full">
      <div className="container mx-auto flex justify-between items-center px-2 py-4">
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={40}
            height={40}
            className="w-auto h-[40px]"
            priority
          />
        </div>
        <div className="flex items-center">
          <Button variant="ghost" asChild>
            <Link href="/login">
              <LogIn />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
