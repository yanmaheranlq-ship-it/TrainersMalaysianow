import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, UserPlus, Info, BookOpen, User, Briefcase, Mail, Phone, Award, ShieldAlert, BadgePlus, Eye, EyeOff } from 'lucide-react';
import { Trainer, PortfolioItem, CategoryType } from '../types';

interface AddTrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (trainer: Trainer, portfolio: PortfolioItem) => void;
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

// Aesthetic presets based on category selection
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

export default function AddTrainerModal({ isOpen, onClose, onAdd }: AddTrainerModalProps) {
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
  const [certificationsRaw, setCertificationsRaw] = useState('');
  const [skillsRaw, setSkillsRaw] = useState('');
  const [academicRaw, setAcademicRaw] = useState('');
  const [professionalRaw, setProfessionalRaw] = useState('');
  const [companiesRaw, setCompaniesRaw] = useState('');
  const [trainingTopicsRaw, setTrainingTopicsRaw] = useState('');

  // Form fields: Portfolio Item
  const [courseTitle, setCourseTitle] = useState('');
  const [courseLevel, setCourseLevel] = useState<'Asas' | 'Pertengahan' | 'Lanjutan'>('Asas');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseDuration, setCourseDuration] = useState('2 Hari (16 Jam)');
  const [courseOutcomesRaw, setCourseOutcomesRaw] = useState('');

  // Tab state: 1 - Trainer Bio, 2 - Portfolio Item
  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<string[]>([]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errList: string[] = [];
    if (!name.trim()) errList.push('Trainer full name is required.');
    if (!title.trim()) errList.push('Trainer professional specialty is required.');
    if (!bio.trim()) errList.push('A short profile bio introduction is required.');
    if (!email.trim() || !email.includes('@')) errList.push('A valid email address is required.');
    if (!password.trim()) errList.push('A portal password is required for login purposes.');
    
    if (activeTab === 2) {
      if (!courseTitle.trim()) errList.push('Training course title is required.');
      if (!courseDescription.trim()) errList.push('Training course description is required.');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Split text inputs by comma
    const certifications = certificationsRaw
      ? certificationsRaw.split(',').map((c) => c.trim()).filter(Boolean)
      : ['HRD Corp Certified Specialist'];

    const skills = skillsRaw
      ? skillsRaw.split(',').map((s) => s.trim()).filter(Boolean)
      : ['Communication', 'Problem Solving'];

    const academicQualification = academicRaw
      ? academicRaw.split(',').map((a) => a.trim()).filter(Boolean)
      : [];

    const professionalQualification = professionalRaw
      ? professionalRaw.split(',').map((p) => p.trim()).filter(Boolean)
      : [];

    const previousCompanies = companiesRaw
      ? companiesRaw.split(',').map((c) => c.trim()).filter(Boolean)
      : [];

    const trainingTopics = trainingTopicsRaw
      ? trainingTopicsRaw.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const outcomes = courseOutcomesRaw
      ? courseOutcomesRaw.split(',').map((o) => o.trim()).filter(Boolean)
      : ['Acquire core industry understanding', 'Improve daily work efficiency'];

    const trainerId = 't_' + Date.now();
    const portfolioId = 'p_' + Date.now();

    const newTrainer: Trainer = {
      id: trainerId,
      name: name.trim(),
      title: title.trim(),
      category,
      avatar: AVATAR_PRESETS[category],
      bio: bio.trim(),
      rating: 4.8, // Default high rating for new entry
      experience,
      certifications,
      skills,
      email: email.trim(),
      phone: phone.trim() || '+60 12-345 6789',
      password: password.trim(),
      featured: false,
      projectsCount: 1,
      academicQualification,
      professionalQualification,
      previousCompanies,
      trainingTopics
    };

    const newPortfolio: PortfolioItem = {
      id: portfolioId,
      trainerId,
      trainerName: name.trim(),
      trainerAvatar: AVATAR_PRESETS[category],
      title: courseTitle.trim() || `Professional Certificate: ${category === 'safety' ? 'Safety' : category === 'technical' ? 'Technology' : 'Team Development'} Training`,
      category,
      description: courseDescription.trim() || `Intensive course covering critical elements of ${category === 'safety' ? 'industrial safety' : category === 'technical' ? 'information technology' : 'soft skills'} training.`,
      image: COURSE_IMAGE_PRESETS[category],
      duration: courseDuration,
      level: courseLevel,
      outcomes,
      participantsCount: 12
    };

    onAdd(newTrainer, newPortfolio);

    // Reset Form
    setName('');
    setTitle('');
    setCategory('safety');
    setBio('');
    setExperience('5 Years');
    setEmail('');
    setPhone('');
    setPassword('');
    setCertificationsRaw('');
    setSkillsRaw('');
    setAcademicRaw('');
    setProfessionalRaw('');
    setCompaniesRaw('');
    setTrainingTopicsRaw('');
    setCourseTitle('');
    setCourseLevel('Asas');
    setCourseDescription('');
    setCourseDuration('2 Hari (16 Jam)');
    setCourseOutcomesRaw('');
    setActiveTab(1);
    setErrors([]);
    onClose();
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
          className="fixed inset-0 bg-zinc-900/60 backdrop-blur-md"
        />

        {/* Modal body */}
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
                <h3 className="font-sans text-base sm:text-lg font-bold text-zinc-900 leading-tight">Register New Trainer & Program</h3>
                <p className="text-[10px] sm:text-xs text-zinc-500">Add trainer profile and their first course</p>
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

          {/* Form Tabs Navigation */}
          <div className="flex border-b border-zinc-200 bg-zinc-50/50">
            <button
              type="button"
              onClick={() => setActiveTab(1)}
              className={`flex-1 py-2.5 sm:py-3.5 text-center text-xs sm:text-sm font-bold border-b-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 1
                  ? 'border-red-600 text-red-600 bg-white font-extrabold'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100/50'
              }`}
            >
              <User size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">1. Trainer Profile</span>
              <span className="sm:hidden">1. Profile</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (validate()) setActiveTab(2);
              }}
              className={`flex-1 py-2.5 sm:py-3.5 text-center text-xs sm:text-sm font-bold border-b-2 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 2
                  ? 'border-red-600 text-red-600 bg-white font-extrabold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100/50'
              }`}
              disabled={!name.trim() || !title.trim()}
            >
              <BookOpen size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">2. First Course Program</span>
              <span className="sm:hidden">2. Course</span>
            </button>
          </div>

          {/* Form container */}
          <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 bg-white text-zinc-800 custom-scrollbar">
            
            {/* Display validation errors */}
            {errors.length > 0 && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-start gap-2">
                <ShieldAlert className="text-red-500 shrink-0 mt-0.5" size={16} />
                <div className="space-y-1">
                  <span className="font-bold block">Please correct the following issues:</span>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {errors.map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 1: TRAINER DETAILS */}
            {activeTab === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Example: Mohd Syamil Bin Amin"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400"
                      required
                    />
                  </div>

                  {/* Title */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">
                      Professional Specialty <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Example: Industrial Chemical Safety Expert"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400"
                      required
                    />
                  </div>
                </div>

                {/* Category selectors */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700">Trainer Category Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {CATEGORY_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setCategory(opt.value)}
                        className={`p-2.5 sm:p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                          category === opt.value
                            ? 'border-red-500 bg-red-50 text-red-700 shadow-sm'
                            : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:bg-zinc-100'
                        }`}
                      >
                        <span className={`text-[10px] sm:text-xs font-black leading-tight ${category === opt.value ? 'text-red-700' : 'text-zinc-800'}`}>{opt.label}</span>
                        <span className={`text-[8px] sm:text-[10px] leading-tight mt-1 ${category === opt.value ? 'text-red-600/80' : 'text-zinc-500'}`}>{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bio / Profile */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700">
                    Brief Profile Introduction (Bio) <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter a summary of this trainer's experience and industry strengths..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400 resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Experience */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">Years of Experience</label>
                    <input
                      type="text"
                      placeholder="Example: 6 Years"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">Phone Number</label>
                    <input
                      type="text"
                      placeholder="Example: +60 12-776 5432"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">
                      Contact Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Example: syamil@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">
                      Portal Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Please enter a password for login"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-3.5 pr-10 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400 font-mono"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Certifications comma-separated */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1">
                        Certifications & Accreditations (Separate with commas)
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="OSHA Certificate, HRD Corp Certified, First Aid Trainer"
                      value={certificationsRaw}
                      onChange={(e) => setCertificationsRaw(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400"
                    />
                    <span className="text-[10px] text-zinc-500 leading-tight block">Professional qualification papers recognized by ministries or regulatory agencies.</span>
                  </div>

                  {/* Skills comma-separated */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">
                      List of Core Expertise (Separate with commas)
                    </label>
                    <input
                      type="text"
                      placeholder="HIRARC Risk Assessment, CPR, Corporate Strategy"
                      value={skillsRaw}
                      onChange={(e) => setSkillsRaw(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400"
                    />
                    <span className="text-[10px] text-zinc-500 leading-tight block">Sub-specialty tags displayed in the resume module.</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Academic qualification */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">
                      Academic Qualification (Separate with commas)
                    </label>
                    <input
                      type="text"
                      placeholder="Sarjana Muda Sains Komputer (UM), Diploma Rangkaian (UiTM)"
                      value={academicRaw}
                      onChange={(e) => setAcademicRaw(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400"
                    />
                    <span className="text-[10px] text-zinc-500 leading-tight block">Optional. Fallbacks to dynamic category preset if empty.</span>
                  </div>

                  {/* Professional qualification */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">
                      Professional Qualification (Separate with commas)
                    </label>
                    <input
                      type="text"
                      placeholder="AWS Certified Solutions Architect, Certified Executive Coach"
                      value={professionalRaw}
                      onChange={(e) => setProfessionalRaw(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400"
                    />
                    <span className="text-[10px] text-zinc-500 leading-tight block">Optional. Falls back to Certifications lists.</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Previous companies */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">
                      Previous Companies (Separate with commas)
                    </label>
                    <input
                      type="text"
                      placeholder="Petronas Chemicals, Intel Malaysia, Shell"
                      value={companiesRaw}
                      onChange={(e) => setCompaniesRaw(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400"
                    />
                    <span className="text-[10px] text-zinc-500 leading-tight block">Optional. Fallbacks to premium industry preset if empty.</span>
                  </div>

                  {/* Training topics */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">
                      Training Experience / Topics Conducted (Separate with commas)
                    </label>
                    <input
                      type="text"
                      placeholder="OSHA Compliance Training, Agile Project Management"
                      value={trainingTopicsRaw}
                      onChange={(e) => setTrainingTopicsRaw(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400"
                    />
                    <span className="text-[10px] text-zinc-500 leading-tight block">Optional. Dynamic list will map if left empty.</span>
                  </div>
                </div>

                <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2 text-red-800 text-[11px] leading-relaxed">
                  <Info className="shrink-0 text-red-500 mt-0.5" size={14} />
                  <span>
                    <strong>Aesthetic Preset Information:</strong> Based on the selected category, our system will automatically assign a professional avatar and decorative course image to ensure the bento display remains matching, clean, and aesthetic.
                  </span>
                </div>
              </div>
            )}

            {/* TAB 2: FIRST COURSE PROGRAM ITEM */}
            {activeTab === 2 && (
              <div className="space-y-4">
                <div className="bg-zinc-50 border border-zinc-200 p-3.5 rounded-xl flex items-start gap-2.5 shadow-sm">
                  <BookOpen className="text-red-500 mt-0.5 shrink-0" size={18} />
                  <div className="text-xs">
                    <strong className="text-zinc-800 block font-bold mb-0.5">Build Your First Training Program & Certificate</strong>
                    <span className="text-zinc-600 leading-relaxed">
                      The nature of the bento grid requires at least one teaching program linked to the trainer to complete the aesthetic look of the visual gallery.
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Course Title */}
                  <div className="md:col-span-8 space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">
                      Course Title / Training Program <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Example: Practical Certificate of Working Safely in Confined Spaces"
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400"
                      required
                    />
                  </div>

                  {/* Course Level */}
                  <div className="md:col-span-4 space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">Training Session Level</label>
                    <select
                      value={courseLevel}
                      onChange={(e) => setCourseLevel(e.target.value as any)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 [&>option]:bg-white [&>option]:text-zinc-900"
                    >
                      <option value="Asas">Beginner</option>
                      <option value="Pertengahan">Intermediate</option>
                      <option value="Lanjutan">Advanced</option>
                    </select>
                  </div>
                </div>

                {/* Course description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700">
                    Full Training Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe the syllabus, assessment methods, hands-on practices, and the ideal target audience..."
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400 resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Duration */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">Duration</label>
                    <input
                      type="text"
                      placeholder="Example: 2 Days (16 Hours) or 3 Weeks"
                      value={courseDuration}
                      onChange={(e) => setCourseDuration(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400"
                    />
                  </div>

                  {/* Outcomes (comma-separated) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-700">
                      Objectives / Learning Outcomes (Separate with commas)
                    </label>
                    <input
                      type="text"
                      placeholder="Able to manage gas safety, Skilled in emergency rescue"
                      value={courseOutcomesRaw}
                      onChange={(e) => setCourseOutcomesRaw(e.target.value)}
                      className="w-full px-3.5 py-2 bg-zinc-50 text-zinc-900 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:bg-white transition-all duration-300 placeholder-zinc-400"
                    />
                  </div>
                </div>
              </div>
            )}

          </form>

          {/* Footer Controls */}
          <div className="border-t border-zinc-200 bg-zinc-50 p-4 flex items-center justify-between">
            {activeTab === 1 ? (
              <>
                <div className="text-xs text-zinc-500">All fields marked with * are required.</div>
                <button
                  type="button"
                  onClick={handleNextTab}
                  className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-md transition-all duration-300 cursor-pointer"
                  id="next-step-btn"
                >
                  Next: Program Details →
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setActiveTab(1)}
                  className="px-4 py-2 rounded-full border border-zinc-200 text-zinc-700 hover:bg-zinc-100 text-sm font-bold transition-all cursor-pointer bg-white shadow-sm"
                  id="back-step-btn"
                >
                  ← Edit Profile
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-lg transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                  id="submit-form-btn"
                >
                  <BadgePlus size={16} />
                  Save Trainer & Program
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
