import { Link } from "react-router-dom"
// 1. Impo=rting all images to use in carousal
import hero1 from "../assets/hero1.webp"
import hero2 from "../assets/hero2.webp"
import hero3 from "../assets/hero3.webp"
import hero4 from "../assets/hero4.webp"

const Hero = () => {
  // 3. Storing all carousel images into variable
  const carouseImages = [hero1, hero2, hero3, hero4]

  return (
    <div className="grid lg:grid-cols-2 gap-24 items-center">
      {/* INTO DISPLAY */}
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-light sm:text-6xl ">
          we are changing the way people shop
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
          reprehenderit eos quia, nemo vero dolores accusantium sit ducimus
          accusamus quasi?
        </p>
        <div className="mt-10 ">
          <Link to="/products" className="btn btn-primary ">
            Our Products
          </Link>
        </div>
      </div>
      {/* CAROUSAL DISPLAY - NOT VISIBLE ON SMALL SCREEN */}
      {/* 2. Creating a parent carousel container */}
      <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neural rounded-box ">
        {/* 4. Iterating over all images */}
        {carouseImages.map((img) => {
          return (
            <div key={img} className="carousel-item">
              <img src={img} className="rounded-box h-full w-80 object-cover" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Hero
