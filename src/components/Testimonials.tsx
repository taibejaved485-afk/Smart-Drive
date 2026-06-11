export default function Testimonials() {
  const reviews = [
    { name: 'John D.', text: 'Great instructors, passed on my first try!' },
    { name: 'Sarah M.', text: 'Flexible timings helped me balance work and training.' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-bold text-navy-900 text-center mb-12">Student Stories</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm">
              <p className="text-gray-600 mb-4">"{r.text}"</p>
              <p className="font-bold text-navy-900">— {r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
