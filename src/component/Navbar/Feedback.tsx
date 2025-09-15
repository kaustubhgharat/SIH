import React, { useState } from "react";
import { Star, MessageSquare, Bug, Lightbulb, PartyPopper, Loader2, Send } from "lucide-react";

// --- Type Definitions ---
type FeedbackCategory = "Bug Report" | "Feature Request" | "Praise" | "General Comment";
type FormStatus = "idle" | "submitting" | "submitted";

// --- Helper & Reusable Components ---
const StarRating: React.FC<{ rating: number; onRate: (rate: number) => void }> = ({ rating, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);
  return (
    <div className="flex justify-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onRate(star)}
          className="p-1 transition-transform transform hover:scale-125 focus:outline-none"
          aria-label={`Rate ${star} out of 5 stars`}
        >
          <Star
            size={32}
            className={`transition-colors ${
              (hoverRating || rating) >= star ? "text-yellow-400" : "text-slate-300"
            }`}
            fill={ (hoverRating || rating) >= star ? "currentColor" : "none" }
          />
        </button>
      ))}
    </div>
  );
};

const CategorySelector: React.FC<{ selected: FeedbackCategory | ''; onSelect: (category: FeedbackCategory) => void }> = ({ selected, onSelect }) => {
    const categories: { name: FeedbackCategory; icon: React.ElementType }[] = [
        { name: "Bug Report", icon: Bug },
        { name: "Feature Request", icon: Lightbulb },
        { name: "Praise", icon: PartyPopper },
        { name: "General Comment", icon: MessageSquare },
    ];
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map(({ name, icon: Icon }) => (
                <button
                    key={name}
                    type="button"
                    onClick={() => onSelect(name)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all duration-200 ${
                        selected === name 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-600 shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700'
                    }`}
                >
                    <Icon size={24} />
                    <span className="text-sm font-semibold">{name}</span>
                </button>
            ))}
        </div>
    );
};


// --- Main Feedback Component ---
const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState<FeedbackCategory | ''>('');
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!rating || !category || !comment) {
        alert("Please fill out all fields before submitting.");
        return;
    }
    
    setStatus("submitting");
    console.log({ rating, category, comment });

    // Simulate an API call
    setTimeout(() => {
      setStatus("submitted");
    }, 1500);
  };

  const resetForm = () => {
      setRating(0);
      setCategory('');
      setComment("");
      setStatus("idle");
  };

  if (status === "submitted") {
      return (
        <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center bg-white p-10 rounded-2xl shadow-lg border border-slate-200">
                <PartyPopper className="w-16 h-16 mx-auto text-emerald-500" />
                <h2 className="mt-4 text-3xl font-bold text-slate-800">Thank You!</h2>
                <p className="mt-2 text-slate-600">Your feedback is valuable to us. We appreciate you taking the time to share your thoughts.</p>
                <button 
                    onClick={resetForm}
                    className="mt-8 w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-md"
                >
                    Submit Another Feedback
                </button>
            </div>
        </div>
      );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Share Your Feedback</h1>
                <p className="mt-2 text-slate-500">How was your experience? We'd love to hear from you.</p>
            </header>
          
            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <label className="block text-center text-lg font-semibold text-slate-700 mb-4">1. How would you rate our service?</label>
                    <StarRating rating={rating} onRate={setRating} />
                </div>

                <div>
                    <label className="block text-center text-lg font-semibold text-slate-700 mb-4">2. What is your feedback about?</label>
                    <CategorySelector selected={category} onSelect={setCategory} />
                </div>
              
                <div>
                    <label htmlFor="comment" className="block text-center text-lg font-semibold text-slate-700 mb-4">3. Please share any additional comments.</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us more about your experience..."
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                </div>
              
                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-600 text-white font-semibold text-lg hover:bg-emerald-700 transition-colors shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    {status === 'submitting' ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                    {status === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;