import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, MessageSquare, ArrowBigUp, ArrowBigDown } from 'lucide-react';
import FeedbackCard from '@/components/FeedbackCard.tsx';
import AddFeedbackModal from '@/components/AddFeedbackModal.tsx';

export interface FeedbackItem {
  id: string;
  title: string;
  description: string;
  votes: number;
  createdAt: Date;
}

function App() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'votes' | 'createdAt'>('createdAt');

  // Load feedback from local storage on mount
  useEffect(() => {
    const storedFeedback = localStorage.getItem('feedbackItems');
    if (storedFeedback) {
      setFeedbackItems(JSON.parse(storedFeedback).map((item: FeedbackItem) => ({
        ...item,
        createdAt: new Date(item.createdAt) // Ensure createdAt is a Date object
      })));
    }
  }, []);

  // Save feedback to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('feedbackItems', JSON.stringify(feedbackItems));
  }, [feedbackItems]);

  const addFeedback = (title: string, description: string) => {
    const newItem: FeedbackItem = {
      id: crypto.randomUUID(),
      title,
      description,
      votes: 0,
      createdAt: new Date(),
    };
    setFeedbackItems(prevItems => [newItem, ...prevItems]);
  };

  const handleVote = (id: string, type: 'upvote' | 'downvote') => {
    setFeedbackItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, votes: type === 'upvote' ? item.votes + 1 : Math.max(0, item.votes - 1) }
          : item
      )
    );
  };

  const sortedFeedbackItems = [...feedbackItems].sort((a, b) => {
    if (sortBy === 'votes') {
      return b.votes - a.votes;
    }
    return b.createdAt.getTime() - a.createdAt.getTime(); // Most recent first
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-50 flex flex-col items-center p-4 sm:p-8">
      <header className="w-full max-w-4xl mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <MessageSquare size={48} className="text-sky-400 mr-3" />
          <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
            Feedback Board
          </h1>
        </div>
        <p className="text-slate-400 text-lg">Share your ideas and vote on your favorites!</p>
      </header>

      <div className="w-full max-w-4xl mb-6 flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'createdAt' ? 'default' : 'outline'}
            onClick={() => setSortBy('createdAt')}
            className={sortBy === 'createdAt' ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white'}
          >
            Sort by Newest
          </Button>
          <Button
            variant={sortBy === 'votes' ? 'default' : 'outline'}
            onClick={() => setSortBy('votes')}
            className={sortBy === 'votes' ? 'bg-sky-500 hover:bg-sky-600 text-white' : 'text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white'}
          >
            Sort by Votes
          </Button>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-sky-500 hover:bg-sky-600 text-white">
          <PlusCircle size={20} className="mr-2" />
          Add New Idea
        </Button>
      </div>

      <main className="w-full max-w-4xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedFeedbackItems.length === 0 && (
          <div className="col-span-full text-center py-10">
            <Card className="bg-slate-800 border-slate-700 shadow-xl">
              <CardContent className="p-10">
                <MessageSquare size={48} className="mx-auto text-slate-500 mb-4" />
                <h2 className="text-2xl font-semibold text-slate-300 mb-2">No feedback yet!</h2>
                <p className="text-slate-400">Be the first to share an idea.</p>
              </CardContent>
            </Card>
          </div>
        )}
        {sortedFeedbackItems.map(item => (
          <FeedbackCard key={item.id} item={item} onVote={handleVote} />
        ))}
      </main>

      <AddFeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddFeedback={addFeedback}
      />
      
      <footer className="w-full max-w-4xl mt-12 text-center text-slate-500 text-sm">
        <p>Built with Blink. Make something useful and beautiful.</p>
      </footer>
    </div>
  );
}

export default App;