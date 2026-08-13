import useSignup from "../../hooks/useSignUp";
// import { useNavigate } from "react-router-native";
import useSignin from "../../hooks/useSignin";
import SignUpContainer from "./SignUpContainer";

const SignupForm = () => {
  const [signUp] = useSignup();
  const [signIn] = useSignin();
  // const navigate = useNavigate();

  const onSubmit = async ({username, password}) => {
    try{
      await signUp({username, password})
      await signIn({username, password})
    } catch (err) {
      console.error("Error:", err);
    }
  }

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignupForm;