import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UserPlus, Info, BookOpen, User, Briefcase, Mail, Phone, Award, ShieldAlert, BadgePlus, Eye, EyeOff, Upload, Image as ImageIcon, Trash2, IdCard, FileCheck, Plus, GripVertical, CreditCard, Check, Crown, Sparkles, ExternalLink, Loader as Loader2 } from 'lucide-react';
import { Trainer, PortfolioItem, CategoryType } from '../types';
import { supabase } from '../lib/supabase';

function ListField({
  label,
  placeholder,
  values,
  onChange,
  hint,
}: {
  label: string;
  placeholder: string;
  values: string[];
  onChange: (vals: string[]) => void;
  hint?: string;
}) {
  const update = (idx: number, val: string) => {
    const next = [...values];
    next[idx] = val;
    onChange(next);
  };
  const add = () => onChange([...values, '']);
  const remove = (idx: number) => {
    if (values.length === 1) {
      onChange(['']);
      return;
    }
    onChange(values.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-zinc-700">{label}</label>
      <div className="space-y-1.5">
        {values.map((val, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <input
              type="text"
              placeholder={placeholder}
              value={val}
              onChange={(e) => update(idx, e.target.value)}
              className="flex-1 px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400"
            />
            <button
              type="button"
              onClick={() => remove(idx)}
              className="p-2 rounded-lg bg-zinc-100 hover:bg-red-50 text-zinc-500 hover:text-red-500 border border-zinc-200 transition-colors cursor-pointer shrink-0"
              aria-label="Buang item"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer transition-colors"
      >
        <Plus size={13} /> Tambah {label.toLowerCase()}
      </button>
      {hint && <span className="text-[10px] text-zinc-500 leading-tight block">{hint}</span>}
    </div>
  );
}


interface AddTrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (trainer: Trainer, portfolio: PortfolioItem) => void;
  specialPlan?: boolean;
}

const CATEGORY_OPTIONS: { value: CategoryType; label: string; desc: string }[] = [
  { value: 'safety', label: 'Safety & Compliance', desc: 'OSHA Certification, Confined Space, First Aid' },
  { value: 'technical', label: 'Technical & IT', desc: 'Cloud, Cybersecurity, Programming, Data Science' },
  { value: 'management', label: 'Leadership & Management', desc: 'Team Building Skills, Corporate Strategy & Agile' },
  { value: 'marketing', label: 'Marketing & Sales', desc: 'Digital Marketing, Sales Skills & Branding' },
  { value: 'finance', label: 'Finance & Investment', desc: 'Tax Planning, Accounting, Audit & Analysis' },
  { value: 'business', label: 'Business & Entrepreneurship', desc: 'Business Design, Startup & Scaleup' },
  { value: 'soft_skills', label: 'Soft Skills & Communication', desc: 'Communication, EQ, Stress Management & EQ' }
];

const AVATAR_PRESETS = {
  safety: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=400',
  technical: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  management: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
  marketing: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  finance: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
  business: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
  soft_skills: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400'
};

const COURSE_IMAGE_PRESETS = {
  safety: 'https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&q=80&w=600',
  technical: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600',
  management: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
  marketing: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
  finance: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600',
  business: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600',
  soft_skills: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600'
};

export default function AddTrainerModal({ isOpen, onClose, onAdd, specialPlan = false }: AddTrainerModalProps) {
  // Form fields: Trainer
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('safety');
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState('5 Tahun');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [icNumber, setIcNumber] = useState('');
  const [tttCertNo, setTttCertNo] = useState('');
  const [certifications, setCertifications] = useState<string[]>(['']);
  const [skills, setSkills] = useState<string[]>(['']);
  const [academicQualification, setAcademicQualification] = useState<string[]>(['']);
  const [professionalQualification, setProfessionalQualification] = useState<string[]>(['']);
  const [previousCompanies, setPreviousCompanies] = useState<string[]>(['']);
  const [trainingTopics, setTrainingTopics] = useState<string[]>(['']);

  // Photo upload state
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form fields: Portfolio Item
  const [courseTitle, setCourseTitle] = useState('');
  const [courseLevel, setCourseLevel] = useState<'Asas' | 'Pertengahan' | 'Lanjutan'>('Asas');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseDuration, setCourseDuration] = useState('2 Hari (16 Jam)');
  const [courseOutcomes, setCourseOutcomes] = useState<string[]>(['']);

  // Tab state
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [agreedTnC, setAgreedTnC] = useState(false);
  const [subscriptionAgreed, setSubscriptionAgreed] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'special'>('standard');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [paymentName, setPaymentName] = useState('');
  const [paymentEmail, setPaymentEmail] = useState('');
  const [paymentPhone, setPaymentPhone] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setAvatarFile(null);
      setAvatarPreview('');
      setUploadError('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError('Sila pilih fail imej yang sah (JPG, PNG, WEBP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Saiz gambar terlalu besar. Maksimum 5MB.');
      return;
    }
    setUploadError('');
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const uploadAvatar = async (trainerId: string): Promise<string> => {
    if (!avatarFile) return AVATAR_PRESETS[category];
    setUploading(true);
    try {
      const ext = avatarFile.name.split('.').pop()?.toLowerCase() || 'jpg';
      const path = `${trainerId}.${ext}`;
      const { error } = await supabase.storage
        .from('trainer-avatars')
        .upload(path, avatarFile, { upsert: true, contentType: avatarFile.type });
      if (error) throw error;
      const { data } = supabase.storage.from('trainer-avatars').getPublicUrl(path);
      return data.publicUrl;
    } catch (err: any) {
      console.error('Avatar upload failed:', err);
      setUploadError('Muat naik gambar gagal. Menggunakan gambar lalai.');
      return AVATAR_PRESETS[category];
    } finally {
      setUploading(false);
    }
  };

  const validate = (): boolean => {
    const errList: string[] = [];
    if (!name.trim()) errList.push('Nama penuh trainer diperlukan.');
    if (!title.trim()) errList.push('Pengkhususan profesional diperlukan.');
    if (!bio.trim()) errList.push('Bio ringkas diperlukan.');
    if (!email.trim() || !email.includes('@')) errList.push('Emel yang sah diperlukan.');
    if (!password.trim()) errList.push('Kata laluan portal diperlukan untuk log masuk.');
    if (!icNumber.trim()) errList.push('No. Kad Pengenalan (IC) diperlukan.');
    if (!tttCertNo.trim()) errList.push('No. Sijil TTT / Sijil Pengecualian diperlukan.');
    if (!agreedTnC) errList.push('Anda perlu bersetuju dengan Terma & Syarat untuk meneruskan.');

    if (activeTab === 2) {
      if (!courseTitle.trim()) errList.push('Tajuk kursus diperlukan.');
      if (!courseDescription.trim()) errList.push('Penerangan kursus diperlukan.');
    }

    setErrors(errList);
    return errList.length === 0;
  };

  const handleNextTab = () => {
    if (validate()) {
      setActiveTab(2);
      setErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const cleanArr = (arr: string[]) => arr.map((s) => s.trim()).filter(Boolean);
    const finalCertifications = cleanArr(certifications).length ? cleanArr(certifications) : ['HRD Corp Certified Specialist'];
    const finalSkills = cleanArr(skills).length ? cleanArr(skills) : ['Communication', 'Problem Solving'];
    const finalAcademic = cleanArr(academicQualification);
    const finalProfessional = cleanArr(professionalQualification);
    const finalCompanies = cleanArr(previousCompanies);
    const finalTrainingTopics = cleanArr(trainingTopics);
    const finalOutcomes = cleanArr(courseOutcomes).length ? cleanArr(courseOutcomes) : ['Acquire core industry understanding', 'Improve daily work efficiency'];

    const trainerId = 't_' + Date.now();
    const portfolioId = 'p_' + Date.now();

    const avatarUrl = await uploadAvatar(trainerId);

    const newTrainer: Trainer = {
      id: trainerId,
      name: name.trim(),
      title: title.trim(),
      category,
      avatar: avatarUrl,
      bio: bio.trim(),
      rating: 4.8,
      experience,
      certifications: finalCertifications,
      skills: finalSkills,
      email: email.trim(),
      phone: phone.trim() || '+60 12-345 6789',
      password: password.trim(),
      icNumber: icNumber.trim(),
      tttCertNo: tttCertNo.trim(),
      featured: false,
      projectsCount: 1,
      academicQualification: finalAcademic,
      professionalQualification: finalProfessional,
      previousCompanies: finalCompanies,
      trainingTopics: finalTrainingTopics,
      subscriptionStatus: 'pending' as const,
      subscriptionPlan: selectedPlan === 'special' ? 'Pelan Khas (1 Bulan Percuma + RM19.90/bulan)' : 'Pelan Trainer RM19.90/bulan',
      subscribedAt: new Date().toISOString(),
    };

    const newPortfolio: PortfolioItem = {
      id: portfolioId,
      trainerId,
      trainerName: name.trim(),
      trainerAvatar: avatarUrl,
      title: courseTitle.trim() || `Professional Certificate: ${category === 'safety' ? 'Safety' : category === 'technical' ? 'Technology' : 'Team Development'} Training`,
      category,
      description: courseDescription.trim() || `Intensive course covering critical elements of ${category === 'safety' ? 'industrial safety' : category === 'technical' ? 'information technology' : 'soft skills'} training.`,
      image: COURSE_IMAGE_PRESETS[category],
      duration: courseDuration,
      level: courseLevel,
      outcomes: finalOutcomes,
      participantsCount: 12
    };

    onAdd(newTrainer, newPortfolio);

    // Reset form after save
    setName(''); setTitle(''); setCategory('safety'); setBio('');
    setExperience('5 Years'); setEmail(''); setPhone(''); setPassword('');
    setIcNumber(''); setTttCertNo('');
    setCertifications(['']); setSkills(['']); setAcademicQualification(['']);
    setProfessionalQualification(['']); setPreviousCompanies(['']); setTrainingTopics(['']);
    setCourseTitle(''); setCourseLevel('Asas'); setCourseDescription('');
    setCourseDuration('2 Hari (16 Jam)'); setCourseOutcomes(['']);
    setAvatarFile(null); setAvatarPreview(''); setUploadError('');
    setActiveTab(0); setErrors([]); setAgreedTnC(false); setSubscriptionAgreed(false); setSelectedPlan('standard');
    setPaymentLoading(false); setPaymentUrl(null); setPaymentError(null); setPaymentInitiated(false);
    setPaymentName(''); setPaymentEmail(''); setPaymentPhone('');
    onClose();
  };

  const handleInitiatePayment = async () => {
    const payErrors: string[] = [];
    if (!paymentName.trim()) payErrors.push('Sila masukkan nama anda.');
    if (!paymentEmail.trim() || !paymentEmail.includes('@')) payErrors.push('Sila masukkan emel yang sah.');
    if (!paymentPhone.trim()) payErrors.push('Sila masukkan nombor telefon.');
    if (!subscriptionAgreed) payErrors.push('Sila setuju dengan terma langganan.');
    if (payErrors.length > 0) { setErrors(payErrors); return; }
    setErrors([]);

    setPaymentLoading(true);
    setPaymentError(null);
    setPaymentUrl(null);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
      const tempId = `TMP-${Date.now()}`;
      const res = await fetch(`${supabaseUrl}/functions/v1/doku-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          trainer_name: paymentName.trim(),
          trainer_email: paymentEmail.trim(),
          trainer_id: tempId,
          plan: selectedPlan,
          amount: selectedPlan === 'special' ? 4990 : 1990,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || `Payment request failed (${res.status})`);
      }

      const data = await res.json();
      if (data.payment_url) {
        setPaymentUrl(data.payment_url);
        setPaymentInitiated(true);
        // Pre-fill profile fields from payment info
        setName(paymentName.trim());
        setEmail(paymentEmail.trim());
        setPhone(paymentPhone.trim());
      } else {
        setPaymentError('URL pembayaran tidak diterima. Sila hubungi admin.');
      }
    } catch (err) {
      setPaymentError((err as Error).message || 'Gagal memulakan pembayaran. Sila hubungi admin.');
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-zinc-900/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white text-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col border border-zinc-200 max-h-[95vh] sm:max-h-[90vh]"
          id="add-trainer-modal-card"
        >
          {/* Header */}
          <div className="bg-zinc-50 border-b border-zinc-200 p-4 sm:p-5 flex items-center justify-between text-zinc-900">
            <div className="flex items-center space-x-2 sm:space-x-2.5">
              <UserPlus className="text-red-500 shrink-0" size={20} />
              <div>
                <h3 className="font-sans text-base sm:text-lg font-bold text-zinc-900 leading-tight">Daftar Trainer & Program Baru</h3>
                <p className="text-[10px] sm:text-xs text-zinc-500">Tambah profil trainer dan kursus pertama mereka</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-zinc-100 hover:bg-red-50 text-zinc-500 hover:text-red-500 border border-zinc-200 transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-zinc-200 bg-zinc-50/50">
            <button
              type="button"
              onClick={() => setActiveTab(0)}
              className={`flex-1 py-2.5 sm:py-3.5 text-center text-xs sm:text-sm font-bold border-b-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 0
                  ? 'border-red-600 text-red-600 bg-white font-extrabold'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100/50'
              }`}
            >
              <CreditCard size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">1. Langganan</span>
              <span className="sm:hidden">1. Langganan</span>
            </button>
            <button
              type="button"
              onClick={() => { if (subscriptionAgreed) setActiveTab(1); }}
              className={`flex-1 py-2.5 sm:py-3.5 text-center text-xs sm:text-sm font-bold border-b-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 1
                  ? 'border-red-600 text-red-600 bg-white font-extrabold'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100/50'
              }`}
              disabled={!subscriptionAgreed}
            >
              <User size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">2. Profil Trainer</span>
              <span className="sm:hidden">2. Profil</span>
            </button>
            <button
              type="button"
              onClick={() => { if (subscriptionAgreed && validate()) setActiveTab(2); }}
              className={`flex-1 py-2.5 sm:py-3.5 text-center text-xs sm:text-sm font-bold border-b-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 2
                  ? 'border-red-600 text-red-600 bg-white font-extrabold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100/50'
              }`}
              disabled={!subscriptionAgreed || !name.trim() || !title.trim()}
            >
              <BookOpen size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">3. Program Kursus</span>
              <span className="sm:hidden">3. Kursus</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 bg-white text-zinc-800 custom-scrollbar">

            {errors.length > 0 && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-start gap-2">
                <ShieldAlert className="text-red-500 shrink-0 mt-0.5" size={16} />
                <div className="space-y-1">
                  <span className="font-bold block">Sila betulkan isu berikut:</span>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {errors.map((err, idx) => (<li key={idx}>{err}</li>))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 0: SUBSCRIPTION */}
            {activeTab === 0 && (
              <div className="space-y-5">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg">
                    <Crown size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900">Langganan Trainer</h3>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    Untuk mendaftar sebagai trainer di platform Trainerpreneur, anda perlu melanggan pelan bulanan berikut.
                  </p>
                </div>

                <div className={`grid gap-3 ${specialPlan ? 'sm:grid-cols-2' : ''}`}>
                  {/* Standard Plan */}
                  <div className={`relative border-2 rounded-2xl p-5 transition-all cursor-pointer ${
                    selectedPlan === 'standard' && subscriptionAgreed
                      ? 'border-teal-500 bg-teal-50/50 shadow-lg shadow-teal-100'
                      : selectedPlan === 'standard'
                        ? 'border-teal-300 bg-teal-50/30'
                        : 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md'
                  }`}
                  onClick={() => { setSelectedPlan('standard'); setSubscriptionAgreed(false); }}
                  >
                    {selectedPlan === 'standard' && subscriptionAgreed && (
                      <div className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center shadow-md">
                        <Check size={14} className="text-white" />
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles size={16} className="text-amber-500" />
                          <span className="text-sm font-bold text-zinc-900">Pelan Trainer</span>
                        </div>
                        <p className="text-xs text-zinc-500">Akses penuh ke platform</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-extrabold text-zinc-900">RM19<span className="text-base">.90</span></div>
                        <span className="text-xs text-zinc-400 font-medium">/bulan</span>
                      </div>
                    </div>

                    <div className="border-t border-zinc-100 pt-3 space-y-2">
                      {['Profil trainer tersenarai di direktori utama', 'Paparkan kursus & program latihan anda', 'Terima pendaftaran peserta secara online', 'Dashboard analitik & laporan maklum balas', 'Sijil HRD Corp Claimable dipaparkan', 'QR code untuk feedback peserta'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-4.5 h-4.5 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                            <Check size={9} className="text-teal-600" />
                          </div>
                          <span className="text-xs text-zinc-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Special Plan - only when accessed via special link */}
                  {specialPlan && (
                    <div className={`relative border-2 rounded-2xl p-5 transition-all cursor-pointer ${
                      selectedPlan === 'special' && subscriptionAgreed
                        ? 'border-amber-500 bg-amber-50/50 shadow-lg shadow-amber-100'
                        : selectedPlan === 'special'
                          ? 'border-amber-300 bg-amber-50/30'
                          : 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md'
                    }`}
                    onClick={() => { setSelectedPlan('special'); setSubscriptionAgreed(false); }}
                    >
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold rounded-full shadow-md uppercase tracking-wider">
                        Tawaran Khas
                      </div>

                      {selectedPlan === 'special' && subscriptionAgreed && (
                        <div className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-md">
                          <Check size={14} className="text-white" />
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-4 mt-1">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Crown size={16} className="text-amber-500" />
                            <span className="text-sm font-bold text-zinc-900">Pelan Khas</span>
                          </div>
                          <p className="text-xs text-zinc-500">Akses penuh + 1 bulan PERCUMA</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-extrabold text-zinc-900">RM19<span className="text-base">.90</span></div>
                          <span className="text-xs text-zinc-400 font-medium">/bulan</span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg px-3 py-2 mb-3 border border-amber-200">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
                            <Sparkles size={12} className="text-white" />
                          </div>
                          <span className="text-xs font-bold text-amber-900">1 Bulan Pertama PERCUMA!</span>
                        </div>
                        <p className="text-[10px] text-amber-700 mt-1 ml-8">Bayaran bermula bulan ke-2 sahaja</p>
                      </div>

                      <div className="border-t border-zinc-100 pt-3 space-y-2">
                        {['Semua manfaat Pelan Trainer', '1 bulan pertama percuma', 'Paparkan kursus & program latihan', 'Dashboard analitik & maklum balas', 'Sijil HRD Corp Claimable dipaparkan', 'QR code untuk feedback peserta'].map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 ${i === 1 ? 'bg-amber-100' : 'bg-teal-100'}`}>
                              <Check size={9} className={i === 1 ? 'text-amber-600' : 'text-teal-600'} />
                            </div>
                            <span className={`text-xs ${i === 1 ? 'text-amber-800 font-bold' : 'text-zinc-700'}`}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Basic contact info for payment */}
                <div className="space-y-3 bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                  <p className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                    <User size={13} /> Maklumat Asas untuk Pembayaran
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-600 mb-1 block">Nama Penuh *</label>
                      <input type="text" value={paymentName} onChange={(e) => setPaymentName(e.target.value)}
                        placeholder="Nama penuh anda"
                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none transition-all bg-white" />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-600 mb-1 block">Emel *</label>
                      <input type="email" value={paymentEmail} onChange={(e) => setPaymentEmail(e.target.value)}
                        placeholder="emel@contoh.com"
                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none transition-all bg-white" />
                    </div>
                  </div>
                  <div className="sm:w-1/2">
                    <label className="text-[11px] font-semibold text-zinc-600 mb-1 block">No. Telefon *</label>
                    <input type="tel" value={paymentPhone} onChange={(e) => setPaymentPhone(e.target.value)}
                      placeholder="012-3456789"
                      className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none transition-all bg-white" />
                  </div>
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer group" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={subscriptionAgreed}
                    onChange={(e) => setSubscriptionAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-zinc-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                  />
                  <span className="text-xs text-zinc-600 group-hover:text-zinc-800 transition-colors">
                    {selectedPlan === 'special'
                      ? <>Saya bersetuju untuk melanggan <strong className="text-zinc-900">Pelan Khas</strong> dengan 1 bulan percuma dan kadar <strong className="text-zinc-900">RM19.90/bulan</strong> bermula bulan ke-2.</>
                      : <>Saya bersetuju untuk melanggan pelan Trainer pada kadar <strong className="text-zinc-900">RM19.90/bulan</strong> dan memahami bahawa pembayaran akan diproses selepas pendaftaran.</>
                    }
                  </span>
                </label>
              </div>
            )}

            {/* TAB 1: TRAINER DETAILS */}
            {activeTab === 1 && (
              <div className="space-y-4">
                {/* Profile Photo Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1">
                    <ImageIcon size={12} /> Gambar Profil Trainer
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Preview" className="w-20 h-20 rounded-2xl object-cover border-2 border-zinc-200 shadow-sm" />
                      ) : (
                        <div className="w-20 h-20 rounded-2xl bg-zinc-100 border-2 border-dashed border-zinc-300 flex items-center justify-center text-zinc-400">
                          <User size={28} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Upload size={13} /> Pilih Gambar
                        </button>
                        {avatarPreview && (
                          <button
                            type="button"
                            onClick={() => { setAvatarFile(null); setAvatarPreview(''); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                            className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-600 text-xs font-bold border border-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Trash2 size={13} /> Buang
                          </button>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-500 leading-tight block">
                        JPG, PNG atau WEBP. Maksimum 5MB. Jika kosong, gambar lalai akan digunakan berdasarkan kategori.
                      </span>
                    </div>
                  </div>
                  {uploadError && (
                    <div className="text-[11px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-2.5 py-1.5">{uploadError}</div>
                  )}
                  {uploading && (
                    <div className="text-[11px] text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-3 h-3 border-2 border-amber-500 border-t-transparent rounded-full" />
                      Memuat naik gambar...
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1">
                      Nama Penuh <span className="text-rose-500">*</span>
                    </label>
                    <input type="text" placeholder="Cth: Mohd Syamil Bin Amin" value={name} onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">
                      Pengkhususan Profesional <span className="text-rose-500">*</span>
                    </label>
                    <input type="text" placeholder="Cth: Pakar Keselamatan Kimia Industri" value={title} onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400" required />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700">Kategori Trainer</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {CATEGORY_OPTIONS.map((opt) => (
                      <button key={opt.value} type="button" onClick={() => setCategory(opt.value)}
                        className={`p-2.5 sm:p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                          category === opt.value
                            ? 'border-red-500 bg-red-50 text-red-700 shadow-sm'
                            : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:bg-zinc-100'
                        }`}>
                        <span className={`text-[10px] sm:text-xs font-black leading-tight ${category === opt.value ? 'text-red-700' : 'text-zinc-800'}`}>{opt.label}</span>
                        <span className={`text-[8px] sm:text-[10px] leading-tight mt-1 ${category === opt.value ? 'text-red-600/80' : 'text-zinc-500'}`}>{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700">
                    Bio Ringkas <span className="text-rose-500">*</span>
                  </label>
                  <textarea rows={3} placeholder="Ringkasan pengalaman trainer dan kekuatan industri..." value={bio} onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400 resize-none" required />
                </div>

                {/* IC + TTT Cert - the important new fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1">
                      <IdCard size={12} /> No. Kad Pengenalan (IC) <span className="text-rose-500">*</span>
                    </label>
                    <input type="text" placeholder="Cth: 850214-14-5678" value={icNumber} onChange={(e) => setIcNumber(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400 font-mono" required />
                    <span className="text-[10px] text-zinc-500 leading-tight block">Format: YYMMDD-XX-XXXX. Diperlukan untuk pendaftaran HRD Corp.</span>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1">
                      <FileCheck size={12} /> No. Sijil TTT / Sijil Pengecualian <span className="text-rose-500">*</span>
                    </label>
                    <input type="text" placeholder="Cth: TTT-2024-00123 atau EXEM-2023-00456" value={tttCertNo} onChange={(e) => setTttCertNo(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400 font-mono" required />
                    <span className="text-[10px] text-zinc-500 leading-tight block">Sijil Train-The-Trainer atau surat pengecualian dari HRD Corp.</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">Tahun Pengalaman</label>
                    <input type="text" placeholder="Cth: 6 Tahun" value={experience} onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">No. Telefon</label>
                    <input type="text" placeholder="Cth: +60 12-776 5432" value={phone} onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">
                      Emel Hubungan <span className="text-rose-500">*</span>
                    </label>
                    <input type="email" placeholder="Cth: syamil@domain.com" value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">
                      Kata Laluan Portal <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} placeholder="Kata laluan untuk log masuk" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-3.5 pr-10 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400 font-mono" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer" tabIndex={-1}>
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ListField
                    label="Sijilan & Akreditasi"
                    placeholder="OSHA Certificate, HRD Corp Certified..."
                    values={certifications}
                    onChange={setCertifications}
                    hint="Kelayakan profesional diiktiraf oleh kementerian atau agensi."
                  />
                  <ListField
                    label="Senarai Kemahiran"
                    placeholder="HIRARC Risk Assessment, CPR, Corporate Strategy..."
                    values={skills}
                    onChange={setSkills}
                    hint="Tag sub-pengkhususan dipaparkan dalam modul resume."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ListField
                    label="Kelayakan Akademik"
                    placeholder="Sarjana Muda Sains Komputer (UM)..."
                    values={academicQualification}
                    onChange={setAcademicQualification}
                  />
                  <ListField
                    label="Kelayakan Profesional"
                    placeholder="AWS Certified Solutions Architect..."
                    values={professionalQualification}
                    onChange={setProfessionalQualification}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ListField
                    label="Syarikat Terdahulu"
                    placeholder="Petronas Chemicals, Intel Malaysia..."
                    values={previousCompanies}
                    onChange={setPreviousCompanies}
                  />
                  <ListField
                    label="Topik Latihan Dijalankan"
                    placeholder="OSHA Compliance Training, Agile Project Management..."
                    values={trainingTopics}
                    onChange={setTrainingTopics}
                  />
                </div>

                {/* Terms & Conditions */}
                <div className={`mt-4 p-4 rounded-xl border transition-colors ${
                  agreedTnC ? 'bg-green-50 border-green-200' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <div className="mb-3">
                    <h4 className="text-xs font-bold text-zinc-800 mb-1.5">Terma & Syarat Pendaftaran Trainer</h4>
                    <div className="text-[11px] text-zinc-600 leading-relaxed space-y-1.5 max-h-28 overflow-y-auto pr-2 [scrollbar-width:thin] [scrollbar-color:#d4d4d8_transparent]">
                      <p>1. Saya mengesahkan bahawa semua maklumat yang diberikan adalah benar dan tepat. Sebarang maklumat palsu boleh menyebabkan pembatalan pendaftaran.</p>
                      <p>2. Saya bersetuju untuk mematuhi semua garis panduan dan polisi yang ditetapkan oleh LQ Training Centre dan HRD Corp berkaitan pengendalian program latihan.</p>
                      <p>3. Saya memahami bahawa pihak LQ Training Centre berhak untuk menolak atau membatalkan pendaftaran saya jika didapati melanggar mana-mana syarat yang dinyatakan.</p>
                      <p>4. Saya memberi kebenaran kepada LQ Training Centre untuk menggunakan maklumat profil saya bagi tujuan pemasaran program latihan yang berkaitan.</p>
                      <p>5. Saya memahami bahawa bayaran komisen dan terma kerjasama akan tertakluk kepada perjanjian berasingan yang akan ditandatangani selepas kelulusan pendaftaran.</p>
                    </div>
                  </div>
                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreedTnC}
                      onChange={(e) => setAgreedTnC(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-zinc-300 text-red-600 focus:ring-red-500 accent-red-600 cursor-pointer shrink-0"
                    />
                    <span className="text-xs text-zinc-700 leading-relaxed group-hover:text-zinc-900 transition-colors">
                      Saya telah membaca dan <strong className="text-red-600">bersetuju dengan Terma & Syarat</strong> pendaftaran trainer di atas.
                      <span className="text-rose-500 ml-0.5">*</span>
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* TAB 2: COURSE */}
            {activeTab === 2 && (
              <div className="space-y-4">
                <div className="bg-zinc-50 border border-zinc-200 p-3.5 rounded-xl flex items-start gap-2.5 shadow-sm">
                  <BookOpen className="text-red-500 mt-0.5 shrink-0" size={18} />
                  <div className="text-xs">
                    <strong className="text-zinc-800 block font-bold mb-0.5">Bina Program Latihan Pertama</strong>
                    <span className="text-zinc-600 leading-relaxed">
                      Grid bento memerlukan sekurang-kurangnya satu program latihan dikaitkan dengan trainer untuk melengkapkan paparan galeri visual.
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-8 space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">
                      Tajuk Kursus / Program Latihan <span className="text-rose-500">*</span>
                    </label>
                    <input type="text" placeholder="Cth: Sijil Amali Kerja Selamat di Ruang Terkurung" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400" required />
                  </div>
                  <div className="md:col-span-4 space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">Tahap Sesi Latihan</label>
                    <select value={courseLevel} onChange={(e) => setCourseLevel(e.target.value as any)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 [&>option]:bg-white [&>option]:text-zinc-900">
                      <option value="Asas">Asas</option>
                      <option value="Pertengahan">Pertengahan</option>
                      <option value="Lanjutan">Lanjutan</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700">
                    Penerangan Latihan Penuh <span className="text-rose-500">*</span>
                  </label>
                  <textarea rows={3} placeholder="Terangkan silibus, kaedah penilaian, amalan hands-on, dan khalayak sasaran..." value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)}
                    className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400 resize-none" required />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700">Tempoh</label>
                  <input type="text" placeholder="Cth: 2 Hari (16 Jam)" value={courseDuration} onChange={(e) => setCourseDuration(e.target.value)}
                    className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400" />
                </div>

                <ListField
                  label="Objektif / Hasil Pembelajaran"
                  placeholder="Boleh mengurus keselamatan gas, Mahir penyelamatan kecemasan..."
                  values={courseOutcomes}
                  onChange={setCourseOutcomes}
                />
              </div>
            )}
          </form>

          {/* Payment overlay — shows on Tab 0 when payment is processing */}
          {(paymentLoading || paymentUrl || (paymentError && !paymentInitiated)) && (
            <div className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center p-8 text-center rounded-2xl">
              {paymentLoading && (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-5 shadow-lg animate-pulse">
                    <CreditCard size={32} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">Menyediakan Pembayaran...</h3>
                  <p className="text-sm text-zinc-500 max-w-xs">Sila tunggu sebentar. Kami sedang menghubungkan anda ke halaman pembayaran DOKU.</p>
                  <Loader2 size={24} className="text-amber-500 mt-5 animate-spin" />
                </>
              )}

              {paymentUrl && (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-5 shadow-lg">
                    <Check size={32} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">Sedia untuk Pembayaran!</h3>
                  <p className="text-sm text-zinc-500 max-w-xs mb-6">
                    Sila selesaikan pembayaran di halaman DOKU. Selepas bayar, teruskan ke langkah seterusnya untuk melengkapkan profil anda.
                  </p>
                  <a
                    href={paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-bold shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <CreditCard size={16} />
                    Bayar di DOKU
                    <ExternalLink size={14} />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentUrl(null);
                      setActiveTab(1);
                    }}
                    className="mt-5 px-5 py-2 rounded-full bg-zinc-800 hover:bg-zinc-900 text-white text-sm font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    Teruskan ke Profil →
                  </button>
                  <p className="mt-3 text-[11px] text-zinc-400">Anda boleh bayar dahulu, kemudian lengkapkan profil.</p>
                </>
              )}

              {paymentError && !paymentUrl && !paymentLoading && (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mb-5 shadow-lg">
                    <ShieldAlert size={32} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">Pembayaran Gagal</h3>
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 max-w-xs">
                    <p className="text-xs text-red-800">{paymentError}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setPaymentError(null); }}
                    className="px-5 py-2 rounded-full bg-zinc-800 hover:bg-zinc-900 text-white text-sm font-bold shadow-md transition-all cursor-pointer"
                  >
                    Cuba Lagi
                  </button>
                </>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-zinc-200 bg-zinc-50 p-4 flex items-center justify-between">
            {activeTab === 0 ? (
              <>
                <div className="text-xs text-zinc-500">
                  {paymentInitiated ? 'Pembayaran telah dimulakan.' : 'Isi maklumat & bayar untuk meneruskan.'}
                </div>
                {paymentInitiated ? (
                  <button type="button" onClick={() => setActiveTab(1)}
                    className="px-5 py-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md transition-all duration-300 cursor-pointer"
                    id="next-step-btn">
                    Teruskan ke Profil →
                  </button>
                ) : (
                  <button type="button" onClick={handleInitiatePayment}
                    disabled={!subscriptionAgreed || paymentLoading}
                    className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-md transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                    id="next-step-btn">
                    <CreditCard size={15} />
                    Bayar Sekarang
                  </button>
                )}
              </>
            ) : activeTab === 1 ? (
              <>
                <button type="button" onClick={() => setActiveTab(0)}
                  className="px-4 py-2 rounded-full border border-zinc-200 text-zinc-700 hover:bg-zinc-100 text-sm font-bold transition-all cursor-pointer bg-white shadow-sm">
                  ← Langganan
                </button>
                <button type="button" onClick={handleNextTab}
                  className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-md transition-all duration-300 cursor-pointer"
                  id="next-step-btn">
                  Seterusnya: Program →
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={() => setActiveTab(1)}
                  className="px-4 py-2 rounded-full border border-zinc-200 text-zinc-700 hover:bg-zinc-100 text-sm font-bold transition-all cursor-pointer bg-white shadow-sm"
                  id="back-step-btn">
                  ← Edit Profil
                </button>
                <button type="button" onClick={handleSubmit} disabled={uploading}
                  className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-lg transition-all duration-300 flex items-center gap-1.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  id="submit-form-btn">
                  <BadgePlus size={16} />
                  {uploading ? 'Memuat Naik...' : 'Simpan Trainer & Program'}
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
