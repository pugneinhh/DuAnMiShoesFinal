import { FloatButton } from 'antd';
import './App.scss';
import Admin from '../components/admin/Admin';


const App=() => {
  return (
    <div className='d-flex'>
      <div className='col-auto'>
        <Admin />
      </div>
      <div className='col bg-danger'>
        {/* <Outlet></Outlet> */}
        
      </div>
      <FloatButton.BackTop />
      
    </div>
        
  );
}

export default App;