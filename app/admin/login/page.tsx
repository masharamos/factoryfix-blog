'use client'

import { useState } from 'react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen bg-gray-40 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <span className="font-inter font-black text-gray-900" style={{ fontSize: '24px' }}>
            FactoryFix
          </span>
          <p className="text-body-sm text-gray-800 mt-1">Blog Admin</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 shadow-card border border-gray-80">
          <h1 className="text-heading-xs font-semibold text-gray-900 mb-6">Sign in</h1>

          <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-body-xs font-semibold text-gray-840">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@factoryfix.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-100 text-body-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-highlight-500 focus:ring-2 focus:ring-highlight-500/10 transition-all"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-body-xs font-semibold text-gray-840">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-100 text-body-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-highlight-500 focus:ring-2 focus:ring-highlight-500/10 transition-all"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-2 py-2.5 rounded-lg bg-primary-500 text-white font-semibold text-body-sm hover:bg-primary-600 transition-colors"
            >
              Sign in
            </button>

          </form>
        </div>

        <p className="text-center text-body-xs text-gray-400 mt-6">
          Only FactoryFix team members can access this area.
        </p>
      </div>
    </div>
  )
}
