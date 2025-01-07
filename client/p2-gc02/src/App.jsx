import { useState } from 'react'
// import './App.css'
import Public from './views/public';
import DetailedCuisine from './views/DetailedCuisine';
import Cuisine from './views/Cuisine';
import Login from "./views/Login"
import AddCuisine from './views/AddCuisine';
import EditCuisine from './views/EditCuisine';
import UploadImage from './views/UploadImage';
import Category from './views/Category';
import AddUser from './views/AddUser';

function App() {
  const [page, setPage] = useState('addUser')

  // function handleChangePage(page) {
  //   setPage(page);
  // }

  return (
    <>
      { page === 'login' ? <Login /> : null}
      { page === 'public' ? <Public/> : null}
      { page === 'detailed' ? <DetailedCuisine /> : null}

      { page === 'cuisine' ? <Cuisine/> : null}
      { page === 'addCuisine' ? <AddCuisine/> : null}
      { page === 'editCuisine' ? <EditCuisine/> : null}
      { page === 'uploadImage' ? <UploadImage/> : null}
      { page === 'category' ? <Category/> : null}
      { page === 'addUser' ? <AddUser/> : null}
    </>
  );
}

export default App
