import {
    Briefcase,
    Building2,
    GraduationCap,
    HeartPulse,
    LineChart,
    CheckCircle,
    Search,
    MapPin,
    Users,
    Globe,
    Zap,
    HardHat,
    Utensils,
    Tractor,
    ShoppingBag,
    Pickaxe,
    Sprout,
    Wrench,
    BookCopy,
    Laptop,
    CircleDollarSign,
    Factory
  } from "lucide-react"
  
  import MiningAndResources from '@/public/img/featured_industries/mining_and_resource.jpg'
  import FarmAndAgriculture from '@/public/img/featured_industries/farm_and_agriculture.jpg'
  import Healthcare from '@/public/img/featured_industries/healthcare.jpg'
  import Construction from '@/public/img/featured_industries/construction.jpg'
  import Education from '@/public/img/featured_industries/education.jpg'
  import InforationTechnology from '@/public/img/featured_industries/information_technology.jpg'
  import FinancialService from '@/public/img/featured_industries/financial_service.jpg'
  import Manufacturing from '@/public/img/featured_industries/manufacturing.jpg'


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
  
  export const featuredIndustriesList = [
    {
      title: "Mining and Resources",
      icon: Pickaxe,
      description: "Australia's leading sector, including coal, iron ore, and minerals",
      image: MiningAndResources
    },
    {
      title: "Farm & Agriculture",
      icon: Sprout,
      description: "Farm hands, seasonal workers, and agricultural specialists across Australia",
      image: FarmAndAgriculture
    },
    {
      title: "Healthcare",
      icon: HeartPulse,
      description: "Growing industry with increasing demand for services",
      image:Healthcare
    },
    {
      title: "Construction",
      icon: Wrench,
      description: "Booming sector with numerous infrastructure projects",
      image: Construction
    },
    {
      title: "Education",
      icon: BookCopy,
      description: "Major export industry and employer in Australia",
      image: Education
    },
    {
      title: "Information Technology",
      icon: Laptop,
      description: "Rapidly growing industry with high demand for skilled professionals",
      image: InforationTechnology
    },
    {
      title: "Financial Services",
      icon: CircleDollarSign,
      description: "Strong sector including banking, insurance, and investment",
      image: FinancialService
    },
    {
      title: "Manufacturing",
      icon: Factory,
      description: "Diverse industry producing goods for domestic and international markets",
      image: Manufacturing
    },
    // {
    //   title: "Retail Trade",
    //   icon: Briefcase,
    //   description: "Large employer across various types of stores and online platforms",
    //   image: FarmAndAgriculture
    // },
    // {
    //   title: "Tourism & Hospitality",
    //   icon: Briefcase,
    //   description: "Significant contributor to the economy, attracting domestic and international visitors",
    //   image: FarmAndAgriculture
    // },
    // {
    //   title: "Energy & Utilities",
    //   icon: Briefcase,
    //   description: "Essential services including electricity, gas, and water supply",
    //   image: FarmAndAgriculture
    // },
    // {
    //   title: "Telecommunications",
    //   icon: Briefcase,
    //   description: "Evolving industry with ongoing infrastructure development",
    //   image: FarmAndAgriculture
    // },
    // {
    //   title: "Professional Services",
    //   icon: Briefcase,
    //   description: "Wide range of services including legal, accounting, and consulting",
    //   image: FarmAndAgriculture
    // },
    // {
    //   title: "Media & Entertainment",
    //   icon: Briefcase,
    //   description: "Dynamic sector covering film, television, music, and digital media",
    //   image: FarmAndAgriculture
    // },
    // {
    //   title: "Transport & Logistics",
    //   icon: Briefcase,
    //   description: "Critical industry supporting Australia's supply chains",
    //   image: FarmAndAgriculture
    // },
    // {
    //   title: "Renewable Energy",
    //   icon: Briefcase,
    //   description: "Growing sector focused on sustainable energy solutions",
    //   image: FarmAndAgriculture
    // }
  ]
  
  
  