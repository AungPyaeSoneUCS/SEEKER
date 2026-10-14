'use client';
import Link from 'next/link';
import {usePathname,useRouter} from 'next/navigation';
import {LayoutDashboard,Package,ShoppingBag,CalendarDays,TicketPercent,CreditCard,QrCode,LogOut} from 'lucide-react';
const NAV=[['Overview','/admin',LayoutDashboard],['Products','/admin/products',Package],['Orders','/admin/orders',ShoppingBag],['Events','/admin/events',CalendarDays],['Discounts','/admin/discounts',TicketPercent],['Payments','/admin/payments',CreditCard],['QR Coupon Studio','/admin/qr',QrCode]];
export default function AdminSidebar(){
  const pathname=usePathname()||'';
  const router=useRouter();
  return <aside className="admin-sidebar">
    <Link className="brand" href="/admin"><img className="brand-logo" src="/logo/logo.png" alt="SEEKER"/><span>ADMIN</span></Link>
    <p className="nav-label">Menu</p>
    <nav className="admin-nav">
      {NAV.map(([label,href,Icon])=>{const active=href==='/admin'?pathname==='/admin':pathname===href||pathname.startsWith(href+'/');return <Link key={href} href={href} className={active?'active':''}><Icon aria-hidden="true"/><span>{label}</span></Link>})}
    </nav>
    <button className="admin-logout" onClick={async()=>{await fetch('/api/admin/logout',{method:'POST'});router.push('/admin/login');router.refresh()}}><LogOut aria-hidden="true"/><span>Log out</span></button>
  </aside>;
}
