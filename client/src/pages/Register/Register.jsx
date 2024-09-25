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

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    image: null,
  });

  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  console.log(user);
  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value, // Handle file input
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "student",
      image: null,
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signed in with Google")
      navigate("/");
    } catch (error) {
     toast.error(error?.message)
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
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
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
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phoneNumber"
                  type="tel"
                  placeholder="0123..."
                  value={formData.phoneNumber}
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

              {/* Role Selection and Image Upload */}
              <div className="flex flex-col md:flex-row gap-4 md:items-center mt-4">
                {/* Image Upload Input */}
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
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
            </div>
          </CardContent>
          <CardFooter className="flex flex-col ">
            <Button type="submit" className="w-full">
              Register
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
