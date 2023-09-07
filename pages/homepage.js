import { SliderData } from "../src/components/slider/sliderData.js";
import Slider from "../src/components/slider/slider.js"; 
import HomePage from "../src/components/homePage/homePage.js";

export default function Index() {
  return (
    <>
      <HomePage heading='Fullvision Tracking' message='Gestão de operação logística e segurança da frota.'/>
      <div className="md:justify-center sm:justify-center">  
        <Slider slides={SliderData} />
      </div>
    </>
  )
}