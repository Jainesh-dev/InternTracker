import React from 'react';
import { X } from 'lucide-react';

interface SkillChipProps {
  label: string;
  selected?: boolean;
  onToggle?: () => void;
  onRemove?: () => void;
  custom?: boolean;
}

export const SkillChip: React.FC<SkillChipProps> = ({ label, selected, onToggle, onRemove, custom }) => {
  if (custom) {
    return (
      <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border bg-blue-500/10 text-blue-400 border-blue-500/30">
        <span>{label}</span>
        {onRemove && (
          <button type="button" onClick={onRemove} className="hover:text-red-400 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
        selected
          ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_10px_rgba(37,99,235,0.3)]'
          : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
};