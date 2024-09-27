const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center  space-y-4">
      <h2 className="text-navy font-bold text-4xl">{title}</h2>
      <p className="text-garish text-lg">{subtitle}</p>
    </div>
  );
};

export default SectionTitle;
