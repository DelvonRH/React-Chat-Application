import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import React, {useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

function SignUpCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

   const SignUp = () => {
     if (!firstName && !lastName && !email && !password)
     {
      alert("Please fill in all fields!");
     } 
     registerWithEmailAndPassword(firstName, lastName, email, password);
   };

   useEffect(() => {
     if (loading) return;
     if (user) navigate("/home");
   }, [user, loading]);

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong">
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Sign up</h3>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form3Example1"
                          className="form-control form-control-md"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form3Example2"
                          className="form-control form-control-md"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                  </div>

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

                  <div className="form-outline">
                    <input
                      type="password"
                      id="typePasswordX-2"
                      className="form-control form-control-md"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </div>

                  <br />

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Already have an account?</p>
                    <Link to={"/"}>
                      <span>&nbsp;Sign In</span>
                    </Link>
                  </div>

                  <button
                    onClick={SignUp}
                    className="btn btn-primary btn-lg btn-block"
                    id="signin-signup"
                    type="submit"
                  >
                    Sign Up
                  </button>

                  <div className="separator">OR</div>

                  <button
                    onClick={signInWithGoogle}
                    className="btn btn-lg btn-block btn-primary"
                    id="google"
                    type="submit"
                  >
                    <i className="fab fa-google me-2"></i> Sign up with Google
                  </button>
                  <button
                    className="btn btn-lg btn-block btn-primary mb-2"
                    id="facebook"
                    type="submit"
                  >
                    <i className="fab fa-facebook-f me-2"></i> Sign up with Facebook
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

export default SignUpCard;
