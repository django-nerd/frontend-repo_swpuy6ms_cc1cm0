import { useState } from 'react'

export const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export function Hero({ event }) {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 via-white to-amber-100" />
      <div className="absolute inset-0 -z-10 opacity-10" style={{backgroundImage:'radial-gradient(circle at 20% 20%, #F59E0B 0, transparent 40%), radial-gradient(circle at 80% 0%, #111827 0, transparent 35%)'}}/>
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="inline-flex items-center gap-2 bg-white/70 backdrop-blur rounded-full px-3 py-1 text-xs border border-amber-200 text-amber-700">Community Day • 2025</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
            {event?.title || 'AWS Student Community Day 2025'}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl">
            {event?.tagline || 'Learn. Build. Network.'}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-700">
            <span className="inline-flex items-center gap-2 bg-white/70 px-3 py-1 rounded-full border"><span>📅</span> {event?.date || 'Feb 2025'}</span>
            <span className="inline-flex items-center gap-2 bg-white/70 px-3 py-1 rounded-full border"><span>⏰</span> {event?.start_time} – {event?.end_time}</span>
            <span className="inline-flex items-center gap-2 bg-white/70 px-3 py-1 rounded-full border"><span>📍</span> {event?.venue}</span>
          </div>
          <div className="mt-8 flex gap-4">
            <a href="/register" className="rounded-lg bg-amber-500 text-white px-6 py-3 font-semibold shadow hover:bg-amber-600 transition">Grab your seat</a>
            <a href="/agenda" className="rounded-lg bg-white text-gray-900 px-6 py-3 font-semibold border hover:bg-gray-50 transition">View agenda</a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl bg-white shadow-xl border overflow-hidden">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop" alt="Event" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-black text-white rounded-xl px-4 py-3 shadow-lg">
            <div className="text-sm">Organized by</div>
            <div className="font-semibold">AWS Cloud Club • Silver Oak University</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      {eyebrow && <div className="text-amber-600 font-semibold tracking-wide uppercase text-xs">{eyebrow}</div>}
      <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="mt-3 text-gray-600">{subtitle}</p>}
    </div>
  )
}

export function SpeakerCard({ s }) {
  return (
    <div className="group p-5 rounded-xl border bg-white hover:shadow-lg transition">
      <div className="flex items-center gap-4">
        <img src={s.photo_url || 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(s.name)} alt={s.name} className="h-14 w-14 rounded-full object-cover"/>
        <div>
          <div className="font-semibold text-gray-900">{s.name}</div>
          <div className="text-sm text-gray-600">{s.title}{s.company ? ` • ${s.company}` : ''}</div>
        </div>
      </div>
      {s.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {s.tags.map((t, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{t}</span>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function ScheduleItem({ item }) {
  return (
    <div className="p-4 rounded-xl border bg-white hover:bg-gray-50 transition">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">{item.start} – {item.end}</div>
          <div className="font-semibold text-gray-900">{item.title}</div>
          {item.speaker && <div className="text-sm text-gray-600">{item.speaker}</div>}
        </div>
        {item.track && <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{item.track}</div>}
      </div>
    </div>
  )
}

export function SponsorLogo({ sp }) {
  return (
    <a href={sp.website || '#'} className="p-4 rounded-xl border bg-white hover:shadow-md transition flex items-center justify-center">
      <img src={sp.logo_url || 'https://dummyimage.com/140x60/efefef/aaa'} alt={sp.name} className="max-h-10 w-auto"/>
    </a>
  )
}

export function RegistrationForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', institute: '', year: '', interests: [] })
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Submitting...')
    try {
      const res = await fetch(`${API_BASE}/api/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, consent: true }) })
      const data = await res.json()
      if (res.ok) setStatus('Registration received! Check your email for updates.')
      else setStatus(data?.detail || 'Something went wrong')
    } catch (err) {
      setStatus('Network error')
    }
  }

  const toggleInterest = (v) => {
    setForm((prev) => {
      const has = prev.interests.includes(v)
      return { ...prev, interests: has ? prev.interests.filter(i => i !== v) : [...prev.interests, v] }
    })
  }

  const interests = ['AI/ML', 'Cloud Native', 'Serverless', 'Data/Analytics', 'Security', 'DevOps']

  return (
    <form onSubmit={submit} className="mt-10 grid lg:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border">
      <div className="grid gap-4">
        <input className="input" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        <input className="input" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
        <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
        <input className="input" placeholder="Institute" value={form.institute} onChange={e=>setForm({...form,institute:e.target.value})} />
        <input className="input" placeholder="Year" value={form.year} onChange={e=>setForm({...form,year:e.target.value})} />
      </div>
      <div className="grid gap-4">
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">Areas of interest</div>
          <div className="flex flex-wrap gap-2">
            {interests.map((i) => (
              <button type="button" key={i} onClick={() => toggleInterest(i)} className={`px-3 py-1 rounded-full border ${form.interests.includes(i) ? 'bg-amber-500 text-white border-amber-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>{i}</button>
            ))}
          </div>
        </div>
        <button type="submit" className="rounded-lg bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition">Submit registration</button>
        {status && <div className="text-sm text-gray-700">{status}</div>}
      </div>
    </form>
  )
}
