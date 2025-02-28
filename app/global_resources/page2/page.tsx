import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
// import { SiteHeader } from "@/components/site-header"
import Link from "next/link"

export default function MasteringInternationalJobInterviews() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <SiteHeader /> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1E1147] to-orange-500 px-4 py-20 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold">Mastering International Job Interviews</h1>
          <p className="mb-8 text-xl">
            Learn how to ace your global job interviews and stand out in the international job market
          </p>
          <Button className="bg-white text-[#1E1147] hover:bg-gray-100">Download Free Interview Checklist</Button>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left Column: Article Preview */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-[#1E1147]">Key Strategies for Success</h2>
            <ul className="mb-6 list-disc pl-5 space-y-2">
              <li>Understanding cultural differences in interview etiquette</li>
              <li>Preparing for common international interview questions</li>
              <li>Showcasing your global mindset and adaptability</li>
              <li>Navigating time zones and virtual interview platforms</li>
            </ul>
            <p className="mb-6">
              In today's globalized job market, mastering international job interviews is crucial. This guide provides
              you with expert insights and practical tips to help you succeed in interviews with companies around the
              world.
            </p>
            <Button className="w-full mb-4">Read Full Article</Button>
            <p className="text-sm text-gray-600">
              5 min read • Written by Sarah Johnson, Global Recruitment Specialist
            </p>
          </div>

          {/* Right Column: Related Resources and CTA */}
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-[#1E1147]">Expert Webinar</h3>
              <p className="mb-4">
                Join our free webinar on "Acing Virtual Interviews Across Cultures" with industry experts.
              </p>
              <Button variant="outline" className="w-full">
                Register Now
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-[#1E1147]">Interview Coaching</h3>
              <p className="mb-4">Get personalized coaching to enhance your international interview skills.</p>
              <Button variant="outline" className="w-full">
                Book a Session
              </Button>
            </Card>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-[#1E1147]">Related Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-blue-600 hover:underline">
                    Building a Global Resume
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-600 hover:underline">
                    Negotiating International Job Offers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-600 hover:underline">
                    Understanding Global Work Cultures
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Email Subscription */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-semibold text-[#1E1147]">Stay Updated on Global Career Tips</h2>
          <p className="mb-6">
            Subscribe to our newsletter for the latest insights on international job searching and career development.
          </p>
          <div className="flex gap-4">
            <Input placeholder="Enter your email" className="flex-grow" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E1147] px-4 py-8 text-white">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Recruitment Placement Global. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

