import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Mail, Phone, Star, Briefcase, CheckCircle2, Clock, BookOpen, Linkedin, Twitter, QrCode, Copy, Check, Download, Trophy, Medal, Crown, Sparkles, Camera, Upload, Plus, Trash2, Edit3, Save, FileText, Image, Share2, Link2, MessageSquare, GraduationCap, Building2, Loader2 } from 'lucide-react';
import { Trainer, PortfolioItem, FeedbackItem } from '../types';
import TrainerSalesAnalytics from './TrainerSalesAnalytics';
import { HRDCorpBadges } from './HRDCorpBadges';
import { showToast, showConfirm } from './Toast';
import { supabase } from '../lib/supabase';

const AVATAR_BUCKET = 'trainer-avatars';

const uploadAvatarToStorage = async (trainerId: string, file: File): Promise<string | null> => {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${trainerId}/avatar-${Date.now()}.${ext}`;
  const { error: upErr } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: true });
  if (upErr) {
    console.error('avatar upload failed:', upErr.message);
    return null;
  }
  const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path);
  return data?.publicUrl || null;
};

export function parseQualification(text: string) {
  // Match things like ' — 2020', ' - 2020', ' (2020)', ' 2020' at the end of string
  const match = text.match(/(?:[\s(—\-]+)((?:19|20)\d{2})\s*\)?$/);
  if (match) {
    const year = match[1];
    const title = text.replace(match[0], '').trim();
    return { title, year };
  }
  return { title: text, year: null };
}

export function getTrainerExtendedDetails(trainer: Trainer) {
  const experienceVal = trainer.experience || '8 Years';
  
  let academic: string[] = trainer.academicQualification || [];
  let professional: string[] = trainer.professionalQualification || [];
  let companies: string[] = trainer.previousCompanies || [];
  let topics: string[] = trainer.trainingTopics || [];
 
  if (academic.length === 0) {
    if (trainer.category === 'safety') {
      academic = [
        'Bachelor of Occupational Safety & Health Management (OUM) — 2018',
        'Diploma in Mechanical Engineering (UiTM) — 2013'
      ];
    } else if (trainer.category === 'technical') {
      academic = [
        'Bachelor of Computer Science (Information Systems) (UM) — 2016',
        'Professional Certificate in Network Technology (Polytechnic) — 2012'
      ];
    } else if (trainer.category === 'soft_skills') {
      academic = [
        'Master of Organizational Psychology (UKM) — 2017',
        'Bachelor of Mass Communication (UiTM) — 2012'
      ];
    } else if (trainer.category === 'management') {
      academic = [
        'Master of Business Administration (MBA) (USM) — 2015',
        'Bachelor of Business Management (UUM) — 2010'
      ];
    } else if (trainer.category === 'marketing') {
      academic = [
        'Bachelor of Digital Marketing (UiTM) — 2019',
        'Diploma in Strategic Communication (KPM) — 2015'
      ];
    } else if (trainer.category === 'finance') {
      academic = [
        'Bachelor of Accounting & Finance (UUM) — 2014',
        'Diploma in Investment Analysis (UiTM) — 2010'
      ];
    } else {
      academic = [
        'Bachelor of Business Administration (UM) — 2016',
        'Diploma in Market Analysis (Polytechnic) — 2012'
      ];
    }
  } else {
    // Ensure every academic entry has a year
    academic = academic.map((a, i) => {
      if (!/\b(19|20)\d{2}\b/.test(a)) {
        const year = 2016 - i * 4;
        return `${a} — ${year}`;
      }
      return a;
    });
  }

  if (professional.length === 0) {
    professional = [...trainer.certifications];
    if (professional.length === 0) {
      if (trainer.category === 'safety') {
        professional = ['DOSH Registered Safety & Health Officer (SHO) — 2019', 'NIOSH Certified Trainer — 2020'];
      } else if (trainer.category === 'technical') {
        professional = ['AWS Certified Solutions Architect — 2021', 'Google Cloud Certified Professional — 2022'];
      } else {
        professional = ['HRD Corp Certified Professional Trainer — 2018', 'Certified Executive Coach — 2020'];
      }
    } else {
      // Add a year if there isn't one
      professional = professional.map((p, i) => {
        if (!/\b(19|20)\d{2}\b/.test(p)) {
          const year = 2022 - i * 2;
          return `${p} — ${year}`;
        }
        return p;
      });
    }
  } else {
    // Add a year if there isn't one
    professional = professional.map((p, i) => {
      if (!/\b(19|20)\d{2}\b/.test(p)) {
        const year = 2022 - i * 2;
        return `${p} — ${year}`;
      }
      return p;
    });
  }

  if (companies.length === 0) {
    if (trainer.category === 'safety') {
      companies = ['Petronas Chemicals Group', 'Sime Darby Plantation', 'Gamuda Berhad', 'Shell Malaysia'];
    } else if (trainer.category === 'technical') {
      companies = ['Intel Malaysia', 'Aerodyne Group', 'Standard Chartered Global Tech', 'Huawei Malaysia'];
    } else if (trainer.category === 'soft_skills') {
      companies = ['Maybank Academy', 'Astro Malaysia', 'CIMB Group', 'Maxis Berhad'];
    } else if (trainer.category === 'management') {
      companies = ['Khazanah Nasional', 'EPF (KWSP)', 'TNB (Tenaga Nasional)', 'Telekom Malaysia'];
    } else if (trainer.category === 'marketing') {
      companies = ['Shopee Malaysia', 'Grab Southeast Asia', 'Mindshare Malaysia', 'Media Prima'];
    } else if (trainer.category === 'finance') {
      companies = ['PwC Malaysia', 'EY Global', 'Maybank Investment Bank', 'Bank Negara Malaysia'];
    } else {
      companies = ['Sime Darby Berhad', 'UEM Sunrise', 'Boustead Holdings', 'MR D.I.Y. Group'];
    }
  }

  if (topics.length === 0) {
    if (trainer.category === 'safety') {
      topics = [
        'Occupational Safety & Health Act (OSHA) Awareness Session',
        'Practical Fire Safety & Fire Risk Management Training',
        'Industrial First Aid & Practical CPR Course',
        'Job Safety Analysis & Detailed HIRARC Procedures'
      ];
    } else if (trainer.category === 'technical') {
      topics = [
        'Enterprise Cloud Architecture Construction Workshop (AWS & GCP)',
        'Introduction to DevOps, Docker & Kubernetes Containers',
        'Cybersecurity Awareness & Phishing Prevention Series',
        'Infrastructure as Code Automation (Terraform Masterclass)'
      ];
    } else if (trainer.category === 'soft_skills') {
      topics = [
        'High-Impact Leadership Training & Organizational EQ Management',
        'The Art of Assertive Communication & Strategic Corporate Influence',
        'Team Conflict Resolution & Win-Win Negotiation Skills Workshop',
        'High-Impact Presentation Delivery Techniques & Project Pitching'
      ];
    } else if (trainer.category === 'management') {
      topics = [
        'Strategic Plan & KPI Development for High-Performing Organizations',
        'Professional Project Management Course (Agile & Scrum Methodology)',
        'Transformational Leadership for Middle Management',
        'Quality Management System (ISO 9001:2015) Requirements & Practices'
      ];
    } else if (trainer.category === 'marketing') {
      topics = [
        'Integrated Digital Marketing Campaign Strategies (FB, IG & Google Ads)',
        'Creative Content Creation & Selling Copywriting Workshop',
        'Web Analytics & Google Analytics 4 (GA4) for ROI Optimization',
        'Corporate Brand Marketing & Social Media Reputation Management'
      ];
    } else if (trainer.category === 'finance') {
      topics = [
        'Finance for Non-Financial Managers (Finance for Non-Finance)',
        'Practical Corporate Financial Statement Analysis & Interpretation',
        'Budget Planning, Cash Flow Control & Sales Forecasting',
        'Corporate Tax Compliance & SST Requirements in Malaysia'
      ];
    } else {
      topics = [
        'The Art of Business Strategy & Competitive Market Analysis',
        'Efficient Supply Chain & Logistics Management',
        'Creativity & Design Thinking in Solutions Workshop',
        'Creative Problem Solving & Decision Making'
      ];
    }
  }

  return {
    academic,
    professional,
    experience: experienceVal,
    companies,
    topics
  };
}

interface TrainerDetailModalProps {
  trainer: Trainer | null;
  portfolios: PortfolioItem[];
  allTrainers?: Trainer[];
  currentUserRole?: 'admin' | 'trainer' | null;
  currentLoggedTrainerId?: string | null;
  onClose: () => void;
  onBookTraining: (programId: string, trainerId: string) => void;
  onUpdateTrainer?: (updatedTrainer: Trainer) => void;
  onUpdatePortfolios?: (updatedPortfolios: PortfolioItem[]) => void;
  feedbacks?: FeedbackItem[];
  onFeedbackTraining?: (programId: string, trainerId: string) => void;
}

export default function TrainerDetailModal({
  trainer,
  portfolios,
  allTrainers = [],
  currentUserRole,
  currentLoggedTrainerId,
  onClose,
  onBookTraining,
  onUpdateTrainer,
  onUpdatePortfolios,
  feedbacks = [],
  onFeedbackTraining
}: TrainerDetailModalProps) {
  if (!trainer) return null;

  const ext = getTrainerExtendedDetails(trainer);

  // Filter portfolio items for this specific trainer
  const trainerPortfolios = portfolios.filter((item) => item.trainerId === trainer.id);

  const [copied, setCopied] = useState(false);
  const [copiedState, setCopiedState] = useState<string | null>(null);

  const handleCopyShareLink = (type: 'register' | 'feedback', programId: string) => {
    const url = `${window.location.origin}${window.location.pathname}?action=${type}&trainerId=${trainer.id}&programId=${programId}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url);
        setCopiedState(`${type}-${programId}`);
        setTimeout(() => setCopiedState(null), 2000);
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        setCopiedState(`${type}-${programId}`);
        setTimeout(() => setCopiedState(null), 2000);
      }
    } catch (e) {
      console.error("Failed to copy link:", e);
    }
  };

  const handleToggleProgramStatus = (courseId: string) => {
    if (onUpdatePortfolios) {
      onUpdatePortfolios(
        portfolios.map(p => {
          if (p.id === courseId) {
            const currentStatus = p.status === 'Selesai' ? 'Aktif' : 'Selesai';
            return {
              ...p,
              status: currentStatus
            };
          }
          return p;
        })
      );
    }
  };

  // Edit Mode state variables
  const canEdit = currentUserRole === 'admin' || (currentUserRole === 'trainer' && currentLoggedTrainerId === trainer.id);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(trainer.name);
  const [editTitle, setEditTitle] = useState(trainer.title);
  const [editBio, setEditBio] = useState(trainer.bio);
  const [editExperience, setEditExperience] = useState(trainer.experience);
  const [editPhone, setEditPhone] = useState(trainer.phone);
  const [editEmail, setEditEmail] = useState(trainer.email);
  const [editCertificationsRaw, setEditCertificationsRaw] = useState(trainer.certifications.join(', '));
  const [editSkillsRaw, setEditSkillsRaw] = useState(trainer.skills.join(', '));
  const [editAvatar, setEditAvatar] = useState(trainer.avatar);
  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // New Fields edit states
  const initialExt = getTrainerExtendedDetails(trainer);
  const [editAcademicRaw, setEditAcademicRaw] = useState(initialExt.academic.join(', '));
  const [editProfessionalRaw, setEditProfessionalRaw] = useState(initialExt.professional.join(', '));
  const [editCompaniesRaw, setEditCompaniesRaw] = useState(initialExt.companies.join(', '));
  const [editTrainingTopicsRaw, setEditTrainingTopicsRaw] = useState(initialExt.topics.join(', '));

  const [lastTrainerId, setLastTrainerId] = useState(trainer.id);
  if (trainer.id !== lastTrainerId) {
    const nextExt = getTrainerExtendedDetails(trainer);
    setLastTrainerId(trainer.id);
    setIsEditing(false);
    setEditName(trainer.name);
    setEditTitle(trainer.title);
    setEditBio(trainer.bio);
    setEditExperience(trainer.experience);
    setEditPhone(trainer.phone);
    setEditEmail(trainer.email);
    setEditCertificationsRaw(trainer.certifications.join(', '));
    setEditSkillsRaw(trainer.skills.join(', '));
    setEditAvatar(trainer.avatar);
    setPendingAvatarFile(null);
    setIsDragging(false);

    // Reset new fields
    setEditAcademicRaw(nextExt.academic.join(', '));
    setEditProfessionalRaw(nextExt.professional.join(', '));
    setEditCompaniesRaw(nextExt.companies.join(', '));
    setEditTrainingTopicsRaw(nextExt.topics.join(', '));
  }

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Sila pilih fail imej sahaja.', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('Sila pilih imej yang bersaiz kurang daripada 5MB.', 'error');
      return;
    }

    setPendingAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setEditAvatar(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const handleSave = async () => {
    if (!editName.trim() || !editTitle.trim() || !editBio.trim() || !editEmail.trim()) {
      showToast('Sila isi maklumat mandatori.', 'error');
      return;
    }

    setIsSavingProfile(true);
    let finalAvatar = editAvatar;
    if (pendingAvatarFile) {
      const publicUrl = await uploadAvatarToStorage(trainer.id, pendingAvatarFile);
      if (publicUrl) {
        finalAvatar = publicUrl;
      } else {
        showToast('Gagal memuat naik gambar. Cuba lagi.', 'error');
        setIsSavingProfile(false);
        return;
      }
    }

    const updatedTrainer: Trainer = {
      ...trainer,
      name: editName.trim(),
      title: editTitle.trim(),
      bio: editBio.trim(),
      experience: editExperience.trim() || '5 Tahun',
      email: editEmail.trim(),
      phone: editPhone.trim() || '+60 12-345 6789',
      certifications: editCertificationsRaw.split(',').map(c => c.trim()).filter(Boolean),
      skills: editSkillsRaw.split(',').map(s => s.trim()).filter(Boolean),
      avatar: finalAvatar,
      academicQualification: editAcademicRaw.split(',').map(a => a.trim()).filter(Boolean),
      professionalQualification: editProfessionalRaw.split(',').map(p => p.trim()).filter(Boolean),
      previousCompanies: editCompaniesRaw.split(',').map(c => c.trim()).filter(Boolean),
      trainingTopics: editTrainingTopicsRaw.split(',').map(t => t.trim()).filter(Boolean)
    };

    if (onUpdateTrainer) {
      onUpdateTrainer(updatedTrainer);
    }
    setPendingAvatarFile(null);
    setIsSavingProfile(false);
    setIsEditing(false);
    showToast('Profil berjaya dikemas kini.', 'success');
  };

  // States for adding/editing portfolio item
  const [editingPortfolioItem, setEditingPortfolioItem] = useState<PortfolioItem | null>(null);
  const [isAddingPortfolio, setIsAddingPortfolio] = useState(false);
  const [portfolioFormOpen, setPortfolioFormOpen] = useState(false);

  // States for sharing QR code
  const [selectedQrCourse, setSelectedQrCourse] = useState<{
    id: string;
    title: string;
    trainerId: string;
    type: 'register' | 'feedback';
  } | null>(null);
  const [qrCopied, setQrCopied] = useState(false);

  // Form fields for portfolio item
  const [portfolioTitle, setPortfolioTitle] = useState('');
  const [portfolioDescription, setPortfolioDescription] = useState('');
  const [portfolioImage, setPortfolioImage] = useState('');
  const [portfolioCategory, setPortfolioCategory] = useState<'safety' | 'technical' | 'soft_skills' | 'management' | 'marketing' | 'finance' | 'business'>('technical');
  const [portfolioDuration, setPortfolioDuration] = useState('2 Hari');
  const [portfolioLevel, setPortfolioLevel] = useState<'Asas' | 'Pertengahan' | 'Lanjutan'>('Asas');
  const [portfolioOutcomesRaw, setPortfolioOutcomesRaw] = useState('');
  const [isPortfolioImageDragging, setIsPortfolioImageDragging] = useState(false);

  const handleOpenAddPortfolio = () => {
    setEditingPortfolioItem(null);
    setIsAddingPortfolio(true);
    setPortfolioTitle('');
    setPortfolioDescription('');
    // Default high quality business/tech image from unsplash
    setPortfolioImage('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600');
    setPortfolioCategory('technical');
    setPortfolioDuration('2 Hari');
    setPortfolioLevel('Asas');
    setPortfolioOutcomesRaw('Kefahaman asas mendalam, Aplikasi kemahiran secara praktikal, Sijil Kehadiran Rasmi');
    setPortfolioFormOpen(true);
  };

  const handleOpenEditPortfolio = (item: PortfolioItem) => {
    setEditingPortfolioItem(item);
    setIsAddingPortfolio(false);
    setPortfolioTitle(item.title);
    setPortfolioDescription(item.description);
    setPortfolioImage(item.image);
    setPortfolioCategory(item.category);
    setPortfolioDuration(item.duration);
    setPortfolioLevel(item.level);
    setPortfolioOutcomesRaw(item.outcomes.join(', '));
    setPortfolioFormOpen(true);
  };

  const processPortfolioImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Sila pilih fail imej sahaja.', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('Sila pilih imej yang bersaiz kurang daripada 5MB.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPortfolioImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePortfolioImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processPortfolioImageFile(file);
    }
  };

  const handlePortfolioImageDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsPortfolioImageDragging(true);
  };

  const handlePortfolioImageDragLeave = () => {
    setIsPortfolioImageDragging(false);
  };

  const handlePortfolioImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsPortfolioImageDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processPortfolioImageFile(file);
    }
  };

  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolioTitle.trim() || !portfolioDescription.trim()) {
      showToast('Sila isi tajuk dan penerangan portfolio.', 'error');
      return;
    }

    const outcomesList = portfolioOutcomesRaw
      .split(',')
      .map(o => o.trim())
      .filter(Boolean);

    if (isAddingPortfolio) {
      const newItem: PortfolioItem = {
        id: `course-${Date.now()}`,
        trainerId: trainer.id,
        trainerName: trainer.name,
        trainerAvatar: trainer.avatar,
        title: portfolioTitle.trim(),
        description: portfolioDescription.trim(),
        image: portfolioImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
        category: portfolioCategory,
        duration: portfolioDuration.trim() || '1 Hari',
        level: portfolioLevel as 'Asas' | 'Pertengahan' | 'Lanjutan',
        outcomes: outcomesList.length > 0 ? outcomesList : ['Pemahaman komprehensif', 'Kemahiran industri praktikal'],
        participantsCount: 0
      };

      if (onUpdatePortfolios) {
        onUpdatePortfolios([...portfolios, newItem]);
      }
    } else if (editingPortfolioItem) {
      const updatedItem: PortfolioItem = {
        ...editingPortfolioItem,
        trainerName: trainer.name,
        trainerAvatar: trainer.avatar,
        title: portfolioTitle.trim(),
        description: portfolioDescription.trim(),
        image: portfolioImage,
        category: portfolioCategory,
        duration: portfolioDuration.trim(),
        level: portfolioLevel as 'Asas' | 'Pertengahan' | 'Lanjutan',
        outcomes: outcomesList
      };

      if (onUpdatePortfolios) {
        onUpdatePortfolios(
          portfolios.map(p => p.id === editingPortfolioItem.id ? updatedItem : p)
        );
      }
    }

    setPortfolioFormOpen(false);
    setEditingPortfolioItem(null);
  };

  const handleDeletePortfolio = async (portfolioId: string) => {
    const confirmDelete = await showConfirm({
      title: 'Padam Program Latihan',
      message: 'Adakah anda pasti mahu memadam program latihan ini? Tindakan ini tidak boleh dibuat asal.',
      confirmLabel: 'Padam',
      cancelLabel: 'Batal',
      variant: 'danger',
    });
    if (confirmDelete && onUpdatePortfolios) {
      onUpdatePortfolios(portfolios.filter(p => p.id !== portfolioId));
      showToast('Program latihan berjaya dipadam.', 'success');
    }
  };

  // Calculate dynamic rank based on rating and projectsCount compared to allTrainers
  let trainerRank: number | null = null;
  if (allTrainers && allTrainers.length > 0) {
    const trainersToRank = allTrainers.map(t => t.id === trainer.id ? trainer : t);
    const sorted = [...trainersToRank].sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.projectsCount - a.projectsCount;
    });
    const foundIdx = sorted.findIndex(t => t.id === trainer.id);
    if (foundIdx !== -1) {
      trainerRank = foundIdx + 1;
    }
  }
  
  let shareUrl = '';
  try {
    shareUrl = `${window.location.origin}${window.location.pathname}?trainerId=${trainer.id}`;
  } catch (e) {
    shareUrl = `?trainerId=${trainer.id}`;
  }

  const handleCopyLink = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for copy when clipboard API is missing or blocked in iframe
        const tempInput = document.createElement('input');
        tempInput.value = shareUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (e) {
      console.error("Failed to copy link:", e);
    }
  };

  const handleDownloadQR = async () => {
    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shareUrl)}&color=18181b&bgcolor=ffffff&qzone=1`;
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `qr-${trainer.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Error downloading QR Code:", err);
      try {
        window.open(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shareUrl)}&color=18181b&bgcolor=ffffff&qzone=1`, '_blank');
      } catch (e) {
        console.warn("window.open is blocked in this environment.", e);
      }
    }
  };

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case 'safety':
        return 'bg-rose-50 text-rose-700 border-rose-200/60';
      case 'technical':
        return 'bg-sky-50 text-sky-700 border-sky-200/60';
      case 'soft_skills':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      default:
        return 'bg-red-50 text-red-700 border-red-200/60';
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'safety':
        return 'Safety & Compliance';
      case 'technical':
        return 'Technical & IT';
      case 'soft_skills':
        return 'Soft Skills';
      default:
        return cat;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md"
          id="modal-backdrop"
        />

        {/* Modal Content Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[94vh] sm:max-h-[90vh] flex flex-col border border-zinc-200/80"
          id="trainer-modal-card"
        >
          {/* Header Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/90 hover:bg-red-600 text-zinc-500 hover:text-white border border-zinc-200/60 transition-all duration-350 z-20 cursor-pointer shadow-sm backdrop-blur-xs"
            aria-label="Close modal"
            id="modal-close-btn"
          >
            <X size={18} />
          </button>

          {/* Scrollable Container */}
          <div className="overflow-y-auto pt-14 pb-6 px-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 custom-scrollbar">
            
            {/* Top Grid: Avatar & Primary Info */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
              
              {/* Left Column: Avatar & Quick Actions */}
              <div className="md:col-span-4 flex flex-col items-center text-center p-4 sm:p-5 bg-zinc-50/50 rounded-xl border border-zinc-200/60 shadow-sm">
                <div 
                  className={`relative w-32 h-32 sm:w-full sm:h-auto sm:aspect-[4/5] mb-4 transition-all duration-300 ${
                    isEditing && isDragging ? 'ring-4 ring-red-500 ring-offset-2 scale-[1.02]' : ''
                  }`}
                  onDragOver={isEditing ? handleDragOver : undefined}
                  onDragLeave={isEditing ? handleDragLeave : undefined}
                  onDrop={isEditing ? handleDrop : undefined}
                >
                  {/* Avatar wrapper with border-radius */}
                  <div className="w-full h-full rounded-full sm:rounded-2xl overflow-hidden border border-zinc-200 shadow-md bg-zinc-100 group relative">
                    <img
                      src={isEditing ? editAvatar : trainer.avatar}
                      alt={trainer.name}
                      className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                      id={`modal-avatar-${trainer.id}`}
                    />
                    
                    {/* Editing mode upload overlay */}
                    {isEditing && (
                      <label 
                        htmlFor="avatar-upload-file-input"
                        className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 cursor-pointer text-white p-4 text-center"
                      >
                        <Camera size={24} className="text-red-400 animate-bounce" />
                        <span className="text-[10px] font-black uppercase tracking-wider">Muat Naik Gambar</span>
                        <span className="text-[8px] text-zinc-350 block leading-tight">atau heret & lepas fail di sini</span>
                        <input
                          type="file"
                          id="avatar-upload-file-input"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    )}

                    {/* Premium overlay gradient */}
                    {!isEditing && <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />}
                  </div>
                  
                  {/* Floating Dynamic Rank Badge over top-left corner */}
                  {trainerRank && (
                    <div className={`absolute -top-1.5 -left-1.5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg border flex items-center gap-1 z-20 ${
                      trainerRank === 1 
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-white border-amber-300' 
                        : trainerRank === 2
                        ? 'bg-gradient-to-r from-zinc-400 to-zinc-300 text-zinc-900 border-zinc-200'
                        : trainerRank === 3
                        ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white border-orange-300'
                        : 'bg-zinc-900 text-white border-zinc-700'
                    }`}>
                      {trainerRank === 1 && <Crown size={11} className="fill-white" />}
                      {trainerRank === 2 && <Trophy size={11} className="fill-zinc-900" />}
                      {trainerRank === 3 && <Medal size={11} className="fill-white" />}
                      <span>Rank #{trainerRank}</span>
                    </div>
                  )}
                </div>
                
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryBadgeColor(trainer.category)} mb-3`}>
                  {getCategoryLabel(trainer.category)}
                </span>

                <div className="flex items-center space-x-1.5 mb-2">
                  <Star className="text-amber-500 fill-amber-500" size={16} />
                  <span className="font-bold text-zinc-900 text-sm">{trainer.rating.toFixed(2)}</span>
                  <span className="text-zinc-400 text-xs">/ 5</span>
                </div>

                {isEditing ? (
                  <div className="w-full space-y-3 pt-3 border-t border-zinc-200 text-left">
                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Pengalaman</label>
                      <input
                        type="text"
                        value={editExperience}
                        onChange={(e) => setEditExperience(e.target.value)}
                        className="w-full p-2 bg-white text-zinc-900 text-xs font-semibold rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/15 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">E-mel Pentadbir / Hubungi</label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full p-2 bg-white text-zinc-900 text-xs font-semibold rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/15 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">No. Telefon</label>
                      <input
                        type="text"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full p-2 bg-white text-zinc-900 text-xs font-semibold rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/15 focus:border-red-500"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-zinc-500 flex items-center space-x-1.5 justify-center mb-4">
                      <Briefcase size={12} className="text-red-500" />
                      <span>Experience: <strong className="text-zinc-800 font-bold">{trainer.experience}</strong></span>
                    </p>

                    {/* Contact Buttons */}
                    <div className="w-full space-y-2 pt-4 border-t border-zinc-200">
                      <a
                        href={`mailto:${trainer.email}`}
                        className="flex items-center justify-center space-x-2 w-full py-2.5 px-3 rounded-lg bg-white hover:bg-red-50 hover:text-red-600 text-zinc-700 text-xs font-semibold border border-zinc-200 hover:border-red-200 transition-colors shadow-sm"
                        id="contact-email-link"
                      >
                        <Mail size={14} className="text-zinc-400" />
                        <span className="truncate">{trainer.email}</span>
                      </a>
                      <a
                        href={`tel:${trainer.phone}`}
                        className="flex items-center justify-center space-x-2 w-full py-2.5 px-3 rounded-lg bg-white hover:bg-red-50 hover:text-red-600 text-zinc-700 text-xs font-semibold border border-zinc-200 hover:border-red-200 transition-colors shadow-sm"
                        id="contact-phone-link"
                      >
                        <Phone size={14} className="text-zinc-400" />
                        <span>{trainer.phone}</span>
                      </a>
                      {(() => {
                        const waMsg = encodeURIComponent(
                          `Assalamualaikum / Selamat Sejahtera,\n\nSaya ingin mendapatkan maklumat lanjut mengenai trainer berikut:\n\n👤 Nama: ${trainer.name}\n🎓 Kepakaran: ${trainer.title}${trainer.tttCertNo ? `\n📋 No. Sijil TTT: ${trainer.tttCertNo}` : ''}\n\nSila bantu saya dengan maklumat penempatan / program latihan. Terima kasih.`
                        );
                        return (
                          <a
                            href={`https://wa.me/60146115723?text=${waMsg}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl text-white text-sm font-extrabold tracking-wide transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                            style={{ backgroundColor: '#25D366', border: '2px solid #1db954' }}
                            id="contact-whatsapp-link"
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1ebe5d')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#25D366')}
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            <span>Hubungi via WhatsApp</span>
                          </a>
                        );
                      })()}
                    </div>
                  </>
                )}

                {/* Social Media Profiles */}
                {trainer.socials && (trainer.socials.linkedin || trainer.socials.twitter) && (
                  <div className="w-full pt-4 border-t border-zinc-200 mt-4">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">Professional Social Profiles</p>
                    <div className="flex gap-2">
                      {trainer.socials.linkedin && (
                        <a
                          href={trainer.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 flex-1 py-2 px-2.5 rounded-lg bg-white hover:bg-blue-50 text-zinc-700 hover:text-blue-600 text-xs font-semibold border border-zinc-200 hover:border-blue-200 transition-all shadow-sm"
                          id="social-linkedin-link"
                          title="Connect on LinkedIn"
                        >
                          <Linkedin size={13} className="shrink-0 text-blue-500" />
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {trainer.socials.twitter && (
                        <a
                          href={trainer.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 flex-1 py-2 px-2.5 rounded-lg bg-white hover:bg-zinc-100 hover:text-zinc-900 text-zinc-700 text-xs font-semibold border border-zinc-200 hover:border-zinc-300 transition-all shadow-sm group"
                          id="social-twitter-link"
                          title="Connect on Twitter/X"
                        >
                          <Twitter size={13} className="shrink-0 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                          <span>Twitter/X</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* HRD Corp Badges */}
                <div className="w-full pt-4 border-t border-zinc-200 mt-4 text-left">
                  <HRDCorpBadges />
                </div>

                {/* Share Profile & QR Code Section */}
                <div className="w-full pt-4 border-t border-zinc-200 mt-4 text-left">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <QrCode size={12} className="text-red-500" />
                    Share Profile
                  </p>
                  
                  <div className="space-y-3">
                    {/* Copy Link Input Group */}
                    <div className="flex items-center gap-1.5 bg-white border border-zinc-200 rounded-lg p-1 shadow-sm">
                      <input
                        type="text"
                        readOnly
                        value={shareUrl}
                        className="bg-transparent text-[11px] text-zinc-500 font-medium px-2 py-1 w-full focus:outline-none select-all truncate"
                      />
                      <button
                        onClick={handleCopyLink}
                        className={`p-1.5 rounded-md text-xs font-bold flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                          copied 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                            : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200 hover:border-zinc-300'
                        }`}
                        title="Copy profile link"
                      >
                        {copied ? <Check size={13} /> : <Copy size={13} />}
                      </button>
                    </div>

                    {/* QR Code Frame */}
                    <div className="flex flex-col items-center justify-center p-3.5 bg-white border border-zinc-200 rounded-xl shadow-sm gap-2">
                      <div className="relative group p-1 bg-white border border-zinc-100 rounded-lg shadow-inner">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareUrl)}&color=18181b&bgcolor=ffffff&qzone=1`}
                          alt="Trainer Profile QR Code"
                          className="w-28 h-28 object-contain"
                          referrerPolicy="no-referrer"
                        />
                        {/* Download button on hover */}
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                          <button
                            onClick={handleDownloadQR}
                            className="p-2 rounded-full bg-white text-zinc-900 hover:bg-red-600 hover:text-white transition-all shadow-md cursor-pointer flex items-center gap-1 text-xs font-bold"
                            title="Download QR Code"
                          >
                            <Download size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-center space-y-0.5 w-full">
                        <span className="text-[10px] text-zinc-400 font-medium block">Scan to view on mobile</span>
                        <button
                          onClick={handleDownloadQR}
                          className="text-[10px] text-red-500 hover:text-red-600 font-extrabold tracking-wide uppercase flex items-center gap-1 justify-center mx-auto hover:underline cursor-pointer"
                        >
                          <Download size={11} /> Save QR Code
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Bio, Certifications, and Skills */}
              <div className="md:col-span-8 space-y-6 text-left">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black text-red-500 uppercase tracking-widest block mb-1">Nama Penuh</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-50 text-zinc-900 font-bold text-lg rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/15 focus:border-red-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-red-500 uppercase tracking-widest block mb-1">Kepakaran Profesional</label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-50 text-red-600 font-semibold text-sm rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/15 focus:border-red-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-red-500 uppercase tracking-widest block mb-1">Pengenalan Bio</label>
                      <textarea
                        rows={4}
                        value={editBio}
                        onChange={(e) => setEditBio(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-50 text-zinc-700 text-xs font-medium rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/15 focus:border-red-500 resize-none leading-relaxed transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-red-500 uppercase tracking-widest block mb-1">Persijilan Profesional (Guna Koma)</label>
                      <input
                        type="text"
                        value={editCertificationsRaw}
                        onChange={(e) => setEditCertificationsRaw(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-50 text-zinc-700 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/15 focus:border-red-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-red-500 uppercase tracking-widest block mb-1">Kepakaran Utama (Guna Koma)</label>
                      <input
                        type="text"
                        value={editSkillsRaw}
                        onChange={(e) => setEditSkillsRaw(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-50 text-zinc-700 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/15 focus:border-red-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-red-500 uppercase tracking-widest block mb-1">Kelayakan Akademik / Academic Qualification (Guna Koma)</label>
                      <input
                        type="text"
                        value={editAcademicRaw}
                        onChange={(e) => setEditAcademicRaw(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-50 text-zinc-700 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/15 focus:border-red-500 transition-all"
                        placeholder="Cth: Sarjana Muda Sains Komputer (UM), Diploma Teknologi Maklumat"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-red-500 uppercase tracking-widest block mb-1">Kelayakan Profesional / Professional Qualification (Guna Koma)</label>
                      <input
                        type="text"
                        value={editProfessionalRaw}
                        onChange={(e) => setEditProfessionalRaw(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-50 text-zinc-700 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/15 focus:border-red-500 transition-all"
                        placeholder="Cth: AWS Certified Solutions Architect, HRD Corp Accredited Trainer"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-red-500 uppercase tracking-widest block mb-1">Syarikat Terdahulu / Previous Companies (Guna Koma)</label>
                      <input
                        type="text"
                        value={editCompaniesRaw}
                        onChange={(e) => setEditCompaniesRaw(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-50 text-zinc-700 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/15 focus:border-red-500 transition-all"
                        placeholder="Cth: Intel Malaysia, Petronas Chemicals, Shell"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-red-500 uppercase tracking-widest block mb-1">Topik Latihan Dikendalikan / Training Topics Conducted (Guna Koma)</label>
                      <textarea
                        rows={3}
                        value={editTrainingTopicsRaw}
                        onChange={(e) => setEditTrainingTopicsRaw(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-50 text-zinc-700 text-xs font-semibold rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/15 focus:border-red-500 resize-none transition-all"
                        placeholder="Cth: Bengkel Rangkaian Siber, Latihan Pematuhan OSHA, Pengurusan Projek Agile"
                      />
                    </div>
                    <div className="flex gap-2.5 pt-2">
                      <button
                        onClick={handleSave}
                        disabled={isSavingProfile}
                        className="px-5 py-2.5 bg-red-600 hover:bg-red-500 disabled:bg-red-400 disabled:cursor-not-allowed text-white font-black text-xs uppercase tracking-widest rounded-full transition-all cursor-pointer flex items-center gap-1.5 shadow-md hover:scale-102"
                      >
                        {isSavingProfile ? (
                          <>
                            <Loader2 size={13} className="animate-spin" />
                            Menyimpan...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={13} />
                            Simpan Profil
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2.5 border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 font-bold text-xs rounded-full transition-all cursor-pointer"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                        <div className="space-y-1.5">
                          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight" id="modal-trainer-name">
                            {trainer.name}
                          </h2>
                          {trainerRank && (
                            <div className="flex flex-wrap gap-1.5">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-full border shadow-sm ${
                                trainerRank === 1 
                                  ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-amber-500/5' 
                                  : trainerRank === 2
                                  ? 'bg-zinc-100 text-zinc-800 border-zinc-200'
                                  : trainerRank === 3
                                  ? 'bg-orange-50 text-orange-700 border-orange-200 shadow-orange-500/5'
                                  : 'bg-red-50 text-red-700 border-red-200 shadow-red-500/5'
                              }`}>
                                {trainerRank === 1 && <Crown size={11} className="fill-amber-500 text-amber-500" />}
                                {trainerRank === 2 && <Trophy size={11} className="fill-zinc-500 text-zinc-500" />}
                                {trainerRank === 3 && <Medal size={11} className="fill-orange-500 text-orange-500" />}
                                Kedudukan #{trainerRank}
                              </span>
                            </div>
                          )}
                        </div>
                        {canEdit && (
                          <div className="flex shrink-0">
                            <button
                              onClick={() => setIsEditing(true)}
                              className="px-3.5 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-102"
                            >
                              <Sparkles size={11} className="text-red-500" />
                              Kemas Kini Profil
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-sm sm:text-md text-red-600 font-bold mt-1">
                        {trainer.title}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                        About Profile
                      </h3>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        {trainer.bio}
                      </p>
                    </div>

                    {/* Core Expertise Tags */}
                    <div>
                      <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Sparkles size={12} className="text-red-400" />
                        Core Expertise
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {trainer.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2.5 py-1 bg-red-50/30 border border-red-100/50 hover:border-red-200 text-red-600 text-xs rounded-lg font-semibold transition-all shadow-4xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Academic & Professional Qualifications Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 pt-1">
                      {/* Academic Qualification */}
                      <div className="p-4 rounded-xl bg-zinc-50/50 border border-zinc-200/60 shadow-3xs hover:border-red-200/50 transition-all duration-300">
                        <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3.5 flex items-center gap-2">
                          <GraduationCap size={15} className="text-red-400 shrink-0" />
                          Academic Qualification
                        </h4>
                        <ul className="space-y-2.5">
                          {ext.academic.map((item, i) => {
                            const { title, year } = parseQualification(item);
                            return (
                              <li key={i} className="text-xs text-zinc-600 font-medium flex items-start gap-2">
                                <span className="w-1 h-1 rounded-full bg-red-400 mt-2 shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <span className="leading-relaxed text-zinc-700 font-semibold">{title}</span>
                                  {year && (
                                    <span className="inline-block ml-2 text-[9px] font-bold text-red-600 bg-red-50/70 px-1.5 py-0.5 rounded-md border border-red-100/40 align-middle">
                                      {year}
                                    </span>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Professional Qualification */}
                      <div className="p-4 rounded-xl bg-zinc-50/50 border border-zinc-200/60 shadow-3xs hover:border-red-200/50 transition-all duration-300">
                        <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3.5 flex items-center gap-2">
                          <Award size={15} className="text-red-400 shrink-0" />
                          Professional Qualification
                        </h4>
                        <ul className="space-y-2.5">
                          {ext.professional.map((item, i) => {
                            const { title, year } = parseQualification(item);
                            return (
                              <li key={i} className="text-xs text-zinc-600 font-medium flex items-start gap-2">
                                <CheckCircle2 size={13} className="text-red-400 shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <span className="leading-relaxed text-zinc-700 font-semibold">{title}</span>
                                  {year && (
                                    <span className="inline-block ml-2 text-[9px] font-bold text-red-600 bg-red-50/70 px-1.5 py-0.5 rounded-md border border-red-100/40 align-middle">
                                      {year}
                                    </span>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>

                    {/* Years of Experience & Previous Companies */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
                      {/* Years of Career Experience */}
                      <div className="p-4 rounded-xl bg-zinc-50/50 border border-zinc-200/60 shadow-3xs hover:border-red-200/50 transition-all duration-300 flex flex-col justify-between">
                        <div>
                          <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Clock size={15} className="text-red-400 shrink-0" />
                            Years of Career Experience
                          </h4>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-3xl font-extrabold text-red-500 tracking-tight">
                              {ext.experience}
                            </span>
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">in the industry</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-zinc-400 font-medium leading-relaxed mt-3 pt-3 border-t border-zinc-200/60">
                          A solid track record in delivering high-impact modules at national and corporate levels.
                        </p>
                      </div>

                      {/* Previous Companies */}
                      <div className="p-4 rounded-xl bg-zinc-50/50 border border-zinc-200/60 shadow-3xs hover:border-red-200/50 transition-all duration-300">
                        <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3.5 flex items-center gap-2">
                          <Building2 size={15} className="text-red-400 shrink-0" />
                          Previous Companies / Clients
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {ext.companies.map((company, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 bg-white border border-zinc-200/80 text-zinc-600 text-[11px] font-medium rounded-lg shadow-4xs hover:border-red-200 hover:text-red-600 transition-all cursor-default"
                            >
                              {company}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Training Topics Conducted */}
                    <div className="p-4 rounded-xl bg-zinc-50/50 border border-zinc-200/60 shadow-3xs hover:border-red-200/50 transition-all duration-300">
                      <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3.5 flex items-center gap-2">
                        <BookOpen size={15} className="text-red-400 shrink-0" />
                        Training Experience / Topics Conducted
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {ext.topics.map((topic, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 bg-white p-2.5 rounded-lg border border-zinc-150 shadow-4xs hover:border-red-100/60 transition-colors"
                          >
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-50/80 text-[10px] font-bold text-red-500 shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span className="text-xs text-zinc-600 font-medium leading-relaxed">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

            </div>



            {/* Bottom Section: Training Programs Offered */}
            <div className="border-t border-zinc-200 pt-6">
              <div className="flex items-center justify-between mb-4.5">
                <h3 className="font-sans text-lg font-extrabold text-zinc-900 flex items-center gap-2">
                  <BookOpen size={18} className="text-red-500" />
                  Training Programs ({trainerPortfolios.length})
                </h3>
                {canEdit && (
                  <button
                    onClick={handleOpenAddPortfolio}
                    className="px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm hover:scale-102 cursor-pointer"
                    id="add-portfolio-btn"
                  >
                    <Plus size={14} className="stroke-[2.5]" />
                    <span>Add Program</span>
                  </button>
                )}
              </div>

              {trainerPortfolios.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-zinc-200 rounded-xl bg-zinc-50">
                  <p className="text-sm text-zinc-500">No training programs are registered at this time.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {trainerPortfolios.map((course) => (
                    <div
                      key={course.id}
                      className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden border border-zinc-200/60 hover:border-red-200/40 shadow-4xs hover:shadow-3xs transition-all duration-300 group/card relative"
                      id={`modal-portfolio-card-${course.id}`}
                    >
                      {/* Image Thumbnail */}
                      <div className="relative w-full sm:w-28 h-24 sm:h-auto bg-zinc-100 shrink-0 overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-zinc-900/85 text-[8px] font-bold text-white shadow-sm uppercase tracking-wide">
                          {course.level === 'Asas' ? 'Beginner' : course.level === 'Pertengahan' ? 'Intermediate' : course.level === 'Lanjutan' ? 'Advanced' : course.level}
                        </div>

                        {/* Edit & Delete Action Overlay on Hover */}
                        {canEdit && (
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-3xs flex items-center justify-center gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                            <button
                              onClick={() => handleOpenEditPortfolio(course)}
                              className="p-1.5 rounded-full bg-white text-zinc-800 hover:bg-red-600 hover:text-white transition-all shadow-md cursor-pointer flex items-center justify-center"
                              title="Edit Program"
                            >
                              <Edit3 size={12} />
                            </button>
                            <button
                              onClick={() => handleDeletePortfolio(course.id)}
                              className="p-1.5 rounded-full bg-white text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-md cursor-pointer flex items-center justify-center"
                              title="Delete Program"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                      
                      {/* Content Area */}
                      <div className="p-3 flex flex-col flex-grow justify-between min-w-0">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[8px] font-extrabold uppercase tracking-widest text-red-500 bg-red-50/85 px-1.5 py-0.5 rounded">
                              {course.category.replace('_', ' ')}
                            </span>

                            {/* Status badge and quick toggle for trainer */}
                            <div className="flex items-center gap-1">
                              {course.status === 'Selesai' ? (
                                <span className="text-[8px] font-semibold uppercase text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                  <CheckCircle2 size={8} className="text-emerald-600" />
                                  Completed
                                </span>
                              ) : (
                                <span className="text-[8px] font-semibold uppercase text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                  <Clock size={8} className="text-amber-500" />
                                  Active
                                </span>
                              )}

                              {canEdit && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleProgramStatus(course.id);
                                  }}
                                  className={`text-[8px] font-bold px-1.5 py-0.5 rounded border cursor-pointer transition-all ${
                                    course.status === 'Selesai'
                                      ? 'bg-zinc-105 hover:bg-zinc-200 text-zinc-700 border-zinc-200'
                                      : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500'
                                  }`}
                                  title="Toggle status"
                                >
                                  {course.status === 'Selesai' ? 'Activate' : 'Complete'}
                                </button>
                              )}
                            </div>
                          </div>
                          <h4 className="font-sans text-xs font-bold text-zinc-900 line-clamp-1 leading-snug group-hover/card:text-red-600 transition-colors">
                            {course.title}
                          </h4>
                          <p className="text-[11px] text-zinc-500 line-clamp-1 leading-normal">
                            {course.description}
                          </p>
                        </div>

                        {/* Footer Actions */}
                        <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center justify-between gap-1.5">
                          <div className="flex items-center gap-1 text-[10px] text-zinc-400 shrink-0">
                            <Clock size={10} className="text-zinc-400" />
                            <span>{course.duration}</span>
                          </div>
                          
                          <div className="flex items-center gap-1 flex-wrap justify-end">
                            {course.status === 'Selesai' ? (
                              <>
                                <button
                                  onClick={() => onFeedbackTraining?.(course.id, trainer.id)}
                                  className="px-2 py-1 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold shadow-xs transition-all cursor-pointer flex items-center gap-0.5 shrink-0"
                                  id={`feedback-btn-${course.id}`}
                                  title="Give Feedback!"
                                >
                                  <MessageSquare size={10} />
                                  <span>Feedback</span>
                                </button>

                                <button
                                  onClick={() => handleCopyShareLink('feedback', course.id)}
                                  className="p-1 rounded-full bg-zinc-50 hover:bg-zinc-150 text-zinc-500 hover:text-rose-600 transition-all cursor-pointer border border-zinc-200/60"
                                  title="Copy Feedback Form Link"
                                >
                                  {copiedState === `feedback-${course.id}` ? (
                                    <Check size={11} className="text-green-600" />
                                  ) : (
                                    <Link2 size={11} />
                                  )}
                                </button>

                                <button
                                  onClick={() => {
                                    setSelectedQrCourse({
                                      id: course.id,
                                      title: course.title,
                                      trainerId: trainer.id,
                                      type: 'feedback'
                                    });
                                    setQrCopied(false);
                                  }}
                                  className="p-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 transition-all cursor-pointer border border-rose-200/60"
                                  title="Show QR Code"
                                >
                                  <QrCode size={11} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => onBookTraining(course.id, trainer.id)}
                                  className="px-2 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold shadow-xs transition-all cursor-pointer flex items-center gap-0.5 shrink-0"
                                  id={`book-btn-${course.id}`}
                                >
                                  <BookOpen size={10} />
                                  <span>Register Session</span>
                                </button>

                                <button
                                  onClick={() => handleCopyShareLink('register', course.id)}
                                  className="p-1 rounded-full bg-zinc-50 hover:bg-zinc-150 text-zinc-500 hover:text-zinc-900 transition-all cursor-pointer border border-zinc-200/60"
                                  title="Copy Session Registration Link"
                                >
                                  {copiedState === `register-${course.id}` ? (
                                    <Check size={11} className="text-green-600" />
                                  ) : (
                                    <Link2 size={11} />
                                  )}
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Comprehensive Participant Reviews & Ratings Section */}
            <div className="border-t border-zinc-200 pt-6">
              <div className="flex items-center justify-between mb-4.5">
                <h3 className="font-sans text-lg font-extrabold text-zinc-900 flex items-center gap-2">
                  <Star size={18} className="text-amber-500 fill-amber-500" />
                  Participant Feedback & Reviews ({feedbacks.filter(f => f.trainerId === trainer.id).length})
                </h3>
              </div>

              {feedbacks.filter(f => f.trainerId === trainer.id).length === 0 ? (
                <div className="p-8 text-center border border-dashed border-zinc-200 rounded-xl bg-zinc-50 space-y-2">
                  <MessageSquare size={28} className="text-zinc-300 mx-auto" />
                  <p className="text-sm font-bold text-zinc-600">No reviews submitted yet</p>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    Registered participants can submit reviews and ratings once the training session is marked as <strong>Completed</strong> by the trainer.
                  </p>
                </div>
              ) : (() => {
                const trainerFeedbacks = feedbacks.filter(f => f.trainerId === trainer.id);
                
                // Calculate metrics
                const avgMaterials = (trainerFeedbacks.reduce((acc, f) => acc + f.ratingMaterials, 0) / trainerFeedbacks.length).toFixed(1);
                const avgTrainer = (trainerFeedbacks.reduce((acc, f) => acc + f.ratingTrainer, 0) / trainerFeedbacks.length).toFixed(1);
                const pctMet = Math.round((trainerFeedbacks.filter(f => f.expectationMet !== 'Tidak Setuju').length / trainerFeedbacks.length) * 100);

                // Star counts breakdown
                const starCounts = [0, 0, 0, 0, 0]; // 1, 2, 3, 4, 5 stars
                trainerFeedbacks.forEach(f => {
                  const ratingIndex = Math.min(Math.max(Math.floor(f.ratingOverall) - 1, 0), 4);
                  starCounts[ratingIndex]++;
                });

                return (
                  <div className="space-y-6">
                    {/* Metrics Dashboard Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-5 bg-zinc-50 border border-zinc-200/80 rounded-2xl">
                      {/* Left Block: Score card */}
                      <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 bg-white border border-zinc-150 rounded-xl shadow-xs">
                        <span className="text-4xl font-black text-zinc-900 leading-none">{trainer.rating.toFixed(2)}</span>
                        <div className="flex items-center gap-0.5 mt-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={14}
                              className={s <= Math.round(trainer.rating) ? 'fill-amber-500 text-amber-500' : 'text-zinc-200'}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mt-1.5">
                          Average Rating ({trainerFeedbacks.length} Reviews)
                        </span>
                      </div>

                      {/* Middle Block: Stars breakdown */}
                      <div className="md:col-span-4 flex flex-col justify-center space-y-1.5 px-2">
                        {[5, 4, 3, 2, 1].map((stars) => {
                          const count = starCounts[stars - 1];
                          const percent = trainerFeedbacks.length > 0 ? Math.round((count / trainerFeedbacks.length) * 100) : 0;
                          return (
                            <div key={stars} className="flex items-center gap-2 text-xs">
                              <span className="w-3 text-right font-bold text-zinc-500 font-mono">{stars}</span>
                              <Star size={10} className="fill-zinc-400 text-zinc-400 shrink-0" />
                              <div className="flex-grow h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                              <span className="w-7 text-right font-medium text-zinc-400 font-mono text-[10px]">{percent}%</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Right Block: Specific Ratings */}
                      <div className="md:col-span-4 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-zinc-200 pt-3.5 md:pt-0 md:pl-5">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-zinc-600">Training Materials:</span>
                            <span className="font-extrabold text-amber-600 font-mono">{avgMaterials} / 5.0</span>
                          </div>
                          <div className="h-1 w-full bg-zinc-200 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(parseFloat(avgMaterials)/5)*100}%` }} />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-zinc-600">Trainer Delivery:</span>
                            <span className="font-extrabold text-amber-600 font-mono">{avgTrainer} / 5.0</span>
                          </div>
                          <div className="h-1 w-full bg-zinc-200 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(parseFloat(avgTrainer)/5)*100}%` }} />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-zinc-600">Meets Expectations:</span>
                            <span className="font-extrabold text-emerald-600 font-mono">{pctMet}%</span>
                          </div>
                          <div className="h-1 w-full bg-zinc-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pctMet}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stream of reviews cards */}
                    <div className="space-y-3.5">
                      {trainerFeedbacks.map((item) => (
                        <div key={item.id} className="p-4 bg-white border border-zinc-200 rounded-xl shadow-xs hover:border-zinc-300 transition-all space-y-3">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            {/* Reviewer info */}
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-700 border border-rose-100 flex items-center justify-center font-black text-xs">
                                {item.participantName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h4 className="text-xs font-black text-zinc-900 leading-tight">{item.participantName}</h4>
                                <span className="text-[10px] text-zinc-400 font-medium block mt-0.5">
                                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                            </div>

                            {/* Ratings pills breakdown */}
                            <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-bold">
                              <span className="bg-amber-50 text-amber-700 border border-amber-200/50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                Overall: {item.ratingOverall}★
                              </span>
                              <span className="bg-zinc-50 text-zinc-600 border border-zinc-200/50 px-1.5 py-0.5 rounded">
                                Materials: {item.ratingMaterials}★
                              </span>
                              <span className="bg-zinc-50 text-zinc-600 border border-zinc-200/50 px-1.5 py-0.5 rounded">
                                Trainer: {item.ratingTrainer}★
                              </span>
                              <span className={`border px-1.5 py-0.5 rounded ${
                                item.expectationMet === 'Sangat Setuju'
                                  ? 'bg-emerald-50 border-emerald-200/50 text-emerald-700'
                                  : item.expectationMet === 'Setuju'
                                  ? 'bg-sky-50 border-sky-200/50 text-sky-700'
                                  : 'bg-amber-50 border-amber-200/50 text-amber-700'
                              }`}>
                                {item.expectationMet === 'Sangat Setuju' ? 'Strongly Agree' : item.expectationMet === 'Setuju' ? 'Agree' : item.expectationMet === 'Tidak Setuju' ? 'Disagree' : item.expectationMet}
                              </span>
                            </div>
                          </div>

                          {/* Training Program target */}
                          <div className="text-[10px] font-bold text-zinc-500 bg-zinc-50 px-2 py-1 rounded border border-zinc-150 inline-block">
                            Course: <span className="text-zinc-800">{item.programTitle}</span>
                          </div>

                          {/* Written Comment text */}
                          {item.comment ? (
                            <p className="text-xs text-zinc-700 leading-relaxed font-sans pl-1 italic">
                              "{item.comment}"
                            </p>
                          ) : (
                            <p className="text-xs text-zinc-400 italic pl-1">No written comment provided.</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

          </div>
        </motion.div>
      </div>

      {/* Embedded Portfolio Editor Overlay Modal */}
      <AnimatePresence>
        {portfolioFormOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Dark glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPortfolioFormOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.45 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-zinc-250 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-zinc-150 bg-zinc-50/50 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-black text-zinc-900 uppercase tracking-wider">
                      {isAddingPortfolio ? 'Register New Training Program' : 'Update Training Program'}
                    </h3>
                    <p className="text-[10px] text-zinc-400 font-bold block uppercase tracking-widest mt-0.5">
                      {trainer.name}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPortfolioFormOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-zinc-200 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSavePortfolio} className="flex-1 overflow-y-auto p-5 space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 block">
                    Course / Program Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Example: Construction Site Safety Course (CIDB)"
                    value={portfolioTitle}
                    onChange={(e) => setPortfolioTitle(e.target.value)}
                    className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all placeholder-zinc-450 font-medium"
                  />
                </div>

                {/* Category & Level */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700 block">
                      Specialty Field <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={portfolioCategory}
                      onChange={(e) => setPortfolioCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all font-semibold"
                    >
                      <option value="safety">General Safety (Safety)</option>
                      <option value="technical">Technical & ICT (Technical)</option>
                      <option value="soft_skills">Self Development (Soft Skills)</option>
                      <option value="management">Organizational Management (Management)</option>
                      <option value="marketing">Marketing & Sales (Marketing)</option>
                      <option value="finance">Finance & Accounts (Finance)</option>
                      <option value="business">Entrepreneurship (Business)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700 block">
                      Learning Level <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={portfolioLevel}
                      onChange={(e) => setPortfolioLevel(e.target.value as any)}
                      className="w-full px-3 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all font-semibold"
                    >
                      <option value="Asas">Beginner</option>
                      <option value="Pertengahan">Intermediate</option>
                      <option value="Lanjutan">Advanced</option>
                    </select>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 block">
                    Training Duration <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Example: 2 Days (9:00 AM - 5:00 PM)"
                    value={portfolioDuration}
                    onChange={(e) => setPortfolioDuration(e.target.value)}
                    className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all font-medium"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 block">
                    Course / Program Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Briefly describe the content and training modules offered in this course..."
                    value={portfolioDescription}
                    onChange={(e) => setPortfolioDescription(e.target.value)}
                    className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all resize-none font-medium leading-relaxed"
                  />
                </div>

                {/* Outcomes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 block">
                    Learning Outcomes (Separate with commas) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Example: CIDB Competency Certificate, OSHA Understanding, Site Safety Rating"
                    value={portfolioOutcomesRaw}
                    onChange={(e) => setPortfolioOutcomesRaw(e.target.value)}
                    className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all font-medium"
                  />
                </div>

                {/* Image Upload/Drag-and-Drop Region */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 block">
                    Course / Program Image <span className="text-rose-500">*</span>
                  </label>
                  <div 
                    className={`relative h-28 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-3 transition-all duration-300 ${
                      isPortfolioImageDragging 
                        ? 'border-red-500 bg-red-50/20' 
                        : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100/50'
                    }`}
                    onDragOver={handlePortfolioImageDragOver}
                    onDragLeave={handlePortfolioImageDragLeave}
                    onDrop={handlePortfolioImageDrop}
                  >
                    {portfolioImage ? (
                      <div className="absolute inset-0 rounded-xl overflow-hidden group">
                        <img 
                          src={portfolioImage} 
                          alt="Pratonton" 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Upload size={18} className="text-white animate-bounce" />
                          <span className="text-[9px] text-white font-black uppercase tracking-wider">Change Image</span>
                          <span className="text-[7px] text-zinc-300">or drag file here</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-1 pointer-events-none">
                        <Image size={24} className="text-zinc-400 mx-auto" />
                        <span className="text-xs text-zinc-600 block font-medium">Drag & drop image file here or click to upload</span>
                        <span className="text-[10px] text-zinc-400 block">Supports PNG, JPG, WEBP up to 5MB</span>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePortfolioImageChange} 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                    />
                  </div>
                </div>

                {/* URL Image Paste Input as secondary option */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                    Or Paste Web Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={portfolioImage.startsWith('data:') ? '' : portfolioImage}
                    onChange={(e) => {
                      if (e.target.value.trim()) {
                        setPortfolioImage(e.target.value.trim());
                      }
                    }}
                    className="w-full px-3 py-1.5 bg-zinc-50 text-zinc-700 rounded-lg border border-zinc-200 text-xs focus:outline-none focus:ring-1 focus:ring-red-500/10 focus:border-red-500 transition-all font-mono"
                  />
                </div>
              </form>

              {/* Actions Footer */}
              <div className="px-5 py-3.5 border-t border-zinc-150 bg-zinc-50 flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setPortfolioFormOpen(false)}
                  className="px-4 py-2 rounded-lg border border-zinc-200 hover:bg-zinc-100 text-zinc-700 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSavePortfolio}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Save size={13} />
                  <span>Save Program</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QR CODE DISPLAY MODAL OVERLAY */}
      <AnimatePresence>
        {selectedQrCourse && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl max-w-md w-full overflow-hidden relative"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-rose-800 to-red-600 p-5 text-white flex items-center justify-between border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <QrCode className="text-rose-300 animate-pulse" size={20} />
                  <div>
                    <h3 className="font-sans font-black text-sm uppercase tracking-wider">
                      Feedback QR Code
                    </h3>
                    <span className="text-[10px] text-rose-200 block font-medium">Scan to complete the feedback form</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedQrCourse(null)}
                  className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                  type="button"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5 text-center">
                {/* Course Banner */}
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-850 text-left space-y-1">
                  <span className="text-[8px] font-extrabold text-rose-400 uppercase tracking-widest block">
                    EVALUATION COURSE
                  </span>
                  <h4 className="text-xs font-bold text-zinc-100 leading-snug">
                    {selectedQrCourse.title}
                  </h4>
                  <p className="text-[10px] text-zinc-500">
                    Lead Trainer: <strong className="text-zinc-350">{trainer.name}</strong>
                  </p>
                </div>

                {/* QR Code Container */}
                <div className="flex flex-col items-center justify-center bg-white p-5 rounded-2xl border border-zinc-800 shadow-inner max-w-[240px] mx-auto space-y-2">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                      `${window.location.origin}${window.location.pathname}?action=${selectedQrCourse.type}&trainerId=${selectedQrCourse.trainerId}&programId=${selectedQrCourse.id}`
                    )}&color=18181b&bgcolor=ffffff&qzone=1`}
                    alt="Feedback QR Code"
                    className="w-44 h-44 object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-wider">
                    Active Evaluation Session
                  </span>
                </div>

                {/* Instructions */}
                <div className="space-y-1 text-center">
                  <p className="text-xs font-bold text-zinc-200">
                    Please scan using your Smartphone
                  </p>
                  <p className="text-[11px] text-zinc-400 max-w-xs mx-auto leading-relaxed">
                    Participants can open their phone camera or QR scanner to complete the evaluation directly on their mobile devices.
                  </p>
                </div>

                {/* Live Link View */}
                <div className="flex items-center gap-1.5 bg-zinc-950/80 border border-zinc-850 rounded-xl p-1 shadow-sm">
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.origin}${window.location.pathname}?action=${selectedQrCourse.type}&trainerId=${selectedQrCourse.trainerId}&programId=${selectedQrCourse.id}`}
                    className="bg-transparent text-[10px] text-zinc-500 font-mono font-medium px-2 py-1 w-full focus:outline-none select-all truncate text-left"
                  />
                  <button
                    onClick={() => {
                      const link = `${window.location.origin}${window.location.pathname}?action=${selectedQrCourse.type}&trainerId=${selectedQrCourse.trainerId}&programId=${selectedQrCourse.id}`;
                      try {
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                          navigator.clipboard.writeText(link);
                          setQrCopied(true);
                          setTimeout(() => setQrCopied(false), 2000);
                        } else {
                          const tempInput = document.createElement('input');
                          tempInput.value = link;
                          document.body.appendChild(tempInput);
                          tempInput.select();
                          document.execCommand('copy');
                          document.body.removeChild(tempInput);
                          setQrCopied(true);
                          setTimeout(() => setQrCopied(false), 2000);
                        }
                      } catch (e) {
                        console.error(e);
                      }
                    }}
                    className={`p-1.5 rounded-lg text-xs font-bold flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      qrCopied 
                        ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/50' 
                        : 'bg-zinc-800 hover:bg-zinc-750 text-zinc-300 border border-zinc-700'
                    }`}
                    title="Copy Link"
                  >
                    {qrCopied ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-zinc-950/50 border-t border-zinc-800 flex items-center justify-between gap-2.5">
                <a
                  href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(
                    `${window.location.origin}${window.location.pathname}?action=${selectedQrCourse.type}&trainerId=${selectedQrCourse.trainerId}&programId=${selectedQrCourse.id}`
                  )}&color=18181b&bgcolor=ffffff&qzone=2`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-zinc-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Download size={13} />
                  <span>Print / Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedQrCourse(null)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold transition-all cursor-pointer shadow-md"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
