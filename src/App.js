import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Cart from './components/Cart';
import Menu from './components/Menu';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import Register from './components/Register';
import Login from './components/Login';
import Authorize from './components/Authorize';
import UnAuthorize from './Users/Home';
import UsersAbout from './Users/About';
import UsersCart from './Users/Cart';
import UsersContact from './Users/Contact';
import UsersMenu from './Users/Menu';
import UsersPrivacyPolicy from './Users/PrivacyPolicy';
import UsersTermsAndConditions from './Users/TermsAndConditions';
import Settings from './Users/Settings';
import Profile from './Users/Profile';
import Orders from './Users/Orders';
import EditUser from './Users/EditUser';
import Addmenu from './Admin/Addmenu';
import Editmenu from './Admin/EditMenu';
import EditOrder from './Admin/EditOrder';
import EditAdmin from'./Admin/EditUser';
import AdminHome from './Admin/Home';
import AdminMenu from './Admin/menu';
import AdminOrder from './Admin/Orders';
import AdminProfile from './Admin/Profile';
import AdimSettings from './Admin/Settings';
import AdminUsers from './Admin/Users';
import AddUser from './Admin/AddUser';
import OrderBill from './Users/bill';
// import Work from './components/Work';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/read' element={<Home/>}/>
        <Route  path= '/cart' element={<Cart/>}/>
        <Route  path= '/menu' element={<Menu/>}/>
        <Route path='/about' element ={<About/>}/>
        <Route path='/contact' element ={<Contact/>}/>
        <Route path='/privacypolicy' element ={<PrivacyPolicy/>}/>
        <Route path='/terms' element ={<TermsAndConditions/>}/>
        <Route path='/create' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/authorize' element={<Authorize/>}/>
        <Route path='/unauthorize' element={<UnAuthorize/>}/>
        <Route path='/UsersAbout' element={<UsersAbout/>}/>
        <Route path='/UsersMenu' element={<UsersMenu/>}/>
        <Route path='/UsersCart' element={<UsersCart/>}/>
        <Route path='/UsersContact' element={<UsersContact/>}/>
        <Route path='/Usersprivacypolicy' element={<UsersPrivacyPolicy/>}/>
        <Route path='/Usersterms' element={<UsersTermsAndConditions/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/UserProfile' element={<Profile/>}/>
        <Route path='/UserOrders' element={<Orders/>}/>
        <Route path='/EditUser' element={<EditUser/>}/>
        <Route path='/AdminHome' element={<AdminHome/>}/>
        <Route path='/AdminUsers' element={<AdminUsers/>}/>
        <Route path='/AdminMenu' element={<AdminMenu/>}/>
        <Route path='/AdminOrders' element={<AdminOrder/>}/>
        <Route path='/AdminProfile' element={<AdminProfile/>}/>
        <Route path='/AdminSettings' element={<AdimSettings/>}/>
        <Route path='/EditAdmin' element={<EditAdmin/>}/>
        <Route path='/AddMenu' element={<Addmenu/>}/>
        <Route path='/EditMenu/:itemId' element={<Editmenu />} />
        <Route path='/Editorder/:orderId' element={<EditOrder />} />
        <Route path='/AddUser' element={<AddUser />}/>
        <Route path='/bill' element={<OrderBill />}/>
      </Routes>
     </Router>
    
    
    </div>
  );
}

export default App;
