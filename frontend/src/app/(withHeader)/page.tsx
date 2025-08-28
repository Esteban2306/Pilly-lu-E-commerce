import Image from "next/image";
import Link from "next/link";
import faceImageOne from '../../../public/images/home/gridHeroOne.jpg'
import faceImageThree from '../../../public/images/home/gridHeroThree.png'
import earrings from '../../../public/images/home/earrings.jpg'
import rings from '../../../public/images/home/ringshome.jpg'
import dijes from '../../../public/images/home/favDijes.png'
import ButtonRedirectProduct from "@/components/buttons/buttonRedirectProducts/buttonRedirectProduct";
import ButtonGlowingBorder from "@/components/buttons/buttonGlowingBorder/buttonGlowingBorder";
import localUbicationOne from '../../../public/images/home/localUbication.jpg'
import ProductGallery from "@/components/product/productGallery/productGallery";
import SliderProduct from "@/components/product/sliderProduct/sliderProduct";
import AnimateInspirationalText from "@/components/animates/home/animateInspirationalText";

export default function Home() {
  return (
    <main className="bg-white mt-12">
      <section className="w-[95%] m-auto pt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[80vh] lg:h-[800px]">
          <Image
            src={faceImageOne}
            alt="Mujer sonriendo con joyas Pilly Lu"
            fill
            className="object-cover rounded-lg"
            priority
          />
          <span className="font-bold absolute bottom-6 left-1/2 -translate-x-1/2 text-black w-full max-w-md text-center text-base sm:text-lg md:text-xl z-10 px-2 sm:px-4 py-1 sm:py-2 rounded-md">
            Más que joyas, reflejos de tu alma.
          </span>
        </div>

        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[80vh] lg:h-[800px]">
          <Image
            src={faceImageThree}
            alt="Modelo usando collar dorado"
            fill
            className="object-cover rounded-lg"
            priority
          />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md text-black text-center text-base sm:text-lg md:text-xl font-semibold z-10 px-2 sm:px-4 py-1 sm:py-2 rounded-md">
            Porque cada mujer merece brillar
          </span>
        </div>
      </section>

      <section className="text-center max-w-lg mx-auto px-4 py-6 mt-6">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Joyas que susurran amor propio
        </h2>
        <Link href={'/products'}>
          <ButtonGlowingBorder text="Descubre más" />
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 m-auto w-[95%]">
        <div className="relative md:col-span-2 h-[300px] sm:h-[500px] md:h-[700px] lg:h-[900px]">
          <Image
            src={rings}
            alt="anillos dorados sobre fondo claro"
            fill
            className="object-cover rounded-lg"
          />
          <span className="absolute bottom-16 left-1/2 md:left-[140px] -translate-x-1/2 md:translate-x-0 text-black w-full max-w-xs sm:max-w-md text-center md:text-start text-lg sm:text-xl md:text-2xl font-semibold z-10 px-2 sm:px-4 py-1 sm:py-2 rounded-md">
            <Link href='/products' className="relative after:content-[''] after:block after:border-b-2 after:border-black after:w-[80%] after:mx-auto md:after:mx-0">
              Nuevas colecciones.
            </Link >
          </span>
          <span className="font-[var(--font-plus-jakarta)] absolute bottom-6 left-1/2 md:left-[165px] -translate-x-1/2 md:translate-x-0 text-black w-full max-w-xs sm:max-w-md text-center text-sm sm:text-base md:text-lg z-10 px-2 sm:px-4 py-1 sm:py-2 rounded-md">
            Descubre el detalle que transforma tu esencia.
          </span>
        </div>

        <div className="grid grid-rows-2 gap-4 h-[600px] sm:h-[700px] md:h-[900px]">
          <div className="relative h-full">
            <Image
              src={dijes}
              alt="Anillos en caja de exhibición"
              fill
              className="object-cover rounded-lg"
            />
            <span className="absolute top-4 left-1/2 md:left-[50px] -translate-x-1/2 md:translate-x-0 text-black w-full text-center md:text-start text-lg sm:text-xl md:text-2xl font-semibold z-10 px-2 sm:px-4 py-1 sm:py-2 rounded-md">
              <Link href='/products' className="relative after:content-[''] after:block after:border-b-2 after:border-black after:w-[60%] sm:after:w-[80%] after:mx-auto md:after:mx-0">
                Dijes.
              </Link >
            </span>
            <span className="font-[var(--font-plus-jakarta)] absolute top-16 left-1/2 md:left-[110px] -translate-x-1/2 md:translate-x-0 text-black text-sm sm:text-base max-w-xs text-center md:text-start z-10 px-2 sm:px-4 py-1 sm:py-2 rounded-md">
              Cada pieza, una parte de ti.
            </span>
          </div>
          <div className="relative h-full">
            <Image
              src={earrings}
              alt="Anillos dorados sobre fondo claro"
              fill
              className="object-cover rounded-lg"
            />
            <span className="absolute top-4 left-1/2 md:left-[110px] -translate-x-1/2 md:translate-x-0 inline-block text-black text-lg sm:text-xl md:text-2xl font-bold z-10 px-2 sm:px-4 py-1 sm:py-2 rounded-md">
              <Link href="/products" className="relative after:content-[''] after:block after:border-b-2 after:border-black after:w-[60%] sm:after:w-[80%] after:mx-auto md:after:mx-0">
                Aretes.
              </Link>
            </span>
            <span className="font-[var(--font-plus-jakarta)] absolute top-16 left-1/2 md:left-[110px] -translate-x-1/2 md:translate-x-0 text-black text-sm sm:text-base max-w-xs text-center md:text-start z-10 px-2 sm:px-4 py-1 sm:py-2 rounded-md">
              Luce tu poder con elegancia.
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 text-center">
        <AnimateInspirationalText />
        <footer className="font-[var(--font-plus-jakarta)] mt-4 text-xl sm:text-2xl">— Pilly Lu</footer>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <SliderProduct />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center" id="ubication">Locales</h2>
        <div className="relative max-w-full sm:max-w-md w-full h-[300px] sm:h-[400px] md:h-[500px] m-auto">
          <Image
            src={localUbicationOne}
            alt="Interior de la tienda Pilly Lu"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="mt-4 text-center max-w-sm m-auto">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Tienda Bulevar</h3>
          <p className="font-[var(--font-plus-jakarta)] text-sm sm:text-base md:text-lg">
            Centro Comercial Bulevar <br />
            Ak. 58 #127-59, Bogotá <br />
            Lunes a viernes 10 am - 8pm <br />
            Sabados y Domingos 11 am - 8pm <br />
            Watsapp Bulevar Store <br />
            +57 315 4545 4545
          </p>
        </div>
      </section>
    </main>
  );
}