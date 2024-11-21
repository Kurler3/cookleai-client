
const Features = () => {
  const features = [
    {
      title: "AI-Powered Recipes",
      description: "Get recipes tailored to your preferences with advanced AI.",
      icon: "🍳",
    },
    {
      title: 'Cookbooks',
      description: 'Group recipes by cookbook, and share these cookbooks with other people',
      icon: '📚'
    },
  ];

  return (
    <section className="bg-base-100 py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="flex gap-8 flex-wrap w-full justify-center items-center">
          {features.map((feature, index) => (
            <div key={index} className="card shadow-xl w-[300px]">
              <div className="card-body items-center text-center">
                <div className="text-6xl">{feature.icon}</div>
                <h3 className="card-title mt-4">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
