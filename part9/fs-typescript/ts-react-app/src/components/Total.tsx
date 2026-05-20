interface TotalExercises{
    totalExercises: number;
}

const Total = ({ totalExercises } : TotalExercises) => {
    return (
        <div>
            Number of exercises {totalExercises}
        </div>
    )
};

export default Total;