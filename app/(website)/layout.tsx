import WebFooter from "@/components/web-footer";
import WebHeader from "@/components/web-header";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <WebHeader />
      <div className="flex-1">{children}</div>
      <WebFooter />
    </div>
  );
}
