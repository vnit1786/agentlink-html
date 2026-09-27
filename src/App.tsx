import React, { useState, useEffect } from 'react'
import logoMark from '@/assets/logo-mark.png'
import ProfilePage from '@/ProfilePage'

/* ─── Data ─────────────────────────────────────────────────── */
const PILLARS = [
  {
    id: 'profile',
    eyebrow: 'PROFILE & BỘ SƯU TẬP',
    title: 'Biến danh sách BĐS thành tài sản bán hàng của riêng bạn.',
    body: 'Profile mang thương hiệu cá nhân, danh sách BĐS đang bán và những bộ sưu tập được chọn riêng cho từng nhu cầu khách hàng.',
    chips: ['Profile riêng', 'QR riêng', 'Bộ sưu tập riêng'],
    status: 'live' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    id: 'distribution',
    eyebrow: 'ĐĂNG TIN ĐA KÊNH',
    title: 'Nhập một lần. Dùng ở nhiều nơi.',
    body: 'Quản lý nội dung BĐS tập trung và sử dụng lại khi đăng lên Profile, Facebook Marketplace, hội nhóm và các website bất động sản.',
    chips: ['Facebook', 'Group', 'Marketplace', 'Website BĐS'],
    status: 'coming' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M4 12v-1a8 8 0 0 1 16 0v1" /><path d="M12 19v3" /><circle cx="12" cy="19" r="2" /><path d="M3 9h2m14 0h2M5.6 15.6l1.4-1.4m9.8 1.4-1.4-1.4" />
      </svg>
    ),
  },
  {
    id: 'demand',
    eyebrow: 'NHU CẦU KHÁCH HÀNG',
    title: 'Đừng chỉ chờ khách nhắn lại.',
    body: 'Biết BĐS nào đang được xem, bộ sưu tập nào được quan tâm và từng bước theo dõi nhu cầu mua bán đang xuất hiện trên các hội nhóm.',
    chips: ['Lượt xem', 'Mức quan tâm', 'Nhu cầu mới'],
    status: 'live' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 'radar',
    eyebrow: 'RADAR THỊ TRƯỜNG',
    title: 'Thị trường đang có gì mới, AgentLink giúp bạn nhìn thấy.',
    body: 'Theo dõi BĐS mới xuất hiện, nguồn tin đáng chú ý và những thay đổi từ các khu vực bạn đang làm.',
    chips: ['BĐS mới', 'Nguồn tin', 'Khu vực theo dõi'],
    status: 'coming' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <circle cx="12" cy="12" r="2" /><path d="M6.3 6.3a8 8 0 0 0 0 11.4M17.7 6.3a8 8 0 0 1 0 11.4M3.5 3.5a13 13 0 0 0 0 17M20.5 3.5a13 13 0 0 1 0 17" />
      </svg>
    ),
  },
  {
    id: 'tools',
    eyebrow: 'TIỆN ÍCH NGHIỆP VỤ',
    title: 'Những phép tính nhỏ nhưng phải dùng liên tục.',
    body: 'Tra cứu nhanh bảng giá đất, hệ số, thuế phí giao dịch, chi phí xây dựng và các công cụ tính toán dành riêng cho môi giới.',
    chips: ['Bảng giá', 'Thuế phí', 'Xây dựng', 'Định giá'],
    status: 'coming' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8M8 10h8M8 14h5" />
      </svg>
    ),
  },
]

const FLOW_STEPS = [
  { label: 'Thêm BĐS', sub: 'Nhập thông tin, ảnh, giá một lần', highlight: true },
  { label: 'Hiển thị trên Profile', sub: 'Tự động lên trang cá nhân', highlight: false },
  { label: 'Tạo bộ sưu tập gửi khách', sub: 'Chọn đúng BĐS cho đúng người', highlight: false },
  { label: 'Đăng đa kênh', sub: 'Facebook, Group, Website BĐS', highlight: false },
  { label: 'Theo dõi lượt xem & quan tâm', sub: 'Biết ai đang xem gì', highlight: false },
  { label: 'Chăm sóc đúng khách', sub: 'Đúng người, đúng lúc', highlight: false },
]

const CURRENT_FEATURES = [
  'Profile cá nhân',
  'Trang BĐS riêng',
  'Bộ sưu tập riêng cho từng khách',
  'QR & chia sẻ liên kết',
  'Quản lý danh sách BĐS',
  'Thống kê lượt xem / tương tác',
]

const UPCOMING_FEATURES = [
  'Đăng tự động Facebook Marketplace',
  'Đăng tự động lên Facebook Group',
  'Đăng tự động lên website BĐS',
  'Theo dõi nhu cầu khách trên hội nhóm',
  'Radar nguồn BĐS từ thị trường',
  'Công cụ bảng giá đất',
  'Tính thuế phí giao dịch',
  'Ước tính chi phí xây dựng',
  'Công cụ định giá',
]

const STEPS = [
  { num: '01', title: 'Tạo Profile', body: 'Xây điểm hiện diện riêng với thương hiệu và thông tin liên hệ của bạn.' },
  { num: '02', title: 'Đưa BĐS vào AgentLink', body: 'Tập trung những căn bạn thực sự đang bán vào một nơi.' },
  { num: '03', title: 'Gửi khách & phân phối', body: 'Tạo bộ sưu tập theo nhu cầu hoặc đưa BĐS tới những kênh bạn đang sử dụng.' },
  { num: '04', title: 'Đọc tín hiệu', body: 'Biết nội dung nào được quan tâm, nhu cầu nào đang xuất hiện và việc gì nên làm tiếp theo.' },
]

/* ─── Shared components ─────────────────────────────────────── */
function Kicker({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="h-px w-6 bg-green-500 block" />
      <span className="text-green-600 text-xs font-700 tracking-widest uppercase">{children}</span>
    </div>
  )
}

function StatusBadge({ status }: { status: 'live' | 'coming' }) {
  if (status === 'live') return null
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-600 text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
      Đang phát triển
    </span>
  )
}

/* ─── Brand mark ─────────────────────────────────────────────── */
function AgentLinkMark({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="9" fill="#16A34A" />
      <path
        d="M6.15 24.5 13.3 8.72A3.08 3.08 0 0 1 16.1 6.9c1.2 0 2.3.7 2.8 1.82l7.1 15.78h-5.35L16.08 13.9 11.5 24.5H6.15Z"
        fill="white"
      />
      <path
        d="M11.05 17.35h10.1l1.8 4.05H9.25l1.8-4.05Z"
        fill="#BBF7D0"
      />
      <path
        d="m16.08 13.9 1.76 4.08-2.5 3.42h-6.1l1.8-4.05h3.18l1.86-3.45Z"
        fill="white"
      />
    </svg>
  )
}

/* ─── Logo: AL Pathway ───────────────────────────────────────── */
//
// Structure: one continuous route — A's right leg IS L's stem.
// The angle-break at the junction node (diagonal → horizontal) creates the L.
// No separate L vertical. No bridge. 6 nodes total.
//
// Nodes:  ①left-foot  ②apex  ③crossbar-L  ④crossbar-R  ⑤JUNCTION  ⑥trail-end
// White strokes = A skeleton. Mint strokes = pathway accent (crossbar + L bar).
// Junction is the signature element: mint fill + white halo, visibly largest.
//
function AgentLinkPathwayMark({ className = 'w-9 h-9' }: { className?: string }) {
  // Geometry constants — all derived from these four anchors
  const apex   = { x: 11,   y: 6.5  }
  const lFoot  = { x: 4,    y: 26   }
  const junc   = { x: 18,   y: 26   }   // A right-foot = L corner (THE junction)
  const lEnd   = { x: 28.5, y: 26   }

  // Crossbar sits at 56 % of height — feels optically centred on A
  const cbY = apex.y + (lFoot.y - apex.y) * 0.56   // ≈ 16.7
  // Interpolate crossbar endpoints along each leg
  const t   = (cbY - apex.y) / (lFoot.y - apex.y)
  const cbL = { x: apex.x + t * (lFoot.x - apex.x), y: cbY }   // on left leg
  const cbR = { x: apex.x + t * (junc.x  - apex.x), y: cbY }   // on right leg

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#16A34A" />

      {/* ── A legs (white, bold) ── */}
      <line x1={lFoot.x} y1={lFoot.y} x2={apex.x}  y2={apex.y}  stroke="white"   strokeWidth="2.8" strokeLinecap="round" />
      <line x1={apex.x}  y1={apex.y}  x2={junc.x}   y2={junc.y}  stroke="white"   strokeWidth="2.8" strokeLinecap="round" />

      {/* ── Crossbar — mint pathway accent ── */}
      <line x1={cbL.x}  y1={cbL.y}   x2={cbR.x}    y2={cbR.y}   stroke="#BBF7D0" strokeWidth="2.4" strokeLinecap="round" />

      {/* ── L horizontal — continues the pathway out of the junction ── */}
      <line x1={junc.x}  y1={junc.y}  x2={lEnd.x}   y2={lEnd.y}  stroke="#BBF7D0" strokeWidth="2.8" strokeLinecap="round" />

      {/* ── Nodes ── */}
      {/* ① left foot */}
      <circle cx={lFoot.x} cy={lFoot.y} r="2.2" fill="white" />
      {/* ② apex — slightly larger, top anchor */}
      <circle cx={apex.x}  cy={apex.y}  r="2.5" fill="white" />
      {/* ③ ④ crossbar endpoints — mint, smaller */}
      <circle cx={cbL.x}   cy={cbL.y}   r="1.7" fill="#BBF7D0" />
      <circle cx={cbR.x}   cy={cbR.y}   r="1.7" fill="#BBF7D0" />
      {/* ⑤ JUNCTION — signature element, mint + white halo */}
      <circle cx={junc.x}  cy={junc.y}  r="3.2" fill="#16A34A" />
      <circle cx={junc.x}  cy={junc.y}  r="3.2" fill="#BBF7D0" stroke="white" strokeWidth="1.4" />
      {/* ⑥ trail end */}
      <circle cx={lEnd.x}  cy={lEnd.y}  r="2.2" fill="white" />
    </svg>
  )
}

/* ─── Logo: AL Ligature (Hướng 4) ───────────────────────────── */
//
// Two thick white parallelogram arms form the A. The right arm continues
// diagonally and the L bar attaches at the bottom-right — the angle-break
// IS the L corner. No nodes, no strokes. One mint crossbar as brand accent.
// The emerald notch visible in the upper-right space separates A from L bar,
// creating the junction signature without any extra element.
//
function AgentLinkLigatureMark({ className = 'w-9 h-9' }: { className?: string }) {
  // Arm thickness ≈ 2.5 units for legibility at 24 px
  // Left arm:  outer (3.5,26.5)→(8.5,6) / inner (11,6)→(6,26.5)
  // Right arm: inner (10,6)→(19.5,27)   / outer (13,6)→(22,27)
  // Crossbar (mint): bridges the inner gap at y = 15.5–18.5
  // L bar (white): from A right arm's outer edge at y = 21–27, extends right

  // Crossbar coords — interpolated along inner edges of each arm
  // Left arm inner edge: (11,6)→(6,26.5), h=20.5
  // Right arm inner edge: (10,6)→(19.5,27), h=21
  const cbTop = 15.5, cbBot = 18.5
  const tTop_L = (cbTop - 6) / 20.5, tBot_L = (cbBot - 6) / 20.5
  const tTop_R = (cbTop - 6) / 21,   tBot_R = (cbBot - 6) / 21
  const cb = {
    tl: { x: 11 + tTop_L * (6 - 11),   y: cbTop }, // top-left  (left arm inner)
    tr: { x: 10 + tTop_R * (19.5 - 10), y: cbTop }, // top-right (right arm inner)
    br: { x: 10 + tBot_R * (19.5 - 10), y: cbBot }, // bot-right
    bl: { x: 11 + tBot_L * (6 - 11),    y: cbBot }, // bot-left
  }

  // L bar — left edge tracks right arm's OUTER edge from y=21→27
  // Right arm outer: (13,6)→(22,27), h=21
  const tL21 = (21 - 6) / 21, tL27 = (27 - 6) / 21
  const lBar = {
    tl: { x: 13 + tL21 * (22 - 13), y: 21 }, // top-left
    tr: { x: 29,                     y: 21 }, // top-right
    br: { x: 29,                     y: 27 }, // bot-right
    bl: { x: 22,                     y: 27 }, // bot-left (= right arm outer bottom)
  }

  const pts = (obj: Record<string, { x: number; y: number }>) =>
    Object.values(obj).map(p => `${p.x},${p.y}`).join(' ')

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#16A34A" />

      {/* Left arm */}
      <polygon points="3.5,26.5 8.5,6 11,6 6,26.5" fill="white" />

      {/* Right arm (A stem + implied L vertical) */}
      <polygon points="10,6 13,6 22,27 19.5,27" fill="white" />

      {/* Crossbar — mint, the single brand accent */}
      <polygon points={`${cb.tl.x},${cb.tl.y} ${cb.tr.x},${cb.tr.y} ${cb.br.x},${cb.br.y} ${cb.bl.x},${cb.bl.y}`} fill="#BBF7D0" />

      {/* L bar — white, emerald notch above it IS the junction signature */}
      <polygon points={`${lBar.tl.x},${lBar.tl.y} ${lBar.tr.x},${lBar.tr.y} ${lBar.br.x},${lBar.br.y} ${lBar.bl.x},${lBar.bl.y}`} fill="white" />
    </svg>
  )
}

/* ─── Logo: Connected Home ───────────────────────────────────── */
function AgentLinkHomeMark({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#16A34A" />

      {/* House ghost fill */}
      <path d="M16 5 L5 15.5 L5 27 L27 27 L27 15.5 Z" fill="white" fillOpacity="0.08" />

      {/* Roof slopes */}
      <line x1="16" y1="5" x2="5" y2="15.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="16" y1="5" x2="27" y2="15.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />

      {/* Left wall + right wall */}
      <line x1="5" y1="15.5" x2="5" y2="27" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="27" y1="15.5" x2="27" y2="27" stroke="white" strokeWidth="2.2" strokeLinecap="round" />

      {/* Floor — split into two halves so door gap reads */}
      <line x1="5" y1="27" x2="13" y2="27" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="19" y1="27" x2="27" y2="27" stroke="white" strokeWidth="2.2" strokeLinecap="round" />

      {/* Door (arch top) */}
      <path d="M13 27 L13 22.5 Q13 20.5 16 20.5 Q19 20.5 19 22.5 L19 27" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" />

      {/* Network spokes — hub → roof nodes (mint) */}
      <line x1="16" y1="18" x2="16" y2="6" stroke="#BBF7D0" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.85" />
      <line x1="16" y1="18" x2="5.5" y2="15.5" stroke="#BBF7D0" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.85" />
      <line x1="16" y1="18" x2="26.5" y2="15.5" stroke="#BBF7D0" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.85" />

      {/* Roof-eave lateral connection (mint, subtle) */}
      <line x1="5.5" y1="15.5" x2="26.5" y2="15.5" stroke="#BBF7D0" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.4" />

      {/* Hub node */}
      <circle cx="16" cy="18" r="2.4" fill="#BBF7D0" />

      {/* Roof apex node */}
      <circle cx="16" cy="5" r="2.1" fill="white" />

      {/* Eave nodes */}
      <circle cx="5" cy="15.5" r="2" fill="white" />
      <circle cx="27" cy="15.5" r="2" fill="white" />
    </svg>
  )
}

/* ─── Logo: Rising Star (Hướng 5) ───────────────────────────── */
//
// AL ligature: two bold parallelogram arms — right arm doubles as L stem.
// Swoosh: cubic bezier in brand emerald (#16A34A) drawn OVER the white body.
//   Where it crosses white → background shows through as a curved cut.
//   Centerline passes through mid-right-arm at y≈15 so the slash is visible.
// Star: larger 4-point sparkle — h-arms ±3.2, v-arms ±2.5, drawn last so
//   the white star covers the swoosh endpoint cleanly.
//
// Color change from reference: tile #22C55E → brand #16A34A (darker emerald).
//
function AgentLinkStarMark({ className = 'w-9 h-9' }: { className?: string }) {
  const bg = '#16A34A'

  // Right arm outer edge (16,7.5)→(23,26), h=18.5
  // L-bar top y=22: t=(22-7.5)/18.5=0.784 → x=16+0.784×7=21.49≈21.5
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="7" fill={bg} />

      {/* Left arm */}
      <polygon points="3.5,27 10,7.5 13.5,7.5 7,27" fill="white" />
      {/* Right arm (= L's implied vertical) */}
      <polygon points="12.5,7.5 16,7.5 23,26 19.5,26" fill="white" />
      {/* L bar — left edge tracks right arm outer edge */}
      <polygon points="21.5,22 29,22 29,26 23,26" fill="white" />

      {/* Swoosh — brand emerald stroke cuts through white body.
          Bezier midpoint ≈ (17.2, 15.1) = centre of right arm at that y,
          so the 3.2-wide slash clearly crosses the full arm width. */}
      <path
        d="M 9 23 C 14 17 20 13 25.5 9"
        stroke={bg}
        strokeWidth="3.2"
        fill="none"
        strokeLinecap="round"
      />

      {/* 4-point sparkle star — larger than before.
          Center (26, 9) | h-arms ±3.2 | v-arms ±2.5 | notch ±0.22 */}
      <path
        d="M 26 6.5 L 26.22 8.78 L 29.2 9 L 26.22 9.22 L 26 11.5 L 25.78 9.22 L 22.8 9 L 25.78 8.78 Z"
        fill="white"
      />
    </svg>
  )
}

/* ─── Logo Showcase ──────────────────────────────────────────── */
type VariantCardProps = {
  direction: string
  label: string
  tagColor: 'gray' | 'blue' | 'green' | 'amber' | 'purple'
  description: string
  isNew?: boolean
  mark: React.ReactNode
  markSm: React.ReactNode
}
function VariantCard({ direction, label, tagColor, description, isNew, mark, markSm }: VariantCardProps) {
  const tagCls = {
    gray:  'bg-gray-100 text-gray-500',
    blue:  'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700 font-600',
    amber:  'bg-amber-50 text-amber-700 font-600',
    purple: 'bg-purple-50 text-purple-700 font-600',
  }[tagColor]
  return (
    <div className={`bg-white rounded-2xl p-6 flex flex-col items-center gap-5 relative ${isNew ? 'border border-green-100 ring-1 ring-green-200' : 'border border-gray-100'}`}>
      {isNew && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-700 px-3 py-1 rounded-full">Mới</div>
      )}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs font-700 text-gray-400 uppercase tracking-widest">{direction}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${tagCls}`}>{label}</span>
      </div>

      {/* Sizes */}
      <div className="flex items-end gap-4">
        <div className="w-8 h-8">{markSm}</div>
        <div className="w-12 h-12">{markSm}</div>
        <div className="w-16 h-16">{mark}</div>
      </div>

      {/* Dark strip */}
      <div className="w-full bg-gray-900 rounded-xl py-4 flex items-center justify-center gap-3">
        <div className="w-7 h-7">{markSm}</div>
        <span className="font-700 text-white text-sm">Agent<span className="text-green-400">Link</span></span>
      </div>

      {/* Light strip */}
      <div className="w-full bg-white border border-gray-100 rounded-xl py-4 flex items-center justify-center gap-3">
        <div className="w-7 h-7">{markSm}</div>
        <span className="font-700 text-gray-900 text-sm">Agent<span className="text-green-600">Link</span></span>
      </div>

      <p className="text-xs text-gray-400 text-center leading-relaxed">{description}</p>
    </div>
  )
}

function LogoShowcaseSection() {
  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-700 text-green-600 uppercase tracking-widest mb-2">Design System</p>
          <h2 className="text-2xl font-700 text-gray-900">Logo Variants</h2>
          <p className="text-sm text-gray-500 mt-1">Bốn hướng thiết kế — so sánh cạnh nhau để chọn</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <VariantCard
            direction="Hướng 1"
            label="Connected A"
            tagColor="gray"
            description={"Solid A · khoảng âm\ncánh cửa · mint crossbar"}
            mark={<AgentLinkMark className="w-16 h-16" />}
            markSm={<AgentLinkMark className="w-full h-full" />}
          />
          <VariantCard
            direction="Hướng 2"
            label="Connected Home"
            tagColor="blue"
            description={"Ngôi nhà stroke · hub\nmint · 3 node mái"}
            mark={<AgentLinkHomeMark className="w-16 h-16" />}
            markSm={<AgentLinkHomeMark className="w-full h-full" />}
          />
          <VariantCard
            direction="Hướng 3"
            label="AL Pathway"
            tagColor="green"
            description={"Stroke skeleton · 6 node\njunction halo signature"}
            mark={<AgentLinkPathwayMark className="w-16 h-16" />}
            markSm={<AgentLinkPathwayMark className="w-full h-full" />}
          />
          <VariantCard
            direction="Hướng 4"
            label="AL Ligature"
            tagColor="amber"
            description={"Solid parallelogram · notch\ntự nhiên · bold ở mọi size"}
            isNew
            mark={<AgentLinkLigatureMark className="w-16 h-16" />}
            markSm={<AgentLinkLigatureMark className="w-full h-full" />}
          />
        </div>

        {/* Anatomy table — 4 columns */}
        <div className="mt-10 bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <p className="text-xs font-700 text-gray-400 uppercase tracking-widest">Anatomy so sánh</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-50">

            {/* H1 */}
            <div className="p-5 flex flex-col items-center gap-4">
              <AgentLinkMark className="w-14 h-14" />
              <ul className="w-full space-y-1.5">
                <li className="flex items-start gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-white border border-green-200 flex-shrink-0 mt-0.5" />
                  Khối đặc trắng = A
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-green-200 flex-shrink-0 mt-0.5" />
                  Mint crossbar
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-sm bg-green-700/15 flex-shrink-0 mt-0.5" />
                  Khoảng âm = cánh cửa
                </li>
              </ul>
              <span className="text-xs text-gray-300">Quen · dễ nhớ</span>
            </div>

            {/* H2 */}
            <div className="p-5 flex flex-col items-center gap-4">
              <AgentLinkHomeMark className="w-14 h-14" />
              <ul className="w-full space-y-1.5">
                <li className="flex items-start gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-white border border-green-200 flex-shrink-0 mt-0.5" />
                  Stroke nhà + 3 node mái
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-green-200 flex-shrink-0 mt-0.5" />
                  Hub mint = tâm lưới
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-green-200/40 flex-shrink-0 mt-0.5" />
                  Spoke mờ = kết nối
                </li>
              </ul>
              <span className="text-xs text-gray-300">BĐS rõ · thân thiện</span>
            </div>

            {/* H3 */}
            <div className="p-5 flex flex-col items-center gap-4">
              <AgentLinkPathwayMark className="w-14 h-14" />
              <ul className="w-full space-y-1.5">
                <li className="flex items-start gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-white border border-green-200 flex-shrink-0 mt-0.5" />
                  Stroke AL = 1 pathway
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-green-200 flex-shrink-0 mt-0.5" />
                  Mint crossbar + L bar
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-green-200 border-2 border-white flex-shrink-0 mt-0.5" />
                  Junction halo = chữ ký
                </li>
              </ul>
              <span className="text-xs text-gray-300">Tech · network</span>
            </div>

            {/* H4 */}
            <div className="p-5 flex flex-col items-center gap-4 bg-amber-50/30">
              <AgentLinkLigatureMark className="w-14 h-14" />
              <ul className="w-full space-y-1.5">
                <li className="flex items-start gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-sm bg-white border border-green-200 flex-shrink-0 mt-0.5" />
                  2 parallelogram = cánh A
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-green-200 flex-shrink-0 mt-0.5" />
                  Mint crossbar duy nhất
                </li>
                <li className="flex items-start gap-2 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-sm bg-green-700/15 flex-shrink-0 mt-0.5" />
                  Emerald notch = junction tự nhiên
                </li>
              </ul>
              <span className="text-xs text-amber-400">Bold · favicon-proof</span>
            </div>

          </div>
        </div>

        {/* ── Hướng 5: Rising Star — featured full-width row ── */}
        <div className="mt-6 bg-white border border-purple-100 ring-1 ring-purple-200 rounded-2xl overflow-hidden relative">
          <div className="absolute -top-3 left-6 bg-purple-600 text-white text-xs font-700 px-3 py-1 rounded-full">Mới · Từ mẫu tham khảo</div>

          <div className="px-6 pt-8 pb-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-700 text-gray-400 uppercase tracking-widest">Hướng 5</span>
            <span className="text-xs bg-purple-50 text-purple-700 font-600 px-2 py-0.5 rounded-full">Rising Star</span>
            <p className="w-full text-xs text-gray-400 mt-1">
              AL ligature bold · swoosh emerald cắt qua thân chữ · sparkle star tại điểm đến — đọc như "quỹ đạo đi lên"
            </p>
          </div>

          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-50">

            {/* Sizes */}
            <div className="p-6 flex flex-col gap-5">
              <p className="text-xs font-700 text-gray-400 uppercase tracking-widest">Scale</p>
              <div className="flex items-end gap-4 flex-wrap">
                {['w-5 h-5', 'w-7 h-7', 'w-9 h-9', 'w-12 h-12', 'w-16 h-16', 'w-20 h-20'].map(sz => (
                  <img key={sz} src={logoMark} className={`${sz} object-contain`} alt="AgentLink" />
                ))}
              </div>
              <p className="text-xs text-gray-400">16 · 24 · 32 · 40 · 56 · 72 px — star + swoosh giữ nét ở mọi size</p>
            </div>

            {/* Dark / Light lockup */}
            <div className="p-6 flex flex-col gap-4">
              <p className="text-xs font-700 text-gray-400 uppercase tracking-widest">Lockup</p>
              <div className="bg-gray-950 rounded-xl px-5 py-4 flex items-center gap-3">
                <img src={logoMark} className="w-10 h-10 object-contain" alt="AgentLink" />
                <span className="font-700 text-white text-lg tracking-tight">Agent<span className="text-green-400">Link</span></span>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center gap-3">
                <img src={logoMark} className="w-10 h-10 object-contain" alt="AgentLink" />
                <span className="font-700 text-gray-900 text-lg tracking-tight">Agent<span className="text-green-600">Link</span></span>
              </div>
              <div className="bg-green-600 rounded-xl px-5 py-4 flex items-center gap-3">
                <img src={logoMark} className="w-10 h-10 object-contain" alt="AgentLink" />
                <span className="font-700 text-white text-lg tracking-tight">AgentLink</span>
              </div>
            </div>

            {/* Anatomy */}
            <div className="p-6 flex flex-col gap-5">
              <p className="text-xs font-700 text-gray-400 uppercase tracking-widest">Anatomy</p>
              <div className="flex items-start gap-4">
                <img src={logoMark} className="w-16 h-16 object-contain flex-shrink-0" alt="AgentLink" />
                <ul className="space-y-2.5 flex-1">
                  <li className="flex items-start gap-2 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-sm bg-white border border-gray-200 flex-shrink-0 mt-0.5" />
                    2 parallelogram dày → cánh A + L stem chung
                  </li>
                  <li className="flex items-start gap-2 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-sm bg-white border border-gray-200 flex-shrink-0 mt-0.5" />
                    L bar → ngang đáy, kết thúc hành trình
                  </li>
                  <li className="flex items-start gap-2 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-0.5" />
                    Swoosh emerald → arc cắt qua body (nền lộ ra)
                  </li>
                  <li className="flex items-start gap-2 text-xs text-gray-500">
                    <span className="relative w-2 h-2 flex-shrink-0 mt-0.5">
                      <span className="absolute inset-0 text-purple-400 leading-none" style={{ fontSize: 9, lineHeight: '8px' }}>✦</span>
                    </span>
                    4-point star → điểm đến · signature AgentLink
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-400 leading-relaxed">
                Swoosh + Star = "link" không cần viết chữ. Đọc ngay: <em>"từ A, đi đến đích"</em>.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

/* ─── Navbar ─────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm' : 'bg-white/80 backdrop-blur'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img src={logoMark} className="w-9 h-9 object-contain" alt="AgentLink" />
          <span className="font-700 text-gray-900 text-lg">Agent<span className="text-green-600">Link</span></span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[['AgentLink là gì?', '#what'], ['Tính năng', '#pillars'], ['Cách sử dụng', '#how'], ['Hỏi đáp', '#faq']].map(([label, href]) => (
            <a key={label} href={href} className="text-sm font-500 text-gray-600 hover:text-green-600 transition-colors">{label}</a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-sm font-500 text-gray-700 hover:text-green-700 transition-colors">Đăng nhập</a>
          <a href="#" className="text-sm font-600 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Đăng ký miễn phí
          </a>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-gray-600" onClick={() => setOpen(!open)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {[['AgentLink là gì?', '#what'], ['Tính năng', '#pillars'], ['Cách sử dụng', '#how']].map(([label, href]) => (
            <a key={label} href={href} className="text-sm font-500 text-gray-700" onClick={() => setOpen(false)}>{label}</a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a href="#" className="text-sm font-500 text-center text-gray-700 border border-gray-200 py-2 rounded-lg">Đăng nhập</a>
            <a href="#" className="text-sm font-600 text-center bg-green-600 text-white py-2 rounded-lg">Đăng ký miễn phí</a>
          </div>
        </div>
      )}
    </nav>
  )
}

/* ─── Hero ───────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="pt-24 lg:pt-32 pb-20 lg:pb-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="h-px w-6 bg-green-500" />
              <span className="text-green-600 text-xs font-700 tracking-widest uppercase">Dành riêng cho môi giới bất động sản</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-800 text-gray-900 leading-tight mb-6">
              Nền tảng tinh gọn giúp xây dựng thương hiệu và{' '}
              <span className="text-green-600">phân phối bất động sản</span>{' '}
              chuyên nghiệp
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Xây dựng Profile cá nhân, quản lý BĐS, đăng tin đa kênh tự động, theo dõi nhu cầu khách hàng và sử dụng các công cụ hỗ trợ thị trường trên cùng một nền tảng.
            </p>

            <div className="flex flex-wrap gap-3 mb-5">
              <a href="#" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-600 px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-green-200">
                Tạo AgentLink miễn phí
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="inline-flex items-center gap-2 border border-gray-200 hover:border-green-300 text-gray-700 hover:text-green-700 font-600 px-6 py-3 rounded-xl transition-all duration-200">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-600">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Xem AgentLink hoạt động
              </a>
            </div>

            <p className="text-sm text-gray-400 font-500">
              Bắt đầu từ Profile · Mở rộng công cụ khi bạn cần
            </p>
          </div>

          {/* Right: mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Decorative bg blob */}
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-60" />
              <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-emerald-50 rounded-full blur-2xl opacity-80" />

              {/* Browser mockup */}
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Browser chrome */}
                <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-300" />
                    <div className="w-3 h-3 rounded-full bg-yellow-300" />
                    <div className="w-3 h-3 rounded-full bg-green-300" />
                  </div>
                  <div className="flex-1 bg-white rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-500 font-500 ml-2">
                    agentlink.vn/nguyen-van-an
                  </div>
                </div>

                {/* Profile content */}
                <div className="p-5">
                  {/* Agent header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-700 text-base flex-shrink-0">NA</div>
                    <div>
                      <div className="font-700 text-gray-900 text-sm">Nguyễn Văn An</div>
                      <div className="text-xs text-gray-500">Môi giới BĐS · Hà Nội</div>
                      <div className="text-xs text-green-600 font-500 mt-0.5">agentlink.vn/nguyenvanam</div>
                    </div>
                    <div className="ml-auto">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-gray-500">
                          <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Property list */}
                  <div className="space-y-2.5">
                    {[
                      { name: 'Căn hộ Tây Hồ', area: '75m²', price: '3.2 tỷ', tag: 'Căn bán' },
                      { name: 'Nhà phố Long Biên', area: '90m²', price: '5.4 tỷ', tag: 'Căn bán' },
                      { name: 'Chung cư Cầu Giấy', area: '65m²', price: '2.8 tỷ', tag: 'Căn bán' },
                    ].map((p) => (
                      <div key={p.name} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg bg-green-100 flex-shrink-0" />
                          <div>
                            <div className="text-xs font-600 text-gray-800">{p.name}</div>
                            <div className="text-xs text-gray-400">{p.area}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-700 text-gray-900">{p.price}</div>
                          <div className="text-xs text-green-600 font-500">{p.tag}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Collection badge */}
                  <div className="mt-4 flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2.5">
                    <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 20 20" fill="white" className="w-3.5 h-3.5">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-600 text-green-800">Bộ sưu tập cho Anh Minh</div>
                      <div className="text-xs text-green-600">3 căn · Quận Tây Hồ</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stats badge */}
              <div className="absolute -bottom-4 -left-6 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <svg viewBox="0 0 20 20" fill="#3B82F6" className="w-4 h-4">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-600 text-gray-900">12 lượt xem hôm nay</div>
                  <div className="text-xs text-gray-400">+3 từ bộ sưu tập</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Section 02: Comparison ─────────────────────────────────── */
function ComparisonSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Left: old way */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-500 text-xs font-700 tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
              CÁCH LÀM QUEN THUỘC
            </div>
            <h3 className="text-xl lg:text-2xl font-700 text-gray-800 leading-snug mb-4">
              BĐS nằm khắp nơi. Công việc cũng vậy.
            </h3>
            <p className="text-gray-500 leading-relaxed mb-5">
              Tin nằm trong Zalo, Excel, Facebook và nhiều website khác nhau. Mỗi ngày lại đăng thủ công, tìm nhóm, gửi từng khách.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 leading-relaxed border border-gray-100">
              <span className="font-600 text-gray-700">Đến lúc cần nhìn lại:</span> căn nào còn bán, đã đăng ở đâu, khách nào đang quan tâm — chính bạn cũng khó nắm hết.
            </div>

            {/* Scattered tools illustration */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['Zalo', 'Excel', 'Facebook', 'Nhóm BĐS', 'Website', 'Tin nhắn'].map(t => (
                <span key={t} className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">{t}</span>
              ))}
              <span className="text-xs text-gray-300 bg-gray-50 px-2.5 py-1 rounded-full">...</span>
            </div>
          </div>

          {/* Right: AgentLink way */}
          <div className="bg-white rounded-2xl p-8 border-2 border-green-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-50 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-700 tracking-widest uppercase px-3 py-1.5 rounded-full mb-6 border border-green-100">
                CÁCH CỦA AGENTLINK
              </div>
              <h3 className="text-xl lg:text-2xl font-700 text-gray-900 leading-snug mb-4">
                Đưa công việc môi giới về một nơi.
              </h3>
              <p className="text-gray-600 leading-relaxed mb-5">
                Quản lý những BĐS bạn đang bán, đưa lên Profile và tạo bộ sưu tập riêng cho từng khách.
              </p>
              <div className="bg-green-50 rounded-xl p-4 text-sm text-green-800 leading-relaxed border border-green-100">
                Từ cùng một dữ liệu, AgentLink từng bước giúp bạn{' '}
                <span className="font-600">đăng tin đa kênh, theo dõi khách quan tâm và nắm tín hiệu từ thị trường</span>{' '}
                — thay vì làm lại mọi thứ bằng tay.
              </div>

              {/* Unified flow illustration */}
              <div className="mt-6 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full font-500">1 nguồn dữ liệu</span>
                <svg viewBox="0 0 16 16" fill="none" stroke="#16A34A" strokeWidth={2} className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                <span className="text-xs text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full font-500">Profile</span>
                <svg viewBox="0 0 16 16" fill="none" stroke="#16A34A" strokeWidth={2} className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                <span className="text-xs text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full font-500">Bộ sưu tập</span>
                <svg viewBox="0 0 16 16" fill="none" stroke="#16A34A" strokeWidth={2} className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                <span className="text-xs text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full font-500">Đa kênh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Section 03: What is AgentLink ─────────────────────────── */
function WhatIsSection() {
  const benefits = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
          <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      ),
      title: 'Xây thương hiệu cá nhân',
      body: 'Profile riêng, BĐS riêng, QR và thông tin liên hệ đều dẫn khách về bạn.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
          <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 17h7M17.5 14v7" />
        </svg>
      ),
      title: 'Quản lý & phân phối BĐS',
      body: 'Một lần nhập dữ liệu, sử dụng lại cho Profile, bộ sưu tập và các kênh đăng tin.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
        </svg>
      ),
      title: 'Nắm nhu cầu & thị trường',
      body: 'Theo dõi khách đang quan tâm gì và từng bước phát hiện nhu cầu, BĐS mới từ thị trường.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
          <path d="M9 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-3M18 2l4 4-9 9H9v-4l9-9z" />
        </svg>
      ),
      title: 'Tra cứu ngay khi cần',
      body: 'Bảng giá, hệ số, thuế phí, chi phí xây dựng và các tiện ích phục vụ giao dịch.',
    },
  ]

  return (
    <section id="what" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-14">
          <Kicker>Không chỉ là profile cá nhân</Kicker>
          <h2 className="text-3xl lg:text-4xl font-800 text-gray-900 leading-tight mb-5">
            AgentLink là bộ công cụ tinh gọn cho môi giới bất động sản.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            <span className="font-600 text-gray-800">Profile là điểm bắt đầu.</span>{' '}
            Từ một nơi, bạn có thể quản lý BĐS đang bán, giới thiệu đúng sản phẩm cho đúng khách và sử dụng các công cụ hỗ trợ công việc môi giới mỗi ngày.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b) => (
            <div key={b.title} className="group p-6 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-50 transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                {b.icon}
              </div>
              <h4 className="font-700 text-gray-900 mb-2">{b.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-600 px-7 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-green-200">
            Tạo AgentLink của tôi
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Pillar Visuals ─────────────────────────────────────────── */
function ProfileVisual() {
  return (
    <div className="w-full h-full flex items-center justify-center gap-5 px-6 py-5">
      {/* Agent profile card */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden w-44 flex-shrink-0 border border-gray-100">
        <div className="bg-green-600 px-3 pt-5 pb-7 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-green-400 border-[3px] border-white flex items-center justify-center mb-2">
            <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7"><path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z"/></svg>
          </div>
          <div className="h-2.5 bg-white/80 rounded w-24 mb-1"/>
          <div className="h-2 bg-white/40 rounded w-16"/>
        </div>
        <div className="px-3 pt-3 pb-3">
          <div className="flex justify-center gap-1.5 mb-3">
            {['Profile', 'QR', 'Link'].map(t => (
              <span key={t} className="text-[8px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full font-700">{t}</span>
            ))}
          </div>
          {/* Mini QR */}
          <div className="w-10 h-10 mx-auto mb-3 p-1 bg-gray-50 rounded-lg border border-gray-100 grid grid-cols-5 gap-px">
            {[1,1,1,1,1, 1,0,0,0,1, 1,0,1,0,1, 1,0,0,0,1, 1,1,1,1,1].map((v, i) => (
              <div key={i} className={`rounded-[1px] ${v ? 'bg-gray-800' : ''}`}/>
            ))}
          </div>
          {[1,2].map(i => (
            <div key={i} className="flex gap-1.5 items-center mb-1.5">
              <div className="w-7 h-5 bg-green-50 rounded border border-green-100 flex-shrink-0"/>
              <div className="flex-1 space-y-0.5">
                <div className="h-1.5 bg-gray-200 rounded"/>
                <div className="h-1.5 bg-gray-100 rounded w-2/3"/>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Property collection */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="text-[9px] font-700 text-gray-400 uppercase tracking-widest mb-0.5">Bộ sưu tập</div>
        {[
          { name: 'Nhà phố Quận 1', meta: '5.2 tỷ · Chính chủ' },
          { name: 'Căn hộ Thủ Đức', meta: '2.8 tỷ · Sắp bàn giao' },
          { name: 'Đất nền Long An', meta: '890 tr · Sổ đỏ' },
        ].map(({ name, meta }, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl px-2.5 py-2 flex items-center gap-2 shadow-sm"
               style={{ opacity: 1 - i * 0.12 }}>
            <div className="w-7 h-7 rounded-lg bg-green-50 border border-green-100 flex-shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" className="w-3.5 h-3.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-700 text-gray-800 truncate">{name}</div>
              <div className="text-[9px] text-gray-400 truncate">{meta}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DistributionVisual() {
  const nodes = [
    { label: 'Facebook', x: 120, y: 28, color: '#1877F2', letter: 'f', fs: 15 },
    { label: 'Nhà Tốt', x: 210, y: 110, color: '#16A34A', letter: 'NT', fs: 8 },
    { label: 'Website', x: 120, y: 192, color: '#6366F1', letter: '⊕', fs: 13 },
    { label: 'Chotot', x: 30, y: 110, color: '#F59E0B', letter: 'C', fs: 13 },
  ]
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 240 220" className="w-full h-full" style={{ maxWidth: 340 }}>
        {/* Dashed spokes */}
        {nodes.map(({ x, y }, i) => (
          <line key={i} x1="120" y1="110" x2={x} y2={y}
            stroke="#16A34A" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3"/>
        ))}
        {/* Arrow dots at midpoints */}
        {nodes.map(({ x, y }, i) => (
          <circle key={i} cx={(120+x)/2} cy={(110+y)/2} r="3" fill="#16A34A" opacity="0.55"/>
        ))}
        {/* Platform nodes */}
        {nodes.map(({ x, y, color, letter, fs, label }) => (
          <g key={label}>
            <circle cx={x} cy={y} r="19" fill="white" stroke={color} strokeWidth="1.5"/>
            <text x={x} y={y + fs*0.36} textAnchor="middle" fontSize={fs} fill={color} fontWeight="800">{letter}</text>
            <text x={x} y={y + 32} textAnchor="middle" fontSize="7.5" fill="#9CA3AF" fontWeight="600">{label}</text>
          </g>
        ))}
        {/* Center hub */}
        <circle cx="120" cy="110" r="27" fill="#16A34A"/>
        <circle cx="120" cy="110" r="23" fill="#16A34A" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
        {/* House icon */}
        <path d="M109 116 L109 107 L120 100 L131 107 L131 116 Z" fill="white" opacity="0.9"/>
        <rect x="115" y="109" width="10" height="7" rx="1" fill="#16A34A"/>
        {/* Pulse ring */}
        <circle cx="120" cy="110" r="33" fill="none" stroke="#16A34A" strokeWidth="1" opacity="0.2"/>
        {/* Label */}
        <text x="120" y="140" textAnchor="middle" fontSize="7.5" fill="#9CA3AF" fontWeight="700">BĐS nguồn</text>
      </svg>
    </div>
  )
}

function DemandVisual() {
  const bars = [38, 55, 42, 78, 58, 92, 68]
  return (
    <div className="w-full h-full flex items-center justify-center p-5">
      <div className="w-full max-w-xs space-y-3">
        {/* Stat tiles */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Lượt xem', value: '248', color: 'text-green-600 bg-green-50' },
            { label: 'Quan tâm', value: '37', color: 'text-violet-600 bg-violet-50' },
            { label: 'Nhu cầu mới', value: '12', color: 'text-amber-600 bg-amber-50' },
          ].map(({ label, value, color }) => (
            <div key={label} className={`${color.split(' ')[1]} rounded-2xl p-3 text-center`}>
              <div className={`text-2xl font-800 ${color.split(' ')[0]}`}>{value}</div>
              <div className="text-[9px] text-gray-500 leading-tight mt-0.5">{label}</div>
            </div>
          ))}
        </div>
        {/* Mini bar chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-3.5">
          <div className="text-[9px] text-gray-400 font-700 uppercase tracking-wide mb-2.5">Lượt xem 7 ngày</div>
          <div className="flex items-end gap-1 h-10">
            {bars.map((b, i) => (
              <div key={i} className="flex-1 rounded-t transition-all"
                   style={{ height: `${(b/92)*100}%`, background: i === 5 ? '#16A34A' : '#BBF7D0' }}/>
            ))}
          </div>
        </div>
        {/* Property rows */}
        {[
          { name: 'Nhà phố Quận 1', pct: 72 },
          { name: 'Căn hộ Bình Thạnh', pct: 48 },
        ].map(({ name, pct }) => (
          <div key={name} className="bg-white border border-gray-100 rounded-xl px-3 py-2.5 flex items-center gap-2.5 shadow-sm">
            <div className="w-7 h-7 bg-green-50 rounded-lg flex-shrink-0"/>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-700 text-gray-700 mb-1">{name}</div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${pct}%` }}/>
              </div>
            </div>
            <div className="text-xs font-800 text-green-600">{pct}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RadarVisual() {
  const pins = [
    { cx: 150, cy: 72, r: 5.5, fill: '#16A34A', glow: true },
    { cx: 168, cy: 130, r: 4.5, fill: '#16A34A', glow: false },
    { cx: 155, cy: 162, r: 4, fill: '#6B7280', glow: false },
    { cx: 75, cy: 88, r: 3.5, fill: '#9CA3AF', glow: false },
    { cx: 90, cy: 155, r: 3, fill: '#9CA3AF', glow: false },
  ]
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 240 220" className="w-full h-full" style={{ maxWidth: 340 }}>
        {/* Concentric rings */}
        {[85, 65, 45, 25].map((r, i) => (
          <circle key={r} cx="120" cy="110" r={r} fill="none" stroke="#16A34A" strokeWidth="0.8" opacity={0.07 + i * 0.04}/>
        ))}
        {/* Grid lines */}
        <line x1="120" y1="25" x2="120" y2="195" stroke="#16A34A" strokeWidth="0.5" opacity="0.12"/>
        <line x1="35" y1="110" x2="205" y2="110" stroke="#16A34A" strokeWidth="0.5" opacity="0.12"/>
        <line x1="59" y1="49" x2="181" y2="171" stroke="#16A34A" strokeWidth="0.5" opacity="0.07"/>
        <line x1="181" y1="49" x2="59" y2="171" stroke="#16A34A" strokeWidth="0.5" opacity="0.07"/>
        {/* Sweep wedge */}
        <path d="M 120 110 L 120 25 A 85 85 0 0 1 185 165 Z" fill="#16A34A" opacity="0.07"/>
        <line x1="120" y1="110" x2="120" y2="25" stroke="#16A34A" strokeWidth="1.5" opacity="0.45"/>
        <line x1="120" y1="110" x2="185" y2="165" stroke="#16A34A" strokeWidth="1.5" opacity="0.45"/>
        {/* Property pins */}
        {pins.map(({ cx, cy, r, fill, glow }, i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r * 2.2} fill={fill} opacity="0.12"/>
            <circle cx={cx} cy={cy} r={r} fill={fill}/>
            {glow && <circle cx={cx} cy={cy} r={r + 3} fill="none" stroke={fill} strokeWidth="1.2" opacity="0.5"/>}
          </g>
        ))}
        {/* New badge */}
        <rect x="156" y="56" width="36" height="15" rx="7.5" fill="#16A34A"/>
        <text x="174" y="67" textAnchor="middle" fontSize="7.5" fill="white" fontWeight="800">+2 mới</text>
        {/* Center hub */}
        <circle cx="120" cy="110" r="14" fill="#16A34A" opacity="0.15"/>
        <circle cx="120" cy="110" r="9" fill="#16A34A"/>
        <circle cx="120" cy="110" r="4" fill="white" opacity="0.8"/>
        {/* Scale labels */}
        {['500m', '1km', '2km'].map((label, i) => (
          <text key={i} x={120 + [25, 45, 65][i] + 3} y="111" fontSize="6.5" fill="#9CA3AF">{label}</text>
        ))}
      </svg>
    </div>
  )
}

function ToolsVisual() {
  const tools = [
    { label: 'Bảng giá đất', sub: 'Theo quận/huyện', color: '#16A34A',
      icon: <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2 2H5V5h14v14zM5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/> },
    { label: 'Thuế & phí', sub: 'Giao dịch BĐS', color: '#6366F1',
      icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.88 15.76V19h-1.75v-1.29c-1.38-.3-2.47-1.14-2.54-2.64h1.52c.07.87.67 1.55 2.17 1.55 1.61 0 1.98-.8 1.98-1.31 0-.68-.37-1.33-2.2-1.76-2.04-.5-3.44-1.33-3.44-3.02 0-1.41 1.14-2.34 2.56-2.64V6h1.75v1.29c1.54.37 2.29 1.54 2.35 2.79h-1.53c-.05-.91-.53-1.54-1.83-1.54-1.24 0-1.97.56-1.97 1.35 0 .69.53 1.14 2.19 1.57 1.66.43 3.45 1.15 3.45 3.22-.01 1.51-1.14 2.34-2.71 2.08z"/> },
    { label: 'Chi phí xây', sub: 'Ước tính nhanh', color: '#F59E0B',
      icon: <><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" opacity="0.3"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></> },
    { label: 'Định giá', sub: 'Tham khảo thị trường', color: '#EC4899',
      icon: <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/> },
  ]
  return (
    <div className="w-full h-full flex items-center justify-center p-5">
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {tools.map(({ label, sub, color, icon }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 flex-shrink-0" style={{ background: `${color}18` }}>
              <svg viewBox="0 0 24 24" fill={color} className="w-5 h-5">{icon}</svg>
            </div>
            <div className="text-xs font-800 text-gray-800 leading-snug mb-0.5">{label}</div>
            <div className="text-[9px] text-gray-400 leading-tight">{sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PillarVisual({ id }: { id: string }) {
  switch (id) {
    case 'profile': return <ProfileVisual />
    case 'distribution': return <DistributionVisual />
    case 'demand': return <DemandVisual />
    case 'radar': return <RadarVisual />
    case 'tools': return <ToolsVisual />
    default: return null
  }
}

/* ─── Section 04: Pillars ────────────────────────────────────── */
function PillarsSection() {
  const [active, setActive] = useState(0)
  const pillar = PILLARS[active]

  return (
    <section id="pillars" className="py-20 lg:py-28 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <Kicker>Bộ công cụ dành cho môi giới</Kicker>
          <h2 className="text-3xl lg:text-4xl font-800 text-gray-900 leading-tight mb-4">
            Một nơi cho những việc bạn làm mỗi ngày.
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Không cố trở thành một CRM cồng kềnh. AgentLink tập trung vào những công việc môi giới phải làm lặp đi lặp lại mỗi ngày — và giúp chúng gọn hơn.
          </p>
        </div>

        {/* Tab nav */}
        <div className="flex gap-2 flex-wrap mb-8">
          {PILLARS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-600 transition-all duration-200 ${
                active === i
                  ? 'bg-green-600 text-white shadow-md shadow-green-200'
                  : 'bg-white text-gray-600 border border-gray-100 hover:border-green-200 hover:text-green-700'
              }`}
            >
              <span className={active === i ? 'text-white' : 'text-green-600'}>{p.icon}</span>
              <span className="hidden sm:block">{p.eyebrow.split(' ')[0]}</span>
              {p.status === 'coming' && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-600 ${active === i ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-600'}`}>
                  Beta
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Pillar content */}
        <div className="bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 shadow-sm">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="text-xs font-700 tracking-widest uppercase text-green-600">{pillar.eyebrow}</div>
                <StatusBadge status={pillar.status} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-800 text-gray-900 leading-snug mb-4">{pillar.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{pillar.body}</p>
              <div className="flex flex-wrap gap-2">
                {pillar.chips.map(c => (
                  <span key={c} className="text-sm text-green-700 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full font-500">{c}</span>
                ))}
              </div>
            </div>

            {/* Pillar visual */}
            <div className="bg-gray-50 rounded-2xl h-56 lg:h-72 overflow-hidden border border-gray-100">
              <PillarVisual id={pillar.id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Section 05: Flow ───────────────────────────────────────── */
function FlowSection() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <Kicker>Một dữ liệu — nhiều công việc</Kicker>
          <h2 className="text-3xl lg:text-4xl font-800 text-gray-900 leading-tight mb-5">
            Nhập BĐS một lần. Dùng xuyên suốt quá trình bán.
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
            Không còn copy đi copy lại cùng một căn nhà qua nhiều công cụ khác nhau. AgentLink biến dữ liệu BĐS của bạn thành nguồn dữ liệu dùng chung cho cả quá trình bán.
          </p>
        </div>

        {/* Desktop flow */}
        <div className="hidden lg:flex items-center justify-center gap-0 mb-4">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <div className={`flex flex-col items-center text-center px-4 py-5 rounded-2xl w-36 ${step.highlight ? 'bg-green-600 text-white shadow-lg shadow-green-200' : 'bg-gray-50 border border-gray-100'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-700 mb-2 ${step.highlight ? 'bg-white/20 text-white' : 'bg-green-50 text-green-600'}`}>
                  {i + 1}
                </div>
                <div className={`text-sm font-700 leading-tight mb-1 ${step.highlight ? 'text-white' : 'text-gray-800'}`}>{step.label}</div>
                <div className={`text-xs leading-tight ${step.highlight ? 'text-green-100' : 'text-gray-400'}`}>{step.sub}</div>
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <div className="flex items-center px-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#D1FAE5" strokeWidth={2} className="w-6 h-6">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile flow */}
        <div className="lg:hidden space-y-3">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.label} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-700 flex-shrink-0 ${step.highlight ? 'bg-green-600 text-white' : 'bg-gray-50 border-2 border-gray-200 text-gray-500'}`}>
                  {i + 1}
                </div>
                {i < FLOW_STEPS.length - 1 && <div className="w-px h-8 bg-gray-200 mt-1" />}
              </div>
              <div className={`flex-1 p-4 rounded-xl ${step.highlight ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-100'}`}>
                <div className={`font-700 text-sm ${step.highlight ? 'text-green-800' : 'text-gray-800'}`}>{step.label}</div>
                <div className={`text-xs mt-0.5 ${step.highlight ? 'text-green-600' : 'text-gray-500'}`}>{step.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Section 06: Current vs Upcoming ───────────────────────── */
function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-800 text-white leading-tight">
            Bắt đầu với những gì bạn cần hôm nay.{' '}
            <span className="text-green-400">Mở rộng khi AgentLink phát triển.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Current */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-green-400 text-sm font-700 uppercase tracking-wider">Đang có</span>
            </div>
            <ul className="space-y-3">
              {CURRENT_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 12 12" fill="none" stroke="#4ade80" strokeWidth={2} className="w-3 h-3">
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  </div>
                  <span className="text-gray-200 text-sm font-500">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 text-sm font-700 uppercase tracking-wider">Đang phát triển</span>
            </div>
            <ul className="space-y-3">
              {UPCOMING_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 12 12" fill="none" stroke="#fbbf24" strokeWidth={1.5} className="w-3 h-3">
                      <circle cx="6" cy="6" r="4" /><path d="M6 4v2l1.5 1.5" />
                    </svg>
                  </div>
                  <span className="text-gray-400 text-sm font-500">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Section 07: How it works ───────────────────────────────── */
function HowItWorksSection() {
  return (
    <section id="how" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-14">
          <Kicker>Cách AgentLink hoạt động</Kicker>
          <h2 className="text-3xl lg:text-4xl font-800 text-gray-900 leading-tight">
            Bắt đầu đơn giản. Mở rộng khi bạn cần.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div key={step.num} className="relative">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-1/2 w-full h-px bg-green-100" />
              )}
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-green-50 border-2 border-green-100 flex items-center justify-center mb-5">
                  <span className="text-green-600 font-800 text-lg">{step.num}</span>
                </div>
                <h4 className="font-700 text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Section 08: Final CTA ──────────────────────────────────── */
function FinalCTASection() {
  return (
    <section className="py-20 lg:py-28 bg-green-600 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full -translate-y-1/2 translate-x-1/3 opacity-50" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-700 rounded-full translate-y-1/2 -translate-x-1/3 opacity-40" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 mb-5">
          <span className="h-px w-6 bg-green-300" />
          <span className="text-green-200 text-xs font-700 tracking-widest uppercase">AgentLink của riêng bạn</span>
          <span className="h-px w-6 bg-green-300" />
        </div>

        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-800 text-white leading-tight mb-5">
          Bắt đầu từ Profile. Xây dần bộ công cụ làm nghề của bạn.
        </h2>
        <p className="text-green-100 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          Tạo AgentLink miễn phí, đưa những BĐS đầu tiên lên Profile và bắt đầu làm việc gọn hơn ngay hôm nay.
        </p>

        <a href="#" className="inline-flex items-center gap-2 bg-white text-green-700 font-700 px-8 py-4 rounded-xl hover:bg-green-50 transition-all duration-200 shadow-xl text-base">
          Tạo AgentLink miễn phí
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>

        <p className="mt-4 text-sm text-green-200">
          Không cần cài đặt · Không cần biết code · Bắt đầu miễn phí
        </p>
      </div>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <img src={logoMark} className="w-9 h-9 object-contain" alt="AgentLink" />
              <span className="font-700 text-white text-lg">Agent<span className="text-green-500">Link</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-4 max-w-xs">
              Nền tảng công nghệ tinh gọn giúp môi giới quản lý BĐS, xây dựng thương hiệu, tiếp cận khách hàng và theo dõi thị trường từ một nền tảng thống nhất.
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Profile cá nhân · Quản lý BĐS · Đăng tin đa kênh · Nhu cầu khách hàng · Radar thị trường · Tiện ích nghiệp vụ
            </p>
          </div>

          {/* Product */}
          <div>
            <div className="text-xs font-700 text-gray-500 uppercase tracking-widest mb-4">Sản phẩm</div>
            <ul className="space-y-2.5">
              {['AgentLink là gì?', 'Tính năng V1', 'Cách sử dụng', 'Hỏi đáp thường gặp', 'Tạo hồ sơ miễn phí'].map(l => (
                <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="text-xs font-700 text-gray-500 uppercase tracking-widest mb-4">Chính sách & pháp lý</div>
            <ul className="space-y-2.5">
              {['Điều khoản Dịch vụ', 'Chính sách Bảo mật', 'Quy định Thanh toán & Hoàn tiền', 'Quy chế Hoạt động'].map(l => (
                <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">© 2026 AgentLink.vn. Tất cả bản quyền được bảo lưu.</p>
          <p className="text-xs text-gray-600">Tuân thủ nghị định 13/2023/NĐ-CP & Tiêu chuẩn VietQR</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ────────────────────────────────────────────────────── */
function LandingPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Navbar />
      <main>
        <HeroSection />
        <ComparisonSection />
        <WhatIsSection />
        <PillarsSection />
        <FlowSection />
        <FeaturesSection />
        <HowItWorksSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  const path = window.location.pathname
  const isProfile = path !== '/' && path.length > 1
  if (isProfile) return <ProfilePage />
  return <LandingPage />
}
