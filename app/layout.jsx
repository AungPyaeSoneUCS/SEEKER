import './globals.css';import {StoreProvider} from '@/components/StoreProvider';import SiteChrome from '@/components/SiteChrome';
export const metadata={title:'SEEKER — Beyond the Ordinary',description:'Premium editorial clothing and contemporary culture.',icons:{icon:'/logo/logo.png'}};
export default function Layout({children}){return <html lang="en"><body><StoreProvider><SiteChrome>{children}</SiteChrome></StoreProvider></body></html>}
