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
import { useDispatch, useSelector } from "react-redux";
import { setLoading, signInWithGoogle } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      fullName: form.fullName.value,
      email: form.email.value,
      phoneNumber: form.phoneNumber.value,
      password: form.password.value,
      role: form.role.value,
      image: form.image.files[0],
    };
    try {
      dispatch(setLoading(true));
      const response = await secureApi.post("/user/register", formData);
      toast.success(response.data.message);
      form.reset();
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
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
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Register
          </CardTitle>
          <CardDescription className="text-center">
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fullName">Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  required
                />
              </div>
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
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="0123..."
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>

              {/* Role Selection and Image Upload */}
              <div className="flex flex-col md:flex-row gap-4 md:items-center mt-4">
                {/* Image Upload Input */}
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="image"
                    name="image"
                    required
                    type="file"
                    accept="image/*"
                    className="cursor-pointer"
                  />
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
            </div>
          </CardContent>
          <CardFooter className="flex flex-col ">
            <Button type="submit" className="w-full">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Please wait...
                </>
              ) : (
                "Register"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-2 mt-4"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle className="w-5 h-5" />
              Sign up with Google
            </Button>
            <p className="mt-4 text-center">
              Already have an account? Please{" "}
              <Link
                className="text-blue-500 hover:underline hover:underline-offset-4"
                to="/login"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
