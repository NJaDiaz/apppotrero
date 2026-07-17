'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, MapPin, Clock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import BottomNav from '@/components/shared/BottomNav'
import PageHeader from '@/components/shared/PageHeader'
import type { Event } from '@/types'

export default function EventosPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    supabase.from('events').select('*').eq('is_active', true)
      .gte('starts_at', new Date().toISOString())
      .order('starts_at', { ascending: true })
      .then(({ data }) => { setEvents(data || []); setLoading(false) })
  }, [])

  return (
<div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 pb-24">
        <PageHeader title="Eventos" backHref="/app" />

      <div className="max-w-lg mx-auto px-4 py-5 space-y-4">
        {loading ? (
          Array(3).fill(0).map((_, i) => <div key={i} className="h-40 bg-gray-100 rounded-2xl skeleton" />)
        ) : events.length === 0 ? (
          <div className="text-center py-16">
            <CalendarDays className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <h3 className="font-bold text-gray-600">Sin eventos próximos</h3>
            <p className="text-sm text-gray-400 mt-1">Volvé pronto para ver novedades</p>
          </div>
        ) : (
          events.map(event => {
            const date = new Date(event.starts_at)
            return (
              <Link key={event.id} href={`/eventos/${event.id}`} className="block group">
  <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

    {event.image_url ? (
      <div className="relative h-56 overflow-hidden">

        <Image
          src={event.image_url}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Fecha */}

        <div className="absolute left-4 top-4 rounded-2xl bg-white/90 backdrop-blur-md px-3 py-2 shadow-lg">
          <div className="text-center leading-none">
            <p className="text-2xl font-black text-brand-600">
              {date.getDate()}
            </p>
            <p className="text-[11px] uppercase tracking-wider font-bold text-gray-600">
              {date.toLocaleDateString('es-AR', {
                month: 'short'
              })}
            </p>
          </div>
        </div>

        {/* Precio */}

        {event.is_free ? (
          <div className="absolute right-4 top-4 rounded-full bg-emerald-500/95 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-white shadow-lg">
            GRATIS
          </div>
        ) : event.price ? (
          <div className="absolute right-4 top-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 text-xs font-bold shadow-lg">
            ${event.price}
          </div>
        ) : null}

        {/* Título */}

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h2 className="text-xl font-black text-white drop-shadow-lg">
            {event.title}
          </h2>
        </div>

      </div>
    ) : (
      <div className="bg-gradient-to-r from-brand-500 to-orange-500 p-6 text-white">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-white/20 px-4 py-3 text-center backdrop-blur">

            <p className="text-3xl font-black">
              {date.getDate()}
            </p>

            <p className="text-xs uppercase tracking-wider">
              {date.toLocaleDateString('es-AR', {
                month: 'short'
              })}
            </p>

          </div>

          <div>

            <h2 className="text-xl font-black">
              {event.title}
            </h2>

            <p className="text-sm text-white/80">
              {event.location}
            </p>

          </div>

        </div>

      </div>
    )}

    <div className="space-y-4 p-5">

      <p className="line-clamp-2 text-sm leading-6 text-gray-600">
        {event.description}
      </p>

      <div className="flex flex-wrap gap-2">

        <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700">

          <MapPin className="h-4 w-4 text-brand-500" />

          {event.location}

        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700">

          <Clock className="h-4 w-4 text-brand-500" />

          {date.toLocaleTimeString('es-AR', {
            hour: '2-digit',
            minute: '2-digit'
          })}

          hs

        </div>

      </div>

    </div>

  </article>
</Link>
            )
          })
        )}
      </div>

      <BottomNav />
    </div>
  )
}
