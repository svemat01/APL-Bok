import React, { useState } from 'react';

// Navbar-komponenten
const Navbar = ({ toggleMenu }) => {
    return (
        <nav className="fixed inset-x-0 top-0 flex items-center justify-between p-2 md:p-4 lg:p-6 h-16 bg-purple-800">
            <button onClick={toggleMenu} className="lg:hidden text-white">
                <div className="w-4 h-px bg-transparent mb-1 border border-white"></div>
                <div className="w-4 h-px bg-transparent mb-1 border border-white"></div>
                <div className="w-4 h-px bg-transparent border border-white"></div>
            </button>
            <h1 className="text-lg md:text-2xl lg:text-3xl text-white">Tracify</h1>
        </nav>
    );
};

// Rapport-komponenten
export const Rapport = () => {
    const [aplExperience, setAplExperience] = useState('');
    const [activities, setActivities] = useState('');
    const [timeFrame, setTimeFrame] = useState('');
    const [rating, setRating] = useState(0);

    const submitReport = () => {
        // Här kan du skicka rapporten
        console.log(aplExperience, activities, timeFrame, rating);
    };

    return (
        <div>
            {/* Lägg till Navbar här */}
            <Navbar />

            <div className="container mx-auto px-4 md:px-8 lg:px-12 py-4 mt-16 flex flex-col items-center">
                <input
                    className="w-full mb-2 p-2 border rounded"
                    type="text"
                    placeholder="Hur var din APL idag"
                    value={aplExperience}
                    onChange={(e) => setAplExperience(e.target.value)}
                />
                <input
                    className="w-full mb-2 p-2 border rounded"
                    type="text"
                    placeholder="Vad gjorde du idag"
                    value={activities}
                    onChange={(e) => setActivities(e.target.value)}
                />
                <input
                    className="w-full mb-2 p-2 border rounded"
                    type="text"
                    placeholder="När började och slutade du idag"
                    value={timeFrame}
                    onChange={(e) => setTimeFrame(e.target.value)}
                />

                <div className="flex flex-col items-center mt-4">
                    <div className="w-full h-20 bg-white border rounded p-2 flex items-center justify-center">
                        <label className="text-sm md:text-base lg:text-lg font-semibold text-purple-800 mr-2">
                            Betygsätt din dag idag från 1 till 10:
                        </label>
                        <input
                            type="number"
                            className="w-12 h-8 border rounded text-center bg-purple-800 text-white"
                            min="1"
                            max="10"
                            onChange={(e) => setRating(parseInt(e.target.value))}
                        />
                    </div>

                    <button onClick={submitReport} className="w-full p-2 border-2 rounded bg-white text-purple-800 mt-4">
                        Skicka Rapport
                    </button>
                </div>
            </div>
        </div>
    );
};
