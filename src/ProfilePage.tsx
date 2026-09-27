import { useState, useRef } from 'react'
import logoMark from '@/assets/logo-mark.png'
import heroBg from '@/assets/profile-hero-bg.avif'

/* ─── Data ───────────────────────────────────────────────────── */
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
  collectionCount: 3,
  soldCount: 0,
}

const LISTINGS = [
  { id: 1, title: 'Nhà 3 tầng mặt tiền đường 7.5m Hòa Xuân – Tặng nội thất cao cấp', price: '5,4 tỷ', priceM2: '61 tr/m²', area: 88, beds: 4, wc: 4, road: 7.5, district: 'Cẩm Lệ, Đà Nẵng', type: 'Bán', badges: ['Đã xác minh', 'Sẵn sổ', 'Nổi bật'], img: 'https://images.unsplash.com/photo-1787059671563-ef53c92ba0e7?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Đất nền sổ đỏ ven sông Cẩm Lệ – đường thông, ô tô đỗ cửa', price: '2,1 tỷ', priceM2: '21 tr/m²', area: 100, beds: 0, wc: 0, road: 5.5, district: 'Cẩm Lệ, Đà Nẵng', type: 'Bán', badges: ['Đã xác minh', 'Sẵn sổ'], img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Căn hộ 2PN view sông Hàn – tầng cao thoáng mát, bàn giao hoàn thiện', price: '3,2 tỷ', priceM2: '46 tr/m²', area: 70, beds: 2, wc: 2, road: 0, district: 'Sơn Trà, Đà Nẵng', type: 'Bán', badges: ['Đã xác minh'], img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'Biệt thự sân vườn Ngũ Hành Sơn – hồ bơi riêng, nội thất Âu', price: '9,8 tỷ', priceM2: '35 tr/m²', area: 280, beds: 5, wc: 5, road: 10.5, district: 'Ngũ Hành Sơn, Đà Nẵng', type: 'Bán', badges: ['Đã xác minh', 'Nổi bật'], img: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Nhà phố 4 tầng trung tâm Hải Châu – kinh doanh tầng 1', price: '7,2 tỷ', priceM2: '48 tr/m²', area: 150, beds: 4, wc: 4, road: 7.5, district: 'Hải Châu, Đà Nẵng', type: 'Bán', badges: ['Đã xác minh', 'Sẵn sổ'], img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Lô đất đường 5.5m Nam Hòa Xuân – pháp lý chuẩn, giá tốt nhất khu', price: '1,85 tỷ', priceM2: '18.5 tr/m²', area: 100, beds: 0, wc: 0, road: 5.5, district: 'Cẩm Lệ, Đà Nẵng', type: 'Bán', badges: ['Đã xác minh', 'Sẵn sổ'], img: 'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?auto=format&fit=crop&w=800&q=80' },
  { id: 7, title: 'Căn hộ 2PN view biển Mỹ Khê – tầng 18, full nội thất', price: '2,8 tỷ', priceM2: '41 tr/m²', area: 68, beds: 2, wc: 2, road: 0, district: 'Sơn Trà, Đà Nẵng', type: 'Bán', badges: ['Đã xác minh', 'Nổi bật'], img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80' },
  { id: 8, title: 'Nhà vườn nghỉ dưỡng ven sông – khuôn viên 200m² sân rộng', price: '5,5 tỷ', priceM2: '27.5 tr/m²', area: 200, beds: 3, wc: 3, road: 6, district: 'Cẩm Lệ, Đà Nẵng', type: 'Bán', badges: ['Đã xác minh'], img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80' },
]

const COLLECTIONS = [
  { id: 1, label: 'Hot · 2 căn', hot: true, title: 'Nguồn hàng chính chủ Hòa Xuân 4–5 Tỷ', tag: 'Nguồn hàng chính chủ', count: 2, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' },
  { id: 2, label: 'Tuyển chọn · 4 căn', hot: false, title: 'Đất Nền Sổ Đỏ Ven Sông Cẩm Lệ & Nam Hòa Xuân', tag: 'Đầu tư sinh lời', count: 4, img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80' },
  { id: 3, label: 'Tuyển chọn · 3 căn', hot: false, title: 'Biệt Thự & Nhà Vườn Nghỉ Dưỡng Ven Sông VIP', tag: 'Cao cấp', count: 3, img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80' },
]

/* ─── Filter state type ───────────────────────────────────────── */
type FilterState = {
  keyword: string
  txType: 'all' | 'sell' | 'rent'
  propTypes: string[]
  priceRange: string
  area: string
  beds: string
  direction: string
  legalReady: boolean
  verified: boolean
  sort: string
}

const DEFAULT_FILTER: FilterState = {
  keyword: '', txType: 'all', propTypes: [], priceRange: 'all',
  area: 'all', beds: 'all', direction: 'all', legalReady: false, verified: false, sort: 'newest',
}

/* ─── Star rating ─────────────────────────────────────────────── */
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

/* ─── QR Modal ────────────────────────────────────────────────── */
function QRModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-xs w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-700 text-gray-900">Mã QR Profile</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/></svg>
          </button>
        </div>
        <div className="w-44 h-44 mx-auto mb-4 bg-gray-50 rounded-2xl border border-gray-100 grid grid-cols-7 gap-0.5 p-3">
          {Array.from({ length: 49 }, (_, i) => {
            const pat = [1,1,1,1,1,1,0, 1,0,0,0,0,1,0, 1,0,1,1,0,1,0, 1,0,0,0,0,1,0, 1,1,1,1,1,1,0, 0,0,1,0,1,0,1, 1,1,0,1,0,1,1]
            return <div key={i} className={`rounded-[1px] ${pat[i] ? 'bg-gray-900' : ''}`} />
          })}
        </div>
        <p className="text-xs text-center text-gray-400 mb-5">agentlink.vn/an-binh-land</p>
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-600 text-sm py-3 rounded-xl transition-colors">Lưu ảnh QR</button>
      </div>
    </div>
  )
}

/* ─── Filter Drawer ───────────────────────────────────────────── */
function FilterDrawer({ filter, onApply, onClose }: {
  filter: FilterState
  onApply: (f: FilterState) => void
  onClose: () => void
}) {
  const [draft, setDraft] = useState<FilterState>({ ...filter })
  const up = (patch: Partial<FilterState>) => setDraft(d => ({ ...d, ...patch }))

  const toggleProp = (p: string) =>
    setDraft(d => ({ ...d, propTypes: d.propTypes.includes(p) ? d.propTypes.filter(x => x !== p) : [...d.propTypes, p] }))

  const chip = (label: string, active: boolean, onClick: () => void) => (
    <button key={label} onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border font-500 transition-colors ${active ? 'bg-green-700 text-white border-green-700' : 'bg-white text-gray-700 border-gray-200 hover:border-green-400'}`}>
      {label}
    </button>
  )

  const section = (title: string, children: React.ReactNode) => (
    <div className="mb-5">
      <p className="text-[10px] font-700 text-gray-400 uppercase tracking-widest mb-2.5">{title}</p>
      {children}
    </div>
  )

  const propTypes = ['Nhà phố / Nhà riêng','Biệt thự','Căn hộ / Chung cư','Đất nền','Mặt bằng / Khác']
  const prices = [['all','Tất cả mức giá'],['<3','< 3 tỷ'],['3-5','3 – 5 tỷ'],['5-10','5 – 10 tỷ'],['10-20','10 – 20 tỷ'],['>20','> 20 tỷ']]
  const areas = [['all','Tất cả'],['<50','< 50 m²'],['50-80','50 – 80 m²'],['80-150','80 – 150 m²'],['150-300','150 – 300 m²'],['>300','> 300 m²']]
  const bedsOpts = [['all','Tất cả'],['1+','1+ PN'],['2+','2+ PN'],['3+','3+ PN'],['4+','4+ PN'],['5+','5+ PN']]
  const dirs = ['Tất cả hướng','Đông','Tây','Nam','Bắc','Đông Nam','Đông Bắc','Tây Nam','Tây Bắc']
  const sorts = [['newest','Mới nhất'],['price-asc','Giá tăng dần'],['price-desc','Giá giảm dần'],['area-desc','Diện tích lớn']]

  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}>
      {/* Scrim */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm" />
      {/* Panel */}
      <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-gray-800 font-700">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4.5 h-4.5">
              <path d="M3 5h14M6 10h8M9 15h2"/>
            </svg>
            Bộ lọc bất động sản
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/></svg>
          </button>
        </div>

        <div className="flex-1 px-5 py-5">
          {/* Keyword */}
          {section('Từ khóa tìm kiếm',
            <div className="relative">
              <svg viewBox="0 0 18 18" fill="none" stroke="#9CA3AF" strokeWidth="1.6" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2">
                <circle cx="7.5" cy="7.5" r="5"/><path d="m16 16-3.5-3.5"/>
              </svg>
              <input
                value={draft.keyword}
                onChange={e => up({ keyword: e.target.value })}
                placeholder="Tìm theo tên đường, dự án, từ khóa..."
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-green-400 transition-colors"
              />
            </div>
          )}

          {/* Hình thức */}
          {section('Hình thức giao dịch',
            <div className="flex gap-2 flex-wrap">
              {chip('Tất cả', draft.txType === 'all', () => up({ txType: 'all' }))}
              {chip('Bán', draft.txType === 'sell', () => up({ txType: 'sell' }))}
              {chip('Cho thuê', draft.txType === 'rent', () => up({ txType: 'rent' }))}
            </div>
          )}

          {/* Loại BĐS */}
          {section('Loại bất động sản',
            <div className="flex flex-wrap gap-2">
              {chip('Tất cả loại BĐS', draft.propTypes.length === 0, () => up({ propTypes: [] }))}
              {propTypes.map(p => chip(p, draft.propTypes.includes(p), () => toggleProp(p)))}
            </div>
          )}

          {/* Khoảng giá */}
          {section('Khoảng giá',
            <div>
              {/* Slider visual */}
              <div className="relative h-1.5 bg-gray-200 rounded-full mb-3 mx-1">
                <div className="absolute left-0 right-0 h-full bg-green-600 rounded-full" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-green-600 rounded-full shadow" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-green-600 rounded-full shadow" />
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {prices.map(([v, l]) => chip(l, draft.priceRange === v, () => up({ priceRange: v })))}
              </div>
            </div>
          )}

          {/* Khu vực */}
          {section('Khu vực',
            <div className="space-y-2">
              <select defaultValue="Đà Nẵng" className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-white outline-none focus:border-green-400">
                <option value="">Tất cả tỉnh / thành</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
              </select>
              <div className="grid grid-cols-2 gap-2">
                <select className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-white outline-none focus:border-green-400">
                  <option>Tất cả quận/huyện</option>
                  <option>Cẩm Lệ</option><option>Hải Châu</option>
                  <option>Sơn Trà</option><option>Ngũ Hành Sơn</option>
                </select>
                <select className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-white outline-none focus:border-green-400">
                  <option>Tất cả phường/xã</option>
                </select>
              </div>
            </div>
          )}

          {/* Diện tích */}
          {section('Diện tích',
            <div className="flex flex-wrap gap-2">
              {areas.map(([v, l]) => chip(l, draft.area === v, () => up({ area: v })))}
            </div>
          )}

          {/* Số phòng ngủ */}
          {section('Số phòng ngủ',
            <div className="flex flex-wrap gap-2">
              {bedsOpts.map(([v, l]) => chip(l, draft.beds === v, () => up({ beds: v })))}
            </div>
          )}

          {/* Hướng nhà */}
          {section('Hướng nhà',
            <div className="flex flex-wrap gap-2">
              {dirs.map(d => chip(d, draft.direction === d || (d === 'Tất cả hướng' && draft.direction === 'all'), () => up({ direction: d === 'Tất cả hướng' ? 'all' : d })))}
            </div>
          )}

          {/* Pháp lý */}
          {section('Pháp lý & xác minh',
            <div className="space-y-2.5">
              {[
                { key: 'legalReady' as const, label: 'Sổ đỏ / Sổ hồng sẵn sàng' },
                { key: 'verified' as const, label: 'Đã xác minh chính chủ bởi AgentLink' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={draft[key]} onChange={e => up({ [key]: e.target.checked })}
                    className="w-4 h-4 accent-green-600 rounded" />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          )}

          {/* Sắp xếp */}
          {section('Sắp xếp kết quả',
            <div className="flex flex-wrap gap-2">
              {sorts.map(([v, l]) => chip(l, draft.sort === v, () => up({ sort: v })))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-5 py-4 flex gap-3">
          <button onClick={() => setDraft({ ...DEFAULT_FILTER })} className="flex-shrink-0 text-sm font-600 text-gray-500 hover:text-gray-700 px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
            Xóa bộ lọc
          </button>
          <button onClick={() => { onApply(draft); onClose() }}
            className="flex-1 bg-green-700 hover:bg-green-800 text-white font-700 text-sm py-3 rounded-xl transition-colors">
            Xem {LISTINGS.length} bất động sản
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Collections Slider ──────────────────────────────────────── */
function CollectionsSlider() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const scrollToCard = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[index] as HTMLElement
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' })
    setActive(index)
  }

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    const cards = Array.from(track.children) as HTMLElement[]
    let closest = 0
    let minDist = Infinity
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft)
      if (dist < minDist) { minDist = dist; closest = i }
    })
    setActive(closest)
  }

  return (
    <div className="mx-4 sm:mx-6 bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 overflow-hidden">
      {/* Header */}
      <div className="px-5 sm:px-7 py-4 flex items-center justify-between">
        <h2 className="font-700 text-gray-900 text-base flex items-center gap-2">
          <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4.5 h-4.5 text-green-600"><rect x="1" y="5" width="16" height="11" rx="1.5"/><path d="M5 5V3.5A1.5 1.5 0 0 1 6.5 2h5A1.5 1.5 0 0 1 13 3.5V5"/></svg>
          Bộ sưu tập
          <span className="text-xs font-600 text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{AGENT.collectionCount}</span>
        </h2>
        {/* Arrow controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scrollToCard(Math.max(0, active - 1))}
            disabled={active === 0}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-green-400 hover:text-green-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Trước"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M10 12 6 8l4-4"/></svg>
          </button>
          <button
            onClick={() => scrollToCard(Math.min(COLLECTIONS.length - 1, active + 1))}
            disabled={active === COLLECTIONS.length - 1}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:border-green-400 hover:text-green-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Tiếp theo"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M6 4l4 4-4 4"/></svg>
          </button>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-5 sm:px-7 pb-6"
      >
        {COLLECTIONS.map((c) => (
          <div
            key={c.id}
            className="snap-start flex-shrink-0 w-[78%] sm:w-[44%] lg:w-[30%] group cursor-pointer"
          >
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden mb-3" style={{ aspectRatio: '4/3' }}>
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Badge */}
              {c.hot
                ? <span className="absolute top-3 left-3 text-[10px] font-700 bg-red-500 text-white px-2.5 py-1 rounded-full">🔥 HOT</span>
                : <span className="absolute top-3 left-3 text-[10px] font-600 bg-black/50 backdrop-blur-sm text-white/90 px-2.5 py-1 rounded-full">{c.label}</span>
              }
              {/* Count pill */}
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] font-700 px-2 py-1 rounded-full">
                {c.count} căn
              </div>
              {/* Title overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-8">
                <h3 className="text-sm font-700 text-white leading-snug line-clamp-2">{c.title}</h3>
              </div>
            </div>
            {/* Below card */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full font-600">{c.tag}</span>
              <span className="text-xs text-gray-400 flex items-center gap-0.5 font-500">
                Xem tất cả
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3 h-3"><path d="M2 6h8M7 3l3 3-3 3"/></svg>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 pb-4">
        {COLLECTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            aria-label={`Bộ sưu tập ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? 'w-5 h-1.5 bg-green-600'
                : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Listing Card (inspired by ref3 clean style) ─────────────── */
function ListingCard({ l }: { l: typeof LISTINGS[0] }) {
  const badgeColor: Record<string, string> = {
    'Đã xác minh': 'bg-green-500',
    'Sẵn sổ': 'bg-amber-400',
    'Nổi bật': 'bg-red-500',
  }
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 hover:border-green-100 transition-all duration-200 cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img src={l.img} alt={l.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {/* Type badge */}
        <span className="absolute top-3 left-3 text-xs font-700 bg-green-600 text-white px-2.5 py-1 rounded-full">
          {l.type}
        </span>
        {/* Status badges top-right */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
          {l.badges.filter(b => b !== 'Đã xác minh').map(b => (
            <span key={b} className={`text-[10px] font-700 text-white px-2 py-0.5 rounded-full ${badgeColor[b] ?? 'bg-gray-600'}`}>{b}</span>
          ))}
        </div>
        {/* Verified ribbon */}
        {l.badges.includes('Đã xác minh') && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
            <span className="text-[10px] text-green-300 font-600 flex items-center gap-1">
              <svg viewBox="0 0 12 12" fill="currentColor" className="w-3 h-3"><path d="M10 3L5 8.5 2 5.5l1-1 2 2 4-4.5 1 1z"/></svg>
              Đã xác minh bởi AgentLink
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2 mb-1.5">
          <span className="text-base font-800 text-green-600">{l.price}</span>
          <span className="text-xs text-gray-400 flex-shrink-0">{l.priceM2}</span>
        </div>
        <h3 className="text-sm font-600 text-gray-900 leading-snug line-clamp-2 mb-3">{l.title}</h3>

        {/* Specs row */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-3.5 h-3.5"><rect x="1" y="7" width="12" height="6" rx="0.8"/><path d="M1 7V5a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 13 5v2"/><path d="M4 3.5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v.5"/></svg>
            {l.area} m²
          </span>
          {l.beds > 0 && (
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-3.5 h-3.5"><path d="M1 5h12v5H1zM1 10v2M13 10v2M3 5V3.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V5"/></svg>
              {l.beds} PN
            </span>
          )}
          {l.wc > 0 && (
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-3.5 h-3.5"><path d="M4 13V7.5A2.5 2.5 0 0 1 6.5 5h0A2.5 2.5 0 0 1 9 7.5V13"/><path d="M1 9h12"/></svg>
              {l.wc} WC
            </span>
          )}
          {l.road > 0 && (
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-3.5 h-3.5"><path d="M2 12 4.5 2M9.5 2 12 12M4.5 2h5M5 7h4"/></svg>
              {l.road}m
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-400">
          <svg viewBox="0 0 14 14" fill="none" stroke="#9CA3AF" strokeWidth="1.4" className="w-3 h-3 flex-shrink-0"><circle cx="7" cy="5.5" r="2.2"/><path d="M2 12.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5"/></svg>
          {l.district}
        </div>
      </div>
    </div>
  )
}

/* ─── ProfilePage ─────────────────────────────────────────────── */
export default function ProfilePage() {
  const [showQR, setShowQR] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [filter, setFilter] = useState<FilterState>({ ...DEFAULT_FILTER })

  return (
    <div className="min-h-screen bg-[#F3F4F6]" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {showQR && <QRModal onClose={() => setShowQR(false)} />}
      {showFilter && <FilterDrawer filter={filter} onApply={setFilter} onClose={() => setShowFilter(false)} />}

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src={logoMark} className="w-7 h-7 object-contain" alt="AgentLink" />
            <span className="font-700 text-gray-900 text-[15px]">Agent<span className="text-green-600">Link</span></span>
          </a>
          {/* Mobile icons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button aria-label="Xem mã QR" onClick={() => setShowQR(true)} className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500">
              <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4"><rect x="1" y="1" width="6" height="6" rx="0.8"/><rect x="11" y="1" width="6" height="6" rx="0.8"/><rect x="1" y="11" width="6" height="6" rx="0.8"/><rect x="12" y="12" width="5" height="5" rx="0.5"/></svg>
            </button>
            <button aria-label="Chia sẻ trang" className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500">
              <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4"><circle cx="14" cy="3.5" r="1.8"/><circle cx="4" cy="9" r="1.8"/><circle cx="14" cy="14.5" r="1.8"/><path d="M5.7 10 12.3 13M12.3 5 5.7 8"/></svg>
            </button>
          </div>
          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><circle cx="12" cy="3" r="1.8"/><circle cx="4" cy="8" r="1.8"/><circle cx="12" cy="13" r="1.8"/><path d="M5.7 9 10.3 12M10.3 4 5.7 7"/></svg>
              Chia sẻ
            </button>
            <button onClick={() => setShowQR(true)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><rect x="1" y="1" width="6" height="6" rx="0.6"/><rect x="9" y="1" width="6" height="6" rx="0.6"/><rect x="1" y="9" width="6" height="6" rx="0.6"/><rect x="11" y="11" width="4" height="4" rx="0.3"/></svg>
              Mã QR
            </button>
            <a href={`tel:${AGENT.phoneRaw}`} className="flex items-center gap-1.5 text-sm font-600 text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors">
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5"><path d="M1.5 2a1 1 0 0 1 1-1h1.6a1 1 0 0 1 .99.836l.55 3.3a1 1 0 0 1-.528 1.06l-1.16.58a8.83 8.83 0 0 0 4.874 4.874l.58-1.16a1 1 0 0 1 1.06-.528l3.3.55a1 1 0 0 1 .836.99V14a1 1 0 0 1-1 1H13C6.373 15 1 9.627 1 3V2Z"/></svg>
              {AGENT.phone}
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-14 pb-24 lg:pb-12">
        <div className="max-w-5xl mx-auto">

          {/* ── Cover ── */}
          <div className="relative h-44 sm:h-56 lg:h-64 overflow-hidden">
            <img src={heroBg} alt="Cover" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* ── Profile card ── */}
          <div className="mx-4 sm:mx-6 bg-white rounded-2xl -mt-8 relative shadow-sm border border-gray-100 px-5 sm:px-7 pt-4 pb-6 mb-4">

            {/* Avatar — sticks up above card into cover */}
            <div className="relative -mt-12 mb-3 w-fit">
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 border-4 border-white shadow-lg flex items-center justify-center text-white font-800 text-2xl select-none">
                AB
              </div>
              <div className="absolute bottom-1 right-0.5 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <svg viewBox="0 0 12 12" fill="white" className="w-3 h-3"><path d="M10 3L5 8.5 2 5.5l1-1 2 2 4-4.5 1 1z"/></svg>
              </div>
            </div>

            {/* Name row + CTAs — same horizontal line */}
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl lg:text-2xl font-800 text-gray-900 leading-tight">{AGENT.name}</h1>
              </div>
              {/* 3 CTA buttons — desktop only, right side of name row */}
              <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
                <a href={`tel:${AGENT.phoneRaw}`} className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white font-700 text-sm px-4 py-2 rounded-xl transition-colors shadow-sm whitespace-nowrap">
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5"><path d="M1.5 2a1 1 0 0 1 1-1h1.6a1 1 0 0 1 .99.836l.55 3.3a1 1 0 0 1-.528 1.06l-1.16.58a8.83 8.83 0 0 0 4.874 4.874l.58-1.16a1 1 0 0 1 1.06-.528l3.3.55a1 1 0 0 1 .836.99V14a1 1 0 0 1-1 1H13C6.373 15 1 9.627 1 3V2Z"/></svg>
                  Gọi ngay
                </a>
                <a href={`https://zalo.me/${AGENT.zalo}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-[#0068FF] hover:bg-blue-700 text-white font-700 text-sm px-4 py-2 rounded-xl transition-colors whitespace-nowrap">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 2C6.48 2 2 6.48 2 12c0 2.54.94 4.86 2.5 6.63L3 22l3.67-1.33A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm-1 13H9V9h2v6zm4 0h-2V9h2v6z"/></svg>
                  Nhắn Zalo
                </a>
                <button className="flex items-center gap-1.5 border border-gray-300 hover:border-green-300 hover:bg-green-50 text-gray-700 hover:text-green-700 font-600 text-sm px-4 py-2 rounded-xl transition-colors whitespace-nowrap">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5"><path d="M2 8c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5-2.7 5.5-6 5.5c-.7 0-1.4-.1-2-.3L2 15l.5-2.5A5.3 5.3 0 0 1 2 8z"/></svg>
                  Gửi nhu cầu
                </button>
              </div>
            </div>

            {/* Rating + meta — below name */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4">
              <span className="flex items-center gap-1">
                <Stars rating={AGENT.rating} />
                <span className="text-sm font-600 text-gray-700">{AGENT.rating}/5</span>
                <span className="text-xs text-gray-400">({AGENT.reviewCount})</span>
              </span>
              <span className="w-px h-4 bg-gray-200" />
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <svg viewBox="0 0 14 14" fill="none" stroke="#9CA3AF" strokeWidth="1.4" className="w-3 h-3"><circle cx="7" cy="7" r="5.5"/><path d="M7 4v3l2 1"/></svg>
                {AGENT.responseTime}
              </span>
              <span className="w-px h-4 bg-gray-200" />
              <span className="text-xs text-gray-500">{AGENT.deals} giao dịch</span>
            </div>

            {/* Location + badges */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-2.5 py-1.5 rounded-full">
                <svg viewBox="0 0 14 14" fill="none" stroke="#9CA3AF" strokeWidth="1.5" className="w-3 h-3"><circle cx="7" cy="5.5" r="2.2"/><path d="M2 12.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5"/></svg>
                {AGENT.location}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-100 px-2.5 py-1.5 rounded-full font-600">
                <svg viewBox="0 0 12 12" fill="#16A34A" className="w-2.5 h-2.5"><path d="M6 0l1.3 2.7L10 3.5l-2 2 .5 2.8L6 7l-2.5 1.3.5-2.8-2-2L4.7 2.7z"/></svg>
                Môi giới uy tín AgentLink
              </span>
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-600 leading-relaxed mb-5 max-w-2xl">{AGENT.bio}</p>

            {/* Border divider */}
            <div className="border-t border-gray-100 pt-4">
              {/* Stats widget (ref1) */}
              <div className="grid grid-cols-3 divide-x divide-gray-100">
                {[
                  { label: 'BĐS đang đăng', value: AGENT.listingCount },
                  { label: 'Bộ sưu tập', value: AGENT.collectionCount },
                  { label: 'Đã bán', value: AGENT.soldCount },
                ].map(s => (
                  <div key={s.label} className="flex flex-col items-center py-1 sm:py-2">
                    <span className="text-xl sm:text-2xl font-800 text-gray-900">{s.value}</span>
                    <span className="text-xs text-gray-400 mt-0.5 text-center">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Collections — Slider ── */}
          <CollectionsSlider />

          {/* ── Listings — separate block ── */}
          <div className="mx-4 sm:mx-6 bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 overflow-hidden">
            {/* Block header */}
            <div className="px-5 sm:px-7 py-4 border-b border-gray-50 flex items-center justify-between">
              <h2 className="font-700 text-gray-900 text-base flex items-center gap-2">
                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4.5 h-4.5 text-green-600"><path d="M3 3h12v12H3zM7 3v12M3 8h12"/></svg>
                Nhà đất đang bán
                <span className="text-xs font-600 text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{LISTINGS.length}</span>
              </h2>
              <button onClick={() => setShowFilter(true)} className="flex items-center gap-1.5 text-sm font-600 text-gray-600 hover:text-green-600 border border-gray-200 hover:border-green-300 px-3 py-1.5 rounded-xl transition-colors">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4"><path d="M2 4h12M5 8h6M7 12h2"/></svg>
                Bộ lọc
              </button>
            </div>

            {/* Grid */}
            <div className="p-5 sm:p-7">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {LISTINGS.map(l => <ListingCard key={l.id} l={l} />)}
              </div>
            </div>
          </div>

          {/* ── Trust pillars ── */}
          <div className="mx-4 sm:mx-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7 mb-4">
            <h2 className="text-sm font-700 text-gray-400 uppercase tracking-widest mb-5">Cam kết của An Bình Land</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { title: 'Pháp lý minh bạch 100%', body: 'Mọi BĐS đều được kiểm tra pháp lý trước khi tư vấn. Không có rủi ro ẩn.', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>, icon2: <path d="m9 12 2 2 4-4"/> },
                { title: 'Giá chuẩn chính chủ', body: 'Giá niêm yết là giá thật từ chủ nhà. Không thêm phí ẩn hay chênh lệch.', icon: <circle cx="12" cy="12" r="10"/>, icon2: <path d="M12 6v6l4 2"/> },
                { title: 'Đồng hành trọn gói', body: 'Từ xem nhà, thương lượng, công chứng đến nhận sổ — hỗ trợ từng bước.', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>, icon2: <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/> },
              ].map(t => (
                <div key={t.title} className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5">{t.icon}{t.icon2}</svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-700 text-gray-900 mb-1">{t.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Lead capture CTA ── */}
          <div className="mx-4 sm:mx-6 mb-6">
            <div className="bg-green-700 rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-green-300 text-xs font-600 uppercase tracking-widest mb-1">Tư vấn miễn phí</p>
                <h2 className="text-white font-700 text-lg mb-1">Có nhu cầu về BĐS Đà Nẵng?</h2>
                <p className="text-green-200 text-sm">Mô tả ngắn và tôi sẽ tìm đúng BĐS phù hợp với bạn.</p>
              </div>
              <button className="flex-shrink-0 flex items-center gap-2 bg-white text-green-700 font-700 text-sm px-6 py-3 rounded-xl hover:bg-green-50 transition-colors shadow-sm">
                Gửi nhu cầu cho An Bình Land
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* CTA band */}
          <div className="py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <h3 className="text-white font-700 text-base mb-1">Bạn cũng là nhà môi giới bất động sản?</h3>
              <p className="text-sm text-gray-400">Tạo Profile cá nhân, đăng BĐS và nhận khách hàng qua một đường link duy nhất.</p>
            </div>
            <a href="/" className="flex-shrink-0 bg-green-600 hover:bg-green-500 text-white font-700 text-sm px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
              Đăng ký miễn phí
            </a>
          </div>

          {/* Copyright */}
          <div className="py-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
            <span>© {new Date().getFullYear()} AgentLink. Bảo lưu mọi quyền.</span>
            <span>Trang profile của <span className="text-gray-400 font-600">{AGENT.name}</span> · agentlink.vn/an-binh-land</span>
          </div>
        </div>
      </footer>

      {/* ── Mobile fixed bottom bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] flex gap-2 shadow-lg">
        <a href={`tel:${AGENT.phoneRaw}`} className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white font-700 text-sm py-3 rounded-xl transition-colors">
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4"><path d="M1.5 2a1 1 0 0 1 1-1h1.6a1 1 0 0 1 .99.836l.55 3.3a1 1 0 0 1-.528 1.06l-1.16.58a8.83 8.83 0 0 0 4.874 4.874l.58-1.16a1 1 0 0 1 1.06-.528l3.3.55a1 1 0 0 1 .836.99V14a1 1 0 0 1-1 1H13C6.373 15 1 9.627 1 3V2Z"/></svg>
          Gọi ngay
        </a>
        <a href={`https://zalo.me/${AGENT.zalo}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 bg-[#0068FF] hover:bg-blue-700 text-white font-700 text-sm py-3 rounded-xl transition-colors">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.48 2 2 6.48 2 12c0 2.54.94 4.86 2.5 6.63L3 22l3.67-1.33A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>
          Nhắn Zalo
        </a>
        <button className="flex-1 flex items-center justify-center gap-1.5 border-2 border-green-600 text-green-700 hover:bg-green-50 font-700 text-sm py-3 rounded-xl transition-colors">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><path d="M2 8c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5-2.7 5.5-6 5.5c-.7 0-1.4-.1-2-.3L2 15l.5-2.5A5.3 5.3 0 0 1 2 8z"/></svg>
          Gửi nhu cầu
        </button>
      </div>
    </div>
  )
}
