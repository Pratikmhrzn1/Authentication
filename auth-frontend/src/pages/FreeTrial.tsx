import {
  Star,
  Shield,
  Users,
  TrendingUp,
  ChevronRight,
  Briefcase,
  Home,
  Wrench,
  Laptop,
  Camera,
  Scissors,
  Heart
} from "lucide-react";
import Navbar from "../components/navbar";
import FeaturedServices from "../components/cards";
// import backgroundImg from "../assets/background.png"
export default function FreeTrial() {
  const categories = [
    { id: 1, name: "Home Services", icon: Home, jobs: 1245, rating: 4.8, color: "bg-blue-500" },
    { id: 2, name: "Repair & Maintenance", icon: Wrench, jobs: 892, rating: 4.7, color: "bg-green-500" },
    { id: 3, name: "Tech & IT", icon: Laptop, jobs: 1567, rating: 4.9, color: "bg-purple-500" },
    { id: 4, name: "Photography", icon: Camera, jobs: 634, rating: 4.6, color: "bg-pink-500" },
    { id: 5, name: "Beauty & Grooming", icon: Scissors, jobs: 423, rating: 4.8, color: "bg-yellow-500" },
    { id: 6, name: "Healthcare", icon: Heart, jobs: 789, rating: 4.9, color: "bg-red-500" }
  ];

  return (
    <div className="min-h-screen bg-[#ECEFCA] ">
      {/* Background */}
      {/* <img
        src={backgroundImg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      /> */}
      <Navbar />

      {/* HERO */}
      <section className="relative pt-38 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-orange-100/60 via-yellow-100/40 to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-[#24384B] leading-tight">
            Find Trusted Workers.
            <br />
            <span className="inline-block mt-4 bg-linear-to-r from-orange-500 to-yellow-400 text-white px-6 py-3 rounded-xl shadow-xl">
              Get Paid Safely.
            </span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Secure payments, verified workers, and guaranteed satisfaction.
            Post jobs or find work with complete peace of mind.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-linear-to-r from-orange-500 to-yellow-400 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:scale-105 transition">
              Post a Job
            </button>
            <button className="bg-white/80 backdrop-blur px-10 py-4 rounded-full text-lg font-semibold text-gray-800 shadow hover:bg-white transition">
              Find Work
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white/70 backdrop-blur py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-4">
          {[
            { icon: Users, value: "50,000+", label: "Active Users", color: "text-orange-500" },
            { icon: Shield, value: "100%", label: "Secure Payments", color: "text-green-500" },
            { icon: TrendingUp, value: "25,000+", label: "Jobs Completed", color: "text-blue-500" }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition">
              <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
              <div className="text-4xl font-bold text-[#24384B]">{stat.value}</div>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#24384B] mb-14">
            How PesaPort Protects You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Post & Pay", desc: "Your payment is securely held in escrow.", color: "bg-orange-100 text-orange-500" },
              { step: 2, title: "Work Completed", desc: "Job completed and approved by both parties.", color: "bg-green-100 text-green-500" },
              { step: 3, title: "Get Paid", desc: "Funds released instantly to worker.", color: "bg-blue-100 text-blue-500" }
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-8 shadow-md hover:-translate-y-1 hover:shadow-xl transition"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${item.color}`}>
                  <span className="text-2xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-[#24384B] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FeaturedServices/>

      {/* CATEGORIES */}
      <section className="bg-white py-10 px-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-[#24384B]">Popular Categories</h2>
            <button className="flex items-center text-orange-500 font-semibold hover:text-orange-600 transition">
              See All <ChevronRight className="ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-400 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`${cat.color} w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition`}>
                      <Icon className="text-white w-7 h-7" />
                    </div>
                    <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow text-sm">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold">{cat.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#24384B]">{cat.name}</h3>
                  <p className="text-gray-600 mt-1">
                    {cat.jobs.toLocaleString()} active jobs
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-linear-to-r from-orange-500 to-yellow-400 py-24 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-white/90 mb-10">
          Join thousands who trust PesaPort for secure work.
        </p>
        <button className="bg-white text-orange-500 px-12 py-4 rounded-full text-lg font-bold shadow-2xl hover:scale-105 transition">
          Create Free Account
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1f2f3f] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Briefcase className="text-orange-400" />
            <span className="text-2xl font-bold">PesaPort</span>
          </div>
          <p className="text-gray-400 mb-8">
            Secure payments. Trusted workers. Real results.
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white">About</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            © 2025 PesaPort. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
