import React from "react";
import { useGoogleLogin } from "react-google-login";

// refresh token
import { refreshTokenSetup } from "../../utils/refreshToken";

const clientId =
  "182622421571-j8fb38k1o18ggus56golo3cq6v21pe54.apps.googleusercontent.com";

function LoginHooks() {
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    console.log(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    console.log(
      `Failed to login. 😢 Please ping this to repo owner rushikeshkardile9@gmail.com`
    );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button
      onClick={() => signIn}
      className="button flex items-center border   px-4 py-2 border-orange-200 rounded-md hover:shadow-md"
    >
      <img
        src="icons/google.svg"
        alt="google login"
        className="  w-6 h-6 mr-2"
      ></img>

      <span className="font-bold">Google</span>
    </button>
  );
}

export default LoginHooks;
