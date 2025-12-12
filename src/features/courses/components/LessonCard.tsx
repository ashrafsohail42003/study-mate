import rigthArrow from "../../../public/rightArrow.svg"
import downArrow from "../../../public/downArrow.svg"
import { useState } from "react"
import Link from "next/link"
import TimeNeeded from "./TimeNeeded"

type lessonCardProps = {
    lesson: {
        id: string,
        title: string
        content?: string | null,
        timeRequired: number,
        status: string,
        order?: number | null
    },
    isActive?: boolean
}
export default function LessonCard({ lesson, isActive }: lessonCardProps) {
    const [isLessonOpened, setIsLessonOpened] = useState(false)
    function handleOnClick() {
        setIsLessonOpened(!isLessonOpened)
    }

    function handleStatusText() {
        if (lesson.status == "Completed")
            return <h4 className="text-accent">({lesson.status})</h4>
        else if (lesson.status == "In Progress")
            return <h4 className="text-primary">({lesson.status})</h4>
        else
            return <h4 className="text-text-secondary">({lesson.status})</h4>
    }

    function handleStatusLine() {
        if (lesson.status == "Completed")
            return <div className="h-full w-[0.2%] bg-accent"></div>
        else if (lesson.status == "In Progress")
            return <div className="h-full w-[0.2%] bg-primary"></div>
        else
            return <div className="h-full w-[0.2%] bg-border"></div>
    }

    return (<div className="flex flex-row">

        {handleStatusLine()}
        <div className={`border border-border bg-card-bg p-[20px] flex flex-col gap-[20px] w-[99.8%] ${isActive ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-[5px]">
                    <div className="flex flex-row gap-[5px]">
                        <Link className="text-text-primary" href={`/lesson/${lesson.id}`} >
                            <h4 className={isActive ? "font-bold" : ""}> {lesson.title} </h4>
                        </Link>
                        {handleStatusText()}
                    </div>
                    <TimeNeeded minutes={lesson.timeRequired} />
                </div>

                <img
                    className="w-[15px] text-border cursor-pointer"
                    onClick={handleOnClick}
                    src={isLessonOpened ? downArrow.src : rigthArrow.src}
                />
            </div>
            {isLessonOpened && <div className="ml-[20px] flex flex-col gap-[10px]">
                {lesson.content && <p>{lesson.content}</p>}
                {/* send the lesson by link */}
                <Link className="text-text-primary underline" href={`/lesson/${lesson.id}`} >Continue Lesson</Link>
            </div>}

        </div>
    </div>)
}