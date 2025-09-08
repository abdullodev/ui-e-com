import { CustomModal } from "@/components";
import { Button } from "@/components/ui/button";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import type { UserProfile } from "./overview";

interface Props {
  setUserProfile: Dispatch<SetStateAction<UserProfile>>;
  userProfile: UserProfile;
}

function EditProfile({ setUserProfile, userProfile }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (field: keyof UserProfile, value: string): void => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logic here
    setIsOpen(false); // Close dialog after saving
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline">
        Edit profile
      </Button>

      <CustomModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        children={
          <>
            <h1 className="text-2xl mb-4">Edit profile</h1>
            <form onSubmit={handleSave}>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={userProfile.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={userProfile.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={userProfile.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end py-4">
                <Button variant="outline" type="button" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
                >
                  Save changes
                </Button>
              </div>
            </form>
          </>
        }
      />
    </>
  );
}

export default EditProfile;
