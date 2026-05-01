// ─── Navigation Data ─────────────────────────────────────────────────────────
// Edit this file to change nav links, labels, or icons.
// Icons are SVG path data strings (viewBox 24x24).

export interface NavItem {
  label: string
  href: string
  description?: string
  icon?: string
}

export interface NavColumn {
  heading: string
  items: NavItem[]
}

export interface NavDropdown {
  columns: NavColumn[]
  testimonial?: {
    quote: string
    name: string
    role: string
    avatar: string
  }
}

export interface NavLink {
  label: string
  href?: string
  dropdown?: NavDropdown
}

// SVG path data for solution icons (24x24 viewBox)
const icons = {
  hr:          'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  talent:      'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  staffing:    'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  operations:  'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  applicants:  'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  quality:     'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3',
  faster:      'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  time:        'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2',
  cost:        'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
}

export const navLinks: NavLink[] = [
  {
    label: 'Solutions',
    dropdown: {
      columns: [
        {
          heading: 'By Team',
          items: [
            { label: 'HR', href: '/solutions/teams/hr', description: 'Streamlined recruiting for busy HR teams', icon: icons.hr },
            { label: 'Talent Acquisition', href: '/solutions/teams/talent-acquisition', description: 'Endless ready-to-talk talent', icon: icons.talent },
            { label: 'Staffing / RPO', href: '/solutions/teams/staffing-and-rpo', description: 'Reach every manufacturing pro in the US', icon: icons.staffing },
            { label: 'Operations', href: '/solutions/teams/operations', description: 'Simplify hiring with FactoryFix', icon: icons.operations },
          ],
        },
        {
          heading: 'By Need',
          items: [
            { label: 'Better Applicant Flow', href: '/solutions/needs/better-applicant-flow', description: 'Always have more applicants in the pipeline', icon: icons.applicants },
            { label: 'Higher Quality Candidates', href: '/solutions/needs/higher-quality-candidates', description: 'The best talent in manufacturing', icon: icons.quality },
            { label: 'Faster Time to Hire', href: '/solutions/needs/faster-time-to-hire', description: 'Find and hire manufacturing talent faster', icon: icons.faster },
            { label: 'Time Savings', href: '/solutions/needs/time-savings', description: 'Save time with recruitment automation', icon: icons.time },
            { label: 'Lower Cost Per Hire', href: '/solutions/needs/lower-cost-per-hire', description: 'Reduce your cost per hire', icon: icons.cost },
          ],
        },
        {
          heading: 'By Industry',
          items: [
            { label: 'Aerospace', href: '/solutions/industry/aerospace-manufacturing' },
            { label: 'Automotive Manufacturing', href: '/solutions/industry/automotive-manufacturing' },
            { label: 'Automotive Service & Repair', href: '/solutions/industry/automotive-service' },
            { label: 'Chemicals & Process', href: '/solutions/industry/chemical-process-manufacturers' },
            { label: 'Electronics', href: '/solutions/industry/electronics-manufacturing' },
            { label: 'Electrical Contractors', href: '/solutions/industry/electrical-contractors' },
            { label: 'Food & Beverage', href: '/solutions/industry/food-beverage' },
            { label: 'Heavy Equipment Service', href: '/solutions/industry/heavy-equipment-service-repair' },
            { label: 'HVAC & Home Service', href: '/solutions/industry/hvac-companies' },
            { label: 'Industrial Automation', href: '/solutions/industry/industrial-automation-controls' },
            { label: 'Medical Device', href: '/solutions/industry/medical-device-manufacturing' },
            { label: 'Metal Fabrication', href: '/solutions/industry/metal-fabrication-machine' },
            { label: 'Metal Processing', href: '/solutions/industry/metal-processing-distribution' },
            { label: 'Packaging', href: '/solutions/industry/packaging-manufacturers' },
            { label: 'Pharmaceutical', href: '/solutions/industry/pharmaceutical-manufacturing' },
            { label: 'Plastic & Composite', href: '/solutions/industry/plastic-composite-manufacturing' },
            { label: 'Staffing & Recruiting', href: '/solutions/industry/staffing-rpo-companies' },
            { label: 'Transportation & Fleet', href: '/solutions/industry/transportation-and-fleet-service' },
            { label: 'Warehousing', href: '/solutions/industry/warehousing-logistics' },
          ],
        },
      ],
      testimonial: {
        quote: 'With Indeed I was going through resumes 25 hours a week. Now with FactoryFix, it\'s 5 hours.',
        name: 'Samantha Mullholand',
        role: 'HR, Hanon Systems',
        avatar: 'https://cdn.prod.website-files.com/64133c2645948d0c2427bc00/644eb0f5c3356e60c46c0bb3_Testimonial-Headshot-Sam.png',
      },
    },
  },
  {
    label: 'Resources',
    dropdown: {
      columns: [
        {
          heading: 'Learn',
          items: [
            {
              label: 'Customer Stories',
              href: '/customer-stories',
              description: 'Learn how FactoryFix helps manufacturing recruiters.',
              icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69l1.519-4.674z',
            },
            {
              label: 'Blog',
              href: '/blog',
              description: 'Knowledge and resources to succeed in your work.',
              icon: 'M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z',
            },
            {
              label: 'Resources',
              href: '/resources',
              description: 'Tips and strategies for manufacturing recruitment.',
              icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z',
            },
            {
              label: 'Integrations',
              href: '/integration',
              description: 'Connect FactoryFix with your existing ATS.',
              icon: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
            },
          ],
        },
      ],
      testimonial: {
        quote: 'I had more viable candidates on my first day using FactoryFix than I had in two months using other platforms.',
        name: 'Kirsten Guida',
        role: 'Recruiter',
        avatar: '',
      },
    },
  },
]

export const navActions = [
  { label: 'Login', href: 'https://admin.factoryfix.com/login', variant: 'ghost' as const },
  { label: 'Sign up', href: '/sign-up', variant: 'primary' as const },
]
