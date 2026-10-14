import './globals.css';import {StoreProvider} from '@/components/StoreProvider';import Header from '@/components/Header';
export const metadata={title:'SEEKER — Beyond the Ordinary',description:'Premium editorial clothing and contemporary culture.'};
export default function Layout({children}){return <html lang="en"><body><StoreProvider><Header/>{children}<footer className="footer"><div className="brand">SEEKER</div><p>ART. CULTURE. PEOPLE. CLOTHING.</p><p>© {new Date().getFullYear()} SEEKER — Concept fashion store</p></footer></StoreProvider></body></html>}
