
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { DASHBOARD_DRAWER_ID, DASHBOARD_SIDEBAR_GROUPS } from '../../utils/constants'
import Logo from '../utils/Logo';

const DashboardSideBar = () => {

	const location = useLocation();
	const navigate = useNavigate();

	return (
		<>
			<input id={DASHBOARD_DRAWER_ID} type="checkbox" className="drawer-toggle" />

			<div className="drawer-side">

				{/* CLOSE */}
				<label htmlFor={DASHBOARD_DRAWER_ID} aria-label="close sidebar" className="drawer-overlay"></label>

				<ul className="menu bg-base-200 text-base-content min-h-full w-48 p-4 gap-4">

					{/* LOGO */}
					<div className='flex justify-start items-center'>

						<div className="avatar">
							<div className="w-10">
								<Logo />
							</div>
						</div>

						{/* IMG LOGO */}
						<button
							className="btn btn-ghost text-main-text-green text-sm md:text-base"
							onClick={() => navigate('/dashboard')}
						>
							CookleAI
						</button>
					</div>

					{/* SIDE BAR NAVIGATION */}
					{
						DASHBOARD_SIDEBAR_GROUPS.map((sideBarGroup, idx) => {
							return (
								<div
									key={`sidebar_group_${sideBarGroup.id}_${idx}`}
									className='flex flex-col justify-start items-start w-full'
								>
									{/* TITLE */}
									<div className='text-gray-400 font-medium text-sm lg:text-base'>
										{sideBarGroup.label}
									</div>

									{/* ITEMS */}
									{
										sideBarGroup.items.map((groupItem) => {

											return (
												<Link
													key={`group_item_${sideBarGroup.id}_${groupItem.id}`}
													to={groupItem.uri}
													className='w-full mt-4'
												>
													<button 
														className={
															`
															btn w-full btn-sm justify-start text-gray-300 hover:bg-green-600 hover:text-white
															${location.pathname === groupItem.uri ? 'text-white bg-green-600' : ''}
															`
														}
														style={{
															color: location.pathname === groupItem.uri ? 'white' : null,
														}}
													>
														{/* ICON */}
														{
															<groupItem.icon />
														}

														{/* LABEL */}
														<div>
															{
																groupItem.label
															}
														</div>
													</button>

												</Link>
											)
										})
									}


								</div>
							)
						})
					}

				</ul>
			</div>
		</>
	)
}

export default DashboardSideBar