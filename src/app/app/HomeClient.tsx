'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, SlidersHorizontal, ChevronRight, Star, Clock, MapPin, CalendarDays, Map, Newspaper } from 'lucide-react'
import BottomNav from '@/components/shared/BottomNav'
import BusinessCard from '@/components/business/BusinessCard'
import PlacesCarousel from '@/components/places/PlacesCarousel'
import Logo from '@/components/shared/Logo'
import { CATEGORIES } from '@/types'
import type { Business, Event, Place } from '@/types'
import BackToLanding from '@/components/shared/BackToLanding'

interface Props {
  businesses: Business[]
  events: Event[]
  banners: any[]
  places: Place[]
}



export default function HomeClient({ businesses, events, banners, places }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [bannerIdx, setBannerIdx]     = useState(0)
  const router = useRouter()

  const featured = businesses.filter(b => b.is_featured).slice(0, 6)
  const all      = businesses.slice(0, 8)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) router.push(`/buscar?q=${encodeURIComponent(searchQuery)}`)
  }

  useEffect(() => {
  if (banners.length <= 1) return

  const interval = setInterval(() => {
    setBannerIdx((prev) => (prev + 1) % banners.length)
  }, 9000)

  return () => clearInterval(interval)
}, [banners.length])




  return (
    
    <div className="min-h-screen bg-gray-50 pb-24">
      <BackToLanding />
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
          <Logo size="md" href="/landing" />
          <Link href="/novedades"
            className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100">
            <Newspaper className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full" />
          </Link>
        </div>
      </header>

      <div className="relative">
        <div className="relative h-64 overflow-hidden">
  {banners.length > 0 ? (
    banners.map((banner, index) => (
      <Image
        key={banner.id ?? index}
        src={banner.image_url}
        alt={`Banner ${index + 1}`}
        fill
        priority={index === 0}
        sizes="100vw"
        className={`
          object-cover
          transition-opacity
          duration-1000
          ease-in-out
          absolute inset-0
          ${index === bannerIdx ? 'opacity-100' : 'opacity-0'}
        `}
      />
    ))
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-brand-500 to-orange-400" />
  )}

  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-black/70" />

  <div className="absolute bottom-0 left-0 right-0 p-5">
    <p className="text-white/75 text-sm font-medium mb-0.5">
      Cámara de Comercio, Turismo y Afines
    </p>

    <h1 className="font-display font-black text-white text-2xl leading-tight">
      Potrero de los Funes
    </h1>

    <p className="text-white/90 text-sm md:text-lg font-light pb-2">
      Descubrí dónde hospedarte, comer y qué hacer hoy.
    </p>
  </div>

  {banners.length > 1 && (
    <div className="absolute bottom-4 right-4 flex gap-1.5">
      {banners.map((_, i) => (
        <button
          key={i}
          onClick={() => setBannerIdx(i)}
          className={`
            rounded-full
            transition-all
            duration-300
            ${
              i === bannerIdx
                ? 'w-5 h-1.5 bg-white'
                : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/70'
            }
          `}
        />
      ))}
    </div>
  )}
</div>

        <div className="px-4 -mt-5 relative z-10">
          <form onSubmit={handleSearch}
            className="flex items-center gap-2 bg-white rounded-2xl shadow-xl
border border-gray-100 px-4 py-3">
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="¿Qué estás buscando?"
              className="flex-1 text-gray-800 placeholder-gray-400 text-sm bg-transparent outline-none"
            />
            <button type="button" onClick={() => router.push('/buscar')}
              className="w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>
      </div>

      <div className="px-4 mt-6 space-y-8 max-w-lg mx-auto">


        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-bold text-gray-900 text-base">Categorías</h2>
            <Link href="/buscar" className="text-brand-500 text-xs font-bold flex items-center gap-0.5">
              Ver todas <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {CATEGORIES.map(cat => (
              <Link key={cat.key} href={`/categoria/${cat.key}`}
                className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg md:shadow-sm hover:scale-105
hover:shadow-lg"
                  style={{ background: cat.bgColor }}>
                  {cat.icon}
                </div>
                <span className="text-[11px] font-semibold text-gray-600 whitespace-nowrap">{cat.label}</span>
              </Link>
            ))}
          </div>
        </section>

        
<Link href="/mapa" className="block">
  <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-brand-500 via-brand-500 to-brand-400 p-6 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-brand">

    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
    <div className="absolute -bottom-16 left-0 h-32 w-32 rounded-full bg-white/5" />

    <div className="relative flex items-center gap-5">

      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm">

        <Map className="h-8 w-8 text-white" />

      </div>

      <div className="flex-1">

        <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
          MAPA INTERACTIVO
        </p>

        <h3 className="mt-1 font-display text-2xl font-black text-white">
          Explorá Potrero
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-white/80">
          Encontrá comercios, gastronomía, alojamientos y lugares cerca tuyo.
        </p>

      </div>

      <ChevronRight className="h-7 w-7 text-white/80" />

    </div>

  </div>
</Link>
  
        <PlacesCarousel places={places} />

        {featured.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display font-bold text-gray-900 text-base">Destacados</h2>
              <Link href="/buscar" className="text-brand-500 text-xs font-bold flex items-center gap-0.5">
                Ver todos <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
              {featured.map(b => <BusinessCard key={b.id} business={b} variant="featured" />)}
            </div>
          </section>
        )}

       {/* Eventos */}
{events.length > 0 && (
  <section>
    <div className="mb-5 flex items-end justify-between">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-gray-900">
          Próximos eventos
        </h2>

        <p className="mt-1 max-w-xs text-sm leading-6 text-gray-500">
          Descubrí festivales, espectáculos y actividades para disfrutar en Potrero de los Funes.
        </p>
      </div>
    </div>

    <div className="space-y-5">
      {events.slice(0, 3).map((event) => {
        const date = new Date(event.starts_at)

        return (
          <Link
            key={event.id}
            href={`/eventos/${event.id}`}
            className="group block"
          >
            <article className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="relative aspect-[16/9] overflow-hidden">

                {event.image_url ? (
                  <Image
                    src={event.image_url}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-500 to-orange-500">
                    <CalendarDays className="h-12 w-12 text-white/70" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Fecha */}
                <div className="absolute left-4 top-4 rounded-2xl bg-white/90 px-3 py-2 backdrop-blur-md shadow-lg">
                  <p className="text-center text-2xl font-black leading-none text-brand-600">
                    {date.getDate()}
                  </p>

                  <p className="text-center text-[10px] font-bold uppercase tracking-wide text-gray-600">
                    {date.toLocaleDateString("es-AR", {
                      month: "short",
                    })}
                  </p>
                </div>

                {/* Precio / Gratis */}
                {event.is_free ? (
                  <div className="absolute right-4 top-4 rounded-full bg-emerald-500/95 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur">
                     GRATIS
                  </div>
                ) : event.price ? (
                  <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-gray-900 shadow-lg backdrop-blur">
                    ${event.price}
                  </div>
                ) : null}

                {/* Contenido */}
                <div className="absolute bottom-0 left-0 right-0 p-5">

                  <h3 className="line-clamp-2 text-xl font-black leading-tight text-white drop-shadow-lg">
                    {event.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center gap-2">

                    <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-sm text-white backdrop-blur-md">

                      <MapPin className="h-4 w-4 flex-shrink-0" />

                      <span className="truncate">
                        {event.location}
                      </span>

                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-sm text-white backdrop-blur-md">

                      <Clock className="h-4 w-4 flex-shrink-0" />

                      {date.toLocaleTimeString("es-AR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}

                    </div>

                  </div>

                </div>

              </div>

            </article>
          </Link>
        )
      })}
    </div>
  </section>
)}

{/* Comercios */}

<section>

  <div className="mb-5">
    

    <div className="flex items-center justify-between mb-2">
            <h2 className="font-display font-bold text-gray-900 text-xl">Todos los comercios</h2>
            <Link href="/buscar" className="text-brand-500 text-xs font-bold flex items-center gap-0.5">
              Ver todos <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

    <p className="mt-1 text-sm text-gray-500">
      Descubrí negocios locales recomendados.
    </p>
    

  </div>

  <div className="space-y-4">

    {all.map((b) => (
      <div
        key={b.id}
        className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <BusinessCard
          business={b}
          variant="horizontal"
        />
      </div>
    ))}

  </div>

  <div className="my-8 flex justify-center">

    <Link
      href="/buscar"
      className="rounded-2xl border border-brand-200 bg-white px-6 py-3 font-semibold text-brand-600 shadow-sm transition-all duration-300 hover:border-brand-500 hover:bg-brand-500 hover:text-white hover:shadow-lg"
    >
      Ver todos los comercios
    </Link>

  </div>

</section>
      </div>

      <BottomNav />
    </div>
  )
}
