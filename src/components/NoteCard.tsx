
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

export const NoteCard = ({ note, onUpdate, onDelete }: NoteCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { toast } = useToast();

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/note/${note.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "Share URL has been copied to your clipboard.",
    });
    setIsShareModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <>
      <div 
        className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100"
        style={{ backgroundColor: note.color }}
      >
        {note.image && (
          <div className="w-full h-48 overflow-hidden">
            <img
              src={note.image}
              alt="Note attachment"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-4">
          {note.title && (
            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
              {note.title}
            </h3>
          )}
          
          {note.content && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-4 whitespace-pre-wrap">
              {note.content}
            </p>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{formatDate(note.updatedAt)}</span>
          </div>
        </div>

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex gap-1">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
              title="Edit note"
            >
              <Edit size={14} className="text-gray-600" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
              title="Share note"
            >
              <Share size={14} className="text-gray-600" />
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
              title="Delete note"
            >
              <Trash2 size={14} className="text-red-600" />
            </button>
          </div>
        </div>
      </div>

      <EditNoteModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        note={note}
        onSubmit={onUpdate}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        note={note}
      />
    </>
  );
};
