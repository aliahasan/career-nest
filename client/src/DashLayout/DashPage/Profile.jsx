import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Loader2 } from "lucide-react";
import { secureApi } from "@/hooks/useSecureApi";
import toast from "react-hot-toast";
import { setUser } from "@/redux/authSlice";

// Reusable component for profile information
const InfoItem = ({ label, value }) => (
  <div className="flex flex-col space-y-1">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-base sm:text-lg break-words">{value}</p>
  </div>
);

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    skills: user?.skills || "",
    file: null,
    bio: user?.profile?.bio || "",
  });

  // Toggle edit mode
  const toggleEditMode = () => setIsEditing((prev) => !prev);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Submit edited data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const updatedUser = {
      ...editedUser,
      file: editedUser?.file || undefined,
    };

    try {
      const response = await secureApi.put(
        "/user/profile/update",
        updatedUser,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        setIsEditing(false);
        dispatch(setUser(response.data?.user));
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-col items-center space-y-4 p-6 sm:p-8 relative">
          {/* Edit button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={toggleEditMode}
          >
            <Pencil className="h-5 w-5" />
          </Button>

          {/* Avatar and Profile Info */}
          <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
            <AvatarImage src={user?.photoURL} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
            {user?.fullName || user?.displayName}
          </CardTitle>
          <Badge variant="secondary" className="text-sm sm:text-base">
            {user?.role || "admin"}
          </Badge>
        </CardHeader>

        {/* Profile Content */}
        <CardContent className="space-y-6 p-6 sm:p-8">
          {/* Display Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <InfoItem label="Email" value={user?.email} />
            <InfoItem label="Phone" value={user?.phoneNumber || null} />
            <InfoItem label="Birth Date" value={user?.role} />
          </div>

          {/* Bio Section */}
          <div className="mt-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Bio</h3>
            <p className="text-gray-600 text-sm sm:text-base">{user?.bio}</p>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user?.skills?.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))}
            </div>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <form onSubmit={handleSubmit} className="space-y-4 mt-8">
              <Input
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <Input
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              <Input
                name="phoneNumber"
                value={editedUser.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
              <Input
                name="skills"
                value={editedUser.skills}
                onChange={handleInputChange}
                placeholder="Skills (comma-separated)"
              />
              <Input
                type="file"
                name="file"
                onChange={handleInputChange}
                accept=".pdf"
              />
              <p className="mt-1 text-sm text-gray-500">
                only pdf files are allowed:
              </p>
              <Textarea
                name="bio"
                value={editedUser.bio}
                onChange={handleInputChange}
                placeholder="Write something about yourself"
                rows={4}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    please wait..
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
