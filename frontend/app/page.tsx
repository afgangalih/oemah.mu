import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Layers, Compass, BarChart, CheckCircle2, Home, Globe, Users, Share2, Plus, ArrowUpRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 bg-white border border-slate-200 h-16 rounded-2xl shadow-sm">
        <div className="px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-lg tracking-tight">
            <img src="/logo.png" alt="EDAS Logo" className="h-8 w-auto object-contain" />
            <span className="hidden sm:block">oemah.mu</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <Link href="#metode" className="hover:text-emerald-600 transition-colors">Metode</Link>
            <Link href="#fitur" className="hover:text-emerald-600 transition-colors">Fitur</Link>
            <Link href="#faq" className="hover:text-emerald-600 transition-colors">FAQ</Link>
          </div>
          <Link href="/kalkulator">
            <Button size="sm" className="rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold px-6">
              Mulai Analisis
            </Button>
          </Link>
        </div>
      </nav>

      <section className="relative pt-48 pb-32 px-6 bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8 text-left">
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900 leading-[1.05]">
              Pilih Rumah <br />
              <span className="text-emerald-600">Tanpa Ragu.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-xl font-medium leading-relaxed">
              Analisis properti dengan metodologi EDAS yang presisi. Mengubah angka rumit menjadi rekomendasi hunian terbaik untuk masa depan Anda.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/kalkulator">
                <Button size="lg" className="h-14 px-10 text-base bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl transition-all font-bold shadow-lg shadow-emerald-100">
                  Jalankan Kalkulator
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <div className="h-12 w-px bg-slate-200 mx-2" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-900 tracking-tight">20+</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alternatif</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 hidden lg:block">
             <div className="bg-white border border-slate-200 rounded-[40px] p-10 space-y-8 shadow-sm">
                <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recommended House</p>
                      <h4 className="text-2xl font-bold">Type 45/90 - BSD</h4>
                   </div>
                   <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <div className="space-y-4">
                   {[75, 45, 90].map((w, i) => (
                     <div key={i} className="h-2 bg-slate-50 rounded-full">
                        <div className="h-full bg-slate-900 rounded-full" style={{ width: `${w}%` }} />
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      <section id="fitur" className="py-32 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Target className="w-6 h-6" />, 
                title: "Matematika Presisi", 
                desc: "Algoritma EDAS menghitung PDA & NDA untuk menjamin keakuratan peringkat alternatif rumah." 
              },
              { 
                icon: <Layers className="w-6 h-6" />, 
                title: "Analisis Komprehensif", 
                desc: "Sistem mendukung hingga 20 alternatif dengan 8 kriteria yang dapat disesuaikan sepenuhnya." 
              },
              { 
                icon: <Compass className="w-6 h-6" />, 
                title: "Navigasi Keputusan", 
                desc: "Antarmuka yang dirancang untuk memandu Anda melalui setiap tahap pengambilan keputusan." 
              }
            ].map((feature, i) => (
              <div key={i} className="p-10 rounded-[32px] bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 transition-all duration-500">
                <div className="mb-6 w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm border border-slate-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-32 bg-slate-50 border-y border-slate-100 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Pahami Lebih Lanjut</h2>
            <p className="text-slate-500 font-medium">Beberapa hal yang sering ditanyakan tentang platform kami.</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              { q: "Apa itu Metode EDAS?", a: "Evaluation Based on Distance from Average Solution (EDAS) adalah metode pengambilan keputusan yang sangat efektif untuk situasi kriteria yang saling bertentangan." },
              { q: "Mengapa harus menggunakan platform ini?", a: "Platform ini membantu Anda mengambil keputusan secara objektif, menghilangkan bias emosional saat memilih hunian masa depan." },
              { q: "Apakah data saya aman?", a: "Ya, aplikasi ini bersifat stateless. Data hanya diproses secara in-memory dan tidak disimpan secara permanen demi privasi Anda." }
            ].map((faq, i) => (
              <div key={i} className="group bg-white p-8 rounded-3xl border border-slate-200 hover:border-emerald-600 transition-all cursor-default shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-lg">{faq.q}</h4>
                  <Plus className="w-5 h-5 text-slate-300 group-hover:text-emerald-600 transition-colors" />
                </div>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-emerald-600 text-white rounded-t-[40px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-4 space-y-6">
              <div className="flex items-center gap-4 font-bold text-2xl tracking-tight">
                <div className="p-2 bg-white rounded-xl shadow-lg">
                  <img src="/logo.png" alt="EDAS Logo" className="h-10 w-auto object-contain" />
                </div>
                oemah.mu
              </div>
              <p className="text-emerald-50/70 text-sm font-medium leading-relaxed max-w-xs">
                Platform analisis keputusan hunian paling presisi untuk masa depan Anda.
              </p>
            </div>
            
            <div className="md:col-span-5 flex gap-12">
               <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-200">Navigasi</h4>
                 <ul className="space-y-2 text-sm font-bold">
                    <li><Link href="/kalkulator" className="hover:text-emerald-200 transition-colors">Kalkulator</Link></li>
                    <li><Link href="#fitur" className="hover:text-emerald-200 transition-colors">Layanan</Link></li>
                 </ul>
               </div>
               <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-200">Bantuan</h4>
                 <ul className="space-y-2 text-sm font-bold">
                    <li><Link href="#faq" className="hover:text-emerald-200 transition-colors">Pusat FAQ</Link></li>
                    <li><Link href="#" className="hover:text-emerald-200 transition-colors">Kebijakan</Link></li>
                 </ul>
               </div>
            </div>

            <div className="md:col-span-3 flex justify-end gap-3">
                {[Globe, Users, Share2].map((Icon, i) => (
                  <Link key={i} href="#" className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white hover:text-emerald-600 transition-all">
                    <Icon className="w-4 h-4" />
                  </Link>
                ))}
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center text-[10px] font-bold text-emerald-200/40 uppercase tracking-widest">
            <p>© 2026 EDAS RUMAH PROJECT</p>
            <div className="flex gap-4">
               <span>FASTAPI</span>
               <span>NEXTJS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
