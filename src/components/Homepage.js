import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const Homepage = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [randomTestimonials, setRandomTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Get all courses
    getCourses();
    // Select 2 random testimonials
    getRandomTestimonials();
  }, []);

  // Select 3 random courses
  useEffect(() => {
    const shuffledCourses = [...courses].sort(() => 0.5 - Math.random());
    setFeaturedCourses(shuffledCourses.slice(0, 3));
  }, [courses])
  
  async function getRandomTestimonials() {
    setIsLoading(true);
    const backendEndpoint = "http://127.0.0.1:5000/testimonials";
    try {
      const response = await fetch(backendEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      setRandomTestimonials(data.randomTestimonials);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getCourses() {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* About Section */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#004080', marginBottom: '15px' }}>About Our LMS</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            Welcome to the Learning Management System designed to empower students and educators
            with cutting-edge online learning tools. Our platform offers structured courses,
            interactive content, and progress tracking to enhance your learning experience.
          </p>
        </section>

        {/* Featured Courses */}
        {isLoading ? null : (
          <section style={{ marginBottom: '40px' }}>
            <h3 style={{ color: '#004080', marginBottom: '20px' }}>Featured Courses</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {featuredCourses.map(course => (
                <div key={course.id} style={{
                  backgroundColor: '#e6f2ff',
                  borderRadius: '10px',
                  padding: '15px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <img
                    src={course.image}
                    alt={course.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '5px'
                    }}
                  />
                  <h4 style={{ margin: '10px 0', color: '#003366' }}>{course.name}</h4>
                  <p style={{ fontSize: '0.9rem' }}>{course.instructor}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Testimonials */}
        {isLoading ? null : (
          <section>
            <h3 style={{ color: '#004080', marginBottom: '20px' }}>Student Testimonials</h3>
            <div style={{
              display: 'grid',
              gap: '20px',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
            }}>
              {randomTestimonials.map((testimonial, index) => (
                <div key={index} style={{
                  backgroundColor: '#f9f9f9',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid #e0e0e0'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px'
                  }}>
                    <h4 style={{ margin: 0 }}>{testimonial.studentName}</h4>
                    <div style={{ color: '#ffd700' }}>
                      {'★'.repeat(testimonial.rating)}
                    </div>
                  </div>
                  <p style={{ fontStyle: 'italic', margin: 0 }}>
                    "{testimonial.review}"
                  </p>
                  <p style={{
                    marginTop: '10px',
                    fontSize: '0.9rem',
                    color: '#666'
                  }}>
                    Course: {testimonial.courseName}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;
