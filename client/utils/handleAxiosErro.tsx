// import { AxiosError } from "axios";

// interface ErrorResponse {
//   message: string;
//   err: string;
// }

// export const handleAxiosError = (
//   err: unknown,
//   setError: React.Dispatch<React.SetStateAction<string>>
// ) => {
//   const axiosError = err as AxiosError<ErrorResponse>; // Cast the error to our custom type

//   if (axiosError.response) {
//     setError(
//       axiosError.response.data.message || "An unknown error occurred. try again"
//     );
//   } else {
//     setError("Network error or server not reachable.");
//   }
// };
