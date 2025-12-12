'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Title from "@/components/ui/SectionTitle";
import RoadmapCard from "./RoadmapCard";

type CourseWithProgress = {
  id: string;
  title: string;
  description: string;
  status: string;
  donePercentage: number;
  lessons: Array<{
    id: string;
    course_id: string | null;
    title: string;
    duration: number;
    order: number;
  }>;
};

type MyRoadmapProps = {
  courses: CourseWithProgress[];
};

export default function MyRoadmap({ courses }: MyRoadmapProps) {
  const [done, setDone] = useState(false);
  const [myCourses, setMyCourses] = useState(courses);

  function handleDoneCourses() {
    setDone(!done);
    if (!done) {
      setMyCourses(courses.filter((course) => course.status === "completed"));
    } else {
      setMyCourses(courses);
    }
  }

  return (
    <div className="p-[100px] flex flex-col gap-[50px]">
      <div className="flex flex-row items-center justify-between">
        <Title title={done ? "My Roadmap / Done Courses" : "My Roadmap"} />
        <Button onClick={handleDoneCourses}>
          {done ? "All Courses" : "Done Courses"}
        </Button>
      </div>

      {myCourses.length === 0 ? (
        <div className="text-center text-text-secondary py-10">
          <p>No courses found. Please enroll in a roadmap to get started.</p>
        </div>
      ) : (
        myCourses.map((course) => <RoadmapCard key={course.id} course={course} />)
      )}
    </div>
  );
}