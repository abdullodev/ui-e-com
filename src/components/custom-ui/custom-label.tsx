const CustomLabel = ({ label }: { label: string }) => {
  return (
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
  );
};

export default CustomLabel;
