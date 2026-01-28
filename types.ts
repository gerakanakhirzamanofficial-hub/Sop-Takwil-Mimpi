export interface FormData {
  // Section 1: Identitas
  fullName: string;
  nickname: string;
  gender: 'Laki-laki' | 'Perempuan' | '';
  birthPlace: string;
  birthDate: string;
  age: string;
  maritalStatus: 'Lajang' | 'Menikah' | 'Cerai hidup' | 'Janda / Duda' | '';
  childrenCount: string;
  address: string;
  whatsapp: string;
  occupation: string;

  // Section 2: Kesehatan & Fisik
  healthCondition: 'Sehat' | 'Sakit ringan' | 'Sakit berat' | '';
  medication: string;
  bodyConditionBeforeSleep: string[]; // Checkbox

  // Section 3: Iman & Ruhani
  prayerConsistency: 'Terjaga' | 'Kadang lalai' | 'Sering lalai' | '';
  faithCondition: 'Tenang' | 'Gelisah' | 'Futur' | 'Sedang meningkat' | '';
  spiritualCondition: string[]; // Checkbox
  routineWorship: string;
  preSleepWorship: string[]; // Checkbox

  // Section 4: Waktu & Keadaan Mimpi
  // Changed to string to support custom input
  dreamDate: string;
  dreamTime: string; 
  // Added 'Miring ke kiblat' to type
  sleepPosition: 'Telentang' | 'Miring' | 'Miring ke kiblat' | 'Tengkurap' | '';
  occurrence: 'Sekali' | 'Berulang' | '';
  clarity: 'Sangat jelas' | 'Jelas' | 'Samar' | '';

  // Section 5: Psikologis
  currentProblem: string;
  isRelatedToProblem: 'Ya' | 'Tidak' | 'Tidak yakin' | '';
  feelingInDream: string[]; // Checkbox
  feelingAfterWaking: string;

  // Section 6: Uraian Mimpi
  dreamDescription: string;

  // Section 7: Detail Simbol
  places: string;
  colors: string;
  people: string;
  interactions: string;
  objects: string;
  ending: string;

  // Section 8: Unsur Syar'i
  religiousElements: string;
  religiousFigures: string;
  messageDirection: 'Kebaikan' | 'Peringatan' | 'Larangan' | 'Tidak jelas' | '';

  // Section 9: Pernyataan
  agreement: boolean;
  signatureName: string;
  submissionDate: string;
}

export const INITIAL_FORM_DATA: FormData = {
  fullName: '',
  nickname: '',
  gender: '',
  birthPlace: '',
  birthDate: '',
  age: '',
  maritalStatus: '',
  childrenCount: '',
  address: '',
  whatsapp: '',
  occupation: '',
  healthCondition: '',
  medication: '',
  bodyConditionBeforeSleep: [],
  prayerConsistency: '',
  faithCondition: '',
  spiritualCondition: [],
  routineWorship: '',
  preSleepWorship: [],
  dreamDate: new Date().toISOString().split('T')[0],
  dreamTime: '',
  sleepPosition: '',
  occurrence: '',
  clarity: '',
  currentProblem: '',
  isRelatedToProblem: '',
  feelingInDream: [],
  feelingAfterWaking: '',
  dreamDescription: '',
  places: '',
  colors: '',
  people: '',
  interactions: '',
  objects: '',
  ending: '',
  religiousElements: '',
  religiousFigures: '',
  messageDirection: '',
  agreement: false,
  signatureName: '',
  submissionDate: new Date().toISOString().split('T')[0],
};