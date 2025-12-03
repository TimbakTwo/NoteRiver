import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-15 px-4 sm:px-6 lg:px-8 space-y-8 max-w-lg mx-auto text-center">
      {/* Floating glassy icon container */}
      <div className="bg-gradient-to-tr from-primary/20 via-primary/10 to-base-100 rounded-full p-10 shadow-lg flex items-center justify-center transition-transform transform hover:scale-105">
        <NotebookIcon className="size-14 text-primary" />
      </div>

      {/* Heading */}
      <h3 className="text-3xl sm:text-4xl font-extrabold text-base-content tracking-tight">
        No Notes Yet
      </h3>

      {/* Description */}
      <p className="text-base sm:text-lg text-base-content/70 max-w-sm">
        Ready to organize your thoughts? Create your first note and start your
        journey to stay productive and organized.
      </p>

      {/* Call-to-action button */}
      <Link
        to="/create"
        className="
          btn btn-primary
          px-8 py-3
          text-lg font-medium
          rounded-xl
          shadow-md
          hover:shadow-lg
          transition-all
          hover:-translate-y-1
          active:scale-95
        "
      >
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;
