import { useEffect, useState } from 'react'
import { API_BASE, Hero, SectionTitle, SpeakerCard, ScheduleItem, SponsorLogo } from '../components/ui'

export default function Home() {
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
    </div>
  )
}
