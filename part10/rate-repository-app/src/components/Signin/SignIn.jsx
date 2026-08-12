// import * as yup from 'yup';
import useSignin from "../../hooks/useSignin";
import { useNavigate } from "react-router-native";
import SignInContainer from "./SignInContainer";


const SignIn = () => {
  const [signIn] = useSignin();
  const navigate = useNavigate();

  const onSubmit = async ({username, password}) => {
    try{
      const data = await signIn({username, password});
      if(data.data.authenticate.accessToken){
        navigate('/');
      } 
    } catch (err) {
      console.log(err);
      console.log("Invalid credentials");
    }
  }

  return <SignInContainer onSubmit={onSubmit} />
}

export default SignIn;