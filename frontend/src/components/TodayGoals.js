import React, { useState, useEffect } from 'react';
import { IoMdCheckboxOutline } from "react-icons/io";
import { HiMiniTrash } from "react-icons/hi2";
import { getGoalsForToday, setGoalsForToday } from '../api/goalAPI';

export default function TodayGoals() {
  const [showModal, setShowModal] = useState(false);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const fetchGoals = async () => {
    try {
      const data = await getGoalsForToday(today);
      setDailyTasks(data.tasks || []);
    } catch (err) {
      console.log("No saved goals yet");
      setDailyTasks([]); // Start fresh if none exist
    }
  };

  const syncGoals = async (updatedTasks) => {
    try {
      await setGoalsForToday(today, updatedTasks);
    } catch (err) {
      console.error("Failed to sync tasks:", err);
    }
  };

  // Fetch goals whenever the modal is opened
  useEffect(() => {
    if (showModal) {
      fetchGoals();
    }
  }, [showModal]);

  const addTask = () => {
    if (newTask.trim()) {
      const updated = [...dailyTasks, { name: newTask.trim(), done: false }];
      setDailyTasks(updated);
      syncGoals(updated);
      setNewTask("");
    }
  };

  const toggleTask = (idx) => {
    const updated = [...dailyTasks];
    updated[idx].done = !updated[idx].done;
    setDailyTasks(updated);
    syncGoals(updated);
  };

  const deleteTask = (idx) => {
    const updated = [...dailyTasks];
    updated.splice(idx, 1);
    setDailyTasks(updated);
    syncGoals(updated);
  };

  const allDone = dailyTasks.length > 0 && dailyTasks.every(task => task.done);

  return (
    <>
      {/* Floating Icon */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-purple-700 hover:bg-purple-800 text-white p-4 rounded-full shadow-lg z-50 animate-bounce-slow"
        title="Today's Goal"
      >
        <IoMdCheckboxOutline className="text-2xl" />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full relative">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Today's Goals</h2>
            
            <ul className="space-y-2 mb-4 max-h-64 overflow-y-auto">
              {dailyTasks.map((task, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(idx)}
                  />
                  <span className={`flex-grow ${task.done ? 'line-through text-gray-500' : ''}`}>
                    {task.name}
                  </span>
                  <button
                    onClick={() => deleteTask(idx)}
                    className="text-purple-600 hover:text-red-600"
                    title="Delete task"
                  >
                    <HiMiniTrash />
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTask();
                  }
                }}
                className="border px-3 py-1 rounded w-full"
              />
              <button
                onClick={addTask}
                className="bg-purple-700 hover:bg-purple-800 text-white px-3 py-1 rounded"
              >
                Add
              </button>
            </div>

            {/* Close Modal */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {allDone && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 border border-green-400 rounded text-sm text-center">
          🎉 Congratulations! You completed all your daily tasks!
        </div>
      )}
    </>
  );
}
