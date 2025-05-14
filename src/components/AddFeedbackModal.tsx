import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, X } from 'lucide-react';

interface AddFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFeedback: (title: string, description: string) => void;
}

const AddFeedbackModal: React.FC<AddFeedbackModalProps> = ({ isOpen, onClose, onAddFeedback }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setTitleError('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!title.trim()) {
      setTitleError('Title is required.');
      return;
    }
    setTitleError('');
    onAddFeedback(title, description);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-slate-50 sm:max-w-[480px]">
        <DialogHeader>
          <div className="flex items-center mb-3">
            <PlusCircle size={24} className="text-sky-400 mr-2" />
            <DialogTitle className="text-2xl font-semibold text-sky-400">Add New Idea</DialogTitle>
          </div>
          <DialogDescription className="text-slate-400">
            Share your brilliant idea with the community. Keep it concise and clear.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-slate-300 font-medium">Title <span className="text-red-500">*</span></Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim()) setTitleError('');
              }}
              placeholder="A catchy title for your idea"
              className={`bg-slate-700 border-slate-600 text-slate-50 focus:ring-sky-500 ${titleError ? 'border-red-500 focus:ring-red-500' : ''}`}
            />
            {titleError && <p className="text-sm text-red-500 mt-1">{titleError}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-slate-300 font-medium">Description (Optional)</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Describe your idea in more detail..."
              className="bg-slate-700 border-slate-600 text-slate-50 min-h-[100px] focus:ring-sky-500"
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose} className="text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white">
            <X size={18} className="mr-1.5"/> Cancel
          </Button>
          <Button type="button" onClick={handleSubmit} className="bg-sky-500 hover:bg-sky-600 text-white">
            <PlusCircle size={18} className="mr-1.5"/> Add Idea
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddFeedbackModal;
