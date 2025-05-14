import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowBigUp, ArrowBigDown, MessageSquare, CalendarDays } from 'lucide-react';
import { FeedbackItem } from '@/App'; // Assuming FeedbackItem is exported from App.tsx
import { Badge } from "@/components/ui/badge";

interface FeedbackCardProps {
  item: FeedbackItem;
  onVote: (id: string, type: 'upvote' | 'downvote') => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ item, onVote }) => {
  const timeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <Card className="bg-slate-800 border-slate-700 shadow-xl hover:shadow-sky-500/30 transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-sky-400 break-words">{item.title}</CardTitle>
        <div className="flex items-center text-xs text-slate-500 pt-1">
            <CalendarDays size={14} className="mr-1.5" />
            {timeAgo(new Date(item.createdAt))}
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <p className="text-slate-300 leading-relaxed break-words whitespace-pre-wrap">{item.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4 border-t border-slate-700">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => onVote(item.id, 'upvote')} className="text-slate-400 hover:text-green-500 hover:bg-slate-700 px-2 py-1">
            <ArrowBigUp size={20} className={`mr-1 ${item.votes > 0 ? 'text-green-500' : ''}`} /> 
          </Button>
          <span className={`font-bold text-lg ${item.votes > 0 ? 'text-green-400' : item.votes < 0 ? 'text-red-400' : 'text-slate-400'}`}>{item.votes}</span>
          <Button variant="ghost" size="sm" onClick={() => onVote(item.id, 'downvote')} className="text-slate-400 hover:text-red-500 hover:bg-slate-700 px-2 py-1">
            <ArrowBigDown size={20} className={`ml-1 ${item.votes < 0 ? 'text-red-500' : ''}`} />
          </Button>
        </div>
        <Badge variant="secondary" className="bg-sky-500/10 text-sky-400 border-sky-500/30">
          Idea
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default FeedbackCard;
