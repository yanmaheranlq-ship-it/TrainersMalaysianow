import React, { useState, useMemo, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  ReferenceDot
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target, 
  Award, 
  Calendar, 
  MoreHorizontal, 
  Info, 
  ChevronDown,
  ArrowUpRight,
  Bookmark
} from 'lucide-react';
import { Trainer, PortfolioItem } from '../types';

// Custom empty tooltip to prevent Recharts from passing invalid DOM properties on default HTML div tooltips
const CustomHiddenTooltip = () => null;

interface TrainerSalesAnalyticsProps {
  trainer: Trainer;
  portfolios: PortfolioItem[];
}

// Seeded random helper to ensure different trainers have stable, customized values
function getSeededRandom(seedStr: string) {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  return function() {
    const x = Math.sin(hash++) * 10000;
    return x - Math.floor(x);
  };
}

export default function TrainerSalesAnalytics({ trainer, portfolios }: TrainerSalesAnalyticsProps) {
  const [selectedMonth, setSelectedMonth] = useState('Julai 2026');
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [hoveredData, setHoveredData] = useState<any>(null);
  const [hoveredPos, setHoveredPos] = useState<{ x: number; y: number } | null>(null);
  const [isChartHovered, setIsChartHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const months = ['Mei 2026', 'Jun 2026', 'Julai 2026'];

  // Seeded values based on trainer ID
  const rand = useMemo(() => getSeededRandom(trainer.id), [trainer.id]);
  
  // Calculate dynamic stats based on trainer's actual portfolio data
  const stats = useMemo(() => {
    const totalParticipants = portfolios.reduce((sum, p) => sum + (p.participantsCount || 0), 0);
    const avgPricePerSeat = 1500 + Math.floor(rand() * 1000); // realistic course price between RM1500 - RM2500
    const totalSales = totalParticipants * avgPricePerSeat;
    
    // Monthly stats calculation
    const monthlySalesTarget = 40000 + Math.floor(rand() * 20000);
    const currentMonthSales = 45000 + Math.floor(rand() * 25000);
    const targetAchievement = ((currentMonthSales / monthlySalesTarget) * 100).toFixed(1);
    
    return {
      totalParticipants,
      avgPricePerSeat,
      totalSales,
      monthlySalesTarget,
      currentMonthSales,
      targetAchievement,
    };
  }, [portfolios, rand]);

  // Generate 30 days of data that perfectly matches the curvy trajectory of the uploaded image
  const chartData = useMemo(() => {
    // Green curve actual values trace (around 140M - 260M in original, scaled to RM140k - RM260k or similar)
    // Day-by-day spline coordinate factors to guarantee beautiful smooth curves matching the user's reference
    const actualBase = [
      142, 144, 148, 155, 165, 172, 175, 172, 165, 158, 
      155, 160, 180, 205, 220, 200, 195, 190, 185, 195, 
      210, 230, 245, 248, 235, 215, 192, 186, 194, 196
    ];

    const targetBase = [
      182, 183, 182, 175, 165, 158, 164, 172, 184, 198,
      210, 220, 215, 190, 182, 170, 155, 146, 142, 140,
      142, 146, 158, 174, 182, 180, 174, 164, 154, 152
    ];

    // Adapt slightly based on selected month or trainer seed to keep it interactive and realistic
    const monthIndex = months.indexOf(selectedMonth);
    const multiplier = 1 + (monthIndex * 0.08) + (rand() * 0.05);

    return Array.from({ length: 30 }, (_, index) => {
      const day = index + 1;
      const actualRaw = actualBase[index] * multiplier;
      const targetRaw = targetBase[index] * multiplier;

      // Scale to realistic Malaysian Ringgit (e.g. RM140k to RM260k total monthly revenue or performance scale)
      return {
        day: day.toString(),
        sales: Math.round(actualRaw * 1000),
        target: Math.round(targetRaw * 1000),
      };
    });
  }, [selectedMonth, rand]);

  // Find day 13 data to display as default overlay indicator if nothing is hovered, matching the image design perfectly
  const featuredDayData = useMemo(() => {
    return chartData[12] || chartData[0]; // Day 13 is index 12
  }, [chartData]);

  // Format currency
  const formatMYR = (val: number) => {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Custom interactive tooltip that perfectly follows the active point on both desktop & mobile touch events
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div 
          className="pointer-events-none z-50 transition-all duration-75 ease-out"
          style={{ transform: 'translate(-50%, -100%) translateY(-12px)' }}
        >
          <div className="bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl border border-zinc-200/80 shadow-lg sm:shadow-xl text-center flex flex-col items-center justify-center relative min-w-[110px] sm:min-w-[140px] border-t-2 border-t-rose-500">
            <span className="text-[7.5px] sm:text-[9px] text-rose-500 font-extrabold uppercase tracking-widest block leading-none">Bulan Ini</span>
            <span className="text-xs sm:text-sm font-black text-zinc-900 tracking-tight leading-none mt-1">
              {formatMYR(data.sales)}
            </span>
            <span className="text-[8.5px] sm:text-[10px] text-zinc-500 font-bold block mt-0.5 leading-none">
              {selectedMonth.split(' ')[0]} (H-{data.day})
            </span>
            {/* The little drop triangle pointer */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rotate-45 border-r border-b border-zinc-200 -mt-0.5 sm:-mt-1" />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-zinc-50/50 border border-zinc-200/80 rounded-2xl p-2.5 sm:p-5 text-left shadow-sm mt-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
        
        {/* Main Chart Box (Left on Desktop, 8 columns) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-zinc-150 p-3 sm:p-5 shadow-xs relative flex flex-col justify-between">
          
          <div>
            {/* Chart Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <h3 className="font-sans text-xs sm:text-sm font-extrabold text-zinc-900 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-1.5 h-3.5 bg-rose-650 rounded-full inline-block bg-rose-600"></span>
                  Analisis Jualan & Prestasi
                </h3>
                <div className="group relative cursor-pointer">
                  <Info size={14} className="text-zinc-450 hover:text-rose-600 transition-colors" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-52 p-2 bg-zinc-955 text-white text-[10px] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 leading-relaxed font-semibold bg-zinc-900 border border-zinc-800">
                    Graf ini memaparkan tren hasil jualan sesi latihan bulanan (Garisan Merah) berbanding sasaran bulanan (Garisan Putus-putus).
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-[11px] font-bold text-zinc-500 hidden md:inline">Tempoh Laporan:</span>
                
                {/* Styled Dropdown like the image */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                    className="px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl text-[11px] font-extrabold text-zinc-800 flex items-center gap-1.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                  >
                    <Calendar size={12} className="text-zinc-500" />
                    <span>{selectedMonth}</span>
                    <ChevronDown size={11} className={`text-zinc-500 transition-transform duration-300 ${showMonthDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showMonthDropdown && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setShowMonthDropdown(false)} />
                      <div className="absolute right-0 mt-1.5 w-36 bg-white border border-zinc-200 rounded-xl shadow-lg py-1 z-40">
                        {months.map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => {
                              setSelectedMonth(m);
                              setShowMonthDropdown(false);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-xs font-bold transition-all block ${
                              selectedMonth === m 
                                ? 'bg-red-50 text-red-600' 
                                : 'text-zinc-700 hover:bg-zinc-50'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <button 
                  type="button"
                  className="p-1.5 hover:bg-zinc-100 rounded-lg text-zinc-400 hover:text-rose-600 border border-zinc-200/40 hover:border-rose-200 cursor-pointer transition-colors"
                >
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>

            {/* Recharts Area and Line Chart Combined */}
            <div className="h-56 sm:h-64 w-full mt-2 relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 15, right: 5, left: -15, bottom: 5 }}
                  onMouseEnter={() => setIsChartHovered(true)}
                  onMouseMove={(e: any) => {
                    setIsChartHovered(true);
                    if (e && e.activePayload && e.activePayload.length && e.activeCoordinate) {
                      setHoveredData(e.activePayload[0].payload);
                      setHoveredPos({ x: e.activeCoordinate.x, y: e.activeCoordinate.y });
                    }
                  }}
                  onMouseLeave={() => {
                    setIsChartHovered(false);
                    setHoveredData(null);
                    setHoveredPos(null);
                  }}
                >
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      {/* Beautiful rose/red premium gradient flow */}
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  
                  <CartesianGrid 
                    strokeDasharray="4 4" 
                    vertical={false} 
                    stroke="#e4e4e7" 
                    strokeWidth={0.8}
                  />
                  
                  <XAxis 
                    dataKey="day" 
                    tickLine={false} 
                    axisLine={false}
                    stroke="#71717a"
                    style={{ fontSize: '10px', fontWeight: 'bold' }}
                    dy={8}
                    ticks={['1', '5', '10', '15', '20', '25', '30']}
                  />
                  
                  <YAxis 
                    domain={[100000, 280000]}
                    tickLine={false} 
                    axisLine={false}
                    stroke="#71717a"
                    style={{ fontSize: '10px', fontWeight: 'bold' }}
                    dx={-3}
                    tickFormatter={(value) => `${(value / 1000)}k`}
                  />
                  
                  {/* Highly responsive Recharts Tooltip - dynamically renders our beautifully styled bubble exactly above the active dot on all screen sizes */}
                  <Tooltip 
                    content={<CustomTooltip />} 
                    cursor={{ stroke: '#f43f5e', strokeWidth: 1.5, strokeDasharray: '4 4' }}
                  />
                  
                  {/* Transparent background/grid area */}
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#f43f5e" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#colorSales)"
                    activeDot={{ r: 6, fill: '#f43f5e', stroke: '#ffffff', strokeWidth: 2 }}
                    isAnimationActive={false}
                  />

                  {/* Sleek Dashed Target Line */}
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#71717a" 
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                    activeDot={false}
                    isAnimationActive={false}
                  />

                  {/* Active/Featured Day ReferenceDot - placing the active dot, cursor line, and tooltip bubble dynamically at Day 13! */}
                  <ReferenceDot
                    key="featured-reference-dot"
                    x="13"
                    y={featuredDayData.sales}
                    isFront={true}
                    shape={(props: any) => {
                      if (isChartHovered) return null;
                      const { cx, cy } = props;
                      if (!cx || !cy) return null;
                      return (
                        <g>
                          {/* Vertical red cursor line */}
                          <line 
                            x1={cx} 
                            y1={15} 
                            x2={cx} 
                            y2={isMobile ? 185 : 220} 
                            stroke="#f43f5e" 
                            strokeWidth={1} 
                            strokeOpacity={0.7}
                            strokeDasharray="4 4" 
                          />
                          {/* Active Dot indicator */}
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r={isMobile ? 4.5 : 6} 
                            fill="#f43f5e" 
                            stroke="#ffffff" 
                            strokeWidth={isMobile ? 1.5 : 2} 
                          />
                          {/* Floating Tooltip Bubble precisely placed over the dot */}
                          <foreignObject 
                            x={cx - (isMobile ? 100 : 150)} 
                            y={cy - (isMobile ? 78 : 110)} 
                            width={isMobile ? 200 : 300} 
                            height={isMobile ? 75 : 100}
                            style={{ pointerEvents: 'none' }}
                          >
                            <div className="flex justify-center items-end h-full w-full pb-1.5 sm:pb-3">
                              <div className="bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl border border-zinc-200/80 shadow-lg sm:shadow-xl text-center flex flex-col items-center justify-center relative min-w-[110px] sm:min-w-[140px] border-t-2 border-t-rose-500">
                                <span className="text-[7.5px] sm:text-[9px] text-rose-500 font-extrabold uppercase tracking-widest block leading-none">Bulan Ini</span>
                                <span className="text-xs sm:text-sm font-black text-zinc-900 tracking-tight leading-none mt-1">
                                  {formatMYR(featuredDayData.sales)}
                                </span>
                                <span className="text-[8.5px] sm:text-[10px] text-zinc-500 font-bold block mt-0.5 leading-none">
                                  {selectedMonth.split(' ')[0]} {isMobile ? `(H-${featuredDayData.day})` : `(Hari ke-${featuredDayData.day})`}
                                </span>
                                {/* The little drop triangle pointer */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rotate-45 border-r border-b border-zinc-200 -mt-0.5 sm:-mt-1" />
                              </div>
                            </div>
                          </foreignObject>
                        </g>
                      );
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center justify-center gap-6 mt-3 pt-3 border-t border-zinc-100 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-rose-500 rounded-full inline-block shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
              <span className="text-[11px] font-bold text-zinc-650 text-zinc-600">Hasil Jualan Sebenar</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-0.5 border-t-2 border-dashed border-zinc-400 inline-block" />
              <span className="text-[11px] font-bold text-zinc-650 text-zinc-600">Sasaran Jualan (Target)</span>
            </div>
          </div>
        </div>

        {/* Metrics Box (Right on Desktop, 4 columns) */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3.5 h-full">
            
            {/* KPI 1 */}
            <div className="bg-white p-2.5 sm:p-3.5 rounded-xl border border-zinc-150 shadow-xs flex flex-col justify-between hover:border-rose-200 transition-all hover:shadow-xs group">
              <div className="flex items-center justify-between text-zinc-400 gap-1.5">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider leading-tight text-zinc-550 transition-colors">Jumlah Hasil Sesi</span>
                <div className="p-1 bg-red-50 text-red-600 rounded-lg shrink-0 border border-red-100 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <DollarSign size={13} />
                </div>
              </div>
              <div className="mt-2">
                <h4 className="text-base sm:text-lg font-black text-zinc-900 leading-none">
                  {formatMYR(stats.totalSales)}
                </h4>
                <span className="text-[9px] text-red-600 font-extrabold flex items-center gap-0.5 mt-1 leading-none">
                  <ArrowUpRight size={10} /> +12.4% tahunan
                </span>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="bg-white p-2.5 sm:p-3.5 rounded-xl border border-zinc-150 shadow-xs flex flex-col justify-between hover:border-rose-200 transition-all hover:shadow-xs group">
              <div className="flex items-center justify-between text-zinc-400 gap-1.5">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider leading-tight text-zinc-550 transition-colors">Jumlah Peserta</span>
                <div className="p-1 bg-red-50 text-red-600 rounded-lg shrink-0 border border-red-100 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <Users size={13} />
                </div>
              </div>
              <div className="mt-2">
                <h4 className="text-base sm:text-lg font-black text-zinc-900 leading-none">
                  {stats.totalParticipants.toLocaleString('ms-MY')} <span className="text-xs text-zinc-400 font-normal">orang</span>
                </h4>
                <span className="text-[9px] text-red-600 font-extrabold flex items-center gap-0.5 mt-1 leading-none">
                  <ArrowUpRight size={10} /> +8.2% bulan ini
                </span>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="bg-white p-2.5 sm:p-3.5 rounded-xl border border-zinc-150 shadow-xs flex flex-col justify-between hover:border-rose-200 transition-all hover:shadow-xs group">
              <div className="flex items-center justify-between text-zinc-400 gap-1.5">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider leading-tight text-zinc-550 transition-colors">Pencapaian KPI</span>
                <div className="p-1 bg-red-50 text-red-600 rounded-lg shrink-0 border border-red-100 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <Target size={13} />
                </div>
              </div>
              <div className="mt-2">
                <h4 className="text-base sm:text-lg font-black text-zinc-900 leading-none">
                  {stats.targetAchievement}%
                </h4>
                <span className="text-[9px] text-zinc-500 font-bold mt-1 block leading-none">
                  Sasaran: {formatMYR(stats.monthlySalesTarget)}
                </span>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="bg-white p-2.5 sm:p-3.5 rounded-xl border border-zinc-150 shadow-xs flex flex-col justify-between hover:border-rose-200 transition-all hover:shadow-xs group">
              <div className="flex items-center justify-between text-zinc-400 gap-1.5">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider leading-tight text-zinc-550 transition-colors">Purata Penilaian</span>
                <div className="p-1 bg-red-50 text-red-600 rounded-lg shrink-0 border border-red-100 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <Award size={13} />
                </div>
              </div>
              <div className="mt-2">
                <h4 className="text-base sm:text-lg font-black text-zinc-900 leading-none">
                  {trainer.rating.toFixed(2)} / 5.0
                </h4>
                <span className="text-[9px] text-red-600 font-extrabold mt-1 block leading-none">
                  Prestasi Cemerlang (Top 5%)
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
