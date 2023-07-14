import MenuIcon from '../components/MenuIcon';
import SideBar from '../components/SideBar';

const HomePage = () => (
  <div className="drawer lg:drawer-open">
    {/* eslint-disable jsx-a11y/label-has-associated-control */}
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col items-center justify-center">
      {/* Page content here */}
      <MenuIcon />
    </div>
    <SideBar />
  </div>
);

export default HomePage;
