import SignInScreen from "./signin.client";

const SignIn = () => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="font-semibold text-2xl">Bem Vindo</h1>
        <SignInScreen />
      </div>
    </>
  );
};

export default SignIn;
