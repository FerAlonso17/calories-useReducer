import { useMemo } from "react"
import { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({ activities }: CalorieTrackerProps) {

    const consumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])
    const burned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])
    const total = useMemo(() => consumed-burned, [activities])

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Calories resume</h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CalorieDisplay calories={consumed} text='Consumed' />
                <CalorieDisplay calories={burned} text="Exercises" />
                <CalorieDisplay calories={total} text="Difference" />
            </div>
        </>
    )
}