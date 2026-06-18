import { useState, useEffect } from "react";

interface Props {
  id: string;
}

const ApplyButton = ({ id }: Props) => {
  const [applied, setApplied] = useState(false);

  // 🔄 Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("applied") || "[]");
    if (stored.includes(id)) {
      setApplied(true);
    }
  }, [id]);

  // 🚀 Handle Apply
  const handleApply = () => {
    const stored = JSON.parse(localStorage.getItem("applied") || "[]");

    if (!stored.includes(id)) {
      const updated = [...stored, id];
      localStorage.setItem("applied", JSON.stringify(updated));
      setApplied(true);
    }
  };

  return (
    <button
      onClick={handleApply}
      disabled={applied}
      className={`px-6 py-3 rounded-xl font-semibold transition ${
        applied
          ? "bg-green-500 text-white cursor-not-allowed"
          : "bg-primary text-white hover:opacity-90"
      }`}
    >
      {applied ? "Applied ✅" : "Apply Now"}
    </button>
  );
};

export default ApplyButton;