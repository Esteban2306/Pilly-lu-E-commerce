
import sun from "../../../public/icons/iconsWeather/iconSun.png"
import partlyCloudy from "../../../public/icons/iconsWeather/iconPartlyCloudy.png"
import rain from "../../../public/icons/iconsWeather/iconRain.png"
import winter from "../../../public/icons/iconsWeather/iconWinter.png"
import storm from "../../../public/icons/iconsWeather/iconStorm.png"
import fog from "../../../public/icons/iconsWeather/iconFog.png"

import { StaticImageData } from "next/image"

export default function getWeatherIcon(code: number): StaticImageData {
    if (code === 0) return sun
    if ([1, 2, 3].includes(code)) return partlyCloudy
    if ([45, 48].includes(code)) return fog
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return rain
    if ([71, 73, 75, 77, 85, 86].includes(code)) return winter
    if ([95, 96, 99].includes(code)) return storm

    return sun
}