import { Link } from "react-router-dom";
import { useContext } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const history = useNavigate();
  const { user } = useContext(AuthContext);
  const handleSignOut = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false
    });

    await signOut(auth);
    history("/Login", { replace: true });
  };
  return (
    <nav>
      <div>
        <h3>
          <Link to="/"> ChatRoom </Link>
        </h3>
      </div>
      {auth.currentUser ? (
        <div>
          <Link to="/Profile"> Profile </Link>
          <button className="btn" onClick={handleSignOut}>
            {" "}
            Log Out{" "}
          </button>
        </div>
      ) : (
        <div>
          <Link to="/Register"> Register </Link>
          <Link to="/Login"> Login </Link>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
