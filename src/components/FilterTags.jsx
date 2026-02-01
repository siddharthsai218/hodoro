

import "./FilterTags.css";

export default function FilterTags({ active, setActive }) {

  const tags = ["overview", "accidents", "public transport", "potholes", "user_added"];

  return (
    <div className="filter-tags">
      {tags.map(tag => (
        <button
          key={tag}
          className={`tag ${active === tag ? "active" : ""}`}
          onClick={() => setActive(tag)}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}

