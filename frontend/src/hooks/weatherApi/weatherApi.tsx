'use client'

import { useEffect, useState } from "react";

type WeatherData = {
    temperature: number,
    windSpeed: number,
    weatherCode: number
}

export function useWeatherApi() {
    const [Weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Localizacion no soportada')
            setLoading(false)
            return
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const { latitude, longitude } = pos.coords
                    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weathercode`

                    const res = await fetch(url)
                    const data = await res.json()

                    setWeather({
                        temperature: data.current.temperature_2m,
                        windSpeed: data.current.wind_speed_10m,
                        weatherCode: data.current.weathercode
                    })
                } catch (err) {
                    setError('Error al obtener el clima')
                } finally {
                    setLoading(false)
                }
            },
            () => {
                setError('No se pudo obtener tu ubicacion')
                setLoading(false)
            }
        )
    }, [])

    return { Weather, error, loading }
}