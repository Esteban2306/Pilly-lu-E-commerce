import Image from "next/image";
import Link from "next/link";
import faceImageOne from '../../public/images/home/gridHeroOne.jpg'
import faceImageThree from '../../public/images/home/gridHeroThree.png'
import earrings from '../../public/images/home/earrings.jpg'
import rings from '../../public/images/home/gridHeroFourth.png'
import dijes from '../../public/images/home/favDijes.png'
import ButtonRedirectProduct from "@/components/buttons/buttonRedirectProducts/buttonRedirectProduct";
import localUbicationOne from '../../public/images/home/localUbication.jpg'
import ProductGallery from "@/components/product/productGallery/productGallery";

export default function Home() {
  return (
    <main className="bg-[#F5F5F5]">
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">

        <div className="relative w-full h-[800px] ">
          <Image
            src={faceImageOne}
            alt="Mujer sonriendo con joyas Pilly Lu"
            fill
            className="object-cover rounded-br-lg"
            priority
          />
          <span className="absolute bottom-21 left-1/2 -translate-x-1/2 text-black max-w-4xl  w-full text-center text-[20px] font-semibold z-10  px-4 py-2 rounded-md">
            Más que joyas, reflejos de tu alma.
          </span>
        </div>

        <div className="relative w-full h-[800px]">
          <Image
            src={faceImageThree}
            alt="Modelo usando collar dorado"
            fill
            className="object-cover rounded-bl-lg"
            priority
          />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-4xl  w-full text-black text-center text-[20px] font-semibold z-10 px-4 py-2 rounded-md">
            Porque cada mujer merece brillar
          </span>
        </div>
      </section>

      <section className="text-center max-w-2xl mx-auto px-4 py-6 mt-6">
        <h2 className="text-3xl font-bold">
          Joyas que susurran amor propio
        </h2>
        <ButtonRedirectProduct />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-6 h-[1000px]">
        <div className="relative md:col-span-2 ">
          <Image
            src={rings}
            alt="anillos dorados sobre fondo claro"
            fill
            className="object-center rounded-lg object-fill "
          />
          <span className="absolute border-b-black bottom-17 left-[140px] -translate-x-1/2 text-black max-w-[280px]  w-full text-start text-[24px] font-semibold z-10  px-4 py-2 rounded-md ">
            <Link href='/products' className="relative after:content-[''] after:block after:border-b-2 after:border-black after:w-[80%] after:mx-px">
              Nuevas colecciones.
            </Link >
          </span>
          <span className="absolute bottom-10 left-[200px] -translate-x-1/2 text-black max-w-[500px]  w-full text-center text-[16px] font-semibold z-10  px-4 py-2 rounded-md">
            Descubre el detalle que transforma tu esencia.
          </span>
        </div>

        <div className="grid grid-rows-2 gap-2">
          <div className="relative">
            <Image
              src={dijes}
              alt="Anillos en caja de exhibición"
              fill
              className="object-center object-cover rounded-lg"
            />
            <span className="absolute border-b-black top-2 left-[50px] -translate-x-1/2 text-black max-w-full text-center text-[24px] font-semibold z-10  px-4 py-2 rounded-md ">
              <Link href='/products' className="relative after:content-[''] after:block after:border-b-2 after:border-black after:w-[80%] after:mx-px">
                Dijes.
              </Link >
            </span>
            <span className="absolute top-12 left-[122px] -translate-x-1/2 text-black max-w-full text-center text-[16px] font-semibold z-10  px-4 py-2 rounded-md">
              Cada pieza, una parte de ti.
            </span>
          </div>
          <div className="relative">
            <Image
              src={earrings}
              alt="Anillos dorados sobre fondo claro"
              fill
              className="object-cover rounded-lg"
            />
            <span className="relative inline-block text-black text-[24px] font-bold z-10 px-4 py-2 rounded-md">
              <Link href="/products" className="relative after:content-[''] after:block after:border-b-2 after:border-black after:w-[80%] after:mx-px">
                Aretes.
              </Link>
            </span>

            <span className="absolute top-10 left-[132px] -translate-x-1/2 text-black max-w-full text-center text-[16px] max-h-[40px] h-full font-semibold z-10 px-4 py-2 rounded-md">
              Luce tu poder con elegancia.
            </span>
          </div>
        </div>
      </section>


      <section className="bg-white py-12 px-4 text-center">
        <blockquote className="max-w-3xl mx-auto text-4xl md:text-4xl italic font-semibold">
          "Más que adornos, nuestras joyas son testigos de tu camino, tus emociones y tu autenticidad."
        </blockquote>
        <footer className="mt-4 font-semibold text-2xl">— Pilly Lu</footer>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold mb-6 text-center">Productos</h2>
        <div className=" 
                    grid 
                    justify-center 
                    gap-4 
                    mt-20 mb-18
                    [grid-template-columns:repeat(1,280px)]
                    sm:[grid-template-columns:repeat(2,280px)]
                    lg:[grid-template-columns:repeat(3,280px)]">
          <ProductGallery />
          <ProductGallery />
          <ProductGallery />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold mb-6 text-center">Locales</h2>
        <div className="">
          <div className="relative  max-w-80 w-full h-[500px] m-auto">
            <Image
              src={localUbicationOne}
              alt="Interior de la tienda Pilly Lu"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="mt-4 text-center max-w-[300px] m-auto ">
            <h3 className="text-[24px] font-bold">Tienda Bulevar</h3>
            <p className="text-[18px] font-semibold">Centro Comercial Bulevar <br />
              Ak. 58 #127-59, Bogotá <br />
              Lunes a viernes 10 am - 8pm <br />
              Sabados y Domingos 11 am - 8pm <br />
              Watsapp Bulevar Store <br />
              +57 315 4545 4545
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
