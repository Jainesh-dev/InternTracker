import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";

interface Props {
  id: string | number;
}

const SaveButton = ({ id }: Props) => {
  const [saved, setSaved] = useState(false);

  const stringId = String(id);

  // 🔄 Load saved state
  useEffect(() => {
    try {
      const stored: string[] = JSON.parse(localStorage.getItem("saved") || "[]");
      setSaved(stored.includes(stringId)); // ✅ simplified
    } catch {
      setSaved(false);
    }
  }, [stringId]);

  // ⭐ Toggle Save
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const stored: string[] = JSON.parse(localStorage.getItem("saved") || "[]");

      let updated: string[];

      if (stored.includes(stringId)) {
        updated = stored.filter((item) => item !== stringId);
        setSaved(false);
      } else {
        updated = [...stored, stringId];
        setSaved(true);
      }

      localStorage.setItem("saved", JSON.stringify(updated));

      console.log("Saved:", updated);
    } catch {
      localStorage.setItem("saved", JSON.stringify([stringId]));
      setSaved(true);
    }
  };

  return (
    <button
      onClick={handleSave}
      className="p-2 rounded-xl hover:bg-secondary transition"
    >
      <Bookmark
        className={`h-5 w-5 transition ${
          saved
            ? "fill-blue-500 text-blue-500"
            : "text-muted-foreground"
        }`}
      />
    </button>
  );
};

export default SaveButton;