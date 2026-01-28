import React, { useState } from 'react';
import { Send, User, HeartPulse, Moon, Clock, Brain, ScrollText, Sparkles, Scale, FileSignature, AlertCircle, Eye, Star } from 'lucide-react';
import { INITIAL_FORM_DATA, FormData } from './types';
import { TextInput, TextArea, RadioGroup, CheckboxGroup, SectionHeader, FormLabel } from './components/UI';
import { formatToWhatsApp } from './utils/whatsappFormatter';

// CONSTANT FOR ADMIN NUMBER
const ADMIN_WHATSAPP_NUMBER = "087761330062"; 

export const DreamForm = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [logoError, setLogoError] = useState(false);
  // targetNumber state kept for logic, but UI removed as requested
  const [targetNumber] = useState(ADMIN_WHATSAPP_NUMBER);
  
  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreement) {
      alert("Mohon setujui pernyataan kejujuran di bagian akhir form.");
      return;
    }

    const message = formatToWhatsApp(formData);
    const encodedMessage = encodeURIComponent(message);
    
    // Ensure number is in correct format (strip non-digits)
    let cleanNumber = targetNumber.replace(/\D/g, '');
    
    // If user enters 08..., replace 0 with 62 for international format compatibility
    if (cleanNumber.startsWith('0')) {
      cleanNumber = '62' + cleanNumber.substring(1);
    }
    
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  // Generate preview message (Updated in real-time because it depends on formData state)
  const previewMessage = formatToWhatsApp(formData);

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl overflow-hidden border border-slate-200">
      
      {/* Header Info */}
      <div className="bg-emerald-800 text-white p-6 sm:p-10 relative overflow-hidden">
        {/* Background Pattern Decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 transform rotate-45"><Star className="w-12 h-12" /></div>
            <div className="absolute bottom-10 right-10 transform -rotate-12"><Moon className="w-20 h-20" /></div>
        </div>

        <div className="relative z-10">
            <div className="flex justify-center mb-6">
            {/* Logo Image with Fallback */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-emerald-400/30 backdrop-blur-sm p-1 transform hover:scale-105 transition-transform duration-300 overflow-hidden">
                {!logoError ? (
                  <img 
                      src="/logo.png" 
                      alt="Logo Majelis Gaza" 
                      className="w-full h-full object-cover rounded-full"
                      onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full bg-emerald-50">
                      <Moon className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-800 fill-emerald-800/10" strokeWidth={1.5} />
                      <span className="text-[8px] sm:text-[10px] font-bold text-emerald-900 mt-1 text-center leading-tight">MAJELIS<br/>GAZA</span>
                  </div>
                )}
            </div>
            </div>

            {/* Organization Name */}
            <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-widest text-emerald-50 font-serif">MAJELIS GAZA</h2>
            <div className="flex items-center justify-center gap-2 mt-2">
                <div className="h-px w-8 bg-emerald-400/50"></div>
                <p className="text-xs sm:text-sm font-medium text-emerald-300 tracking-[0.2em] uppercase">(Gerakan Akhir Zaman)</p>
                <div className="h-px w-8 bg-emerald-400/50"></div>
            </div>
            </div>

            <h1 className="text-xl sm:text-3xl font-serif font-bold mb-4 text-center leading-tight">📝 FORM VERIFIKASI & PENAKWILAN MIMPI</h1>
            <p className="text-center font-medium text-emerald-100 mb-8 tracking-wide text-xs sm:text-sm bg-emerald-900/30 py-1 px-3 rounded-full inline-block mx-auto w-full sm:w-auto">
                WAJIB DIISI LENGKAP SEBELUM PENAKWILAN
            </p>
            
            <div className="bg-emerald-900/40 rounded-xl p-6 border border-emerald-500/30 text-sm leading-relaxed backdrop-blur-sm shadow-inner">
            <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="font-bold mb-2 text-emerald-200 uppercase tracking-wide text-xs">Deskripsi Form:</p>
                    <p className="opacity-95 text-emerald-50">
                        Form ini digunakan untuk verifikasi identitas pemimpi dan pengumpulan data pendukung penakwilan mimpi berdasarkan metode ulama tafsir mimpi (Ibnu Sirin dan ulama Ahlus Sunnah).
                        <span className="block mt-2 font-medium text-emerald-200">Mimpi tidak akan ditakwil apabila data tidak lengkap atau tidak jujur.</span>
                    </p>
                </div>
            </div>
            </div>
        </div>
      </div>

      <div className="p-6 sm:p-10 space-y-12">

        {/* SECTION 1 */}
        <section>
          <SectionHeader number={1} title="IDENTITAS & VERIFIKASI PEMIMPI" subtitle="(Semua pertanyaan WAJIB)" icon={User} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <TextInput 
              label="1. Nama lengkap sesuai identitas" 
              required 
              value={formData.fullName} 
              onChange={e => updateField('fullName', e.target.value)} 
            />
            <TextInput 
              label="2. Nama panggilan sehari-hari" 
              required 
              value={formData.nickname} 
              onChange={e => updateField('nickname', e.target.value)} 
            />
          </div>

          <RadioGroup 
            label="3. Jenis kelamin" 
            name="gender"
            required
            options={['Laki-laki', 'Perempuan']}
            value={formData.gender}
            onChange={v => updateField('gender', v as any)}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
            <TextInput 
              label="4. Tempat lahir" 
              required 
              value={formData.birthPlace} 
              onChange={e => updateField('birthPlace', e.target.value)} 
            />
            <TextInput 
              label="5. Tanggal lahir" 
              type="date"
              required 
              value={formData.birthDate} 
              onChange={e => updateField('birthDate', e.target.value)} 
            />
            <TextInput 
              label="6. Usia saat ini" 
              placeholder="Contoh: 25 tahun"
              required 
              value={formData.age} 
              onChange={e => updateField('age', e.target.value)} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <RadioGroup 
              label="7. Status pernikahan" 
              name="maritalStatus"
              required
              options={['Lajang', 'Menikah', 'Cerai hidup', 'Janda / Duda']}
              value={formData.maritalStatus}
              onChange={v => updateField('maritalStatus', v as any)}
            />
            <TextInput 
              label="8. Jumlah anak (jika ada, sebutkan L/P)" 
              value={formData.childrenCount} 
              onChange={e => updateField('childrenCount', e.target.value)} 
            />
          </div>

          <TextArea 
            label="9. Alamat tempat tinggal saat ini (lengkap)"
            required
            rows={2}
            value={formData.address}
            onChange={e => updateField('address', e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <TextInput 
              label="10. Nomor WhatsApp / Telepon aktif" 
              required 
              type="tel"
              value={formData.whatsapp} 
              onChange={e => updateField('whatsapp', e.target.value)} 
            />
            <TextInput 
              label="11. Pekerjaan / aktivitas utama saat ini" 
              required 
              value={formData.occupation} 
              onChange={e => updateField('occupation', e.target.value)} 
            />
          </div>
        </section>

        {/* SECTION 2 */}
        <section>
          <SectionHeader number={2} title="KONDISI KESEHATAN & FISIK" icon={HeartPulse} />
          
          <RadioGroup 
            label="12. Kondisi kesehatan saat ini" 
            name="healthCondition"
            options={['Sehat', 'Sakit ringan', 'Sakit berat']}
            value={formData.healthCondition}
            onChange={v => updateField('healthCondition', v as any)}
          />

          <TextInput 
            label="13. Apakah sedang mengonsumsi obat tertentu?" 
            helperText='Jika tidak, tulis "Tidak"'
            value={formData.medication} 
            onChange={e => updateField('medication', e.target.value)} 
          />

          <CheckboxGroup
            label="14. Kondisi tubuh sebelum tidur saat mimpi terjadi"
            options={['Sangat lelah', 'Kurang tidur', 'Stres berat', 'Normal']}
            selectedValues={formData.bodyConditionBeforeSleep}
            onChange={v => updateField('bodyConditionBeforeSleep', v)}
          />
        </section>

        {/* SECTION 3 */}
        <section>
          <SectionHeader number={3} title="KONDISI IMAN & RUHANI" icon={Moon} />
          
          <RadioGroup 
            label="15. Konsistensi shalat wajib" 
            name="prayerConsistency"
            options={['Terjaga', 'Kadang lalai', 'Sering lalai']}
            value={formData.prayerConsistency}
            onChange={v => updateField('prayerConsistency', v as any)}
          />

          <RadioGroup 
            label="16. Kondisi iman saat ini" 
            name="faithCondition"
            options={['Tenang', 'Gelisah', 'Futur', 'Sedang meningkat']}
            value={formData.faithCondition}
            onChange={v => updateField('faithCondition', v as any)}
          />

          <CheckboxGroup
            label="17. Apakah sedang mengalami kondisi berikut?"
            options={['Ujian berat', 'Masa taubat', 'Istikharah', 'Tidak ada']}
            selectedValues={formData.spiritualCondition}
            onChange={v => updateField('spiritualCondition', v)}
          />

          <TextArea 
            label="18. Amalan rutin (dzikir, wirid, puasa sunnah, dll)"
            rows={2}
            value={formData.routineWorship}
            onChange={e => updateField('routineWorship', e.target.value)}
          />

          <CheckboxGroup
            label="19. Amalan sebelum tidur saat mimpi terjadi"
            options={['Doa', 'Ayat Kursi', 'Membaca doa adab tidur', 'Al-Qur’an', 'Tidak ada']}
            selectedValues={formData.preSleepWorship}
            onChange={v => updateField('preSleepWorship', v)}
          />
        </section>

        {/* SECTION 4 */}
        <section>
          <SectionHeader number={4} title="WAKTU & KEADAAN MIMPI" icon={Clock} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <TextInput 
              label="20. Hari & tanggal mimpi terjadi" 
              type="date"
              required 
              value={formData.dreamDate} 
              onChange={e => updateField('dreamDate', e.target.value)} 
            />
            
            <TextInput 
              label="21. Waktu mimpi terjadi (Tuliskan secara spesifik)" 
              placeholder="Contoh: Jam 21.00 WIB, Sepertiga malam terakhir, dll"
              required 
              value={formData.dreamTime} 
              onChange={e => updateField('dreamTime', e.target.value)} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <RadioGroup 
              label="22. Posisi tidur saat mimpi" 
              name="sleepPosition"
              options={['Telentang', 'Miring', 'Miring ke kiblat', 'Tengkurap']}
              value={formData.sleepPosition}
              onChange={v => updateField('sleepPosition', v as any)}
            />
            <RadioGroup 
              label="23. Mimpi terjadi" 
              name="occurrence"
              options={['Sekali', 'Berulang']}
              value={formData.occurrence}
              onChange={v => updateField('occurrence', v as any)}
            />
          </div>

          <RadioGroup 
            label="24. Tingkat kejelasan mimpi" 
            name="clarity"
            options={['Sangat jelas', 'Jelas', 'Samar']}
            value={formData.clarity}
            onChange={v => updateField('clarity', v as any)}
          />
        </section>

        {/* SECTION 5 */}
        <section>
          <SectionHeader number={5} title="KONDISI PSIKOLOGIS" icon={Brain} />
          
          <TextArea 
            label="25. Masalah besar yang sedang dihadapi saat ini"
            rows={3}
            value={formData.currentProblem}
            onChange={e => updateField('currentProblem', e.target.value)}
          />

          <RadioGroup 
            label="26. Apakah mimpi ini berkaitan dengan masalah/peristiwa di dunia nyata?" 
            name="isRelatedToProblem"
            options={['Ya', 'Tidak', 'Tidak yakin']}
            value={formData.isRelatedToProblem}
            onChange={v => updateField('isRelatedToProblem', v as any)}
          />

          <CheckboxGroup
            label="27. Perasaan saat berada dalam mimpi"
            options={['Tenang', 'Takut', 'Sedih', 'Bahagia', 'Bingung']}
            selectedValues={formData.feelingInDream}
            onChange={v => updateField('feelingInDream', v)}
          />

          <TextArea 
            label="28. Perasaan setelah bangun tidur"
            rows={2}
            value={formData.feelingAfterWaking}
            onChange={e => updateField('feelingAfterWaking', e.target.value)}
          />
        </section>

        {/* SECTION 6 */}
        <section className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100">
          <SectionHeader number={6} title="URAIAN MIMPI (INTI)" icon={ScrollText} />
          
          <TextArea 
            label="29. Ceritakan mimpi secara lengkap dan runtut dari awal hingga akhir"
            helperText="Catatan: Jangan menambahkan tafsir pribadi."
            required
            rows={8}
            className="font-serif text-lg"
            placeholder="Mulai cerita mimpi Anda di sini..."
            value={formData.dreamDescription}
            onChange={e => updateField('dreamDescription', e.target.value)}
          />
        </section>

        {/* SECTION 7 */}
        <section>
          <SectionHeader number={7} title="DETAIL SIMBOL MIMPI" icon={Sparkles} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <TextArea 
                label="30. Tempat yang muncul dalam mimpi"
                rows={2}
                value={formData.places}
                onChange={e => updateField('places', e.target.value)}
            />
            <TextArea 
                label="31. Warna dominan yang terlihat"
                rows={2}
                value={formData.colors}
                onChange={e => updateField('colors', e.target.value)}
            />
            <TextArea 
                label="32. Orang-orang yang hadir (nama/ciri, dikenal/tidak, hidup/wafat)"
                rows={2}
                value={formData.people}
                onChange={e => updateField('people', e.target.value)}
            />
            <TextArea 
                label="33. Interaksi yang terjadi (bicara, memberi, menolak, dll)"
                rows={2}
                value={formData.interactions}
                onChange={e => updateField('interactions', e.target.value)}
            />
            <TextArea 
                label="34. Benda penting yang muncul (air, api, makanan, pakaian, dll)"
                rows={2}
                value={formData.objects}
                onChange={e => updateField('objects', e.target.value)}
            />
            <TextArea 
                label="35. Bagaimana mimpi berakhir?"
                rows={2}
                value={formData.ending}
                onChange={e => updateField('ending', e.target.value)}
            />
          </div>
        </section>

        {/* SECTION 8 */}
        <section>
          <SectionHeader number={8} title="UNSUR SYAR’I" icon={Scale} />
          
          <TextArea 
            label="36. Apakah terdapat ayat, doa, dzikir, atau ibadah dalam mimpi?"
            rows={2}
            value={formData.religiousElements}
            onChange={e => updateField('religiousElements', e.target.value)}
          />
          <TextArea 
            label="37. Apakah muncul tokoh agama / orang shalih?"
            rows={2}
            value={formData.religiousFigures}
            onChange={e => updateField('religiousFigures', e.target.value)}
          />
          <RadioGroup 
            label="38. Arah pesan mimpi menurut Anda" 
            name="messageDirection"
            options={['Kebaikan', 'Peringatan', 'Larangan', 'Tidak jelas']}
            value={formData.messageDirection}
            onChange={v => updateField('messageDirection', v as any)}
          />
        </section>

        {/* SECTION 9 */}
        <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <SectionHeader number={9} title="PERNYATAAN KEJUJURAN" icon={FileSignature} />
          
          <div className="mb-6">
            <FormLabel required>39. Pernyataan</FormLabel>
            <label className="flex items-start gap-3 mt-3 p-4 bg-white border border-slate-300 rounded-lg cursor-pointer hover:border-emerald-400 transition-colors">
              <input 
                type="checkbox" 
                className="mt-1 w-5 h-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                checked={formData.agreement}
                onChange={(e) => updateField('agreement', e.target.checked)}
              />
              <span className="text-sm text-slate-700 leading-relaxed">
                Saya menyatakan data dan mimpi yang saya isi adalah benar dan jujur, serta memahami bahwa tafsir mimpi adalah nasihat, bukan kepastian mutlak.
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <TextInput 
              label="40. Nama lengkap (ulang sebagai persetujuan)" 
              required 
              placeholder="Ketik nama lengkap Anda"
              value={formData.signatureName} 
              onChange={e => updateField('signatureName', e.target.value)} 
            />
            <TextInput 
              label="41. Tanggal pengisian form" 
              type="date"
              required 
              value={formData.submissionDate} 
              onChange={e => updateField('submissionDate', e.target.value)} 
            />
          </div>
        </section>

        {/* LIVE PREVIEW SECTION */}
        <section className="bg-slate-800 text-slate-200 p-6 rounded-xl border border-slate-700 mb-6 sticky bottom-0 z-10 sm:static shadow-2xl">
          <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold border-b border-slate-600 pb-2">
            <Eye className="w-5 h-5" />
            <h3>CONTOH HASIL (LIVE PREVIEW)</h3>
          </div>
          <p className="text-sm text-slate-400 mb-4">
            Preview ini diperbarui secara otomatis saat Anda mengetik. Pastikan data sudah sesuai sebelum dikirim.
          </p>
          <div className="bg-slate-900 p-4 rounded-lg font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap border border-slate-700 shadow-inner max-h-[500px] overflow-y-auto custom-scrollbar">
            {previewMessage}
          </div>
        </section>

        {/* Submit Button */}
        <div className="pt-6 border-t border-slate-200">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl focus:ring-4 focus:ring-emerald-300"
          >
            <Send className="w-6 h-6" />
            <span>Kirim Form ke WhatsApp</span>
          </button>
          <p className="text-center mt-4 text-xs text-slate-400 flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Data akan diformat otomatis dan membuka aplikasi WhatsApp Anda.
          </p>
        </div>

      </div>
    </form>
  );
};