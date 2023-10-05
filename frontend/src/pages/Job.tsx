import { useJobStore } from '../features/gestors'
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'


export const JobPage = () => {
	const navigate = useNavigate()
	const { loading, hasErrors, get_jobs, setHasErrors } = useJobStore()
	const [values, setValues] = useState({
		superfit_dis: 0,
		superfit_sin: 0,
		superfit_cur: 0,
		superfit_int: 0,
		superfit_eng: 0,
		superfit_res: 0,
		lifestyle_classic: 0,
		lifestyle_order: 0,
		lifestyle_change: 0,
		lifestyle_tireless: 0,
		lifestyle_explorer: 0,
		lifestyle_specialist: 0,
		lifestyle_generalist: 0,
	})
	const [jobs, setJobs] = useState({
		jobs: []
	})


	async function handleFetchJobs() {
		const [success, dataOrMessage] = await get_jobs(values);

		if (success) {
			setJobs({jobs: dataOrMessage})
		}

		setTimeout(() => {
			setHasErrors(false)
		}, 3000)
	}


	async function setValuesFromSliders(e_target: any) {
		const value = e_target.valueAsNumber
		const id = e_target.id

		setValues({...values, [id]: value})
	}

	// async function setValuesFromSliders() {
	// 	const values = {
	// 		superfit_dis: document.getElementById('superfit_dis').value,
	// 		superfit_sin: document.getElementById('superfit_sin').value,
	// 		superfit_cur: document.getElementById('superfit_cur').value,
	// 		superfit_int: document.getElementById('superfit_int').value,
	// 		superfit_eng: document.getElementById('superfit_eng').value,
	// 		superfit_res: document.getElementById('superfit_res').value,
	// 		lifestyle_classic: document.getElementById('lifestyle_classic').value,
	// 		lifestyle_order: document.getElementById('lifestyle_order').value,
	// 		lifestyle_change: document.getElementById('lifestyle_change').value,
	// 		lifestyle_tireless: document.getElementById('lifestyle_tireless').value,
	// 		lifestyle_explorer: document.getElementById('lifestyle_explorer').value,
	// 		lifestyle_specialist: document.getElementById('lifestyle_specialist').value,
	// 		lifestyle_generalist: document.getElementById('lifestyle_generalist').value,
	// 	}
	// 	setValues(values)
	// }


	async function redirect_home() {
		navigate('/')
	}

	async function redirect_journey() {
		navigate('/journey')
	}




	return (
		<div className="min-h-screen bg-base-200 card items-center">
			<div className="mt-0 pt-0 mb-10 w-screen shadow-lg">
				<div className='navbar bg-base-100 rounded-lg'>
					<div className='navbar-start'>
						<div className='tabs'>
							<a className="tab normal-case text-xl" onClick={redirect_home}>Dashboard</a>
							<div className='divider lg:divider-horizontal' />
							<a className="tab normal-case text-xl" onClick={redirect_journey}>Recomendação de Journeys</a>
							<a className="tab tab-active normal-case text-xl">Recomendação de Jobs</a>
						</div>
					</div>
					<div className='navbar-end'>
					<div className='divider lg:divider-horizontal' />
						<img src="/talent_tree.svg" className="rounded-full h-12 w-12 mr-3" alt="logo" />
					</div>
				</div>
			</div>
            <div className="mx-auto card w-full max-w-5xl mt-0 mb-12" style={{ transition: "all .5s ease" }}>
                <div className="grid  md:grid-cols-11 grid-cols-1 bg-base-100 rounded-xl hover:shadow-2xl" style={{ transition: "all .5s ease" }}>
                <div className='py-10 pl-10 pr-0 col-span-5'>
					<h2 className='text-3xl font-semibold mb-16 text-center mx-20'>Notas Superfit</h2>
					{/*
					'superfit_dis', 'superfit_sin', 'superfit_cur',
					'superfit_int',  'superfit_eng', 'superfit_res'
					*/}
					<span className='mx-2 font-semibold'>Superfit Dis: {values.superfit_dis}/100</span>
					<input type="range" min={0} max={100} defaultValue={values.superfit_dis} className="range range-success mb-6 mt-3 hover:scale-95" style={{ transition: "all .5s ease" }} id='superfit_dis' onChange={(e) => setValuesFromSliders(e.target)} />

					<span className='mx-2 font-semibold'>Superfit Sin {values.superfit_sin}/100</span>
					<input type="range" min={0} max={100} defaultValue={values.superfit_sin} className="range range-success mb-6 mt-3 hover:scale-95" style={{ transition: "all .5s ease" }} id='superfit_sin' onChange={(e) => setValuesFromSliders(e.target)} />

					<span className='mx-2 font-semibold'>Superfit Cur {values.superfit_cur}/100</span>
					<input type="range" min={0} max={100} defaultValue={values.superfit_cur} className="range range-success mb-6 mt-3 hover:scale-95" style={{ transition: "all .5s ease" }} id='superfit_cur' onChange={(e) => setValuesFromSliders(e.target)} />

					<span className='mx-2 font-semibold'>Superfit Int {values.superfit_int}/100</span>
					<input type="range" min={0} max={100} defaultValue={values.superfit_int} className="range range-success mb-6 mt-3 hover:scale-95" style={{ transition: "all .5s ease" }} id='superfit_int' onChange={(e) => setValuesFromSliders(e.target)} />

					<span className='mx-2 font-semibold'>Superfit Eng {values.superfit_eng}/100</span>
					<input type="range" min={0} max={100} defaultValue={values.superfit_eng} className="range range-success mb-6 mt-3 hover:scale-95" style={{ transition: "all .5s ease" }} id='superfit_eng' onChange={(e) => setValuesFromSliders(e.target)} />

					<span className='mx-2 font-semibold'>Superfit Res {values.superfit_res}/100</span>
					<input type="range" min={0} max={100} defaultValue={values.superfit_res} className="range range-success mb-6 mt-3 hover:scale-95" style={{ transition: "all .5s ease" }} id='superfit_res' onChange={(e) => setValuesFromSliders(e.target)} />
               	</div>
				<div className='py-14 px-10 mx-0 col-span-1 divider lg:divider-horizontal'></div>
                <div className='py-10 pl-0 pr-10 col-span-5'>
				<h2 className='text-3xl font-semibold mb-8 text-center mx-20'>Notas Lifestyle</h2>

					{/*
					'lifestyle_classic', 'lifestyle_order', 'lifestyle_change',
					'lifestyle_tireless', 'lifestyle_explorer', 'lifestyle_specialist',
					'lifestyle_generalist'
					*/}

					<span className='mx-2 font-semibold'>Lifestyle Classic {values.lifestyle_classic}/25</span>
					<input type="range" min={0} max={25} defaultValue={values.lifestyle_classic} className="range range-warning mb-6 mt-3 hover:scale-95" style={{ transition: "all .5s ease" }} id='lifestyle_classic' onChange={(e) => setValuesFromSliders(e.target)} />

					<span className='mx-2 font-semibold'>Lifestyle Order {values.lifestyle_order}/25</span>
					<input type="range" min={0} max={25} defaultValue={values.lifestyle_order} className="range range-warning mb-6 mt-3 hover:scale-95" style={{ transition: "all .5s ease" }} id='lifestyle_order' onChange={(e) => setValuesFromSliders(e.target)} />

					<span className='mx-2 font-semibold'>Lifestyle Change {values.lifestyle_change}/25</span>
					<input type="range" min={0} max={25} defaultValue={values.lifestyle_change} className="range range-warning mb-6 mt-3 hover:scale-95" style={{ transition: "all .5s ease" }} id='lifestyle_change' onChange={(e) => setValuesFromSliders(e.target)} />

					<span className='mx-2 font-semibold'>Lifestyle Tireless {values.lifestyle_tireless}/25</span>
					<input type="range" min={0} max={25} defaultValue={values.lifestyle_tireless} className="range range-warning mb-6 mt-3 hover:scale-95" style={{ transition: "all .5s ease" }} id='lifestyle_tireless' onChange={(e) => setValuesFromSliders(e.target)} />

					<span className='mx-2 font-semibold'>Lifestyle Explorer {values.lifestyle_explorer}/25</span>
					<input type="range" min={0} max={25} defaultValue={values.lifestyle_explorer} className="range range-warning mb-6 mt-3 hover:scale-95" style={{ transition: "all .5s ease" }} id='lifestyle_explorer' onChange={(e) => setValuesFromSliders(e.target)} />

					<span className='mx-2 font-semibold'>Lifestyle Specialist {values.lifestyle_specialist}/25</span>
					<input type="range" min={0} max={25} defaultValue={values.lifestyle_specialist} className="range range-warning mb-6 mt-3 hover:scale-95" style={{ transition: "all .5s ease" }} id='lifestyle_specialist' onChange={(e) => setValuesFromSliders(e.target)} />

					<span className='mx-2 font-semibold'>Lifestyle Generalist {values.lifestyle_generalist}/25</span>
					<input type="range" min={0} max={25} defaultValue={values.lifestyle_generalist} className="range range-warning mb-6 mt-3 hover:scale-95" style={{ transition: "all .5s ease" }} id='lifestyle_generalist' onChange={(e) => setValuesFromSliders(e.target)} />

                </div>
            </div>
			<div className='grid md:grid-cols-1 grid-cols-1 rounded-xl'>
				<button className='btn btn-primary mx-10 my-10' onClick={handleFetchJobs} disabled={loading}>Buscar Jobs</button>
			</div>
			<div className='grid md:grid-cols-3 grid-cols-1 rounded-xl'>
				{
					jobs.jobs.map((job: any) => {
						console.log(job)
						return (
							<div className='card mx-auto w-full max-w-5xl hover:shadow-2xl my-12' style={{ transition: "all .5s ease" }}>
								<div className="card-body">
									<h2 className='text-3xl font-semibold mb-8 text-center mx-10'>Job ID: {job.job_id}</h2>
									<p className='text-xl font-semibold mb-8 text-center mx-10'>Acurácia: <br></br>{100-(Math.round(job.similarity * 10)/100)}%</p>
									{/* <p className='text-xl font-semibold mb-8 text-center mx-20'>{job.salary}</p> */}
								</div>
							</div>
						)
					})
				}

			</div>
        </div>
			<div className="toast" style={{ display: hasErrors ? "block" : "none", transition: "all 1s ease" }}>
				<div className="alert alert-error">
					<p className='mx-2 text-base font-semibold mb-0 text-center'>Erro ao carregar os dados, consulte os parâmetros e tente novamente</p>
				</div>
			</div>
		</div>
	)
}