import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
}
