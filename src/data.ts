import { Trainer, PortfolioItem, TrainingStat } from './types';

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 't1',
    name: 'Ahmad Fadhil Bin Razak',
    title: 'Pakar Keselamatan Industri & Kesihatan Pekerjaan (OSHA)',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Berpengalaman lebih 14 tahun melatih sektor pembuatan, tenaga, dan minyak & gas untuk mematuhi piawaian DOSH/OSHA demi mencapai sasaran sifar kemalangan di tapak kerja.',
    rating: 4.9,
    experience: '14 Tahun',
    certifications: [
      'NIOSH Certified Trainer',
      'DOSH Registered Safety & Health Officer (SHO)',
      'NEBOSH International General Certificate (IGC)'
    ],
    skills: [
      'Latihan Ruang Terkurung (Confined Space)',
      'Penilaian Risiko & HIRARC',
      'Sistem Permit Kerja (PTW)',
      'Keselamatan Kebakaran & Evakuasi'
    ],
    email: 'fadhil.sho@industrial-safety.my',
    phone: '+60 12-345 6789',
    featured: true,
    projectsCount: 18,
    socials: {
      linkedin: 'https://linkedin.com/in/fadhil-razak-osha',
      twitter: 'https://twitter.com/fadhil_osha',
      facebook: 'https://www.facebook.com/share/1EhYu4XAnD/?mibextid=wwXIfr',
      facebook2: 'https://www.facebook.com/share/1GVPDvX5vg/?mibextid=wwXIfr',
      facebook3: 'https://www.facebook.com/share/g/18HY6vthsV/?mibextid=wwXIfr'
    }
  },
  {
    id: 't2',
    name: 'Sarah Sophia Cheng',
    title: 'Perunding Kanan Solusi Cloud & Keselamatan Siber',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    bio: 'Membimbing organisasi besar dalam penghijrahan infrastruktur IT tradisional kepada seni bina awan yang pantas, kukuh, dan selamat daripada ancaman siber alaf baru.',
    rating: 4.88,
    experience: '9 Tahun',
    certifications: [
      'AWS Certified Solutions Architect - Professional',
      'Google Cloud Professional Cloud Architect',
      'Certified Information Systems Security Professional (CISSP)'
    ],
    skills: [
      'Seni Bina AWS & Google Cloud',
      'DevOps, Docker & Kubernetes',
      'Keselamatan Siber & Ujian Penembusan',
      'Automasi Infrastruktur (Terraform)'
    ],
    email: 'sarah.cheng@tech-consulting.com',
    phone: '+60 13-987 6543',
    featured: true,
    projectsCount: 22,
    socials: {
      linkedin: 'https://linkedin.com/in/sarah-cheng-cloud',
      twitter: 'https://twitter.com/sarah_cloud_sec',
      facebook: 'https://www.facebook.com/share/1EhYu4XAnD/?mibextid=wwXIfr',
      facebook2: 'https://www.facebook.com/share/1GVPDvX5vg/?mibextid=wwXIfr',
      facebook3: 'https://www.facebook.com/share/g/18HY6vthsV/?mibextid=wwXIfr'
    }
  },
  {
    id: 't3',
    name: 'Marcus David Ananth',
    title: 'Pakar Kepimpinan Eksekutif & Komunikasi Organisasi',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    bio: 'Membantu pemimpin korporat membina pasukan berprestasi tinggi menerusi pembangunan EQ (Kecerdasan Emosi), komunikasi asertif, dan kemahiran berunding yang dinamik.',
    rating: 4.96,
    experience: '11 Tahun',
    certifications: [
      'HRD Corp Accredited Advanced Trainer',
      'NLP Master Practitioner (ABNLP)',
      'ICF Certified Associate Executive Coach'
    ],
    skills: [
      'Kepimpinan Berimpak Tinggi',
      'Resolusi Konflik & Negosiasi',
      'Komunikasi Asertif Korporat',
      'Seni Pengaruh & Pemujukan'
    ],
    email: 'marcus.david@executive-coaching.my',
    phone: '+60 17-654 3210',
    featured: true,
    projectsCount: 31,
    socials: {
      linkedin: 'https://linkedin.com/in/marcus-david-ananth',
      twitter: 'https://twitter.com/marcus_eq_coach',
      facebook: 'https://www.facebook.com/share/1EhYu4XAnD/?mibextid=wwXIfr',
      facebook2: 'https://www.facebook.com/share/1GVPDvX5vg/?mibextid=wwXIfr',
      facebook3: 'https://www.facebook.com/share/g/18HY6vthsV/?mibextid=wwXIfr'
    }
  },
  {
    id: 't4',
    name: 'Kamarul Ariffin Bin Yusof',
    title: 'Jurulatih Kanan Pertolongan Cemas & Respon Kecemasan',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    bio: 'Bekas paramedik perubatan kecemasan yang mendedikasikan kepakaran beliau untuk melatih First Responders di pejabat dan kilang bertindak pantas menyelamatkan nyawa.',
    rating: 4.82,
    experience: '8 Tahun',
    certifications: [
      'Bulan Sabit Merah Malaysia Certified Instructor',
      'Certified First Aid & CPR Trainer',
      'Basic & Advanced Life Support Specialist'
    ],
    skills: [
      'Pertolongan Cemas Industri (First Aid)',
      'Teknik CPR & Penggunaan AED',
      'Pengurusan Mangsa & Triaj',
      'Pelan Tindakan Kecemasan (ERP)'
    ],
    email: 'kamarul.ariffin@rescue-academy.org',
    phone: '+60 11-2345 6781',
    featured: false,
    projectsCount: 14,
    socials: {
      linkedin: 'https://linkedin.com/in/kamarul-ariffin-firstaid',
      twitter: 'https://twitter.com/kamarul_rescue'
    }
  },
  {
    id: 't5',
    name: 'Nurul Izzati Binti Mohd Fauzi',
    title: 'Pakar Pengurusan Stress & Kecerdasan Emosi (EQ) Kerja',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400',
    bio: 'Membantu organisasi memupuk persekitaran kerja yang mesra mental melalui amalan kesedaran (mindfulness), keseimbangan emosi, serta kesepaduan berpasukan yang harmoni.',
    rating: 4.85,
    experience: '7 Tahun',
    certifications: [
      'Emotional Intelligence Certified Practitioner',
      'HRD Corp Certified Professional Trainer',
      'Certified Corporate Wellness Coach'
    ],
    skills: [
      'Kecerdasan Emosi (EQ)',
      'Mindfulness & Pengurusan Stress',
      'Kesejahteraan Mental Korporat',
      'Bekerjasama Dalam Kepelbagaian'
    ],
    email: 'izzati.fauzi@mindfulness-at-work.my',
    phone: '+60 19-345 1122',
    featured: false,
    projectsCount: 12,
    socials: {
      linkedin: 'https://linkedin.com/in/nurul-izzati-eq',
      twitter: 'https://twitter.com/izzati_wellness'
    }
  },
  {
    id: 't6',
    name: 'Devanand Krishnan',
    title: 'Arkitek Data Raya & Sistem Automasi Pembelajaran Mesin',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    bio: 'Mengajar kejuruteraan data dan analitik lanjutan untuk menukarkan limpahan data mentah korporat kepada papan pemuka keputusan strategik berpandukan kecerdasan buatan.',
    rating: 4.91,
    experience: '12 Tahun',
    certifications: [
      'Cloudera Certified Professional (CCP) Data Scientist',
      'TensorFlow Developer Certificate',
      'Microsoft Certified: Power BI Data Analyst Associate'
    ],
    skills: [
      'Analisis Data (Python & R)',
      'Pembangunan Model AI & ML',
      'Visualisasi Data Power BI / Tableau',
      'Kejuruteraan Data & SQL'
    ],
    email: 'devanand.k@data-intelligence.asia',
    phone: '+60 16-789 2468',
    featured: false,
    projectsCount: 26,
    socials: {
      linkedin: 'https://linkedin.com/in/devanand-krishnan-data',
      twitter: 'https://twitter.com/devanand_data'
    }
  },
  {
    id: 't7',
    name: 'Siti Aminah Binti Hassan',
    title: 'Perunding Kanan Kepuasan Pelanggan & Latihan Runcit',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: 'Pakar berpengalaman membina budaya khidmat pelanggan bertaraf 5 bintang untuk sektor hospitaliti, runcit, dan korporat ternama di Malaysia.',
    rating: 4.87,
    experience: '10 Tahun',
    certifications: [
      'SQA Certified Customer Service Professional',
      'HRD Corp Accredited Professional Trainer'
    ],
    skills: [
      'Komunikasi Khidmat Pelanggan',
      'Penyelesaian Masalah Pelanggan',
      'Psikologi Pengguna Runcit',
      'SOP Standard Servis Hospitaliti'
    ],
    email: 'aminah.hassan@service-excellence.my',
    phone: '+60 14-301 2233',
    featured: false,
    projectsCount: 19,
    socials: { linkedin: 'https://linkedin.com/in/siti-aminah-service', facebook: 'https://www.facebook.com/share/1EhYu4XAnD/?mibextid=wwXIfr', facebook2: 'https://www.facebook.com/share/1GVPDvX5vg/?mibextid=wwXIfr', facebook3: 'https://www.facebook.com/share/g/18HY6vthsV/?mibextid=wwXIfr' }
  },
  {
    id: 't8',
    name: 'Dr. Adrian Lim Seng',
    title: 'Pakar Pembangunan Sistem Blockchain & Web3',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    bio: 'Menyelidik kejuruteraan sistem teragih, melatih organisasi korporat membina kontrak pintar pintar (smart contract) dan seni bina pangkalan data kalis ubah.',
    rating: 4.94,
    experience: '15 Tahun',
    certifications: [
      'Certified Blockchain Solutions Architect (CBSA)',
      'Solidity Certified Expert Developer'
    ],
    skills: [
      'Smart Contract Solidity & Rust',
      'Seni Bina Blockchain Teragih',
      'Integrasi Web3 & Cryptography',
      'Kajian Keselamatan Tokenomics'
    ],
    email: 'adrian.lim@blockchain-academy.my',
    phone: '+60 12-888 7766',
    featured: false,
    projectsCount: 34,
    socials: { linkedin: 'https://linkedin.com/in/adrian-lim-web3', facebook: 'https://www.facebook.com/share/1EhYu4XAnD/?mibextid=wwXIfr', facebook2: 'https://www.facebook.com/share/1GVPDvX5vg/?mibextid=wwXIfr', facebook3: 'https://www.facebook.com/share/g/18HY6vthsV/?mibextid=wwXIfr' }
  },
  {
    id: 't9',
    name: 'Rajesh Kumar Selvam',
    title: 'Pakar Pengurusan Bahan Kimia Berbahaya (HAZMAT)',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    bio: 'Jurulatih bertauliah dalam mengendalikan tindak balas kecemasan tumpahan kimia dan penyimpanan bahan beracun industri mengikut piawaian CLASS 2013.',
    rating: 4.86,
    experience: '11 Tahun',
    certifications: [
      'Certified HAZMAT Specialist (DOSH)',
      'Chemical Safety Management Instructor'
    ],
    skills: [
      'Pelan Tindakan Tumpahan Kimia',
      'Klasifikasi Bahan Kimia CLASS 2013',
      'Peralatan Perlindungan Diri (PPE) Khas',
      'Pengurusan Sisa Berjadual (Scheduled Waste)'
    ],
    email: 'rajesh.hazmat@safety-malaysia.com',
    phone: '+60 17-223 4455',
    featured: false,
    projectsCount: 15,
    socials: { linkedin: 'https://linkedin.com/in/rajesh-kumar-hazmat', facebook: 'https://www.facebook.com/share/1EhYu4XAnD/?mibextid=wwXIfr', facebook2: 'https://www.facebook.com/share/1GVPDvX5vg/?mibextid=wwXIfr', facebook3: 'https://www.facebook.com/share/g/18HY6vthsV/?mibextid=wwXIfr' }
  },
  {
    id: 't10',
    name: 'Noraini Binti Abdul Rahman',
    title: 'Jurulatih Komunikasi Bahasa Inggeris & Penulisan Bisnes',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    bio: 'Membantu golongan profesional meningkatkan keyakinan bertutur dalam mesyuarat peringkat tinggi serta menghasilkan laporan korporat yang persuasif.',
    rating: 4.81,
    experience: '8 Tahun',
    certifications: [
      'Cambridge CELTA Certified Instructor',
      'HRD Corp Accredited Professional Trainer'
    ],
    skills: [
      'Penulisan E-mel Profesional',
      'Teknik Pembentangan Impak Tinggi',
      'Bahasa Inggeris Komunikasi Bisnes',
      'Gaya Bahasa Protokol Korporat'
    ],
    email: 'noraini.rahman@english-excellence.com',
    phone: '+60 13-333 5544',
    featured: false,
    projectsCount: 20,
    socials: { linkedin: 'https://linkedin.com/in/noraini-english-coach', facebook: 'https://www.facebook.com/share/1EhYu4XAnD/?mibextid=wwXIfr', facebook2: 'https://www.facebook.com/share/1GVPDvX5vg/?mibextid=wwXIfr', facebook3: 'https://www.facebook.com/share/g/18HY6vthsV/?mibextid=wwXIfr' }
  },
  {
    id: 't11',
    name: 'Muhammad Faizul Bin Ismail',
    title: 'Pakar Pembangunan Aplikasi Mudah Alih Flutter & Swift',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=400',
    bio: 'Bekas pembangun aplikasi kanan di syarikat Unicorn serantau, aktif melatih pasukan kejuruteraan membina aplikasi hibrid yang pantas dan bertaraf dunia.',
    rating: 4.93,
    experience: '10 Tahun',
    certifications: [
      'Google Certified Flutter Developer',
      'Apple Certified Swift iOS Engineer'
    ],
    skills: [
      'Pembangunan Flutter & Dart',
      'Native iOS Swift Development',
      'Integrasi API & State Management',
      'Piawaian App Store & Play Store'
    ],
    email: 'faizul.ismail@mobile-dev.my',
    phone: '+60 11-555 4432',
    featured: false,
    projectsCount: 28,
    socials: { linkedin: 'https://linkedin.com/in/faizul-flutter-dev', facebook: 'https://www.facebook.com/share/1EhYu4XAnD/?mibextid=wwXIfr', facebook2: 'https://www.facebook.com/share/1GVPDvX5vg/?mibextid=wwXIfr', facebook3: 'https://www.facebook.com/share/g/18HY6vthsV/?mibextid=wwXIfr' }
  },
  {
    id: 't12',
    name: 'Melissa Wong Jia Yi',
    title: 'Perunding Pemasaran Digital & Pertumbuhan Bisnes',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    bio: 'Membimbing jenama PKS dan syarikat multinasional membina corong jualan automatik melalui platform pengiklanan Meta, TikTok, dan Google Ads.',
    rating: 4.89,
    experience: '9 Tahun',
    certifications: [
      'Meta Certified Media Buying Professional',
      'Google Ads Search Certification'
    ],
    skills: [
      'Pengurusan Kempen Meta & TikTok Ads',
      'Seni Reka Corong Jualan (Funneling)',
      'Pengoptimuman Enjin Carian (SEO)',
      'Penganalisaan ROI Pemasaran'
    ],
    email: 'melissa.wong@growth-marketing.asia',
    phone: '+60 18-444 3322',
    featured: false,
    projectsCount: 24,
    socials: { linkedin: 'https://linkedin.com/in/melissa-wong-growth', facebook: 'https://www.facebook.com/share/1EhYu4XAnD/?mibextid=wwXIfr', facebook2: 'https://www.facebook.com/share/1GVPDvX5vg/?mibextid=wwXIfr', facebook3: 'https://www.facebook.com/share/g/18HY6vthsV/?mibextid=wwXIfr' }
  },
  {
    id: 't13',
    name: 'Thinesh Balakrishnan',
    title: 'Pakar Kejuruteraan DevOps & Sistem Linux Lanjutan',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400',
    bio: 'Mengajar automasi infrastruktur IT berskala besar, membolehkan syarikat meminimumkan gangguan sistem (downtime) menerusi amalan git-based CI/CD.',
    rating: 4.9,
    experience: '12 Tahun',
    certifications: [
      'Red Hat Certified Architect (RHCA)',
      'Certified Kubernetes Administrator (CKA)'
    ],
    skills: [
      'Automasi Infrastruktur Guna Ansible',
      'Penyediaan CI/CD Guna GitLab / Jenkins',
      'Sistem Fail Linux & Keselamatan Kernel',
      'Pemantauan Sistem Grafana & Prometheus'
    ],
    email: 'thinesh.b@devops-consulting.my',
    phone: '+60 16-302 5588',
    featured: false,
    projectsCount: 29,
    socials: { linkedin: 'https://linkedin.com/in/thinesh-devops-pro', facebook: 'https://www.facebook.com/share/1EhYu4XAnD/?mibextid=wwXIfr', facebook2: 'https://www.facebook.com/share/1GVPDvX5vg/?mibextid=wwXIfr', facebook3: 'https://www.facebook.com/share/g/18HY6vthsV/?mibextid=wwXIfr' }
  },
  {
    id: 't14',
    name: 'Rozita Binti Omar',
    title: 'Penyelia Keselamatan Tapak Bina & Pengurusan Perancah',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400',
    bio: 'Menawarkan kepakaran unik dalam memantau risiko kerja di tempat tinggi, pemasangan perancah (scaffolding) yang kukuh, serta pematuhan Akta Kilang & Jentera.',
    rating: 4.83,
    experience: '13 Tahun',
    certifications: [
      'DOSH Registered Scaffolding Supervisor',
      'Construction Safety SHO Certification'
    ],
    skills: [
      'Pemeriksaan Perancah Standard',
      'Pengurusan Kerja di Tempat Tinggi',
      'Sistem Pencegahan Jatuh (Fall Arrest)',
      'Audit Keselamatan Tapak Projek'
    ],
    email: 'rozita.omar@construction-safety.my',
    phone: '+60 19-601 2288',
    featured: false,
    projectsCount: 16,
    socials: { linkedin: 'https://linkedin.com/in/rozita-omar-safety', facebook: 'https://www.facebook.com/share/1EhYu4XAnD/?mibextid=wwXIfr', facebook2: 'https://www.facebook.com/share/1GVPDvX5vg/?mibextid=wwXIfr', facebook3: 'https://www.facebook.com/share/g/18HY6vthsV/?mibextid=wwXIfr' }
  },
  {
    id: 't15',
    name: 'Ir. Roslan Bin Kassim',
    title: 'Pakar Kejuruteraan Elektrikal & Keselamatan Voltan Tinggi',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    bio: 'Jurutera Profesional berdaftar yang melatih kakitangan teknikal industri untuk mengendalikan pencawang elektrik secara selamat, mengikut Akta Bekalan Elektrik.',
    rating: 4.95,
    experience: '20 Tahun',
    certifications: [
      'Suruhanjaya Tenaga Registered Professional Engineer',
      'High Voltage Competent Engineer Certification'
    ],
    skills: [
      'Protokol Kerja Voltan Tinggi (HV)',
      'Analisis Bahaya Kilat Arka (Arc Flash)',
      'Sistem Bumi & Perlindungan Kilat',
      'Prosedur Lockout Tagout (LOTO)'
    ],
    email: 'roslan.kassim@power-engineering.com',
    phone: '+60 12-205 9933',
    featured: false,
    projectsCount: 42,
    socials: { linkedin: 'https://linkedin.com/in/ir-roslan-kassim', facebook: 'https://www.facebook.com/share/1EhYu4XAnD/?mibextid=wwXIfr', facebook2: 'https://www.facebook.com/share/1GVPDvX5vg/?mibextid=wwXIfr', facebook3: 'https://www.facebook.com/share/g/18HY6vthsV/?mibextid=wwXIfr' }
  },
  {
    id: 't16',
    name: 'Evelyn Tan Bee Leng',
    title: 'Jurulatih Kanan Agile Scrum & Pengurusan Produk',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    bio: 'Membantu pasukan perisian dan bukan perisian mengamalkan budaya Agile bagi mempercepat masa pasaran (Time-to-Market) dan meningkatkan kolaborasi.',
    rating: 4.88,
    experience: '11 Tahun',
    certifications: [
      'Certified Scrum Trainer (CST)',
      'PMI Agile Certified Practitioner (PMI-ACP)'
    ],
    skills: [
      'Rangka Kerja Scrum & Kanban',
      'Penulisan User Stories & Backlog Refinement',
      'Retrospektif & Facilitation Skills',
      'Transformasi Budaya Korporat Agile'
    ],
    email: 'evelyn.tan@agile-coaches.asia',
    phone: '+60 17-550 1199',
    featured: false,
    projectsCount: 27,
    socials: { linkedin: 'https://linkedin.com/in/evelyn-tan-agile', facebook: 'https://www.facebook.com/share/1EhYu4XAnD/?mibextid=wwXIfr', facebook2: 'https://www.facebook.com/share/1GVPDvX5vg/?mibextid=wwXIfr', facebook3: 'https://www.facebook.com/share/g/18HY6vthsV/?mibextid=wwXIfr' }
  },
  {
    id: 't17',
    name: 'Khairul Azhar Bin Zainuddin',
    title: 'Arkitek Pangkalan Data & Pengoptimuman SQL',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400',
    bio: 'Melatih pentadbir pangkalan data (DBA) dalam menyusun indeks pangkalan data yang cekap bagi mengelakkan gangguan capaian pelayan semasa trafik memuncak.',
    rating: 4.85,
    experience: '10 Tahun',
    certifications: [
      'Oracle Database Administration Certified Professional (OCP)',
      'PostgreSQL Certified Professional Trainer'
    ],
    skills: [
      'Penalaan Prestasi Pertanyaan SQL (Tuning)',
      'Seni Bina PostgreSQL & MySQL',
      'Strategi Backup & Replikasi Data',
      'Pengurusan Kluster NoSQL (MongoDB)'
    ],
    email: 'khairul.azhar@database-expert.my',
    phone: '+60 11-120 4455',
    featured: false,
    projectsCount: 18,
    socials: { linkedin: 'https://linkedin.com/in/khairul-azhar-sql', facebook: 'https://www.facebook.com/share/1EhYu4XAnD/?mibextid=wwXIfr', facebook2: 'https://www.facebook.com/share/1GVPDvX5vg/?mibextid=wwXIfr', facebook3: 'https://www.facebook.com/share/g/18HY6vthsV/?mibextid=wwXIfr' }
  },
  {
    id: 't18',
    name: 'Dr. Sharmini Devi',
    title: 'Pakar Reka Fikir (Design Thinking) & Inovasi Bisnes',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=400',
    bio: 'Pensyarah pelawat dan perunding korporat yang memimpin makmal inovasi untuk mencipta solusi berpusatkan manusia (human-centered solutions).',
    rating: 4.92,
    experience: '13 Tahun',
    certifications: [
      'IDEO Certified Design Thinking Facilitator',
      'HRD Corp Master Trainer Accreditation'
    ],
    skills: [
      'Pemetaan Empati & Perjalanan Pelanggan',
      'Fasilitasi Sesi Sumbangsaran Inovatif',
      'Ujian Prototaip Pantas (Rapid Prototyping)',
      'Seni Reka Bentuk Produk & Servis'
    ],
    email: 'sharmini.devi@innovation-lab.my',
    phone: '+60 12-603 4455',
    featured: false,
    projectsCount: 30,
    socials: { linkedin: 'https://linkedin.com/in/dr-sharmini-devi-dt', facebook: 'https://www.facebook.com/share/1EhYu4XAnD/?mibextid=wwXIfr', facebook2: 'https://www.facebook.com/share/1GVPDvX5vg/?mibextid=wwXIfr', facebook3: 'https://www.facebook.com/share/g/18HY6vthsV/?mibextid=wwXIfr' }
  },
  {
    id: 't19',
    name: 'Mohd Zulkifli Bin Mansor',
    title: 'Jurulatih Operasi Gudang & Keselamatan Forklift',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    bio: 'Menyediakan latihan praktikal pemanduan jentera forklift berat secara selamat bagi meminimumkan kerosakan harta benda dan mengelakkan kecederaan di kilang.',
    rating: 4.84,
    experience: '12 Tahun',
    certifications: [
      'NIOSH Certified Forklift Competence Trainer',
      'Warehouse Safety Inspector Certificate'
    ],
    skills: [
      'Pemanduan Forklift Amali & Teori',
      'SOP Penyimpanan Bahan Bertingkat',
      'Pemeriksaan Harian Jentera (Daily Checks)',
      'Kawalan Bahaya Laluan Trafik Gudang'
    ],
    email: 'zulkifli.mansor@logistics-safety.my',
    phone: '+60 13-605 1199',
    featured: false,
    projectsCount: 17,
    socials: { linkedin: 'https://linkedin.com/in/zulkifli-forklift-trainer', facebook: 'https://www.facebook.com/share/1EhYu4XAnD/?mibextid=wwXIfr', facebook2: 'https://www.facebook.com/share/1GVPDvX5vg/?mibextid=wwXIfr', facebook3: 'https://www.facebook.com/share/g/18HY6vthsV/?mibextid=wwXIfr' }
  },
  {
    id: 't20',
    name: 'Rachel Wong Wei Qi',
    title: 'Pakar Reka Bentuk UI/UX & Strategi Produk Digital',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a131fed10495?auto=format&fit=crop&q=80&w=400',
    bio: 'Merekabentuk perjalanan digital yang lancar untuk sistem kewangan korporat dan platform SaaS komersial di Malaysia dan Singapura.',
    rating: 4.91,
    experience: '8 Tahun',
    certifications: [
      'Nielsen Norman Group UX Certified',
      'Figma Professional Certified Educator'
    ],
    skills: [
      'Reka Bentuk Prototaip Figma Lanjutan',
      'Penyelidikan Pengguna & Temubual UX',
      'Penyediaan Seni Reka Sistem (Design Systems)',
      'Analisis Kebolehgunaan (Usability Testing)'
    ],
    email: 'rachel.wong@uiux-studio.my',
    phone: '+60 17-332 5500',
    featured: false,
    projectsCount: 21,
    socials: { linkedin: 'https://linkedin.com/in/rachel-wong-uiux' }
  },
  {
    id: 't21',
    name: 'Harpreet Singh',
    title: 'Jurulatih Neuro-Linguistic Programming (NLP) & EQ',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    bio: 'Pakar pemikiran bawah sedar yang melatih eksekutif jualan dan pengurus korporat untuk menguasai komunikasi pengaruh berasaskan NLP.',
    rating: 4.89,
    experience: '12 Tahun',
    certifications: [
      'American Board of NLP (ABNLP) Certified Trainer',
      'Certified Master Coach in Emotional Intelligence'
    ],
    skills: [
      'Gaya Bahasa NLP Untuk Pengaruh',
      'Pengurusan Emosi & Motivasi Diri',
      'Seni Reframing & Mengatasi Halangan Minda',
      'Membina Kepercayaan Pantas (Rapport Building)'
    ],
    email: 'harpreet.singh@nlp-academy.asia',
    phone: '+60 12-405 6677',
    featured: false,
    projectsCount: 26,
    socials: { linkedin: 'https://linkedin.com/in/harpreet-nlp-trainer' }
  },
  {
    id: 't22',
    name: 'Jin Yee Low',
    title: 'Pakar Analisis Forensik Digital & Tindak Balas Insiden',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400',
    bio: 'Melatih pasukan keselamatan IT bank tempatan mengesan punca kebocoran data, mengumpul bukti forensik digital, serta menyekat serangan tebusan (ransomware).',
    rating: 4.96,
    experience: '10 Tahun',
    certifications: [
      'Certified Computer Hacking Forensic Investigator (CHFI)',
      'SANS GIAC Certified Incident Handler (GCIH)'
    ],
    skills: [
      'Analisis Memori & Log Sistem',
      'Siasatan Forensik Rangkaian',
      'Pembersihan Malware Tersembunyi',
      'Penyediaan Laporan Bukti Mahkamah'
    ],
    email: 'jinyee.low@cyber-forensics.my',
    phone: '+60 13-908 4422',
    featured: true,
    projectsCount: 22,
    socials: { linkedin: 'https://linkedin.com/in/jin-yee-cybersec' }
  },
  {
    id: 't23',
    name: 'Haziq Bin Mohamad',
    title: 'Pakar Analisis Kewangan Syarikat & Belanjawan Korporat',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    bio: 'Menterjemah angka perakaunan yang rumit ke dalam bentuk keputusan perniagaan praktikal demi mengelakkan kebocoran tunai.',
    rating: 4.82,
    experience: '9 Tahun',
    certifications: [
      'Chartered Accountant (MIA) Malaysia',
      'Chartered Financial Analyst (CFA) Charterholder'
    ],
    skills: [
      'Analisis Aliran Tunai & Penilaian Risiko',
      'Penyediaan Unjuran Kewangan (Forecasting)',
      'Kajian Margin Untung Kasar & Bersih',
      'Pengurusan Strategik Modal Kerja'
    ],
    email: 'haziq.mohamad@finance-coaching.my',
    phone: '+60 11-209 8833',
    featured: false,
    projectsCount: 15,
    socials: { linkedin: 'https://linkedin.com/in/haziq-mohamad-cfa' }
  },
  {
    id: 't24',
    name: 'Farhana Binti Zainal',
    title: 'Jurulatih Bahasa Pengaturcaraan Python & Data Science',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    bio: 'Mengajar asas pengaturcaraan Python dari sifar, membantu ahli kewangan dan pemasaran membina kod automasi analisis data sendiri.',
    rating: 4.88,
    experience: '7 Tahun',
    certifications: [
      'Python Institute Certified Associate (PCAP)',
      'Google Advanced Data Analytics Certified'
    ],
    skills: [
      'Sintaks Asas & Struktur Data Python',
      'Analisis Data Pandas & Numpy',
      'Automasi Tugas Harian Guna Skrip',
      'Seni Reka Model Klasifikasi Ringkas'
    ],
    email: 'farhana.zainal@python-academy.org',
    phone: '+60 19-408 5544',
    featured: false,
    projectsCount: 16,
    socials: { linkedin: 'https://linkedin.com/in/farhana-zainal-data' }
  },
  {
    id: 't25',
    name: 'Adam Malik Bin Johari',
    title: 'Perunding Seni Perundingan & Jualan Nilai Tinggi B2B',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Bekas Naib Presiden Jualan korporat multinasional, melatih jurujual menutup kontrak bernilai jutaan ringgit melalui taktik psikologi.',
    rating: 4.95,
    experience: '16 Tahun',
    certifications: [
      'Strategic Sales Leadership Coach Accreditation',
      'HRD Corp Certified Senior Trainer'
    ],
    skills: [
      'Taktik Rundingan Harga B2B',
      'Pitching Pelabur Berimpak Tinggi',
      'Psikologi Menutup Jualan (Closing)',
      'Pembinaan Strategi Akaun Utama'
    ],
    email: 'adam.malik@sales-mastery.my',
    phone: '+60 12-401 9900',
    featured: true,
    projectsCount: 38,
    socials: { linkedin: 'https://linkedin.com/in/adam-malik-sales' }
  },
  {
    id: 't26',
    name: 'Priya Loganathan',
    title: 'Pakar Resolusi Konflik Tempat Kerja & Hubungan Pekerja',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    bio: 'Menawarkan kepakaran dalam menguruskan salah faham silang budaya dan merapatkan jurang komunikasi antara pasukan pengurusan tinggi dan operasi.',
    rating: 4.86,
    experience: '11 Tahun',
    certifications: [
      'Certified Mediator - Malaysian Mediation Centre',
      'Society for Human Resource Management Senior Certified (SHRM-SCP)'
    ],
    skills: [
      'Teknik Mediasi & Siasatan Dalaman',
      'Pematuhan Akta Kerja 1955 Malaysia',
      'Pengurusan Emosi Semasa Konflik',
      'Pembangunan Budaya Syarikat Sihat'
    ],
    email: 'priya.l@hr-resolution.my',
    phone: '+60 14-889 2233',
    featured: false,
    projectsCount: 22,
    socials: { linkedin: 'https://linkedin.com/in/priya-loganathan-hr' }
  },
  {
    id: 't27',
    name: 'Vikneswaran Rajah',
    title: 'Jurulatih Pemanduan Defensif & Keselamatan Armada',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    bio: 'Melatih pemandu korporat, pemandu lori, dan logistik untuk memandu dalam keadaan ekstrem bagi mengurangkan kemalangan jalan raya.',
    rating: 4.87,
    experience: '13 Tahun',
    certifications: [
      'Certified Defensive Driving Instructor (UK)',
      'Road Safety Association Malaysia Accredited Member'
    ],
    skills: [
      'Kawalan Kereta Semasa Gelincir (Skid Control)',
      'Sistem Pemanduan Selamat 5-Sistem',
      'Penyelenggaraan Kenderaan Kecemasan',
      'Pengurusan Letih & Stress Memandu (Fatigue)'
    ],
    email: 'viknes.defensive@safedrive.asia',
    phone: '+60 17-604 1122',
    featured: false,
    projectsCount: 25,
    socials: { linkedin: 'https://linkedin.com/in/viknes-defensive-driving' }
  },
  {
    id: 't28',
    name: 'Norhasliza Binti Ramli',
    title: 'Pakar Pengurusan Sumber Manusia Strategik',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    bio: 'Menyusun strategi perolehan bakat terunggul, struktur gaji, serta petunjuk prestasi utama (KPI) yang adil untuk pertumbuhan lestari organisasi.',
    rating: 4.83,
    experience: '10 Tahun',
    certifications: [
      'Certified Professional in Human Resource (CPHR)',
      'MIPA Registered HR Professional'
    ],
    skills: [
      'Reka Bentuk Sistem KPI & OKR',
      'Strategi Penggantian Jawatan (Succession)',
      'Temubual Berasaskan Kompetensi',
      'Pengurusan Skema Pampasan & Faedah'
    ],
    email: 'hasliza.ramli@strategic-hr.my',
    phone: '+60 13-405 7766',
    featured: false,
    projectsCount: 17,
    socials: { linkedin: 'https://linkedin.com/in/hasliza-ramli-hr' }
  },
  {
    id: 't29',
    name: 'Dr. Kenji Tanaka',
    title: 'Pakar Kejuruteraan IoT & Automasi Industri 4.0',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    bio: 'Membimbing pengurus kilang mengintegrasikan sensor pintar PLC dengan rangkaian awan untuk pemantauan jentera masa nyata.',
    rating: 4.97,
    experience: '14 Tahun',
    certifications: [
      'Certified Industry 4.0 Integrator Professional',
      'IEEE Senior Member & IoT Specialist'
    ],
    skills: [
      'Program Mikro-Pengawal (Arduino/Raspberry)',
      'Integrasi Sensor PLC Industri & SCADA',
      'Protokol Rangkaian Modbus & MQTT',
      'Analitis Ramalan Kerosakan Mesin'
    ],
    email: 'kenji.tanaka@smart-factory.my',
    phone: '+60 16-202 3344',
    featured: true,
    projectsCount: 31,
    socials: { linkedin: 'https://linkedin.com/in/kenji-tanaka-iot' }
  },
  {
    id: 't30',
    name: 'Shafiq Bin Ramlan',
    title: 'Pakar Ergonomik Pejabat & Kesihatan Tulang Pekerja',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    bio: 'Mengenalpasti punca sakit belakang (back pain) di pejabat dan kilang serta membina ruang kerja mesra tubuh bagi meningkatkan produktiviti.',
    rating: 4.81,
    experience: '8 Tahun',
    certifications: [
      'DOSH Registered Ergonomics Trained Person',
      'Certified Ergonomic Assessment Specialist'
    ],
    skills: [
      'Penilaian Risiko Ergonomik (ERA)',
      'Susun Atur Meja Kerja Selesa',
      'Senaman Regangan Pencegahan MSDs',
      'Reka Bentuk Stesen Kerja Kilang'
    ],
    email: 'shafiq.ergonomic@office-health.my',
    phone: '+60 11-309 5544',
    featured: false,
    projectsCount: 14,
    socials: { linkedin: 'https://linkedin.com/in/shafiq-ramlan-ergonomics' }
  },
  {
    id: 't31',
    name: 'Amanda Chin Siew Mei',
    title: 'Jurulatih Penulisan Kreatif & Penceritaan Kandungan',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: 'Penulis skrip iklan bertauliah, melatih pencipta kandungan menghasilkan naratif video viral yang memikat hati jutaan pelanggan.',
    rating: 4.84,
    experience: '7 Tahun',
    certifications: [
      'Certified Content Marketer - Copyblogger',
      'HRD Corp Accredited Professional Trainer'
    ],
    skills: [
      'Teknik Penceritaan Bisnes (Storytelling)',
      'Penulisan Skrip Video Iklan Sosial',
      'Seni Copywriting Menjual Produk',
      'Pembangunan Suara Jenama (Brand Voice)'
    ],
    email: 'amanda.chin@copy-academy.my',
    phone: '+60 18-904 2233',
    featured: false,
    projectsCount: 12,
    socials: { linkedin: 'https://linkedin.com/in/amanda-chin-writer' }
  },
  {
    id: 't32',
    name: 'Iskandar Bin Dzulkarnain',
    title: 'Perunding Rangkaian Komputer Cisco CCNA & CCNP',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=400',
    bio: 'Menawarkan modul persediaan pensijilan Cisco secara praktikal untuk membolehkan jurutera membina rangkaian korporat tanpa gangguan.',
    rating: 4.89,
    experience: '11 Tahun',
    certifications: [
      'Cisco Certified Network Professional (CCNP) Enterprise',
      'Cisco Certified Academy Instructor (CCAI)'
    ],
    skills: [
      'Konfigurasi Suis & Penghala Cisco',
      'Reka Bentuk Subnet Rangkaian Kompleks',
      'Protokol Laluan Dinamik (OSPF & BGP)',
      'Sistem Keselamatan Firewall Rangkaian'
    ],
    email: 'iskandar.dzul@network-expert.my',
    phone: '+60 12-707 5588',
    featured: false,
    projectsCount: 23,
    socials: { linkedin: 'https://linkedin.com/in/iskandar-dzulkarnain-cisco' }
  },
  {
    id: 't33',
    name: 'Dr. Fatimah Binti Daud',
    title: 'Pakar Pengucapan Awam & Kemahiran Persembahan',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    bio: 'Membina karisma ucapan, membantu ketua pegawai eksekutif berucap secara memukau dan mengatasi ketakutan pentas secara berkesan.',
    rating: 4.93,
    experience: '15 Tahun',
    certifications: [
      'Toastmasters International Distinguished Toastmaster (DTM)',
      'Certified Professional Speaker (Malaysian Association)'
    ],
    skills: [
      'Seni Reka Struktur Ucapan Menarik',
      'Kawalan Suara & Bahasa Tubuh',
      'Teknik Mengatasi Gugup Pentas',
      'Reka Letak Slaid Pembentangan Moden'
    ],
    email: 'fatimah.daud@publicspeak.my',
    phone: '+60 19-301 4455',
    featured: true,
    projectsCount: 35,
    socials: { linkedin: 'https://linkedin.com/in/dr-fatimah-daud' }
  },
  {
    id: 't34',
    name: 'Syahmi Bin Hazim',
    title: 'Penyelia Keselamatan Sinaran & Bahan Radioaktif',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400',
    bio: 'Menawarkan modul kepatuhan ketat untuk makmal perubatan dan loji industri yang mengendalikan radas pemancar sinaran berion.',
    rating: 4.85,
    experience: '9 Tahun',
    certifications: [
      'Radiation Protection Officer (RPO) - Atomic Energy Board',
      'DOSH Registered Lab Safety Specialist'
    ],
    skills: [
      'SOP Pengendalian Bahan Radioaktif',
      'Pengukuran Dos Sinaran Pekerja',
      'Pelan Kecemasan Kebocoran Sinaran',
      'Penyediaan Bilik Kalis Radiasi'
    ],
    email: 'syahmi.hazim@radiation-safety.org',
    phone: '+60 13-705 3344',
    featured: false,
    projectsCount: 13,
    socials: { linkedin: 'https://linkedin.com/in/syahmi-radiation-officer' }
  },
  {
    id: 't35',
    name: 'Chloe Chen',
    title: 'Pakar Pembangunan eCommerce & Pemasaran Kedai Web',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    bio: 'Membina kedai dalam talian berkonversi tinggi menggunakan platform Shopify dan WooCommerce untuk pasaran antarabangsa.',
    rating: 4.88,
    experience: '8 Tahun',
    certifications: [
      'Shopify Business Partner & Certified Expert',
      'Google Analytics IQ Certified'
    ],
    skills: [
      'Seni Bina Reka Letak Kedai Shopify',
      'Konfigurasi Gerbang Pembayaran (Stripe, Billplz)',
      'Analitis Corong Belanja Google Analytics',
      'Taktik Pemasaran Peninggalan Troli (Cart Abandonment)'
    ],
    email: 'chloe.chen@ecommerce-growth.com',
    phone: '+60 17-202 8844',
    featured: false,
    projectsCount: 20,
    socials: { linkedin: 'https://linkedin.com/in/chloe-chen-ecommerce' }
  },
  {
    id: 't36',
    name: 'Ganesan Murugan',
    title: 'Komander Bomba Industri & Pakar Keselamatan Kebakaran',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    bio: 'Bekas pegawai kanan Jabatan Bomba & Penyelamat Malaysia, melatih Pasukan Tindakan Kecemasan (ERT) kilang menangani kebakaran berskala besar.',
    rating: 4.92,
    experience: '18 Tahun',
    certifications: [
      'Certified Fire Safety Manager (JBPM)',
      'Emergency Response Commander Instructor'
    ],
    skills: [
      'Fasilitasi Latihan ERT & Evakuasi Bomba',
      'Penyelenggaraan Sistem Semburan Air (Sprinkler)',
      'Klasifikasi Alat Pemadam Api Ringkas',
      'Kajian Hazard Letupan Habuk Industri'
    ],
    email: 'ganesan.m@fire-responder.my',
    phone: '+60 12-402 7788',
    featured: false,
    projectsCount: 29,
    socials: { linkedin: 'https://linkedin.com/in/ganesan-fire-safety' }
  },
  {
    id: 't37',
    name: 'Nur Elyana Binti Syukur',
    title: 'Jurulatih Produktiviti Peribadi & Pengurusan Masa',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a131fed10495?auto=format&fit=crop&q=80&w=400',
    bio: 'Membimbing pekerja korporat menguruskan kebanjiran e-mel, menyusun keutamaan tugasan, serta membina disiplin kerja harian kalis gangguan.',
    rating: 4.82,
    experience: '7 Tahun',
    certifications: [
      'Certified Productivity Specialist (FranklinCovey)',
      'HRD Corp Accredited Professional Trainer'
    ],
    skills: [
      'Kaedah Urusan GTD (Getting Things Done)',
      'Teknik Pembahagian Blok Masa (Time Blocking)',
      'Delegasi Tugas & Komunikasi Sinergi',
      'Menetapkan Sempadan Kerja Sihat'
    ],
    email: 'elyana.syukur@productivity-hub.my',
    phone: '+60 19-204 8833',
    featured: false,
    projectsCount: 11,
    socials: { linkedin: 'https://linkedin.com/in/elyana-syukur-time' }
  },
  {
    id: 't38',
    name: 'Bryan Lee Heng',
    title: 'Arkitek Perisian Kanan & Amalan Kod Bersih (Clean Code)',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Mengajar kejuruteraan sistem perisian berskala perusahaan (Enterprise), melatih jurutera menulis kod yang mudah diuji dan diselenggara.',
    rating: 4.9,
    experience: '12 Tahun',
    certifications: [
      'Microsoft Certified: Azure Solutions Architect Expert',
      'Certified Clean Code Software Practitioner'
    ],
    skills: [
      'Seni Reka Bentuk SOLID & Clean Architecture',
      'Pembangunan Berasaskan Ujian (TDD)',
      'Seni Bina Microservices & REST API',
      'Sistem Pemfaktoran Semula Kod (Refactoring)'
    ],
    email: 'bryan.lee@software-craft.my',
    phone: '+60 16-402 1100',
    featured: false,
    projectsCount: 26,
    socials: { linkedin: 'https://linkedin.com/in/bryan-lee-cleancode' }
  },
  {
    id: 't39',
    name: 'Dr. Zulkarnain Bin Sidek',
    title: 'Jurulatih Kemahiran Berfikir Kritis & Analitis Bisnes',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    bio: 'Membantu ahli eksekutif syarikat merangka keputusan strategik yang berpaksikan analisis senario risiko logik.',
    rating: 4.91,
    experience: '14 Tahun',
    certifications: [
      'Critical Thinking Professional Educator Accreditation',
      'HRD Corp Accredited Senior Facilitator'
    ],
    skills: [
      'Analisis Pokok Keputusan (Decision Tree)',
      'Penyelesaian Masalah Kompleks (Root Cause)',
      'Strategi Pengurusan Risiko Senario',
      'Metodologi Reka Bentuk Struktur Kajian'
    ],
    email: 'zulkarnain.sidek@strategic-mindset.my',
    phone: '+60 12-505 8899',
    featured: false,
    projectsCount: 33,
    socials: { linkedin: 'https://linkedin.com/in/dr-zulkarnain-sidek' }
  },
  {
    id: 't40',
    name: 'Azlina Binti Mahmud',
    title: 'Jurulatih Analitis Microsoft Excel Korporat Lanjutan',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    bio: 'Pakar spreadsheet yang mengajar kaedah automasi data Excel, formula formula bersarang, Pivot Table, dan visualisasi carta dinamik.',
    rating: 4.86,
    experience: '10 Tahun',
    certifications: [
      'Microsoft Office Specialist: Excel Expert (Office 365)',
      'Certified Financial Modeling Specialist'
    ],
    skills: [
      'Formula Pivot Table & Power Query Excel',
      'Formula VLOOKUP, INDEX-MATCH & XLOOKUP',
      'Automasi Tugas Excel Guna Skrip VBA Makro',
      'Seni Reka Dashboard Data Excel Dinamik'
    ],
    email: 'azlina.mahmud@excel-pro.com',
    phone: '+60 13-205 7788',
    featured: false,
    projectsCount: 22,
    socials: { linkedin: 'https://linkedin.com/in/azlina-mahmud-excel' }
  },
  {
    id: 't41',
    name: 'Ridzuan Bin Hashim',
    title: 'Jurulatih Operasi Rigging & Slinging Keselamatan Crane',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    bio: 'Mengajar prosedur mengangkat bebanan berat menggunakan kren (crane) di tapak perindustrian dan pelabuhan secara selamat.',
    rating: 4.83,
    experience: '11 Tahun',
    certifications: [
      'DOSH Registered Crane Inspector & Rigger Trainer',
      'Leea Certified Rigging Specialist'
    ],
    skills: [
      'Kira-Kira Pusat Graviti Beban Angkat',
      'Pemeriksaan Keadaan Kabel Wayar Keluli',
      'SOP Komunikasi Bahasa Isyarat Rigging',
      'Pelan Pengangkatan Beban Kritikal (Lift Plan)'
    ],
    email: 'ridzuan.hashim@rigging-safety.my',
    phone: '+60 11-409 6633',
    featured: false,
    projectsCount: 16,
    socials: { linkedin: 'https://linkedin.com/in/ridzuan-hashim-rigger' }
  },
  {
    id: 't42',
    name: 'Stephanie Ng',
    title: 'Arkitek API & Reka Bentuk Seni Bina Microservices',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    bio: 'Membimbing pembangun perisian membina API yang selamat, berskala tinggi, dan mudah berintegrasi menggunakan ekosistem GraphQL dan REST.',
    rating: 4.89,
    experience: '9 Tahun',
    certifications: [
      'AWS Certified Developer - Associate',
      'Red Hat Certified Specialist in API Management'
    ],
    skills: [
      'Reka Bentuk API GraphQL & REST',
      'Kawalan Akses Selamat API Gateway & OAuth2',
      'Sistem Mesej Asynchronous (RabbitMQ/Kafka)',
      'Sistem Caching Berprestasi Tinggi Guna Redis'
    ],
    email: 'stephanie.ng@api-craft.my',
    phone: '+60 17-405 2200',
    featured: false,
    projectsCount: 19,
    socials: { linkedin: 'https://linkedin.com/in/stephanie-ng-api' }
  },
  {
    id: 't43',
    name: 'Daniel Haikal Bin Yusuf',
    title: 'Pakar Pengurusan Projek PMP & Agile Practitioner',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400',
    bio: 'Membantu organisasi melancarkan pengurusan projek berskala besar mengikut standard PMI bagi mengelakkan limpahan kos (budget overrun).',
    rating: 4.94,
    experience: '13 Tahun',
    certifications: [
      'Project Management Professional (PMP) - PMI',
      'Certified Scrum Product Owner (CSPO)'
    ],
    skills: [
      'Strategi Pengurusan Skop & Kos Projek',
      'Penganalisaan Laluan Kritikal (CPM)',
      'Aplikasi Perisian MS Project & Jira',
      'Strategi Rundingan Bersama Pihak Taruh'
    ],
    email: 'daniel.haikal@project-pmp.my',
    phone: '+60 12-805 1199',
    featured: true,
    projectsCount: 30,
    socials: { linkedin: 'https://linkedin.com/in/daniel-haikal-pmp' }
  },
  {
    id: 't44',
    name: 'Kavitha Raman',
    title: 'Jurulatih Keselamatan Makanan & Pematuhan HACCP',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=400',
    bio: 'Pakar audit kebersihan makanan yang melatih hotel, restoran, dan loji pemprosesan makanan mematuhi akreditasi GMP dan HACCP.',
    rating: 4.85,
    experience: '10 Tahun',
    certifications: [
      'Registered HACCP Auditor & Lead Assessor',
      'Kementerian Kesihatan Malaysia Certified Food Handler Trainer'
    ],
    skills: [
      'Sistem Analisis Hazard Makanan (HACCP)',
      'SOP Amalan Kebersihan Baik (GMP)',
      'Prosedur Nyahkuman Kawalan Patogen',
      'Audit Kebersihan Premis Makanan'
    ],
    email: 'kavitha.raman@food-safety.my',
    phone: '+60 14-405 3322',
    featured: false,
    projectsCount: 18,
    socials: { linkedin: 'https://linkedin.com/in/kavitha-raman-haccp' }
  },
  {
    id: 't45',
    name: 'Benjamin Lau',
    title: 'Pakar Pembangunan Enjin Permainan Unity & Realiti Maya (VR)',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Merekabentuk aplikasi simulasi latihan maya VR untuk industri pertahanan dan pembedahan perubatan menggunakan Unity.',
    rating: 4.92,
    experience: '8 Tahun',
    certifications: [
      'Unity Certified Programmer - Expert',
      'Unreal Engine Certified Technical Artist'
    ],
    skills: [
      'Pembangunan Kod C# Unity Engine',
      'Reka Bentuk Grafik VR & AR Mudah Alih',
      'Sistem Fizik 3D Enjin Permainan',
      'Optimasi Rendering Grafik Masa Nyata'
    ],
    email: 'benjamin.lau@game-dev.asia',
    phone: '+60 16-550 8822',
    featured: false,
    projectsCount: 16,
    socials: { linkedin: 'https://linkedin.com/in/benjamin-lau-vr' }
  },
  {
    id: 't46',
    name: 'Nadia Binti Sulaiman',
    title: 'Jurulatih Penjenamaan Peribadi Eksekutif di LinkedIn',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: 'Membimbing para pemimpin korporat membina kewibawaan industri (thought leadership) menerusi penulisan artikel berimpak.',
    rating: 4.87,
    experience: '8 Tahun',
    certifications: [
      'Certified Brand Strategist - Brand Academy',
      'HRD Corp Accredited Professional Trainer'
    ],
    skills: [
      'Seni Reka Profil LinkedIn Menarik',
      'Strategi Pengedaran Kandungan Viral',
      'Teknik Menulis Artikel Thought Leadership',
      'Strategi Membina Jaringan Korporat'
    ],
    email: 'nadia.sulaiman@brand-coach.my',
    phone: '+60 18-302 7744',
    featured: false,
    projectsCount: 14,
    socials: { linkedin: 'https://linkedin.com/in/nadia-sulaiman-brand' }
  },
  {
    id: 't47',
    name: 'Dr. Shahril Bin Ahmad',
    title: 'Pakar Kawalan Tadbir Urus Data & Privasi PDPA',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    bio: 'Membimbing syarikat awam mematuhi Akta Perlindungan Data Peribadi (PDPA) Malaysia menerusi polisi penyimpanan data selamat.',
    rating: 4.93,
    experience: '13 Tahun',
    certifications: [
      'Certified Information Privacy Manager (CIPM)',
      'PDPA Malaysia Compliance Auditor Certificate'
    ],
    skills: [
      'Penyusunan Polisi Privasi Data PDPA',
      'Audit Aliran Simpanan Data Sensitif',
      'SOP Tindak Balas Kebocoran Maklumat',
      'Tadbir Urus Data Komprehensif (Governance)'
    ],
    email: 'shahril.ahmad@data-privacy.my',
    phone: '+60 12-402 3388',
    featured: true,
    projectsCount: 28,
    socials: { linkedin: 'https://linkedin.com/in/dr-shahril-ahmad-privacy' }
  },
  {
    id: 't48',
    name: 'Jason Chong Wei',
    title: 'Pakar Pengurusan Kebisingan Industri & DOSH Hearing',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    bio: 'Menjalankan pemantauan pendedahan bunyi bising di kilang dan membina program pemeliharaan pendengaran bagi mengelakkan kecederaan telinga pekerja.',
    rating: 4.84,
    experience: '10 Tahun',
    certifications: [
      'DOSH Registered Noise Competent Person',
      'Certified Hearing Conservationist Instructor'
    ],
    skills: [
      'Pengukuran Kebisingan Tapak (Noise Mapping)',
      'Pengiraan Dos Bunyi Bising Pekerja',
      'Pemilihan Penyumbat Telinga (Earplug SOP)',
      'Sesi Audiometric Test Analysis'
    ],
    email: 'jason.chong@noise-control.my',
    phone: '+60 16-330 4455',
    featured: false,
    projectsCount: 15,
    socials: { linkedin: 'https://linkedin.com/in/jason-chong-noise' }
  },
  {
    id: 't49',
    name: 'Sofia Binti Khalid',
    title: 'Jurulatih Kepelbagaian, Ekuiti & Keterangkuman (DEI)',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    bio: 'Membantu organisasi membina dasar tempat kerja yang inklusif, menghormati perbezaan latar belakang, serta mencegah bias kognitif.',
    rating: 4.86,
    experience: '9 Tahun',
    certifications: [
      'Certified Diversity Executive (CDE)',
      'HRD Corp Certified Professional Trainer'
    ],
    skills: [
      'Pencegahan Unconscious Bias Kerja',
      'Seni Reka Polisi Syarikat Mesra Ibu',
      'Teknik Dialog Terbuka Kepelbagaian',
      'Audit Budaya Keterangkuman Korporat'
    ],
    email: 'sofia.khalid@dei-consulting.my',
    phone: '+60 19-331 4400',
    featured: false,
    projectsCount: 19,
    socials: { linkedin: 'https://linkedin.com/in/sofia-khalid-dei' }
  },
  {
    id: 't50',
    name: 'Ir. Tan Kah Seng',
    title: 'Pakar Keselamatan Dandang Voltan Tinggi & Bejana Tekanan',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=400',
    bio: 'Jurutera Profesional Kanan yang melatih pengendali dandang (boiler) untuk beroperasi di bawah parameter selamat demi mencegah letupan stim.',
    rating: 4.96,
    experience: '22 Tahun',
    certifications: [
      'Board of Engineers Malaysia Registered Professional Engineer',
      'DOSH Certified Steam Boiler Competent Engineer'
    ],
    skills: [
      'Pemeriksaan Integriti Bejana Tekanan',
      'Analisis Suhu & Aliran Stim Dandang',
      'SOP Ujian Tekanan Hidrostatik (Hydrotest)',
      'Pelan Tindakan Kecemasan Letupan Stim'
    ],
    email: 'kahseng.tan@steam-boiler.com',
    phone: '+60 12-302 9900',
    featured: true,
    projectsCount: 48,
    socials: { linkedin: 'https://linkedin.com/in/ir-tan-kah-seng' }
  },
  {
    id: 't51',
    name: 'Khairy Jamaluddin Bin Abu Bakar',
    title: 'Pakar Komunikasi Awam & Strategi Reputasi Media',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    bio: 'Menyediakan bimbingan strategik untuk pengurusan krisis reputasi, penjenamaan korporat berimpak tinggi, dan seni memujuk khalayak ramai menerusi media massa.',
    rating: 4.95,
    experience: '15 Tahun',
    certifications: [
      'Masters in Legal and Political Theory (UCL)',
      'Accredited Public Relations Practitioner (IPRM)'
    ],
    skills: [
      'Pengurusan Krisis & Reputasi Jenama',
      'Teknik Penyampaian Mesej Awam',
      'Rangka Kerja Komunikasi Strategik',
      'Seni Pengaruh Media Sosial Korporat'
    ],
    email: 'khairy.kj@reputation-strategy.my',
    phone: '+60 12-333 4400',
    featured: true,
    projectsCount: 37,
    socials: { linkedin: 'https://linkedin.com/in/khairy-kj-reputation' }
  },
  {
    id: 't52',
    name: 'Sharifah Aminah Al-Haddad',
    title: 'Pakar Keselamatan Kimia Makmal & Toksikologi',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    bio: 'Membimbing makmal universiti dan industri kimia dalam mematuhi peraturan CLASS dan SOP pengendalian sisa toksik berjadual bagi mengelakkan kemalangan kimia.',
    rating: 4.88,
    experience: '11 Tahun',
    certifications: [
      'DOSH Certified Chemical Safety Officer',
      'Registered Toxicologist - Malaysian Society of Toxicology'
    ],
    skills: [
      'Penyediaan Risalah Data Keselamatan (SDS)',
      'SOP Penyimpanan Bahan Kimia Bahaya',
      'Pelan Tindakan Tumpahan Kimia (Spill Kit)',
      'Audit Pematuhan Peraturan CLASS 2013'
    ],
    email: 'sharifah.aminah@chemical-safety.my',
    phone: '+60 19-332 1199',
    featured: false,
    projectsCount: 22,
    socials: { linkedin: 'https://linkedin.com/in/sharifah-aminah-toxicology' }
  },
  {
    id: 't53',
    name: 'Dr. Raymond Wong Shian Yang',
    title: 'Pakar Kontrak Pintar Solidity & Audit Keselamatan Web3',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Pakar penyelidik rantaian blok yang melatih pasukan teknologi kewangan (FinTech) untuk membina, menguji, dan mengaudit kontrak pintar Solidity kalis serangan siber.',
    rating: 4.93,
    experience: '8 Tahun',
    certifications: [
      'Certified Blockchain Solutions Architect (CBSA)',
      'Ethereum Certified Solidity Developer'
    ],
    skills: [
      'Pembangunan Smart Contract Solidity',
      'Audit Kerentanan Protokol DeFi',
      'Integrasi Web3 Guna Ethers.js',
      'Seni Reka Tokenomics & DApps'
    ],
    email: 'raymond.wong@web3-audit.org',
    phone: '+60 17-601 5522',
    featured: false,
    projectsCount: 19,
    socials: { linkedin: 'https://linkedin.com/in/dr-raymond-wong-web3' }
  },
  {
    id: 't54',
    name: 'Amran Bin Othman',
    title: 'Jurulatih Kanan Keselamatan Bekerja Di Ruang Terkurung',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    bio: 'Menawarkan latihan teori dan simulasi amali bekerja di dalam pembetung, tangki minyak, dan silo secara selamat mengikut piawaian ketat DOSH.',
    rating: 4.87,
    experience: '14 Tahun',
    certifications: [
      'DOSH Certified Confined Space Authorized Entrant',
      'Certified Gas Tester & Entry Supervisor'
    ],
    skills: [
      'Pengukuran Gas Beracun Ruang Terkurung',
      'SOP Sistem Permit Bekerja (PTW)',
      'Pelan Menyelamat Kecemasan (Rescue Plan)',
      'Peralatan Bantuan Pernafasan (SCBA)'
    ],
    email: 'amran.othman@confinedspace.my',
    phone: '+60 13-205 1122',
    featured: false,
    projectsCount: 26,
    socials: { linkedin: 'https://linkedin.com/in/amran-othman-safety' }
  },
  {
    id: 't55',
    name: 'Zetty Akhtar Binti Mansor',
    title: 'Pakar Motivasi & Kesejahteraan Mental Korporat',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    bio: 'Membantu organisasi mengatasi keletihan mental pekerja (burnout) melalui terapi minda, latihan kesedaran (mindfulness), dan komunikasi positif.',
    rating: 4.89,
    experience: '10 Tahun',
    certifications: [
      'Licensed Professional Counselor (LKM)',
      'Certified Employee Assistance Coach (CEAP)'
    ],
    skills: [
      'Pengurusan Stress & Burnout Pekerja',
      'Terapi Minda & Teknik Relaksasi',
      'Seni Bina Ruang Kerja Mesra Emosi',
      'Komunikasi Empati & Psikologi Tempat Kerja'
    ],
    email: 'zetty.akhtar@mind-well.my',
    phone: '+60 11-209 7788',
    featured: false,
    projectsCount: 23,
    socials: { linkedin: 'https://linkedin.com/in/zetty-akhtar-counselor' }
  },
  {
    id: 't56',
    name: 'Michael Chang Kok Wah',
    title: 'Jurutera Rangkaian Awan Kanan AWS & Cisco CCIE',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=400',
    bio: 'Menyediakan latihan konfigurasi penghalaan lanjutan untuk rangkaian korporat berskala multi-nasional menggunakan hibrid awan AWS dan Cisco Enterprise.',
    rating: 4.96,
    experience: '16 Tahun',
    certifications: [
      'Cisco Certified Internetwork Expert (CCIE #18423)',
      'AWS Certified Advanced Networking - Specialty'
    ],
    skills: [
      'Reka Bentuk Rangkaian Hibrid BGP & OSPF',
      'Konfigurasi VPN Ipsec & AWS Direct Connect',
      'Penyelesaian Masalah Paket Lanjutan (Wireshark)',
      'Seni Reka Transit Gateway & SD-WAN'
    ],
    email: 'michael.chang@network-pro.com',
    phone: '+60 16-202 5599',
    featured: true,
    projectsCount: 45,
    socials: { linkedin: 'https://linkedin.com/in/michael-chang-ccie' }
  },
  {
    id: 't57',
    name: 'Nurul Nadiah Binti Ramli',
    title: 'Perunding Pengurusan Sisa Berjadual (Scheduled Waste)',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a131fed10495?auto=format&fit=crop&q=80&w=400',
    bio: 'Membimbing syarikat pembuatan melabel, menyimpan, dan melupuskan sisa kimia berbahaya mengikut Akta Kualiti Alam Sekeliling 1974.',
    rating: 4.84,
    experience: '9 Tahun',
    certifications: [
      'DOE Certified Environmental Professional in Scheduled Waste Management (CePSWaM)',
      'Environmental Auditor Registered with DOE'
    ],
    skills: [
      'Pelabelan Kod Sisa Berjadual (SW)',
      'SOP Sistem Penyimpanan Buangan Bermutu',
      'Pengurusan Pangkalan Data e-Consignment Note',
      'Pencegahan Pencemaran Air & Udara Kilang'
    ],
    email: 'nadiah.ramli@scheduled-waste.my',
    phone: '+60 18-403 9988',
    featured: false,
    projectsCount: 18,
    socials: { linkedin: 'https://linkedin.com/in/nadiah-ramli-cepswam' }
  },
  {
    id: 't58',
    name: 'Arun Kumar Subramaniam',
    title: 'Pakar Pembangunan Flutter & Integrasi AI Generatif',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400',
    bio: 'Melatih pembangun membina aplikasi mudah alih Android & iOS berprestasi tinggi berasaskan Flutter, digabungkan dengan API pintar Gemini AI.',
    rating: 4.91,
    experience: '8 Tahun',
    certifications: [
      'Google Certified Associate Android Developer',
      'Flutter Professional Developer Certificate'
    ],
    skills: [
      'Pembangunan Flutter & Dart Lanjutan',
      'Pengurusan State Bloc / Riverpod',
      'Integrasi API Gemini & Kecerdasan Buatan',
      'Pengoptimuman Memori Aplikasi Mudah Alih'
    ],
    email: 'arun.kumar@flutter-ai.dev',
    phone: '+60 14-301 2244',
    featured: false,
    projectsCount: 24,
    socials: { linkedin: 'https://linkedin.com/in/arun-kumar-flutter' }
  },
  {
    id: 't59',
    name: 'Siti Balkish Binti Yusof',
    title: 'Jurulatih Bahasa Melayu Komunikasi & Protokol Istana',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400',
    bio: 'Menawarkan latihan bertutur secara santun, penulisan surat rasmi berkepentingan tinggi, serta pematuhan protokol majlis bagi jabatan kerajaan dan PKS.',
    rating: 4.86,
    experience: '13 Tahun',
    certifications: [
      'Sijil Kecekapan Bahasa Melayu Tinggi (DBP)',
      'Professional Protocol and Etiquette Specialist Accreditation'
    ],
    skills: [
      'Seni Bahasa Santun & Tatatertib Pengucapan',
      'Format Penulisan Surat Rasmi Kerajaan',
      'SOP Protokol Majlis & Kedudukan Kerusi',
      'Latihan Pengacaraan Majlis (MC Training)'
    ],
    email: 'siti.balkish@melayu-tinggi.edu.my',
    phone: '+60 13-908 1133',
    featured: false,
    projectsCount: 20,
    socials: { linkedin: 'https://linkedin.com/in/siti-balkish-yusof' }
  },
  {
    id: 't60',
    name: 'Dr. Lim Wei Jun',
    title: 'Pakar Sistem Embedded & IoT Mikro-Pengawal',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    bio: 'Membimbing jurutera elektronik membina sistem embedded kuasa rendah, menulis pemacu peranti C/C++ mikro-pengawal ARM Cortex.',
    rating: 4.94,
    experience: '12 Tahun',
    certifications: [
      'ARM Accredited Engineer (AAE)',
      'Embedded Systems Design Specialist (IEEE)'
    ],
    skills: [
      'Pengaturcaraan C/C++ Embedded',
      'Reka Bentuk RTOS (FreeRTOS) Lanjutan',
      'Protokol I2C, SPI, UART, & CAN Bus',
      'Seni Reka Skematik PCB Guna Altium'
    ],
    email: 'weijun.lim@embedded-tech.my',
    phone: '+60 17-302 4499',
    featured: false,
    projectsCount: 29,
    socials: { linkedin: 'https://linkedin.com/in/dr-lim-weijun-embedded' }
  },
  {
    id: 't61',
    name: 'Faris Bin Daniel',
    title: 'Penyelia Keselamatan Tapak Bina Tahap Lanjutan',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    bio: 'Melatih penyelia tapak bina mengesan punca runtuhan struktur, mengawal keselamatan kren menara (tower crane), serta mematuhi Garis Panduan CIDB.',
    rating: 4.82,
    experience: '10 Tahun',
    certifications: [
      'DOSH Registered Site Safety Supervisor (SSS)',
      'CIDB Green Card Safety Trainer Accreditation'
    ],
    skills: [
      'Pemeriksaan Perancah & Acuan Struktur',
      'Zon Operasi Selamat Kren Menara',
      'Latihan HIRARC Tapak Bina Kompleks',
      'SOP Sistem Jaring Pengaman (Safety Nets)'
    ],
    email: 'faris.daniel@construction-safety.org',
    phone: '+60 12-409 2211',
    featured: false,
    projectsCount: 15,
    socials: { linkedin: 'https://linkedin.com/in/faris-daniel-site' }
  },
  {
    id: 't62',
    name: 'Leila Tan Siew Ling',
    title: 'Jurulatih Kanan Seni Kreatif UI/UX & Figma',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: 'Mengajar pembinaan kerangka laman web yang menarik dengan kebolehgunaan tinggi menerusi amalan reka bentuk emosi (emotional design).',
    rating: 4.89,
    experience: '9 Tahun',
    certifications: [
      'Google UX Design Professional Certificate',
      'Figma Verified Advanced Design Specialist'
    ],
    skills: [
      'Seni Visual & Tipografi Digital Figma',
      'Reka Bentuk Responsif Grid & Flexbox',
      'Pembinaan Komponen Auto Layout Lanjutan',
      'Ujian Prototaip Pengguna Berfokus'
    ],
    email: 'leila.tan@uiux-creative.my',
    phone: '+60 18-202 1144',
    featured: false,
    projectsCount: 21,
    socials: { linkedin: 'https://linkedin.com/in/leila-tan-figma' }
  },
  {
    id: 't63',
    name: 'Rosli Bin Md Nor',
    title: 'Jurulatih Keselamatan Fizikal & Pertahanan Diri Korporat',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    bio: 'Bekas jurulatih unit elit, menawarkan taktik mengurus ancaman keganasan fizikal, penculikan, serta latihan tindak balas aktif di pejabat.',
    rating: 4.93,
    experience: '18 Tahun',
    certifications: [
      'Certified Bodyguard & Protection Specialist',
      'International Martial Arts Federation Black Belt 5th Dan'
    ],
    skills: [
      'Taktik Mengelak Serangan Fizikal',
      'SOP Kawalan Pengawal Keselamatan',
      'Latihan Simulasi Serangan Aktif (Active Threat)',
      'Seni Reka Sistem Keselamatan Pintar'
    ],
    email: 'rosli.mdnor@corp-protection.my',
    phone: '+60 11-402 3344',
    featured: false,
    projectsCount: 31,
    socials: { linkedin: 'https://linkedin.com/in/rosli-mdnor-security' }
  },
  {
    id: 't64',
    name: 'Farah Nabilah Binti Ridzuan',
    title: 'Perunding Hubungan Pekerja & Akta Mahkamah Perusahaan',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    bio: 'Membimbing pengurus sumber manusia mengendalikan pemecatan pekerja yang mematuhi lunas undang-undang tanpa risiko saman di Mahkamah Perusahaan.',
    rating: 4.87,
    experience: '10 Tahun',
    certifications: [
      'Postgraduate Diploma in Industrial Relations (UM)',
      'MIPM Registered HR Consultant'
    ],
    skills: [
      'Prosedur Siasatan Dalaman (DI) Patuh SOP',
      'Penggubalan Surat Tunjuk Sebab (Show Cause)',
      'Pengendalian Pemberhentian Skema VSS',
      'SOP Perundingan Perjanjian Kolektif (CA)'
    ],
    email: 'farah.nabilah@industrial-relations.my',
    phone: '+60 13-305 4422',
    featured: false,
    projectsCount: 16,
    socials: { linkedin: 'https://linkedin.com/in/farah-nabilah-ir' }
  },
  {
    id: 't65',
    name: 'Goh Chee Seng',
    title: 'Pakar Automasi Power Automate & Microsoft Power Apps',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Membantu organisasi mendigitalkan borang manual dan membina aplikasi kelulusan automatik dalam ekosistem Microsoft 365 tanpa kod yang panjang.',
    rating: 4.9,
    experience: '8 Tahun',
    certifications: [
      'Microsoft Certified: Power Platform App Maker Associate',
      'Microsoft Certified: Power Platform Functional Consultant'
    ],
    skills: [
      'Seni Reka Borang Guna Power Apps',
      'Automasi Aliran Kelulusan Guna Power Automate',
      'Integrasi Data SharePoint & Dataverse',
      'Seni Reka Dashboard Aliran Kerja'
    ],
    email: 'cheeseng.goh@office-automations.com',
    phone: '+60 17-603 8811',
    featured: false,
    projectsCount: 22,
    socials: { linkedin: 'https://linkedin.com/in/goh-chee-seng-powerplatform' }
  },
  {
    id: 't66',
    name: 'Balqis Binti Ahmad Syah',
    title: 'Pakar Kesedaran Kebersihan & Sanitasi Premis Korporat',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    bio: 'Menawarkan modul pembersihan mendalam (deep cleaning) dan sanitasi patogen bawaan udara serta air untuk keselamatan premis pejabat dan hotel.',
    rating: 4.81,
    experience: '7 Tahun',
    certifications: [
      'Certified Indoor Air Quality Specialist (IQ)',
      'Registered Hygiene Practitioner - Malaysian Industrial Hygiene'
    ],
    skills: [
      'SOP Nyahkuman Bakteria & Virus',
      'Pemeriksaan Sistem Pengudarahan Pejabat',
      'Pengurusan Sisa Sisa Biologi Pejabat',
      'Pemantauan Habuk Udara Amali (Indoor Air)'
    ],
    email: 'balqis.ahmad@hygiene-sanitation.my',
    phone: '+60 11-309 6677',
    featured: false,
    projectsCount: 12,
    socials: { linkedin: 'https://linkedin.com/in/balqis-ahmad-hygiene' }
  },
  {
    id: 't67',
    name: 'Prem Dev Raman',
    title: 'Jurulatih Pembangunan Diri & Kemahiran Menjawab Temubual',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    bio: 'Pakar kaunseling kerjaya yang melatih graduan baru dan profesional membina resume visual berimpak serta kemahiran temubual bertaraf dunia.',
    rating: 4.85,
    experience: '10 Tahun',
    certifications: [
      'Certified Career Services Provider (CCSP)',
      'HRD Corp Accredited Professional Trainer'
    ],
    skills: [
      'Teknik Menjawab Soalan Temubual Sulit',
      'Penyusunan Resume Mesra ATS (Applicant Tracking)',
      'Bahasa Tubuh & Karisma Temubual Maya',
      'Strategi Mempromosikan Nilai Bakat (Personal Pitch)'
    ],
    email: 'prem.dev@career-accelerators.org',
    phone: '+60 12-401 5599',
    featured: false,
    projectsCount: 17,
    socials: { linkedin: 'https://linkedin.com/in/prem-dev-career' }
  },
  {
    id: 't68',
    name: 'Aizat Bin Syazwan',
    title: 'Pakar Pengaturcaraan Rust & Sistem Keselamatan Memori',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400',
    bio: 'Membimbing pembangun sistem beralih dari C++ ke Rust guna membina perisian berprestasi tinggi yang kalis kebocoran memori (memory safety).',
    rating: 4.92,
    experience: '9 Tahun',
    certifications: [
      'Certified Rust Professional Systems Developer',
      'CompTIA Linux+ Certified Professional'
    ],
    skills: [
      'Konsep Pemilikan & Peminjaman Memori Rust',
      'Pembangunan Multithreading Selamat Rust',
      'Penyediaan API Berprestasi Tinggi (Actix-web)',
      'Seni Reka Sistem Fail Berprestasi Tinggi'
    ],
    email: 'aizat.syazwan@rust-architect.my',
    phone: '+60 13-605 2200',
    featured: false,
    projectsCount: 20,
    socials: { linkedin: 'https://linkedin.com/in/aizat-syazwan-rust' }
  },
  {
    id: 't69',
    name: 'Dr. Noraishah Daud',
    title: 'Pakar Reka Bentuk Pengajaran & Penyusunan Kurikulum',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    bio: 'Membimbing para pendidik korporat menstruktur modul latihan agar interaktif, mudah diingati, serta mematuhi Model ADDIE.',
    rating: 4.9,
    experience: '14 Tahun',
    certifications: [
      'Doctor of Education in Instructional Technology',
      'Certified Training Needs Analyst (TNA) Professional'
    ],
    skills: [
      'Analisis Keperluan Latihan Syarikat (TNA)',
      'Seni Reka Kurikulum Guna Model ADDIE',
      'Penyediaan Aktiviti Latihan Aktif (Gamification)',
      'Penilaian Keberkesanan Latihan Model Kirkpatrick'
    ],
    email: 'noraishah.daud@curriculum-design.my',
    phone: '+60 19-301 7722',
    featured: false,
    projectsCount: 34,
    socials: { linkedin: 'https://linkedin.com/in/dr-noraishah-daud' }
  },
  {
    id: 't70',
    name: 'Tan Sri Dr. Ling Kok Wing',
    title: 'Perunding Komunikasi Krisis Jenama & Perhubungan Awam',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    bio: 'Menawarkan kepakaran strategik tahap tertinggi untuk mengemudi kempen penjenamaan nasional, perhubungan awam peringkat menteri, dan komunikasi krisis parah.',
    rating: 4.97,
    experience: '25 Tahun',
    certifications: [
      'Honorary Doctorate in Global Brand Communication',
      'Fellow of the Institute of Public Relations Malaysia (IPRM)'
    ],
    skills: [
      'Strategi Komunikasi Politik & Awam',
      'Pengurusan Isu Kritikal & Kempen Boikot',
      'Seni Membina Naratif Jenama Kebangsaan',
      'Perhubungan Media Antarabangsa & Sidang Akhbar'
    ],
    email: 'kokwing.ling@strategic-brands.org',
    phone: '+60 12-200 9900',
    featured: true,
    projectsCount: 52,
    socials: { linkedin: 'https://linkedin.com/in/tan-sri-ling-kok-wing' }
  },
  {
    id: 't71',
    name: 'Zulkifli Bin Jamil',
    title: 'Jurulatih Operasi Isyarat Rigging & Slinging',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    bio: 'Melatih juru-isyarat (signalman) menyelaraskan isyarat tangan dan radio dengan pemandu kren berat demi memastikan muatan diangkat tanpa insiden.',
    rating: 4.83,
    experience: '12 Tahun',
    certifications: [
      'DOSH Certified Signalman & Rigger',
      'Heavy Lifting Equipment Safety Assessor Accreditation'
    ],
    skills: [
      'Kod Isyarat Tangan Antarabangsa Kren',
      'Pengukuran Sudut Tali Sling & Beban',
      'Pemeriksaan Shackle & Cangkuk Kren',
      'Pelan Pengangkatan Berisiko Tinggi (Rigging)'
    ],
    email: 'zulkifli.jamil@heavy-lifts.my',
    phone: '+60 11-409 7788',
    featured: false,
    projectsCount: 19,
    socials: { linkedin: 'https://linkedin.com/in/zulkifli-jamil-rigger' }
  },
  {
    id: 't72',
    name: 'Esther Lau Wei Yee',
    title: 'Pembangun Aplikasi React Native & TypeScript',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    bio: 'Pakar pengekodan hibrid mudah alih yang membantu startup membina aplikasi yang pantas, stabil, dan selamat menggunakan kod asas tunggal React Native.',
    rating: 4.9,
    experience: '7 Tahun',
    certifications: [
      'Certified React Native Professional Developer',
      'Microsoft Certified: Azure Developer Associate'
    ],
    skills: [
      'Pembangunan Native Modules C++ & Java',
      'Seni Reka TypeScript Berdaya Taing Tinggi',
      'Pengoptimuman Animasi Reanimated Lanjutan',
      'Integrasi Pihak Ketiga Guna Axios & Redux'
    ],
    email: 'esther.lau@hybrid-dev.my',
    phone: '+60 18-305 2211',
    featured: false,
    projectsCount: 18,
    socials: { linkedin: 'https://linkedin.com/in/esther-lau-react' }
  },
  {
    id: 't73',
    name: 'Mimi Roziana Binti Kassim',
    title: 'Pakar Kesejahteraan Suara & Teknik Pengucapan Profesional',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a131fed10495?auto=format&fit=crop&q=80&w=400',
    bio: 'Melatih pensyarah, penyiar radio, dan pengurus korporat mengekalkan stamina suara, menggunakan intonasi yang betul, serta mengelakkan kerosakan peti suara.',
    rating: 4.88,
    experience: '11 Tahun',
    certifications: [
      'Certified Vocal Coach - London College of Music',
      'Speech-Language Therapist Registered with MMC'
    ],
    skills: [
      'Teknik Pernafasan Diagfragma Suara',
      'Pencegahan Kecederaan Peti Suara (Vocal Nodes)',
      'Seni Penyampaian Intonasi Persuasif',
      'Kawalan Penyebutan Aksen & Artikulasi'
    ],
    email: 'mimi.roziana@vocal-coaching.my',
    phone: '+60 13-902 4433',
    featured: false,
    projectsCount: 24,
    socials: { linkedin: 'https://linkedin.com/in/mimi-roziana-voice' }
  },
  {
    id: 't74',
    name: 'Sanjeev Singh Gill',
    title: 'Pakar Pentadbir Pangkalan Data Oracle & PostgreSQL',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    bio: 'Menawarkan khidmat latihan lanjutan penalaan pertanyaan SQL bagi mengelakkan kebuntuan pangkalan data (deadlocks) di sektor perbankan.',
    rating: 4.95,
    experience: '14 Tahun',
    certifications: [
      'Oracle Certified Master (OCM) DBA',
      'PostgreSQL Certified Database Administrator'
    ],
    skills: [
      'Analisis Pelan Pelaksanaan SQL (Query Tuning)',
      'Konfigurasi PostgreSQL High-Availability',
      'Pemberian Keizinan & Sistem Keselamatan Audit Data',
      'SOP Migrasi Pangkalan Data Tanpa Downtime'
    ],
    email: 'sanjeev.singh@database-pro.com',
    phone: '+60 12-402 1155',
    featured: false,
    projectsCount: 39,
    socials: { linkedin: 'https://linkedin.com/in/sanjeev-singh-dba' }
  },
  {
    id: 't75',
    name: 'Fatimah Zahrah Binti Roslan',
    title: 'Perunding Kesihatan Pekerja & Pencegahan Stress',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    bio: 'Melatih jawatankuasa keselamatan merangka polisi kesihatan mental tempat kerja dan membina program sokongan rakan sebaya (peer-support).',
    rating: 4.84,
    experience: '8 Tahun',
    certifications: [
      'DOSH Registered Occupational Health Professional',
      'Mental Health First Aid Instructor (Australia)'
    ],
    skills: [
      'Pengurusan Psikososial Risiko Tempat Kerja',
      'Latihan Pertolongan Cemas Kesihatan Mental',
      'Penyediaan Polisi Mesra Pekerja Sakit Kronik',
      'SOP Sesi Sokongan Kaunseling Kelompok'
    ],
    email: 'fatimah.zahrah@health-occupational.org',
    phone: '+60 19-331 5588',
    featured: false,
    projectsCount: 15,
    socials: { linkedin: 'https://linkedin.com/in/fatimah-zahrah-occupational' }
  },
  {
    id: 't76',
    name: 'Mohd Shahrul Bin Jabar',
    title: 'Pakar Pemanduan Defensif Ambulans & Jentera Kecemasan',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400',
    bio: 'Pakar pemandu kereta kecemasan bertauliah, melatih paramedik memandu dalam keadaan kelajuan tinggi meredasi trafik sesak dengan selamat.',
    rating: 4.91,
    experience: '12 Tahun',
    certifications: [
      'Certified Emergency Vehicle Operator Instructor (USA)',
      'Malaysia Road Safety Research Institute Accredited Trainer'
    ],
    skills: [
      'Pemanduan Laju Sudut Sempit & Elakan Hazard',
      'SOP Bunyi Siren & Isyarat Amaran Ambulans',
      'Keseimbangan Kereta Berat Semasa Membelok',
      'Teknik Pemanduan Kalis Stress & Panik'
    ],
    email: 'shahrul.jabar@ambulance-defensive.my',
    phone: '+60 13-702 4433',
    featured: false,
    projectsCount: 28,
    socials: { linkedin: 'https://linkedin.com/in/shahrul-jabar-defensive' }
  },
  {
    id: 't77',
    name: 'Wong Siew Kee',
    title: 'Pakar Pemasaran Enjin Carian & Analitis Web',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    bio: 'Membimbing jenama e-commerce meningkatkan kedudukan carian Google organik (SEO) dan menguruskan belanjawan Google Ads untuk pulangan maksimum.',
    rating: 4.83,
    experience: '10 Tahun',
    certifications: [
      'Google Certified Advanced Search Specialist',
      'HubSpot Certified Content Marketing Specialist'
    ],
    skills: [
      'Audit Enjin Carian Teknikal (Technical SEO)',
      'Penyelidikan Kata Kunci Berkonversi Tinggi',
      'Reka Bentuk Strategi Bidaan Google Ads (PPC)',
      'Analisis Corong Jualan Guna Google Analytics 4'
    ],
    email: 'siewkee.wong@seo-consulting.my',
    phone: '+60 18-304 9922',
    featured: false,
    projectsCount: 23,
    socials: { linkedin: 'https://linkedin.com/in/wong-siew-kee-seo' }
  },
  {
    id: 't78',
    name: 'Syed Alwi Bin Al-Kaf',
    title: 'Jurulatih Rangkaian Komputer & Cyber Security',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Mengajar asas pembinaan rangkaian komputer bertaraf CISCO dan kaedah pertahanan siber bagi mengelakkan pencerobohan berniat jahat.',
    rating: 4.88,
    experience: '11 Tahun',
    certifications: [
      'Cisco Certified Network Associate (CCNA)',
      'CompTIA Security+ Certified Professional'
    ],
    skills: [
      'Konfigurasi Suis L2/L3 & VLAN',
      'Sistem Keselamatan Firewall PFSense',
      'Penyelesaian Masalah Sambungan Rangkaian',
      'SOP Pencegahan Pencerobohan Rangkaian'
    ],
    email: 'syed.alwi@network-security.my',
    phone: '+60 11-403 2211',
    featured: false,
    projectsCount: 17,
    socials: { linkedin: 'https://linkedin.com/in/syed-alwi-alkaf' }
  },
  {
    id: 't79',
    name: 'Kamaruddin Bin Omar',
    title: 'Jurulatih Disiplin Pasukan & Kepimpinan Kem Tentera',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    bio: 'Bekas pegawai tinggi Angkatan Tentera Malaysia, menawarkan pembinaan jati diri pasukan korporat menerusi modul kem latihan luar yang mencabar.',
    rating: 4.94,
    experience: '20 Tahun',
    certifications: [
      'ATM Retired Leadership Excellence Award',
      'Certified Outward Bound Leadership Instructor'
    ],
    skills: [
      'Latihan Jati Diri & Semangat Setia Kawan',
      'Komunikasi Berdisiplin Di Bawah Tekanan',
      'SOP Latihan Fizikal Luar Yang Selamat',
      'Seni Reka Sesi Pembinaan Kumpulan (Team Building)'
    ],
    email: 'kamaruddin.omar@teambuild-army.my',
    phone: '+60 12-302 4411',
    featured: false,
    projectsCount: 38,
    socials: { linkedin: 'https://linkedin.com/in/kamaruddin-omar-leadership' }
  },
  {
    id: 't80',
    name: 'Nisha Selvakumar',
    title: 'Pakar Kejuruteraan Data & Papan Pemuka Tableau',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    bio: 'Membina saluran data (data pipelines) berskala besar, membolehkan syarikat memproses maklumat pelanggan dalam bentuk papan pemuka Tableau yang interaktif.',
    rating: 4.91,
    experience: '8 Tahun',
    certifications: [
      'Tableau Desktop Certified Professional',
      'Google Certified Professional Data Engineer'
    ],
    skills: [
      'Pembangunan ETL Guna Apache Airflow',
      'Reka Bentuk Visual Tableau Lanjutan',
      'Sistem Gudang Data Guna Snowflake / BigQuery',
      'Pengoptimuman Prestasi Pertanyaan SQL SQL'
    ],
    email: 'nisha.selva@data-tableau.org',
    phone: '+60 17-330 8822',
    featured: false,
    projectsCount: 22,
    socials: { linkedin: 'https://linkedin.com/in/nisha-selva-data' }
  },
  {
    id: 't81',
    name: 'Ahmad Zaki Bin Rosli',
    title: 'Jurulatih Keselamatan Elektrikal Domestik & Bangunan',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    bio: 'Melatih juruteknik bangunan menyelenggara pendawaian elektrik satu fasa dan tiga fasa, mencegah lintasan pintas serta kebakaran bangunan.',
    rating: 4.82,
    experience: '11 Tahun',
    certifications: [
      'Suruhanjaya Tenaga Certified Wireman (PW4)',
      'Building Electrical Safety Inspector Certificate'
    ],
    skills: [
      'Pemeriksaan Kerosakan Litar Pintas',
      'SOP Pemasangan Pemutus Litar Kilat (RCCB)',
      'Sistem Pembumian Elektrik Bangunan',
      'Audit Keselamatan Elektrik Amali'
    ],
    email: 'ahmad.zaki@electrical-safety.my',
    phone: '+60 19-301 2299',
    featured: false,
    projectsCount: 16,
    socials: { linkedin: 'https://linkedin.com/in/ahmad-zaki-wireman' }
  },
  {
    id: 't82',
    name: 'Dr. Cheah Yin Leng',
    title: 'Pakar Interaksi Manusia-Komputer & Kajian UX',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400',
    bio: 'Penyelidik UX yang membimbing syarikat teknologi menganalisis pergerakan mata pelanggan (eye-tracking) guna meningkatkan konversi laman web.',
    rating: 4.93,
    experience: '13 Tahun',
    certifications: [
      'Doctor of Philosophy in Human-Computer Interaction',
      'UX Certified Lead - Nielsen Norman Group'
    ],
    skills: [
      'Metodologi Eye-Tracking & Heatmaps',
      'Reka Bentuk Eksperimen A/B Testing',
      'Analisis Heuristik Kebolehgunaan',
      'Kajian Psikologi Pengguna Digital'
    ],
    email: 'yinleng.cheah@ux-research.my',
    phone: '+60 16-202 1100',
    featured: false,
    projectsCount: 27,
    socials: { linkedin: 'https://linkedin.com/in/dr-cheah-yin-leng' }
  },
  {
    id: 't83',
    name: 'Halim Bin Saad',
    title: 'Jurulatih Seni Negosiasi & Penyelesaian Pertikaian Bisnes',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400',
    bio: 'Menawarkan modul rundingan jualan korporat B2B, membantu syarikat menyelesaikan pertikaian komersial tanpa menjejaskan hubungan rakan niaga.',
    rating: 4.87,
    experience: '15 Tahun',
    certifications: [
      'Accredited Commercial Mediator (CEDR UK)',
      'Harvard Program on Negotiation Alumnus'
    ],
    skills: [
      'Seni Rundingan Menang-Menang (BATNA)',
      'Penyelesaian Konflik Komersial Luar Mahkamah',
      'Psikologi Pengaruh Bahasa Tubuh',
      'Format Kontrak Persefahaman (MoU) Strategik'
    ],
    email: 'halim.saad@business-negotiation.my',
    phone: '+60 12-401 2288',
    featured: false,
    projectsCount: 33,
    socials: { linkedin: 'https://linkedin.com/in/halim-saad-mediator' }
  },
  {
    id: 't84',
    name: 'Nurul Syuhada Binti Zainuddin',
    title: 'Pakar Nutrisi & Program Diet Sihat Tempat Kerja',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=400',
    bio: 'Membantu syarikat membina program penurunan berat badan pekerja, menu makanan sihat di kafeteria, serta mengatasi masalah kelesuan petang.',
    rating: 4.86,
    experience: '9 Tahun',
    certifications: [
      'Registered Nutritionist with Malaysian Council of Nutrition',
      'Certified Clinical Weight Management Specialist'
    ],
    skills: [
      'Seni Reka Diet Pekerja Kalis Letih',
      'Perancangan Menu Kafeteria Korporat',
      'Latihan Amali Bacaan Label Nutrisi',
      'Program Penurunan Berat Badan Berstruktur'
    ],
    email: 'syuhada.zainuddin@workplace-nutrition.org',
    phone: '+60 19-330 2233',
    featured: false,
    projectsCount: 18,
    socials: { linkedin: 'https://linkedin.com/in/syuhada-zainuddin-nutrition' }
  },
  {
    id: 't85',
    name: 'Devi Anantha Murugesan',
    title: 'Perunding Keselamatan Bunyi Bising & Audiometrik',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    bio: 'Melatih pegawai keselamatan mentafsir laporan audiometrik pekerja, memprogramkan pemeliharaan pendengaran bagi mengelakkan saman DOSH.',
    rating: 4.84,
    experience: '10 Tahun',
    certifications: [
      'CAOHC Certified Audiometric Technician Instructor',
      'DOSH Registered Industrial Noise Specialist'
    ],
    skills: [
      'Pentafsiran Carta Audiogram Bunyi',
      'Seni Reka Pelan Tebat Bunyi Bising (Engineering)',
      'Latihan Penggunaan Pelindung Telinga',
      'Audit Pematuhan Peraturan Kebisingan 2019'
    ],
    email: 'devi.anantha@hearing-preservation.my',
    phone: '+60 14-405 1199',
    featured: false,
    projectsCount: 22,
    socials: { linkedin: 'https://linkedin.com/in/devi-anantha-hearing' }
  },
  {
    id: 't86',
    name: 'Khairul Anwar Bin Kassim',
    title: 'Pakar Linux Kernel & Pengaturcaraan Sistem C/C++',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    bio: 'Pakar kernel yang melatih pengaturcara menulis kod pemacu perkakasan Linux dan mengoptimumkan kelajuan IO pangkalan data sistem.',
    rating: 4.96,
    experience: '15 Tahun',
    certifications: [
      'Red Hat Certified Architect in Infrastructure',
      'Linux Foundation Certified Systems Engineer'
    ],
    skills: [
      'Penulisan Linux Device Drivers C',
      'Seni Reka Pengaturcaraan Multithreaded C++',
      'Pengoptimuman Memori Kernel Tanpa Bocor',
      'Analisis Kerentanan Sistem Operasi Linux'
    ],
    email: 'khairul.anwar@linux-kernel.org',
    phone: '+60 13-908 5500',
    featured: true,
    projectsCount: 34,
    socials: { linkedin: 'https://linkedin.com/in/khairul-anwar-kernel' }
  },
  {
    id: 't87',
    name: 'Sarah Al-Idrus Binti Syed',
    title: 'Pakar Strategi Kepuasan Pelanggan VIP Korporat',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    bio: 'Membantu bank, syarikat kereta mewah, dan hotel lima bintang melatih kakitangan hadapan memberikan khidmat peribadi VIP tanpa cacat cela.',
    rating: 4.92,
    experience: '12 Tahun',
    certifications: [
      'Certified Luxury Service Professional (UK)',
      'Customer Experience Specialist Certification (CX)'
    ],
    skills: [
      'SOP Layanan Pelanggan Kelas Atasan',
      'Seni Reka Strategi Penyelesaian Aduan VIP',
      'Psikologi Membaca Kehendak Pelanggan',
      'Teknik Membina Hubungan Emosi Jangka Panjang'
    ],
    email: 'sarah.idrus@luxury-service.asia',
    phone: '+60 12-401 7766',
    featured: false,
    projectsCount: 29,
    socials: { linkedin: 'https://linkedin.com/in/sarah-idrus-luxury' }
  },
  {
    id: 't88',
    name: 'Lim Cheng Huat',
    title: 'Jurulatih Operasi Forklift & Pengurusan Logistik',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Menawarkan modul pemanduan jentera forklift secara selamat dan penjimatan minyak bagi pemandu syarikat penghantaran barangan runcit.',
    rating: 4.85,
    experience: '13 Tahun',
    certifications: [
      'NIOSH Certified Competent Forklift Driver Trainer',
      'Professional Logistics and Warehouse Manager (MILS)'
    ],
    skills: [
      'Ujian Praktikal Laluan Halangan Forklift',
      'SOP Pemeriksaan Bateri & Tayar Forklift',
      'Sistem Keselamatan Gudang Berautomasi',
      'Taktik Penyusunan Barang Padat & Selamat'
    ],
    email: 'chenghuat.lim@forklift-logistics.my',
    phone: '+60 16-330 2211',
    featured: false,
    projectsCount: 25,
    socials: { linkedin: 'https://linkedin.com/in/lim-cheng-huat-forklift' }
  },
  {
    id: 't89',
    name: 'Suresh Ganesan Pillai',
    title: 'Pakar Automasi Jenkins, Ansible, dan CI/CD',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=400',
    bio: 'Membantu pasukan perisian menulis kod automasi pelancaran pelayan awan, memotong tempoh deployment dari hari ke beberapa saat.',
    rating: 4.9,
    experience: '10 Tahun',
    certifications: [
      'Certified Jenkins Engineer (CJE)',
      'Red Hat Certified Specialist in Ansible Automation'
    ],
    skills: [
      'Penulisan Skrip Jenkins Pipelines Groovy',
      'Seni Reka Playbook Ansible Lanjutan',
      'Konfigurasi Docker Containers CI/CD',
      'Sistem Keselamatan Lintasan Automatik'
    ],
    email: 'suresh.ganesan@devops-pipeline.my',
    phone: '+60 14-301 7722',
    featured: false,
    projectsCount: 21,
    socials: { linkedin: 'https://linkedin.com/in/suresh-ganesan-ansible' }
  },
  {
    id: 't90',
    name: 'Fiona Choong Siew Lin',
    title: 'Pakar Pengurusan Acara (Event Management) Korporat',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: 'Membimbing penyelaras acara merancang belanjawan, mengurus vendor, serta menyelaras protokol majlis gala makan malam bertaraf mega.',
    rating: 4.88,
    experience: '11 Tahun',
    certifications: [
      'Certified Meeting Professional (CMP)',
      'Professional Event Planner Association Accredited'
    ],
    skills: [
      'Seni Reka Atur Cara Majlis Lancar',
      'Strategi Pengurusan Risiko Acara Terbuka',
      'SOP Komunikasi Bersama Vendor & Kontraktor',
      'Rundingan Belanjawan Acara Skala Besar'
    ],
    email: 'fiona.choong@event-planners.my',
    phone: '+60 18-904 5511',
    featured: false,
    projectsCount: 26,
    socials: { linkedin: 'https://linkedin.com/in/fiona-choong-event' }
  },
  {
    id: 't91',
    name: 'Zahid Bin Hamidi',
    title: 'Penyelia Keselamatan Kebakaran Loji Petroleum',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    bio: 'Menawarkan modul pencegahan letupan loji petrokimia, melatih pasukan bomba loji dalam mengawal tumpahan bahan api serta kebakaran gas.',
    rating: 4.95,
    experience: '17 Tahun',
    certifications: [
      'NFPA Certified Industrial Fire Protection Specialist',
      'DOSH Registered Petroleum Safety Officer'
    ],
    skills: [
      'Sistem Pemadam Buih (Foam System) Loji',
      'SOP Kawalan Tumpahan Bahan Api Petroleum',
      'Analisis Keselamatan Hazard Kebakaran (Fire Risk)',
      'Latihan Amali Pemadaman Api Gas Voltan Tinggi'
    ],
    email: 'zahid.hamidi@petroleum-safety.org',
    phone: '+60 12-402 9911',
    featured: true,
    projectsCount: 31,
    socials: { linkedin: 'https://linkedin.com/in/zahid-hamidi-fire' }
  },
  {
    id: 't92',
    name: 'Rizal Bin Rahim',
    title: 'Pembangun Aplikasi Mudah Alih Android Native Kotlin',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    bio: 'Mengajar kejuruteraan sistem perisian Android menggunakan bahasa Kotlin, menekankan seni bina Jetpack Compose untuk aplikasi pantas.',
    rating: 4.89,
    experience: '8 Tahun',
    certifications: [
      'Google Certified Associate Android Developer (Kotlin)',
      'Certified Android Security Engineer'
    ],
    skills: [
      'Seni Reka Jetpack Compose UI',
      'Integrasi Pangkalan Data SQLite & Room',
      'Penyusunan Rangka Kerja Coroutines Kotlin',
      'Audit Keselamatan Aplikasi Mudah Alih'
    ],
    email: 'rizal.rahim@android-compose.dev',
    phone: '+60 13-702 1100',
    featured: false,
    projectsCount: 19,
    socials: { linkedin: 'https://linkedin.com/in/rizal-rahim-android' }
  },
  {
    id: 't93',
    name: 'Amelia Tan Sze Wei',
    title: 'Jurulatih Penulisan Bisnes & Laporan Eksekutif',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    bio: 'Membimbing pegawai korporat menulis kertas cadangan perniagaan dan laporan teknikal yang padat, jelas, serta meyakinkan pelabur.',
    rating: 4.84,
    experience: '9 Tahun',
    certifications: [
      'Certified Business Writer - Writers Guild',
      'HRD Corp Accredited Professional Trainer'
    ],
    skills: [
      'Format Kertas Cadangan Pelaburan (Pitching)',
      'Penyediaan Laporan Kewangan Ringkas',
      'Teknik Suntingan Bahasa Bisnes Profesional',
      'Format Penulisan Minit Mesyuarat Eksekutif'
    ],
    email: 'amelia.tan@business-writers.my',
    phone: '+60 18-302 4433',
    featured: false,
    projectsCount: 15,
    socials: { linkedin: 'https://linkedin.com/in/amelia-tan-writer' }
  },
  {
    id: 't94',
    name: 'Dr. Sivalingam Ramasamy',
    title: 'Pakar Kesihatan Mental & Terapi Tingkah Laku Kognitif',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    bio: 'Pakar psikologi klinikal yang membantu syarikat membina program sokongan kesejahteraan jiwa bagi membendung kemurungan pekerja.',
    rating: 4.94,
    experience: '13 Tahun',
    certifications: [
      'Doctor of Psychology in Clinical Counseling',
      'Registered Counselor - Malaysian Board of Counselors'
    ],
    skills: [
      'Terapi Tingkah Laku Kognitif (CBT)',
      'Pencegahan Kemurungan & Anxieti Pekerja',
      'Sesi Bimbingan Kesejahteraan Jiwa Kelompok',
      'SOP Sistem Rujukan Pesakit Mental Korporat'
    ],
    email: 'dr.sivalingam@psychology-wellness.my',
    phone: '+60 14-301 9900',
    featured: false,
    projectsCount: 26,
    socials: { linkedin: 'https://linkedin.com/in/dr-sivalingam-counselor' }
  },
  {
    id: 't95',
    name: 'Ramlah Binti Ramli',
    title: 'Jurulatih First Aid & Rawatan Kecemasan Kanak-kanak',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400',
    bio: 'Mengajar guru-guru tadika dan pengasuh bertindak pantas merawat kes kanak-kanak tercekik, luka terbakar, dan demam sawan di premis.',
    rating: 4.87,
    experience: '10 Tahun',
    certifications: [
      'Certified Pediatric First Aid & CPR Instructor',
      'Red Crescent Malaysia Registered Nurse Trainer'
    ],
    skills: [
      'Rawatan Tercekik Kanak-kanak (Heimlich)',
      'CPR Pediatrik & Bayi Hands-On',
      'Rawatan Luka Terbakar & Alahan Makanan',
      'SOP Tindakan Kecemasan Tadika Pintar'
    ],
    email: 'ramlah.ramli@pediatric-safety.org',
    phone: '+60 19-331 4455',
    featured: false,
    projectsCount: 18,
    socials: { linkedin: 'https://linkedin.com/in/ramlah-ramli-pediatric' }
  },
  {
    id: 't96',
    name: 'Vicky Wong Siew Ken',
    title: 'Pakar Reka Bentuk UI/UX Web Pintar & Web Semantik',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    bio: 'Merekabentuk laman web berprestasi tinggi yang mesra pengguna OKU (Web Accessibility Guidelines) dan dioptimumkan untuk carian AI.',
    rating: 4.86,
    experience: '8 Tahun',
    certifications: [
      'IAAP Certified Web Accessibility Specialist (WAS)',
      'UX Master Certificate - Interaction Design Foundation'
    ],
    skills: [
      'Penyediaan Reka Bentuk Mesra OKU (WCAG)',
      'Struktur Data Web Semantik (Schema.org)',
      'Audit Kebolehgunaan Laman Web SaaS',
      'Reka Bentuk Aliran Pengguna Kompleks'
    ],
    email: 'vicky.wong@semantic-ux.my',
    phone: '+60 17-601 2233',
    featured: false,
    projectsCount: 14,
    socials: { linkedin: 'https://linkedin.com/in/vicky-wong-accessibility' }
  },
  {
    id: 't97',
    name: 'Syakira Binti Md Isa',
    title: 'Pakar Pengurusan Protokol & Majlis Rasmi Kerajaan',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    bio: 'Melatih pegawai perhubungan awam menyelaraskan susunan tetamu kenamaan VIP, panggilan hormat, serta pemakaian pakaian istiadat.',
    rating: 4.9,
    experience: '12 Tahun',
    certifications: [
      'Registered Protocol Officer with National Archives Malaysia',
      'Etiquette & Protocol Institute Certified Trainer'
    ],
    skills: [
      'Penyusunan Keutamaan Gelaran VIP (Precedence)',
      'SOP Pemakaian Pakaian Istiadat Rasmi',
      'Format Penyediaan Cenderamata Kerajaan',
      'Seni Pengurusan Jamuan Negara Rasmi'
    ],
    email: 'syakira.mdisa@protocol-specialist.my',
    phone: '+60 13-902 1199',
    featured: false,
    projectsCount: 25,
    socials: { linkedin: 'https://linkedin.com/in/syakira-md-isa' }
  },
  {
    id: 't98',
    name: 'Irfan Bin Haris',
    title: 'Jurutera Keselamatan Siber & Penguji Penembusan',
    category: 'technical',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400',
    bio: 'Membantu organisasi mengenalpasti lubang kerentanan dalam sistem web dan pangkalan data sebelum dieksploitasi oleh penggodam.',
    rating: 4.94,
    experience: '9 Tahun',
    certifications: [
      'Certified Ethical Hacker (CEH) - EC Council',
      'Offensive Security Certified Professional (OSCP)'
    ],
    skills: [
      'Ujian Penembusan Laman Web (Pentesting)',
      'Analisis Kerentanan OWASP Top 10',
      'Sistem Keselamatan Kod Sumber (Code Review)',
      'Audit Sistem Rangkaian Korporat'
    ],
    email: 'irfan.haris@cyber-defence.my',
    phone: '+60 12-409 5500',
    featured: false,
    projectsCount: 23,
    socials: { linkedin: 'https://linkedin.com/in/irfan-haris-oscp' }
  },
  {
    id: 't99',
    name: 'Suhaimi Bin Mohamad',
    title: 'Jurulatih Keselamatan Bekerja Di Ketinggian (WAH)',
    category: 'safety',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    bio: 'Menawarkan modul pemakaian harness keselamatan yang betul, pemasangan tali keselamatan lifelines, serta latihan menyelamat mangsa tergantung.',
    rating: 4.88,
    experience: '11 Tahun',
    certifications: [
      'DOSH Certified Working at Height Instructor',
      'Rope Access IRATA Level 2 Certification'
    ],
    skills: [
      'Pemeriksaan Harness & Tali Keselamatan',
      'Penyediaan Sistem Anchor & Lifelines',
      'Teknik Menyelamat Mangsa Tergantung (Rescue)',
      'SOP Audit Keselamatan Kerja Atap'
    ],
    email: 'suhaimi.mohamad@height-safety.my',
    phone: '+60 13-301 2288',
    featured: false,
    projectsCount: 20,
    socials: { linkedin: 'https://linkedin.com/in/suhaimi-mohamad-wah' }
  },
  {
    id: 't100',
    name: 'Datuk Dr. Azhar Bin Mansor',
    title: 'Pakar Motivasi Kepimpinan Eksekutif Global',
    category: 'soft_skills',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    bio: 'Pakar pelayaran solo global, menawarkan bimbingan inspirasi membina daya tahan mental (resilience), kepimpinan mampan, dan kejayaan organisasi.',
    rating: 4.98,
    experience: '24 Tahun',
    certifications: [
      'Global Leadership Excellence Award',
      'Fellow of the Institute of Corporate Directors Malaysia'
    ],
    skills: [
      'Membina Daya Tahan Minda Eksekutif',
      'Strategi Kepimpinan Gelombang Perubahan',
      'Seni Reka Kerja Berprestasi Tinggi',
      'Kepemimpinan Situasional Peringkat CEO'
    ],
    email: 'azhar.mansor@global-leadership.org',
    phone: '+60 12-205 1100',
    featured: true,
    projectsCount: 49,
    socials: { linkedin: 'https://linkedin.com/in/datuk-dr-azhar-mansor' }
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'p1',
    trainerId: 't1',
    trainerName: 'Ahmad Fadhil Bin Razak',
    trainerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    title: 'Kursus Persediaan Keselamatan & Kesihatan Pekerjaan DOSH/OSHA',
    category: 'safety',
    description: 'Program latihan intensif selama 3 hari yang dirumus khusus untuk membolehkan jawatankuasa keselamatan organisasi memahami Akta OSHA, mengenalpasti hazard di tempat kerja melalui proses HIRARC, serta mengurangkan kadar risiko kemalangan secara sistematik.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600',
    duration: '3 Hari (24 Jam)',
    level: 'Asas',
    outcomes: [
      'Memahami tanggungjawab di bawah Akta OSHA Malaysia 1994 & Pindaan 2022',
      'Mampu menyediakan lembar penilaian risiko HIRARC yang komprehensif',
      'Mengurangkan kadar ponteng kerja & kemalangan menerusi program kesedaran hazard'
    ],
    participantsCount: 340
  },
  {
    id: 'p2',
    trainerId: 't4',
    trainerName: 'Kamarul Ariffin Bin Yusof',
    trainerAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100',
    title: 'Latihan Amali CPR, Penggunaan AED & Pertolongan Cemas Industri',
    category: 'safety',
    description: 'Sesi praktikal sepenuhnya (hands-on) menggunakan patung simulasi perubatan terkini. Peserta didedahkan kepada kaedah bantuan pernafasan CPR yang betul, pemasangan defibrilator luaran automatik (AED), serta rawatan luka, melecur, patah anggota dan teknik evakuasi.',
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&q=80&w=600',
    duration: '2 Hari (16 Jam)',
    level: 'Asas',
    outcomes: [
      'Lulus ujian amali CPR mengikut piawaian terkini Persatuan Jantung Amerika (AHA)',
      'Keupayaan bertindak pantas (First Responder) menguruskan krisis kecederaan di ofis',
      'Sijil Kecekapan Pertolongan Cemas diakui oleh pihak industri'
    ],
    participantsCount: 520
  },
  {
    id: 'p3',
    trainerId: 't2',
    trainerName: 'Sarah Sophia Cheng',
    trainerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100',
    title: 'Seni Bina AWS Cloud & Amalan DevOps Gunaan',
    category: 'technical',
    description: 'Latihan teknikal mendalam untuk jurutera perisian dan pentadbir sistem mempelajari cara merancang seni bina berdaya tahan tinggi (High Availability), mengatur kontena dengan Docker, serta melaksanakan talian integrasi berterusan CI/CD menerusi amalan DevOps.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
    duration: '5 Hari (40 Jam)',
    level: 'Lanjutan',
    outcomes: [
      'Membina sistem awan hibrid yang selamat berlandaskan kerangka AWS Well-Architected',
      'Automasi pelancaran aplikasi menggunakan orkestrasi Docker & Kubernetes',
      'Memendekkan masa penghantaran perisian (software delivery) dari seminggu ke minit'
    ],
    participantsCount: 180
  },
  {
    id: 'p4',
    trainerId: 't6',
    trainerName: 'Devanand Krishnan',
    trainerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
    title: 'Analitis Data Raya & Visualisasi Strategik Menggunakan Power BI',
    category: 'technical',
    description: 'Program ini melatih ahli profesional perniagaan menggunakan Microsoft Power BI dan Python asas untuk membersihkan set data yang bercelaru, membina model hubungan data yang optimum, dan menghasilkan papan pemuka interaktif yang mudah dibaca oleh pihak pengurusan.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
    duration: '4 Hari (32 Jam)',
    level: 'Pertengahan',
    outcomes: [
      'Menghubungkan pelbagai sumber data luaran (SQL, Excel, Web API) ke dalam satu platform',
      'Menguasai formula DAX (Data Analysis Expressions) untuk metrik analisis kompleks',
      'Mereka bentuk reka letak papan pemuka eksekutif (Executive Dashboard) berpaksikan UX'
    ],
    participantsCount: 295
  },
  {
    id: 'p5',
    trainerId: 't3',
    trainerName: 'Marcus David Ananth',
    trainerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    title: 'Masterclass Kepimpinan Berprestasi Tinggi & EQ Korporat',
    category: 'soft_skills',
    description: 'Siri latihan intensif bagi membolehkan para pengurus, ketua jabatan, dan penyelia mengasah gaya kepimpinan mengikut situasi (Situational Leadership). Menumpukan kemahiran mengurus pasukan generasi muda, mengendalikan krisis dengan kestabilan emosi, serta membina sinergi kolaborasi.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
    duration: '3 Hari (24 Jam)',
    level: 'Pertengahan',
    outcomes: [
      'Mengenalpasti dan meningkatkan tahap Kecerdasan Emosi (EQ) peribadi dalam bekerja',
      'Menguasai kaedah delegasi pintar berasaskan keupayaan individu',
      'Teknik menangani konflik perpecahan kumpulan secara tenang dan membina'
    ],
    participantsCount: 410
  },
  {
    id: 'p6',
    trainerId: 't5',
    trainerName: 'Nurul Izzati Binti Mohd Fauzi',
    trainerAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=100',
    title: 'Latihan Komunikasi Pengaruh & Pengurusan Kesejahteraan Emosi',
    category: 'soft_skills',
    description: 'Satu gabungan inovatif yang memfokuskan kepada ketahanan mental (mental resilience) dan keberkesanan bersuara. Peserta akan mempelajari taktik relaksasi stres untuk mengelakkan keletihan mental (burnout) di samping membina kemahiran berkomunikasi secara tegas namun penuh rasa hormat.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
    duration: '2 Hari (16 Jam)',
    level: 'Asas',
    outcomes: [
      'Mengaplikasikan teknik "Mindful De-escalation" semasa berhadapan pelanggan beremosi',
      'Cara menolak tugasan berlebihan secara harmoni (Seni Berkata Tidak)',
      'Menyediakan pelan kesihatan mental persendirian untuk produktiviti kerja harian'
    ],
    participantsCount: 312
  },
  {
    id: 'p7',
    trainerId: 't7',
    trainerName: 'Siti Aminah Binti Hassan',
    trainerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    title: 'Budaya Khidmat Pelanggan Bertaraf Bintang Runcit',
    category: 'soft_skills',
    description: 'Membentuk kemahiran interpersonal bagi mewujudkan interaksi pelanggan yang unggul serta cara menangani aduan pelawat secara profesional.',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=600',
    duration: '2 Hari (16 Jam)',
    level: 'Asas',
    outcomes: [
      'Mengurangkan kadar aduan pelanggan di kedai sebanyak 40%',
      'Meningkatkan markah kepuasan pelanggan (NPS)',
      'Menguasai SOP menyambut dan berkomunikasi mengikut standard antarabangsa'
    ],
    participantsCount: 150
  },
  {
    id: 'p8',
    trainerId: 't8',
    trainerName: 'Dr. Adrian Lim Seng',
    title: 'Latihan Praktikal Kontrak Pintar Solidity Blockchain',
    category: 'technical',
    trainerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100',
    description: 'Latihan teknikal intensif menulis kontrak pintar di Ethereum, menguruskan transaksi Web3, dan mengaudit keselamatan kontrak dari serangan kerentanan.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600',
    duration: '3 Hari (24 Jam)',
    level: 'Lanjutan',
    outcomes: [
      'Lulus audit keselamatan asas kontrak pintar Solidity',
      'Mampu melancarkan ERC-20 token tersendiri di testnet',
      'Integrasi backend JavaScript/TypeScript dengan rangkaian Web3'
    ],
    participantsCount: 110
  },
  {
    id: 'p9',
    trainerId: 't9',
    trainerName: 'Rajesh Kumar Selvam',
    title: 'SOP Mengawal Sisa Bahan Kimia & Tindak Balas Kecemasan HAZMAT',
    category: 'safety',
    trainerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100',
    description: 'Panduan lengkap membendung kebocoran cecair kimia berasid, penggunaan kit tumpahan (spill kit), dan prosedur pembersihan zon pencemaran kimia.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
    duration: '2 Hari (16 Jam)',
    level: 'Pertengahan',
    outcomes: [
      'Kemahiran mengendalikan kit tumpahan kimia dalam masa kurang dari 3 minit',
      'Mematuhi Akta Kualiti Alam Sekitar (Buangan Terjadual) 2005',
      'Mempunyai sijil kecekapan HAZMAT Responder'
    ],
    participantsCount: 185
  },
  {
    id: 'p10',
    trainerId: 't10',
    trainerName: 'Noraini Binti Abdul Rahman',
    title: 'Latihan Penulisan Laporan Bisnes & E-mel Korporat Pengaruh',
    category: 'soft_skills',
    trainerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100',
    description: 'Membaiki tatabahasa komunikasi bisnes, melenyapkan kekakuan bahasa, dan menyusun tawaran komersial yang mudah dipersetujui oleh pelanggan.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600',
    duration: '2 Hari (16 Jam)',
    level: 'Asas',
    outcomes: [
      'Menulis laporan status mingguan yang ringkas, padat dan mudah difahami',
      'Mengurangkan salah faham e-mel antarabangsa',
      'Kombinasi kosa kata persuasif untuk cadangan perniagaan'
    ],
    participantsCount: 220
  },
  {
    id: 'p11',
    trainerId: 't50',
    trainerName: 'Ir. Tan Kah Seng',
    title: 'Sijil Kecekapan Operasi Selamat Dandang Stim (Steam Boiler)',
    category: 'safety',
    trainerAvatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=100',
    description: 'Latihan komprehensif mengawal tekanan stim dandang industri berat, prosedur start-stop yang betul, serta pengesanan awal keretakan paip boiler.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
    duration: '4 Hari (32 Jam)',
    level: 'Lanjutan',
    outcomes: [
      'Persediaan menghadapi peperiksaan Boiler-man DOSH',
      'Mengenalpasti kebocoran stim halus kalis pandangan mata kasar',
      'Mengurangkan risiko letupan bejana bertekanan tinggi di loji'
    ],
    participantsCount: 140
  }
];

export const TRAINING_STATS: TrainingStat[] = [
  {
    id: 's1',
    label: 'Jumlah Trainer',
    value: '100',
    change: 'Disahkan Bertauliah',
    icon: 'Users'
  },
  {
    id: 's2',
    label: 'Program Latihan',
    value: '80+',
    change: 'Akreditasi HRD Corp',
    icon: 'BookOpen'
  },
  {
    id: 's3',
    label: 'Kakitangan Terlatih',
    value: '8,200+',
    change: 'Kepuasan Rata-rata 98.9%',
    icon: 'GraduationCap'
  },
  {
    id: 's4',
    label: 'Kategori Latihan',
    value: '3 Bidang',
    change: 'Industri Kritikal',
    icon: 'Star'
  }
];
