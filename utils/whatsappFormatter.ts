import { FormData } from '../types';

export const formatToWhatsApp = (data: FormData): string => {
  const safe = (text: string) => text && text.trim() ? text.trim() : "-";
  const list = (items: string[]) => items.length > 0 ? items.join(', ') : "-";
  
  return `*FORMULIR PENAKWILAN MIMPI MAJELIS GAZA*

Assalamu'alaikum Warahmatullahi Wabarakatuh,

Yth. Asatidz Majelis Gaza,
Mohon izin mengajukan permohonan penakwilan mimpi dengan rincian data verifikasi sebagai berikut:

*1. IDENTITAS PEMIMPI*
• Nama Lengkap: ${safe(data.fullName)}
• Panggilan: ${safe(data.nickname)}
• Jenis Kelamin: ${safe(data.gender)}
• TTL: ${safe(data.birthPlace)}, ${safe(data.birthDate)}
• Usia: ${safe(data.age)}
• Status Pernikahan: ${safe(data.maritalStatus)}
• Jumlah Anak: ${safe(data.childrenCount)}
• Alamat: ${safe(data.address)}
• Pekerjaan: ${safe(data.occupation)}
• No. WhatsApp: ${safe(data.whatsapp)}

*2. KONDISI FISIK*
• Kesehatan: ${safe(data.healthCondition)}
• Konsumsi Obat: ${safe(data.medication)}
• Kondisi Pra-tidur: ${list(data.bodyConditionBeforeSleep)}

*3. KONDISI RUHANI*
• Shalat Wajib: ${safe(data.prayerConsistency)}
• Kondisi Iman: ${safe(data.faithCondition)}
• Situasi Batin: ${list(data.spiritualCondition)}
• Amalan Rutin: ${safe(data.routineWorship)}
• Amalan Sebelum Tidur: ${list(data.preSleepWorship)}

*4. WAKTU & KEADAAN MIMPI*
• Tanggal: ${safe(data.dreamDate)}
• Waktu: ${safe(data.dreamTime)}
• Posisi Tidur: ${safe(data.sleepPosition)}
• Frekuensi: ${safe(data.occurrence)}
• Kejelasan: ${safe(data.clarity)}

*5. KONDISI PSIKOLOGIS*
• Masalah Utama: ${safe(data.currentProblem)}
• Kaitan Masalah: ${safe(data.isRelatedToProblem)}
• Perasaan (Mimpi): ${list(data.feelingInDream)}
• Perasaan (Bangun): ${safe(data.feelingAfterWaking)}

*6. URAIAN MIMPI (INTI)*
"${safe(data.dreamDescription)}"

*7. DETAIL SIMBOL*
• Tempat: ${safe(data.places)}
• Warna: ${safe(data.colors)}
• Tokoh: ${safe(data.people)}
• Interaksi: ${safe(data.interactions)}
• Benda: ${safe(data.objects)}
• Akhir Mimpi: ${safe(data.ending)}

*8. UNSUR SYAR'I*
• Unsur Ibadah: ${safe(data.religiousElements)}
• Tokoh Agama: ${safe(data.religiousFigures)}
• Arah Pesan: ${safe(data.messageDirection)}

*9. PERNYATAAN KEJUJURAN*
• Status: ${data.agreement ? "✅ Data Benar & Jujur" : "❌ Belum Disetujui"}
• Tertanda: ${safe(data.signatureName)}
• Tanggal Isi: ${safe(data.submissionDate)}

_Jazakumullah Khairan Katsiran._`;
};