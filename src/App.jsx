import { useEffect, useRef, useState } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────
const portfolioItems = [
  { img: '/images/portfolio-1.jpg', alt: 'Jasa Kontruksi Bangunan',       category: 'Kontruksi'  },
  { img: '/images/portfolio-2.jpg', alt: 'Instalasi Elektro & Mekanikal', category: 'electrical' },
  { img: '/images/portfolio-3.jpg', alt: 'Pengadaan Barang & Jasa',       category: 'pengadaan'  },
  { img: '/images/portfolio-4.jpg', alt: 'Layanan IT',                    category: 'it'         },
  { img: '/images/portfolio-5.jpg', alt: 'Konsultasi Proyek',             category: 'Konsultasi' },
  { img: '/images/portfolio-6.jpg', alt: 'Layanan IT',                    category: 'it'         },
]

const filterButtons = [
  { label: 'Semua',                       value: 'semua'     },
  { label: 'Kontruksi Bangunan',          value: 'Kontruksi' },
  { label: 'Layanan IT',                  value: 'it'        },
  { label: 'Instalasi Elektro & Mekanikal', value: 'electrical'},
  { label: 'Konsultasi Proyek',           value: 'Konsultasi'},
  { label: 'Pengadaan Barang & Jasa',     value: 'pengadaan' },
]

const clients = [
  { img: '/images/Pemerintah Provinsi Jawa Tengah.png', name: 'Pemerintah Provinsi Jawa Tengah', big: true },
  { img: '/images/Pemerintah Kabupaten Semarang.png',   name: 'Pemerintah Kabupaten Semarang'              },
  { img: '/images/Pemerintah Kota Semarang.png',        name: 'Pemerintah Kota Semarang'                   },
  { img: '/images/PLN.png',                             name: 'PLN'                                        },
]

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useScrollEffects() {
  useEffect(() => {
    const navbar  = document.getElementById('navbar')
    const btt     = document.getElementById('back-to-top')
    const nbMain  = document.getElementById('nb-main')
    const nbSub   = document.getElementById('nb-sub')
    const menuBtn = document.getElementById('menu-btn')

    const onScroll = () => {
      if (window.scrollY > 80) {
        navbar.style.cssText = 'background:rgba(255,255,255,0.97);box-shadow:0 2px 20px rgba(0,0,0,0.08);backdrop-filter:blur(10px);'
        document.querySelectorAll('#navbar .nav-link').forEach(l => l.style.color = '#374151')
        if (menuBtn) menuBtn.style.color = '#374151'
        nbMain.style.color = '#111827'
        nbSub.style.color  = '#2563eb'
        btt.classList.add('show')
      } else {
        navbar.style.cssText = ''
        document.querySelectorAll('#navbar .nav-link').forEach(l => l.style.color = 'rgba(255,255,255,0.9)')
        if (menuBtn) menuBtn.style.color = 'white'
        nbMain.style.color = 'white'
        nbSub.style.color  = '#67e8f9'
        btt.classList.remove('show')
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}

function useReveal() {
  useEffect(() => {
    const els      = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── Components ──────────────────────────────────────────────────────────────
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <nav id="navbar" className="fixed w-full top-0 z-50 py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <img
            src="/images/logo.png" alt="Logo"
            className="h-10 w-auto"
            onError={e => { e.target.style.display = 'none'; document.getElementById('logo-fallback').style.display = 'flex' }}
          />
          <div id="logo-fallback" className="w-10 h-10 gradient-bg rounded-xl items-center justify-center shadow-lg hidden">
            <span className="text-white font-black text-lg">L</span>
          </div>
          <div>
            <div id="nb-main" className="font-black text-white text-sm leading-tight">Adhi Rajasa</div>
            <div id="nb-sub"  className="text-xs text-cyan-300 font-semibold">Satria</div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {['home','tentang','layanan','portfolio'].map(id => (
            <a key={id} href={`#${id}`} className="nav-link text-sm font-semibold text-white/90 hover:text-white transition-colors capitalize">
              {id === 'home' ? 'Home' : id === 'tentang' ? 'Tentang Kami' : id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
          <a href="#kontak" className="bg-white text-blue-700 text-sm font-bold px-5 py-2.5 rounded-xl shadow-md hover:bg-blue-50 transition-all">Kontak</a>
        </div>

        <button id="menu-btn" className="md:hidden text-white text-xl" onClick={() => setMobileOpen(o => !o)}>
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t mt-4 px-6 py-4 space-y-3 shadow-lg">
          <a href="#home"      className="block text-sm font-semibold text-gray-700 hover:text-blue-600">Home</a>
          <a href="#tentang"   className="block text-sm font-semibold text-gray-700 hover:text-blue-600">Tentang Kami</a>
          <a href="#layanan"   className="block text-sm font-semibold text-gray-700 hover:text-blue-600">Layanan</a>
          <a href="#portfolio" className="block text-sm font-semibold text-gray-700 hover:text-blue-600">Portfolio</a>
          <a href="#kontak"    className="block text-sm font-semibold text-white bg-blue-600 px-4 py-2 rounded-xl text-center">Kontak</a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay"></div>
      <div className="w-full px-12 py-32 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm px-4 py-2 rounded-full mb-6 font-medium">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            CV. Adhi Rajasa Satria — Berdiri 20 Mei 2022
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-4">
            Profesional,<br/><span className="text-cyan-300">Loyal,</span> dan<br/><span className="text-yellow-300">Handal</span>
          </h1>
          <p className="text-xl text-white/80 font-semibold mt-4 mb-3">Terpercaya di Setiap Karya!</p>
          <p className="text-white/70 text-base max-w-xl mb-10 leading-relaxed">
            Bergerak di bidang konstruksi, instalasi teknik, serta pengadaan barang dan jasa dengan komitmen memberikan layanan profesional dan berkualitas bagi proyek pemerintah maupun swasta.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#kontak" className="bg-white text-blue-700 font-bold px-8 py-4 rounded-2xl hover:bg-cyan-50 transition-all shadow-lg hover:-translate-y-1 inline-flex items-center gap-2">
              <i className="fas fa-paper-plane"></i> Hubungi Kami
            </a>
            <a href="#layanan" className="border-2 border-white/40 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all inline-flex items-center gap-2">
              <i className="fas fa-briefcase"></i> Lihat Layanan
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <i className="fas fa-chevron-down text-xl"></i>
      </div>
    </section>
  )
}

function VisiMisi() {
  return (
    <section className="py-24 section-gray reveal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-divider mx-auto mb-4"></div>
          <h2 className="text-4xl font-black text-gray-900">Visi <span className="gradient-text">&amp;</span> Misi</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card-hover bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-eye text-blue-600 text-2xl"></i>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">Visi</h3>
            <div className="section-divider mb-5"></div>
            <p className="text-gray-600 leading-relaxed">Menjadi perusahaan yang profesional, terpercaya, dan berdaya saing tinggi dalam bidang konstruksi dan pengadaan barang serta jasa.</p>
          </div>
          <div className="card-hover bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 shadow-lg">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-bullseye text-white text-2xl"></i>
            </div>
            <h3 className="text-2xl font-black text-white mb-4">Misi</h3>
            <div className="h-1 w-14 bg-cyan-300 rounded mb-5"></div>
            <ul className="space-y-3">
              {[
                'Memberikan layanan berkualitas dengan standar profesional.',
                'Mengutamakan kepuasan klien dalam setiap proyek yang dikerjakan.',
                'Mengembangkan usaha dengan inovasi dan teknologi.',
                'Membangun hubungan kerja yang baik dengan mitra dan pelanggan.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/90 text-sm">
                  <i className="fas fa-check-circle text-cyan-300 mt-0.5 flex-shrink-0"></i>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Tentang() {
  const cards = [
    { bg: 'from-blue-50 to-blue-100 border-blue-100',     icon: 'bg-blue-600',    fa: 'fa-shield-alt',  title: 'Dapat Diandalkan', desc: 'Berkomitmen memberikan layanan berkualitas dalam pengadaan barang, jasa dan engineering' },
    { bg: 'from-cyan-50 to-cyan-100 border-cyan-100',     icon: 'bg-cyan-600',    fa: 'fa-handshake',   title: 'Loyal',            desc: 'Membangun kepercayaan dan hubungan jangka panjang dengan klien dan mitra' },
    { bg: 'from-indigo-50 to-indigo-100 border-indigo-100',icon:'bg-indigo-600',  fa: 'fa-chart-line',  title: 'Kaizen',           desc: 'Terus meningkatkan efisiensi dan kualitas untuk bersaing di era globalisasi' },
    { bg: 'from-yellow-50 to-yellow-100 border-yellow-100',icon:'bg-yellow-500',  fa: 'fa-star',        title: 'Joy',              desc: 'Menciptakan lingkungan kerja positif demi layanan dan peluang karier terbaik' },
  ]
  return (
    <section id="tentang" className="py-24 section-white reveal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-divider mb-4"></div>
            <h2 className="text-4xl font-black text-gray-900 mb-6">Tentang <span className="gradient-text">Kami</span></h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              <strong className="text-gray-900">CV Adhi Rajasa Satria</strong> bergerak di bidang konstruksi, instalasi teknik, serta pengadaan barang dan jasa, termasuk pekerjaan pembangunan, instalasi elektrikal, serta layanan teknologi dan dukungan proyek.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              Berdiri sejak <strong className="text-blue-600">22 Mei 2022</strong>, perusahaan ini mengedepankan kualitas pelayanan serta berkomitmen memberikan kepuasan kepada klien.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              CV Adhi Rajasa Satria berkeyakinan menjadi perusahaan yang akan terus berkembang serta mampu bersaing dan memberikan kontribusi positif dalam mendukung berbagai proyek pembangunan di Indonesia.
            </p>
            <blockquote className="border-l-4 border-blue-600 pl-5 py-3 bg-blue-50 rounded-r-xl">
              <p className="text-blue-800 font-semibold italic text-sm">"Kami menyediakan berbagai layanan profesional untuk memenuhi kebutuhan bisnis dan teknologi anda."</p>
            </blockquote>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {cards.map((c, i) => (
              <div key={i} className={`card-hover bg-gradient-to-br ${c.bg} rounded-3xl p-7 border`}>
                <div className={`w-12 h-12 ${c.icon} rounded-2xl flex items-center justify-center mb-4`}>
                  <i className={`fas ${c.fa} text-white text-lg`}></i>
                </div>
                <h4 className="font-black text-gray-900 mb-2">{c.title}</h4>
                <p className="text-gray-600 text-xs leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Layanan() {
  const services = [
    { color: 'bg-blue-600',   icon: 'fa-hard-hat',      title: 'Jasa Konstruksi Bangunan',          desc: 'Melayani pembangunan berbagai jenis bangunan seperti rumah, gedung perkantoran, dan fasilitas lainnya dengan standar kualitas yang baik.' },
    { color: 'bg-indigo-600', icon: 'fa-bolt',           title: 'Instalasi Elektrikal dan Mekanikal', desc: 'Menyediakan layanan instalasi sistem kelistrikan, elektronik, dan sistem mekanikal untuk mendukung operasional bangunan.' },
    { color: 'bg-cyan-600',   icon: 'fa-boxes',          title: 'Pengadaan Barang dan Jasa',          desc: 'Menyediakan berbagai kebutuhan barang dan jasa untuk proyek pemerintah maupun swasta secara profesional dan terpercaya.' },
    { color: 'bg-yellow-500', icon: 'fa-laptop-code',    title: 'Layanan IT',                        desc: 'Menyediakan solusi teknologi seperti instalasi sistem komputer, jaringan, dan dukungan teknologi informasi.' },
    { color: 'bg-green-600',  icon: 'fa-clipboard-list', title: 'Konsultasi Proyek',                 desc: 'Memberikan konsultasi dalam pelaksanaan proyek konstruksi maupun pengadaan.' },
  ]
  return (
    <section id="layanan" className="py-24 section-gray reveal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-divider mx-auto mb-4"></div>
          <h2 className="text-4xl font-black text-gray-900">Layanan <span className="gradient-text">Kami</span></h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Kami menyediakan berbagai layanan profesional untuk memenuhi kebutuhan bisnis dan teknologi Anda.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="card-hover bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className={`w-14 h-14 ${s.color} rounded-2xl flex items-center justify-center mb-6`}>
                <i className={`fas ${s.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="font-black text-gray-900 text-lg mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
          <div className="card-hover bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-comments text-white text-2xl"></i>
              </div>
              <h3 className="font-black text-white text-lg mb-3">Butuh Solusi Lainnya?</h3>
              <p className="text-white/70 text-sm leading-relaxed">Kami siap berdiskusi untuk menemukan solusi terbaik bagi kebutuhan bisnis Anda.</p>
            </div>
            <a href="#kontak" className="mt-6 bg-white text-blue-700 font-bold text-sm px-5 py-3 rounded-xl text-center block hover:bg-cyan-50 transition-colors">Hubungi Kami</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Portfolio() {
  const [active, setActive] = useState('semua')

  const filtered = active === 'semua'
    ? portfolioItems
    : portfolioItems.filter(p => p.category === active)

  return (
    <section id="portfolio" className="py-24 section-white reveal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="section-divider mx-auto mb-4"></div>
          <h2 className="text-4xl font-black text-gray-900">Portfolio <span className="gradient-text">Kami</span></h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filterButtons.map(btn => (
            <button
              key={btn.value}
              onClick={() => setActive(btn.value)}
              className="filter-btn px-5 py-2 rounded-xl text-sm font-semibold border transition-all"
              style={active === btn.value
                ? { background: '#2563eb', color: 'white', borderColor: '#2563eb' }
                : { background: '', color: '#4b5563', borderColor: '#e5e7eb' }}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div key={i} className="card-hover rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src={p.img} alt={p.alt} className="w-full h-64 object-cover" loading="lazy"/>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Klien() {
  return (
    <section className="py-20 section-gray reveal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="section-divider mx-auto mb-4"></div>
          <h2 className="text-4xl font-black text-gray-900">Klien <span className="gradient-text">Kami</span></h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Kami telah bekerja sama dengan berbagai perusahaan dan organisasi terkemuka.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clients.map((c, i) => (
            <div key={i} className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className={`${c.big ? 'h-20' : 'w-14 h-14'} flex items-center justify-center mx-auto mb-4`}>
                <img src={c.img} alt={c.name} className={`${c.big ? 'h-16' : 'h-12'} object-contain`}/>
              </div>
              <h4 className="font-bold text-gray-800 text-sm">{c.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Kontak() {
  const [form, setForm] = useState({ nama: '', email: '', layanan: '', pesan: '' })

  const send = () => {
    if (!form.nama || !form.email || !form.pesan) { alert('Mohon lengkapi semua field.'); return }
    const msg = `Halo CV Adhi Rajasa Satria%0ANama: ${encodeURIComponent(form.nama)}%0AEmail: ${encodeURIComponent(form.email)}%0ALayanan: ${encodeURIComponent(form.layanan)}%0APesan: ${encodeURIComponent(form.pesan)}`
    window.open(`https://wa.me/+6285641079055?text=${msg}`, '_blank')
  }

  return (
    <section id="kontak" className="py-24 section-white reveal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="section-divider mx-auto mb-4"></div>
          <h2 className="text-4xl font-black text-gray-900">Kontak <span className="gradient-text">Kami</span></h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-5">
            {[
              { color: 'bg-blue-600',  icon: 'fa-map-marker-alt', title: 'Alamat',              content: <p className="text-gray-600 text-sm">Kecamatan Ungaran Timur Kab. Semarang, Jawa Tengah</p> },
              { color: 'bg-green-600', icon: 'fa-whatsapp fab',    title: 'Telepon / WhatsApp',  content: <a href="tel:+6285641079055" className="text-green-600 font-semibold hover:underline">+62-856-4107-9055</a> },
              { color: 'bg-red-500',   icon: 'fa-envelope',        title: 'Email',               content: <a href="mailto:adhirajasasatria026@gmail.com" className="text-red-500 font-semibold hover:underline text-sm">adhirajasasatria026@gmail.com</a> },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-5 p-6 rounded-2xl bg-white/80 border border-gray-100">
                <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <i className={`fas ${item.icon} text-white`}></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  {item.content}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/80 rounded-3xl p-8 border border-gray-100">
            <h3 className="text-xl font-black text-gray-900 mb-6">Kirim Pesan</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                <input type="text" placeholder="Nama Anda" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 bg-white"/>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input type="email" placeholder="email@anda.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 bg-white"/>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Layanan</label>
                <select value={form.layanan} onChange={e => setForm({...form, layanan: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 bg-white">
                  <option value="">Pilih Layanan</option>
                  <option>Konsultasi Proyek</option>
                  <option>Kontruksi Bangunan</option>
                  <option>Instalasi Elektro &amp; Mekanikal</option>
                  <option>Pengadaan Barang &amp; Jasa</option>
                  <option>Layanan IT</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pesan</label>
                <textarea rows="4" placeholder="Deskripsikan kebutuhan Anda..." value={form.pesan} onChange={e => setForm({...form, pesan: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 resize-none bg-white"/>
              </div>
              <button onClick={send} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2">
                <i className="fas fa-paper-plane"></i> Kirim via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="gradient-bg text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-white/20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/images/logo.png" alt="Logo" className="h-10 w-auto brightness-0 invert" onError={e => e.target.style.display='none'}/>
              <div className="font-black">CV Adhi Rajasa Satria</div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">Kecamatan Ungaran Timur Kab. Semarang, Jawa Tengah</p>
            <div className="space-y-2 text-sm text-white/70">
              <div><i className="fas fa-phone mr-2 text-cyan-300"></i>+62-856-4107-9055</div>
              <div><i className="fas fa-envelope mr-2 text-cyan-300"></i>adhirajasasatria026@gmail.com</div>
            </div>
          </div>
          <div>
            <h4 className="font-black mb-5">Useful Links</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              {[['#home','Home'],['#tentang','Tentang Kami'],['#layanan','Layanan'],['#portfolio','Portofolio'],['#kontak','Kontak']].map(([href,label]) => (
                <li key={href}><a href={href} className="hover:text-white transition-colors">&#8250; {label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-5">Layanan</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              {['Jasa Konstruksi','Instalasi Elektrikal & Mekanikal','Pengadaan Barang dan Jasa','Layanan IT','Konsultasi Proyek'].map(s => (
                <li key={s}><a href="#layanan" className="hover:text-white transition-colors">&#8250; {s}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 text-center text-white/50 text-sm">&copy; Copyright CV Adhi Rajasa Satria. All Rights Reserved.</div>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  useScrollEffects()
  useReveal()

  return (
    <>
      <Navbar />
      <Hero />
      <VisiMisi />
      <Tentang />
      <Layanan />
      <Portfolio />
      <Klien />
      <Kontak />
      <Footer />

      <button
        id="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg flex items-center justify-center z-50"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  )
}