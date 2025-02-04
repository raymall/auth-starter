import { SidebarProvider } from '@/app/components/ui/sidebar'
import { Sidebar } from '@/app/components/Sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar />
      {children}
    </SidebarProvider>
  )
}
