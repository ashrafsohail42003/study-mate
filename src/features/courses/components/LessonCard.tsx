"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import clsx from "clsx";
import TimeNeeded from "./TimeNeeded";

interface LessonCardProps {
    lesson: {
        id: string;
        title: string;
        timeRequired: number;
        status: string;
        order?: number | null;
    };
    isActive?: boolean;
}

const STATUS_STYLES: Record<
    string,
    { border: string; text: string }
> = {
    Completed: {
        border: "bg-accent",
        text: "text-accent",
    },
    "In Progress": {
        border: "bg-primary",
        text: "text-primary",
    },
    "Not Started": {
        border: "bg-border",
        text: "text-muted-foreground",
    },
};

export default function LessonCard({
    lesson,
    isActive,
}: LessonCardProps) {
    const [open, setOpen] = useState(false);
    const toggle = useCallback(
        () => setOpen((p) => !p),
        []
    );

    const style = STATUS_STYLES[lesson.status];

    return (
        <div className="flex">
            <div className={clsx("w-[2px]", style.border)} />

            <div
                className={clsx(
                    "border border-border bg-card-bg p-5 w-full transition-colors",
                    isActive && "bg-zinc-100 dark:bg-zinc-800"
                )}
            >
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex gap-2 items-center">
                            <Link href={`/lesson/${lesson.id}`}>
                                <h4
                                    className={clsx(
                                        "hover:underline",
                                        isActive && "font-bold"
                                    )}
                                >
                                    {lesson.title}
                                </h4>
                            </Link>
                            <span className={clsx("text-sm", style.text)}>
                                ({lesson.status})
                            </span>
                        </div>

                        <TimeNeeded minutes={lesson.timeRequired} />
                    </div>

                    <button
                        onClick={toggle}
                        aria-label="Toggle lesson"
                        className="p-1 rounded hover:bg-muted"
                    >
                        {open ? (
                            <ChevronDown size={18} />
                        ) : (
                            <ChevronRight size={18} />
                        )}
                    </button>
                </div>

                {open && (
                    <div className="ml-5 mt-3">
                        <Link
                            href={`/lesson/${lesson.id}`}
                            className="underline text-sm"
                        >
                            Continue Lesson
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
