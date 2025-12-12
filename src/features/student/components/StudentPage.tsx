'use client';
import Title from "@/components/ui/SectionTitle";
import CourseCard from "@/features/courses/components/CourseCard/Card";
import MiniToDoCard from "@/features/todos/components/MiniToDoCard";
import { Database } from '@/types/database.types';

type Task = Database['public']['Tables']['tasks']['Row'];
type Course = Pick<Database['public']['Tables']['courses']['Row'], 'id' | 'title' | 'description' | 'icon'>;

type StudentHomePageProps = {
  studentName: string;
  selectedRoadmap?: string;
  tasks: Task[];
  myCourses: (Course | null)[];
  suggestedCourses: Course[];
};

export default function StudentHomePage({
  studentName,
  selectedRoadmap,
  tasks,
  myCourses,
  suggestedCourses
}: StudentHomePageProps) {
  const hasRoadmap = !!selectedRoadmap;

  return (
    <div className="bg-bg min-h-screen p-[100px] flex flex-col gap-[50px]">
      <div className="max-w-[1400px] mx-auto space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 bg-card-bg rounded-xl shadow-md border border-border space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary">
              Welcome, <span className="text-primary">{studentName}!</span>
            </h1>
            <p className="text-text-secondary text-lg font-medium">
              Every step you take brings you closer to mastering your roadmap ✨
            </p>

            <div className="mt-4 p-4 rounded-lg border-l-4 border-primary bg-primary/10">
              <p className="text-text-primary font-semibold">
                Current Roadmap:
                <span className="ml-2 font-bold">
                  {hasRoadmap ? selectedRoadmap : "No roadmap selected yet"}
                </span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <MiniToDoCard tasks={tasks} />
          </div>
        </div>

        {myCourses.length > 0 && (
          <>
            <Title title="My Courses:" />
            <div className="flex flex-row gap-5 overflow-x-auto touch-pan-x pb-4">
              {myCourses.filter(Boolean).map((course) => (
                <CourseCard key={course!.id} course={course!} />
              ))}
            </div>
          </>
        )}

        {suggestedCourses.length > 0 && (
          <>
            <Title title="Suggested Courses:" />
            <div className="flex flex-row gap-5 overflow-x-auto touch-pan-x pb-4">
              {suggestedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}

        {myCourses.length === 0 && suggestedCourses.length === 0 && (
          <div className="text-center py-10 text-text-secondary">
            <p>No courses available. Please select a roadmap to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}