import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { secureApi } from "@/hooks/useSecureApi";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser, signInWithGoogle } from "@/redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      email: form.email.value,
      password: form.password.value,
      role: form.role.value,
    };
    try {
      dispatch(setLoading(true));
      const response = await secureApi.post("/user/login", formData);
      if (response.data?.user) {
        dispatch(setUser(response.data?.user));
      }
      if (response.data.success) {
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
      form.reset();
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      dispatch(setLoading(true));
      await dispatch(signInWithGoogle());
      navigate("/");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Login to your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    id="student"
                    className="cursor-pointer"
                  />
                  <Label htmlFor="student">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    id="recruiter"
                    className="cursor-pointer"
                  />
                  <Label htmlFor="recruiter">Recruiter</Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Please wait...
                </>
              ) : (
                "Login"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2 my-2"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle className="w-5 h-5" />
              Sign in with Google
            </Button>
          </CardFooter>
          <CardContent>
            <div className="text-center">
              <p>
                Don&apos;t have an account? Please{" "}
                <Link
                  className=" hover:underline hover:underline-offset-4 text-blue-500"
                  to="/signup"
                >
                  Register
                </Link>
              </p>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default Login;
