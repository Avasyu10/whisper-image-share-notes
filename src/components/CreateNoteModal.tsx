import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { Note, NOTE_COLORS } from '../types/Note';
interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
}
export const CreateNoteModal = ({
  isOpen,
  onClose,
  onSubmit
}: CreateNoteModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState(NOTE_COLORS[0]);
  const [image, setImage] = useState<string>('');
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !content.trim() && !image) return;
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      color,
      image: image || undefined
    });

    // Reset form
    setTitle('');
    setContent('');
    setColor(NOTE_COLORS[0]);
    setImage('');
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Create New Note</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <input type="text" placeholder="Note title..." value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />

          <textarea placeholder="Write your note here..." value={content} onChange={e => setContent(e.target.value)} rows={6} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none" />

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Choose a color:
            </label>
            <div className="flex gap-2 flex-wrap">
              {NOTE_COLORS.map(noteColor => <button key={noteColor} type="button" onClick={() => setColor(noteColor)} className={`w-8 h-8 rounded-full border-2 transition-all ${color === noteColor ? 'border-gray-400 scale-110' : 'border-gray-200'}`} style={{
              backgroundColor: noteColor
            }} />)}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Add an image:
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors bg-slate-500">
                <Upload size={16} />
                <span className="text-sm">Upload Image</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            {image && <div className="relative">
                <img src={image} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                <button type="button" onClick={() => setImage('')} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                  <X size={12} />
                </button>
              </div>}
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={!title.trim() && !content.trim() && !image} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>;
};