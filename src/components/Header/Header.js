import { useEffect, useState } from "react";
import "./HeaderCss.css";

const Header = () => {
  const [userRole, setUserRole] = useState('employee');
  const [headerTabs, setHeaderTabs] = useState([]);

  const headerNavbar = {
    admin: [
      {
        name: 'Management',
        link: "/#"
      }, {
        name: 'Building Management',
        link: '/#'
      }, {
        name: 'Office Management',
        link: '/#'
      }, {
        name: 'Office Status',
        link: '/#'
      }, {
        name: 'Desk Assignment',
        link: '/#'
      }, {
        name: 'Request to work remote',
        link: '/#'
      }, {
        name: 'Remote work approval',
        link: '/#'
      }, {
        name: 'User Status',
        link: '/#'
      }
    ],
    officeAdministrator: [
      {
        name: 'Office Status',
        link: '/#'
      }, {
        name: 'Desk Assignment',
        link: '/#'
      }, {
        name: 'Request to work remote',
        link: '/#'
      }, {
        name: 'User Status',
        link: '/#'
      }
    ],
    employee: [
      {
        name: 'Office Status',
        link: '/#'
      }, {
        name: 'Request to work remote',
        link: '/#'
      }, {
        name: 'User Status',
        link: '/#'
      }
    ]
  }

  // useEffect(() => {
  //   switch (userRole) {
  //     case "admin":
  //       return (
  //         setHeaderTabs(headerNavbar.admin)
  //       );
  //     case "officeAdministrator":
  //       return (
  //         setHeaderTabs(headerNavbar.officeAdministrator)
  //       );
  //     case "employee":
  //       return (
  //         setHeaderTabs(headerNavbar.employee)
  //       );
  //     default:
  //       return;
  //   }
  // });

  return (
    <div className="header">
      <div className="logoPanel">Logo</div>
      <div className="tabsPanel">
        <div className="navStyle">Home</div>
        <div className="navStyle">Users</div>
        {/* {headerTabs.map((tab, index) => {
          return (
              <div key={index} className="navStyle">{tab.name}</div>
          )
        })} */}
      </div>
    </div>
  )
}

export default Header;
