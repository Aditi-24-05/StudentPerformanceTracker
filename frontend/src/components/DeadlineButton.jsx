import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

export default function DeadlineButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg z-50 animate-bounce-slow"

      title="Deadlines"
    >
      <FaCalendarAlt className="text-xl" />
    </button>
  );
}
