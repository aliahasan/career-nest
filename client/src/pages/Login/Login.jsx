import { useState } from "react";
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
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("login successful");
      navigate("/");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ email: "", password: "", role: "" }); // Reset the role as well
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
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    id="student"
                    checked={formData.role === "student"}
                    onChange={handleInputChange}
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
                    checked={formData.role === "recruiter"}
                    onChange={handleInputChange}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="recruiter">Recruiter</Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
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
