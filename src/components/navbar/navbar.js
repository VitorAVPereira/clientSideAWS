import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { getCookies, deleteCookie } from 'cookies-next'
import LogoutButton from '../buttons/logoutButton'
import { HydrationProvider, Server, Client } from 'react-hydration-provider';


const Navbar = () => {
    const [nav, setNav] = useState(false)
    const [color, setColor] = useState('transparent')
    const [textColor, setTextColor] = useState('white')
    const router = useRouter()
    const cookies = getCookies(undefined);
    const username = decodeURIComponent(cookies['username']);
    let { isLoggedIn } = username ? true : false;
   
    console.log(isLoggedIn);
    const handleNav = () => {
        setNav(!nav)
    }
    

    useEffect(()=>{
        const changeColor = () => {
            if(window.scrollY >= 90) {
                setColor('#ffffff');
                setTextColor('#000000')
            } else {
                setColor('transparent');
                setTextColor('#ffffff')
            }
        }
        window.addEventListener('scroll', changeColor)
    }, [])
    

  return (
    <HydrationProvider>
        <Server>
            <div>Loading...</div>
        </Server>
        <Client>
                <div style={{backgroundColor: `${color}`}} className='fixed left-0 top-0 w-full z-10 ease-in duration-300'>
                    <div className='max-w-[1240px] m-auto flex justify-between items-center p-4 text-white'>
                        <Link href='/homepage'>
                            <h1 style={{color: `${textColor}`}} className='font-bold text-4xl'>Fullvision</h1>
                        </Link>
                        <ul style={{color: `${textColor}`}} className='hidden sm:flex align-middle'>
                            <li className='p-4 mt-1'>
                                <Link href='/homepage'>Início</Link>
                            </li>
                            <li className='p-4 mt-1'>
                                <Link href='/contact'>Contato</Link>
                            </li>
                            
                            <li className='p-4 mt-1'>
                                <span>Bem vindo, {username}!</span>
                            </li>
                            <li className='p-4'>
                                <LogoutButton >Sair</LogoutButton>
                            </li>
                        </ul>
    
    
                        {/** Mobile Button */}
                        <div onClick={handleNav} className='block sm:hidden z-10'>
                            {nav 
                            ? <AiOutlineClose size={20} style={{color: `${textColor}`}} /> 
                            : <AiOutlineMenu size={20} style={{color: `${textColor}`}} />}
                        </div>
                        {/** Mobile Menu */}
                        <div className={nav 
                            ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
                            :
                            'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
                        }>
                            <ul>
                                <li className='p-4 text-4xl hover:text-gray-500'>
                                    <Link href='/homepage'>Início</Link>
                                </li>
                                <li className='p-4 text-4xl hover:text-gray-500'>
                                    <Link href='/contact'>Contato</Link>
                                </li>
    
                                <li className='p-4 mt-1'>
                                    <span>Bem vindo, {username}!</span>
                                </li>
                                <LogoutButton>Sair</LogoutButton>
    
                            </ul>
                        </div>
                    </div>
                </div>
        </Client>
    </HydrationProvider>
  )
}

export default Navbar