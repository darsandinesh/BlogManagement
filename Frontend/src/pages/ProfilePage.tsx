import Navbar from '../components/user/Navbar';
import Profile from '../components/user/Profile';

function ProfilePage() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
            <Navbar />
            <div className="container mx-auto py-12 px-6">
                <Profile />
            </div>
        </div>
    );
}

export default ProfilePage;
