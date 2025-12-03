import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-4 z-50">
      <div className="mx-auto max-w-5xl px-4">
        <div
          className="
            bg-base-200/70
            backdrop-blur-xl
            border border-base-content/10
            shadow-lg shadow-base-300/30
            rounded-2xl
            px-6 py-4
            flex items-center justify-between
          "
        >
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-primary font-mono">
              NoteFreedom
            </h1>
          </Link>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/create"
              className="
                flex items-center gap-2
                rounded-xl
                px-4 py-2
                bg-primary text-primary-content
                hover:bg-primary/90
                transition-all
                shadow-sm hover:shadow-md
                active:scale-[0.97]
              "
            >
              <PlusIcon className="size-5" />
              <span className="hidden sm:inline font-medium">New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
