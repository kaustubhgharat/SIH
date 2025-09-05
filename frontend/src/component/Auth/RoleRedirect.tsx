import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RoleRedirect() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const role = user?.unsafeMetadata?.role;

    if (role === "farmer") navigate("/farmer-dashboard");
    else if (role === "distributor") navigate("/distributor-dashboard");
    else if (role === "retailer") navigate("/retailer-dashboard");
  }, [user, navigate]);

  return <p>Redirecting...</p>;
}
