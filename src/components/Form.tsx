import { Dispatch, useEffect, useState } from "react";
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activityReducer";
import { v4 as uuidv4 } from "uuid";

type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    nameActivity: '',
    calories: 0
}

export default function Form({ dispatch, state }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id) //para saber si se está escribiendo sobre un campo
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { calories, nameActivity } = activity
        return calories > 0 && nameActivity.trim() !== ''
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'save-activity', payload: { newActivity: activity } })
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Category:</label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="nameActivity" className="font-bold">Activity:</label>
                <input
                    id="nameActivity"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Example: food, salad, exercise, bicycle"
                    value={activity.nameActivity}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calories:</label>
                <input
                    id="calories"
                    type="number"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calories Ej: 300 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold text-white cursor-pointer disabled:opacity-10"
                value={activity.category === 1 ? 'Save food' : 'Save exercise'}
                disabled={!isValidActivity()}
            />
        </form>
    )
}
