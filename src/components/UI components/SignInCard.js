import "../../css/UI Style/SignInCard.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
function SignInCard() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [user, loading, error] = useAuthState(auth);
const navigate = useNavigate();
useEffect(() => {
  if (user) navigate("/home");
}, [user, loading]);
  return (
    <div className="SignInCard">
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong">
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Sign in</h3>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="typeEmailX-2"
                      className="form-control form-control-md"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="typePasswordX-2"
                      className="form-control form-control-md"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <Link to={"/signup"}>
                      <span>&nbsp; Sign Up</span>
                    </Link>
                  </div>

                  <button
                    className="btn btn-primary btn-lg btn-block"
                    id="signin-signup"
                    onClick={() => logInWithEmailAndPassword(email, password)}
                    type="submit"
                  >
                    Login
                  </button>

                  <div className="separator">OR</div>

                  <button
                    className="btn btn-lg btn-block btn-primary"
                    id="google"
                    onClick={signInWithGoogle}
                    type="submit"
                  >
                    <i className="fab fa-google me-2"></i> Sign in with Google
                  </button>
                  <button
                    className="btn btn-lg btn-block btn-primary mb-2"
                    id="facebook"
                    type="submit"
                  >
                    <i className="fab fa-facebook-f me-2"></i> Sign in with Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignInCard;
