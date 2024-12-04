import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
function LinkSidebar({ name, icon, path }) {
  const [isActive, setIsActive] = useState(false);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes(path)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location.pathname]);

  if (!name, !icon, !path) {
    return null;
  }

  return (
    <Link
      id="link"
      to={`${path}`}
      className="grid items-center grid-cols-[20%_80%] gap-6 rounded-xl h-12 bg-transparent"
    >
      <div
        className={`${
          isActive ? "bg-slate-950 text-slate-50 border-transparent" : ""
        } flex items-center justify-center border-2  w-10 h-10 border-slate-200 rounded-full p-2`}
      >
        {icon}
      </div>
      <p className={`${isActive ? "" : "text-slate-700"} flex items-start`}>
        {name}
      </p>
    </Link>
  );
}

export default LinkSidebar;
