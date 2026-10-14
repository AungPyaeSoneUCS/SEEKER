import {SignJWT,jwtVerify} from 'jose';import {cookies} from 'next/headers';
const secret=()=>new TextEncoder().encode(process.env.SESSION_SECRET||'LOCAL_DEVELOPMENT_ONLY_CHANGE_THIS_SECRET_123456');
export async function createSession(id){return await new SignJWT({id,role:'admin'}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('8h').sign(secret())}
export async function isAdmin(){try{const token=(await cookies()).get('seeker_admin')?.value;if(!token)return false;const {payload}=await jwtVerify(token,secret());return payload.role==='admin'}catch{return false}}
