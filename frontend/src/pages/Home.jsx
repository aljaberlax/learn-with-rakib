import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fallbackCourses } from "../data.js";

const courseOrder = ["ccna", "security", "encor"];
const courseStats = {
  ccna: { modules: 3, videos: 10 },
  security: { modules: 2, videos: 5 },
  encor: { modules: 2, videos: 4 },
};

function getStatus(course) {
  const now = Date.now();
  const start = new Date(`${course.start}T00:00:00`).getTime();
  const end = new Date(`${course.end}T23:59:59`).getTime();

  if (now < start) return { key: "soon", label: "Coming soon" };
  if (now > end) return { key: "closed", label: "Enrollment closed" };
  return { key: "open", label: "Enrollment open" };
}

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Home() {
  const [courses, setCourses] = useState(fallbackCourses);
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") === "upcoming" ? "upcoming" : "all";

  useEffect(() => {
    fetch("/api/courses")
      .then((response) => response.json())
      .then((data) => Array.isArray(data) && data.length && setCourses(data))
      .catch(() => {});
  }, []);

  const orderedCourses = [...courses].sort((first, second) => {
    const firstOrder = courseOrder.indexOf(first.id);
    const secondOrder = courseOrder.indexOf(second.id);
    return (
      (firstOrder < 0 ? courseOrder.length : firstOrder) -
      (secondOrder < 0 ? courseOrder.length : secondOrder)
    );
  });
  const visibleCourses = orderedCourses.filter(
    (course) => view === "all" || getStatus(course).key === "soon",
  );

  return (
    <main className="catalog-page">
      <div className="wrap catalog-wrap">
        <section className="catalog-intro">
          <h1>Learn Cisco networking, step by step</h1>
          <p>
            Short video lessons, hands-on labs and timed enrollment windows. The
            first two videos of every course are free to watch.
          </p>
        </section>

        <section className="course-catalog" aria-label="Available courses">
          {visibleCourses.map((course) => {
            const status = getStatus(course);
            const stats = courseStats[course.id] ?? {
              modules: Math.ceil(course.videos / 5),
              videos: course.videos,
            };

            return (
              <article className="course-card" key={course.id}>
                <span className={`status-pill ${status.key}`}>
                  {status.label}
                </span>
                <h2>{course.title}</h2>
                <p className="course-blurb">{course.blurb}</p>
                <div className="course-meta">
                  <span>
                    {course.level} · {stats.modules} modules · {stats.videos}{" "}
                    videos
                  </span>
                  <span>
                    Enroll: {formatDate(course.start)} –{" "}
                    {formatDate(course.end)}
                  </span>
                </div>
                <Link className="btn view-course" to={`/courses/${course.id}`}>
                  View course
                </Link>
              </article>
            );
          })}
        </section>
        {visibleCourses.length === 0 && (
          <p className="catalog-empty">
            There are no upcoming courses right now.
          </p>
        )}
      </div>
      <section
        className="instructor-section"
        aria-labelledby="instructor-title"
      >
        <div className="wrap instructor-inner">
          <div className="instructor-copy">
            <p className="instructor-kicker">LEARN WITH RAKIB</p>
            <h2 id="instructor-title">Stop struggling. Start learning.</h2>
            <p>
              Build practical networking skills with focused lessons, hands-on
              labs, and guidance from an experienced Cisco instructor. Whether
              you are growing your skills or planning a career in networking,
              start with one clear step at a time.
            </p>
            <p className="instructor-byline">
              <strong>Learn with Rakib</strong> · Cisco networking courses and
              instructor-led lessons
            </p>
          </div>
          <div className="instructor-photo-wrap">
            <img
              className="instructor-photo"
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=85"
              alt="Portrait of a networking instructor"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
