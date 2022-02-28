import "./Logincss.css"

const Forgotpw = () => {
  return (
    <div>
    <div className="center">
    <a href="/" className="close"> &times; </a>
        <h1>Forgot password</h1>
        <form method="post">
            <div className="txt_field">
                <input type="text" required/>
                <span></span>
                <label> Email </label>
            </div>
            <input type="submit" value="Submit"/>
        </form>
    </div>
</div>
  )
}

export default Forgotpw
