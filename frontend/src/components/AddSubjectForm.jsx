import React, { useState } from 'react';

const AddSubjectForm = ({ onSubjectAdded }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSubject = {
      name,
      tasks: [
        { type: 'Assignments', done: 0, total: 0 },
        { type: 'Quizzes', done: 0, total: 0 },
        { type: 'Mid-Sem Syllabus', done: 0, total: 0, topics: [] },
        { type: 'End-Sem Syllabus', done: 0, total: 0, topics: [] },
      ],
    };

    try {
      onSubjectAdded(newSubject); // Let parent handle API call
      setName('');
    } catch (err) {
      console.error('Error adding subject:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 justify-center">
      <input
        type="text"
        placeholder="Enter subject name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-4 py-2 w-60 focus:outline-none focus:ring-2 ring-purple-300"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        Add Subject
      </button>
    </form>
  );
};

export default AddSubjectForm;
