import { Outlet } from 'react-router-dom';

import Header from './Header/Header';

export default function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
