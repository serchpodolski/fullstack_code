import useCreateReview from "../../hooks/useCreateReview";
import { useNavigate } from "react-router-native";
import CreateReviewFormContainer from "./CreateReviewFormContainer";

const CreateReviewForm = ({ repository }) => {
  const [createReview, result] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
  
    try {
      const data = await createReview({
        ownerName,
        repositoryName,
        rating,
        text,
      });
  
      if(data?.createReview?.repositoryId){
        navigate(`/repositories/${data.createReview.repositoryId}`);
        }
      } catch (err) {
        console.log(err.message);
        console.log("Invalid credentials");
      }
    }
    return (
      <CreateReviewFormContainer onSubmit={onSubmit} />
    )
  }

  export default CreateReviewForm;