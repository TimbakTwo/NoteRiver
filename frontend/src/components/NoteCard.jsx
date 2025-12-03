import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <div
      className="
        relative
        rounded-2xl
        bg-base-100
        border border-base-content/10
        shadow-md
        hover:shadow-xl
        transition-shadow
        overflow-hidden
        flex flex-col
      "
    >
      {/* Accent border top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-teal-400" />

      {/* Clickable area for viewing note */}
      <Link
        to={`/note/${note._id}`}
        className="flex-1 p-5 flex flex-col no-underline hover:no-underline"
      >
        <h3 className="text-lg font-semibold text-base-content mb-2 truncate">
          {note.title}
        </h3>

        <p className="text-base-content/70 flex-1 line-clamp-3 mb-4">
          {note.content}
        </p>

        <span className="text-xs text-base-content/50">
          {formatDate(new Date(note.createdAt))}
        </span>
      </Link>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 p-3 border-t border-base-content/10">
        <Link
          to={`/note/${note._id}`}
          className="p-2 rounded-md hover:bg-base-200 transition-colors text-primary"
        >
          <PenSquareIcon className="size-4" />
        </Link>

        <button
          onClick={(e) => handleDelete(e, note._id)}
          className="p-2 rounded-md hover:bg-red-100 transition-colors text-error"
        >
          <Trash2Icon className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
