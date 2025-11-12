import { SectionTitle, RegistrationForm } from '../components/ui'

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle eyebrow="Join" title="Register now" subtitle="Limited seats available. Free community event." />
          <RegistrationForm />
        </div>
      </section>
    </div>
  )
}
