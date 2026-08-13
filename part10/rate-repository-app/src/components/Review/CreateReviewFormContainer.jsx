import Text from "../Text";
import * as yup from 'yup';
import { useFormik } from "formik";
import { TextInput, Pressable, View } from "react-native";
import theme from "../theme";
import { useNavigate } from "react-router-native";

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository Owner\'s name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number()
        .typeError('Rating must be a number')
        .required('Rating is required')
        .min(0, 'Rating must be at least 0')
        .max(100, 'Rating must be at most 100'),
  text: yup.string().optional('Enter a comment')
})

const styles = {
  container: {
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10
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
    borderRadius: 5,
  },
  error: {
    color: '#d73a4a'
  },
  borderError: {
    borderColor: '#d73a4a'
  }
}

// const showTextError = formik.touched.text && formik.errors.text;

const CreateReviewFormContainer = ({onSubmit}) => {
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
  })
  
  const showUsernameError = formik.touched.ownerName && formik.errors.ownerName;
  const showRepositorynameError = formik.touched.repositoryName && formik.errors.repositoryName;
  const showRatingError = formik.touched.rating && formik.errors.rating;
  
  return (
   <View style={styles.container}>
    <TextInput
      onChangeText={formik.handleChange('ownerName')}
      onBlur={formik.handleBlur('ownerName')}
      value={formik.values.ownerName}
      placeholder="Repository Owner's name"
      style={[styles.input, showUsernameError && { borderColor: theme.colors.error }]}
    />
    {showUsernameError && <Text style={{ color: theme.colors.error }}>{formik.errors.username}</Text>}
    <TextInput
      onChangeText={formik.handleChange('repositoryName')}
      onBlur={formik.handleBlur('repositoryName')}
      value={formik.values.repositoryName}
      placeholder="Repository name"
      style={[styles.input, showRepositorynameError && { borderColor: theme.colors.error }]}
    />
    {showRepositorynameError && <Text style={{ color: theme.colors.error }}>{formik.errors.repositoryname}</Text>}
    <TextInput
      onChangeText={formik.handleChange('rating')}
      onBlur={formik.handleBlur('rating')}
      value={formik.values.rating}
      placeholder="Rating"
      style={[styles.input, showRatingError && { borderColor: theme.colors.error }]}
    />
    {showRatingError && <Text style={{ color: theme.colors.error }}>{formik.errors.rating}</Text>}
    <TextInput
      onChangeText={formik.handleChange('text')}
      onBlur={formik.handleBlur('text')}
      value={formik.values.text}
      placeholder="Comment"
      style={[styles.input]}
      multiline
      numberOfLines={4}
    />
    <Pressable onPress={formik.handleSubmit} style={{ width: '100%' }}>
      <Text style={styles.button}>Submit</Text>
    </Pressable>
   </View>
  )
}

export default CreateReviewFormContainer;