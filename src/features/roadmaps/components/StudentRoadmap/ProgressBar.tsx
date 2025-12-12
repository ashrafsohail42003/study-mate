

type progressBarProps = {
    donePersantage: number
}

export default function ProgressBar({ donePersantage }: progressBarProps) {
    return (<div className="w-full">
        <div className="bg-border w-full h-[10px] rounded-md">
            <div style={{ width: `${donePersantage}%` }} className="bg-accent h-[10px] rounded-md"></div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <p className="text-text-secondary text-xs">{donePersantage}% done</p>
        </div>

    </div>)
}