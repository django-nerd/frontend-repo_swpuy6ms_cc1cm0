import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Hero({ event }) {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 via-white to-amber-100" />
      <div className="absolute inset-0 -z-10 opacity-10" style={{backgroundImage:'radial-gradient(circle at 20% 20%, #F59E0B 0, transparent 40%), radial-gradient(circle at 80% 0%, #111827 0, transparent 35%)'}}/>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <img src="https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png" alt="AWS" className="h-8 w-auto"/>
          <div className="h-6 w-px bg-gray-300"/>
          <span className="font-semibold text-gray-800">AWS Cloud Club • Silver Oak University</span>
        </div>
        <a href="#register" className="rounded-full bg-black text-white px-5 py-2 text-sm font-medium hover:bg-gray-800 transition">Register</a>
      </nav>
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="inline-flex items-center gap-2 bg-white/70 backdrop-blur rounded-full px-3 py-1 text-xs border border-amber-200 text-amber-700">Community Day • 2025</p>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
            {event?.title || 'AWS Student Community Day 2025'}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl">
            {event?.tagline || 'Learn. Build. Network.'}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-gray-700">
            <span className="inline-flex items-center gap-2 bg-white/70 px-3 py-1 rounded-full border"><span className="i">📅</span> {event?.date || 'Feb 2025'}</span>
            <span className="inline-flex items-center gap-2 bg-white/70 px-3 py-1 rounded-full border"><span className="i">⏰</span> {event?.start_time} – {event?.end_time}</span>
            <span className="inline-flex items-center gap-2 bg-white/70 px-3 py-1 rounded-full border"><span className="i">📍</span> {event?.venue}</span>
          </div>
          <div className="mt-8 flex gap-4">
            <a href="#register" className="rounded-lg bg-amber-500 text-white px-6 py-3 font-semibold shadow hover:bg-amber-600 transition">Grab your seat</a>
            <a href="#agenda" className="rounded-lg bg-white text-gray-900 px-6 py-3 font-semibold border hover:bg-gray-50 transition">View agenda</a>
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

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      {eyebrow && <div className="text-amber-600 font-semibold tracking-wide uppercase text-xs">{eyebrow}</div>}
      <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="mt-3 text-gray-600">{subtitle}</p>}
    </div>
  )
}

function SpeakerCard({ s }) {
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

function ScheduleItem({ item }) {
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

function SponsorLogo({ sp }) {
  return (
    <a href={sp.website || '#'} className="p-4 rounded-xl border bg-white hover:shadow-md transition flex items-center justify-center">
      <img src={sp.logo_url || 'https://dummyimage.com/140x60/efefef/aaa'} alt={sp.name} className="max-h-10 w-auto"/>
    </a>
  )
}

function RegistrationForm() {
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
    <section id="register" className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle eyebrow="Join" title="Register now" subtitle="Limited seats available. Free community event." />
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
      </div>
    </section>
  )
}

function App() {
  const [event, setEvent] = useState(null)
  const [speakers, setSpeakers] = useState([])
  const [schedule, setSchedule] = useState([])
  const [sponsors, setSponsors] = useState([])

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [e, sp, sc, so] = await Promise.all([
          fetch(`${API_BASE}/api/event`).then(r=>r.json()),
          fetch(`${API_BASE}/api/speakers`).then(r=>r.json()),
          fetch(`${API_BASE}/api/schedule`).then(r=>r.json()),
          fetch(`${API_BASE}/api/sponsors`).then(r=>r.json()),
        ])
        setEvent(e)
        setSpeakers(Array.isArray(sp) ? sp : [])
        setSchedule(Array.isArray(sc) ? sc : [])
        setSponsors(Array.isArray(so) ? so : [])
      } catch(err) {
        console.error(err)
      }
    }
    fetchAll()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Hero event={event} />

      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border">
            <SectionTitle eyebrow="About" title="What is AWS Student Community Day?" />
            <p className="mt-4 text-gray-700">A student-led, one-day conference by AWS Cloud Club at Silver Oak University featuring talks, workshops, and networking focused on building on AWS. Open to all students and enthusiasts.</p>
            <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
              <li>Expert sessions from industry speakers</li>
              <li>Hands-on learning and demos</li>
              <li>Community networking and swags</li>
            </ul>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border bg-white">
              <div className="text-3xl">🎤</div>
              <div className="font-semibold mt-2">Inspiring talks</div>
              <div className="text-sm text-gray-600">Learn best practices and real-world stories.</div>
            </div>
            <div className="p-5 rounded-xl border bg-white">
              <div className="text-3xl">🧪</div>
              <div className="font-semibold mt-2">Hands-on</div>
              <div className="text-sm text-gray-600">Practical demos and live coding.</div>
            </div>
            <div className="p-5 rounded-xl border bg-white">
              <div className="text-3xl">🤝</div>
              <div className="font-semibold mt-2">Community</div>
              <div className="text-sm text-gray-600">Meet builders and mentors.</div>
            </div>
            <div className="p-5 rounded-xl border bg-white">
              <div className="text-3xl">🎁</div>
              <div className="font-semibold mt-2">Swags</div>
              <div className="text-sm text-gray-600">Goodies for active participants.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="speakers" className="py-20 bg-gray-50 border-y">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle eyebrow="Speakers" title="Meet the speakers" subtitle="More speakers to be announced soon" />
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {speakers.length ? speakers.map((s)=> (
              <SpeakerCard key={s._id || s.name} s={s} />
            )) : Array.from({length:3}).map((_,i)=>(
              <div key={i} className="p-6 rounded-xl border bg-white text-center text-gray-500">Coming soon</div>
            ))}
          </div>
        </div>
      </section>

      <section id="agenda" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle eyebrow="Agenda" title="Event schedule" />
          <div className="mt-10 grid gap-4">
            {schedule.length ? schedule.map((item, idx)=> (
              <ScheduleItem key={idx} item={item} />
            )) : (
              <div className="p-6 rounded-xl border bg-white text-center text-gray-500">Schedule will be published soon</div>
            )}
          </div>
        </div>
      </section>

      <section id="sponsors" className="py-20 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle eyebrow="Partners" title="Sponsors & community" />
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {sponsors.length ? sponsors.map((sp)=> (
              <SponsorLogo key={sp._id || sp.name} sp={sp} />
            )) : (
              <div className="col-span-2 md:col-span-4 p-6 rounded-xl border bg-white text-center text-gray-500">Sponsor roster coming soon</div>
            )}
          </div>
        </div>
      </section>

      <RegistrationForm />

      <footer className="py-10 border-t">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">© 2025 AWS Cloud Club • Silver Oak University. Community-led event.</div>
          <a href="#register" className="rounded-full bg-amber-500 text-white px-4 py-2 text-sm font-medium hover:bg-amber-600">Register</a>
        </div>
      </footer>

      <style>{`
        .input { @apply w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500; }
      `}</style>
    </div>
  )
}

export default App
