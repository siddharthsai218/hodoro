import { useState } from "react";

export default function AddIssue({ onClose, onAdded }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submitIssue = () => {

    if (!title || !description) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition((pos) => {

      fetch("http://localhost:5000/issues/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          road: title,
          description: description,
          city: "Bengaluru",
          state: "Karnataka",
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        })
      })
      .then(res => res.json())
      .then(() => {
        setLoading(false);
        onAdded();   // refresh dashboard
        onClose();   // close modal
      });

    });

  };

  return (
    <div className="add-modal">

      <div className="add-box">

        <h2>Add New Issue</h2>

        <input
          placeholder="Road / Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <button onClick={submitIssue}>
          {loading ? "Adding..." : "Submit"}
        </button>

        <button className="close-btn" onClick={onClose}>
          Cancel
        </button>

      </div>

    </div>
  );
}
