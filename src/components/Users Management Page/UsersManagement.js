import "./UsersManagement.css"

const UsersManagement = () => {
  return (
    <div className="users">
      <h2 className="titlu"> Users Management </h2>
      <ul className='card'>
        <div className="carduri">
          <h3> Employee </h3>
          <p> First Name </p>
          <p> Last Name </p>
          <p> E-mail address </p>
          <p> Password </p>
          <p>  Role (one of: Administrator / Office Administrator / Employee) </p>
          <p> Gender (one of: Male / Female / Other)  </p>
          <p>  Birth date – optional </p>
          <p>  Nationality – optional </p>
          <button className="butonCard">Edit</button>
          <button className="butonCard">Deactivate</button>
          <button className="butonCard">Reactivate</button>
        </div>
      </ul>
    </div>
  )
}

export default UsersManagement
