interface WeeklyTagSelectorProps {
  tags: string[];
  selected: string;
  onChange: (tag: string) => void;
}

export default function WeeklyTagSelector({ tags, selected, onChange }: WeeklyTagSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onChange(tag === selected ? '' : tag)}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            selected === tag
              ? 'bg-gray-800 text-white'
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
