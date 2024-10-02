import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Loader2 } from "lucide-react";
import { secureApi } from "@/hooks/useSecureApi";
import toast from "react-hot-toast";
import { setLoading, updateUser } from "@/redux/authSlice";
import { EditableInput, InfoItem } from "@/shared/Reuseable";
import { Input } from "@/components/ui/input";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    fullName: user?.fullName || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
    bio: user?.profile?.bio || "",
    photoURL: user?.photoURL || null,
  });

  const toggleEditMode = () => setIsEditing((prev) => !prev);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const updatedUser = {
      ...editedUser,
      file: editedUser?.file || undefined,
      skills: editedUser.skills.split(",").map((skill) => skill.trim()),
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
        dispatch(updateUser(response.data?.user));
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-col items-center space-y-4 p-6 sm:p-8 relative">
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
            <AvatarImage src={user?.photoURL} alt={user?.fullName} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
            {user?.fullName}
          </CardTitle>
          <Badge variant="secondary" className="text-sm sm:text-base">
            {user?.role || "admin"}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6 p-6 sm:p-8">
          {!isEditing ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <InfoItem label="Email" value={user?.email} />
                <InfoItem label="Phone" value={user?.phoneNumber} />
              </div>

              {/* Bio Section */}
              <div className="mt-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Bio</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {user?.profile?.bio || "No bio available"}
                </p>
              </div>

              {/* Skills Section */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user?.profile?.skills?.map((skill, index) => (
                    <Badge key={index}>{skill}</Badge>
                  )) || "No skills added"}
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-8">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <Input
                  name="email"
                  value={editedUser.email}
                  placeholder="Email"
                  type="email"
                  readOnly
                  defaultValue={user?.email}
                />
                <span className="text-red-400 text-sm">
                  email update is not applicable
                </span>
              </div>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <EditableInput
                  id="fullName"
                  name="fullName"
                  value={editedUser.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Skills
                </label>
                <EditableInput
                  id="skills"
                  name="skills"
                  value={editedUser.skills}
                  onChange={handleInputChange}
                  placeholder="Skills (comma-separated)"
                />
              </div>
              <div>
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  File Upload
                </label>
                <EditableInput
                  id="file"
                  name="file"
                  type="file"
                  onChange={handleInputChange}
                  accept="application/pdf"
                />
                <span className="text-sm pl-2 text-red-600">
                  Only .pdf file is acceptable
                </span>
              </div>
              <div>
                <label
                  htmlFor="Image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Image
                </label>
                <EditableInput
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleInputChange}
                  accept="image/*"
                />
                <span className="text-sm pl-2 text-red-600"></span>
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Bio
                </label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={editedUser.bio}
                  onChange={handleInputChange}
                  placeholder="Bio"
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
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
