'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  ChartNoAxesCombined,
  Settings,
  Search,
  Bell,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  MoreHorizontal,
  Eye,
  Download,
  Menu,
  X,
  TrendingUp,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Candy,
  Heart,
  Sparkles,
  CalendarDays,
} from 'lucide-react';

const imagePath = '/images/chocolate_dashboard_images/';

const products = [
  {
    id: 1,
    name: 'Dark Chocolate Bliss',
    category: 'Dark chocolate',
    price: 249,
    stock: 84,
    sold: 248,
    image: 'product-management.png',
    color: 'bg-amber-100',
    status: 'In stock',
  },
  {
    id: 2,
    name: 'Chocolate Heart Box',
    category: 'Gift collection',
    price: 599,
    stock: 12,
    sold: 186,
    image: 'chocolate-decorative.png',
    color: 'bg-rose-100',
    status: 'Low stock',
  },
  {
    id: 3,
    name: 'Golden Cocoa Collection',
    category: 'Premium collection',
    price: 799,
    stock: 46,
    sold: 164,
    image: 'hero-chocolate.png',
    color: 'bg-orange-100',
    status: 'In stock',
  },
  {
    id: 4,
    name: 'Classic Cocoa Bites',
    category: 'Milk chocolate',
    price: 199,
    stock: 5,
    sold: 142,
    image: 'dashboard-overview.png',
    color: 'bg-yellow-100',
    status: 'Low stock',
  },
];

const initialOrders = [
  {
    id: '#CHO-1024',
    customer: 'Aarav Sharma',
    initials: 'AS',
    product: 'Dark Chocolate Bliss',
    date: 'Oct 14, 2026',
    amount: 1497,
    status: 'Delivered',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: '#CHO-1023',
    customer: 'Priya Patel',
    initials: 'PP',
    product: 'Chocolate Heart Box',
    date: 'Oct 14, 2026',
    amount: 599,
    status: 'Processing',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    id: '#CHO-1022',
    customer: 'Rohan Mehta',
    initials: 'RM',
    product: 'Golden Cocoa Collection',
    date: 'Oct 13, 2026',
    amount: 1598,
    status: 'Shipped',
    color: 'bg-sky-100 text-sky-700',
  },
  {
    id: '#CHO-1021',
    customer: 'Ananya Desai',
    initials: 'AD',
    product: 'Classic Cocoa Bites',
    date: 'Oct 13, 2026',
    amount: 398,
    status: 'Delivered',
    color: 'bg-emerald-100 text-emerald-700',
  },
];

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Products', icon: Package },
  { label: 'Orders', icon: ShoppingBag },
  { label: 'Customers', icon: Users },
  { label: 'Analytics', icon: ChartNoAxesCombined },
];

const weeklySales = [
  { day: 'Mon', value: 42 },
  { day: 'Tue', value: 65 },
  { day: 'Wed', value: 50 },
  { day: 'Thu', value: 78 },
  { day: 'Fri', value: 60 },
  { day: 'Sat', value: 94 },
  { day: 'Sun', value: 72 },
];

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
          {eyebrow}
        </p>
        <h2 className="text-xl font-bold tracking-tight text-[#382019] sm:text-2xl">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

function StatCard({ title, value, change, positive, icon: Icon, note }) {
  return (
    <article className="rounded-2xl border border-[#efe4d9] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eee4] text-[#7c472d]">
          <Icon size={21} />
        </div>
        <span
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            positive
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-rose-50 text-rose-700'
          }`}
        >
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </span>
      </div>
      <p className="mt-5 text-sm text-[#8a7770]">{title}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight text-[#382019]">
        {value}
      </p>
      <p className="mt-2 text-xs text-[#9b8981]">{note}</p>
    </article>
  );
}

function ProductArtwork({ product, priority = false }) {
  return (
    <div
      className={`relative flex h-44 items-center justify-center overflow-hidden rounded-xl ${product.color}`}
    >
      <Image
        src={`${imagePath}${product.image}`}
        alt={product.name}
        width={500}
        height={350}
        sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
        className="h-full w-full object-contain p-3 transition duration-300 hover:scale-105"
        loading={priority ? 'eager' : 'lazy'}
      />
      {product.status === 'Low stock' && (
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-amber-800 shadow-sm">
          Low stock
        </span>
      )}
    </div>
  );
}

function SalesChart() {
  const [period, setPeriod] = useState('Week');

  const bars = useMemo(() => {
    if (period === 'Month') {
      return [
        { day: 'W1', value: 48 },
        { day: 'W2', value: 72 },
        { day: 'W3', value: 57 },
        { day: 'W4', value: 90 },
      ];
    }

    if (period === 'Year') {
      return [
        { day: 'Jan', value: 35 },
        { day: 'Feb', value: 48 },
        { day: 'Mar', value: 60 },
        { day: 'Apr', value: 42 },
        { day: 'May', value: 75 },
        { day: 'Jun', value: 91 },
      ];
    }

    return weeklySales;
  }, [period]);

  return (
    <div className="rounded-2xl border border-[#efe4d9] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-7 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#8a7770]">Total revenue</p>
          <div className="mt-2 flex flex-wrap items-baseline gap-3">
            <h3 className="text-3xl font-bold text-[#382019]">₹84,250</h3>
            <span className="text-xs font-semibold text-emerald-700">
              +12.8%
            </span>
          </div>
        </div>
        <select
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
          className="rounded-lg border border-[#e9ddd1] bg-[#fffaf5] px-3 py-2 text-sm text-[#684738] outline-none focus:ring-2 focus:ring-amber-700/20"
          aria-label="Revenue chart period"
        >
          <option>Week</option>
          <option>Month</option>
          <option>Year</option>
        </select>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-8">
          {[100, 75, 50, 25, 0].map((line) => (
            <div
              key={line}
              className="border-t border-dashed border-[#eee4db]"
            />
          ))}
        </div>

        <div className="relative flex h-56 items-end justify-around gap-3">
          {bars.map((bar, index) => (
            <div
              key={bar.day}
              className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <div className="relative flex h-[calc(100%-28px)] w-full items-end justify-center">
                <div
                  className={`w-full max-w-12 rounded-t-lg transition-all duration-300 group-hover:brightness-110 ${
                    index === bars.length - 2 ? 'bg-[#d99a57]' : 'bg-[#75472e]'
                  }`}
                  style={{ height: `${bar.value}%` }}
                  title={`${bar.value} relative sales units`}
                />
              </div>
              <span className="text-xs text-[#927d72]">{bar.day}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-xs text-[#9b8981]">
        Illustrative sales data for dashboard preview.
      </p>
    </div>
  );
}

export default function Home() {
  const [activeNav, setActiveNav] = useState('Overview');
  const [search, setSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orders, setOrders] = useState(initialOrders);
  const [notice, setNotice] = useState('');

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const filteredOrders = orders.filter((order) =>
    `${order.id} ${order.customer} ${order.product} ${order.status}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 3000);
  }

  function downloadOrders() {
    const header = 'Order ID,Customer,Product,Date,Amount,Status';
    const rows = filteredOrders.map((order) =>
      [
        order.id,
        order.customer,
        order.product,
        order.date,
        order.amount,
        order.status,
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(','),
    );
    const csv = [header, ...rows].join('\n');
    const url = URL.createObjectURL(
      new Blob([csv], { type: 'text/csv;charset=utf-8;' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chocolate-orders.csv';
    link.click();
    URL.revokeObjectURL(url);
    showNotice('Your order report has been downloaded.');
  }

  function addDemoOrder() {
    const idNumber =
      Math.max(
        1024,
        ...orders.map((order) => Number(order.id.replace(/\D/g, ''))),
      ) + 1;

    setOrders((current) => [
      {
        id: `#CHO-${idNumber}`,
        customer: 'New Customer',
        initials: 'NC',
        product: 'Dark Chocolate Bliss',
        date: 'Oct 14, 2026',
        amount: 249,
        status: 'Processing',
        color: 'bg-amber-100 text-amber-700',
      },
      ...current,
    ]);
    showNotice('Demo order added successfully.');
  }

  function chooseNav(label) {
    setActiveNav(label);
    setMobileMenuOpen(false);
    const targetIds = {
      Overview: 'overview',
      Products: 'products',
      Orders: 'orders',
      Customers: 'customers',
      Analytics: 'analytics',
    };
    document.getElementById(targetIds[label])?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#dca66e] text-[#382019]">
          <Candy size={25} />
        </div>
        <div>
          <p className="text-lg font-bold tracking-tight text-white">
            Cocoa & Co.
          </p>
          <p className="text-xs text-[#d7bca8]">Store management</p>
        </div>
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="ml-auto rounded-lg p-2 text-white hover:bg-white/10 lg:hidden"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      <div className="px-4 pt-7">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#bba08d]">
          Workspace
        </p>
        <nav className="space-y-1">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => chooseNav(label)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                activeNav === label
                  ? 'bg-[#dca66e] text-[#382019] shadow-sm'
                  : 'text-[#eadbd0] hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={19} />
              {label}
              {label === 'Orders' && (
                <span className="ml-auto rounded-full bg-white/15 px-2 py-0.5 text-xs">
                  {orders.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-8 px-4">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#bba08d]">
          Preferences
        </p>
        <button
          onClick={() =>
            showNotice('Settings preview — backend not connected yet.')
          }
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#eadbd0] transition hover:bg-white/10 hover:text-white"
        >
          <Settings size={19} />
          Settings
        </button>
      </div>

      <div className="mt-auto p-4">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="relative h-24">
            <Image
              src={`${imagePath}hero-chocolate.png`}
              alt="Chocolate collection"
              fill
              sizes="220px"
              className="object-cover opacity-90"
            />
          </div>
          <div className="p-3">
            <p className="text-sm font-semibold text-white">
              A little sweetness
            </p>
            <p className="mt-1 text-xs leading-5 text-[#d7bca8]">
              Every order brings a little joy.
            </p>
            <div className="mt-2 flex items-center gap-1 text-xs text-[#e7b67e]">
              <Heart size={13} fill="currentColor" />
              Made with love
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-[10px] text-[#bba08d]">
          COCOA & CO. · DASHBOARD DEMO
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fbf7f2] text-[#382019]">
      {notice && (
        <div
          role="status"
          className="fixed right-4 top-4 z-[80] flex max-w-sm items-center gap-2 rounded-xl bg-[#382019] px-4 py-3 text-sm text-white shadow-xl"
        >
          <CheckCircle2 size={18} className="shrink-0 text-emerald-300" />
          {notice}
        </div>
      )}

      <div className="flex min-h-screen">
        <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 bg-[#382019] lg:block">
          {sidebar}
        </aside>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <button
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation overlay"
            />
            <aside className="absolute inset-y-0 left-0 w-72 bg-[#382019] shadow-2xl">
              {sidebar}
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1 lg:ml-64">
          <header className="sticky top-0 z-30 border-b border-[#eee3d9] bg-[#fbf7f2]/95 backdrop-blur-xl">
            <div className="flex min-h-[76px] items-center justify-between gap-3 px-4 sm:px-6 xl:px-9">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="rounded-xl border border-[#eaded2] bg-white p-2.5 lg:hidden"
                  aria-label="Open navigation"
                >
                  <Menu size={20} />
                </button>
                <div className="min-w-0">
                  <p className="hidden text-xs text-[#9b8981] sm:block">
                    Store management / {activeNav}
                  </p>
                  <h1 className="truncate text-lg font-bold sm:mt-1 sm:text-xl">
                    {activeNav === 'Overview'
                      ? 'Good day, Cocoa team!'
                      : activeNav}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <label className="relative hidden md:block">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a18d81]"
                  />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search products or orders..."
                    className="w-56 rounded-xl border border-[#eaded2] bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#ad7549] focus:ring-2 focus:ring-[#ad7549]/10 xl:w-72"
                  />
                </label>
                <button
                  onClick={() => showNotice("You're all caught up!")}
                  className="relative rounded-xl border border-[#eaded2] bg-white p-2.5 transition hover:bg-[#f8eee4]"
                  aria-label="Notifications"
                >
                  <Bell size={19} />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#c77b37] ring-2 ring-white" />
                </button>
                <button
                  onClick={() => showNotice('Store owner profile preview.')}
                  className="flex items-center gap-2 rounded-xl border border-[#eaded2] bg-white p-1.5 pr-2 sm:pr-3"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ead0b6] text-sm font-bold text-[#67412a]">
                    CC
                  </span>
                  <span className="hidden text-left sm:block">
                    <span className="block text-xs font-bold">Store Admin</span>
                    <span className="block text-[10px] text-[#9b8981]">
                      Owner
                    </span>
                  </span>
                  <ChevronDown
                    size={15}
                    className="hidden text-[#8a7770] sm:block"
                  />
                </button>
              </div>
            </div>

            <div className="px-4 pb-3 md:hidden sm:px-6">
              <label className="relative block">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a18d81]"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search products or orders..."
                  className="w-full rounded-xl border border-[#eaded2] bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#ad7549]"
                />
              </label>
            </div>
          </header>

          <div className="mx-auto max-w-[1600px] space-y-9 px-4 py-6 sm:px-6 sm:py-8 xl:px-9">
            <section id="overview" className="scroll-mt-28">
              <div className="relative isolate overflow-hidden rounded-[28px] bg-[#492719] shadow-lg">
                <div className="absolute inset-0 -z-20">
                  <Image
                    src={`${imagePath}hero-chocolate.png`}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 1200px"
                    className="object-cover object-center opacity-50"
                    priority
                  />
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#30170f] via-[#452316]/95 to-[#452316]/30" />

                <div className="grid min-h-[300px] items-center gap-5 p-6 sm:p-9 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
                  <div className="max-w-2xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#e9bf8c]/40 bg-white/10 px-3 py-1.5 text-xs font-medium text-[#f5d8b4] backdrop-blur-sm">
                      <Sparkles size={14} />
                      YOUR CHOCOLATE BUSINESS AT A GLANCE
                    </span>
                    <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl xl:text-5xl">
                      Sweet insights,
                      <br />
                      <span className="font-serif italic text-[#e8b57b]">
                        bigger dreams.
                      </span>
                    </h2>
                    <p className="mt-4 max-w-lg text-sm leading-6 text-[#f0d9c5] sm:text-base">
                      Follow your sales, discover customer favorites, and keep
                      every chocolate order moving smoothly.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <button
                        onClick={() => chooseNav('Analytics')}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#e5ae72] px-5 py-3 text-sm font-bold text-[#3a2015] transition hover:bg-[#f0c18d]"
                      >
                        Explore analytics <ArrowUpRight size={17} />
                      </button>
                      <button
                        onClick={() => chooseNav('Products')}
                        className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                      >
                        View collection <Package size={17} />
                      </button>
                    </div>
                  </div>

                  <div className="hidden justify-end lg:flex">
                    <div className="relative h-64 w-full max-w-[320px] overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-sm">
                      <Image
                        src={`${imagePath}chocolate-decorative.png`}
                        alt="Chocolate gift inspiration"
                        fill
                        sizes="320px"
                        className="object-contain p-3"
                      />
                      <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-[#32190f]/80 p-3 backdrop-blur-md">
                        <p className="text-xs text-[#e9c8a5]">
                          THE CUSTOMER FAVORITE
                        </p>
                        <p className="mt-1 font-semibold text-white">
                          Chocolate made memorable
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section aria-label="Store statistics">
              <SectionHeading
                eyebrow="Your store at a glance"
                title="Today's overview"
                action={
                  <span className="inline-flex items-center gap-2 text-xs text-[#8a7770]">
                    <CalendarDays size={15} />
                    October 14, 2026
                  </span>
                }
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  title="Total revenue"
                  value="₹84,250"
                  change="+12.8%"
                  positive
                  icon={TrendingUp}
                  note="Compared with previous period"
                />
                <StatCard
                  title="Total orders"
                  value="1,248"
                  change="+8.2%"
                  positive
                  icon={ShoppingBag}
                  note="Across all product collections"
                />
                <StatCard
                  title="Customers"
                  value="864"
                  change="+5.4%"
                  positive
                  icon={Users}
                  note="Returning and new customers"
                />
                <StatCard
                  title="Products in stock"
                  value="147"
                  change="-2 items"
                  positive={false}
                  icon={Package}
                  note="Check low-stock products below"
                />
              </div>
            </section>

            <section id="analytics" className="scroll-mt-28">
              <SectionHeading
                eyebrow="Know your numbers"
                title="Sales & performance"
                action={
                  <button
                    onClick={downloadOrders}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#e8d9cb] bg-white px-3.5 py-2.5 text-sm font-semibold transition hover:bg-[#f8eee4]"
                  >
                    <Download size={16} />
                    Export orders
                  </button>
                }
              />
              <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
                <SalesChart />

                <div className="relative overflow-hidden rounded-2xl bg-[#ead8c4] p-6 sm:p-7">
                  <div className="relative z-10 max-w-[65%]">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7d4d30]">
                      <Sparkles size={12} />
                      Sweet success
                    </span>
                    <h3 className="mt-4 text-2xl font-bold leading-tight text-[#44281c]">
                      Your best-selling treats
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#785440]">
                      Keep an eye on customer favorites and give your next
                      collection a little extra love.
                    </p>
                    <button
                      onClick={() => chooseNav('Products')}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#44281c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#603b2a]"
                    >
                      Explore products <ArrowUpRight size={16} />
                    </button>
                  </div>
                  <div className="absolute -bottom-5 -right-5 h-48 w-48 opacity-80 sm:h-56 sm:w-56">
                    <Image
                      src={`${imagePath}revenue.png`}
                      alt="Chocolate revenue illustration"
                      fill
                      sizes="220px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section id="products" className="scroll-mt-28">
              <SectionHeading
                eyebrow="Made to be loved"
                title="Featured chocolates"
                action={
                  <button
                    onClick={() =>
                      showNotice(
                        'Product creation needs a backend to save products.',
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-[#47281b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#65412d]"
                  >
                    <Plus size={17} />
                    Add product
                  </button>
                }
              />

              {filteredProducts.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-[#ddcabb] bg-white p-8 text-center text-sm text-[#8a7770]">
                  No products match your search.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {filteredProducts.map((product, index) => (
                    <article
                      key={product.id}
                      className="group rounded-2xl border border-[#efe4d9] bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <ProductArtwork
                        product={product}
                        priority={index === 0}
                      />
                      <div className="px-2 pb-2 pt-4">
                        <p className="text-xs font-medium text-[#a18471]">
                          {product.category}
                        </p>
                        <h3 className="mt-1.5 min-h-11 font-bold leading-5 text-[#43291e]">
                          {product.name}
                        </h3>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-lg font-bold text-[#43291e]">
                            ₹{product.price}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-[#8a7770]">
                            <ShoppingBag size={13} />
                            {product.sold} sold
                          </span>
                        </div>
                        <div className="mt-4 flex items-center justify-between border-t border-[#f0e6dc] pt-3">
                          <span
                            className={`text-xs font-semibold ${
                              product.stock < 20
                                ? 'text-amber-700'
                                : 'text-emerald-700'
                            }`}
                          >
                            {product.stock} in stock
                          </span>
                          <button
                            onClick={() =>
                              showNotice(
                                `${product.name}: product details preview.`,
                              )
                            }
                            className="rounded-lg p-2 text-[#8a7770] transition hover:bg-[#f8eee4] hover:text-[#47281b]"
                            aria-label={`View ${product.name}`}
                          >
                            <Eye size={17} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section id="orders" className="scroll-mt-28">
              <SectionHeading
                eyebrow="From checkout to doorstep"
                title="Recent orders"
                action={
                  <button
                    onClick={addDemoOrder}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#e8d9cb] bg-white px-3.5 py-2.5 text-sm font-semibold transition hover:bg-[#f8eee4]"
                  >
                    <Plus size={16} />
                    Add demo order
                  </button>
                }
              />

              <div className="overflow-hidden rounded-2xl border border-[#efe4d9] bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f0e6dc] px-5 py-4">
                  <div>
                    <h3 className="font-bold text-[#43291e]">Order activity</h3>
                    <p className="mt-1 text-xs text-[#9b8981]">
                      Sample data for your dashboard preview
                    </p>
                  </div>
                  <button
                    onClick={downloadOrders}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[#75472e] transition hover:bg-[#f8eee4]"
                  >
                    <Download size={15} />
                    CSV
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] text-left text-sm">
                    <thead className="bg-[#fcf8f3] text-xs uppercase tracking-wide text-[#9b8981]">
                      <tr>
                        <th className="px-5 py-4 font-semibold">Order</th>
                        <th className="px-5 py-4 font-semibold">Customer</th>
                        <th className="px-5 py-4 font-semibold">Product</th>
                        <th className="px-5 py-4 font-semibold">Date</th>
                        <th className="px-5 py-4 font-semibold">Amount</th>
                        <th className="px-5 py-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f2e9e0]">
                      {filteredOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="transition hover:bg-[#fdfaf6]"
                        >
                          <td className="whitespace-nowrap px-5 py-4 font-semibold text-[#75472e]">
                            {order.id}
                          </td>
                          <td className="whitespace-nowrap px-5 py-4">
                            <div className="flex items-center gap-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0dfce] text-xs font-bold text-[#75472e]">
                                {order.initials}
                              </span>
                              <span className="font-medium text-[#43291e]">
                                {order.customer}
                              </span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-5 py-4 text-[#8a7770]">
                            {order.product}
                          </td>
                          <td className="whitespace-nowrap px-5 py-4 text-[#8a7770]">
                            {order.date}
                          </td>
                          <td className="whitespace-nowrap px-5 py-4 font-semibold text-[#43291e]">
                            ₹{order.amount.toLocaleString('en-IN')}
                          </td>
                          <td className="whitespace-nowrap px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${order.color}`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {filteredOrders.length === 0 && (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-5 py-10 text-center text-[#9b8981]"
                          >
                            No orders match your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-[#f0e6dc] px-5 py-4 text-xs text-[#9b8981]">
                  <span>{filteredOrders.length} orders shown</span>
                  <span>Demo dashboard · Not connected to a database</span>
                </div>
              </div>
            </section>

            <section id="customers" className="scroll-mt-28">
              <SectionHeading
                eyebrow="The people behind every order"
                title="Customer love"
              />
              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex items-center gap-5 rounded-2xl border border-[#efe4d9] bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f4e2d0] text-[#75472e]">
                    <Heart size={27} />
                  </div>
                  <div>
                    <p className="text-sm text-[#8a7770]">Customer community</p>
                    <p className="mt-1 text-2xl font-bold">
                      864 chocolate lovers
                    </p>
                    <p className="mt-2 text-xs text-emerald-700">
                      Growing one sweet order at a time
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-5 rounded-2xl border border-[#efe4d9] bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f4e2d0] text-[#75472e]">
                    <CheckCircle2 size={27} />
                  </div>
                  <div>
                    <p className="text-sm text-[#8a7770]">
                      Delivered with care
                    </p>
                    <p className="mt-1 text-2xl font-bold">
                      92% order completion
                    </p>
                    <p className="mt-2 text-xs text-[#9b8981]">
                      Illustrative demo metric
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section aria-label="Inventory alerts">
              <SectionHeading
                eyebrow="A little heads-up"
                title="Inventory watch"
                action={
                  <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-800">
                    <AlertTriangle size={14} />2 products need attention
                  </span>
                }
              />
              <div className="grid gap-4 md:grid-cols-2">
                {products
                  .filter((product) => product.stock < 20)
                  .map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 rounded-2xl border border-amber-200/80 bg-[#fffdf9] p-4"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f7e8d6]">
                        <Image
                          src={`${imagePath}${product.image}`}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-[#43291e]">
                          {product.name}
                        </p>
                        <p className="mt-1 text-xs text-[#8a7770]">
                          Only {product.stock} items remaining
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          showNotice(`Restock reminder for ${product.name}.`)
                        }
                        className="shrink-0 rounded-lg bg-[#f5e6d4] px-3 py-2 text-xs font-semibold text-[#75472e] transition hover:bg-[#ead2b6]"
                      >
                        Restock
                      </button>
                    </div>
                  ))}
              </div>
            </section>

            <footer className="border-t border-[#eaded2] pb-4 pt-6">
              <div className="flex flex-col justify-between gap-3 text-xs text-[#9b8981] sm:flex-row sm:items-center">
                <p className="flex items-center gap-2">
                  <Candy size={16} className="text-[#75472e]" />© 2026 Cocoa &
                  Co. Chocolate Store Dashboard
                </p>
                <p className="flex items-center gap-2">
                  <Clock3 size={14} />
                  Built for a sweeter workflow
                </p>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
