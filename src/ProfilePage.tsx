import { useState } from 'react'
import logoMark from '@/assets/logo-mark.png'
import heroBg from '@/assets/profile-hero-bg.avif'

/* ─── Data ──────────────────────────────────────────────────── */
const AGENT = {
  name: 'An Bình Land',
  initials: 'AB',
  title: 'Chuyên gia BĐS Đà Nẵng',
  location: 'Đà Nẵng',
  phone: '0905 123 456',
  phoneRaw: '0905123456',
  zalo: '0905123456',
  exp: '8 năm kinh nghiệm',
  deals: '150+ giao dịch',
  rating: '4.9',
  reviews: 38,
  bio: 'Chuyên tư vấn mua bán BĐS khu vực Đà Nẵng – Hòa Xuân – Ngũ Hành Sơn. Cam kết minh bạch, đúng giá, hỗ trợ pháp lý toàn trình.',
}

const TRUST = [
  { label: 'Năm kinh nghiệm', value: '8+' },
  { label: 'Giao dịch thành công', value: '150+' },
  { label: 'Đánh giá', value: '4.9 ★' },
  { label: 'Khách hàng giới thiệu', value: '70%' },
]

const COLLECTIONS = [
  {
    id: 1,
    label: 'Hot · 6 căn',
    title: 'Top Nhà Đẹp Hòa Xuân 4–5 Tỷ Cho Khách VIP',
    count: 6,
    hot: true,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    label: 'Tuyển chọn · 4 căn',
    title: 'Đất Nền Sổ Đỏ Ven Sông Cẩm Lệ & Nam Hòa Xuân',
    count: 4,
    hot: false,
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    label: 'Tuyển chọn · 4 căn',
    title: 'Biệt Thự & Nhà Vườn Nghỉ Dưỡng Ven Sông VIP',
    count: 4,
    hot: false,
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    label: 'Tuyển chọn · 4 căn',
    title: 'Nhà Phố & Căn Hộ Trung Tâm Hải Châu — Sơn Trà',
    count: 4,
    hot: false,
    img: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=600&q=80',
  },
]

const LISTINGS = [
  {
    id: 1,
    title: 'Nhà 3 tầng mặt tiền Hòa Xuân',
    price: '4.5 tỷ',
    area: '90m²',
    type: 'Nhà phố',
    tag: 'Hot',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Đất nền ven sông Cẩm Lệ',
    price: '1.8 tỷ',
    area: '120m²',
    type: 'Đất nền',
    tag: 'Sổ đỏ',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'Căn hộ cao cấp Sơn Trà',
    price: '3.2 tỷ',
    area: '75m²',
    type: 'Căn hộ',
    tag: 'Mới',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    title: 'Biệt thự vườn Ngũ Hành Sơn',
    price: '9.8 tỷ',
    area: '280m²',
    type: 'Biệt thự',
    tag: 'VIP',
    img: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    title: 'Nhà phố 4 tầng Hải Châu',
    price: '7.2 tỷ',
    area: '150m²',
    type: 'Nhà phố',
    tag: 'Chính chủ',
    img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    title: 'Đất đường 7.5m Nam Hòa Xuân',
    price: '2.1 tỷ',
    area: '100m²',
    type: 'Đất nền',
    tag: 'Sổ đỏ',
    img: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 7,
    title: 'Căn hộ 2PN view biển Mỹ Khê',
    price: '2.8 tỷ',
    area: '68m²',
    type: 'Căn hộ',
    tag: 'View biển',
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 8,
    title: 'Nhà vườn nghỉ dưỡng ven sông',
    price: '5.5 tỷ',
    area: '200m²',
    type: 'Nhà vườn',
    tag: 'Mới',
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80',
  },
]

const TAG_COLORS: Record<string, string> = {
  Hot: 'bg-red-50 text-red-600 border-red-100',
  VIP: 'bg-purple-50 text-purple-600 border-purple-100',
  Mới: 'bg-blue-50 text-blue-600 border-blue-100',
  'Sổ đỏ': 'bg-green-50 text-green-700 border-green-100',
  'Chính chủ': 'bg-amber-50 text-amber-700 border-amber-100',
  'View biển': 'bg-cyan-50 text-cyan-700 border-cyan-100',
}

/* ─── QR Modal ──────────────────────────────────────────────── */
function QRModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-xs w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-700 text-gray-900">Mã QR Profile</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500">
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/>
            </svg>
          </button>
        </div>
        <div className="w-48 h-48 mx-auto mb-5 bg-gray-50 rounded-2xl border border-gray-100 grid grid-cols-7 gap-0.5 p-3">
          {Array.from({ length: 49 }, (_, i) => {
            const pattern = [1,1,1,1,1,1,0, 1,0,0,0,0,1,0, 1,0,1,1,0,1,0, 1,0,0,0,0,1,0, 1,1,1,1,1,1,0, 0,0,1,0,1,0,1, 1,1,0,1,0,1,1]
            return <div key={i} className={`rounded-[1px] ${pattern[i] ? 'bg-gray-900' : ''}`} />
          })}
        </div>
        <p className="text-xs text-center text-gray-500">agentlink.vn/an-binh-land</p>
        <button className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white font-600 text-sm py-3 rounded-xl transition-colors">
          Lưu ảnh QR
        </button>
      </div>
    </div>
  )
}

/* ─── ProfilePage ───────────────────────────────────────────── */
export default function ProfilePage() {
  const [showQR, setShowQR] = useState(false)
  const [activeTab, setActiveTab] = useState<'listings' | 'collections'>('listings')
  const PER_PAGE = 8
  const paged = LISTINGS.slice(0, PER_PAGE)

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {showQR && <QRModal onClose={() => setShowQR(false)} />}

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src={logoMark} className="w-7 h-7 object-contain" alt="AgentLink" />
            <span className="font-700 text-gray-900 text-base">Agent<span className="text-green-600">Link</span></span>
          </a>

          {/* Mobile: QR + Share only */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setShowQR(true)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4.5 h-4.5">
                <rect x="2" y="2" width="7" height="7" rx="1"/><rect x="11" y="2" width="7" height="7" rx="1"/>
                <rect x="2" y="11" width="7" height="7" rx="1"/><rect x="13" y="13" width="5" height="5" rx="0.5"/>
                <path d="M11 13h2M13 11v2"/>
              </svg>
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4.5 h-4.5">
                <circle cx="15" cy="4" r="2"/><circle cx="5" cy="10" r="2"/><circle cx="15" cy="16" r="2"/>
                <path d="M7 11l6 4M13 5 7 9"/>
              </svg>
            </button>
          </div>

          {/* Desktop: Mã QR + Chia sẻ + phone */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setShowQR(true)}
              className="flex items-center gap-1.5 text-sm font-500 text-gray-600 hover:text-green-600 border border-gray-200 hover:border-green-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <rect x="1" y="1" width="6" height="6" rx="0.8"/><rect x="9" y="1" width="6" height="6" rx="0.8"/>
                <rect x="1" y="9" width="6" height="6" rx="0.8"/><rect x="11" y="11" width="4" height="4" rx="0.4"/>
                <path d="M9 11h2M11 9v2"/>
              </svg>
              Mã QR
            </button>
            <button className="flex items-center gap-1.5 text-sm font-500 text-gray-600 hover:text-green-600 border border-gray-200 hover:border-green-200 px-3 py-1.5 rounded-lg transition-colors">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <circle cx="12" cy="3" r="1.8"/><circle cx="4" cy="8" r="1.8"/><circle cx="12" cy="13" r="1.8"/>
                <path d="M5.7 9 10.3 12M10.3 4 5.7 7"/>
              </svg>
              Chia sẻ
            </button>
            <a
              href={`tel:${AGENT.phoneRaw}`}
              className="flex items-center gap-1.5 text-sm font-600 text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M1.5 2a1 1 0 0 1 1-1h1.6a1 1 0 0 1 .99.836l.55 3.3a1 1 0 0 1-.528 1.06l-1.16.58a8.83 8.83 0 0 0 4.874 4.874l.58-1.16a1 1 0 0 1 1.06-.528l3.3.55a1 1 0 0 1 .836.99V14a1 1 0 0 1-1 1H13C6.373 15 1 9.627 1 3V2Z"/>
              </svg>
              {AGENT.phone}
            </a>
          </div>
        </div>
      </nav>

      {/* ── Main ── */}
      <main className="pt-14 pb-20 lg:pb-0">

        {/* Cover */}
        <div className="relative h-44 sm:h-52 lg:h-64 overflow-hidden">
          <img src={heroBg} alt="Cover" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10" />
        </div>

        {/* Profile card */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl -mt-6 relative shadow-sm border border-gray-100 px-5 sm:px-8 pt-5 pb-6 mb-6">

            {/* Avatar + name row */}
            <div className="flex items-end gap-4 -mt-16 mb-5">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-white font-800 text-2xl lg:text-3xl ring-4 ring-white shadow-lg">
                  {AGENT.initials}
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <svg viewBox="0 0 12 12" fill="white" className="w-3 h-3">
                    <path d="M10 3L5 8.5 2 5.5l1-1 2 2 4-4.5 1 1z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0 pb-1">
                <h1 className="text-xl lg:text-2xl font-800 text-gray-900 leading-tight">{AGENT.name}</h1>
                <span className="text-xs text-green-600 font-600">✓ Đã xác minh · AgentLink</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-600 leading-relaxed mb-5 max-w-2xl">{AGENT.bio}</p>

            {/* Trust stats */}
            <div className="flex flex-wrap gap-4 mb-5">
              {TRUST.map(t => (
                <div key={t.label} className="flex flex-col">
                  <span className="text-lg font-800 text-gray-900">{t.value}</span>
                  <span className="text-xs text-gray-500">{t.label}</span>
                </div>
              ))}
            </div>

            {/* Badges row */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-2.5 py-1.5 rounded-full">
                <svg viewBox="0 0 14 14" fill="none" stroke="#9CA3AF" strokeWidth="1.5" className="w-3 h-3">
                  <circle cx="7" cy="5.5" r="2.2"/><path d="M2 12.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5"/>
                </svg>
                {AGENT.location}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-100 px-2.5 py-1.5 rounded-full">
                <svg viewBox="0 0 14 14" fill="#16A34A" className="w-3 h-3">
                  <path d="M7 1l1.5 3.1L12 4.7l-2.5 2.4.6 3.4L7 8.9 3.9 10.5l.6-3.4L2 4.7l3.5-.6z"/>
                </svg>
                Môi giới uy tín AgentLink
              </span>
            </div>

            {/* 3 CTAs — desktop only, own line below badges */}
            <div className="hidden lg:flex items-center gap-2 mb-5">
              <a
                href={`tel:${AGENT.phoneRaw}`}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-700 text-sm px-5 py-2.5 rounded-xl transition-colors shadow-sm shadow-green-200/60"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                  <path d="M2 3a1 1 0 0 1 1-1h2.153a1 1 0 0 1 .986.836l.74 4.435a1 1 0 0 1-.54 1.06l-1.548.773a11.037 11.037 0 0 0 6.105 6.105l.774-1.548a1 1 0 0 1 1.059-.54l4.435.74a1 1 0 0 1 .836.986V17a1 1 0 0 1-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                Gọi ngay
              </a>
              <a
                href={`https://zalo.me/${AGENT.zalo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-700 text-sm px-5 py-2.5 rounded-xl transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 2.54.94 4.86 2.5 6.63L3 22l3.67-1.33A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
                Nhắn Zalo
              </a>
              <button className="flex items-center gap-2 border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700 hover:text-green-700 font-700 text-sm px-5 py-2.5 rounded-xl transition-colors">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 flex-shrink-0">
                  <path d="M2 10c0-3.5 3-6.5 8-6.5s8 3 8 6.5-3.5 6.5-8 6.5c-.8 0-1.6-.1-2.3-.3L3 18l.5-3A6.3 6.3 0 0 1 2 10z"/>
                </svg>
                Gửi nhu cầu
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-5 bg-white rounded-xl p-1 border border-gray-100 shadow-sm w-fit">
            {(['listings', 'collections'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-600 px-5 py-2 rounded-lg transition-colors ${activeTab === tab ? 'bg-green-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab === 'listings' ? 'BĐS đang bán' : 'Bộ sưu tập'}
              </button>
            ))}
          </div>

          {/* Listings grid */}
          {activeTab === 'listings' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {paged.map(l => (
                <div key={l.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-200 cursor-pointer">
                  <div className="relative h-44 bg-gray-100 overflow-hidden">
                    <img
                      src={l.img}
                      alt={l.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-700 px-2 py-1 rounded-full border ${TAG_COLORS[l.tag] ?? 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                        {l.tag}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs font-600 px-2 py-1 rounded-full">
                      {l.type}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-700 text-gray-900 leading-snug mb-2 line-clamp-2">{l.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-800 text-green-600">{l.price}</span>
                      <span className="text-xs text-gray-400">{l.area}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Collections grid */}
          {activeTab === 'collections' && (
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {COLLECTIONS.map(c => (
                <div key={c.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-200 cursor-pointer flex">
                  <div className="relative w-28 sm:w-36 flex-shrink-0 overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {c.hot && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-700 px-1.5 py-0.5 rounded-full">🔥 Hot</div>
                    )}
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                    <div>
                      <span className="text-xs text-gray-400 font-500 mb-1 block">{c.label}</span>
                      <h3 className="text-sm font-700 text-gray-900 leading-snug line-clamp-2">{c.title}</h3>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-green-700 bg-green-50 border border-green-100 px-2 py-1 rounded-full font-600">{c.count} căn</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        Xem bộ sưu tập
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                          <path d="M3 8h10M9 4l4 4-4 4"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Mobile fixed bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 px-4 py-3 flex gap-2 shadow-lg">
        <a
          href={`tel:${AGENT.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white font-700 text-sm py-3 rounded-xl transition-colors"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0">
            <path d="M2 3a1 1 0 0 1 1-1h2.153a1 1 0 0 1 .986.836l.74 4.435a1 1 0 0 1-.54 1.06l-1.548.773a11.037 11.037 0 0 0 6.105 6.105l.774-1.548a1 1 0 0 1 1.059-.54l4.435.74a1 1 0 0 1 .836.986V17a1 1 0 0 1-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
          </svg>
          Gọi ngay
        </a>
        <a
          href={`https://zalo.me/${AGENT.zalo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white font-700 text-sm py-3 rounded-xl transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 2.54.94 4.86 2.5 6.63L3 22l3.67-1.33A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
          </svg>
          Nhắn Zalo
        </a>
        <button className="flex-1 flex items-center justify-center gap-1.5 border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700 font-700 text-sm py-3 rounded-xl transition-colors">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 flex-shrink-0">
            <path d="M2 10c0-3.5 3-6.5 8-6.5s8 3 8 6.5-3.5 6.5-8 6.5c-.8 0-1.6-.1-2.3-.3L3 18l.5-3A6.3 6.3 0 0 1 2 10z"/>
          </svg>
          Gửi nhu cầu
        </button>
      </div>
    </div>
  )
}
