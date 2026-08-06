import Text from "./Text";
import { TextInput, View, Pressable } from "react-native";
import { useFormik } from "formik";
import theme from "./theme";

const initialValues = {
  username: '',
  password: ''
}

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
  }
}

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      console.log(values)
      formik.resetForm();
    }
  })

  return (
    <View style={styles.container}>
      <TextInput 
        onChangeText={formik.handleChange('username')}
        value={formik.values.username}
        placeholder="Username"
        style={styles.input}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
        style={styles.input}
      />
      <Pressable onPress={formik.handleSubmit} style={{width: '100%'}}>
        <Text style={styles.button}>Sign In</Text>
      </Pressable>
    </View>
  )
}

export default SignIn;