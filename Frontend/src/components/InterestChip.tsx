import React from 'react';

interface InterestChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export const InterestChip: React.FC<InterestChipProps> = ({ label, selected, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
        selected
          ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border-purple-500 shadow-[0_0_10px_rgba(147,51,234,0.15)]'
          : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
};