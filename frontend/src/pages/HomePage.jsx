import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-base-200/50">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      {/* Main container */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-10">
        {/* Page heading */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-base-content">
            Your Notes
          </h2>
          <div className="h-[1px] flex-1 ml-6 bg-base-content/10" />
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-xl bg-base-300 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && notes.length === 0 && !isRateLimited && (
          <div className="py-20">
            <NotesNotFound />
          </div>
        )}

        {/* Notes grid */}
        {!loading && notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </main>

      <footer className="py-12 text-center text-sm text-base-content/40">
        © 2025 NoteFreedom — All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
