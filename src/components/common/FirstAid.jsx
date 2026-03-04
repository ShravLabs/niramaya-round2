import { useState } from "react";

const FirstAid = () => {
  const [selected, setSelected] = useState(null);

  const guides = [
    {
      id: 1,
      title: "CPR",
      icon: "heart",
      bg: "bg-red-50",
      border: "border-red-300",
      titleColor: "text-red-700",
      steps: [
        "Call 108 ambulance immediately",
        "Lay person on their back on firm surface",
        "Place heel of hand on center of chest",
        "Push down hard and fast 100 to 120 times per minute",
        "Give 2 rescue breaths after every 30 compressions",
        "Continue until ambulance arrives",
      ],
    },
    {
      id: 2,
      title: "Snake Bite",
      icon: "snake",
      bg: "bg-yellow-50",
      border: "border-yellow-300",
      titleColor: "text-yellow-700",
      steps: [
        "Keep the person CALM and still",
        "Remove any tight clothing or jewelry near bite",
        "Keep bitten area BELOW heart level",
        "Do NOT cut suck or apply tourniquet",
        "Note color and pattern of snake if safe",
        "Rush to hospital IMMEDIATELY call 108",
      ],
    },
    {
      id: 3,
      title: "Burns",
      icon: "fire",
      bg: "bg-orange-50",
      border: "border-orange-300",
      titleColor: "text-orange-700",
      steps: [
        "Cool the burn with cool running water for 20 minutes",
        "Remove jewelry or clothing near burn unless stuck",
        "Cover loosely with clean cling wrap",
        "Do NOT use ice butter or toothpaste",
        "Do NOT burst blisters",
        "Seek medical help for large or deep burns",
      ],
    },
    {
      id: 4,
      title: "Choking",
      icon: "choke",
      bg: "bg-purple-50",
      border: "border-purple-300",
      titleColor: "text-purple-700",
      steps: [
        "Ask if they are choking - if they can speak encourage coughing",
        "If cannot breathe - stand behind them",
        "Give 5 firm back blows between shoulder blades",
        "Give 5 abdominal thrusts using Heimlich maneuver",
        "Alternate back blows and abdominal thrusts",
        "Call 108 if object not dislodged",
      ],
    },
    {
      id: 5,
      title: "Poisoning",
      icon: "poison",
      bg: "bg-green-50",
      border: "border-green-300",
      titleColor: "text-green-700",
      steps: [
        "Call 108 immediately",
        "Do NOT make the person vomit unless told by doctor",
        "If conscious give water to dilute poison",
        "Collect the poison container to show doctors",
        "Keep person calm and still",
        "Monitor breathing until help arrives",
      ],
    },
    {
      id: 6,
      title: "Bleeding",
      icon: "blood",
      bg: "bg-red-50",
      border: "border-red-300",
      titleColor: "text-red-700",
      steps: [
        "Apply direct pressure with clean cloth",
        "Keep pressing firmly for at least 10 minutes",
        "Do NOT remove cloth - add more on top if needed",
        "Elevate the injured area above heart level",
        "For severe bleeding call 108 immediately",
        "Keep person warm and lying down",
      ],
    },
  ];

  const getIcon = (icon) => {
    if (icon === "heart") return "❤️";
    if (icon === "snake") return "🐍";
    if (icon === "fire") return "🔥";
    if (icon === "choke") return "😮";
    if (icon === "poison") return "⚠️";
    if (icon === "blood") return "🩹";
    return "❓";
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">First Aid Guide</h2>
        <p className="text-gray-600 mt-1">Emergency first aid instructions</p>
      </div>

      <div className="bg-red-500 text-white p-5 rounded-xl mb-8 flex items-center justify-between">
        <div>
          <p className="text-xl font-bold">Emergency?</p>
          <p className="text-sm opacity-90">Call ambulance immediately</p>
        </div>
        <a href="tel:108" className="bg-white text-red-600 font-bold px-8 py-3 rounded-xl text-xl">
          Call 108
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {guides.map((guide) => (
          <button
            key={guide.id}
            onClick={() => {
              if (selected && selected.id === guide.id) {
                setSelected(null);
              } else {
                setSelected(guide);
              }
            }}
            className="border-2 p-5 rounded-xl text-center hover:shadow-lg transition-all bg-gray-50 border-gray-300"
          >
            <div className="text-4xl mb-2">{getIcon(guide.icon)}</div>
            <div className="font-bold text-lg text-gray-700">{guide.title}</div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="bg-blue-50 border-2 border-blue-300 p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-blue-700 mb-6">
            {getIcon(selected.icon)} {selected.title} - Step by Step
          </h3>
          <ol className="space-y-4">
            {selected.steps.map((step, index) => (
              <li key={index} className="flex items-start space-x-4">
                <span className="bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-gray-800 flex-shrink-0 shadow">
                  {index + 1}
                </span>
                <p className="text-gray-800 text-lg leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default FirstAid;