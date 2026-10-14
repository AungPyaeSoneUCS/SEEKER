'use client';
import {usePathname} from 'next/navigation';
export default function PageTransition({children}){
  const pathname=usePathname();
  return <div className="page-transition" key={pathname}>{children}</div>;
}
