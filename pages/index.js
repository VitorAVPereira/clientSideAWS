import HomePage from "../src/components/homePage/homePage.js";
import { useEffect } from 'react';
import { useAuth } from '../src/context/AuthContext.js';
import { useRouter } from 'next/router';

export default function Index() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <>
      <HomePage heading='Enjoy your trip!' message='Realize a viagem do seu sonho!'/>
      <div className="md:justify-center sm:justify-center">  
      <h1 className="">Galeria de imagens em breve.</h1>
      </div>
    </>
  )
}