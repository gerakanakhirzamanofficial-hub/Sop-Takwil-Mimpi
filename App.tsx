import React from 'react';
import { DreamForm } from './DreamForm';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <div className="max-w-4xl mx-auto">
        <DreamForm />
        
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Layanan Penakwilan Mimpi Ahlus Sunnah.</p>
          <p className="mt-1 text-xs">Menjaga amanah dan privasi pemimpi.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;