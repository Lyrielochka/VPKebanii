import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import { Lauout } from './modules/Lauout'
import { Card } from './modules/Product/Card'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Cart } from './modules/Cart/Cart';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Login } from './Authorize/Login';
import { Sloi } from './modules/Product/sloiOne'
import { ReviewsPage } from './modules/Product/ReviewsPage'
import { AboutUs } from './modules/Product/AbouUS';
import { OurValues } from './modules/Product/OurValues';
import { NewsPage } from './modules/Product/NewsPage';
import { ContactsBlock } from './modules/Product/ContactBlock';
import { Advunture } from './modules/Product/Advuntures';
import { Profile } from './modules/Product/Profile';
import { AdminUsersPage } from "./modules/Product/AdminUsersPage";
import { AdminEditProfile } from "./modules/Product/AdminEditProfile";



function App() {
    const queryClient = new QueryClient()
    const [showModalCart, setShowModalCart] = useState(false);
// const renderMain = () => (
//   <nav>
//     <ul>
//       <li>
//         <Link to="/products">Products</Link> 
//       </li>
//       <li>
//         <Link to="">Main</Link>
//       </li>
//     </ul>
//   </nav>
// )

  return (
    

<QueryClientProvider client  = {queryClient}>
<div className='App'>
  <BrowserRouter>
  <Lauout  setShowModalCart = {setShowModalCart} showModalCart = {showModalCart}/>
    <Routes>
    <Route path="/" element={<Sloi/>} />
    <Route path="/news" element={<NewsPage/>} />
    <Route path="/login" element={<Login />} />
    <Route path="/contacts" element={<ContactsBlock/>} />
    <Route path="/advuntures" element={<Advunture/>} />
    <Route path="/cabinet" element={<Profile/>} />
    <Route path="/admin/users" element={<AdminUsersPage />} />
    <Route path="/admin/profile/:idProfile" element={<AdminEditProfile />} />

    {/* <Route path="" element={renderMain()}/> */}
    </Routes>
    {showModalCart ? <Cart setShowModalCart = {setShowModalCart}/> : null}
  </BrowserRouter>
</div>
</QueryClientProvider>
  );
}

export default App;
