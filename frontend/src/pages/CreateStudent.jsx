import React, { useState } from 'react';

const Navbar = ({ toggleMenu }) => {
    return (
        <nav className="fixed inset-x-0 top-0 flex items-center justify-between p-2 md:p-4 lg:p-6 h-16" style={{ backgroundColor: '#581C87' }}>
            <button onClick={toggleMenu} className="lg:hidden text-white">
                <div className="w-4 h-px bg-transparent mb-1" style={{ border: '1px solid #fff' }}></div>
                <div className="w-4 h-px bg-transparent mb-1" style={{ border: '1px solid #fff' }}></div>
                <div className="w-4 h-px bg-transparent" style={{ border: '1px solid #fff' }}></div>
            </button>
            <h1 className="text-lg md:text-2xl lg:text-3xl text-white">Tracify</h1>
        </nav>
    );
}

const CreateStudent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState(getCurrentDate());
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [groups, setGroups] = useState('');
    const [aplResponsible, setAplResponsible] = useState('');
    const [mentor, setMentor] = useState('');

    const handleNumberInput = (event) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            setPhoneNumber(event.target.value);
        }
    };

    function getCurrentDate() {
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1; // January is 0!
        const year = today.getFullYear();

        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;

        return `${year}-${formattedMonth}-${formattedDay}`;
    }

    return (
        <div className="mt-16 container mx-auto bg-neutral-700 bg-opacity-50 text-white p-4 md:p-8 lg:p-12 rounded-lg">
            <div className='container bg-neutral-700 rounded-lg p-4 md:p-8 lg:p-12 text-center'>
                <div className=''>
                    <h2 className="mb-4 text-lg md:text-xl lg:text-2xl font-bold">Personinformation</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <input
                            className="mb-2 p-2 border rounded w-full"
                            type="text"
                            placeholder="Förnamn"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            className="mb-2 p-2 border rounded w-full"
                            type="text"
                            placeholder="Efternamn"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <input
                        className="w-full mb-4 p-2 border rounded"
                        type="date"
                        value={birthDate}
                        max={getCurrentDate()}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                    <h2 className="mb-2 text-lg md:text-xl lg:text-2xl font-bold">Kontaktinformation</h2>
                    <input
                        className="w-full mb-2 p-2 border rounded"
                        type="email"
                        placeholder="E-post"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="w-full mb-2 p-2 border rounded"
                        type="text"
                        placeholder="Telefonnummer"
                        value={phoneNumber}
                        onChange={handleNumberInput}
                    />
                    <input
                        className="w-full mb-4 p-2 border rounded"
                        type="text"
                        placeholder="Adress"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <h2 className="mb-2 text-lg md:text-xl lg:text-2xl font-bold">Skola</h2>
                    <input
                        className="w-full mb-2 p-2 border rounded"
                        type="text"
                        placeholder="Skolnamn"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                    />
                    <input
                        className="w-full mb-2 p-2 border rounded"
                        type="text"
                        placeholder="Grupper"
                        value={groups}
                        onChange={(e) => setGroups(e.target.value)}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                        <input
                            className="mb-2 p-2 border rounded w-full"
                            type="text"
                            placeholder="APL Ansvarig"
                            value={aplResponsible}
                            onChange={(e) => setAplResponsible(e.target.value)}
                        />
                        <input
                            className="mb-2 p-2 border rounded w-full"
                            type="text"
                            placeholder="Mentor"
                            value={mentor}
                            onChange={(e) => setMentor(e.target.value)}
                        />
                    </div>
                    <button
                        className="p-2 mt-4 rounded"
                        style={{ backgroundColor: '#581C87' }}
                        onClick={() => {
                            // Spara studentinformationen
                        }}
                    >
                        Spara
                    </button>
                </div>
            </div>
        </div>
    );
}

export const CreateStudentPage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <Navbar toggleMenu={toggleMenu} />
            <CreateStudent />
        </>
    );
}
