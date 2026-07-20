import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Plus,
  Compass,
  ShieldCheck,
  Cpu,
  MessagesSquare,
  CheckCircle,
  Users,
  BookOpen,
  GraduationCap,
  Sparkles,
  Info,
  ChevronRight,
  BookmarkCheck,
  Calendar,
  X,
  RefreshCw,
  PhoneCall,
  LogIn,
  TrendingUp,
  Coins,
  Briefcase,
  User,
  Star,
  Check,
  Share2,
  Copy,
  Link2,
  AlertTriangle,
  QrCode
} from 'lucide-react';

import { Trainer, PortfolioItem, CategoryType, FeedbackItem } from './types';
import { TRAINING_STATS } from './data';
import TrainerBentoGrid from './components/TrainerBentoGrid';
import TrainerDetailModal from './components/TrainerDetailModal';
import AddTrainerModal from './components/AddTrainerModal';
import LoginModal from './components/LoginModal';
import TopRankingTrainers from './components/TopRankingTrainers';
import { ToastContainer, ConfirmDialogContainer, showToast } from './components/Toast';
import { supabase } from './lib/supabase';

// --- DB row <-> TS model mappers ---
type TrainerRow = {
  id: string; name: string; title: string; category: string; avatar: string | null;
  bio: string | null; rating: number; experience: string | null;
  certifications: string[] | null; skills: string[] | null;
  email: string | null; phone: string | null; password: string | null;
  ic_number: string | null; ttt_cert_no: string | null;
  featured: boolean; projects_count: number; socials: any;
  academic_qualification: string[] | null; professional_qualification: string[] | null;
  previous_companies: string[] | null; training_topics: string[] | null;
  created_at: string;
};
const mapTrainer = (r: TrainerRow): Trainer => ({
  id: r.id, name: r.name, title: r.title, category: r.category as CategoryType,
  avatar: r.avatar || '', bio: r.bio || '', rating: Number(r.rating) || 0,
  experience: r.experience || '', certifications: r.certifications || [],
  skills: r.skills || [], email: r.email || '', phone: r.phone || '',
  password: r.password || undefined,
  icNumber: r.ic_number || undefined,
  tttCertNo: r.ttt_cert_no || undefined,
  featured: r.featured,
  projectsCount: r.projects_count || 0, socials: r.socials || undefined,
  academicQualification: r.academic_qualification || undefined,
  professionalQualification: r.professional_qualification || undefined,
  previousCompanies: r.previous_companies || undefined,
  trainingTopics: r.training_topics || undefined,
});
const trainerToRow = (t: Trainer) => ({
  id: t.id, name: t.name, title: t.title, category: t.category,
  avatar: t.avatar, bio: t.bio, rating: t.rating, experience: t.experience,
  certifications: t.certifications, skills: t.skills,
  email: t.email, phone: t.phone, password: t.password || null,
  ic_number: t.icNumber || null,
  ttt_cert_no: t.tttCertNo || null,
  featured: t.featured, projects_count: t.projectsCount,
  socials: t.socials || null,
  academic_qualification: t.academicQualification || null,
  professional_qualification: t.professionalQualification || null,
  previous_companies: t.previousCompanies || null,
  training_topics: t.trainingTopics || null,
});

type PortfolioRow = {
  id: string; trainer_id: string; trainer_name: string; trainer_avatar: string | null;
  title: string; category: string; description: string | null; image: string | null;
  duration: string | null; level: string; outcomes: string[] | null;
  participants_count: number; status: string; created_at: string;
};
const mapPortfolio = (r: PortfolioRow): PortfolioItem => ({
  id: r.id, trainerId: r.trainer_id, trainerName: r.trainer_name,
  trainerAvatar: r.trainer_avatar || '', title: r.title, category: r.category as CategoryType,
  description: r.description || '', image: r.image || '', duration: r.duration || '',
  level: r.level as PortfolioItem['level'], outcomes: r.outcomes || [],
  participantsCount: r.participants_count || 0, status: (r.status as PortfolioItem['status']) || 'Selesai',
});
const portfolioToRow = (p: PortfolioItem) => ({
  id: p.id, trainer_id: p.trainerId, trainer_name: p.trainerName,
  trainer_avatar: p.trainerAvatar, title: p.title, category: p.category,
  description: p.description, image: p.image, duration: p.duration,
  level: p.level, outcomes: p.outcomes, participants_count: p.participantsCount,
  status: p.status || 'Selesai',
});

type RegistrationRow = {
  id: string; trainer_id: string; program_id: string; program_title: string;
  trainer_name: string; participant_name: string; participant_email: string;
  participant_phone: string | null; created_at: string; feedback_submitted: boolean;
};
const mapRegistration = (r: RegistrationRow): Registration => ({
  id: r.id, trainerId: r.trainer_id, programId: r.program_id,
  programTitle: r.program_title, trainerName: r.trainer_name,
  participantName: r.participant_name, participantEmail: r.participant_email,
  participantPhone: r.participant_phone || undefined, createdAt: r.created_at,
  feedbackSubmitted: r.feedback_submitted,
});
const registrationToRow = (r: Registration) => ({
  id: r.id, trainer_id: r.trainerId, program_id: r.programId,
  program_title: r.programTitle, trainer_name: r.trainerName,
  participant_name: r.participantName, participant_email: r.participantEmail,
  participant_phone: r.participant_phone || null, feedback_submitted: r.feedbackSubmitted,
});

type FeedbackRow = {
  id: string; registration_id: string; program_id: string; program_title: string;
  trainer_id: string; participant_name: string; rating_overall: number;
  rating_materials: number; rating_trainer: number; expectation_met: string;
  comment: string | null; created_at: string;
};
const mapFeedback = (r: FeedbackRow): FeedbackItem => ({
  id: r.id, registrationId: r.registration_id, programId: r.program_id,
  programTitle: r.program_title, trainerId: r.trainer_id,
  participantName: r.participant_name, ratingOverall: r.rating_overall,
  ratingMaterials: r.rating_materials, ratingTrainer: r.rating_trainer,
  expectationMet: r.expectation_met as FeedbackItem['expectationMet'],
  comment: r.comment || '', createdAt: r.created_at,
});
const feedbackToRow = (f: FeedbackItem) => ({
  id: f.id, registration_id: f.registrationId, program_id: f.programId,
  program_title: f.programTitle, trainer_id: f.trainerId,
  participant_name: f.participantName, rating_overall: f.ratingOverall,
  rating_materials: f.ratingMaterials, rating_trainer: f.ratingTrainer,
  expectation_met: f.expectationMet, comment: f.comment,
});

export interface Registration {
  id: string;
  trainerId: string;
  programId: string;
  programTitle: string;
  trainerName: string;
  participantName: string;
  participantEmail: string;
  participantPhone?: string;
  createdAt: string;
  feedbackSubmitted: boolean;
}

const enrichCategory = (title: string, skills: string[], originalCat: CategoryType): CategoryType => {
  const text = (title + ' ' + skills.join(' ')).toLowerCase();
  
  if (text.includes('pemasaran') || text.includes('marketing') || text.includes('jualan') || text.includes('sales') || text.includes('branding') || text.includes('copywriting') || text.includes('media sosial') || text.includes('sosial media')) {
    return 'marketing';
  }
  if (text.includes('kewangan') || text.includes('finance') || text.includes('akaun') || text.includes('accounting') || text.includes('cukai') || text.includes('tax') || text.includes('pelaburan') || text.includes('investment') || text.includes('audit')) {
    return 'finance';
  }
  if (text.includes('kepimpinan') || text.includes('leadership') || text.includes('pengurusan') || text.includes('management') || text.includes('executive') || text.includes('project manager') || text.includes('urus')) {
    return 'management';
  }
  if (text.includes('perniagaan') || text.includes('business') || text.includes('usahawan') || text.includes('entrepreneur') || text.includes('startup') || text.includes('pks') || text.includes('strategi perniagaan')) {
    return 'business';
  }
  return originalCat;
};

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn("localStorage is not available/accessible in this environment:", e);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn("localStorage is not available/accessible in this environment:", e);
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("localStorage is not available/accessible in this environment:", e);
    }
  }
};

export default function App() {
  // 1. Core State — loaded from Supabase on mount
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [tRes, pRes, rRes, fRes] = await Promise.all([
          supabase.from('trainers').select('*'),
          supabase.from('portfolios').select('*'),
          supabase.from('registrations').select('*'),
          supabase.from('feedbacks').select('*'),
        ]);
        if (cancelled) return;
        if (tRes.error) console.error('trainers load error:', tRes.error.message);
        if (pRes.error) console.error('portfolios load error:', pRes.error.message);
        if (rRes.error) console.error('registrations load error:', rRes.error.message);
        if (fRes.error) console.error('feedbacks load error:', fRes.error.message);

        const loadedTrainers = (tRes.data || []).map(mapTrainer).map(t => ({
          ...t,
          category: enrichCategory(t.title, t.skills, t.category),
        }));
        setTrainers(loadedTrainers);

        const loadedPortfolios = (pRes.data || []).map(mapPortfolio).map(p => ({
          ...p,
          status: p.status || 'Selesai',
        }));
        setPortfolios(loadedPortfolios);

        const loadedRegs = (rRes.data || []).map(mapRegistration);
        setRegistrations(loadedRegs);

        const loadedFeeds = (fRes.data || []).map(mapFeedback);
        setFeedbacks(loadedFeeds);
      } catch (e) {
        console.error('Failed to load data from Supabase:', e);
      } finally {
        if (!cancelled) setDataLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // 2. Interactive States
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [urlAction, setUrlAction] = useState<{
    type: 'register' | 'feedback';
    trainerId: string;
    programId: string;
  } | null>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const action = params.get('action');
      const trainerId = params.get('trainerId');
      const programId = params.get('programId');
      if ((action === 'register' || action === 'feedback') && trainerId && programId) {
        return {
          type: action as 'register' | 'feedback',
          trainerId,
          programId
        };
      }
    } catch (e) {
      console.warn("Failed to parse initial URL action parameters:", e);
    }
    return null;
  });

  // Handle Deep Linking with trainerId query parameter (skip if action is feedback or register)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const action = params.get('action');
      if (action === 'feedback' || action === 'register') {
        // Skip opening the trainer profile modal because we are targeting direct forms
        return;
      }
      const trainerIdFromUrl = params.get('trainerId');
      if (trainerIdFromUrl && trainers.length > 0) {
        const foundTrainer = trainers.find(t => t.id === trainerIdFromUrl);
        if (foundTrainer) {
          setSelectedTrainer(foundTrainer);
        }
      }
    } catch (e) {
      console.warn("Failed to read search params from location:", e);
    }
  }, [trainers]);

  // Synchronize selectedTrainer and urlAction to URL search parameters
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (urlAction) {
        url.searchParams.set('action', urlAction.type);
        url.searchParams.set('trainerId', urlAction.trainerId);
        url.searchParams.set('programId', urlAction.programId);
      } else {
        url.searchParams.delete('action');
        url.searchParams.delete('programId');
        if (selectedTrainer) {
          url.searchParams.set('trainerId', selectedTrainer.id);
        } else {
          url.searchParams.delete('trainerId');
        }
      }
      // Update URL without reloading the page
      window.history.replaceState({}, '', url.toString());
    } catch (e) {
      console.warn("Failed to update history state due to sandbox constraints", e);
    }
  }, [selectedTrainer, urlAction]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return safeLocalStorage.getItem('trainer_gallery_user');
  });
  const [currentUserRole, setCurrentUserRole] = useState<'admin' | 'trainer' | null>(() => {
    return safeLocalStorage.getItem('trainer_gallery_user_role') as 'admin' | 'trainer' | null;
  });
  const [currentLoggedTrainerId, setCurrentLoggedTrainerId] = useState<string | null>(() => {
    return safeLocalStorage.getItem('trainer_gallery_logged_trainer_id');
  });

  useEffect(() => {
    if (currentUser) {
      safeLocalStorage.setItem('trainer_gallery_user', currentUser);
    } else {
      safeLocalStorage.removeItem('trainer_gallery_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUserRole) {
      safeLocalStorage.setItem('trainer_gallery_user_role', currentUserRole);
    } else {
      safeLocalStorage.removeItem('trainer_gallery_user_role');
    }
  }, [currentUserRole]);

  useEffect(() => {
    if (currentLoggedTrainerId) {
      safeLocalStorage.setItem('trainer_gallery_logged_trainer_id', currentLoggedTrainerId);
    } else {
      safeLocalStorage.removeItem('trainer_gallery_logged_trainer_id');
    }
  }, [currentLoggedTrainerId]);

  const handleUpdateTrainer = (updatedTrainer: Trainer) => {
    setTrainers((prev) =>
      prev.map((t) => (t.id === updatedTrainer.id ? updatedTrainer : t))
    );
    if (selectedTrainer && selectedTrainer.id === updatedTrainer.id) {
      setSelectedTrainer(updatedTrainer);
    }
    supabase.from('trainers').upsert(trainerToRow(updatedTrainer))
      .then(({ error }) => { if (error) console.error('trainer upsert failed:', error.message); });
  };

  const handleUpdatePortfolios = (updatedPortfolios: PortfolioItem[]) => {
    setPortfolios(updatedPortfolios);
    Promise.all(updatedPortfolios.map(p =>
      supabase.from('portfolios').upsert(portfolioToRow(p))
    )).then(results => {
      results.forEach(({ error }, i) => {
        if (error) console.error('portfolio upsert failed:', updatedPortfolios[i].id, error.message);
      });
    });
  };

  // Registration Alert State
  const [registeredCourse, setRegisteredCourse] = useState<{
    courseTitle: string;
    trainerName: string;
    refId: string;
  } | null>(null);

  // New Booking & Feedback states
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const [bookingProgram, setBookingProgram] = useState<{
    programId: string;
    trainerId: string;
  } | null>(null);



  // Inject a dynamic registration ID if a user deep-links to feedback for a program without registrations
  useEffect(() => {
    if (urlAction?.type === 'feedback' && urlAction.programId && urlAction.trainerId) {
      setRegistrations(prev => {
        const hasReg = prev.some(r => r.programId === urlAction.programId);
        if (hasReg) return prev;
        const targetProg = portfolios.find(p => p.id === urlAction.programId);
        const targetTrainer = trainers.find(t => t.id === urlAction.trainerId);
        if (targetProg && targetTrainer) {
          const newReg: Registration = {
            id: 'REG-' + Math.floor(100000 + Math.random() * 900000),
            trainerId: targetTrainer.id,
            programId: targetProg.id,
            programTitle: targetProg.title,
            trainerName: targetTrainer.name,
            participantName: 'Peserta Pengguna Pautan',
            participantEmail: 'peserta@example.com',
            participantPhone: '+60 12-345 6789',
            createdAt: new Date().toISOString(),
            feedbackSubmitted: false
          };
          supabase.from('registrations').insert(registrationToRow(newReg))
            .then(({ error }) => { if (error) console.error('deep-link reg insert failed:', error.message); });
          return [newReg, ...prev];
        }
        return prev;
      });
    }
  }, [urlAction, portfolios, trainers]);

  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);



  // Form states for Registration & Feedback
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');

  const [feedRefId, setFeedRefId] = useState('');
  const [feedRating, setFeedRating] = useState(5);
  const [feedRatingMaterials, setFeedRatingMaterials] = useState(5);
  const [feedRatingTrainer, setFeedRatingTrainer] = useState(5);
  const [feedExpectationMet, setFeedExpectationMet] = useState<'Sangat Setuju' | 'Setuju' | 'Tidak Setuju'>('Sangat Setuju');
  const [feedComment, setFeedComment] = useState('');
  const [feedError, setFeedError] = useState('');
  const [feedSuccessMsg, setFeedSuccessMsg] = useState('');
  const [feedQrCopied, setFeedQrCopied] = useState(false);

  // Auto-hide mobile navigation on scroll with smooth threshold (hysteresis)
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      
      // Only auto-hide if scrolled down past top header area
      if (currentScrollY > 80) {
        // Require at least 10px scroll delta to trigger a state change for smoothness
        if (Math.abs(scrollDelta) > 10) {
          if (scrollDelta > 0) {
            setShowHeader(false);
          } else {
            setShowHeader(true);
          }
        }
      } else {
        if (!showHeader) setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, showHeader]);

  // 3. Reset Data handler (To restore initial values easily)
  const handleResetData = () => {
    let confirmReset = true;
    try {
      confirmReset = window.confirm('Are you sure you want to reload the gallery from the database? Local filters will be reset.');
    } catch (e) {
      console.warn("window.confirm is blocked in this environment.", e);
    }
    if (confirmReset) {
      setSelectedCategory('all');
      setSearchQuery('');
      (async () => {
        const [tRes, pRes] = await Promise.all([
          supabase.from('trainers').select('*'),
          supabase.from('portfolios').select('*'),
        ]);
        if (tRes.error) console.error('reset trainers error:', tRes.error.message);
        if (pRes.error) console.error('reset portfolios error:', pRes.error.message);
        setTrainers((tRes.data || []).map(mapTrainer).map(t => ({ ...t, category: enrichCategory(t.title, t.skills, t.category) })));
        setPortfolios((pRes.data || []).map(mapPortfolio).map(p => ({ ...p, status: p.status || 'Selesai' })));
      })();
    }
  };

  // 4. Add Trainer Handler
  const handleAddTrainer = (newTrainer: Trainer, newPortfolio: PortfolioItem) => {
    setTrainers((prev) => [newTrainer, ...prev]);
    setPortfolios((prev) => [newPortfolio, ...prev]);
    supabase.from('trainers').upsert(trainerToRow(newTrainer))
      .then(({ error }) => { if (error) console.error('add trainer upsert failed:', error.message); });
    supabase.from('portfolios').upsert(portfolioToRow(newPortfolio))
      .then(({ error }) => { if (error) console.error('add portfolio upsert failed:', error.message); });
  };

  // 5. Booking Handler
  const handleBookTraining = (programId: string, trainerId: string) => {
    setBookingProgram({ programId, trainerId });
  };

  // 6. Filtering Logic
  // Filter trainers first
  const filteredTrainers = trainers.filter((t) => {
    const matchCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const searchLower = searchQuery.toLowerCase().trim();
    if (!searchLower) return matchCategory;

    // Search matches trainer name, title, skills, or certifications
    const matchName = t.name.toLowerCase().includes(searchLower);
    const matchTitle = t.title.toLowerCase().includes(searchLower);
    const matchSkills = t.skills.some((s) => s.toLowerCase().includes(searchLower));
    const matchCerts = t.certifications.some((c) => c.toLowerCase().includes(searchLower));

    return matchCategory && (matchName || matchTitle || matchSkills || matchCerts);
  });

  // Filter portfolios
  const filteredPortfolios = portfolios.filter((p) => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const searchLower = searchQuery.toLowerCase().trim();
    if (!searchLower) return matchCategory;

    const matchTitle = p.title.toLowerCase().includes(searchLower);
    const matchDesc = p.description.toLowerCase().includes(searchLower);
    const matchTrainer = p.trainerName.toLowerCase().includes(searchLower);

    return matchCategory && (matchTitle || matchDesc || matchTrainer);
  });

  // Get item counts for categories (to display in tabs)
  const getCategoryCount = (cat: CategoryType | 'all') => {
    if (cat === 'all') return trainers.length;
    return trainers.filter((t) => t.category === cat).length;
  };

  const handleSaveRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    const activeRegProgId = bookingProgram?.programId || (urlAction?.type === 'register' ? urlAction.programId : null);
    const activeRegTrainerId = bookingProgram?.trainerId || (urlAction?.type === 'register' ? urlAction.trainerId : null);

    const activeRegProgram = portfolios.find(p => p.id === activeRegProgId);
    const activeRegTrainer = trainers.find(t => t.id === activeRegTrainerId);

    if (!activeRegProgram || !activeRegTrainer || !regName.trim() || !regEmail.trim()) {
      return;
    }

    const refId = 'REG-' + Math.floor(100000 + Math.random() * 900000);
    const newReg: Registration = {
      id: refId,
      trainerId: activeRegTrainer.id,
      programId: activeRegProgram.id,
      programTitle: activeRegProgram.title,
      trainerName: activeRegTrainer.name,
      participantName: regName.trim(),
      participantEmail: regEmail.trim(),
      participantPhone: regPhone.trim(),
      createdAt: new Date().toISOString(),
      feedbackSubmitted: false
    };

    // Update registrations
    setRegistrations(prev => [newReg, ...prev]);
    supabase.from('registrations').insert(registrationToRow(newReg))
      .then(({ error }) => { if (error) console.error('registration insert failed:', error.message); });

    // Increment participantsCount in portfolios for this program
    setPortfolios(prev => prev.map(p => {
      if (p.id === activeRegProgram.id) {
        const updated = { ...p, participantsCount: (p.participantsCount || 0) + 1 };
        supabase.from('portfolios').update({ participants_count: updated.participantsCount }).eq('id', updated.id)
          .then(({ error }) => { if (error) console.error('portfolio count update failed:', error.message); });
        return updated;
      }
      return p;
    }));

    // Trigger toast
    setRegisteredCourse({
      courseTitle: activeRegProgram.title,
      trainerName: activeRegTrainer.name,
      refId: refId
    });

    // Reset inputs
    setRegName('');
    setRegEmail('');
    setRegPhone('');
    setBookingProgram(null);
    setUrlAction(null);
  };

  const handleSaveFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedError('');
    setFeedSuccessMsg('');

    const activeFeedProgId = urlAction?.programId;
    const activeFeedTrainerId = urlAction?.trainerId;

    const activeFeedProgram = portfolios.find(p => p.id === activeFeedProgId);
    const activeFeedTrainer = trainers.find(t => t.id === activeFeedTrainerId);

    if (!activeFeedProgram || !activeFeedTrainer) {
      setFeedError('Program atau Trainer tidak ditemui.');
      return;
    }

    if (activeFeedProgram.status !== 'Selesai') {
      setFeedError('Pendaftaran maklum balas disekat: Sesi latihan bagi program ini belum tamat (masih Aktif). Sila minta trainer menukar status program kepada "Selesai" sebelum menghantar maklum balas.');
      return;
    }

    // Validate registration reference ID
    const trimmedId = feedRefId.trim().toUpperCase();
    const matchingReg = registrations.find(r => r.id.toUpperCase() === trimmedId && r.programId === activeFeedProgId);

    if (!matchingReg) {
      setFeedError('ID Pendaftaran tidak sah untuk program ini. Pastikan anda menggunakan No. ID yang betul (e.g. REG-882001).');
      return;
    }

    if (matchingReg.feedbackSubmitted) {
      setFeedError('Maklum balas bagi ID pendaftaran ini telah pun dihantar sebelum ini.');
      return;
    }

    // Dynamic rating update (weight of 15 prior reviews)
    const priorReviews = 15;
    const currentRating = activeFeedTrainer.rating;
    const updatedRating = parseFloat(((currentRating * priorReviews + feedRating) / (priorReviews + 1)).toFixed(2));

    // Update trainer
    setTrainers(prev => prev.map(t => {
      if (t.id === activeFeedTrainer.id) {
        const updated = { ...t, rating: updatedRating };
        supabase.from('trainers').update({ rating: updatedRating }).eq('id', updated.id)
          .then(({ error }) => { if (error) console.error('trainer rating update failed:', error.message); });
        return updated;
      }
      return t;
    }));

    // Update matching registration as feedback submitted
    setRegistrations(prev => prev.map(r => {
      if (r.id.toUpperCase() === trimmedId) {
        const updated = { ...r, feedbackSubmitted: true };
        supabase.from('registrations').update({ feedback_submitted: true }).eq('id', updated.id)
          .then(({ error }) => { if (error) console.error('registration feedback flag update failed:', error.message); });
        return updated;
      }
      return r;
    }));

    // Construct and save FeedbackItem
    const feedbackId = 'FEED-' + Math.floor(1000 + Math.random() * 9000);
    const newFeedback: FeedbackItem = {
      id: feedbackId,
      registrationId: trimmedId,
      programId: activeFeedProgram.id,
      programTitle: activeFeedProgram.title,
      trainerId: activeFeedTrainer.id,
      participantName: matchingReg.participantName,
      ratingOverall: feedRating,
      ratingMaterials: feedRatingMaterials,
      ratingTrainer: feedRatingTrainer,
      expectationMet: feedExpectationMet,
      comment: feedComment.trim(),
      createdAt: new Date().toISOString()
    };

    setFeedbacks(prev => [newFeedback, ...prev]);
    supabase.from('feedbacks').insert(feedbackToRow(newFeedback))
      .then(({ error }) => { if (error) console.error('feedback insert failed:', error.message); });

    setFeedSuccessMsg(`Terima kasih! Maklum balas anda telah berjaya disimpan secara langsung. Rating ${activeFeedTrainer.name} kini dikemas kini ke ${updatedRating}!`);
    
    // Clear inputs after brief delay
    setTimeout(() => {
      setFeedRefId('');
      setFeedRating(5);
      setFeedRatingMaterials(5);
      setFeedRatingTrainer(5);
      setFeedExpectationMet('Sangat Setuju');
      setFeedComment('');
      setFeedSuccessMsg('');
      setFeedError('');
      setUrlAction(null);
    }, 4500);
  };

  const regProgId = bookingProgram?.programId || (urlAction?.type === 'register' ? urlAction.programId : null);
  const regTrainerId = bookingProgram?.trainerId || (urlAction?.type === 'register' ? urlAction.trainerId : null);
  const regProgram = portfolios.find(p => p.id === regProgId);
  const regTrainer = trainers.find(t => t.id === regTrainerId);

  const feedProgId = urlAction?.programId;
  const feedTrainerId = urlAction?.trainerId;
  const feedProgram = portfolios.find(p => p.id === feedProgId);
  const feedTrainer = trainers.find(t => t.id === feedTrainerId);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-500/15 selection:text-red-500" id="app-root">
      
      {/* Decorative Radial Ambient Red Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.08),transparent_55%)] -z-10 pointer-events-none" />

      {/* Sticky Top Navigation with Logo and Glassmorphic buttons */}
      <nav 
        className={`sticky top-0 z-40 w-full bg-zinc-950/75 backdrop-blur-md border-b border-zinc-900/30 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          showHeader ? 'translate-y-0 opacity-100 shadow-none' : '-translate-y-full opacity-0 shadow-none sm:translate-y-0 sm:opacity-100'
        }`} 
        id="app-nav"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-2" id="nav-logo">
            <div className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg shadow-inner backdrop-blur-sm shrink-0">
              <GraduationCap size={16} className="stroke-[2.5]" />
            </div>
            {/* Full logo text for screens >= 640px (sm) */}
            <div className="hidden sm:block">
              <span className="text-sm md:text-base font-black tracking-tight text-white block leading-none">
                Trainerpreneur<span className="text-red-500 font-black">.World</span>
              </span>
              <span className="text-[8px] font-extrabold text-zinc-500 tracking-wider uppercase block mt-0.5">
                Trainer Directory & Programs
              </span>
            </div>
            {/* Compact logo text for mobile view (< 640px) */}
            <div className="sm:hidden block">
              <span className="text-xs font-black tracking-tight text-white block leading-none">
                TP<span className="text-red-500 font-black">.World</span>
              </span>
            </div>
          </div>
          
          {/* Glass Action Buttons */}
          <div className="flex items-center gap-2" id="nav-actions">
            {currentUser ? (
              <>
                {/* Active Session Indicator */}
                <div 
                  className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/25 border border-red-900/30 text-[10px] font-extrabold tracking-wider uppercase text-red-400 cursor-help"
                  title={`${currentUser} (${currentUserRole === 'admin' ? 'Admin' : 'Trainer'})`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>Access: {currentUserRole === 'admin' ? 'Admin' : 'Trainer'}</span>
                </div>

                {currentUserRole === 'trainer' && currentLoggedTrainerId && (
                  <button
                    onClick={() => {
                      const loggedTrainer = trainers.find(t => t.id === currentLoggedTrainerId);
                      if (loggedTrainer) {
                        setSelectedTrainer(loggedTrainer);
                      } else {
                        showToast('Profil trainer tidak dijumpai.', 'error');
                      }
                    }}
                    className="px-2.5 xs:px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 hover:scale-102 shadow-[0_2px_8px_rgba(239,68,68,0.25)] hover:shadow-[0_4px_12px_rgba(239,68,68,0.4)] cursor-pointer shrink-0"
                    title="Edit My Profile"
                    id="my-profile-btn"
                  >
                    <User size={12} className="stroke-[2.5]" />
                    <span className="hidden xs:inline">My Profile</span>
                  </button>
                )}

                {/* Log Keluar Button */}
                <button
                  onClick={() => {
                    let confirmLogout = true;
                    try {
                      confirmLogout = window.confirm('Are you sure you want to log out of the system?');
                    } catch (e) {
                      console.warn("window.confirm is blocked in this environment.", e);
                    }
                    if (confirmLogout) {
                      setCurrentUser(null);
                      setCurrentUserRole(null);
                      setCurrentLoggedTrainerId(null);
                    }
                  }}
                  className="px-2.5 xs:px-3 py-1.5 rounded-full bg-red-950/45 hover:bg-red-900/50 text-red-400 hover:text-red-300 font-bold text-[11px] border border-red-900/50 hover:border-red-500/60 backdrop-blur-md transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 shrink-0"
                  id="logout-btn"
                >
                  <LogIn size={12} className="stroke-[2.5] rotate-180" />
                  <span className="hidden xs:inline">Logout</span>
                </button>
              </>
            ) : (
              /* Log Masuk Button styled beautifully in red with standard curve */
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-3 py-1.5 rounded-full bg-red-950/45 hover:bg-red-900/50 text-red-400 hover:text-red-300 font-bold text-[11px] border border-red-900/50 hover:border-red-500/60 backdrop-blur-md transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                id="login-trigger-btn"
              >
                <LogIn size={12} className="stroke-[2.5]" />
                Login
              </button>
            )}

            {/* Daftar Trainer & Kursus Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-2.5 xs:px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-black text-[11px] border border-red-600 hover:border-red-500 transition-all duration-300 flex items-center gap-1 cursor-pointer hover:scale-[1.01] active:scale-95 shadow-sm shrink-0"
              id="add-trainer-trigger"
            >
              <Plus size={12} strokeWidth={2.5} />
              <span className="hidden xs:inline">Register Trainer & Course</span>
              <span className="xs:hidden text-[10px] font-black uppercase tracking-wider">Register</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Primary Navigation / Header Panel */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-0.5 md:pt-6 md:pb-2 text-center" id="app-header">
        <div className="flex flex-col items-center justify-center gap-2.5">
          <div className="space-y-1.5 flex flex-col items-center">
            <div className="flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(239,68,68,0.15)" }}
                className="relative px-3 py-0.5 md:px-3.5 md:py-1 bg-red-950/45 border border-red-900/30 text-red-400 rounded-full text-[9px] md:text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-sm overflow-hidden cursor-pointer group"
              >
                {/* Subtly moving light reflection / shimmer */}
                <motion.div 
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-red-400/20 to-transparent -skew-x-12"
                />
                
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                >
                  <Sparkles size={9} className="text-red-400" />
                </motion.div>
                
                <span className="relative z-10 font-black tracking-widest">
                  Trainers Worldwide
                </span>
                
                <span className="relative flex h-1 w-1 md:h-1.5 md:w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1 w-1 md:h-1.5 md:w-1.5 bg-red-500"></span>
                </span>
              </motion.div>
            </div>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none sm:leading-tight mb-2">
              Gallery of <span className="font-sans font-black text-red-500">Top Trainers</span>
            </h1>
            <p className="text-zinc-400 text-[10px] sm:text-xs md:text-sm max-w-md leading-relaxed mx-auto font-medium tracking-wide">
              Discover HRD Corp certified trainers and premier training programs tailored to your organizational needs
            </p>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 space-y-4 md:space-y-6" id="app-main">
        
        {/* Dynamic Top Ranking Trainers Section - Overflow hidden avoids mobile horizontal wobble */}
        <section id="top-ranking-section-wrapper" className="pt-1 w-full overflow-x-hidden relative">
          <TopRankingTrainers
            trainers={trainers}
            onSelectTrainer={(trainer) => setSelectedTrainer(trainer)}
          />
        </section>

        {/* Smart Search Bar Row */}
        <div className="hidden sm:flex justify-center w-full pt-1" id="search-bar-row">
          <div className="relative w-full max-w-2xl group" id="search-input-wrapper">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-500 transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search name, certification, specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-2.5 md:py-3.5 rounded-full bg-zinc-900 border border-zinc-800/80 text-white text-xs md:text-sm placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500/60 transition-all shadow-lg shadow-black/20"
              id="search-input-field"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Category Filter Panel */}
        <section className="py-2 flex flex-col gap-3.5" id="filter-controls-section">
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-6 bg-zinc-800/60" />
            <span className="text-[9px] uppercase font-bold tracking-widest text-zinc-500">List of training fields</span>
            <span className="h-px w-6 bg-zinc-800/60" />
          </div>
          
          {/* Centered Responsive Filter Tabs - Horizontal scrollable on mobile */}
          <div className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-2 max-w-full sm:max-w-5xl mx-auto overflow-x-auto sm:overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth px-4 sm:px-0 pb-2 sm:pb-0">
            {[
              { id: 'all', label: 'All Fields', icon: Compass, activeClass: 'bg-red-600 border-red-600 text-white shadow-md shadow-red-600/10', hoverClass: 'hover:text-red-500 hover:border-red-900 hover:bg-red-950/20' },
              { id: 'safety', label: 'Safety & Compliance', icon: ShieldCheck, activeClass: 'bg-rose-600 border-rose-600 text-white shadow-md shadow-rose-600/10', hoverClass: 'hover:text-rose-400 hover:border-rose-900 hover:bg-rose-950/20' },
              { id: 'technical', label: 'Technical & IT', icon: Cpu, activeClass: 'bg-sky-600 border-sky-600 text-white shadow-md shadow-sky-600/10', hoverClass: 'hover:text-sky-400 hover:border-sky-900 hover:bg-sky-950/20' },
              { id: 'management', label: 'Leadership & Management', icon: Users, activeClass: 'bg-violet-600 border-violet-600 text-white shadow-md shadow-violet-600/10', hoverClass: 'hover:text-violet-400 hover:border-violet-900 hover:bg-violet-950/20' },
              { id: 'marketing', label: 'Marketing & Sales', icon: TrendingUp, activeClass: 'bg-fuchsia-600 border-fuchsia-600 text-white shadow-md shadow-fuchsia-600/10', hoverClass: 'hover:text-fuchsia-400 hover:border-fuchsia-900 hover:bg-fuchsia-950/20' },
              { id: 'finance', label: 'Finance & Investment', icon: Coins, activeClass: 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/10', hoverClass: 'hover:text-emerald-400 hover:border-emerald-900 hover:bg-emerald-950/20' },
              { id: 'business', label: 'Business & Entrepreneurship', icon: Briefcase, activeClass: 'bg-amber-600 border-amber-600 text-white shadow-md shadow-amber-600/10', hoverClass: 'hover:text-amber-400 hover:border-amber-900 hover:bg-amber-950/20' },
              { id: 'soft_skills', label: 'Soft Skills', icon: MessagesSquare, activeClass: 'bg-orange-600 border-orange-600 text-white shadow-md shadow-orange-600/10', hoverClass: 'hover:text-orange-400 hover:border-orange-900 hover:bg-orange-950/20' },
            ].map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3.5 py-2 rounded-full text-[11px] font-extrabold transition-all duration-300 flex items-center gap-1.5 border cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive ? cat.activeClass : `bg-zinc-900/60 border-zinc-800/80 text-zinc-400 ${cat.hoverClass}`
                  }`}
                  id={`category-tab-${cat.id}`}
                >
                  <Icon size={12} />
                  <span>{cat.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-zinc-800/80 text-zinc-400'
                  }`}>
                    {getCategoryCount(cat.id as any)}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Dynamic Bento Grid Display */}
        <section id="bento-grid-section">
          <TrainerBentoGrid
            category={selectedCategory}
            trainers={filteredTrainers}
            portfolios={filteredPortfolios}
            stats={TRAINING_STATS}
            onSelectTrainer={(trainer) => setSelectedTrainer(trainer)}
            onBookTraining={handleBookTraining}
          />
        </section>

      </main>

      {/* Interactive Trainer Detailed Profile Modal */}
      <TrainerDetailModal
        trainer={selectedTrainer}
        portfolios={portfolios}
        allTrainers={trainers}
        currentUserRole={currentUserRole}
        currentLoggedTrainerId={currentLoggedTrainerId}
        onClose={() => setSelectedTrainer(null)}
        onBookTraining={handleBookTraining}
        onUpdateTrainer={handleUpdateTrainer}
        onUpdatePortfolios={handleUpdatePortfolios}
        feedbacks={feedbacks}
        onFeedbackTraining={(programId, trainerId) => {
          setSelectedTrainer(null); // Close trainer detail modal first so the feedback form isn't covered
          setUrlAction({ type: 'feedback', programId, trainerId });
        }}
      />

      {/* Interactive Registration / Addition Modal */}
      <AddTrainerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(newTrainer, newPortfolio) => {
          handleAddTrainer(newTrainer, newPortfolio);
          setIsAddModalOpen(false);
          // Toast or notice trigger
          try {
            showToast(`Trainer ${newTrainer.name} dan kursus "${newPortfolio.title}" berjaya didaftarkan.`, 'success');
          } catch (e) {
            console.warn("toast is blocked in this environment.", e);
          }
        }}
      />

      {/* Interactive Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(userName, role, trainerId) => {
          setCurrentUser(userName);
          setCurrentUserRole(role);
          if (trainerId) {
            setCurrentLoggedTrainerId(trainerId);
          } else {
            setCurrentLoggedTrainerId(null);
          }
        }}
        trainers={trainers}
      />

      {/* REGISTRATION MODAL OVERLAY */}
      <AnimatePresence>
        {(bookingProgram || (urlAction?.type === 'register' && regProgram && regTrainer)) && regProgram && regTrainer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl max-w-lg w-full overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-800 to-red-600 p-5 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookmarkCheck className="text-white shrink-0" size={20} />
                  <div>
                    <h3 className="font-extrabold text-sm md:text-base tracking-tight uppercase">Training Session Registration</h3>
                    <span className="text-[10px] text-red-200 block font-medium">Complete your registration with real participant details</span>
                  </div>
                </div>
                <button
                  onClick={() => { setBookingProgram(null); setUrlAction(null); }}
                  className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                  type="button"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content */}
              <form onSubmit={handleSaveRegistration} className="p-6 space-y-5">
                {/* Program Preview Card */}
                <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/60 flex items-start gap-3">
                  <img
                    src={regProgram.image}
                    alt={regProgram.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0 border border-zinc-850"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1">
                    <span className="text-[9px] font-extrabold text-red-500 uppercase tracking-wider block bg-red-500/10 px-1.5 py-0.5 rounded w-fit">
                      {regProgram.duration} • {regProgram.level}
                    </span>
                    <p className="text-xs font-bold text-zinc-100 leading-snug">{regProgram.title}</p>
                    <span className="text-[10px] text-zinc-400 block">Lead Trainer: <strong className="text-zinc-200">{regTrainer.name}</strong></span>
                  </div>
                </div>

                {/* Inputs */}
                <div className="space-y-3.5">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Participant Full Name (As per certificate) <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Mazian Musa"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/30 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Contact Email <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Phone Number <span className="text-xs text-zinc-500 font-normal">(WhatsApp active)</span></label>
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="e.g. +60123456789"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/30 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Share Register Link Section */}
                <div className="p-3 bg-zinc-950/40 rounded-xl border border-zinc-800/60 flex items-center justify-between text-xs gap-3">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-zinc-300 block text-[11px]">Share Registration Form</span>
                    <span className="text-[10px] text-zinc-500 block leading-tight">Copy this registration form link to share with your colleagues.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const url = `${window.location.origin}${window.location.pathname}?action=register&trainerId=${regTrainer.id}&programId=${regProgram.id}`;
                      try {
                        navigator.clipboard.writeText(url);
                        showToast('Pautan pendaftaran program berjaya disalin!', 'success');
                      } catch (err) {
                        console.error('Failed to copy', err);
                      }
                    }}
                    className="px-2.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 border border-zinc-750"
                  >
                    <Copy size={11} />
                    <span>Copy Link</span>
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => { setBookingProgram(null); setUrlAction(null); }}
                    className="px-4 py-2 text-zinc-400 hover:text-white transition-colors cursor-pointer font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-full transition-all cursor-pointer shadow-md shadow-red-600/10"
                  >
                    Submit Session Registration
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>      {/* FEEDBACK MODAL OVERLAY */}
      <AnimatePresence>
        {urlAction?.type === 'feedback' && feedProgram && feedTrainer && (() => {
          const liveMatchingReg = feedRefId.trim()
            ? registrations.find(r => r.id.toUpperCase() === feedRefId.trim().toUpperCase() && r.programId === feedProgram.id)
            : null;

          const getOverallStarLabel = (rating: number) => {
            switch (rating) {
              case 1: return "Very Poor / Terrible";
              case 2: return "Unsatisfactory";
              case 3: return "Satisfactory";
              case 4: return "Very Good & Beneficial";
              case 5: return "Excellent & Outstanding";
              default: return "";
            }
          };

          const getMaterialsStarLabel = (rating: number) => {
            switch (rating) {
              case 1: return "Not Helpful";
              case 2: return "Needs Improvement";
              case 3: return "Good & Sufficient";
              case 4: return "Very Rich & Informative";
              case 5: return "Complete & Highly Professional";
              default: return "";
            }
          };

          const getTrainerStarLabel = (rating: number) => {
            switch (rating) {
              case 1: return "Difficult to Understand";
              case 2: return "Unclear Delivery";
              case 3: return "Moderately Competent";
              case 4: return "Highly Engaging & Interactive";
              case 5: return "Inspirational & Exceptional";
              default: return "";
            }
          };

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl max-w-4xl w-full overflow-hidden my-8"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-rose-850 via-rose-750 to-red-650 p-5 md:p-6 text-white flex items-center justify-between border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-rose-300">
                      <MessagesSquare size={22} className="animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-sans font-extrabold text-sm md:text-lg tracking-tight uppercase">Evaluation & Feedback Form</h3>
                      <span className="text-[10px] md:text-xs text-rose-200 block font-medium">Complete the evaluation to guarantee quality and CPD training credits</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setUrlAction(null)}
                    className="p-2 rounded-full bg-white/5 text-zinc-300 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
                    type="button"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Content Split Grid */}
                <form onSubmit={handleSaveFeedback} className="flex flex-col">
                  <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[70vh] overflow-y-auto">
                    
                    {/* Left Column (Program & Verification Info) */}
                    <div className="md:col-span-5 space-y-4 md:border-r md:border-zinc-850 md:pr-6">
                      
                      {/* Course Title Card */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest block">Training Program Details</span>
                        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/60 space-y-3.5 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-xl pointer-events-none" />
                          <div className="flex items-center gap-3">
                            <img
                              src={feedTrainer.avatar}
                              alt={feedTrainer.name}
                              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-zinc-800"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <span className="text-[9px] font-extrabold text-rose-500 bg-rose-950/40 border border-rose-900/30 px-2 py-0.5 rounded-full uppercase tracking-wider inline-block">
                                Session Completed
                              </span>
                              <h4 className="font-sans text-xs font-bold text-zinc-100 line-clamp-2 mt-1 leading-snug">{feedProgram.title}</h4>
                            </div>
                          </div>
                          
                          <div className="pt-3 border-t border-zinc-850 text-[10px] flex justify-between text-zinc-400">
                            <span>Lead Trainer:</span>
                            <span className="font-extrabold text-zinc-200">{feedTrainer.name}</span>
                          </div>
                        </div>
                      </div>

                      {/* ID Verification & Live Feedback */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                            Participant Registration ID <span className="text-rose-500">*</span>
                          </label>
                          {liveMatchingReg ? (
                            liveMatchingReg.feedbackSubmitted ? (
                              <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 bg-amber-950/30 border border-amber-900/30 px-2 py-0.5 rounded">
                                <AlertTriangle size={10} /> Already Reviewed
                              </span>
                            ) : (
                              <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1 bg-emerald-950/30 border border-emerald-900/30 px-2 py-0.5 rounded">
                                <CheckCircle size={10} /> Verified
                              </span>
                            )
                          ) : feedRefId.trim() ? (
                            <span className="text-[9px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1 bg-rose-950/30 border border-rose-900/30 px-2 py-0.5 rounded">
                              Invalid
                            </span>
                          ) : null}
                        </div>

                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={feedRefId}
                            onChange={(e) => setFeedRefId(e.target.value)}
                            placeholder="e.g. REG-124904"
                            className={`w-full bg-zinc-950 border rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-white placeholder-zinc-700 focus:outline-none transition-all ${
                              liveMatchingReg 
                                ? 'border-emerald-700/80 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500/30' 
                                : feedRefId.trim() 
                                ? 'border-rose-700/80 focus:border-rose-600 focus:ring-1 focus:ring-rose-500/30' 
                                : 'border-zinc-800 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30'
                            }`}
                          />
                        </div>

                        {/* Live validation feedback card */}
                        {liveMatchingReg ? (
                          liveMatchingReg.feedbackSubmitted ? (
                            <div className="p-3 bg-amber-950/40 border border-amber-900/40 rounded-xl text-amber-200 text-[11px] leading-relaxed flex items-start gap-2">
                              <AlertTriangle className="shrink-0 mt-0.5 text-amber-400" size={14} />
                              <div>
                                <span className="font-extrabold text-[10px] block text-amber-300 uppercase tracking-wide">ID Already Used</span>
                                ID <strong>{liveMatchingReg.id}</strong> is registered under the name <strong>{liveMatchingReg.participantName}</strong>, but feedback has already been submitted for this registration.
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 bg-emerald-950/40 border border-emerald-900/40 rounded-xl text-emerald-200 text-[11px] leading-relaxed flex items-start gap-2">
                              <CheckCircle className="shrink-0 mt-0.5 text-emerald-400" size={14} />
                              <div>
                                <span className="font-extrabold text-[10px] block text-emerald-300 uppercase tracking-wide">Verification Successful</span>
                                Valid registration record found for participant: <strong className="text-white">{liveMatchingReg.participantName}</strong>.
                              </div>
                            </div>
                          )
                        ) : feedRefId.trim() ? (
                          <div className="p-3 bg-rose-950/40 border border-rose-900/40 rounded-xl text-rose-300 text-[11px] leading-relaxed flex items-start gap-2">
                            <AlertTriangle className="shrink-0 mt-0.5 text-rose-400" size={14} />
                            <div>
                              <span className="font-extrabold text-[10px] block text-rose-300 uppercase tracking-wide">Reference Not Found</span>
                              ID <strong>{feedRefId}</strong> is not registered for this program. Please select from the list below or enter a correct ID.
                            </div>
                          </div>
                        ) : (
                          <span className="text-[10px] text-zinc-500 block leading-tight">
                            Enter your unique registration reference number received when booking this program.
                          </span>
                        )}
                      </div>

                      {/* Quick select database registrations */}
                      <div className="p-3.5 bg-zinc-950/50 border border-zinc-800 rounded-xl space-y-2.5">
                        <div className="flex items-center gap-1.5">
                          <Users size={12} className="text-rose-400" />
                          <span className="text-[10px] font-black text-zinc-300 uppercase tracking-wider block">
                            Select Your Registered ID:
                          </span>
                        </div>
                        
                        <div className="max-h-[140px] overflow-y-auto pr-1 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                          {registrations.filter(r => r.programId === feedProgram.id).length === 0 ? (
                            <div className="text-center py-4 text-zinc-600 text-[10px] font-bold">
                              No active registration records found for this program.
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 gap-1.5">
                              {registrations.filter(r => r.programId === feedProgram.id).map(r => (
                                <button
                                  key={r.id}
                                  type="button"
                                  onClick={() => setFeedRefId(r.id)}
                                  className={`p-2 rounded-lg font-bold flex items-center justify-between border transition-all cursor-pointer text-[11px] ${
                                    r.feedbackSubmitted 
                                      ? 'bg-zinc-900/30 border-zinc-850 text-zinc-550 cursor-not-allowed' 
                                      : feedRefId === r.id
                                      ? 'bg-rose-950/40 border-rose-600/80 text-rose-200'
                                      : 'bg-zinc-900/60 hover:bg-zinc-900 border-zinc-800/80 text-zinc-300 hover:text-white'
                                  }`}
                                  disabled={r.feedbackSubmitted}
                                  title={r.feedbackSubmitted ? 'Review already submitted for this ID' : `Ready to review`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-[10px] tracking-wide text-zinc-400">{r.id}</span>
                                    <span className="text-zinc-200 truncate max-w-[130px]">{r.participantName}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-[9px]">
                                    {r.feedbackSubmitted ? (
                                      <span className="text-zinc-555 flex items-center gap-0.5 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-850 font-normal">
                                        <Check size={8} /> Done
                                      </span>
                                    ) : (
                                      <span className="text-rose-400 font-extrabold bg-rose-950/50 px-1.5 py-0.5 rounded border border-rose-900/30">
                                        Select
                                      </span>
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Share & QR Code for Feedback */}
                      <div className="p-3.5 bg-zinc-950/60 border border-zinc-800/85 rounded-xl space-y-3">
                        <div className="flex items-center gap-1.5">
                          <QrCode size={13} className="text-rose-400" />
                          <span className="text-[10px] font-black text-zinc-300 uppercase tracking-wider block">
                            Scan Feedback Form QR:
                          </span>
                        </div>

                        <div className="flex items-center gap-3.5 bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-850">
                           {/* Image */}
                           <div className="bg-white p-1.5 rounded-lg shrink-0 shadow-sm">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                                `${window.location.origin}${window.location.pathname}?action=feedback&trainerId=${feedTrainer.id}&programId=${feedProgram.id}`
                              )}&color=18181b&bgcolor=ffffff&qzone=1`}
                              alt="Feedback QR Code"
                              className="w-14 h-14 object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Info and Copy Link Button */}
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <p className="text-[10px] text-zinc-400 leading-tight">
                              Share this QR code with other participants so they can easily submit their feedback on their mobile devices.
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                const url = `${window.location.origin}${window.location.pathname}?action=feedback&trainerId=${feedTrainer.id}&programId=${feedProgram.id}`;
                                try {
                                  if (navigator.clipboard && navigator.clipboard.writeText) {
                                    navigator.clipboard.writeText(url);
                                    setFeedQrCopied(true);
                                    setTimeout(() => setFeedQrCopied(false), 2500);
                                  } else {
                                    const tempInput = document.createElement('input');
                                    tempInput.value = url;
                                    document.body.appendChild(tempInput);
                                    tempInput.select();
                                    document.execCommand('copy');
                                    document.body.removeChild(tempInput);
                                    setFeedQrCopied(true);
                                    setTimeout(() => setFeedQrCopied(false), 2500);
                                  }
                                } catch (e) {
                                  console.error("Copy failed", e);
                                }
                              }}
                              className={`w-full py-1.5 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                feedQrCopied
                                  ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/40'
                                  : 'bg-zinc-800 hover:bg-rose-950/30 text-zinc-300 hover:text-rose-300 border border-zinc-700 hover:border-rose-900/40'
                              }`}
                            >
                              {feedQrCopied ? (
                                <>
                                  <Check size={11} className="text-emerald-400" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Link2 size={11} />
                                  <span>Copy Form Link</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Right Column (The Form Questionnaires) */}
                    <div className="md:col-span-7 space-y-4">
                      
                      {/* Top Warning Banner / Status Check */}
                      {feedProgram.status !== 'Selesai' && (
                        <div className="p-3 bg-amber-950/45 border border-amber-900/35 rounded-xl text-amber-200 text-xs leading-relaxed flex items-start gap-2.5">
                          <AlertTriangle className="shrink-0 mt-0.5 text-amber-400" size={16} />
                          <div>
                            <strong className="font-extrabold block text-amber-300 uppercase tracking-wide text-[10px]">Training Session Not Yet Finished</strong>
                            <span>This program is still marked as <strong>Active</strong>. Please ask the trainer to change the status to <strong>Completed</strong> to enable reviews.</span>
                          </div>
                        </div>
                      )}

                      {/* Error & Success Alerts inside form */}
                      {feedError && (
                        <div className="p-3 bg-red-950/65 border border-red-900/35 rounded-xl text-red-400 text-xs font-medium leading-relaxed flex items-start gap-2 animate-pulse">
                          <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                          <span>{feedError}</span>
                        </div>
                      )}

                      {feedSuccessMsg && (
                        <div className="p-3 bg-emerald-950/65 border border-emerald-900/35 rounded-xl text-emerald-400 text-xs font-medium leading-relaxed flex items-start gap-2">
                          <CheckCircle className="shrink-0 mt-0.5 text-emerald-400" size={14} />
                          <span>{feedSuccessMsg}</span>
                        </div>
                      )}

                      <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest block">Session Evaluation Metrics</span>

                      {/* Questionnaire Box */}
                      <div className="space-y-4.5 bg-zinc-950/30 p-4 border border-zinc-800/80 rounded-xl">
                        
                        {/* Rating 1: Overall */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] font-black text-rose-300 uppercase tracking-wider block">
                              1. Overall Program Rating <span className="text-rose-500">*</span>
                            </label>
                            <span className="text-[10px] font-bold text-amber-400 font-mono">
                              {feedRating}.0 / 5.0
                            </span>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-850">
                            <div className="flex items-center gap-1.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setFeedRating(star)}
                                  className="text-zinc-650 hover:text-amber-500 hover:scale-110 transition-all focus:outline-none cursor-pointer"
                                  title={`${star} Stars`}
                                >
                                  <Star
                                    size={22}
                                    className={star <= feedRating ? 'fill-amber-500 text-amber-500 drop-shadow-[0_0_4px_rgba(245,158,11,0.2)]' : 'text-zinc-700'}
                                  />
                                </button>
                              ))}
                            </div>
                            <span className="text-[10px] font-bold text-zinc-400 tracking-wide">
                              {getOverallStarLabel(feedRating)}
                            </span>
                          </div>
                        </div>

                        {/* Rating 2: Course Materials */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] font-black text-zinc-300 uppercase tracking-wider block">
                              2. Quality of Slides & Training Materials <span className="text-rose-500">*</span>
                            </label>
                            <span className="text-[10px] font-bold text-amber-400 font-mono">
                              {feedRatingMaterials}.0 / 5.0
                            </span>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-850">
                            <div className="flex items-center gap-1.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setFeedRatingMaterials(star)}
                                  className="text-zinc-650 hover:text-amber-500 hover:scale-110 transition-all focus:outline-none cursor-pointer"
                                  title={`${star} Stars`}
                                >
                                  <Star
                                    size={22}
                                    className={star <= feedRatingMaterials ? 'fill-amber-500 text-amber-500 drop-shadow-[0_0_4px_rgba(245,158,11,0.2)]' : 'text-zinc-700'}
                                  />
                                </button>
                              ))}
                            </div>
                            <span className="text-[10px] font-bold text-zinc-400 tracking-wide">
                              {getMaterialsStarLabel(feedRatingMaterials)}
                            </span>
                          </div>
                        </div>

                        {/* Rating 3: Trainer Competency */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] font-black text-zinc-300 uppercase tracking-wider block">
                              3. Trainer Competency & Delivery <span className="text-rose-500">*</span>
                            </label>
                            <span className="text-[10px] font-bold text-amber-400 font-mono">
                              {feedRatingTrainer}.0 / 5.0
                            </span>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-850">
                            <div className="flex items-center gap-1.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setFeedRatingTrainer(star)}
                                  className="text-zinc-650 hover:text-amber-500 hover:scale-110 transition-all focus:outline-none cursor-pointer"
                                  title={`${star} Stars`}
                                >
                                  <Star
                                    size={22}
                                    className={star <= feedRatingTrainer ? 'fill-amber-500 text-amber-500 drop-shadow-[0_0_4px_rgba(245,158,11,0.2)]' : 'text-zinc-700'}
                                  />
                                </button>
                              ))}
                            </div>
                            <span className="text-[10px] font-bold text-zinc-400 tracking-wide">
                              {getTrainerStarLabel(feedRatingTrainer)}
                            </span>
                          </div>
                        </div>

                        {/* Rating 4: Expectation Met */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-zinc-300 uppercase tracking-wider block">
                            4. Did This Program Meet Your Expectations? <span className="text-rose-500">*</span>
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {(['Strongly Agree', 'Agree', 'Disagree'] as const).map((opt) => {
                              const isActive = feedExpectationMet === opt;
                              let activeStyles = '';
                              if (isActive) {
                                if (opt === 'Strongly Agree') activeStyles = 'bg-emerald-950/50 border-emerald-500 text-emerald-300';
                                else if (opt === 'Agree') activeStyles = 'bg-sky-950/50 border-sky-500 text-sky-300';
                                else activeStyles = 'bg-rose-950/50 border-rose-500 text-rose-300';
                              }
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => setFeedExpectationMet(opt)}
                                  className={`py-2 px-1.5 rounded-xl text-[10px] font-bold text-center transition-all cursor-pointer border ${
                                    isActive
                                      ? `${activeStyles} shadow-sm shadow-black/20 font-extrabold`
                                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                      </div>

                      {/* Comments Area */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                          Write a Review & Suggestions for Improvement
                        </label>
                        <textarea
                          value={feedComment}
                          onChange={(e) => setFeedComment(e.target.value)}
                          placeholder="Please share your experience (e.g., program strengths, trainer excellence, suggestions for improvement, etc.)..."
                          rows={3}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30 transition-all resize-none font-sans leading-relaxed"
                        />
                      </div>

                    </div>

                  </div>

                  {/* Actions footer */}
                  <div className="p-4 md:p-5 bg-zinc-950/50 border-t border-zinc-800 flex items-center justify-end gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setUrlAction(null)}
                      className="px-4 py-2 text-zinc-400 hover:text-white transition-colors cursor-pointer font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!!feedSuccessMsg || feedProgram.status !== 'Selesai' || !feedRefId.trim()}
                      className={`px-6 py-2.5 text-white font-extrabold rounded-full transition-all cursor-pointer shadow-md flex items-center gap-1.5 ${
                        feedSuccessMsg || feedProgram.status !== 'Selesai' || !feedRefId.trim()
                          ? 'bg-zinc-800 border border-zinc-750 text-zinc-550 cursor-not-allowed shadow-none'
                          : 'bg-rose-600 hover:bg-rose-500 hover:scale-[1.02] shadow-rose-600/10'
                      }`}
                    >
                      <CheckCircle size={14} />
                      <span>{feedProgram.status !== 'Selesai' ? 'Session Not Finished' : 'Submit Evaluation Form'}</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* SUCCESS CONFIRMATION TOAST / CARD */}
      <AnimatePresence>
        {registeredCourse && (
          <div className="fixed bottom-0 inset-x-0 sm:bottom-6 sm:right-6 sm:left-auto z-50 p-4 sm:max-w-md w-full animate-fade-in" id="booking-toast-container">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800/80 overflow-hidden"
            >
               <div className="bg-red-600 p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookmarkCheck size={18} className="text-white shrink-0" />
                  <span className="font-extrabold text-sm tracking-tight text-white uppercase">Registration Successful!</span>
                </div>
                <button
                  onClick={() => setRegisteredCourse(null)}
                  className="p-1 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-red-400 tracking-wider uppercase block">Training Program Series:</span>
                  <p className="text-sm font-bold text-white leading-snug">{registeredCourse.courseTitle}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800/50 text-xs">
                  <div>
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Lead Trainer:</span>
                    <span className="font-semibold text-zinc-200">{registeredCourse.trainerName}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Registration Reference:</span>
                    <span className="font-mono font-bold text-red-400 block bg-red-950/40 px-1.5 py-0.5 rounded w-fit mt-0.5 border border-red-900/30">
                      {registeredCourse.refId}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-zinc-950/40 border border-zinc-800/40 rounded-xl flex items-start gap-2.5 text-[11px] leading-relaxed text-zinc-350">
                  <Info className="shrink-0 text-red-500 mt-0.5" size={14} />
                  <span>
                    Our customer service officer will send the official quotation and <strong className="text-zinc-100">HRD Corp (Claimable)</strong> levy claim form within 24 hours.
                  </span>
                </div>

                <button
                  onClick={() => setRegisteredCourse(null)}
                  className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-red-600/10"
                >
                  <PhoneCall size={12} />
                  <span>Contact Us</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ToastContainer />
      <ConfirmDialogContainer />
    </div>
  );
}
