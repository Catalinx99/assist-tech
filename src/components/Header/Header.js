import "./HeaderCss.css";

const Header = () => {
  const headerNavbar = {
    Administrator: [
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
    OfficeAdministrator: [
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
    Employee: [
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
  var datarole = [
    {
      role: 'Administrator'
    }, {
      role: 'Ofice Administrator'
    }, {
      role: 'Employee'
    }
  ];
  return (
    <div className="header">


    </div>
  )
}

export default Header
