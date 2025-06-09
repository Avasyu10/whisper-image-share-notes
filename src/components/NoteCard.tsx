import { useState } from 'react';
import { Share, Edit, Trash2 } from 'lucide-react';
import { Note } from '../types/Note';
import { EditNoteModal } from './EditNoteModal';
import { ShareModal } from './ShareModal';
import { useToast } from '../hooks/use-toast';
interface NoteCardProps {
  note: Note;
  onUpdate: (note: Note) => void;
  onDelete: (noteId: string) => void;
}
export const NoteCard = ({
  note,
  onUpdate,
  onDelete
}: NoteCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const {
    toast
  } = useToast();
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/note/${note.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "Share URL has been copied to your clipboard."
    });
    setIsShareModalOpen(true);
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  return <>
      <div className="group relative glass-card rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden border border-slate-600/30 hover:border-blue-500/30 transform hover:scale-[1.02]" style={{
      backgroundColor: note.color === '#ffffff' ? 'rgba(51, 65, 85, 0.2)' : note.color
    }}>
        {note.image && <div className="w-full h-48 overflow-hidden">
            <img src={note.image} alt="Note attachment" className="w-full h-full object-cover" />
          </div>}
        
        <div className="p-5">
          {note.title && <h3 className="font-semibold mb-3 line-clamp-2 text-lg text-gray-950">
              {note.title}
            </h3>}
          
          {note.content && <p className="text-sm mb-4 line-clamp-4 whitespace-pre-wrap leading-relaxed text-slate-900">
              {note.content}
            </p>}
          
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{formatDate(note.updatedAt)}</span>
          </div>
        </div>

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex gap-2">
            <button onClick={() => setIsEditModalOpen(true)} className="p-2 glass-card rounded-full shadow-md hover:bg-slate-600/50 transition-colors" title="Edit note">
              <Edit size={14} className="text-slate-300 bg-slate-900" />
            </button>
            <button onClick={handleShare} className="p-2 glass-card rounded-full shadow-md hover:bg-slate-600/50 transition-colors" title="Share note">
              <Share size={14} className="text-blue-400" />
            </button>
            <button onClick={() => onDelete(note.id)} className="p-2 glass-card rounded-full shadow-md hover:bg-red-500/20 transition-colors" title="Delete note">
              <Trash2 size={14} className="text-red-400" />
            </button>
          </div>
        </div>
      </div>

      <EditNoteModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} note={note} onSubmit={onUpdate} />

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} note={note} />
    </>;
};