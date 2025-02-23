import {
    Briefcase,
    Building2,
    GraduationCap,
    HeartPulse,
    LineChart,
    Wrench,
    CheckCircle,
    Search,
    MapPin,
    Users,
    Globe,
    Zap,
    HardHat,
    Utensils,
    Tractor,
    ShoppingBag
  } from "lucide-react"

export const navigationLinks = [
    {name: 'Home', path: '/'},
    {name: 'About Us', path:'/'},
    {name: 'Find Jobs', path:'/'},
    {name: 'Services', path:'/'},
    {name: 'Contact Us', path: '/'}
]

export const jobCategoriesList = [
    {icon: Briefcase, title: 'Technology', jobs: '10k'},
    {icon: LineChart, title: 'Finance', jobs: '8k'},
    {icon: HeartPulse, title: 'Healthcare', jobs: '12k'},
    {icon: Building2, title: 'Marketing', jobs: '6k'},
    {icon: GraduationCap, title: 'Education', jobs: '5k'},
    {icon: Wrench, title: 'Engineering', jobs: '9k'},
    {icon: HardHat, title: 'Construction', jobs: '7k'},
    {icon: Utensils, title: 'Hospitality', jobs: '8k'},
    {icon: Tractor, title: 'Agriculture', jobs: '4k'},
    {icon: ShoppingBag, title: 'Retail', jobs: '4k'},
    {icon: Globe, title: 'International', jobs: '15k'},
    {icon: Users, title: 'Human Resources', jobs: '6k'},
]  

export const findJobList = [
    {
      title: "Mining Engineer",
      company: "AusMine Corp",
      location: "Perth, WA",
      salary: "$120,000 - $150,000",
      jobType: "Full-time"
    },
    {
      title: "Registered Nurse",
      company: "Sydney Central Hospital",
      location: "Sydney, NSW",
      salary: "$75,000 - $95,000",
      jobType: "Full-time"
    },
    {
      title: "Farm Manager",
      company: "Green Pastures Pty Ltd",
      location: "Toowoomba, QLD",
      salary: "$80,000 - $100,000",
      jobType: "Full-time"
    },
    {
      title: "Software Engineer",
      company: "TechInnovate Australia",
      location: "Melbourne, VIC",
      salary: "Not specified",
      jobType: "Full-time"
    },
    {
      title: "FIFO Chef",
      company: "Outback Catering Services",
      location: "Various Locations, WA",
      salary: "Not specified",
      jobType: "Remote"
    },
    {
      title: "Environmental Scientist",
      company: "Farm Hand",
      location: "Brisbane, QLD",
      salary: "Not specified",
      jobType: "Full-time"
    }
  ]
  