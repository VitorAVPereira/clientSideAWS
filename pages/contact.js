import { SliderData } from "../src/components/slider/sliderData.js";
import Slider from "../src/components/slider/slider.js"; 
import HomePage from "../src/components/homePage/homePage.js";
import { useEffect } from 'react'; // Importe useEffect
import { useAuth } from '../src/context/AuthContext.js';
import { useRouter } from 'next/router';

export default function Contact() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return (
    <>
      <HomePage heading='Em breve form de contato! :)' message='Realize a viagem do seu sonho!'/>
      <div className="md:justify-center sm:justify-center">  
        <Slider slides={SliderData} />
      </div>
    </>
  )
}