import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
// import { SiteHeader } from "@/components/site-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Download, Globe, Star, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BuildingAGlobalResume() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <SiteHeader /> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1E1147] to-orange-500 px-4 py-20 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h1 className="mb-4 text-4xl font-bold">Building a Global Resume</h1>
              <p className="mb-6 text-xl">Craft a resume that opens doors to international opportunities</p>
              <Button className="bg-white text-[#1E1147] hover:bg-gray-100">Get Your Free Resume Template</Button>
            </div>
            <div className="hidden md:block">
              <Image
                src="/placeholder.svg"
                alt="Global Resume"
                width={500}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Left Column: Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="overview" className="mb-12">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="key-elements">Key Elements</TabsTrigger>
                <TabsTrigger value="formatting">Formatting Tips</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <h2 className="mb-4 text-2xl font-semibold text-[#1E1147]">Crafting Your Global Resume</h2>
                <p className="mb-4">
                  A global resume is your passport to international career opportunities. Learn how to highlight your
                  cross-cultural experiences, language skills, and adaptability to stand out in the global job market.
                </p>
                <ul className="mb-6 list-disc pl-5 space-y-2">
                  <li>Understand the expectations of different countries and cultures</li>
                  <li>Showcase your international experience and global mindset</li>
                  <li>Tailor your resume for specific regions or industries</li>
                  <li>Highlight transferable skills that are valuable across borders</li>
                </ul>
              </TabsContent>
              <TabsContent value="key-elements">
                <h2 className="mb-4 text-2xl font-semibold text-[#1E1147]">Key Elements of a Global Resume</h2>
                <ul className="mb-6 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold">International Experience</h3>
                      <p>Highlight any work, study, or volunteer experiences abroad</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold">Language Skills</h3>
                      <p>Clearly state your proficiency levels in different languages</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold">Cultural Competence</h3>
                      <p>Demonstrate your ability to work in diverse environments</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold">Global Achievements</h3>
                      <p>Showcase results that have international relevance</p>
                    </div>
                  </li>
                </ul>
              </TabsContent>
              <TabsContent value="formatting">
                <h2 className="mb-4 text-2xl font-semibold text-[#1E1147]">Formatting Tips for Global Resumes</h2>
                <ul className="mb-6 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold">Use a Clean, Professional Layout</h3>
                      <p>Opt for a simple design that translates well across cultures</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold">Choose the Right File Format</h3>
                      <p>Save your resume as a PDF to preserve formatting</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold">Be Mindful of Length</h3>
                      <p>Keep it concise, typically 1-2 pages depending on experience</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold">Use Standard Fonts</h3>
                      <p>Stick to widely available fonts for compatibility</p>
                    </div>
                  </li>
                </ul>
              </TabsContent>
            </Tabs>

            {/* Interactive Resume Builder Teaser */}
            <Card className="p-6 mb-8">
              <h3 className="mb-4 text-xl font-semibold text-[#1E1147]">Interactive Resume Builder</h3>
              <p className="mb-4">Create your global resume with our step-by-step builder. Get started for free!</p>
              <div className="mb-4">
                <p className="mb-2 text-sm font-semibold">Completion Progress</p>
                <Progress value={33} className="w-full" />
              </div>
              <Button className="w-full">Continue Building Your Resume</Button>
            </Card>

            {/* Expert Tips Video */}
            <div className="mb-8">
              <h3 className="mb-4 text-xl font-semibold text-[#1E1147]">
                Expert Tips: Stand Out in the Global Job Market
              </h3>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Video Player Placeholder</p>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Download Resources */}
            <Card className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-[#1E1147]">Free Resources</h3>
              <ul className="space-y-4">
                <li>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Global Resume Template
                  </Button>
                </li>
                <li>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Country-Specific Tips PDF
                  </Button>
                </li>
              </ul>
            </Card>

            {/* Expert Review Service */}
            <Card className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-[#1E1147]">Expert Resume Review</h3>
              <p className="mb-4">Get personalized feedback from our global recruitment experts.</p>
              <Button className="w-full">Get Your Resume Reviewed</Button>
            </Card>

            {/* Testimonial */}
            <Card className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-[#1E1147]">Success Story</h3>
              <blockquote className="mb-4 italic">
                "The global resume tips helped me land my dream job in Singapore. Highly recommended!"
              </blockquote>
              <div className="flex items-center">
                <Image src="/placeholder.svg" alt="John Doe" width={40} height={40} className="rounded-full mr-3" />
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-gray-600">Software Engineer, TechGlobal Inc.</p>
                </div>
              </div>
            </Card>

            {/* Related Resources */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-[#1E1147]">Related Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-blue-600 hover:underline flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    Mastering International Job Interviews
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-600 hover:underline flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Networking Strategies for Global Professionals
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-600 hover:underline flex items-center">
                    <Star className="mr-2 h-4 w-4" />
                    Showcasing Your Global Experience
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Call to Action */}
      <section className="bg-[#1E1147] py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Take Your Career Global?</h2>
          <p className="mb-8 text-xl">
            Join our community of international professionals and access exclusive job opportunities.
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3">
            Create Your Global Profile
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 px-4 py-8">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="mb-4 text-lg font-semibold text-[#1E1147]">About RPG</h3>
              <p className="text-sm text-gray-600">
                Recruitment Placement Global connects talented professionals with international career opportunities.
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="mb-4 text-lg font-semibold text-[#1E1147]">Quick Links</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Job Search
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Career Resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="mb-4 text-lg font-semibold text-[#1E1147]">Stay Connected</h3>
              <form className="flex">
                <Input placeholder="Enter your email" className="flex-grow" />
                <Button type="submit" className="ml-2">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-600">
            &copy; 2025 Recruitment Placement Global. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

