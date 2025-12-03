import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-focus transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Notes
          </Link>

          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 btn btn-error btn-outline"
          >
            <Trash2Icon className="h-5 w-5" />
            Delete Note
          </button>
        </div>

        {/* Card */}
        <div className="bg-base-100 rounded-2xl shadow-lg p-6 sm:p-8 border border-base-content/10">
          {/* Title */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text font-medium text-base-content/80">
                Title
              </span>
            </label>
            <input
              type="text"
              placeholder="Note title"
              className="input input-bordered input-lg rounded-lg text-base-content/90"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </div>

          {/* Content */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text font-medium text-base-content/80">
                Content
              </span>
            </label>
            <textarea
              placeholder="Write your note here..."
              className="textarea textarea-bordered h-40 rounded-lg text-base-content/90 resize-none"
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
            />
          </div>

          {/* Save button */}
          <div className="flex justify-end">
            <button
              className="btn btn-primary btn-lg transition-transform hover:scale-[1.02] flex items-center gap-2"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <>
                  <LoaderIcon className="animate-spin size-5" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
