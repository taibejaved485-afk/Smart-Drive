export default function Pricing() {
  const plans = [
    { name: 'Basic', price: '$299', features: ['10 Lessons', 'Manual Car'] },
    { name: 'Regular', price: '$499', features: ['20 Lessons', 'Auto & Manual', 'Test Prep'], popular: true },
    { name: 'Advanced', price: '$799', features: ['Unlimited', 'Priority Slots', 'Full Prep'], },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-bold text-navy-900 text-center mb-12">Packages</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <div key={i} className={`p-8 rounded-2xl border ${p.popular ? 'border-amber-500 shadow-lg' : 'border-gray-200'}`}>
              <h3 className="text-xl font-bold mb-4">{p.name}</h3>
              <p className="text-4xl font-bold mb-6">{p.price}</p>
              <ul className="mb-8 space-y-2">
                {p.features.map(f => <li key={f} className="text-gray-600">✓ {f}</li>)}
              </ul>
              <button className={`w-full py-3 rounded-full font-bold ${p.popular ? 'bg-amber-500' : 'bg-navy-900 text-white'}`}>Select</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
