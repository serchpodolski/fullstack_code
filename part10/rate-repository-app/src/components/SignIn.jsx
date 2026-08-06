import Text from "./Text";
import { TextInput, View, Pressable } from "react-native";
import { useFormik } from "formik";
import theme from "./theme";
import * as yup from 'yup';

const initialValues = {
  username: '',
  password: ''
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
})

const styles = {
  container: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: '10 auto'
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%'
  },
  button: {
    marginTop: 10,
    backgroundColor: theme.colors.primary,
    padding: 10,
    color: theme.colors.backgroundPrimary,
    width: '100%',
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
    fontSize: 20,
    borderRadius: 5
  },
  error: {
    color: '#d73a4a'
  },
  borderError: {
    borderColor: '#d73a4a'
  }
}

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      console.log(values)
      formik.resetForm();
    }
  })

  const showUsernameError = formik.touched.username && formik.errors.username;
  const showPasswordError = formik.touched.password && formik.errors.password;

  return (
    <View style={styles.container}>
      <TextInput 
        onChangeText={formik.handleChange('username')}
        value={formik.values.username}
        placeholder="Username"
        onBlur={formik.handleBlur('username')}
        style={[styles.input, showUsernameError && styles.borderError]}
      />
      {showUsernameError && <Text style={styles.error}>{formik.errors.username}</Text>}
      <TextInput
        secureTextEntry
        placeholder="Password"
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
        onBlur={formik.handleBlur('password')}
        style={[styles.input, showPasswordError && styles.borderError]}
      />
      {showPasswordError && <Text style={styles.error}>{formik.errors.password}</Text>}
      <Pressable onPress={formik.handleSubmit} style={{width: '100%'}}>
        <Text style={styles.button}>Sign In</Text>
      </Pressable>
    </View>
  )
}

export default SignIn;