import Image from "next/image";
import Link from "next/link";
import faceImageOne from '../../../public/images/home/gridHeroOne.jpg'
import faceImageThree from '../../../public/images/home/gridHeroThree.png'
import ButtonGlowingBorder from "@/components/buttons/buttonGlowingBorder/buttonGlowingBorder";
import localUbicationOne from '../../../public/images/home/localUbication.jpg'
import SliderProduct from "@/components/product/sliderProduct/sliderProduct";
import AnimateInspirationalText from "@/components/animates/home/animateInspirationalText";
import ShowcaseFocusSection from "@/components/animates/home/ShowcaseFocusSection";

export default function HomePageClient() {
    return (
        <main className="bg-white mt-12">
            <section className="w-[95%] m-auto pt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[80vh] lg:h-[540px]">
                    <Image
                        src={faceImageOne}
                        alt="Mujer sonriendo con joyas Pilly Lu"
                        fill
                        className="object-cover rounded-lg"
                        priority
                    />
                    <span className="font-bold absolute bg-blue-200/80 bottom-16 left-1/2 -translate-x-1/2 text-black w-full max-w-[380px] text-center text-base sm:text-lg md:text-[20px] z-10 px-2 sm:px-4 py-1 sm:py-2 rounded-md">
                        Más que joyas, reflejos de tu alma.
                    </span>
                </div>

                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[80vh] lg:h-[540px]">
                    <Image
                        src={faceImageThree}
                        alt="Modelo usando collar dorado"
                        fill
                        className="object-cover rounded-lg"
                        priority
                    />
                    <span className="font-bold absolute bg-blue-200/80 bottom-16 left-1/2 -translate-x-1/2 text-black w-full max-w-[380px] text-center text-base sm:text-lg md:text-[20px] z-10 px-2 sm:px-4 py-1 sm:py-2 rounded-md">
                        Porque cada mujer merece brillar
                    </span>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 ">
                <SliderProduct />
            </section>


            <section className="text-center max-w-lg mx-auto px-4 py-4 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold pb-4">
                    Joyas que susurran amor propio
                </h2>
                <Link href={'/products'}>
                    <ButtonGlowingBorder text="Descubre más" />
                </Link>
            </section>

            <ShowcaseFocusSection />

            <section className="py-12 px-4 text-center">
                <AnimateInspirationalText />
                <footer className="font-[var(--font-plus-jakarta)] mt-4 text-xl sm:text-2xl">— Pilly Lu</footer>
            </section>



            <section className="max-w-5xl mx-auto px-4 py-8">
                <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-center"
                    id="ubication"
                >
                    Locales
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="relative w-[300px] h-[300px] sm:h-[400px] md:h-[500px] mx-auto">
                            <Image
                                src={localUbicationOne}
                                alt="Interior de la tienda Pilly Lu"
                                fill
                                className="object-cover rounded-lg shadow-lg"
                            />
                        </div>

                        <div className="max-w-[300px] ">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                                Tienda Bulevar
                            </h3>
                            <p className="font-[var(--font-plus-jakarta)] text-sm sm:text-base md:text-lg mt-2">
                                Centro Comercial Bulevar <br />
                                Ak. 58 #127-59, Bogotá <br />
                                Lunes a viernes 10 am - 8pm <br />
                                Sábados y Domingos 11 am - 8pm <br />
                                Whatsapp Bulevar Store <br />
                                +57 315 4545 4545
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col w-full space-y-2">
                        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d497.04109288831194!2d-74.07188423531011!3d4.712839807957735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sco!4v1756420151605!5m2!1ses-419!2sco"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}