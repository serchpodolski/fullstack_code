import { View, Pressable, StyleSheet, TextInput } from 'react-native';
import Text from '../Text';
import theme from '../theme';
import { useFormik } from "formik";
import * as yup from 'yup';
import { useNavigate } from "react-router-native";

const initialValues = {
  username: '',
  password: ''
}

const validationSchema = yup.object().shape({
  username: yup.string()
            .required('Username is required')
            .min(5, 'Username must be at least 5 characters long')
            .max(30, 'Username must be at most 20 characters long'),
  password: yup.string()
            .required('Password is required')
            .min(5, 'Password must be at least 5 characters long')
            .max(50, 'Password must be at most 20 characters long'),
  passwordConfirmation: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Password confirmation is required')
})

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    color: theme.colors.backgroundPrimary,
    width: '100%',
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
    fontSize: 20,
    borderRadius: 5,
  },
  error: {
    color: '#d73a4a'
  },
  borderError: {
    borderColor: '#d73a4a'
  },
  title: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    marginBottom: 10,
    textAlign: 'center'
  }
})

const SignUpContainer = ({onSubmit}) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await onSubmit(values);
      console.log(values);
      formik.resetForm();
      navigate('/');
    }
  });

  const showUsernameError = formik.touched.username && formik.errors.username;
  const showPasswordError = formik.touched.password && formik.errors.password;
  const showPasswordConfirmationError = formik.touched.passwordConfirmation && formik.errors.passwordConfirmation;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        value={formik.values.username}
        placeholder="Username"
        style={[styles.input, showUsernameError && styles.borderError]}
      />
      {showUsernameError && <Text style={styles.error}>{formik.errors.username}</Text>}
      <TextInput
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        value={formik.values.password}
        placeholder="Password"
        style={[styles.input, showPasswordError && styles.borderError]}
        secureTextEntry
      />
      {showPasswordError && <Text style={styles.error}>{formik.errors.password}</Text>}
      <TextInput
        onChangeText={formik.handleChange('passwordConfirmation')}
        onBlur={formik.handleBlur('passwordConfirmation')}
        value={formik.values.passwordConfirmation}
        placeholder="Password confirmation"
        style={[styles.input, showPasswordConfirmationError && styles.borderError]}
        secureTextEntry
      />
      {showPasswordConfirmationError && <Text style={styles.error}>{formik.errors.passwordConfirmation}</Text>}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.button}>Sign up</Text>
      </Pressable>
    </View>
  );  
}

export default SignUpContainer;