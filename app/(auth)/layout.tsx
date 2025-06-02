export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-screen bg-neutral-50 justify-center items-center">
      {children}
    </div>
  );
}