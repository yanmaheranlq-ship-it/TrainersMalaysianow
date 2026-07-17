import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Award, Mail, Phone, Clock, ArrowUpRight, ShieldCheck, Cpu, MessagesSquare, Users, BookOpen, GraduationCap, Compass, HelpCircle, Sparkles, ChevronDown, ChevronUp, TrendingUp, Coins, Briefcase, Loader2 } from 'lucide-react';
import { Trainer, PortfolioItem, TrainingStat, CategoryType } from '../types';

interface TrainerBentoGridProps {
  category: CategoryType | 'all';
  trainers: Trainer[];
  portfolios: PortfolioItem[];
  stats: TrainingStat[];
  onSelectTrainer: (trainer: Trainer) => void;
  onBookTraining: (courseTitle: string, trainerName: string) => void;
}

export default function TrainerBentoGrid({
  category,
  trainers,
  portfolios,
  stats,
  onSelectTrainer,
  onBookTraining
}: TrainerBentoGridProps) {
  
  // Dynamic filter lists
  const filteredTrainers = trainers.filter((t) => category === 'all' || t.category === category);
  const filteredPortfolios = portfolios.filter((p) => category === 'all' || p.category === category);

  // Sort all trainers to find top 5 overall
  const sortedTrainersForRanking = [...trainers].sort((a, b) => {
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    return b.projectsCount - a.projectsCount;
  });
  const topFiveIds = sortedTrainersForRanking.slice(0, 5).map(t => t.id);

  // Helper colors
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'safety':
        return {
          bg: 'bg-rose-50 border-rose-100',
          badge: 'bg-rose-100 text-rose-700 border-rose-200/60',
          text: 'text-rose-600',
          hoverText: 'hover:text-rose-700',
          accent: 'rose',
          icon: ShieldCheck,
          label: 'Safety & Compliance'
        };
      case 'technical':
        return {
          bg: 'bg-sky-50 border-sky-100',
          badge: 'bg-sky-100 text-sky-700 border-sky-200/60',
          text: 'text-sky-600',
          hoverText: 'hover:text-sky-700',
          accent: 'sky',
          icon: Cpu,
          label: 'Technical & IT'
        };
      case 'management':
        return {
          bg: 'bg-violet-50 border-violet-100',
          badge: 'bg-violet-100 text-violet-700 border-violet-200/60',
          text: 'text-violet-600',
          hoverText: 'hover:text-violet-700',
          accent: 'violet',
          icon: Users,
          label: 'Leadership & Management'
        };
      case 'marketing':
        return {
          bg: 'bg-fuchsia-50 border-fuchsia-100',
          badge: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200/60',
          text: 'text-fuchsia-600',
          hoverText: 'hover:text-fuchsia-700',
          accent: 'fuchsia',
          icon: TrendingUp,
          label: 'Marketing & Sales'
        };
      case 'finance':
        return {
          bg: 'bg-emerald-50 border-emerald-100',
          badge: 'bg-emerald-100 text-emerald-700 border-emerald-200/60',
          text: 'text-emerald-600',
          hoverText: 'hover:text-emerald-700',
          accent: 'emerald',
          icon: Coins,
          label: 'Finance & Investment'
        };
      case 'business':
        return {
          bg: 'bg-amber-50 border-amber-100',
          badge: 'bg-amber-100 text-amber-700 border-amber-200/60',
          text: 'text-amber-600',
          hoverText: 'hover:text-amber-700',
          accent: 'amber',
          icon: Briefcase,
          label: 'Business & Entrepreneurship'
        };
      case 'soft_skills':
        return {
          bg: 'bg-orange-50 border-orange-100',
          badge: 'bg-orange-100 text-orange-700 border-orange-200/60',
          text: 'text-orange-650',
          hoverText: 'hover:text-orange-750',
          accent: 'orange',
          icon: MessagesSquare,
          label: 'Soft Skills'
        };
      default:
        return {
          bg: 'bg-zinc-50 border-zinc-200/80',
          badge: 'bg-red-50 text-red-600 border-red-200/60',
          text: 'text-red-600',
          hoverText: 'hover:text-red-700',
          accent: 'red',
          icon: Compass,
          label: 'All Fields'
        };
    }
  };

  const getStatIcon = (iconName: string, className = "text-red-600") => {
    switch (iconName) {
      case 'Users':
        return <Users className={className} size={20} />;
      case 'BookOpen':
        return <BookOpen className={className} size={20} />;
      case 'GraduationCap':
        return <GraduationCap className={className} size={20} />;
      case 'Star':
        return <Star className={`${className} fill-amber-400`} size={20} />;
      default:
        return <Award className={className} size={20} />;
    }
  };

  const getStatMeta = (id: string) => {
    switch (id) {
      case 's1': // Jumlah Trainer
        return {
          gradient: 'from-zinc-900 to-zinc-950 hover:from-zinc-950 hover:to-zinc-900',
          border: 'border-zinc-800/80',
          iconBg: 'bg-zinc-900 border-zinc-800 text-red-500',
          badge: 'bg-emerald-950/60 border-emerald-900/40 text-emerald-400',
          badgeIcon: <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        };
      case 's2': // Course Portfolio
        return {
          gradient: 'from-zinc-900 to-zinc-950 hover:from-zinc-950 hover:to-zinc-900',
          border: 'border-zinc-800/80',
          iconBg: 'bg-zinc-900 border-zinc-800 text-red-500',
          badge: 'bg-red-950/60 border-red-900/40 text-red-400',
          badgeIcon: <Sparkles size={10} className="text-red-500" />
        };
      case 's3': // Trained Personnel
        return {
          gradient: 'from-zinc-900 to-zinc-950 hover:from-zinc-950 hover:to-zinc-900',
          border: 'border-zinc-800/80',
          iconBg: 'bg-zinc-900 border-zinc-800 text-red-500',
          badge: 'bg-blue-950/60 border-blue-900/40 text-blue-400',
          badgeIcon: <Award size={10} className="text-blue-500" />
        };
      case 's4': // Average Rating
        return {
          gradient: 'from-zinc-900 to-zinc-950 hover:from-zinc-950 hover:to-zinc-900',
          border: 'border-zinc-800/80',
          iconBg: 'bg-zinc-900 border-zinc-800 text-amber-500',
          badge: 'bg-amber-950/60 border-amber-900/40 text-amber-400',
          badgeIcon: <Star size={10} className="text-amber-500 fill-amber-400" />
        };
      default:
        return {
          gradient: 'from-zinc-900 to-zinc-950',
          border: 'border-zinc-800',
          iconBg: 'bg-zinc-900 border-zinc-800',
          badge: 'bg-zinc-900 border-zinc-800 text-zinc-400',
          badgeIcon: null
        };
    }
  };

  // Define types for our dynamic, gap-free bento items
  type BentoItem =
    | { id: string; type: 'stats'; gridClass: string }
    | { id: string; type: 'promo'; gridClass: string }
    | { id: string; type: 'trainer'; data: Trainer; gridClass: string }
    | { id: string; type: 'skeleton'; gridClass: string };

  // Track visible count instead of just a binary isExpanded state
  const [visibleCount, setVisibleCount] = useState(6);
  const [isBuffering, setIsBuffering] = useState(false);

  // Reset visibleCount and buffering when selected category or trainers list size changes
  useEffect(() => {
    setVisibleCount(6);
    setIsBuffering(false);
  }, [category, filteredTrainers.length]);

  const hasMoreThanSix = filteredTrainers.length > 6;
  const isFullyExpanded = visibleCount >= filteredTrainers.length;

  const handleToggleExpand = () => {
    const totalCount = filteredTrainers.length;
    if (!isFullyExpanded) {
      setIsBuffering(true);
      setTimeout(() => {
        setVisibleCount(prev => Math.min(totalCount, prev + 20));
        setIsBuffering(false);
      }, 1200); // Elegant 1.2s buffering animation to show loading skeleton cards
    } else {
      setVisibleCount(6);
    }
  };

  const displayedTrainers = filteredTrainers.slice(0, visibleCount);

  const bentoItems: BentoItem[] = [];

  const trainersCopy = [...displayedTrainers];

  // 2. Distribute trainers and insert promo card nicely
  trainersCopy.forEach((tr, index) => {
    // Insert promo card as the 4th item (perfectly fills Row 2 alongside first 3 trainers on desktop)
    if (index === 3) {
      bentoItems.push({
        id: 'bento-promo-mid',
        type: 'promo',
        gridClass: 'col-span-1'
      });
    }
    bentoItems.push({
      id: `trainer-${tr.id}`,
      type: 'trainer',
      data: tr,
      gridClass: 'col-span-1'
    });
  });

  // If there are fewer than 3 trainers, append promo card at the end so it always appears
  if (trainersCopy.length < 3) {
    bentoItems.push({
      id: 'bento-promo-end',
      type: 'promo',
      gridClass: 'col-span-1'
    });
  }

  // Append beautiful skeleton placeholder cards to fill space and guide visual feedback during buffering
  if (isBuffering) {
    const remainingCount = filteredTrainers.length - visibleCount;
    const skeletonCount = Math.min(4, remainingCount > 0 ? remainingCount : 3);
    for (let i = 0; i < skeletonCount; i++) {
      bentoItems.push({
        id: `skeleton-card-${i}`,
        type: 'skeleton',
        gridClass: 'col-span-1'
      });
    }
  }

  return (
    <div className="space-y-6" id="bento-grid-wrapper">
      
      {/* Dynamic Bento Container */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-6">
        
        {bentoItems.map((item, index) => {
          if (item.type === 'promo') {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className={`hidden sm:flex relative h-[280px] sm:h-[360px] md:h-[460px] bg-gradient-to-br from-zinc-900/90 via-zinc-950/95 to-black text-zinc-300 rounded-2xl md:rounded-3xl overflow-hidden p-4 md:p-6 border border-zinc-800/80 shadow-2xl hover:border-red-500/30 hover:shadow-red-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${item.gridClass}`}
                id="bento-promo-card"
              >
                <div className="space-y-2 md:space-y-3.5">
                  <div className="p-1.5 md:p-2.5 bg-red-500/10 rounded-lg md:rounded-xl w-fit border border-red-500/20 shadow-inner flex items-center justify-center">
                    <Award className="text-red-500 w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs md:text-base font-black text-white tracking-wide mt-1 md:mt-2">
                      Training Guarantee System
                    </h4>
                    <p className="text-[10px] md:text-[12px] text-zinc-400 leading-normal md:leading-relaxed font-medium mt-1 md:mt-2">
                      All training series are conducted by HRD Corp certified trainers to ensure 100% levy refund approval.
                    </p>
                  </div>
                </div>

                <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-zinc-800/60 flex items-center justify-between gap-1">
                  <span className="text-[8px] md:text-[10px] font-extrabold tracking-widest uppercase text-red-500 bg-red-950/40 border border-red-900/30 px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full whitespace-nowrap">
                    100% Claimable
                  </span>
                  <div className="text-[8px] md:text-[10px] bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 md:px-2.5 md:py-1 rounded font-extrabold text-zinc-200 shadow-inner whitespace-nowrap">
                    HRD Corp
                  </div>
                </div>
              </motion.div>
            );
          }

          if (item.type === 'skeleton') {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative h-[280px] sm:h-[360px] md:h-[460px] rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-900 shadow-xl p-4 sm:p-6 flex flex-col justify-between"
                id={item.id}
              >
                {/* Full-size dark background */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-900/40 via-zinc-950 to-black" />

                {/* Shimmer sweep animation overlay */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: "linear"
                  }}
                  className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-red-500/[0.03] to-transparent pointer-events-none"
                />

                {/* Central Soft Ambient Glow and Spinner */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 z-10 pointer-events-none">
                  <div className="relative flex items-center justify-center h-10 w-10">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-500/10 animate-ping opacity-75" />
                    <Loader2 className="text-red-500 animate-spin z-10" size={20} />
                  </div>
                </div>

                {/* Top overlay elements inside skeleton */}
                <div className="relative z-10 flex items-center justify-between w-full pointer-events-none">
                  {/* Category Pill Skeleton */}
                  <div className="h-5 w-16 sm:h-6 sm:w-24 bg-zinc-900/80 rounded-full border border-zinc-800/40 animate-pulse" />
                  {/* Rank Badge Skeleton */}
                  <div className="h-5 w-12 sm:h-6 sm:w-16 bg-zinc-900/50 rounded-full border border-zinc-800/30 animate-pulse" />
                </div>

                {/* Bottom details layout skeleton */}
                <div className="relative z-10 space-y-3 w-full pointer-events-none">
                  {/* Rating Badge Skeleton */}
                  <div className="h-4 w-9 bg-zinc-900/80 rounded-full border border-zinc-800/40 animate-pulse" />

                  <div className="space-y-2 w-full">
                    {/* Name block skeleton */}
                    <div className="h-5 sm:h-7 w-[75%] bg-zinc-900 rounded-lg border border-zinc-850/40 animate-pulse" />
                    
                    {/* Title block skeleton */}
                    <div className="h-3.5 sm:h-4 w-[45%] bg-zinc-900/60 rounded-md border border-zinc-850/30 animate-pulse" />

                    {/* Quick Info Line Skeleton */}
                    <div className="h-3 w-[25%] bg-zinc-950/40 rounded-md border border-zinc-900/40 animate-pulse hidden sm:block" />
                  </div>
                </div>
              </motion.div>
            );
          }

          if (item.type === 'trainer') {
            const tr = item.data;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className={`relative h-[280px] sm:h-[360px] md:h-[460px] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl group hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-end cursor-pointer ${item.gridClass}`}
                id={`bento-trainer-card-${tr.id}`}
                onClick={() => onSelectTrainer(tr)}
              >
                {/* Full-size background image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={tr.avatar}
                    alt={tr.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-750 ease-out filter brightness-[0.85] contrast-[1.05]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Bottom-heavy dark gradient for extreme text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
                </div>

                {/* Category tag overlay (top-left) */}
                <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
                  <span className="px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black tracking-widest uppercase border border-white/10 bg-zinc-950/65 backdrop-blur-md text-white/95 shadow-md truncate max-w-[80px] sm:max-w-none inline-block">
                    {getCategoryTheme(tr.category).label}
                  </span>
                </div>

                {/* Rank Badge overlay (top-right) */}
                {topFiveIds.includes(tr.id) && (
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
                    <span className={`px-1.5 py-0.5 md:px-3 md:py-1.5 rounded-full text-[7px] md:text-[9px] font-black tracking-widest uppercase border shadow-md flex items-center gap-0.5 md:gap-1 ${
                      topFiveIds.indexOf(tr.id) === 0 ? 'bg-amber-500/90 text-white border-amber-400/50' :
                      topFiveIds.indexOf(tr.id) === 1 ? 'bg-slate-300 text-zinc-950 border-white' :
                      topFiveIds.indexOf(tr.id) === 2 ? 'bg-amber-700 text-white border-amber-600' :
                      topFiveIds.indexOf(tr.id) === 3 ? 'bg-blue-600 text-white border-blue-400' :
                      'bg-emerald-600 text-white border-emerald-400'
                    }`}>
                      👑 <span className="hidden xs:inline">Rank </span>#{topFiveIds.indexOf(tr.id) + 1}
                    </span>
                  </div>
                )}

                {/* Trainer Information Overlay (layered on top, bottom aligned) */}
                <div className="relative z-10 p-3 sm:p-5 md:p-6 flex flex-col space-y-1 md:space-y-3">
                  {/* Rating badge */}
                  <div className="w-fit bg-zinc-950/50 backdrop-blur-md px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full flex items-center space-x-1 border border-white/10 shadow-sm">
                    <Star className="text-amber-400 fill-amber-400" size={9} />
                    <span className="text-[9px] md:text-[11px] font-extrabold text-white">{tr.rating.toFixed(2)}</span>
                  </div>

                  <div className="space-y-1.5 md:space-y-2 mt-auto">
                    {/* Name & Button Row */}
                    <div className="flex items-center justify-between gap-1 md:gap-3">
                      <h3 className="font-sans text-sm sm:text-lg md:text-2xl lg:text-3xl leading-tight font-black text-white tracking-tight drop-shadow-sm group-hover:text-red-400 transition-colors line-clamp-1 sm:line-clamp-2 md:line-clamp-none">
                        {tr.name}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTrainer(tr);
                        }}
                        className="p-1 md:p-2 rounded-full bg-white/10 hover:bg-white backdrop-blur-md text-white hover:text-zinc-950 border border-white/15 hover:border-white transition-all duration-300 cursor-pointer flex items-center justify-center h-6 w-6 md:h-8 md:w-8 shadow-md hover:shadow-lg hover:scale-105 shrink-0"
                        id={`detail-btn-${tr.id}`}
                        title="View Full Profile"
                      >
                        <ArrowUpRight size={12} className="md:size-[16px]" />
                      </button>
                    </div>

                    {/* Specialty Title - Always visible under the name */}
                    <p className="text-[8px] sm:text-[11px] text-red-400 font-extrabold tracking-widest uppercase truncate mt-0.5 leading-none">
                      {tr.title}
                    </p>

                    {/* Interactive Info Trigger below the name - Hidden on mobile, visible on desktop */}
                    <div className="hidden sm:flex items-center gap-1 md:gap-1.5 text-[7px] md:text-[10px] font-black tracking-widest text-zinc-400 group-hover:text-red-400 transition-colors duration-300 select-none">
                      <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-red-500"></span>
                      </span>
                      <span>QUICK INFO ▾</span>
                    </div>

                    {/* Hidden Description that slides/fades in automatically */}
                    <div className="max-h-0 opacity-0 group-hover:max-h-36 group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden space-y-1 md:space-y-2">
                      <div>
                        <p className="text-[9px] md:text-xs text-zinc-300 line-clamp-1 md:line-clamp-2 leading-relaxed font-normal mt-0.5">
                          {tr.bio}
                        </p>
                      </div>
                      <div className="border-t border-white/10 pt-1 md:pt-2 text-[9px] md:text-[11px] text-zinc-300 font-medium tracking-wide">
                        Experience: <span className="font-bold text-white">{tr.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          }

          return null;
        })}

      </div>

      {/* See More / Show Less Button */}
      {hasMoreThanSix && (
        <div className="relative flex items-center justify-center pt-8 pb-2" id="bento-expand-container">
          {/* Decorative Modern Divider Lines */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none px-4 sm:px-6">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-800/60 to-transparent" />
          </div>

          <button
            onClick={handleToggleExpand}
            disabled={isBuffering}
            className={`relative group px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-850 border border-zinc-800/80 hover:border-zinc-700/80 text-white font-extrabold text-[11px] uppercase tracking-widest shadow-xl shadow-black/30 transition-all duration-300 flex items-center gap-3 select-none ${isBuffering ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'}`}
            id="see-more-trainers-btn"
          >
            <span>{isBuffering ? 'Loading...' : isFullyExpanded ? 'Show Less' : 'Show More'}</span>
            
            {!isFullyExpanded && !isBuffering && (
              <span className="px-2 py-0.5 text-[9px] font-black bg-red-950/60 text-red-400 rounded-full border border-red-900/30 group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-colors duration-300">
                +{filteredTrainers.length - visibleCount}
              </span>
            )}
            
            <motion.div
              animate={{ rotate: isFullyExpanded ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className="p-1 rounded-full bg-zinc-800 text-zinc-400 group-hover:text-current transition-colors flex items-center justify-center"
            >
              {isBuffering ? (
                <Loader2 size={11} className="animate-spin text-red-500" />
              ) : (
                <ChevronDown size={11} />
              )}
            </motion.div>
          </button>
        </div>
      )}

      {/* Edge case: No results for searching/filtering */}
      {filteredTrainers.length === 0 && (
        <div className="p-12 text-center border border-zinc-800/80 rounded-3xl bg-zinc-900/40 max-w-md mx-auto space-y-4 shadow-2xl">
          <div className="p-3 bg-red-950/40 rounded-full w-fit mx-auto text-red-500 border border-red-900/40 shadow-inner">
            <HelpCircle size={22} />
          </div>
          <div>
            <h4 className="text-white text-sm font-black tracking-wide uppercase">No Records Found</h4>
            <p className="text-[11px] text-zinc-400 mt-1.5 leading-relaxed">
              No trainers or training portfolios matched your category filter or search query at this time. Please try other keywords or options.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
