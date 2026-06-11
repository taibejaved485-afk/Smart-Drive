import { FileText, Settings, FileCheck } from 'lucide-react';

export default function Features() {
  const features = [
    { 
      icon: FileText, 
      label: 'Experienced & Certified Instructors', 
      desc: 'Our professional trainers provide hands-on learning to help you master driving with ease.' 
    },
    { 
      icon: Settings, 
      label: 'Customized Learning Programs', 
      desc: 'We offer flexible courses designed for beginners, intermediate learners, and those seeking advanced driving techniques.' 
    },
    { 
      icon: FileCheck, 
      label: 'Traffic Rules Training', 
      desc: 'We emphasize defensive driving, road safety awareness, and adherence to traffic laws.' 
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="p-4 rounded-full bg-red-600 shadow-md">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900">{feature.label}</h3>
              <div className="w-16 h-1 bg-red-500 rounded-full" />
              <p className="text-gray-600 leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
