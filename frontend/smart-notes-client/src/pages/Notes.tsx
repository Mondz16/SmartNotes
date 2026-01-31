import { useEffect, useState } from "react";
import { getNotes, createNote } from "../api/notesApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const [notes, setNotes] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { logout } = useAuth();
  const navigate = useNavigate();

  const load = async () => {
    const res = await getNotes();
    setNotes(res.data);
  };

  const submit = async () => {
    await createNote(title, content);
    setTitle("");
    setContent("");
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="absolute top-6 left-6">
        <h1 className="text-white text-2xl font-extrabold">SmartNote</h1>
      </div>

      <div className="absolute top-4 right-6">
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-white/10 text-white px-3 py-2 rounded-md border border-white/20 hover:bg-white/20 transition"
        >
          Logout
        </button>
      </div>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl shadow-lg w-full max-w-4xl mx-4">
        <h2 className="text-xl font-semibold mb-4 text-white/95 text-center">My Notes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="p-3 rounded bg-white bg-opacity-90 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/60"
          />

          <textarea
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="p-3 rounded bg-white bg-opacity-90 placeholder-gray-600 md:col-span-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-white/60"
          />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={submit}
            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white py-2 px-4 rounded-md hover:opacity-95"
          >
            Add
          </button>
        </div>

        <ul className="space-y-4">
          {notes.map(n => (
            <li key={n.id} className="bg-white p-4 rounded shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <b className="block text-lg">{n.title}</b>
                  <p className="text-sm text-gray-700 mt-1">{n.summary ?? n.content}</p>
                </div>
                <small className="text-gray-500">{n.tags}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
