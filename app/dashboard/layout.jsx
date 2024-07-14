import { Toaster } from "sonner";
import Header from "./_components/Header";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Toaster />
      <Header />
      <div className="mx-3 md:mx-9 lg:mx-24">{children}</div>
    </div>
  );
}
