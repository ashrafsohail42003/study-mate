import Link from "next/link";
import Title from "@/components/ui/SectionTitle";
import LessonCard from "./LessonCard";
import { Database } from '@/types/database.types';

type LessonType = Database['public']['Tables']['lessons']['Row'];
type ProgressType = Database['public']['Tables']['user_lesson_progress']['Row'];

interface CourseProps {
  id: string;
  courseTitle: string;
  lessons: Pick<LessonType, 'id' | 'title' | 'duration' | 'order_index'>[];
  progress: Pick<ProgressType, 'lesson_id' | 'status'>[];
  currentLessonId?: string;
}

export default function Course({ id, courseTitle, lessons, progress, currentLessonId }: CourseProps) {

  const getLessonStatus = (lessonId: string) => {
    const p = progress.find(p => p.lesson_id === lessonId);
    return p?.status || 'Not Started';
  };

  return (<div className="flex flex-col gap-[50px]">
    {courseTitle && <Title title={courseTitle} />}
    <div className="overflow-y-scroll h-[700px] pr-2">
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          lesson={{
            id: lesson.id,
            title: lesson.title,
            status: getLessonStatus(lesson.id),
            timeRequired: lesson.duration || 0,
            content: '', // Or undefined if you prefer
            order: lesson.order_index
          }}
          isActive={currentLessonId === lesson.id}
        />
      ))}
    </div>
  </div>)
}