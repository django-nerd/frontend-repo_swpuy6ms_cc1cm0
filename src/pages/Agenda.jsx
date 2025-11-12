import { useEffect, useState } from 'react'
import { API_BASE, SectionTitle, ScheduleItem } from '../components/ui'

export default function Agenda() {
  const [schedule, setSchedule] = useState([])

  useEffect(() => {
    fetch(`${API_BASE}/api/schedule`).then(r=>r.json()).then(d=> setSchedule(Array.isArray(d)?d:[])).catch(()=>{})
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle eyebrow="Agenda" title="Full schedule" subtitle="Detailed sessions and timings" />
          <div className="mt-10 grid gap-4">
            {schedule.length ? schedule.map((item, idx)=> (
              <ScheduleItem key={idx} item={item} />
            )) : (
              <div className="p-6 rounded-xl border bg-white text-center text-gray-500">Schedule will be published soon</div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
