import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) return;

    const role = user?.unsafeMetadata?.role as string | undefined;

    if (!role) {
      navigate("/set-role");
    } else if (role === "farmer") {
      navigate("/farmer-dashboard");
    } else if (role === "distributor") {
      navigate("/distributor-dashboard");
    } else if (role === "consumer") {
      navigate("/consumer-dashboard");
    }
  }, [isSignedIn, user, navigate]);

  return null;
};

export default AuthRedirect;
