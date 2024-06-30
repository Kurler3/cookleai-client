import withAuth from '../../hoc/withAuth';


const Dashboard = () => {
    return (
        <div>
            Dashboard
        </div>
    )
};

const DashBoardWithAuth = withAuth(Dashboard)

export default DashBoardWithAuth;