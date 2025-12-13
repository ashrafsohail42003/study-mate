'use client'
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/SectionTitle";
import RoadmapCard from "./RoadmapCard";

type LessonProgress = {
  id: string;
  course_id: string;
  title: string;
  duration: number;
  order: number;
  isCompleted: boolean;
};

type CourseWithProgress = {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  estimated_hours: number | null;
  status: 'completed' | 'in progress' | 'not started';
  donePercentage: number;
  lessons: LessonProgress[];
};

type MyRoadmapProps = {
  courses: CourseWithProgress[];
};

export default function MyRoadmap({ courses }: MyRoadmapProps) {
  const [showDone, setShowDone] = useState(false);

  const displayedCourses = useMemo(() => {
    if (showDone) {
      return courses.filter((course) => course.status === "completed");
    }
    return courses;
  }, [courses, showDone]);


  return (
    <main className="max-w-6xl mx-auto py-8 md:py-12 px-4 space-y-8" role="region" aria-labelledby="roadmap-title">
      <header className="flex items-center justify-between border-b pb-4">
        <Title title="My Learning Roadmap" />
        <Button
          onClick={() => setShowDone(!showDone)}
          aria-pressed={showDone}
          variant="outline"
        >
          {showDone ? "Show All Courses" : "Show Completed Courses"}
        </Button>
      </header>

      <section aria-live="polite" className="space-y-6">
        {displayedCourses.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed text-gray-500 dark:text-gray-400">
            {showDone
              ? <p>You haven't completed any courses yet!</p>
              : <p>No courses found in your selected roadmap. Please check your profile settings.</p>
            }
          </div>
        ) : (
          <ul className="space-y-4">
            {displayedCourses.map((course) => (
              <li key={course.id}>
                <RoadmapCard course={course} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}