import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="flex justify-center min-h-screen items-center flex-col">
      <h1 className="text-3xl font-bold mb-2">Oops!</h1>
      <p className="font-small text-gray-500 mb-8">Sorry, an unexpected error has occurred.</p>
      <p className="font-small text-red-500">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
