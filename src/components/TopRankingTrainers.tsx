import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Star, Award, ArrowUpRight, TrendingUp, Trophy, Sparkles, ChevronRight, Medal } from 'lucide-react';
import { Trainer } from '../types';

interface TopRankingTrainersProps {
  trainers: Trainer[];
  onSelectTrainer: (trainer: Trainer) => void;
}

export default function TopRankingTrainers({ trainers, onSelectTrainer }: TopRankingTrainersProps) {
  const [activeIndex, setActiveIndex] = useState(2);
  const prevActiveIndexRef = useRef(activeIndex);
  const [isMobile, setIsMobile] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [wheelCooldown, setWheelCooldown] = useState(false);
  const [dragStartTime, setDragStartTime] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Keep track of trainers in local state to allow dynamic simulation updates
  const [localTrainers, setLocalTrainers] = useState<Trainer[]>(trainers);
  
  // Track previous rankings to show Rank Up / Rank Down animations & delta indicators
  const [prevRanksMap, setPrevRanksMap] = useState<Record<string, number>>({});

  // Floating notifications for rating or rank changes
  const [liveNotification, setLiveNotification] = useState<{
    id: string;
    trainerName: string;
    avatar: string;
    message: string;
    type: 'rank_up' | 'rank_down' | 'score_boost';
  } | null>(null);

  // Futuristic live update tracking for row visual transitions & neon pulses
  const [lastUpdatedTrainerId, setLastUpdatedTrainerId] = useState<string | null>(null);
  const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState<number>(0);
  const [lastUpdateType, setLastUpdateType] = useState<'rank_up' | 'rank_down' | 'score_boost' | null>(null);
  const [lastUpdateDelta, setLastUpdateDelta] = useState<string | null>(null);

  // State to control how many trainers are shown on mobile
  const [showAllMobile, setShowAllMobile] = useState(false);

  // Sync with prop changes (e.g. if a trainer gets added from outside)
  useEffect(() => {
    setLocalTrainers(trainers);
  }, [trainers]);

  // Set up the dynamic simulation loop for interactive live ranking transitions
  useEffect(() => {
    const interval = setInterval(() => {
      if (localTrainers.length === 0) return;

      // Select a random trainer
      const randomIndex = Math.floor(Math.random() * localTrainers.length);
      const targetTrainer = localTrainers[randomIndex];

      // Store current sorted state to track pre-update rankings
      const currentSortedIds = [...localTrainers]
        .sort((a, b) => {
          if (b.rating !== a.rating) return b.rating - a.rating;
          return b.projectsCount - a.projectsCount;
        })
        .map(t => t.id);
      
      const prevRankIndex = currentSortedIds.indexOf(targetTrainer.id);

      // Create previous rankings index mapping for rank up/down indicators
      const newRanksMap: Record<string, number> = {};
      currentSortedIds.forEach((id, idx) => {
        newRanksMap[id] = idx;
      });
      setPrevRanksMap(newRanksMap);

      // Randomly increase rating or launch a new training program
      const updateType = Math.random() > 0.5 ? 'rating' : 'projects';
      let scoreText = '';
      
      const updatedTrainers = localTrainers.map((t) => {
        if (t.id === targetTrainer.id) {
          if (updateType === 'rating' && t.rating < 5.0) {
            const increment = parseFloat((0.01 + Math.random() * 0.03).toFixed(2));
            const newRating = Math.min(5.0, t.rating + increment);
            scoreText = `menerima penilaian tinggi! Rating meningkat ke ⭐ ${newRating.toFixed(2)} (+${increment.toFixed(2)})`;
            return { ...t, rating: newRating };
          } else {
            const newCount = t.projectsCount + 1;
            scoreText = `melancarkan program baru! Jumlah kursus kini: 📚 ${newCount}`;
            return { ...t, projectsCount: newCount };
          }
        }
        return t;
      });

      // Calculate new rank index post-update
      const newSortedIds = [...updatedTrainers]
        .sort((a, b) => {
          if (b.rating !== a.rating) return b.rating - a.rating;
          return b.projectsCount - a.projectsCount;
        })
        .map(t => t.id);
      
      const newRankIndex = newSortedIds.indexOf(targetTrainer.id);

      // Determine live alert details based on leaderboard shift
      let type: 'rank_up' | 'rank_down' | 'score_boost' = 'score_boost';
      let alertMessage = '';

      if (newRankIndex < prevRankIndex && newRankIndex < 10) {
        type = 'rank_up';
        alertMessage = `Naik ke Kedudukan #${newRankIndex + 1}! ${scoreText}`;
      } else {
        alertMessage = scoreText;
      }

      setLiveNotification({
        id: Math.random().toString(),
        trainerName: targetTrainer.name,
        avatar: targetTrainer.avatar,
        message: alertMessage,
        type,
      });

      setLastUpdatedTrainerId(targetTrainer.id);
      setLastUpdateTimestamp(Date.now());
      setLastUpdateType(type);
      setLastUpdateDelta(prevRankIndex !== -1 && prevRankIndex > newRankIndex ? `+${prevRankIndex - newRankIndex}` : null);

      setLocalTrainers(updatedTrainers);
    }, 10000); // Trigger live updates every 10 seconds for standard interactive pacing

    return () => clearInterval(interval);
  }, [localTrainers]);

  // Automatically dismiss live updates feed
  useEffect(() => {
    if (!liveNotification) return;
    const timer = setTimeout(() => {
      setLiveNotification(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [liveNotification]);

  // Keep track of previous activeIndex to identify wrapping cards
  useEffect(() => {
    prevActiveIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Monitor screen size for premium responsive offsets
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sort trainers dynamically by rating (descending), then by projects count (descending)
  const sortedTrainers = [...localTrainers].sort((a, b) => {
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    return b.projectsCount - a.projectsCount;
  });

  // Take the top 5 trainers
  const topFive = sortedTrainers.slice(0, 5);

  // Auto-play timer for seamless, fluid card transitions
  useEffect(() => {
    if (isDragging || isHovered || topFive.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === topFive.length - 1 ? 0 : prev + 1));
    }, 4500); // Transitions elegantly every 4.5 seconds

    return () => clearInterval(interval);
  }, [isDragging, isHovered, topFive.length]);

  const stepThreshold = isMobile ? 110 : 145;

  if (topFive.length === 0) return null;

  // Next & Prev navigation
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? topFive.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === topFive.length - 1 ? 0 : prev + 1));
  };

  const handleDragStart = (clientX: number, clientY: number | null = null) => {
    setDragStartX(clientX);
    if (clientY !== null) {
      setDragStartY(clientY);
    }
    setIsDragging(false);
    setDragOffset(0);
    setDragStartTime(Date.now());
  };

  const handleDragMove = (clientX: number, clientY: number | null = null) => {
    if (dragStartX === null) return;
    const diffX = clientX - dragStartX;

    // Check if dragging has officially started.
    // If not, require exceeding a threshold (e.g., 10px) to distinguish from tap/vertical scroll
    if (!isDragging) {
      const absDiffX = Math.abs(diffX);
      if (clientY !== null && dragStartY !== null) {
        const diffY = Math.abs(clientY - dragStartY);
        // If vertical movement is larger, cancel the gesture and allow normal page scroll
        if (diffY > 8 && diffY > absDiffX) {
          setDragStartX(null);
          setDragStartY(null);
          return;
        }
      }
      if (absDiffX > 10) {
        setIsDragging(true);
        // Calibrate start point so there is no sudden jump
        setDragStartX(clientX - (diffX > 0 ? 10 : -10));
        return;
      }
      return; // Haven't met threshold yet
    }

    const distance = diffX;
    // Add fluid elastic boundaries
    const maxDrag = stepThreshold * 1.25;
    let boundedDistance = distance;
    if (Math.abs(distance) > maxDrag) {
      const excess = Math.abs(distance) - maxDrag;
      boundedDistance = (distance > 0 ? 1 : -1) * (maxDrag + excess * 0.18);
    }
    setDragOffset(boundedDistance);
  };

  const handleDragEnd = () => {
    const wasDragging = isDragging;
    setIsDragging(false);
    setDragStartX(null);
    setDragStartY(null);

    if (!wasDragging) {
      setDragOffset(0);
      setDragStartTime(null);
      return;
    }

    const dragDuration = dragStartTime ? Date.now() - dragStartTime : 0;
    // Fast flick detection (at least 20px in under 260ms)
    const isFlick = dragDuration < 260 && Math.abs(dragOffset) > 20;
    const swipeThreshold = stepThreshold * 0.3; // Responsive threshold (30% of step)

    if (dragOffset > swipeThreshold || (isFlick && dragOffset > 0)) {
      handlePrev();
    } else if (dragOffset < -swipeThreshold || (isFlick && dragOffset < 0)) {
      handleNext();
    }
    setDragOffset(0);
    setDragStartTime(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    // If the horizontal scroll delta is significant
    if (Math.abs(e.deltaX) > 15) {
      if (wheelCooldown) return;
      setWheelCooldown(true);
      setTimeout(() => setWheelCooldown(false), 140); // Snappy cooldown for fast fluid scroll

      if (e.deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Helper for Rank Badges & Styles with Apple-style Minimalism
  const getRankMeta = (index: number) => {
    switch (index) {
      case 0:
        return {
          rank: 1,
          colorClass: 'shadow-amber-500/10 ring-1 ring-amber-500/10',
          glowClass: 'from-amber-400/8 via-amber-200/4 to-transparent',
          badgeClass: 'bg-amber-950/60 text-amber-300 border-amber-900/40',
          icon: <Crown className="text-amber-400 animate-pulse" size={14} />,
          medalText: '1st Place',
          label: 'First-Class Trainer',
          titleColor: 'text-white',
          badgeLabel: 'Gold Trainer',
          rankColor: 'text-amber-400'
        };
      case 1:
        return {
          rank: 2,
          colorClass: 'shadow-zinc-500/10 ring-1 ring-zinc-500/10',
          glowClass: 'from-zinc-400/6 via-zinc-200/3 to-transparent',
          badgeClass: 'bg-zinc-900 text-zinc-300 border-zinc-800',
          icon: <Trophy className="text-zinc-400" size={13} />,
          medalText: '2nd Place',
          label: 'High-Performing Trainer',
          titleColor: 'text-white',
          badgeLabel: 'Silver Trainer',
          rankColor: 'text-zinc-400'
        };
      case 2:
        return {
          rank: 3,
          colorClass: 'shadow-orange-700/10 ring-1 ring-orange-700/10',
          glowClass: 'from-orange-600/6 via-orange-300/3 to-transparent',
          badgeClass: 'bg-orange-950/60 text-orange-300 border-orange-900/40',
          icon: <Award className="text-orange-400" size={13} />,
          medalText: '3rd Place',
          label: 'Lead Key Trainer',
          titleColor: 'text-white',
          badgeLabel: 'Bronze Trainer',
          rankColor: 'text-orange-400'
        };
      case 3:
        return {
          rank: 4,
          colorClass: 'shadow-blue-500/10 ring-1 ring-blue-500/10',
          glowClass: 'from-blue-400/8 via-sky-200/4 to-transparent',
          badgeClass: 'bg-blue-950/60 text-blue-300 border-blue-900/40',
          icon: <Award className="text-blue-400" size={13} />,
          medalText: '4th Place',
          label: 'Top Choice Trainer',
          titleColor: 'text-white',
          badgeLabel: 'Platinum Trainer',
          rankColor: 'text-blue-400'
        };
      case 4:
        return {
          rank: 5,
          colorClass: 'shadow-emerald-500/10 ring-1 ring-emerald-500/10',
          glowClass: 'from-emerald-400/8 via-emerald-200/4 to-transparent',
          badgeClass: 'bg-emerald-950/60 text-emerald-300 border-emerald-900/40',
          icon: <Award className="text-emerald-400" size={13} />,
          medalText: '5th Place',
          label: 'Talented Trainer',
          titleColor: 'text-white',
          badgeLabel: 'Emerald Trainer',
          rankColor: 'text-emerald-400'
        };
      default:
        return {
          rank: index + 1,
          colorClass: 'bg-zinc-900',
          glowClass: 'from-zinc-400/5 to-transparent',
          badgeClass: 'bg-zinc-900 text-zinc-300 border-zinc-800',
          icon: <Award className="text-zinc-400" size={13} />,
          medalText: `Rank ${index + 1}`,
          label: 'Certified Trainer',
          titleColor: 'text-white',
          badgeLabel: 'Trainer',
          rankColor: 'text-zinc-400'
        };
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'safety':
        return 'Safety & Compliance';
      case 'technical':
        return 'Technical & IT';
      case 'management':
        return 'Leadership & Management';
      case 'marketing':
        return 'Marketing & Sales';
      case 'finance':
        return 'Finance & Investment';
      case 'business':
        return 'Business & Entrepreneurship';
      case 'soft_skills':
        return 'Soft Skills';
      default:
        return cat;
    }
  };

  // Beautiful 3D transform formulas based on index & active position + live dragging offset
  const getCardStyle = (index: number) => {
    // Calculate cyclic wrapped offset for a seamless infinite loop
    const diff = index - activeIndex;
    const offset = ((diff + 2) % 5 + 5) % 5 - 2;

    // Fractional offset based on drag progress (synchronized with dynamic stepThreshold for perfect mathematical continuity)
    const fractionalOffset = dragOffset / stepThreshold;
    const t = offset + fractionalOffset;

    let scale = 1;
    let rotateY = 0;
    let x = '0%';
    let zIndex = 30;
    let opacity = 1;
    let filter = 'brightness(100%) blur(0px)';

    const absT = Math.abs(t);

    // Scale interpolation
    if (absT <= 1) {
      const midScale = isMobile ? 0.82 : 0.86;
      scale = 1.05 - absT * (1.05 - midScale);
    } else if (absT <= 2) {
      const midScale = isMobile ? 0.82 : 0.86;
      const minScale = isMobile ? 0.65 : 0.72;
      scale = midScale - (absT - 1) * (midScale - minScale);
    } else {
      scale = isMobile ? 0.65 : 0.72;
    }

    // rotateY is set to 0 for a modern flat sliding effect (no rotation)
    rotateY = 0;

    // X translation interpolation (percentage string)
    const midX = isMobile ? 44 : 72;
    const maxX = isMobile ? 80 : 135;
    if (absT <= 1) {
      const xPercent = t * midX;
      x = `${xPercent}%`;
    } else if (absT <= 2) {
      const sign = t < 0 ? -1 : 1;
      const xPercent = sign * (midX + (absT - 1) * (maxX - midX));
      x = `${xPercent}%`;
    } else {
      const sign = t < 0 ? -1 : 1;
      x = `${sign * maxX}%`;
    }

    // Opacity interpolation
    const midOpacity = 0.85;
    const minOpacity = isMobile ? 0.10 : 0.55;
    if (absT <= 1) {
      opacity = 1 - absT * (1 - midOpacity);
    } else if (absT <= 2) {
      opacity = midOpacity - (absT - 1) * (midOpacity - minOpacity);
    } else {
      opacity = minOpacity;
    }
    opacity = Math.max(0, Math.min(1, opacity));

    // Filter interpolation (brightness & blur)
    let blurVal = 0;
    let brightnessVal = 100;
    if (absT <= 1) {
      blurVal = absT * 6.0;
      brightnessVal = 100 - absT * 40;
    } else if (absT <= 2) {
      blurVal = 6.0 + (absT - 1) * 2.0;
      brightnessVal = 60 - (absT - 1) * 15;
    } else {
      blurVal = 8.0;
      brightnessVal = 45;
    }
    filter = `brightness(${Math.round(brightnessVal)}%) blur(${blurVal.toFixed(2)}px)`;

    // Z-index calculation for perfect depth layers
    if (absT < 0.5) {
      zIndex = 30;
    } else if (absT < 1.5) {
      zIndex = 20;
    } else {
      zIndex = 10;
    }

    return {
      scale,
      rotateY,
      x,
      zIndex,
      opacity,
      filter,
    };
  };

  return (
    <div className="space-y-4 pb-2" id="top-ranking-section">
      {/* Main Stage Container with Gesture Support */}
      <div 
        className="relative w-full h-[370px] xs:h-[400px] sm:h-[440px] md:h-[510px] overflow-visible flex items-center justify-center select-none cursor-grab active:cursor-grabbing touch-pan-y" 
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          handleDragEnd();
          setIsHovered(false);
        }}
        onTouchStart={(e) => {
          setIsHovered(true);
          const touch = e.touches[0];
          handleDragStart(touch.clientX, touch.clientY);
        }}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          handleDragMove(touch.clientX, touch.clientY);
        }}
        onTouchEnd={() => {
          handleDragEnd();
          // After a short timeout, resume auto-play on touch screen
          setTimeout(() => setIsHovered(false), 2000);
        }}
        onWheel={handleWheel}
        id="main-stage-container"
      >
        
        {/* Absolute Background Ambient Glow Effect for active trainer */}
        <AnimatePresence>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[340px] md:h-[340px] rounded-full blur-[60px] md:blur-[90px] bg-gradient-to-tr ${getRankMeta(activeIndex).glowClass} pointer-events-none z-0`}
          />
        </AnimatePresence>

        {/* Slider Track */}
        <div className="relative w-full max-w-[1100px] h-[320px] xs:h-[350px] sm:h-[390px] md:h-[460px] flex items-center justify-center pointer-events-auto">
          {topFive.map((trainer, index) => {
            const meta = getRankMeta(index);
            // Calculate cyclic wrapped offset for proper inactive state checks
            const diff = index - activeIndex;
            const offset = ((diff + 2) % 5 + 5) % 5 - 2;
            const isActive = offset === 0;

            // Detect card wrap-around to bypass slide-across animation glitch
            const prevActiveIndex = prevActiveIndexRef.current;
            const prevDiff = index - prevActiveIndex;
            const prevOffset = ((prevDiff + 2) % 5 + 5) % 5 - 2;
            const flatDist = Math.abs(offset - prevOffset);
            const circularDist = Math.min(flatDist, 5 - flatDist);
            const isWrapping = flatDist > circularDist;

            const cardTransition = isWrapping
              ? { type: 'tween', duration: 0 }
              : (isDragging
                  ? { type: 'tween', ease: 'easeOut', duration: 0.12 } // Golden ratio tween for buttery 1:1 mobile glide
                  : { type: 'spring', stiffness: 200, damping: 23, mass: 0.75 } // Smooth slide to rest when released
                );

            return (
              <motion.div
                key={trainer.id}
                animate={getCardStyle(index)}
                transition={cardTransition}
                whileHover={isMobile ? {} : (isActive ? { y: -8, scale: 1.02, shadow: '0_35px_80px_rgba(0,0,0,0.12)' } : { scale: offset === 1 || offset === -1 ? 0.88 : 0.74 })}
                onClick={() => {
                  if (Math.abs(dragOffset) > 15) return;
                  if (!isActive) {
                    setActiveIndex(index);
                  }
                }}
                className={`absolute w-[230px] xs:w-[265px] sm:w-[290px] md:w-[330px] h-[320px] xs:h-[350px] sm:h-[390px] md:h-[460px] rounded-[24px] md:rounded-[32px] overflow-hidden flex flex-col justify-between transition-[background-color,border-color,box-shadow] duration-500 ease-out ${
                  isActive
                    ? 'bg-zinc-900 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.35),0_8px_24px_-4px_rgba(0,0,0,0.15)] border border-zinc-800/60'
                    : 'bg-zinc-950 shadow-[0_8px_30px_rgba(0,0,0,0.1)] pointer-events-none opacity-45'
                } group ${isActive ? 'cursor-default' : 'cursor-pointer hover:brightness-98'}`}
                style={{
                  transformOrigin: 'center center',
                }}
              >
                {/* Full-bleed Background Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden bg-zinc-950 z-0">
                  <img
                    src={trainer.avatar}
                    alt={trainer.name}
                    className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out ${
                      isActive ? 'scale-100 group-hover:scale-105' : 'scale-100 opacity-60'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  {/* Dense gradient overlays to ensure absolute readability for text, rank, metrics, and buttons */}
                  <div className="absolute inset-x-0 top-0 h-24 md:h-32 bg-gradient-to-b from-black/75 via-black/35 to-transparent pointer-events-none z-10" />
                  <div className="absolute inset-x-0 bottom-0 h-52 md:h-80 bg-gradient-to-t from-black/95 via-black/60 via-black/20 to-transparent pointer-events-none z-10" />
                  
                  {/* Premium glossy light sweep */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-10 pointer-events-none" />
                </div>

                {/* Overlaid Badge & Rank Row */}
                <div className="relative z-20 p-3.5 md:p-5 pb-0 flex items-center justify-between w-full">
                  <span className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-extrabold uppercase tracking-wider border flex items-center gap-1 shadow-sm bg-black/50 backdrop-blur-md text-white border-white/20`}>
                    {meta.icon}
                    {meta.badgeLabel}
                  </span>
                  
                  <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full shadow-md text-[9px] md:text-xs font-bold text-white">
                    <span className="text-zinc-300 font-semibold">Rank</span>
                    <span className={`font-black text-xs md:text-sm ${meta.rankColor}`}>#{meta.rank}</span>
                  </div>
                </div>

                {/* Editorial Information Section at bottom, fully overlaid on the image */}
                <div className="relative z-20 p-3.5 md:p-5 flex-grow flex flex-col justify-end bg-transparent transition-all duration-500 w-full">
                  <div className="space-y-0.5 md:space-y-1">
                    <span className="text-[8px] md:text-[9px] font-extrabold tracking-widest uppercase text-red-300 bg-red-950/50 px-1.5 py-0.5 rounded border border-red-900/30 inline-block backdrop-blur-sm">
                      {getCategoryLabel(trainer.category)}
                    </span>
                    
                    <h3 className="font-sans text-xs xs:text-sm sm:text-base md:text-lg font-black leading-snug text-white mt-1 line-clamp-1">
                      {trainer.name}
                    </h3>
                    <p className="text-[9px] xs:text-[10px] md:text-[11px] text-zinc-300 font-medium line-clamp-1">{trainer.title}</p>
                  </div>

                  {/* Micro-interactive Expandable Segment */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? 'auto' : 0,
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 10,
                      marginTop: isActive ? '8px' : '0px'
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 md:space-y-3">
                      {/* Compact Light Metrics Row */}
                      <div className="grid grid-cols-2 gap-1 py-1 px-1 md:py-1.5 md:px-1.5 bg-black/45 backdrop-blur-md rounded-xl md:rounded-2xl border border-white/10 shadow-inner text-center">
                        <div className="border-r border-white/10">
                          <span className="text-[7px] md:text-[8px] text-zinc-400 block uppercase font-extrabold tracking-wider">Average Rating</span>
                          <div className="flex items-center justify-center gap-0.5 mt-0.5">
                            <Star className="text-amber-400 fill-amber-400 shrink-0" size={8} />
                            <span className="text-[10px] md:text-xs font-black text-white">{trainer.rating.toFixed(2)}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-[7px] md:text-[8px] text-zinc-400 block uppercase font-extrabold tracking-wider">Training Series</span>
                          <span className="text-[10px] md:text-xs font-black text-white block mt-0.5">{trainer.projectsCount} Programs</span>
                        </div>
                      </div>

                      {/* Sparkle Highlight & Detailed CTA */}
                      <div className="pt-1.5 border-t border-white/10 space-y-1.5 md:space-y-2">
                        <div className="flex items-center justify-center gap-1 text-[8px] xs:text-[9px] md:text-[10px] font-semibold text-zinc-300">
                          <Sparkles size={9} className="text-amber-400 shrink-0" />
                          <span className="line-clamp-1">{meta.label}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (Math.abs(dragOffset) > 15) return;
                            onSelectTrainer(trainer);
                          }}
                          className="w-full py-1.5 md:py-2.5 rounded-full bg-white hover:bg-red-600 text-zinc-950 hover:text-white border border-white/10 hover:border-red-600 text-[10px] md:text-xs font-bold shadow-sm hover:shadow-md hover:shadow-red-500/10 transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer active:scale-98 select-none"
                          title="View Full Profile"
                        >
                          <span>View Profile</span>
                          <ArrowUpRight size={10} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Slide dots for mobile indicator */}
      <div className="flex lg:hidden justify-center gap-1.5 mt-2" id="carousel-dots">
        {topFive.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === idx
                ? 'w-6 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                : 'w-1.5 bg-zinc-800 hover:bg-zinc-700'
            }`}
            aria-label={`Show trainer ${idx + 1}`}
          />
        ))}
      </div>

      {/* Table Section for Top 10 Trainers */}
      <div className="mt-6 space-y-4" id="top-10-trainers-section">
        {/* Title and Live badge hidden per user request */}

        {/* Dynamic Activity Feed Ticker (Live Update Feed) */}
        <div className="h-11 mb-4 relative overflow-hidden flex items-center justify-center bg-zinc-950/25 border border-zinc-900/40 rounded-xl px-3" id="live-ranking-pulse-ticker-container">
          <AnimatePresence mode="wait">
            {liveNotification && (
              <motion.div
                key={liveNotification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                className="absolute inset-0 flex items-center justify-center py-1"
              >
                <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-gradient-to-r from-red-950/15 via-zinc-950/90 to-red-950/15 border border-red-500/15 rounded-lg shadow-md max-w-lg w-full text-left" id="live-ranking-pulse-card">
                  <div className="relative shrink-0">
                    <img 
                      src={liveNotification.avatar} 
                      alt={liveNotification.trainerName} 
                      referrerPolicy="no-referrer"
                      className="w-6.5 h-6.5 rounded-full object-cover border border-red-500/20 shadow-sm"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[8px] text-red-400 font-black tracking-wider uppercase font-mono leading-none">
                      AKTIVITI REKLUT LANGSUNG
                    </p>
                    <p className="text-[11px] font-bold text-zinc-100 truncate mt-0.5 leading-none">
                      <span className="text-white font-black">{liveNotification.trainerName}</span> {liveNotification.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop & Tablet Custom Grid Table (Optimized for buttery smooth layout transitions) */}
        <div className="hidden md:block overflow-hidden bg-zinc-950/45 border border-zinc-900/60 rounded-xl shadow-2xl backdrop-blur-md">
          {/* Header Row */}
          <div className="grid grid-cols-[70px_2.5fr_1.5fr_1fr_1fr_1fr] border-b border-zinc-900/60 bg-zinc-950/80 text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest py-2.5 px-4 items-center font-mono">
            <div className="text-center">No.</div>
            <div>Trainer</div>
            <div>Sektor Kepakaran</div>
            <div className="text-center">Penilaian</div>
            <div className="text-center">Program</div>
            <div className="text-right pr-2">Profil</div>
          </div>
          
          {/* Body Rows */}
          <div className="divide-y divide-zinc-900/40 relative">
            <AnimatePresence initial={false}>
              {sortedTrainers.slice(0, 10).map((trainer, index) => {
                const isTopThree = index < 3;
                let rankBadge = null;
                let rankBg = 'bg-zinc-900/50 text-zinc-400 border-zinc-800/80';
                
                if (index === 0) {
                  rankBadge = <Crown className="text-amber-400 fill-amber-400 animate-pulse" size={11} />;
                  rankBg = 'bg-gradient-to-br from-amber-500/10 to-amber-600/5 text-amber-300 border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.03)]';
                } else if (index === 1) {
                  rankBadge = <Trophy className="text-zinc-300 fill-zinc-400" size={10} />;
                  rankBg = 'bg-gradient-to-br from-zinc-400/10 to-zinc-500/5 text-zinc-200 border-zinc-400/30 shadow-[0_0_8px_rgba(255,255,255,0.01)]';
                } else if (index === 2) {
                  rankBadge = <Medal className="text-orange-400 fill-orange-400" size={10} />;
                  rankBg = 'bg-gradient-to-br from-orange-500/10 to-orange-600/5 text-orange-300 border-orange-500/30 shadow-[0_0_8px_rgba(249,115,22,0.01)]';
                }

                // Calculate rank changes compared to prevRanksMap
                const prevRankIndex = prevRanksMap[trainer.id];
                let rankDeltaIndicator = null;
                if (prevRankIndex !== undefined && prevRankIndex !== index) {
                  if (prevRankIndex > index) {
                    // Climbed up in rank
                    rankDeltaIndicator = (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.7, y: 2 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="text-[8px] font-black text-emerald-400 flex items-center gap-0.5 bg-zinc-950 border border-emerald-500/30 px-0.5 py-0.1 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.15)] shrink-0 font-mono scale-90"
                      >
                        <span className="text-[6px]">▲</span>
                        <span>{prevRankIndex - index}</span>
                      </motion.div>
                    );
                  } else if (prevRankIndex < index) {
                    // Slipped down in rank
                    rankDeltaIndicator = (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.7, y: -2 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="text-[8px] font-black text-rose-400 flex items-center gap-0.5 bg-zinc-950 border border-rose-500/30 px-0.5 py-0.1 rounded-full shadow-[0_0_6px_rgba(244,63,94,0.15)] shrink-0 font-mono scale-90"
                      >
                        <span className="text-[6px]">▼</span>
                        <span>{index - prevRankIndex}</span>
                      </motion.div>
                    );
                  }
                }

                return (
                  <motion.div 
                    layout
                    key={trainer.id}
                    transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 0.8 }}
                    className={`grid grid-cols-[70px_2.5fr_1.5fr_1fr_1fr_1fr] py-2.5 px-4 items-center hover:bg-zinc-900/20 transition-all duration-300 group cursor-pointer relative overflow-hidden ${
                      trainer.id === lastUpdatedTrainerId && (Date.now() - lastUpdateTimestamp < 6000)
                        ? lastUpdateType === 'rank_up'
                          ? 'bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.06)]'
                          : 'bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.06)]'
                        : ''
                    }`}
                    onClick={() => onSelectTrainer(trainer)}
                  >
                    {/* Futuristic Live Update Background Glow & Sweeping Scanlines */}
                    {trainer.id === lastUpdatedTrainerId && (Date.now() - lastUpdateTimestamp < 6000) && (
                      <div className="absolute inset-0 pointer-events-none z-0">
                        {lastUpdateType === 'rank_up' ? (
                          <>
                            <div className="absolute inset-y-0 left-0 w-[3px] bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/8 via-emerald-500/1 to-transparent" />
                            <motion.div
                              initial={{ x: '-100%' }}
                              animate={{ x: '200%' }}
                              transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity }}
                              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent skew-x-12"
                            />
                          </>
                        ) : (
                          <>
                            <div className="absolute inset-y-0 left-0 w-[3px] bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/8 via-cyan-500/1 to-transparent" />
                            <motion.div
                              initial={{ x: '-100%' }}
                              animate={{ x: '200%' }}
                              transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity }}
                              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent skew-x-12"
                            />
                          </>
                        )}
                      </div>
                    )}

                    {/* Rank Badge & Delta Indicator */}
                    <div className="flex items-center justify-center z-10">
                      <div className="relative flex items-center justify-center w-6.5 h-6.5">
                        {/* Futuristic live update expanding rings */}
                        {trainer.id === lastUpdatedTrainerId && (Date.now() - lastUpdateTimestamp < 6000) && (
                          <div className="absolute inset-0 pointer-events-none z-10">
                            <span className={`absolute inset-0 rounded-full animate-ping border ${lastUpdateType === 'rank_up' ? 'border-emerald-500/40' : 'border-cyan-500/40'} opacity-75`} style={{ animationDuration: '1.5s' }} />
                          </div>
                        )}

                        <div className={`w-6.5 h-6.5 rounded-full border flex items-center justify-center font-extrabold text-xs shadow-inner transition-all duration-300 group-hover:scale-105 shrink-0 ${rankBg}`}>
                          {rankBadge ? rankBadge : index + 1}
                        </div>
                        
                        {/* Floating Rank Delta Indicator perfectly aligned relative to the badge container */}
                        {rankDeltaIndicator && (
                          <div className="absolute -top-1 -right-3 z-20 pointer-events-none whitespace-nowrap">
                            {rankDeltaIndicator}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Avatar & Professional Details */}
                    <div className="z-10">
                      <div className="flex items-center gap-2.5">
                        <div className="relative shrink-0">
                          <img 
                            src={trainer.avatar} 
                            alt={trainer.name}
                            referrerPolicy="no-referrer"
                            className="w-8.5 h-8.5 rounded-full object-cover border border-zinc-800 shadow-md group-hover:border-red-500/30 transition-colors duration-300" 
                          />
                          {isTopThree && (
                            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-red-600 flex items-center justify-center text-[7px] font-bold text-white ring-1 ring-black">
                              ★
                            </div>
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-bold text-xs text-zinc-100 group-hover:text-red-400 transition-colors duration-300 leading-tight truncate flex items-center">
                            <span>{trainer.name}</span>
                            {trainer.id === lastUpdatedTrainerId && (Date.now() - lastUpdateTimestamp < 6000) && (
                              <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: [1, 0.5, 1], scale: 1 }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className={`text-[7px] font-black font-mono border ml-1.5 px-1 py-0.1 rounded tracking-widest ${
                                  lastUpdateType === 'rank_up' 
                                    ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30' 
                                    : 'bg-cyan-950/60 text-cyan-400 border-cyan-500/30'
                                }`}
                              >
                                {lastUpdateType === 'rank_up' ? '▲ UP' : '● SYNC'}
                              </motion.span>
                            )}
                          </p>
                          <p className="text-[10px] text-zinc-500 mt-0.5 line-clamp-1 max-w-[280px] font-medium font-sans">
                            {trainer.title}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Styled Category Badge */}
                    <div className="flex items-center z-10">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase border backdrop-blur-sm ${
                        trainer.category === 'safety' ? 'bg-rose-500/5 text-rose-400 border-rose-500/10' :
                        trainer.category === 'technical' ? 'bg-cyan-500/5 text-cyan-400 border-cyan-500/10' :
                        trainer.category === 'management' ? 'bg-amber-500/5 text-amber-400 border-amber-500/10' :
                        trainer.category === 'marketing' ? 'bg-purple-500/5 text-purple-400 border-purple-500/10' :
                        trainer.category === 'finance' ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10' :
                        trainer.category === 'business' ? 'bg-pink-500/5 text-pink-400 border-pink-500/10' :
                        'bg-zinc-500/5 text-zinc-400 border-zinc-500/10'
                      }`}>
                        {getCategoryLabel(trainer.category)}
                      </span>
                    </div>

                    {/* Average Rating */}
                    <div className="flex justify-center z-10">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-900/40 border border-zinc-800/60 shadow-sm">
                        <Star className="text-amber-400 fill-amber-400" size={10} />
                        <span className="text-xs font-bold text-zinc-100 font-mono">{trainer.rating.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Total Programs */}
                    <div className="flex justify-center z-10">
                      <span className="text-xs font-semibold text-zinc-300 font-mono bg-zinc-900/25 px-2.5 py-0.5 rounded-full border border-zinc-900/60 shadow-sm">
                        {trainer.projectsCount} <span className="text-zinc-500 text-[8px] uppercase font-bold tracking-wider ml-0.5">Siri</span>
                      </span>
                    </div>

                    {/* Action Button */}
                    <div className="text-right pr-2 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTrainer(trainer);
                        }}
                        className="inline-flex items-center gap-1 py-1 px-2.5 rounded-full bg-zinc-900 hover:bg-red-600 text-zinc-300 hover:text-white border border-zinc-800 hover:border-red-600/80 text-[11px] font-bold transition-all duration-300 active:scale-95 cursor-pointer shadow-md hover:shadow-red-500/10"
                      >
                        <span>Profil</span>
                        <ArrowUpRight size={10} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile List View (Optimized with Framer Motion layout transitions) */}
        <div className="block md:hidden space-y-1.5 relative">
          <AnimatePresence initial={false}>
            {sortedTrainers.slice(0, showAllMobile ? 10 : 5).map((trainer, index) => {
              const isTopThree = index < 3;
              let rankBg = 'bg-zinc-900 text-zinc-400 border-zinc-800';
              let rankBadge = null;

              if (index === 0) {
                rankBadge = <Crown className="text-amber-400 fill-amber-400" size={10} />;
                rankBg = 'bg-amber-950/40 text-amber-300 border-amber-500/20';
              } else if (index === 1) {
                rankBadge = <Trophy className="text-zinc-300 fill-zinc-400" size={9} />;
                rankBg = 'bg-zinc-900 text-zinc-300 border-zinc-700/50';
              } else if (index === 2) {
                rankBadge = <Medal className="text-orange-400 fill-orange-400" size={9} />;
                rankBg = 'bg-orange-950/40 text-orange-300 border-orange-500/20';
              }

              // Calculate rank changes compared to prevRanksMap for mobile
              const prevRankIndex = prevRanksMap[trainer.id];
              let rankDeltaIndicator = null;
              if (prevRankIndex !== undefined && prevRankIndex !== index) {
                if (prevRankIndex > index) {
                  rankDeltaIndicator = (
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-[7px] font-black text-emerald-400 bg-zinc-950 border border-emerald-500/30 px-0.5 py-0.1 rounded-full flex items-center justify-center shadow-lg"
                    >
                      ▲{prevRankIndex - index}
                    </motion.span>
                  );
                } else if (prevRankIndex < index) {
                  rankDeltaIndicator = (
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-[7px] font-black text-rose-400 bg-zinc-950 border border-rose-500/30 px-0.5 py-0.1 rounded-full flex items-center justify-center shadow-lg"
                    >
                      ▼{index - prevRankIndex}
                    </motion.span>
                  );
                }
              }

              return (
                <motion.div 
                  layout
                  key={trainer.id}
                  transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 0.8 }}
                  onClick={() => onSelectTrainer(trainer)}
                  className={`p-2.5 rounded-xl flex items-center justify-between gap-2.5 active:bg-zinc-900/30 active:scale-[0.99] transition-all duration-200 cursor-pointer relative overflow-hidden border ${
                    trainer.id === lastUpdatedTrainerId && (Date.now() - lastUpdateTimestamp < 6000)
                      ? lastUpdateType === 'rank_up'
                        ? 'bg-emerald-950/20 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.08)]'
                        : 'bg-cyan-950/20 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.08)]'
                      : 'bg-zinc-950/50 border-zinc-900 shadow-inner'
                  }`}
                >
                  {/* Futuristic Live Update Background Glow & Sweeping Scanlines */}
                  {trainer.id === lastUpdatedTrainerId && (Date.now() - lastUpdateTimestamp < 6000) && (
                    <div className="absolute inset-0 pointer-events-none z-0">
                      {lastUpdateType === 'rank_up' ? (
                        <>
                          <div className="absolute inset-y-0 left-0 w-[2px] bg-emerald-500 shadow-[0_0_6px_#10b981]" />
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/6 via-transparent to-transparent" />
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-y-0 left-0 w-[2px] bg-cyan-500 shadow-[0_0_6px_#06b6d4]" />
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/6 via-transparent to-transparent" />
                        </>
                      )}
                    </div>
                  )}

                  {/* Left Section: Rank, Avatar & Info */}
                  <div className="flex items-center gap-2.5 overflow-hidden z-10">
                    <div className="relative shrink-0 flex items-center justify-center">
                      {/* Futuristic live update expanding rings */}
                      {trainer.id === lastUpdatedTrainerId && (Date.now() - lastUpdateTimestamp < 6000) && (
                        <div className="absolute inset-0 pointer-events-none z-10">
                          <span className={`absolute inset-0 rounded-full animate-ping border ${lastUpdateType === 'rank_up' ? 'border-emerald-500/40' : 'border-cyan-500/40'} opacity-75`} style={{ animationDuration: '1.5s' }} />
                        </div>
                      )}

                      <div className={`w-5.5 h-5.5 rounded-full border flex items-center justify-center font-extrabold text-[10px] shadow-inner ${rankBg}`}>
                        {rankBadge ? rankBadge : index + 1}
                      </div>
                      {rankDeltaIndicator && (
                        <div className="absolute -bottom-1 -right-1 z-10">
                          {rankDeltaIndicator}
                        </div>
                      )}
                    </div>
                    
                    <div className="relative shrink-0">
                      <img 
                        src={trainer.avatar} 
                        alt={trainer.name} 
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover border border-zinc-800"
                      />
                      {isTopThree && (
                        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-600 flex items-center justify-center text-[6px] font-bold text-white ring-1 ring-black">
                          ★
                        </div>
                      )}
                    </div>

                    <div className="overflow-hidden">
                      <p className="font-bold text-xs text-white leading-tight truncate flex items-center gap-1">
                        <span>{trainer.name}</span>
                        {trainer.id === lastUpdatedTrainerId && (Date.now() - lastUpdateTimestamp < 6000) && (
                          <span className={`text-[6px] font-black font-mono border px-0.5 rounded scale-90 tracking-wider ${
                            lastUpdateType === 'rank_up' 
                              ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30' 
                              : 'bg-cyan-950/80 text-cyan-400 border-cyan-500/30'
                          }`}>
                            {lastUpdateType === 'rank_up' ? '▲' : '●'}
                          </span>
                        )}
                      </p>
                      <p className="text-[10px] text-zinc-500 mt-0.5 truncate max-w-[150px] font-medium font-sans">
                        {trainer.title}
                      </p>
                      <span className="inline-block text-[8px] font-extrabold uppercase tracking-wider text-zinc-400 mt-0.5 bg-zinc-900/60 px-1 py-0.1 rounded border border-zinc-800/40">
                        {getCategoryLabel(trainer.category)}
                      </span>
                    </div>
                  </div>

                  {/* Right Section: Star, Program & Chevron */}
                  <div className="flex items-center gap-1.5 shrink-0 z-10">
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-0.5">
                        <Star className="text-amber-400 fill-amber-400" size={9} />
                        <span className="text-xs font-bold text-white font-mono">{trainer.rating.toFixed(2)}</span>
                      </div>
                      <p className="text-[9px] text-zinc-500 mt-0.5 font-bold font-mono">
                        {trainer.projectsCount} Siri
                      </p>
                    </div>
                    <div className="p-1 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 group-active:text-white transition-colors">
                      <ChevronRight size={10} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Futuristic See More Button */}
          {sortedTrainers.length > 5 && (
            <motion.div 
              layout
              className="flex justify-center pt-3"
            >
              <button
                onClick={() => setShowAllMobile(!showAllMobile)}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-zinc-950/80 via-zinc-900/80 to-zinc-950/80 hover:from-red-950/20 hover:to-red-950/20 border border-zinc-900 hover:border-red-500/20 text-[10px] font-black text-zinc-400 hover:text-red-400 transition-all duration-300 shadow-lg hover:shadow-red-500/5 active:scale-95 font-mono tracking-widest uppercase cursor-pointer backdrop-blur-sm"
              >
                <span>{showAllMobile ? 'Sembunyikan' : 'Lihat Lagi (See More)'}</span>
                <ChevronRight 
                  size={10} 
                  className={`text-zinc-500 transition-transform duration-300 ${showAllMobile ? '-rotate-90 text-red-500' : 'rotate-90 text-zinc-400'}`}
                />
              </button>
            </motion.div>
          )}
        </div>
      </div>

    </div>
  );
}
