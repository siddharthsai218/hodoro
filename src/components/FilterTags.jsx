import "./FilterTags.css";

const tags = ["overview", "accidents", "public transport", "potholes"];

export default function FilterTags({ active, setActive }) {
  return (
    <div className="filters">
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
