import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, Flower, Leaf, BookOpen, Coffee, Mic, Globe } from "lucide-react"
import Link from "next/link"

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Malayalam Language Workshop: Onam Special",
      description: "With the festival of Onam coming right around the end of August, start the semester with Malayalam – Adipoli! Learn basic greetings, useful expressions, and cultural references.",
      date: "2025-08-25",
      time: "6:00 PM",
      duration: "1 hour",
      location: "Classroom / Online",
      type: "workshop",
      attendees: 15,
      maxAttendees: 30,
      languages: ["Malayalam", "English"],
      icon: BookOpen,
    },
    {
      id: 2,
      title: "Slang-Song! (Collaboration with Chords)",
      description: "A chill event where participants sing in randomly assigned languages based on their preferences. Multiple rounds with different languages for ultimate fun!",
      date: "2025-08-30",
      time: "7:00 PM",
      duration: "2 hours",
      location: "Main Auditorium",
      type: "cultural",
      attendees: 25,
      maxAttendees: 50,
      languages: ["Multiple"],
      icon: Mic,
    },
    {
      id: 3,
      title: "Telugu Workshop",
      description: "As we enter September, dive into Telugu language! Learn basic greetings, useful expressions, and cultural context with engaging content and references.",
      date: "2025-09-15",
      time: "6:00 PM",
      duration: "1 hour",
      location: "Classroom / Online",
      type: "workshop",
      attendees: 12,
      maxAttendees: 30,
      languages: ["Telugu", "English"],
      icon: BookOpen,
    },
    {
      id: 4,
      title: "Linguistathon - 8 Hour Ideathon (Collaboration with E-Cell)",
      description: "An innovative 8-hour ideathon focused on reducing language barriers in business, both local and international. Come up with groundbreaking solutions!",
      date: "2025-09-28",
      time: "9:00 AM",
      duration: "8 hours",
      location: "Innovation Hub",
      type: "workshop",
      attendees: 30,
      maxAttendees: 100,
      languages: ["Multiple"],
      icon: Globe,
    },
    {
      id: 5,
      title: "Japanese Workshop: 26 Years of One Piece Special",
      description: "Celebrating 26 years of One Piece! Learn Japanese basics, greetings, and expressions with anime references. Perfect for anime lovers – Yoshi!",
      date: "2025-10-15",
      time: "6:00 PM",
      duration: "1 hour",
      location: "Classroom / Online",
      type: "workshop",
      attendees: 20,
      maxAttendees: 40,
      languages: ["Japanese", "English"],
      icon: BookOpen,
    },
    {
      id: 6,
      title: "Tamil Workshop - Deepavali Special",
      description: "Makkale, November brings Diwali vibes! Perfect time for Tamil workshop. Learn basic greetings and expressions. As Thalapathy would say... I am waiting!",
      date: "2025-11-10",
      time: "6:00 PM",
      duration: "1 hour",
      location: "Classroom / Online",
      type: "workshop",
      attendees: 18,
      maxAttendees: 35,
      languages: ["Tamil", "English"],
      icon: BookOpen,
    },
    {
      id: 7,
      title: "Mirror, Mirror on the Wall - Instagram Treasure Hunt",
      description: "A month-long treasure hunt on Instagram! Solve puzzling clues about different languages and cultures. Who is the best Linguist of them all?",
      date: "2025-11-01",
      time: "All Day",
      duration: "1 month",
      location: "Instagram (@linguista_club)",
      type: "cultural",
      attendees: 50,
      maxAttendees: 200,
      languages: ["Multiple"],
      icon: Globe,
    },
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "poetry":
        return "bg-rose-100 text-rose-700"
      case "literature":
        return "bg-violet-100 text-violet-700"
      case "exchange":
        return "bg-emerald-100 text-emerald-700"
      case "cultural":
        return "bg-amber-100 text-amber-700"
      case "workshop":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50">
      {/* Header */}
      <header className="border-b border-rose-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Flower className="h-6 w-6 text-rose-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-violet-600 bg-clip-text text-transparent">
                Linguista
              </span>
              <Leaf className="h-4 w-4 text-emerald-400" />
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-rose-500 transition-colors">
                Home
              </Link>
              <Link href="/events" className="text-rose-600 font-medium">
                Events
              </Link>
              <Link href="/wiki" className="text-slate-600 hover:text-rose-500 transition-colors">
                Wiki
              </Link>
              <Link href="/posts" className="text-slate-600 hover:text-rose-500 transition-colors">
                Posts
              </Link>
              <Link href="/login">
                <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 bg-transparent">
                  Member Login
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent">
              Linguista Events 2025
            </h1>
            <div className="absolute -top-2 -right-6 opacity-30">
              <svg width="32" height="32" viewBox="0 0 32 32" className="text-emerald-300">
                <path
                  d="M16 4 C20 8, 28 8, 24 16 C28 24, 20 24, 16 28 C12 24, 4 24, 8 16 C4 8, 12 8, 16 4 Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Our comprehensive event timeline for August 2025 – December 2025, featuring language workshops, cultural celebrations, and innovative competitions.
          </p>
        </div>

        {/* Upcoming Events */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-700">Planned Events Timeline</h2>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-rose-50 text-rose-600">August 2025</Badge>
              <Badge variant="outline" className="bg-violet-50 text-violet-600">December 2025</Badge>
            </div>
          </div>

          <div className="grid gap-6">
            {upcomingEvents.map((event) => {
              const IconComponent = event.icon
              return (
                <Card key={event.id} className="border-slate-100 bg-white/80 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-rose-100 to-violet-100">
                          <IconComponent className="h-6 w-6 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                            <div className="flex flex-wrap gap-1">
                              {event.languages.map((lang) => (
                                <Badge key={lang} variant="outline" className="text-xs">
                                  {lang}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <CardTitle className="text-xl text-slate-700 mb-2">{event.title}</CardTitle>
                          <CardDescription className="text-slate-600 mb-4">{event.description}</CardDescription>

                          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-500">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>
                                {event.time} ({event.duration})
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4" />
                              <span>
                                {event.attendees}/{event.maxAttendees} attending
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button className="bg-gradient-to-r from-rose-500 to-violet-500 hover:from-rose-600 hover:to-violet-600 mb-2">
                          Join Event
                        </Button>
                        <div className="text-xs text-slate-500">{event.maxAttendees - event.attendees} spots left</div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Event Types */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-slate-700 mb-8 text-center">Event Categories</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-blue-100 bg-blue-50/50 text-center">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <CardTitle className="text-blue-700">Language Workshops</CardTitle>
                <CardDescription>
                  Monthly workshops covering Malayalam, Telugu, Japanese, and Tamil with cultural context
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-violet-100 bg-violet-50/50 text-center">
              <CardHeader>
                <Globe className="h-8 w-8 text-violet-500 mx-auto mb-2" />
                <CardTitle className="text-violet-700">Ideathons</CardTitle>
                <CardDescription>8-hour Linguistathon focusing on innovative solutions to language barriers</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-rose-100 bg-rose-50/50 text-center">
              <CardHeader>
                <Mic className="h-8 w-8 text-rose-500 mx-auto mb-2" />
                <CardTitle className="text-rose-700">Cultural Events</CardTitle>
                <CardDescription>Festival-themed celebrations and collaborative performances with other clubs</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-emerald-100 bg-emerald-50/50 text-center">
              <CardHeader>
                <Coffee className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                <CardTitle className="text-emerald-700">Social Challenges</CardTitle>
                <CardDescription>Interactive Instagram treasure hunts and month-long community engagement</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Club Involvement */}
        <section className="mt-16 text-center">
          <Card className="border-emerald-100 bg-gradient-to-r from-emerald-50 to-violet-50 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-700">Get Involved with Linguista Club</CardTitle>
              <CardDescription className="text-lg">
                Join our organized team structure and contribute to amazing events!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-rose-600 mb-2">Encouragers</h4>
                  <p className="text-sm text-slate-600">Language specialists and workshop facilitators</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-violet-600 mb-2">Content Writing</h4>
                  <p className="text-sm text-slate-600">Promotional content and event descriptions</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-emerald-600 mb-2">Design Team</h4>
                  <p className="text-sm text-slate-600">Visual content and event posters</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-600 mb-2">LOOPS</h4>
                  <p className="text-sm text-slate-600">Logistics, operations, and permissions</p>
                </div>
              </div>
              <p className="text-slate-600 mb-6">
                Each domain plays a crucial role in making events successful. From slide preparation to venue management, 
                there's a place for everyone in our collaborative approach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-emerald-500 to-violet-500 hover:from-emerald-600 hover:to-violet-600">
                    Join the Team
                  </Button>
                </Link>
                <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* December Notice */}
        <section className="mt-16 text-center">
          <Card className="border-amber-100 bg-amber-50/50 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-amber-700">December 2025 Notice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-600">
                December will be ESA (End Semester Assessment) month... so everyone go study! 📚
              </p>
              <p className="text-sm text-amber-500 mt-2">
                No events planned for December - focus on academics!
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
