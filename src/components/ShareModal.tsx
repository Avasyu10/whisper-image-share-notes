
import { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { Note } from '../types/Note';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note;
}

export const ShareModal = ({ isOpen, onClose, note }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = `${window.location.origin}/note/${note.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-card rounded-2xl max-w-md w-full border border-slate-600/30">
        <div className="flex items-center justify-between p-6 border-b border-slate-600/30">
          <h2 className="text-xl font-semibold text-slate-100">Share Note</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-600/50 rounded-full transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-300">
              Share this link:
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-4 py-3 border border-slate-600/50 rounded-xl bg-slate-800/50 text-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-500 hover:to-blue-400 transition-colors flex items-center gap-2 shadow-lg"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl border border-blue-500/20">
            <p className="text-sm text-blue-300">
              <strong>Note:</strong> Anyone with this link will be able to view your note. 
              The note will be stored locally until you implement a backend.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full px-4 py-3 glass-card hover:bg-slate-600/50 text-slate-300 rounded-xl transition-colors border border-slate-600/30"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
