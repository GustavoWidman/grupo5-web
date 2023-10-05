import { useJourneyStore } from '../features/journeys'
import { useNavigate } from 'react-router-dom'
//import adalove from '../assets/adalove-clear.svg'

type UserValues = {
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
}

export const HomePage = () => {
    const navigate = useNavigate()


	async function redirect_job() {
		navigate('/job')
	}

	async function redirect_journey() {
		navigate('/journey')
	}



    return (
		<div className="min-h-screen bg-base-200 card items-center">
			<div className="mt-0 pt-0 mb-16 w-screen shadow-lg">
				<div className='navbar bg-base-100 rounded-lg'>
					<div className='navbar-start'>
						<div className='tabs'>
							<a className="tab tab-active normal-case text-xl" onClick={redirect_journey}>Dashboard</a>
							<div className='divider lg:divider-horizontal' />
							<a className="tab normal-case text-xl" onClick={redirect_journey}>Recomendação de Journeys</a>
							<a className="tab normal-case text-xl" onClick={redirect_job}>Recomendação de Jobs</a>
						</div>
					</div>
					<div className='navbar-end'>
					<div className='divider lg:divider-horizontal' />
						<img src="/talent_tree.svg" className="rounded-full h-12 w-12 mr-3" alt="logo" />
					</div>
				</div>
			</div>
            <div className="card mx-auto w-full max-w-5xl hover:shadow-2xl" style={{ transition: "all .5s ease" }}>
                <div className="grid  md:grid-cols-11 grid-cols-1 bg-base-100 rounded-xl">
                <div className='col-span-5 pl-6 pr-0'>
					<div className="hero min-h-full rounded-l-xl bg-base-100">
						<div className="hero-content py-12">
							<div className="max-w-md">

								<h1 className='text-4xl text-center font-bold '>
									{/* <img src="/logo192.png" className="w-12 inline-block mr-2 mask mask-circle" alt="dashwind-logo" />
									<br></br> */}
									Dashboard
									<br></br>
									TalentTree
								</h1>

								<div className="text-center mb-12 mt-5 pl-6">
									Utilize nossa interface controladora para experimentar os modelos preditivos desenvolvidos até agora.
								</div>
									<>
										<h1 className="text-center text-2xl mt-8 pl-4 font-bold">
											Aqui você encontra os seguintes modelos:
										</h1>
										<p className="text-center py-2 mt-4">✓ Predição de <span className="font-semibold">job_opportunity</span> com dados de usuários</p>
										<p className="text-center py-2 ">✓ Predição de <span className="font-semibold">journeys</span> com dados de usuários</p>
										<p className="text-center py-2">✓ Predição de <span className="font-semibold">journeys</span> com IDs de usuários (extração automática dos dados)</p>
									</>
							</div>
						</div>
					</div>
               	</div>
				<div className='py-14 px-10 mx-0 col-span-1 divider lg:divider-horizontal'></div>
                <div className='py-14 pl-0 pr-10 col-span-5'>
                    <h2 className='text-3xl font-semibold mb-16 text-center mx-20'>Escolha um modelo para testar</h2>
					<div className='text-right mb-8'>
						<button type="button" className="btn btn-primary w-full hover:scale-95" style={{ transition: "all .5s ease" }} onClick={redirect_journey}>Predição de journeys com dados de usuários</button>
					</div>

					<div className='text-right mb-8'>
						<button type="button" className="btn btn-primary w-full hover:scale-95" style={{ transition: "all .5s ease" }} onClick={redirect_journey}>Predição de journeys com IDs de usuários</button>
					</div>
					<div className="text-center mb-8">
						<button type="button" className="btn btn-accent w-full hover:scale-95" style={{ transition: "all .5s ease" }} onClick={redirect_job}>Predição de job_opportunity com dados de usuários</button>
					</div>
                </div>
            </div>
            </div>
        </div>
	)
}
