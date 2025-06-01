import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

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
        <div className="flex items-center">
          <Button variant="default" asChild>
            <Link href="/login">Let&apos;s Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
