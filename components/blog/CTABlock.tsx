import Link from 'next/link'

export default function CTABlock() {
  return (
    <section className="bg-gray-880 rounded-2xl px-8 py-12 text-center mt-16">
      <h2 className="font-museo text-heading-sm text-white mb-3">
        Ready to Transform Your Hiring?
      </h2>
      <p className="text-gray-400 text-body-lg mb-8 max-w-md mx-auto">
        See how FactoryFix can help you build the skilled team your business needs.
      </p>
      <div className="flex items-center justify-center">
        <Link
          href="/sign-up"
          className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Learn more — Book a demo
        </Link>
      </div>
    </section>
  )
}
