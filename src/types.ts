export type CategoryType = 'safety' | 'technical' | 'soft_skills' | 'management' | 'marketing' | 'finance' | 'business';

export interface Trainer {
  id: string;
  name: string;
  title: string;
  category: CategoryType;
  avatar: string;
  bio: string;
  rating: number;
  experience: string; // e.g., "10 Tahun"
  certifications: string[];
  skills: string[];
  email: string;
  phone: string;
  password?: string; // Optional password for trainer login
  icNumber?: string; // IC Number (MyKad)
  tttCertNo?: string; // TTT Cert / Exemption Cert No
  avatarFile?: File | null; // transient upload, not persisted
  featured: boolean;
  projectsCount: number;
  socials?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  academicQualification?: string[];
  professionalQualification?: string[];
  previousCompanies?: string[];
  trainingTopics?: string[];
}

export interface PortfolioItem {
  id: string;
  trainerId: string;
  trainerName: string;
  trainerAvatar: string;
  title: string;
  category: CategoryType;
  description: string;
  image: string;
  duration: string; // e.g., "2 Hari", "40 Jam"
  level: 'Asas' | 'Pertengahan' | 'Lanjutan'; // Beginner, Intermediate, Advanced
  outcomes: string[];
  participantsCount: number;
  status?: 'Aktif' | 'Selesai';
}

export interface TrainingStat {
  id: string;
  label: string;
  value: string;
  change: string;
  icon: string;
}

export interface FeedbackItem {
  id: string;
  registrationId: string;
  programId: string;
  programTitle: string;
  trainerId: string;
  participantName: string;
  ratingOverall: number;
  ratingMaterials: number;
  ratingTrainer: number;
  expectationMet: 'Sangat Setuju' | 'Setuju' | 'Tidak Setuju';
  comment: string;
  createdAt: string;
}
