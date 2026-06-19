export default function Courses() {
  const courses = [
    { title: 'Beginner Course', duration: '4 Weeks', price: '$299' },
    { title: 'Refresher Course', duration: '1 Week', price: '$149' },
    { title: 'Defensive Driving', duration: '2 Weeks', price: '$199' },
    { title: 'License Test Prep', duration: '3 Weeks', price: '$249' },
  ];

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-bold text-navy-900 text-center mb-12">Training Programs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {courses.map((c, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-lg mb-2">{c.title}</h3>
              <p className="text-gray-600 mb-4">{c.duration} • {c.price}</p>
              <button className="text-amber-600 font-medium hover:underline">View Details →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
