import "./Logincss.css"

const Login = () => {

  return (
   <div>
       <div className="center">
           <h1>Login</h1>
           <form method="post">
               <div className="txt_field">
                   <input type="text" required/>
                   <span></span>
                   <label> Username </label>
               </div>
               <div className="txt_field">
                   <input type="password" required/>
                   <span></span>
                   <label> Password </label>
               </div>
               <div className="pass"><a href="/forgotpw"> Forgot password ?</a> </div>
               <input type="submit" value="Login"/>
           </form>
       </div>
   </div>
  )
}

export default Login
