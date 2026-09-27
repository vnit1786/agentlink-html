import { useState } from 'react'
import logoMark from '@/assets/logo-mark.png'
import heroBg from '@/assets/profile-hero-bg.avif'

/* ─── Data ──────────────────────────────────────────────────── */
const AGENT = {
  name: 'An Bình Land',
  phone: '0986 825 145',
  phoneRaw: '0986825145',
  zalo: '0986825145',
  rating: 4.9,
  reviewCount: 48,
  responseTime: '15 phút',
  deals: '100+',
  bio: 'Chuyên tư vấn mua bán BĐS khu vực Hòa Xuân – Cẩm Lệ – Ngũ Hành Sơn. Cam kết minh bạch, đúng giá, hỗ trợ pháp lý toàn trình từ khi xem nhà đến khi nhận sổ.',
  location: 'Đà Nẵng',
  listingCount: 8,
  collectionCount: 1,
  soldCount: 0,
}

const LISTINGS = [
  {
    id: 1,
    title: 'Nhà 3 tầng mặt tiền đường 7.5m Hòa Xuân – Tặng nội thất cao cấp',
    price: 5400,
    priceUnit: 'tỷ',
    pricePerM2: '61',
    area: 88,
    beds: 4,
    road: 7.5,
    district: 'Cẩm Lệ, Đà Nẵng',
    badges: ['Đã xác minh', 'Đang bán', 'Sẵn sổ', 'Nổi bật'],
    img: 'https://images.unsplash.com/photo-1787059671563-ef53c92ba0e7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Đất nền sổ đỏ ven sông Cẩm Lệ – đường thông, ô tô đỗ cửa',
    price: 1850,
    priceUnit: 'triệu/m²',
    pricePerM2: '18.5',
    area: 100,
    beds: 0,
    road: 5.5,
    district: 'Cẩm Lệ, Đà Nẵng',
    badges: ['Đã xác minh', 'Đang bán', 'Sẵn sổ'],
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Căn hộ 2PN view sông Hàn – tầng cao thoáng mát, bàn giao hoàn thiện',
    price: 3200,
    priceUnit: 'triệu',
    pricePerM2: '46',
    area: 70,
    beds: 2,
    road: 0,
    district: 'Sơn Trà, Đà Nẵng',
    badges: ['Đã xác minh', 'Đang bán'],
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Biệt thự sân vườn Ngũ Hành Sơn – hồ bơi riêng, nội thất Âu',
    price: 9800,
    priceUnit: 'triệu',
    pricePerM2: '35',
    area: 280,
    beds: 5,
    road: 10.5,
    district: 'Ngũ Hành Sơn, Đà Nẵng',
    badges: ['Đã xác minh', 'Đang bán', 'Nổi bật'],
    img: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Nhà phố 4 tầng trung tâm Hải Châu – kinh doanh tầng 1',
    price: 7200,
    priceUnit: 'triệu',
    pricePerM2: '48',
    area: 150,
    beds: 4,
    road: 7.5,
    district: 'Hải Châu, Đà Nẵng',
    badges: ['Đã xác minh', 'Đang bán', 'Sẵn sổ'],
    img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Lô đất đường 5.5m Nam Hòa Xuân – pháp lý chuẩn, giá tốt nhất khu',
    price: 2100,
    priceUnit: 'triệu',
    pricePerM2: '21',
    area: 100,
    beds: 0,
    road: 5.5,
    district: 'Cẩm Lệ, Đà Nẵng',
    badges: ['Đã xác minh', 'Đang bán', 'Sẵn sổ'],
    img: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    title: 'Căn hộ 2PN view biển Mỹ Khê – tầng 18, full nội thất',
    price: 2800,
    priceUnit: 'triệu',
    pricePerM2: '41',
    area: 68,
    beds: 2,
    road: 0,
    district: 'Sơn Trà, Đà Nẵng',
    badges: ['Đã xác minh', 'Đang bán', 'Nổi bật'],
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    title: 'Nhà vườn nghỉ dưỡng ven sông – khuôn viên 200m² sân rộng',
    price: 5500,
    priceUnit: 'triệu',
    pricePerM2: '27.5',
    area: 200,
    beds: 3,
    road: 6,
    district: 'Cẩm Lệ, Đà Nẵng',
    badges: ['Đã xác minh', 'Đang bán'],
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
  },
]

const COLLECTIONS = [
  {
    id: 1,
    label: 'Hot · 2 căn',
    hot: true,
    title: 'Nguồn hàng chính chủ Hòa Xuân 4–5 Tỷ',
    tag: 'Nguồn hàng chính chủ',
    count: 2,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    label: 'Tuyển chọn · 4 căn',
    hot: false,
    title: 'Đất Nền Sổ Đỏ Ven Sông Cẩm Lệ & Nam Hòa Xuân',
    tag: 'Đầu tư sinh lời',
    count: 4,
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    label: 'Tuyển chọn · 3 căn',
    hot: false,
    title: 'Biệt Thự & Nhà Vườn Nghỉ Dưỡng Ven Sông VIP',
    tag: 'Cao cấp',
    count: 3,
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80',
  },
]

const TRUST_PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    title: 'Pháp lý minh bạch 100%',
    body: 'Mọi BĐS đều được kiểm tra pháp lý trước khi tư vấn. Không có rủi ro ẩn.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Giá chuẩn chính chủ',
    body: 'Giá niêm yết là giá thật từ chủ nhà. Không thêm phí ẩn hay chênh lệch trung gian.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Đồng hành trọn gói',
    body: 'Từ xem nhà, thương lượng, công chứng đến nhận sổ — tôi hỗ trợ từng bước.',
  },
]

/* ─── Badge color map ───────────────────────────────────────── */
const BADGE: Record<string, string> = {
  'Đã xác minh': 'bg-green-500 text-white',
  'Đang bán': 'bg-blue-500 text-white',
  'Sẵn sổ': 'bg-amber-400 text-white',
  'Nổi bật': 'bg-red-500 text-white',
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
        <div className="w-44 h-44 mx-auto mb-5 bg-gray-50 rounded-2xl border border-gray-100 grid grid-cols-7 gap-0.5 p-3">
          {Array.from({ length: 49 }, (_, i) => {
            const pat = [1,1,1,1,1,1,0, 1,0,0,0,0,1,0, 1,0,1,1,0,1,0, 1,0,0,0,0,1,0, 1,1,1,1,1,1,0, 0,0,1,0,1,0,1, 1,1,0,1,0,1,1]
            return <div key={i} className={`rounded-[1px] ${pat[i] ? 'bg-gray-900' : ''}`} />
          })}
        </div>
        <p className="text-xs text-center text-gray-500 mb-5">agentlink.vn/an-binh-land</p>
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-600 text-sm py-3 rounded-xl transition-colors">
          Lưu ảnh QR
        </button>
      </div>
    </div>
  )
}

/* ─── Star rating ───────────────────────────────────────────── */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} viewBox="0 0 12 12" fill={i <= Math.round(rating) ? '#F59E0B' : '#E5E7EB'} className="w-3 h-3">
          <path d="M6 1l1.2 2.5L10 4l-2 1.9.5 2.6L6 7.3 3.5 8.5l.5-2.6L2 4l2.8-.5L6 1z"/>
        </svg>
      ))}
    </span>
  )
}

/* ─── Listing card ──────────────────────────────────────────── */
function ListingCard({ l }: { l: typeof LISTINGS[0] }) {
  const priceLabel = l.priceUnit === 'tỷ'
    ? `${(l.price / 1000).toFixed(1).replace(/\.0$/, '')} tỷ`
    : l.priceUnit === 'triệu/m²'
    ? `${l.price.toLocaleString()} triệu/m²`
    : `${(l.price / 1000).toFixed(1).replace(/\.0$/, '')} tỷ`

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-green-100 transition-all duration-200 cursor-pointer">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img src={l.img} alt={l.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {/* Badges top-left stack */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {l.badges.slice(0, 3).map(b => (
            <span key={b} className={`text-[10px] font-700 px-2 py-0.5 rounded-full ${BADGE[b] ?? 'bg-gray-500 text-white'}`}>{b}</span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-800 text-green-600">{priceLabel}</span>
          <span className="text-xs text-gray-400">{l.pricePerM2} tr/m²</span>
        </div>
        <h3 className="text-sm font-600 text-gray-900 leading-snug mb-3 line-clamp-2">{l.title}</h3>

        {/* Specs */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 flex-shrink-0">
              <rect x="1" y="8" width="14" height="7" rx="1"/><path d="M1 8V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/>
              <path d="M5 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"/>
            </svg>
            {l.area} m²
          </span>
          {l.beds > 0 && (
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 flex-shrink-0">
                <path d="M1 6h14v5H1zM1 11v2M15 11v2M3 6V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2"/>
              </svg>
              {l.beds} PN
            </span>
          )}
          {l.road > 0 && (
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 flex-shrink-0">
                <path d="M2 14 5 2M11 2l3 12M5 2h6M6 8h4"/>
              </svg>
              Đường {l.road}m
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <svg viewBox="0 0 14 14" fill="none" stroke="#9CA3AF" strokeWidth="1.4" className="w-3 h-3">
              <circle cx="7" cy="5.5" r="2.2"/><path d="M2 12.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5"/>
            </svg>
            {l.district}
          </span>
          <span className="text-xs text-green-600 font-600 flex items-center gap-0.5">
            Chi tiết
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
              <path d="M2 6h8M7 3l3 3-3 3"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── ProfilePage ───────────────────────────────────────────── */
export default function ProfilePage() {
  const [showQR, setShowQR] = useState(false)
  const [filter, setFilter] = useState<'all' | 'sell' | 'rent'>('all')
  const [activeSection, setActiveSection] = useState<'listings' | 'collections'>('listings')

  const filtered = filter === 'all' ? LISTINGS : LISTINGS.filter(l => filter === 'sell')

  return (
    <div className="min-h-screen bg-[#F5F6F8]" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {showQR && <QRModal onClose={() => setShowQR(false)} />}

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src={logoMark} className="w-7 h-7 object-contain" alt="AgentLink" />
            <span className="font-700 text-gray-900 text-[15px]">Agent<span className="text-green-600">Link</span></span>
          </a>

          {/* Mobile: QR + Share */}
          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={() => setShowQR(true)} className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:border-green-200 hover:text-green-600 transition-colors">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4.5 h-4.5">
                <rect x="2" y="2" width="7" height="7" rx="1"/><rect x="11" y="2" width="7" height="7" rx="1"/>
                <rect x="2" y="11" width="7" height="7" rx="1"/><rect x="13" y="13" width="5" height="5" rx="0.5"/>
              </svg>
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:border-green-200 hover:text-green-600 transition-colors">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4.5 h-4.5">
                <circle cx="15" cy="4" r="2"/><circle cx="5" cy="10" r="2"/><circle cx="15" cy="16" r="2"/>
                <path d="M7 9 13 5M7 11l6 4"/>
              </svg>
            </button>
          </div>

          {/* Desktop: Share + QR + phone */}
          <div className="hidden lg:flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-lg transition-colors">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                <circle cx="12" cy="3" r="1.8"/><circle cx="4" cy="8" r="1.8"/><circle cx="12" cy="13" r="1.8"/>
                <path d="M5.7 9 10.3 12M10.3 4 5.7 7"/>
              </svg>
              Chia sẻ
            </button>
            <button onClick={() => setShowQR(true)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-lg transition-colors">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                <rect x="1" y="1" width="6" height="6" rx="0.6"/><rect x="9" y="1" width="6" height="6" rx="0.6"/>
                <rect x="1" y="9" width="6" height="6" rx="0.6"/><rect x="11" y="11" width="4" height="4" rx="0.3"/>
              </svg>
              Mã QR
            </button>
            <a href={`tel:${AGENT.phoneRaw}`} className="flex items-center gap-1.5 text-sm font-600 text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors">
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M1.5 2a1 1 0 0 1 1-1h1.6a1 1 0 0 1 .99.836l.55 3.3a1 1 0 0 1-.528 1.06l-1.16.58a8.83 8.83 0 0 0 4.874 4.874l.58-1.16a1 1 0 0 1 1.06-.528l3.3.55a1 1 0 0 1 .836.99V14a1 1 0 0 1-1 1H13C6.373 15 1 9.627 1 3V2Z"/>
              </svg>
              {AGENT.phone}
            </a>
          </div>
        </div>
      </nav>

      {/* ── Content ── */}
      <div className="pt-14 pb-24 lg:pb-8">
        <div className="max-w-5xl mx-auto">

          {/* Cover photo */}
          <div className="relative h-44 sm:h-56 lg:h-64 overflow-hidden">
            <img src={heroBg} alt="Cover" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* White profile card */}
          <div className="mx-4 sm:mx-6 bg-white rounded-2xl -mt-8 relative shadow-sm border border-gray-100 px-5 sm:px-8 pt-4 pb-6 mb-4">

            {/* Avatar row — circular overlap */}
            <div className="flex items-start gap-4 -mt-14 mb-4">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 border-4 border-white shadow-lg flex items-center justify-center text-white font-800 text-2xl select-none">
                  AB
                </div>
                {/* Verified dot */}
                <div className="absolute bottom-1 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <svg viewBox="0 0 12 12" fill="white" className="w-3 h-3">
                    <path d="M10 3L5 8.5 2 5.5l1-1 2 2 4-4.5 1 1z"/>
                  </svg>
                </div>
              </div>

              {/* Name + meta */}
              <div className="pt-10 lg:pt-12 flex-1 min-w-0">
                <h1 className="text-xl lg:text-2xl font-800 text-gray-900 leading-tight">{AGENT.name}</h1>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <span className="flex items-center gap-1">
                    <Stars rating={AGENT.rating} />
                    <span className="text-sm font-600 text-gray-700">{AGENT.rating}/5</span>
                    <span className="text-xs text-gray-400">({AGENT.reviewCount})</span>
                  </span>
                  <span className="w-px h-4 bg-gray-200" />
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <svg viewBox="0 0 14 14" fill="none" stroke="#9CA3AF" strokeWidth="1.5" className="w-3 h-3">
                      <circle cx="7" cy="7" r="5.5"/><path d="M7 4v3l2 1"/>
                    </svg>
                    Phản hồi trong {AGENT.responseTime}
                  </span>
                  <span className="w-px h-4 bg-gray-200" />
                  <span className="text-xs text-gray-500">{AGENT.deals} giao dịch</span>
                </div>
              </div>
            </div>

            {/* Location badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-2.5 py-1.5 rounded-full">
                <svg viewBox="0 0 14 14" fill="none" stroke="#9CA3AF" strokeWidth="1.5" className="w-3 h-3">
                  <circle cx="7" cy="5.5" r="2.2"/><path d="M2 12.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5"/>
                </svg>
                {AGENT.location}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-100 px-2.5 py-1.5 rounded-full font-600">
                <svg viewBox="0 0 12 12" fill="#16A34A" className="w-2.5 h-2.5">
                  <path d="M6 0l1.3 2.7L10 3.5l-2 2 .5 2.8L6 7l-2.5 1.3.5-2.8-2-2L4.7 2.7z"/>
                </svg>
                Môi giới uy tín AgentLink
              </span>
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-600 leading-relaxed mb-5 max-w-2xl">{AGENT.bio}</p>

            {/* 4 CTA buttons */}
            <div className="hidden lg:flex flex-wrap items-center gap-2">
              <a href={`tel:${AGENT.phoneRaw}`} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-700 text-sm px-5 py-2.5 rounded-xl transition-colors shadow-sm">
                <svg viewBox="0 0 18 18" fill="currentColor" className="w-4 h-4">
                  <path d="M1.5 2A1 1 0 0 1 2.5 1h1.9a1 1 0 0 1 .99.836l.65 3.9a1 1 0 0 1-.54 1.06L4.35 7.4a9.8 9.8 0 0 0 5.25 5.25l1.6-1.15a1 1 0 0 1 1.06-.54l3.9.65a1 1 0 0 1 .84.99V14.5a1 1 0 0 1-1 1H15C7.54 15.5 1.5 9.46 1.5 2Z"/>
                </svg>
                Gọi ngay
              </a>
              <a href={`https://zalo.me/${AGENT.zalo}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0068FF] hover:bg-blue-700 text-white font-700 text-sm px-5 py-2.5 rounded-xl transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 2.54.94 4.86 2.5 6.63L3 22l3.67-1.33A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
                Nhắn Zalo
              </a>
              <button className="flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 font-600 text-sm px-5 py-2.5 rounded-xl transition-colors bg-white">
                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4">
                  <path d="M15 3H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"/>
                  <path d="M9 7v4M7 9h4"/>
                </svg>
                Lưu danh bạ
              </button>
              <button className="flex items-center gap-2 border border-green-300 hover:bg-green-50 text-green-700 font-600 text-sm px-5 py-2.5 rounded-xl transition-colors bg-white">
                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4">
                  <path d="M2 9c0-3.5 3-6.5 7-6.5s7 3 7 6.5-3 6.5-7 6.5c-.8 0-1.5-.1-2.2-.3L2 17l.5-3A6 6 0 0 1 2 9z"/>
                </svg>
                Gửi nhu cầu
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="mx-4 sm:mx-6 grid grid-cols-3 bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 overflow-hidden">
            {[
              { label: 'BĐS đang đăng', value: AGENT.listingCount },
              { label: 'Bộ sưu tập', value: AGENT.collectionCount },
              { label: 'Đã bán', value: AGENT.soldCount },
            ].map((s, i) => (
              <div key={s.label} className={`flex flex-col items-center py-4 ${i < 2 ? 'border-r border-gray-100' : ''}`}>
                <span className="text-xl font-800 text-gray-900">{s.value}</span>
                <span className="text-xs text-gray-400 mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Section nav */}
          <div className="mx-4 sm:mx-6 flex items-center gap-1 mb-4">
            {(['listings', 'collections'] as const).map(s => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`text-sm font-600 px-5 py-2 rounded-xl transition-colors ${activeSection === s ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-gray-500 hover:text-gray-700 border border-gray-100'}`}
              >
                {s === 'listings' ? `BĐS đang bán (${AGENT.listingCount})` : `Bộ sưu tập (${AGENT.collectionCount})`}
              </button>
            ))}
          </div>

          {/* Listings section */}
          {activeSection === 'listings' && (
            <div className="mx-4 sm:mx-6">
              {/* Filter bar */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 flex flex-wrap items-center gap-2 mb-4">
                <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-0.5">
                  {([['all','Tất cả'], ['sell','Bán'], ['rent','Cho thuê']] as const).map(([v, l]) => (
                    <button key={v} onClick={() => setFilter(v)} className={`text-xs font-600 px-3 py-1.5 rounded-lg transition-colors ${filter === v ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>{l}</button>
                  ))}
                </div>
                <select className="text-xs text-gray-600 border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white outline-none">
                  <option>Loại BĐS</option>
                  <option>Nhà phố</option>
                  <option>Đất nền</option>
                  <option>Căn hộ</option>
                  <option>Biệt thự</option>
                </select>
                <select className="text-xs text-gray-600 border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white outline-none">
                  <option>Khoảng giá</option>
                  <option>Dưới 2 tỷ</option>
                  <option>2 – 5 tỷ</option>
                  <option>5 – 10 tỷ</option>
                  <option>Trên 10 tỷ</option>
                </select>
                <select className="ml-auto text-xs text-gray-600 border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white outline-none">
                  <option>Mới nhất</option>
                  <option>Giá tăng dần</option>
                  <option>Giá giảm dần</option>
                  <option>Diện tích lớn nhất</option>
                </select>
              </div>

              {/* 4-column grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {filtered.map(l => <ListingCard key={l.id} l={l} />)}
              </div>
            </div>
          )}

          {/* Collections section */}
          {activeSection === 'collections' && (
            <div className="mx-4 sm:mx-6 mb-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {COLLECTIONS.map(c => (
                  <div key={c.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-green-100 transition-all cursor-pointer">
                    <div className="relative h-40 overflow-hidden">
                      <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {c.hot && (
                        <span className="absolute top-3 left-3 text-[10px] font-700 bg-red-500 text-white px-2 py-0.5 rounded-full">🔥 {c.label}</span>
                      )}
                      {!c.hot && (
                        <span className="absolute top-3 left-3 text-[10px] font-700 bg-black/50 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">{c.label}</span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-700 text-gray-900 leading-snug mb-2 line-clamp-2">{c.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full font-600">{c.tag}</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          {c.count} căn
                          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
                            <path d="M2 6h8M7 3l3 3-3 3"/>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust pillars */}
          <div className="mx-4 sm:mx-6 mb-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-sm font-700 text-gray-400 uppercase tracking-widest mb-5">Cam kết của An Bình Land</h2>
              <div className="grid sm:grid-cols-3 gap-5">
                {TRUST_PILLARS.map(t => (
                  <div key={t.title} className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                      {t.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-700 text-gray-900 mb-1">{t.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{t.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lead capture CTA */}
          <div className="mx-4 sm:mx-6 mb-6">
            <div className="bg-green-600 rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-white font-700 text-base lg:text-lg mb-1">Có nhu cầu về BĐS Đà Nẵng?</h2>
                <p className="text-green-100 text-sm">Mô tả ngắn và tôi sẽ tư vấn chính xác những gì phù hợp.</p>
              </div>
              <button className="flex-shrink-0 flex items-center gap-2 bg-white text-green-700 font-700 text-sm px-6 py-3 rounded-xl hover:bg-green-50 transition-colors">
                Gửi nhu cầu cho An Bình Land
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Mobile fixed bottom bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 px-4 py-3 flex gap-2 shadow-lg">
        <a href={`tel:${AGENT.phoneRaw}`} className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white font-700 text-sm py-3 rounded-xl transition-colors">
          <svg viewBox="0 0 18 18" fill="currentColor" className="w-4 h-4">
            <path d="M1.5 2A1 1 0 0 1 2.5 1h1.9a1 1 0 0 1 .99.836l.65 3.9a1 1 0 0 1-.54 1.06L4.35 7.4a9.8 9.8 0 0 0 5.25 5.25l1.6-1.15a1 1 0 0 1 1.06-.54l3.9.65a1 1 0 0 1 .84.99V14.5a1 1 0 0 1-1 1H15C7.54 15.5 1.5 9.46 1.5 2Z"/>
          </svg>
          Gọi ngay
        </a>
        <a href={`https://zalo.me/${AGENT.zalo}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 bg-[#0068FF] hover:bg-blue-700 text-white font-700 text-sm py-3 rounded-xl transition-colors">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 2.54.94 4.86 2.5 6.63L3 22l3.67-1.33A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
          </svg>
          Nhắn Zalo
        </a>
        <button className="flex-1 flex items-center justify-center gap-1.5 border-2 border-green-200 hover:bg-green-50 text-green-700 font-700 text-sm py-3 rounded-xl transition-colors bg-white">
          <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <path d="M2 9c0-3.5 3-6.5 7-6.5s7 3 7 6.5-3 6.5-7 6.5c-.8 0-1.5-.1-2.2-.3L2 17l.5-3A6 6 0 0 1 2 9z"/>
          </svg>
          Gửi nhu cầu
        </button>
      </div>
    </div>
  )
}
