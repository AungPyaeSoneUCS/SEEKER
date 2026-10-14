'use client';
import Link from 'next/link';
import {money,salePrice} from '@/lib/pricing';
import RotatingImage from './RotatingImage';
export default function ProductCard({p,pool=[],index=0}){
  const own=p.image||'/images/product-hoodie.jpg';
  const images=[own,...pool.filter(x=>x&&x!==own)];
  return <Link href={'/product/'+p.id} className="product-card"><div className="product-image"><RotatingImage images={images} alt={p.name} offset={index} interval={30000} delay={30000+((index%5)*6000)}/>{p.discount>0&&<span className="discount-tag">-{p.discount}%</span>}</div><div className="product-info"><div><span>{p.category.toUpperCase()}</span><h3>{p.name}</h3></div><div className="price">{p.discount>0&&<del>{money(p.price)}</del>}<strong>{money(salePrice(p))}</strong></div></div></Link>;
}
