export default function TimeNeeded({ minutes }: { minutes: number }) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return (
        <p className="text-sm text-text-secondary">
            {hours > 0 && `${hours} hours `}
            {mins} minutes
        </p>
    );
}
