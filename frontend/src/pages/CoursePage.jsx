import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { fallbackCourses } from "../data.js";

const modules = [
  {
    title: "Network Fundamentals",
    lessons: [
      { title: "Welcome and course roadmap", time: "06:10", free: true },
      { title: "How data travels across a network", time: "14:25", free: true },
      { title: "IPv4 addressing basics", time: "18:40" },
      { title: "Subnetting step by step", time: "22:05" },
    ],
  },
  {
    title: "Switching",
    lessons: [
      { title: "VLANs explained", time: "16:30" },
      { title: "Trunking and 802.1Q", time: "13:15" },
      { title: "Spanning Tree overview", time: "19:50" },
    ],
  },
  {
    title: "Routing",
    lessons: [
      { title: "Static routing lab", time: "21:00" },
      { title: "Routing between VLANs", time: "17:35" },
      { title: "OSPF fundamentals", time: "24:10" },
    ],
  },
  {
    title: "Network Automation",
    lessons: [
      { title: "Your first network script", time: "15:45" },
      { title: "Working with device APIs", time: "20:20" },
    ],
  },
];

function getCountdown(end) {
  const remaining = Math.max(
    0,
    new Date(end).getTime() + 86400000 - Date.now(),
  );
  return [
    Math.floor(remaining / 86400000),
    Math.floor((remaining % 86400000) / 3600000),
    Math.floor((remaining % 3600000) / 60000),
    Math.floor((remaining % 60000) / 1000),
  ];
}

export default function CoursePage() {
  const { id } = useParams();
  const [courses, setCourses] = useState(fallbackCourses);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const course = courses.find((item) => item.id === id);
  const endDate = course?.end;
  const [countdown, setCountdown] = useState(() =>
    getCountdown(
      fallbackCourses.find((item) => item.id === id)?.end ?? "1970-01-01",
    ),
  );

  useEffect(() => {
    fetch("/api/courses")
      .then((response) => response.json())
      .then((data) => Array.isArray(data) && data.length && setCourses(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!endDate) return undefined;
    const update = () => setCountdown(getCountdown(endDate));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [endDate]);

  useEffect(() => setSelectedLesson(null), [id]);

  if (!course) return <Navigate to="/" replace />;

  return (
    <main className="course-page">
      <div className="wrap">
        <Link to="/" className="back-link">
          ← All courses
        </Link>
        <div className="course-heading">
          <h1>{course.title}</h1>
          <p>{course.blurb}</p>
        </div>

        <div className="course-layout">
          <section
            className="course-main"
            aria-label="Course video and enrollment"
          >
            <div className="video-player">
              <div className="player-message">
                <button
                  className="play-button"
                  aria-label={selectedLesson ? "Play video" : "Select a video"}
                >
                  ▶
                </button>
                <strong>{selectedLesson?.title ?? "Select a video"}</strong>
                <span>
                  {selectedLesson
                    ? selectedLesson.free
                      ? "Free preview"
                      : "Enroll to watch this lesson"
                    : "First 2 videos are free preview"}
                </span>
              </div>
            </div>

            <div className="enrollment">
              <p>Enrollment closes in</p>
              <div className="countdown" aria-label="Time remaining to enroll">
                {countdown.map((value, index) => (
                  <div className="countdown-unit" key={index}>
                    <strong>{String(value).padStart(2, "0")}</strong>
                    <span>{["days", "hrs", "min", "sec"][index]}</span>
                  </div>
                ))}
              </div>
              <button className="btn enroll-button">Enroll now</button>
            </div>
          </section>

          <aside className="lesson-list" aria-label="Course lessons">
            {modules.map((module) => (
              <section className="module" key={module.title}>
                <h2>{module.title}</h2>
                <ul>
                  {module.lessons.map((lesson) => (
                    <li key={lesson.title}>
                      <button
                        className={
                          "lesson" +
                          (selectedLesson?.title === lesson.title
                            ? " selected"
                            : "")
                        }
                        onClick={() => setSelectedLesson(lesson)}
                        aria-label={`${lesson.free ? "Play" : "Preview"} ${lesson.title}`}
                      >
                        <span className="lesson-title">
                          <span className="lesson-icon" aria-hidden="true">
                            {lesson.free ? "▶" : "🔒"}
                          </span>
                          {lesson.title}
                          {lesson.free && (
                            <span className="free-label">FREE</span>
                          )}
                        </span>
                        <time>{lesson.time}</time>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </aside>
        </div>
      </div>
    </main>
  );
}
