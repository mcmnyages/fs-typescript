interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExerciseHours: number[],target: number):ExerciseResult => {
  const periodLength = dailyExerciseHours.length;

  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;

  const totalHours = dailyExerciseHours.reduce((sum, hours) => sum + hours,0);

  const average = totalHours / periodLength;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "excellent";
  } else if (average >= target * 0.5) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "you need to work harder";
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseExerciseArguments = (args: string[] ): [number[], number] => {
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }

  const target = Number(args[2]);
  const exerciseHours = args.slice(3).map(Number);

  if (isNaN(target) || exerciseHours.some(isNaN)) {
    throw new Error("Arguments must be numbers");
  }

  return [exerciseHours, target];
};

try {
  const [exerciseHours, target] =
    parseExerciseArguments(process.argv);

  console.log(calculateExercises(exerciseHours, target));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
