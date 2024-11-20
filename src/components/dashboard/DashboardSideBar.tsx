
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { DASHBOARD_DRAWER_ID, DASHBOARD_SIDEBAR_GROUPS, DASHBOARD_SIDEBAR_PROFILE_ITEMS, ROUTE_PATHS } from '../../utils/constants'
import Logo from '../utils/Logo';
import { useGetUser } from '../../hooks/user';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ImageWithLoader from '../utils/ImageWithLoader';

const DashboardSideBar = () => {

	const location = useLocation();
	const navigate = useNavigate();
	const {
		user
	} = useGetUser();

	return (
		<>
			<input id={DASHBOARD_DRAWER_ID} type="checkbox" className="drawer-toggle" />

			<div className="drawer-side z-20">

				{/* CLOSE */}
				<label htmlFor={DASHBOARD_DRAWER_ID} aria-label="close sidebar" className="drawer-overlay"></label>

				<div
					className='flex flex-col justify-between items-start h-screen bg-base-300 border-r border-r-slate-600'
				>
					<ul className="menu text-base-content h-full w-48 p-4 gap-4">

						{/* LOGO */}
						<div className='flex justify-start items-center'>

							<div className="avatar">
								<div className="w-12">
									<Logo />
								</div>
							</div>

							{/* IMG LOGO */}
							<button
								className="btn btn-ghost text-main-text-green text-sm md:text-base"
								onClick={() => navigate(ROUTE_PATHS.DASHBOARD)}
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

												let uri = groupItem.uri;

												if (groupItem.id === 'profile' && user) {
													uri += `/${user?.id}`;
												}

												return (
													<Link
														key={`group_item_${sideBarGroup.id}_${groupItem.id}`}
														to={uri}
														className='w-full mt-4'
													>
														<button
															className={
																`
										btn w-full btn-sm justify-start text-gray-300 hover:bg-green-600 hover:text-white
										${location.pathname === uri ? 'text-white bg-green-600' : ''}
										`
															}
															style={{
																color: location.pathname === uri ? 'white' : undefined,
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


					<div className='p-4 w-full dropdown dropdown-top'>

						<div tabIndex={0} role='button' className='btn btn-md flex flex-row justify-between items-center w-full hover:bg-gray-700 px-2'>

							<div className='flex justify-start items-center gap-2'>
								{/* AVATAR */}
								<ImageWithLoader
									imageUrl={user?.avatar}
									altTxt='User avatar'
									imgClassName='w-6 rounded-full'
									loader={
										<div className='loading loading-spinner'>
										</div>
									}
								/>

								{/* NAME */}
								<div>
									{user?.firstName}
								</div>
							</div>

							{/* 3 DOTS */}
							<MoreVertIcon
								className='align-end'
							/>

						</div>

						<ul tabIndex={0} className='dropdown-content menu gap-2 w-[85%] bg-base-100 rounded-md shadow-md'>
							{
								DASHBOARD_SIDEBAR_PROFILE_ITEMS.map((profileItem) => {
									return (
										<Link
											to={profileItem.uri}
											key={`profile_item_${profileItem.id}`}
											className='w-full'
										>
											<button className='btn bg-base-100 border-none shadow-none btn-sm w-full flex justify-start items-center text-white'>

												{
													<profileItem.icon />
												}

												<div>
													{
														profileItem.label
													}
												</div>



											</button>
										</Link>
									)
								})
							}
						</ul>

					</div>
				</div>

			</div>
		</>
	)
}

export default DashboardSideBar