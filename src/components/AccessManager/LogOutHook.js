import React from "react";
import { useGoogleLogout } from "react-google-login";

const clientId =
  "707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com";

function LogoutHooks() {
  const onLogoutSuccess = (res) => {
    console.log("Logged out Success");
    alert("Logged out Successfully ✌");
  };

  const onFailure = () => {
    console.log("Handle failure cases");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button
      onClick={signOut}
      className="button flex items-center border  px-4 py-2 border-orange-200 rounded-md hover:shadow-md"
    >
      <img
        src="icons/google.svg"
        alt="google login"
        className="  w-6 h-6 mr-2"
      ></img>

      <span className="font-bold">Sign out</span>
    </button>
  );
}

export default LogoutHooks;
