import { create } from 'zustand';
import { BACKEND } from './constants';

export interface UserValues {
	superfit_dis: number
	superfit_sin: number
	superfit_cur: number
	superfit_int: number
	superfit_eng: number
	superfit_res: number
	lifestyle_classic: number
	lifestyle_order: number
	lifestyle_change: number
	lifestyle_tireless: number
	lifestyle_explorer: number
	lifestyle_specialist: number
	lifestyle_generalist: number
	lifestyle_hybrid: number
	interest: string
	objective: string
}

export interface JourneyStore {
    loading: boolean
    hasErrors: boolean
    get_journeys_by_values: (values: UserValues) => Promise<any>
	get_journeys_by_id: (id: number) => Promise<any>
	setHasErrors: (hasErrors: boolean) => void
	setLoading: (loading: boolean) => void
}

export const useJourneyStore = create<JourneyStore>()((set) => ({
    loading: false,
    hasErrors: false,
    get_journeys_by_values: async (values) => {
        set({ loading: true })
	    return new Promise((resolve) => {
			// body must be divided into superfit and lifestyle
			const body = {
				"superfit": {
					"superfit_dis": values.superfit_dis,
					"superfit_sin": values.superfit_sin,
					"superfit_cur": values.superfit_cur,
					"superfit_int": values.superfit_int,
					"superfit_eng": values.superfit_eng,
					"superfit_res": values.superfit_res,
				},
				"lifestyle": {
					"lifestyle_classic": values.lifestyle_classic,
					"lifestyle_order": values.lifestyle_order,
					"lifestyle_change": values.lifestyle_change,
					"lifestyle_tireless": values.lifestyle_tireless,
					"lifestyle_explorer": values.lifestyle_explorer,
					"lifestyle_specialist": values.lifestyle_specialist,
					"lifestyle_generalist": values.lifestyle_generalist,
					"lifestyle_hybrid": values.lifestyle_hybrid,
				},
				"extras": {
					"interest": values.interest,
					"objective": values.objective
				}
			}


            fetch(`${BACKEND}/api/rest/journeys/unknown`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body)
			})
			.then((response) => response.json())
			.then((data) => {
				if (data.error == false && "journeys" in data) {
					if (data["journeys"].error !== undefined) {
						set({ loading: false, hasErrors: true })
						resolve([false, "No journeys found"]);
					} else {
						set({ loading: false, hasErrors: false })
						resolve([true, data["journeys"]]);
					}
				} else {
					set({ loading: false, hasErrors: true })
					resolve([false, data["message"]]);
				}
			})
			.catch((error) => {
				console.log(error);
				set({ loading: false, hasErrors: true })
				resolve([false, error]);
			});
        });
    },
	get_journeys_by_id: async (id: number) => {
        set({ loading: true })
	    return new Promise((resolve) => {
			// body must be divided into superfit and lifestyle
			const body = {
				"user_id": id,
			}


            fetch(`${BACKEND}/api/rest/journeys/known`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body)
			})
			.then((response) => response.json())
			.then((data) => {
				if (data.error == false && "journeys" in data) {
					if (data["journeys"].error !== undefined) {
						set({ loading: false, hasErrors: true })
						resolve([false, "No journeys found"]);
					} else {
						set({ loading: false, hasErrors: false })
						resolve([true, data["journeys"]]);
					}
				} else {
					set({ loading: false, hasErrors: true })
					resolve([false, data["message"]]);
				}
			})
			.catch((error) => {
				console.log(error);
				set({ loading: false, hasErrors: true })
				resolve([false, error]);
			});
        });
    },
	setHasErrors: (hasErrors: boolean) => set({ hasErrors: hasErrors }),
	setLoading: (loading: boolean) => set({ loading: loading }),
}))