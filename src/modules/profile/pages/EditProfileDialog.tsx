// components/EditProfileDialog.tsx
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { updateUserProfileThunk } from "../../../store/slice/user.thunk";
import Form from "../../../components/Form";
import Loader from "../../../components/Loader";
import { formSchema } from "../schema/schema";

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileDialog = ({ isOpen, onClose }: EditProfileDialogProps) => {
  const dispatch = useAppDispatch();
  const { userProfile, screenLoading } = useAppSelector((state) => state.user);

  const [profileImage, setProfileImage] = useState<string>("");
  const [initialValues, setInitialValues] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    if (userProfile && isOpen) {
      const values = {
        fullName: userProfile.fullName || "",
        username: userProfile.username || "",
        bio: userProfile.bio || "",
        profileImage: userProfile.profileImage || "",
        City: userProfile.City || "",
        Country: userProfile.Country || "",
      };
      setInitialValues(values);
      setProfileImage(userProfile.profileImage || "");
    }
  }, [userProfile, isOpen]);

  const handleFormSubmit = async (formData: Record<string, string>) => {
    try {
      const profileData = {
        ...formData,
        // profileImage: formData.profileImage || profileImage,
      };

      await dispatch(updateUserProfileThunk(profileData)).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  console.log(initialValues);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1E1F22] rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors cursor-pointer hover:bg-[var(--color-active-gray)] rounded-full px-2"
            disabled={screenLoading}
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Image Upload Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src={profileImage || "/default-avatar.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-600"
              />
            </div>
          </div>
          <Form
            schema={formSchema}
            onSubmit={handleFormSubmit}
            resetSubmit={false}
            initialValues={initialValues}
          />

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              form="login-form"
              disabled={screenLoading}
              className="flex-1 px-4 py-2 bg-[var(--color-blue)] text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {screenLoading ? <Loader /> : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileDialog;
