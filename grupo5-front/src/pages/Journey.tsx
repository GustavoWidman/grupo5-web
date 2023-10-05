import { useJourneyStore } from '../features/journeys'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'


export const JourneyPage = () => {
	const navigate = useNavigate()
	const { loading, hasErrors, get_journeys_by_values, get_journeys_by_id, setHasErrors } = useJourneyStore()
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
		lifestyle_hybrid: 0,
		interest: "Finanças / Contabilidade",
		objective: "Procurar emprego"
	})
	const interests = ['Finanças / Contabilidade', 'Logistica / Supply Chain', 'Engenharia', 'Tecnologia', 'Produção / Operações',
	'Comercial / Vendas', 'RH', 'Marketing / Comunicação', 'Administrativo', 'Saúde', 'Jurídico']
	const objectives = ['Procurar emprego', 'Melhorar minha carreira', 'Autoconhecimento', 'Desenvolvimento Pessoal']

	const [user_id, setUserId] = useState("0") // user id integer
	const [journeys, setJourneys] = useState({
		journeys: []
	})

	const [selectedType, setSelectedType] = useState("user_id") // user id integer



	async function handleFetchJourneys() {
		const use_id = (selectedType === "user_id")

		if (use_id) {
			const [success, dataOrMessage] = await get_journeys_by_id(parseInt(user_id));
			console.log(success, dataOrMessage)
			if (success && dataOrMessage.error === undefined) {
				console.log("success", dataOrMessage)
				setJourneys({journeys: dataOrMessage})
			}
		} else {
			const [success, dataOrMessage] = await get_journeys_by_values(values);

			if (success && dataOrMessage.error === undefined) {
				setJourneys({journeys: dataOrMessage})
			}
		}

		// waits 5 seconds and sets error to false
		setTimeout(() => {
			setHasErrors(false)
		}, 3000)
	}


	async function setValuesFromSliders(e_target: any) {
		const value = e_target.valueAsNumber
		const id = e_target.id

		setValues({...values, [id]: value})
	}

	async function setUserIdFromInput(e_target: any) {
		// if value is not number, return
		if (isNaN(e_target.value)) {
			return
		}

		const value = e_target.value
		setUserId(value)
		console.log(user_id)
	}


	async function redirect_home() {
		navigate('/')
	}

	async function redirect_job() {
		navigate('/job')
	}



	const featuresCompontent = (
		<div className="grid  md:grid-cols-11 grid-cols-1 bg-base-100 rounded-xl hover:shadow-2xl" style={{ transition: "all .5s ease" }}>
                <div className='py-10 pl-10 pr-0 col-span-3'>
					<h2 className='text-3xl font-semibold mb-32 text-center mx-20'>Notas Superfit</h2>
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
                <div className='py-10 pl-0 pr-10 col-span-3'>
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

					<span className='mx-2 font-semibold'>Lifestyle Hybrid {values.lifestyle_hybrid}/25</span>
					<input type="range" min={0} max={25} defaultValue={values.lifestyle_hybrid} className="range range-warning mb-6 mt-3 hover:scale-95" style={{ transition: "all .5s ease" }} id='lifestyle_hybrid' onChange={(e) => setValuesFromSliders(e.target)} />

                </div>
				<div className='py-14 px-10 mx-0 col-span-1 divider lg:divider-horizontal'></div>
				<div className='py-10 pl-0 pr-10 col-span-3'>
					<h2 className='text-3xl font-semibold mb-52 mt-3 text-center'>Seleção de Características</h2>

					<div className="form-control">
						<label className="label">
							<span className="label-text">Interesse</span>
						</label>
						<select className="select select-bordered w-full mb-10" onChange={(e) => setValues({...values, interest: e.target.value})}>
							{interests.map((interest) => {
								return (
									<option value={interest}>{interest}</option>
								)
							})}
						</select>
						<label className="label">
							<span className="label-text">Interesse</span>
						</label>
						<select className="select select-bordered w-full" onChange={(e) => setValues({...values, objective: e.target.value})}>
							{objectives.map((objective) => {
								return (
									<option value={objective}>{objective}</option>
								)
							})}
						</select>
					</div>
				</div>
            </div>
	)



	return (
		<div className="min-h-screen bg-base-200 card items-center">
			<div className="mt-0 pt-0 mb-8 w-screen shadow-lg">
				<div className='navbar bg-base-100 rounded-lg'>
					<div className='navbar-start'>
						<div className='tabs'>
							{/* <button className="btn btn-square btn-success ml-1 mr-1 w-fit scale-90" onClick={redirect_home}></button> */}
							<a className="tab normal-case text-xl" onClick={redirect_home}>Dashboard</a>

							<div className='divider lg:divider-horizontal' />
							{/* <button className="btn btn-square btn-primary ml-0 w-fit scale-90"> */}
							<a className="tab tab-active normal-case text-xl">Recomendação de Journeys</a>
							{/* </button> */}
							{/* <button className="btn btn-square btn-secondary ml-0 w-fit scale-90"> */}
							<a className="tab normal-case text-xl" onClick={redirect_job}>Recomendação de Jobs</a>
							{/* </button> */}
						</div>
					</div>
					<div className='navbar-end'>
					<div className='divider lg:divider-horizontal' />
						<img src="/talent_tree.svg" className="rounded-full h-12 w-12 mr-3" alt="logo" />
					</div>
				</div>
			</div>
            <div className="mx-auto card w-max max-w-7xl mt-0 mb-6" style={{ transition: "all .5s ease" }}>
				<div className='mx-auto border-2 border-slate-700 border-dotted rounded-xl scale-125 mb-12'>
					<div className='m-1 bg-base-100 rounded-lg hover:shadow-2xl w-max'>
						<div className='px-7 py-2'>
							<label className="label cursor-pointer">
								<span className="label-text mx-4 font-semibold">Achar por User_ID</span>
								<span className="label-text mx-4 font-semibold">Achar por Features</span>
							</label>
							<label className="label cursor-pointer grid grid-cols-2 place-items-center">
								<input type="radio" name="radio" className="radio checked:bg-cyan-300 mx-4" checked={selectedType === "user_id"} onChange={() => {
									setSelectedType("user_id")
									setJourneys({journeys: []})
								}} />
								<input type="radio" name="radio" className="radio checked:bg-red-500 mx-4" checked={selectedType === "features"} onChange={() => {
									setSelectedType("features")
									setJourneys({journeys: []})
								}} />
							</label>
						</div>
					</div>
				</div>
            <div className='card place-items-center mx-auto'>
				{
					selectedType === "user_id" ? (
						<div className='card place-items-center rounded-xl'>
							<div className='card-body'>
								<div className="form-control">
									<label className="label">
										<span className="label-text">User ID</span>
									</label>
									<input type="text" placeholder="User ID" className="input input-bordered w-full" onChange={(e) => setUserIdFromInput(e.target)} />
								</div>
							</div>
						</div>
					) : (
						featuresCompontent
					)
				}
			</div>
			<div className='grid md:grid-cols-1 grid-cols-1 rounded-xl'>
				<button className='btn btn-primary mx-10 my-10' onClick={() => {
					handleFetchJourneys()
				}} disabled={loading}>Buscar Journeys</button>
			</div>
			<div className='grid md:grid-cols-3 grid-cols-1 rounded-xl items-stretch'>
				{
					journeys.journeys.map((journey: any) => {
						return (
							<div className='card mx-auto w-full max-w-5xl hover:shadow-2xl my-12' style={{ transition: "all .5s ease" }}>
								<div className='min-h-16' style={{ transition: "all .5s ease" }}>
									<h2 className='mx-2 text-3xl font-semibold mb-0 text-center' style={{ transition: "all .5s ease" }}>{journey.name}</h2>
									<h6 className='mx-2 text-xl font-semibold mb-0 text-center' style={{ transition: "all .5s ease" }}>ID #{journey.journey_id}</h6>
								</div>

								<div className="card-body" style={{ transition: "all .5s ease" }}>
									{/* <p className='text-xl font-semibold mb-2 text-center mx-1'>ID: {journey.journey_id}</p> */}
									<p className='text-xl font-semibold mb-2 text-center mx-1'>Avaliações: {journey.average_rating}/5 | {journey.ratings_count} avaliações</p>
									<p className='text-xl font-semibold mb-2 text-center mx-1'>Tipo e Categoria <br></br> {journey.type} | Categoria {journey.category}</p>
								</div>
							</div>
						)
					})
				}

			</div>
        </div>
			<div className="toast" style={{ display: hasErrors ? "block" : "none", transition: "all 1s ease" }}>
				<div className="alert alert-error">
					<p className='mx-2 text-base font-semibold mb-0 text-center'>Usuário nao encontrado no banco de dados</p>
				</div>
			</div>
		</div>
	)
}