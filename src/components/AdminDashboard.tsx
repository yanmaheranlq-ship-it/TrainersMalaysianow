import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Users,
  BookOpen,
  ClipboardList,
  Star,
  TrendingUp,
  Award,
  Activity,
  Calendar,
  Mail,
  Phone,
  Search,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Sparkles,
  CheckCircle,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from 'recharts';
import { Trainer, PortfolioItem, CategoryType } from '../types';
import { Registration } from '../App';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  trainers: Trainer[];
  portfolios: PortfolioItem[];
  registrations: Registration[];
  feedbacks: import('../types').FeedbackItem[];
  onSelectTrainer: (trainer: Trainer) => void;
}

type TabId = 'overview' | 'trainers' | 'programs' | 'registrations' | 'feedback';

const CATEGORY_COLORS: Record<CategoryType, string> = {
  safety: '#f43f5e',
  technical: '#0ea5e9',
  soft_skills: '#f97316',
  management: '#8b5cf6',
  marketing: '#d946ef',
  finance: '#10b981',
  business: '#f59e0b',
};

const CATEGORY_LABELS: Record<CategoryType, string> = {
  safety: 'Safety & Compliance',
  technical: 'Technical & IT',
  soft_skills: 'Soft Skills',
  management: 'Leadership & Mgmt',
  marketing: 'Marketing & Sales',
  finance: 'Finance',
  business: 'Business',
};

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  sub,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: string;
  sub?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-4 overflow-hidden group"
    >
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"
        style={{ background: accent }}
      />
      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</p>
          <p className="text-2xl font-black text-white mt-1 leading-none">{value}</p>
          {sub && <p className="text-[10px] text-zinc-400 mt-1.5">{sub}</p>}
        </div>
        <div
          className="p-2 rounded-xl border"
          style={{ background: `${accent}15`, borderColor: `${accent}40`, color: accent }}
        >
          <Icon size={18} />
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminDashboard({
  isOpen,
  onClose,
  trainers,
  portfolios,
  registrations,
  feedbacks,
  onSelectTrainer,
}: AdminDashboardProps) {
  const [tab, setTab] = useState<TabId>('overview');
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'rating' | 'projects' | 'name'>('rating');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  // Derived metrics
  const stats = useMemo(() => {
    const totalParticipants = portfolios.reduce((s, p) => s + (p.participantsCount || 0), 0);
    const avgRating =
      trainers.length > 0
        ? (trainers.reduce((s, t) => s + (t.rating || 0), 0) / trainers.length).toFixed(2)
        : '0.00';
    const completedPrograms = portfolios.filter((p) => p.status === 'Selesai').length;
    const activePrograms = portfolios.filter((p) => p.status === 'Aktif').length;
    const feedbackRate =
      registrations.length > 0
        ? Math.round((feedbacks.length / registrations.length) * 100)
        : 0;
    return {
      totalParticipants,
      avgRating,
      completedPrograms,
      activePrograms,
      feedbackRate,
    };
  }, [trainers, portfolios, registrations, feedbacks]);

  // Category distribution
  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    trainers.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return Object.entries(counts).map(([cat, count]) => ({
      name: CATEGORY_LABELS[cat as CategoryType] || cat,
      value: count,
      color: CATEGORY_COLORS[cat as CategoryType] || '#71717a',
    }));
  }, [trainers]);

  // Top trainers by rating
  const topTrainers = useMemo(() => {
    return [...trainers].sort((a, b) => b.rating - a.rating).slice(0, 5);
  }, [trainers]);

  // Program participants per trainer (top 6)
  const participantsByTrainer = useMemo(() => {
    const map: Record<string, number> = {};
    portfolios.forEach((p) => {
      map[p.trainerName] = (map[p.trainerName] || 0) + (p.participantsCount || 0);
    });
    return Object.entries(map)
      .map(([name, count]) => ({ name: name.split(' ')[0], total: count }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 6);
  }, [portfolios]);

  // Registrations over time (last 7 days)
  const registrationsTrend = useMemo(() => {
    const days: { label: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString('en-US', { weekday: 'short' });
      const count = registrations.filter((r) => r.createdAt.slice(0, 10) === key).length;
      days.push({ label, count });
    }
    return days;
  }, [registrations]);

  // Sorted & filtered trainers for table
  const filteredTrainers = useMemo(() => {
    const q = search.toLowerCase().trim();
    let list = trainers.filter(
      (t) =>
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
    list = list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'rating') cmp = a.rating - b.rating;
      else if (sortKey === 'projects') cmp = a.projectsCount - b.projectsCount;
      else cmp = a.name.localeCompare(b.name);
      return sortDir === 'desc' ? -cmp : cmp;
    });
    return list;
  }, [trainers, search, sortKey, sortDir]);

  const toggleSort = (key: 'rating' | 'projects' | 'name') => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else {
      setSortKey(key);
      setSortDir(key === 'name' ? 'asc' : 'desc');
    }
  };

  const TABS: { id: TabId; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'trainers', label: 'Trainers', icon: Users },
    { id: 'programs', label: 'Programs', icon: BookOpen },
    { id: 'registrations', label: 'Registrations', icon: ClipboardList },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-zinc-950/95 backdrop-blur-md overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
                  <ShieldCheck size={16} className="stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-white tracking-tight leading-none">
                    Admin Dashboard
                  </h2>
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                    Monitoring & Analytics
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-zinc-850 hover:bg-red-950 border border-zinc-800 hover:border-red-500/30 text-zinc-400 hover:text-red-400 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Tabs */}
            <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {TABS.map((t) => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`px-3.5 py-2 rounded-full text-[11px] font-extrabold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer border ${
                      active
                        ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-600/20'
                        : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    <Icon size={12} />
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* OVERVIEW */}
            {tab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Stat cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  <StatCard label="Total Trainers" value={trainers.length} icon={Users} accent="#ef4444" />
                  <StatCard label="Total Programs" value={portfolios.length} icon={BookOpen} accent="#0ea5e9" />
                  <StatCard label="Registrations" value={registrations.length} icon={ClipboardList} accent="#f59e0b" />
                  <StatCard label="Feedbacks" value={feedbacks.length} icon={Star} accent="#10b981" sub={`${stats.feedbackRate}% feedback rate`} />
                  <StatCard label="Avg Rating" value={stats.avgRating} icon={Award} accent="#8b5cf6" sub="across all trainers" />
                </div>

                {/* Charts grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Participants by trainer */}
                  <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-black text-white">Participants by Trainer</h3>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Top 6 by enrollment</p>
                      </div>
                      <TrendingUp size={16} className="text-red-400" />
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={participantsByTrainer}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{
                            background: '#18181b',
                            border: '1px solid #3f3f46',
                            borderRadius: 12,
                            fontSize: 12,
                          }}
                          cursor={{ fill: '#ef444420' }}
                        />
                        <Bar dataKey="total" fill="#ef4444" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Category distribution */}
                  <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-black text-white">Trainers by Category</h3>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Distribution</p>
                      </div>
                      <Sparkles size={16} className="text-red-400" />
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={85}
                          paddingAngle={3}
                        >
                          {categoryData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} stroke="#0a0a0a" strokeWidth={2} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: '#18181b',
                            border: '1px solid #3f3f46',
                            borderRadius: 12,
                            fontSize: 12,
                          }}
                        />
                        <Legend
                          wrapperStyle={{ fontSize: 10, color: '#a1a1aa' }}
                          iconType="circle"
                          iconSize={8}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Registrations trend */}
                <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-black text-white">Registrations Trend</h3>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Last 7 days</p>
                    </div>
                    <Calendar size={16} className="text-red-400" />
                  </div>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={registrationsTrend}>
                      <defs>
                        <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                      <XAxis dataKey="label" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{
                          background: '#18181b',
                          border: '1px solid #3f3f46',
                          borderRadius: 12,
                          fontSize: 12,
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#ef4444"
                        strokeWidth={2.5}
                        fill="url(#regGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Top trainers list */}
                <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-5">
                  <h3 className="text-sm font-black text-white mb-4">Top Rated Trainers</h3>
                  <div className="space-y-2">
                    {topTrainers.map((t, i) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          onSelectTrainer(t);
                          onClose();
                        }}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-zinc-950/50 hover:bg-zinc-900 border border-zinc-800/60 hover:border-red-500/30 transition-all cursor-pointer text-left"
                      >
                        <span className="text-xs font-black text-red-500 w-5 text-center">{i + 1}</span>
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-9 h-9 rounded-lg object-cover border border-zinc-800"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">{t.name}</p>
                          <p className="text-[10px] text-zinc-500 truncate">{t.title}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Star size={12} className="fill-amber-500 text-amber-500" />
                          <span className="text-xs font-black text-amber-400">{t.rating.toFixed(2)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TRAINERS */}
            {tab === 'trainers' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                    <input
                      type="text"
                      placeholder="Search trainers..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-red-500/60 transition-all"
                    />
                  </div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                    {filteredTrainers.length} of {trainers.length} trainers
                  </span>
                </div>

                <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl overflow-hidden overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-zinc-950/60 border-b border-zinc-800">
                      <tr className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                        <th className="px-4 py-3">Trainer</th>
                        <th className="px-4 py-3 hidden md:table-cell">Category</th>
                        <th
                          className="px-4 py-3 cursor-pointer hover:text-white transition-colors"
                          onClick={() => toggleSort('rating')}
                        >
                          <span className="flex items-center gap-1">
                            Rating
                            {sortKey === 'rating' &&
                              (sortDir === 'desc' ? <ChevronDown size={11} /> : <ChevronUp size={11} />)}
                          </span>
                        </th>
                        <th
                          className="px-4 py-3 cursor-pointer hover:text-white transition-colors"
                          onClick={() => toggleSort('projects')}
                        >
                          <span className="flex items-center gap-1">
                            Projects
                            {sortKey === 'projects' &&
                              (sortDir === 'desc' ? <ChevronDown size={11} /> : <ChevronUp size={11} />)}
                          </span>
                        </th>
                        <th className="px-4 py-3 hidden lg:table-cell">Contact</th>
                        <th
                          className="px-4 py-3 cursor-pointer hover:text-white transition-colors"
                          onClick={() => toggleSort('name')}
                        >
                          <span className="flex items-center gap-1">
                            Name
                            {sortKey === 'name' &&
                              (sortDir === 'asc' ? <ChevronDown size={11} /> : <ChevronUp size={11} />)}
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTrainers.map((t) => (
                        <tr
                          key={t.id}
                          className="border-b border-zinc-850 hover:bg-zinc-850/40 transition-colors cursor-pointer"
                          onClick={() => {
                            onSelectTrainer(t);
                            onClose();
                          }}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={t.avatar}
                                alt={t.name}
                                className="w-8 h-8 rounded-lg object-cover border border-zinc-800 shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-white truncate max-w-[160px]">{t.name}</p>
                                <p className="text-[10px] text-zinc-500 truncate max-w-[160px]">{t.title}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <span
                              className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                              style={{
                                color: CATEGORY_COLORS[t.category],
                                borderColor: `${CATEGORY_COLORS[t.category]}40`,
                                background: `${CATEGORY_COLORS[t.category]}15`,
                              }}
                            >
                              {CATEGORY_LABELS[t.category]}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <Star size={11} className="fill-amber-500 text-amber-500" />
                              <span className="text-xs font-bold text-amber-400">{t.rating.toFixed(2)}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-zinc-300 font-semibold">{t.projectsCount}</td>
                          <td className="px-4 py-3 hidden lg:table-cell">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                                <Mail size={9} /> {t.email}
                              </span>
                              <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                                <Phone size={9} /> {t.phone}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-zinc-400">{t.name}</td>
                        </tr>
                      ))}
                      {filteredTrainers.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-zinc-500 text-xs">
                            No trainers found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* PROGRAMS */}
            {tab === 'programs' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <StatCard label="Total Programs" value={portfolios.length} icon={BookOpen} accent="#0ea5e9" />
                  <StatCard label="Completed" value={stats.completedPrograms} icon={CheckCircle} accent="#10b981" />
                  <StatCard label="Active" value={stats.activePrograms} icon={Activity} accent="#f59e0b" />
                  <StatCard label="Participants" value={stats.totalParticipants} icon={Users} accent="#ef4444" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {portfolios.map((p) => (
                    <div
                      key={p.id}
                      className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-red-500/30 transition-all"
                    >
                      <div className="relative h-28">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                        <span
                          className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                            p.status === 'Selesai'
                              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                              : 'bg-amber-950/60 border-amber-500/40 text-amber-400'
                          }`}
                        >
                          {p.status || 'Selesai'}
                        </span>
                      </div>
                      <div className="p-3.5 space-y-2">
                        <p className="text-xs font-bold text-white leading-snug line-clamp-2">{p.title}</p>
                        <div className="flex items-center justify-between text-[10px] text-zinc-500">
                          <span className="truncate">{p.trainerName}</span>
                          <span className="shrink-0 ml-2">{p.duration} • {p.level}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                          <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                            <Users size={10} /> {p.participantsCount} enrolled
                          </span>
                          <span
                            className="px-1.5 py-0.5 rounded text-[9px] font-bold border"
                            style={{
                              color: CATEGORY_COLORS[p.category],
                              borderColor: `${CATEGORY_COLORS[p.category]}40`,
                              background: `${CATEGORY_COLORS[p.category]}15`,
                            }}
                          >
                            {CATEGORY_LABELS[p.category]}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {portfolios.length === 0 && (
                    <div className="col-span-full text-center py-12 text-zinc-500 text-xs">
                      No programs registered yet.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* REGISTRATIONS */}
            {tab === 'registrations' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <StatCard
                  label="Total Registrations"
                  value={registrations.length}
                  icon={ClipboardList}
                  accent="#f59e0b"
                  sub={`${feedbacks.length} feedbacks submitted`}
                />
                <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl overflow-hidden overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-zinc-950/60 border-b border-zinc-800">
                      <tr className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                        <th className="px-4 py-3">Ref ID</th>
                        <th className="px-4 py-3">Participant</th>
                        <th className="px-4 py-3 hidden md:table-cell">Program</th>
                        <th className="px-4 py-3 hidden lg:table-cell">Trainer</th>
                        <th className="px-4 py-3 hidden sm:table-cell">Date</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((r) => (
                        <tr key={r.id} className="border-b border-zinc-850 hover:bg-zinc-850/40 transition-colors">
                          <td className="px-4 py-3">
                            <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/30 border border-red-900/30 px-1.5 py-0.5 rounded">
                              {r.id}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-xs font-bold text-white">{r.participantName}</p>
                            <p className="text-[10px] text-zinc-500">{r.participantEmail}</p>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell text-xs text-zinc-300 max-w-[180px] truncate">
                            {r.programTitle}
                          </td>
                          <td className="px-4 py-3 hidden lg:table-cell text-xs text-zinc-400">{r.trainerName}</td>
                          <td className="px-4 py-3 hidden sm:table-cell text-[10px] text-zinc-500">
                            {new Date(r.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            {r.feedbackSubmitted ? (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                                <CheckCircle size={11} /> Reviewed
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400">
                                <AlertCircle size={11} /> Pending
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                      {registrations.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-zinc-500 text-xs">
                            No registrations yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* FEEDBACK */}
            {tab === 'feedback' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <StatCard label="Total Feedbacks" value={feedbacks.length} icon={MessageSquare} accent="#10b981" />
                  <StatCard
                    label="Avg Overall"
                    value={
                      feedbacks.length > 0
                        ? (feedbacks.reduce((s, f) => s + f.ratingOverall, 0) / feedbacks.length).toFixed(2)
                        : '0.00'
                    }
                    icon={Star}
                    accent="#f59e0b"
                  />
                  <StatCard
                    label="Avg Materials"
                    value={
                      feedbacks.length > 0
                        ? (feedbacks.reduce((s, f) => s + f.ratingMaterials, 0) / feedbacks.length).toFixed(2)
                        : '0.00'
                    }
                    icon={BookOpen}
                    accent="#0ea5e9"
                  />
                  <StatCard
                    label="Avg Trainer"
                    value={
                      feedbacks.length > 0
                        ? (feedbacks.reduce((s, f) => s + f.ratingTrainer, 0) / feedbacks.length).toFixed(2)
                        : '0.00'
                    }
                    icon={Award}
                    accent="#8b5cf6"
                  />
                </div>
                <div className="space-y-2.5">
                  {feedbacks.map((f) => (
                    <div
                      key={f.id}
                      className="bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-4"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg shrink-0">
                            <MessageSquare size={13} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-white truncate">{f.participantName}</p>
                            <p className="text-[10px] text-zinc-500 truncate">{f.programTitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex items-center gap-0.5">
                            <Star size={11} className="fill-amber-500 text-amber-500" />
                            <span className="text-xs font-black text-amber-400">{f.ratingOverall.toFixed(1)}</span>
                          </div>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${
                              f.expectationMet === 'Sangat Setuju'
                                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                                : f.expectationMet === 'Setuju'
                                ? 'bg-sky-950/40 border-sky-500/30 text-sky-400'
                                : 'bg-rose-950/40 border-rose-500/30 text-rose-400'
                            }`}
                          >
                            {f.expectationMet}
                          </span>
                        </div>
                      </div>
                      {f.comment && (
                        <p className="text-[11px] text-zinc-400 leading-relaxed bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/60">
                          "{f.comment}"
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-2 text-[10px] text-zinc-500">
                        <span>Materials: <strong className="text-zinc-300">{f.ratingMaterials}/5</strong></span>
                        <span>Trainer: <strong className="text-zinc-300">{f.ratingTrainer}/5</strong></span>
                        <span className="ml-auto">{new Date(f.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                  {feedbacks.length === 0 && (
                    <div className="text-center py-12 text-zinc-500 text-xs">No feedback submitted yet.</div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
