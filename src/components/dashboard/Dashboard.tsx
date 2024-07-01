import { useNavigate } from 'react-router-dom';
import withAuth from '../../hoc/withAuth';


const Dashboard = () => {

    const navigate = useNavigate();

    return (
        <div>
            Dashboard

            <button onClick={() => {navigate('/')}}>HOME</button>
        </div>
    )
};

const DashBoardWithAuth = withAuth(Dashboard)

export default DashBoardWithAuth;