import { useParams, useNavigate } from "react-router-dom";
import { internships } from "@/data/internships";
import Navbar from "@/components/Navbar";

const InternshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ FIX: match string + number
  const internship = internships.find((i) => String(i.id) === id);

  if (!internship) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Internship not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ✅ FIX: pass required props */}
      <Navbar
        isDark={false}
        toggleTheme={() => {}}
        searchQuery=""
        onSearchChange={() => {}}
      />

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate("/internships")} // ✅ better navigation
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back
        </button>

        {/* 🏷 Title */}
        <h1 className="text-3xl font-bold text-foreground">
          {internship.role}
        </h1>

        {/* 🏢 Company + Location */}
        <p className="text-lg text-muted-foreground">
          {internship.company} • {internship.location}
        </p>

        {/* 💼 Tags */}
        <div className="flex gap-3 text-sm">
          <span className="px-3 py-1 rounded bg-secondary">
            {internship.type}
          </span>
          <span className="px-3 py-1 rounded bg-secondary">
            {internship.category}
          </span>
          <span className="px-3 py-1 rounded bg-secondary">
            {internship.stipend || "N/A"}
          </span>
        </div>

        {/* 📄 Description */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground leading-relaxed">
            {internship.description || "No description available"}
          </p>
        </div>

        {/* 🛠 Skills (optional) */}
        {internship.skills && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Skills Required</h2>
            <div className="flex flex-wrap gap-2">
              {internship.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 🚀 Apply Button */}
        <button
          onClick={() => window.open((internship as any).applyLink || "#", "_blank")}
          className="mt-6 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default InternshipDetail;