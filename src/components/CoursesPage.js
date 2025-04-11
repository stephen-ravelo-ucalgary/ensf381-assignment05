import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CourseItem from './CourseItem';
import EnrollmentList from './EnrollmentList';
import courses from '../data/courses';
import { useAuth } from '../context/AuthContext';

const CoursesPage = () => {
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem('enrollments');
    return saved ? JSON.parse(saved) : [];
  });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('enrollments', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  const handleEnroll = async (course) => {
    
    const backendEndpoint = "http://127.0.0.1:5000/enroll/" + user.id;
    try {
      const response = await fetch(backendEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          'course': course,
        }), //Converts a JavaScript object or value into a JSON string.
      });
      const data = await response.json();
      
      if (data.success) {
        setError('');
        setEnrolledCourses(prev => [...prev, {
          ...course,
          enrollmentId: Date.now() // Unique ID for each enrollment
        }]);
      } else {
        setError('Failed to enroll in course!');
      }
    } catch (err) {
      console.error(err);
    }

  };

  const handleRemove = (enrollmentId) => {
    setEnrolledCourses(prev =>
      prev.filter(course => course.enrollmentId !== enrollmentId)
    );
  };

  async function getCourses() {
    try {
      const response = await fetch ("http://127.0.0.1:5000/courses", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      setCourses(data.courses);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />

      {error && (
        <div style={{
          color: '#D32F2F',
          backgroundColor: '#FFEBEE',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          {error}
        </div>
      )}

      <div style={{
        flex: 1,
        display: 'flex',
        padding: '20px',
        gap: '30px'
      }}>
        <div style={{ flex: 3 }}>
          <h2 style={{ color: '#004080' }}>Available Courses</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {courses.map(course => (
              <CourseItem
                key={course.id}
                course={course}
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        </div>

        <EnrollmentList
          enrolledCourses={enrolledCourses}
          onRemove={handleRemove}
        />
      </div>

      <Footer />
    </div>
  );
};

export default CoursesPage;
