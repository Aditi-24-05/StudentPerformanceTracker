import React, { useState, useEffect } from 'react';
import SubjectTable from './components/SubjectTable';
import AddSubjectForm from './components/AddSubjectForm';
import TodayGoals from './components/TodayGoals';
import DeadlineButton from './components/DeadlineButton';
import DeadlineModal from './components/DeadlineModal';

import {
  getSubjects,
  addSubject as addSubjectAPI,
  deleteSubject as deleteSubjectAPI,
} from './api/subjectAPI';

export default function App() {
  const [subjects, setSubjects] = useState([]);
  const [showDeadlineModal, setShowDeadlineModal] = useState(false);

  // Fetch all subjects from DB when component mounts
  useEffect(() => {
    fetchSubjectsFromDB();
  }, []);

  const fetchSubjectsFromDB = async () => {
    try {
      const response = await getSubjects();
      setSubjects(response.data);
    } catch (err) {
      console.error('Error fetching subjects:', err);
    }
  };

  // Add new subject and update UI
  const handleAddSubject = async (newSubject) => {
    try {
      const response = await addSubjectAPI(newSubject);
      const savedSubject = response.data;

      // Append new subject to UI
      setSubjects((prevSubjects) => [...prevSubjects, savedSubject]);
    } catch (err) {
      console.error('Error adding subject:', err);
    }
  };

  // Delete subject by index (based on position in UI)
  const handleDeleteSubject = async (indexToDelete) => {
    const subjectToDelete = subjects[indexToDelete];

    try {
      await deleteSubjectAPI(subjectToDelete._id);

      // Remove from UI
      setSubjects((prevSubjects) =>
        prevSubjects.filter((_, idx) => idx !== indexToDelete)
      );
    } catch (err) {
      console.error('Error deleting subject:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-purple-800">
         Student Progress Tracker
      </h1>

      {/* Form to add subject */}
      <AddSubjectForm onSubjectAdded={handleAddSubject} />

      <div className="mt-8">
        {/* Subject table list */}
        {subjects.map((subject, idx) => (
          <SubjectTable
            key={subject._id}
            subject={subject}
            index={idx}
            onDelete={handleDeleteSubject}
          />
        ))}

        {/* Floating actions */}
        <TodayGoals />
        <DeadlineButton onClick={() => setShowDeadlineModal(true)} />
        <DeadlineModal
          show={showDeadlineModal}
          onClose={() => setShowDeadlineModal(false)}
        />
      </div>
    </div>
  );
}
