import React, { useState, useEffect } from 'react';
import { HiMiniTrash } from 'react-icons/hi2';
import {
  fetchDeadlines,
  createDeadline,
  deleteDeadline as deleteDeadlineAPI,
  updateDeadlineCompletion,
} from '../api/deadlineAPI';

export default function DeadlineModal({ show, onClose }) {
  const [deadlines, setDeadlines] = useState([]);
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (show) loadDeadlines();
  }, [show]);

  const loadDeadlines = async () => {
    try {
      const res = await fetchDeadlines();
      setDeadlines(res.data);
    } catch (error) {
      console.error('Error fetching deadlines:', error);
    }
  };

  const addDeadline = async () => {
    if (!task.trim() || !date) return;

    try {
      const res = await createDeadline({
        title: task.trim(),
        deadline: new Date(date),
      });
      setDeadlines((prev) => [...prev, res.data]);
      setTask('');
      setDate('');
    } catch (error) {
      console.error('Error adding deadline:', error);
    }
  };

  const deleteDeadline = async (id) => {
    try {
      await deleteDeadlineAPI(id);
      setDeadlines((prev) => prev.filter((d) => d._id !== id));
    } catch (error) {
      console.error('Error deleting deadline:', error);
    }
  };
  const toggleCompletion = async (id) => {
    try {
      const updated = deadlines.map((d) => {
        if (d._id === id) {
          return { ...d, completed: !d.completed };
        }
        return d;
      });
      setDeadlines(updated);
  
      // Optional: Persist to backend
      await updateDeadlineCompletion(id, !deadlines.find(d => d._id === id).completed);
    } catch (err) {
      console.error("Error toggling completion:", err);
    }
  };
  
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full relative">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Deadlines</h2>

        <ul className="space-y-2 max-h-64 overflow-y-auto mb-4">
          {deadlines.map((d) => (
            <li key={d._id} className="flex items-center gap-2">
              <input
                  type="checkbox"
                  checked={d.completed}
                  onChange={() => toggleCompletion(d._id)}
              />
              <span className="flex-grow">
                {d.title} –{' '}
                <span className="text-sm text-gray-600">
                  {new Date(d.deadline).toLocaleDateString()}
                </span>
              </span>
              <button
                onClick={() => deleteDeadline(d._id)}
                className="text-red-600 hover:text-red-800"
                title="Delete deadline"
              >
                <HiMiniTrash />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Topic/Task name"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border px-3 py-1 rounded w-full"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border px-3 py-1 rounded w-full"
          />
          <button
            onClick={addDeadline}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Add Deadline
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
          title="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
