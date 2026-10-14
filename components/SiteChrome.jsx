'use client';
import {usePathname} from 'next/navigation';
import Header from './Header';
import PageTransition from './PageTransition';
export default function SiteChrome({children}){
  const pathname=usePathname()||'';
  const isAdmin=pathname==='/admin'||pathname.startsWith('/admin/');
  return <>{!isAdmin&&<Header/>}<PageTransition>{children}</PageTransition>{!isAdmin&&<footer className="footer"><div className="brand"><img className="brand-logo" src="/logo/logo.png" alt="SEEKER"/></div><p>ART. CULTURE. PEOPLE. CLOTHING.</p><p>© {new Date().getFullYear()} SEEKER — Concept fashion store</p></footer>}</>;
}
