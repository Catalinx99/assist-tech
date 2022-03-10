import "./LoginCss.css"

const ForgotPsw = () => {
return (
<div className="center">
  <a href="/" className="close"> &times; </a>
  <h1>Forgot password</h1>
  <form method="post">
    <div className="txt_field">
      {/* TO DO change the text type into email */}
      <input type="text" required />
      <span></span>
      <label> Email </label>
    </div>
    <input type="submit" value="Submit" />
  </form>
</div>
)
}

export default ForgotPsw