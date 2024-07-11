import Image from 'next/image';
import LoginButton from '@/app/LoginButton';
import Head from 'next/head';
import Link from 'next/link';

const Login = () => {
  return (
    <>
      <Head>
        <link rel="preload" href="/login.webp" as="image" />
      </Head>
      <div className="flex">
        <div className=" bg-login h-screen flex flex-col items-center justify-center bg-no-repeat bg-cover pb-16 lg:w-2/3 w-full">
          <h1 className="lg:text-7xl text-6xl font-bold relative lg:-top-20 -top-10">
            Cogniverse
          </h1>
          <Image
            src="/cogniverse-logo.webp"
            width={200}
            height={200}
            className="lg:w-52 w-44"
            alt="logo"
            quality={70}
            priority={true}
          />
          <div className=" justify-center flex flex-col lg:hidden  mt-5 items-center rounded-xl">
            <h2 className="font-bold text-3xl">Nice to see you!</h2>
            <p className="text-white/90 font-medium max-w-72 my-3">
              Sign in with your Google credentials to access the patient
              dashboard
            </p>
            <LoginButton />
            <p className="text-light-grey font-medium max-w-72 my-3">
              Not an authorized user? Explore our{' '}
              <Link
                href="/demo?user=x8Y8rnE0EEWaxbRiNpQpDU3KUNl1&game=maze&session=1"
                className="text-indigo-400 "
              >
                demo
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="w-1/2  ml-10 pl-32 justify-center flex-col hidden lg:flex ">
          <h2 className="font-bold text-3xl">Nice to see you!</h2>
          <p className="text-light-grey font-medium max-w-72 my-3">
            Sign in with your Google credentials to access the patient dashboard
          </p>
          <LoginButton />
          <p className="text-light-grey font-medium max-w-72 my-3">
            Not an authorized user? Explore our{' '}
            <Link
              href="/demo?user=x8Y8rnE0EEWaxbRiNpQpDU3KUNl1&game=maze&session=1"
              className="text-indigo-400 "
            >
              demo
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
