  import React, { useState } from 'react';
  import { HiMiniTrash } from "react-icons/hi2";
  import { IoAddCircle } from "react-icons/io5";
  import { deleteSubject, updateSubject } from '../api/subjectAPI';


  export default function SubjectTable({ subject, index, onDelete }) {
    const [tasks, setTasks] = useState(
      subject.tasks.map(task =>
        task.type.includes('Syllabus')
          ? { ...task, topics: task.topics || [] }
          : { ...task, deadline: task.deadline || '' }
      )
    );
    const [newTopics, setNewTopics] = useState({});

    const updateTask = async (idx, field, value) => {
      const updated = [...tasks];
      updated[idx][field] = field === 'deadline' ? value : parseInt(value) || 0;
      setTasks(updated);
      await updateSubject(subject._id, { tasks: updated });
    };

    const addTopic = async (taskIndex) => {
      const topicName = newTopics[taskIndex]?.trim();
      if (!topicName) return;
      const updated = [...tasks];
      updated[taskIndex].topics.push({ name: topicName, done: false });
      updated[taskIndex].total = updated[taskIndex].topics.length;
      updated[taskIndex].done = updated[taskIndex].topics.filter(t => t.done).length;
      setTasks(updated);
      setNewTopics({ ...newTopics, [taskIndex]: '' });
      await updateSubject(subject._id, { tasks: updated });
    };

    const deleteTopic = async (taskIndex, topicIndex) => {
      const updated = [...tasks];
      updated[taskIndex].topics.splice(topicIndex, 1);
      updated[taskIndex].total = updated[taskIndex].topics.length;
      updated[taskIndex].done = updated[taskIndex].topics.filter(t => t.done).length;
      setTasks(updated);
      await updateSubject(subject._id, { tasks: updated });
    };

    const toggleTopic = async (taskIndex, topicIndex) => {
      const updated = [...tasks];
      const topic = updated[taskIndex].topics[topicIndex];
      topic.done = !topic.done;
      updated[taskIndex].done = updated[taskIndex].topics.filter(t => t.done).length;
      setTasks(updated);
      await updateSubject(subject._id, { tasks: updated });
    };

    const handleDeleteSubject = async () => {
      await deleteSubject(subject._id);
      onDelete(index);
    };

    const nonSyllabusTasks = tasks.filter(task => !task.type.includes('Syllabus'));
    const syllabusTasks = tasks.filter(task => task.type.includes('Syllabus'));

    const getTotalDone = tasks.reduce((sum, task) => sum + task.done, 0);
    const getTotalTasks = tasks.reduce((sum, task) => sum + task.total, 0);
    const percentage = getTotalTasks > 0 ? Math.round((getTotalDone / getTotalTasks) * 100) : 0;

    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 mx-auto w-full max-w-2xl relative">
        {/* Title + Trash icon aligned */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-purple-700">{subject.name}</h2>
          <button
            onClick={handleDeleteSubject}
            className="text-purple-700 hover:text-purple-900 font-bold text-2xl"
            title="Delete subject"
          >
            <HiMiniTrash />
          </button>
        </div>

        {/* Table for Assignments and Quizzes */}
        {nonSyllabusTasks.length > 0 && (
          <table className="w-full text-center mb-6">
            <thead>
              <tr className="bg-purple-100">
                <th className="p-2">Category</th>
                <th className="p-2">Completed</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {nonSyllabusTasks.map((task, idx) => (
                <tr key={idx}>
                  <td className="p-2 font-medium">{task.type}</td>
                  <td>
                    <input
                      type="number"
                      className="border px-2 py-1 w-16 text-center rounded"
                      value={task.done}
                      onChange={(e) => updateTask(tasks.indexOf(task), 'done', e.target.value)}
                      min="0"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="border px-2 py-1 w-16 text-center rounded"
                      value={task.total}
                      onChange={(e) => updateTask(tasks.indexOf(task), 'total', e.target.value)}
                      min="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Syllabus Section */}
        {syllabusTasks.length > 0 && (
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">Syllabus</h3>
            {syllabusTasks.map((task, idx) => (
              <div key={idx} className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-md font-medium">{task.type}</span>
                  <span className="text-sm text-gray-600">
                    {task.done}/{task.total} topics completed
                  </span>
                </div>

                <ul className="space-y-2 mb-3">
                  {task.topics.map((topic, topicIdx) => (
                    <li key={topicIdx} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={topic.done}
                        onChange={() => toggleTopic(tasks.indexOf(task), topicIdx)}
                      />
                      <span className={`flex-grow ${topic.done ? 'line-through text-gray-500' : ''}`}>
                        {topic.name}
                      </span>
                      <button
                        onClick={() => deleteTopic(tasks.indexOf(task), topicIdx)}
                        className="text-purple-700 hover:text-purple-900"
                        title="Delete topic"
                      >
                        <HiMiniTrash />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add new topic"
                    value={newTopics[tasks.indexOf(task)] || ''}
                    onChange={(e) =>
                      setNewTopics({ ...newTopics, [tasks.indexOf(task)]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTopic(tasks.indexOf(task));
                      }
                    }}
                    className="border px-3 py-1 rounded w-full"
                  />
                  <button
                    onClick={() => addTopic(tasks.indexOf(task))}
                    className="text-purple-700 text-2xl hover:text-purple-900"
                    title="Add topic"
                  >
                    <IoAddCircle />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="text-sm font-medium text-gray-600 mb-1">
            Completion: {percentage}%
          </div>
          <div className="w-full bg-gray-200 rounded h-4">
            <div
              className="bg-purple-500 h-4 rounded transition-all duration-300"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
