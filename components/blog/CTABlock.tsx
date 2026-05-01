import Link from 'next/link'

export default function CTABlock() {
  return (
    <div className="rounded-xl px-7 py-8 mt-10 text-center bg-gray-880">
      <h3 className="text-white mb-2.5 font-museo font-black text-heading-sm">
        Ready to Transform Your Hiring?
      </h3>
      <p
        className="text-body-sm mb-5 leading-relaxed mx-auto"
        style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '480px' }}
      >
        See how FactoryFix can help you build the skilled team your business needs.
      </p>
      <Link
        href="https://www.factoryfix.com/sign-up"
        className="inline-block font-bold text-body-sm px-6 py-3 rounded-lg transition-opacity hover:opacity-90 bg-primary-300 text-gray-880"
      >
        Book a demo
      </Link>
    </div>
  )
}
