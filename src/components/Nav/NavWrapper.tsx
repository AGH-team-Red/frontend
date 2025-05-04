import { AppSidebar } from "./AppSidebar";
import { SiteHeader } from "./SiteHeader";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

export default function NavWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
