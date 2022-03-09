import { useEffect, useState } from "react";

import "./HeaderCss.css";
import {
  headerTabsLabel,
  userRoleLabel
} from '../../Common/components/constants'

const Header = () => {
  const [userRole, setUserRole] = useState('admin');
  const [headerTabs, setHeaderTabs] = useState([]);

  const getHeaderTabs = () => {
    switch (userRole) {
      case userRoleLabel.adminType:
        return (
          setHeaderTabs(headerTabsLabel.admin)
        );
      case userRoleLabel.officeAdmType:
        return (
          setHeaderTabs(headerTabsLabel.officeAdministrator)
        );
      case userRoleLabel.employeeType:
        return (
          setHeaderTabs(headerTabsLabel.employee)
        );
      default:
        return;
    }
  }

  useEffect(() => {
    getHeaderTabs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="header">
      <div className="logoPanel">Logo</div>
      <div className="tabsPanel">
        {headerTabs.map((tab, index) => {
          return (
            <a href={tab.link} key={index} className="navStyle">{tab.name}</a>
          )
        })}
      </div>
    </div>
  )
}

export default Header;
