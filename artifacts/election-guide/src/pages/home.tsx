import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Map, ShieldCheck, CheckCircle2, Award, ArrowRight } from "lucide-react";

export default function Home() {
  // Static verified stats for the 2024 Indian General Elections
  const stats = {
    registeredVoters: 968000000,
    totalStatesAndUTs: 36,
    mythsBusted: 50
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-3 h-3" /> Nonpartisan Civic Portal
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              Empowering India's<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Democratic Spirit.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Your comprehensive, verified guide to the world's largest democratic exercise. 
              Navigate registration, research candidates, and vote with confidence.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/voter-journey">
              <Button size="lg" className="w-full sm:w-auto text-base h-14 px-10 rounded-full shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                Voter's Journey
              </Button>
            </Link>
            <Link href="/quiz">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-10 rounded-full border-2 hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 bg-white">
                Take the Civic Quiz
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="transition-all">
              <Card className="border-none shadow-xl bg-slate-50/50 backdrop-blur">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <Users className="h-8 w-8" />
                  </div>
                  <p className="text-4xl font-black text-slate-900 mb-2">
                    {(stats.registeredVoters / 1000000).toFixed(0)}M+
                  </p>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Registered Voters</p>
                  <p className="mt-4 text-xs text-slate-400">Largest electorate in human history</p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div whileHover={{ y: -5 }} className="transition-all">
              <Card className="border-none shadow-xl bg-slate-50/50 backdrop-blur">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                    <Map className="h-8 w-8" />
                  </div>
                  <p className="text-4xl font-black text-slate-900 mb-2">
                    {stats.totalStatesAndUTs}
                  </p>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">States & UTs</p>
                  <p className="mt-4 text-xs text-slate-400">Comprehensive nationwide coverage</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="transition-all">
              <Card className="border-none shadow-xl bg-slate-50/50 backdrop-blur">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 mb-6">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <p className="text-4xl font-black text-slate-900 mb-2">
                    {stats.mythsBusted}+
                  </p>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Myths Busted</p>
                  <p className="mt-4 text-xs text-slate-400">Fighting misinformation with facts</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="py-24 px-4 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">Test Your Civic IQ with our Adaptive Quiz.</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Think you know how the Indian electoral system works? Challenge yourself with our verified question bank, 
                ranging from basic registration rules to complex constitutional laws.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  "Verified by election law experts",
                  "Three difficulty levels",
                  "Detailed explanations for every answer",
                  "Share your score with friends"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-slate-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/quiz">
                <Button size="lg" className="rounded-full px-8 h-14 text-base font-bold group">
                  Start Quiz Now
                  <Award className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur relative overflow-hidden">
                <CardContent className="p-12">
                  <div className="flex flex-col items-center text-center">
                    <Award className="w-20 h-20 text-primary mb-6 animate-pulse" />
                    <h3 className="text-2xl font-bold mb-4 text-white">Join the Hall of Fame</h3>
                    <p className="text-slate-400 mb-8">Most users score 60% on their first try. Can you do better?</p>
                    <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-primary w-2/3"></div>
                    </div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">Average Score: 68% (Expert Mode)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-4 bg-slate-50 border-t">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to make a difference?</h2>
          <p className="text-slate-600 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            Whether it's your first time or you're a seasoned voter, staying informed is the first step toward a stronger democracy.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/myths" className="flex items-center gap-2 text-primary font-bold hover:underline">
              Verify a Myth <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/polling-places" className="flex items-center gap-2 text-primary font-bold hover:underline">
              Check Election Dates <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/ballot" className="flex items-center gap-2 text-primary font-bold hover:underline">
              Research Candidates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
