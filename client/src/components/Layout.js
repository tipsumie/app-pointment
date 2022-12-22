import React, { useState } from 'react';
import './Layout.css';
import logo from '../images/heart-logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../redux/userSlice';
import { Badge } from 'antd';

function Layout({ children }) {
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const userMenu = [
    {
      name: 'หน้าหลัก',
      path: '/',
      icon: 'ri-home-heart-line',
    },
    {
      name: 'การนัดหมาย',
      path: '/appointments',
      icon: 'ri-calendar-check-fill',
    },
    {
      name: 'เพิ่มคลินิก',
      path: '/add-clinic',
      icon: 'ri-hospital-fill',
    },
  ];
  const adminMenu = [
    {
      name: 'หน้าหลัก',
      path: '/',
      icon: 'ri-home-heart-line',
    },
    {
      name: 'การจัดการผู้ใช้',
      path: '/admin/users',
      icon: 'ri-calendar-check-fill',
    },
    {
      name: 'การจัดการคลินิก',
      path: '/admin/clinics',
      icon: 'ri-hospital-fill',
    },
  ];
  const clinicMenu = [
    {
      name: 'หน้าหลัก',
      path: '/',
      icon: 'ri-home-heart-line',
    },
    {
      name: 'การนัดหมาย',
      path: '/clinic/appointments',
      icon: 'ri-file-list-line',
    },
    {
      name: 'โปรไฟล์',
      path: `/clinic/profile/${user?._id}`,
      icon: 'ri-profile-fill',
    },
  ];

  const menuForUser = user?.isAdmin
    ? adminMenu
    : user?.isClinic
    ? clinicMenu
    : userMenu;

  const calNotification = () => {
    if (user?.notification.length) {
      return user?.notification.length - Number(localStorage.getItem('noti'));
    } else {
      return 0;
    }
  };

  return (
    <main className={show ? 'space-toggle' : null}>
      <header className={`header ${show ? 'space-toggle' : null}`}>
        <div className='header-toggle' onClick={() => setShow(!show)}>
          <i className={` ${show ? 'ri-close-fill' : 'ri-menu-line'}`}></i>
        </div>
        <div className='user-header'>
          <Link to='/notification'>
            <Badge
              count={
                location.pathname === '/notification' ? 0 : calNotification()
              }
            >
              <i className='ri-notification-2-fill header-icon'></i>
            </Badge>
          </Link>
          <span className='username'>{user?.name}</span>
        </div>
      </header>

      <aside className={`sidebar ${show ? 'show' : null}`}>
        <nav className='nav'>
          <div>
            <div className='sidebar-img'>
              {/* <i className='ri-heart-add-fill'></i> */}
              <img
                src={logo}
                alt='logo'
                style={{ width: '30%', height: '30%' }}
              />
              <h1 className={`sidebar-header ${show ? 'show' : null}`}>
                นัดนัด
              </h1>
            </div>

            <div className='nav-list'>
              {menuForUser.map((menu, index) => {
                return (
                  <div key={index} className='nav-link'>
                    <Link to={menu.path}>
                      <i className={`${menu.icon} nav-link-icon`}></i>
                    </Link>
                    <Link to={menu.path} className='nav-link-name'>
                      {menu.name}
                    </Link>
                  </div>
                );
              })}
              <div
                className='nav-link'
                onClick={() => {
                  localStorage.clear();
                  dispatch(removeUser());
                  navigate('/login');
                }}
              >
                <i className='ri-logout-box-fill nav-link-icon'></i>
                <Link to='/login' className='nav-link-name'>
                  ออกจากระบบ
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      <div className='main-content'>
        <div className='main-container'>{children}</div>
      </div>
    </main>
  );
}

export default Layout;
