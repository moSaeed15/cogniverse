import Image from "next/image";
import LoginButton from "./LoginButton";

const Login = () => {
  return (
    <div className="flex">
      <div className="w-2/3 bg-login h-screen flex flex-col items-center justify-center bg-no-repeat bg-cover pb-16">
        <h1 className="text-7xl font-bold relative -top-20">Cogniverse</h1>
        <Image src="/cogniverse-logo.svg" width={200} height={200} alt="logo" />
      </div>
      <div className="w-1/2 flex ml-10 pl-32 justify-center flex-col ">
        <h2 className="font-bold text-3xl">Nice to see you!</h2>
        <p className="text-light-grey font-medium max-w-72 my-3">
          Sign in with your google credentials to access the patient dashboard
        </p>
        <LoginButton />
      </div>
    </div>
  );
};

export default Login;
