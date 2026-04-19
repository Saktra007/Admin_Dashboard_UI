import { useEffect, useMemo, useState } from "react";
import { Button, Input, Select } from "../ui";
import { Hash, Mail, Save, Shield, User } from "lucide-react";
import AvatarUpload from "../ui/AvatarUpload";

const UserForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const handleAvatarChange = (file) => {
    setSelectedFile(file);
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        first_name: initialData.first_name || "",
        last_name: initialData.last_name || "",
        email: initialData.email || "",
        role: initialData.role || "user",
        status: initialData.status || "Active",
      });
      setSelectedFile(null);
    } else {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        role: "user",
        status: "Active",
      });
      setSelectedFile(null);
    }
    setErrors({});
  }, [initialData]);

  const RoleOptions = useMemo(
    () => [
      { value: "user", label: "User / Member" },
      { value: "editor", label: "Editor / Manager" },
      { value: "admin", label: "Administrator" },
    ],
    [],
  );

  const StatusOptions = useMemo(
    () => [
      { value: "Active", label: "Active" },
      { value: "Pending", label: "Pending" },
      { value: "Inactive", label: "Inactive" },
    ],
    [],
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email format is invalid";
    }

    if (!formData.role) newErrors.role = "Please assign a role";
    if (!formData.status) newErrors.status = "Please select a status";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        ...formData,
        avatar: selectedFile,
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim().toLowerCase(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Avatar Section */}
      <AvatarUpload
        onFileSelect={handleAvatarChange}
        initialAvatar={initialData?.avatar}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="first_name"
          label="First Name"
          placeholder="Ex: John"
          icon={User}
          value={formData.first_name}
          onChange={handleInputChange}
          error={errors.first_name}
          className="!py-3.5"
        />
        <Input
          name="last_name"
          label="Last Name"
          placeholder="Ex: Doe"
          icon={User}
          value={formData.last_name}
          onChange={handleInputChange}
          error={errors.last_name}
          className="!py-3.5"
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="john.doe@example.com"
        icon={Mail}
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        className="!py-3.5"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Assign Role"
          icon={Shield}
          value={formData.role}
          onChange={(val) => handleSelectChange("role", val)}
          options={RoleOptions}
          error={errors.role}
        />
        <Select
          label="Account Status"
          icon={Hash}
          value={formData.status}
          onChange={(val) => handleSelectChange("status", val)}
          options={StatusOptions}
          error={errors.status}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800/50">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={loading}
          className="uppercase tracking-widest text-xs font-black"
        >
          Discard
        </Button>
        <Button
          type="submit"
          variant={initialData ? "success" : "primary"}
          icon={Save}
          isLoading={loading}
          className="uppercase tracking-widest text-xs font-black"
        >
          {initialData ? "Save Changes" : "Create Member"}
        </Button>
      </div>
    </form>
  );
};
export default UserForm;
