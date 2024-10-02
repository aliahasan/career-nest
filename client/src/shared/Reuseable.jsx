import { Input } from "@/components/ui/input";

const InfoItem = ({ label, value }) => {
  return (
    <div className="flex flex-col space-y-1">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base sm:text-lg break-words">{value || "N/A"}</p>
    </div>
  );
};

const EditableInput = ({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <Input
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
  />
);

export { InfoItem, EditableInput };
