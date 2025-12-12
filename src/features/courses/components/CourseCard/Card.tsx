'use client'
import { useRouter } from "next/navigation"
import { Database } from '@/types/database.types';

type Course = Database['public']['Tables']['courses']['Row'];

type cardProps = {
    course: Pick<Course, 'id' | 'title' | 'description'>
}


export default function CourseCard({ course }: cardProps) {
    const router = useRouter();
    function handleRoadmapCardOnClick() {
        router.push(`/course/${course.id}`)

    }
    return (<div
        className="border border-border p-[30px] rounded-lg shadow-md max-w-[300px] shrink-0 flex flex-col gap-[30px] bg-card-bg transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
        onClick={handleRoadmapCardOnClick}>
        <h1 className="text-xl font-bold text-primary">{course.title}</h1>
        <p className="text-text-secondary text-base">{course.description}</p>
    </div>)
}