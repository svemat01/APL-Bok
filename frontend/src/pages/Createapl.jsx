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

const FormSection = ({ title, fields, onChange }) => {
    return (
        <div className="container mx-auto mt-8">
            <div className='bg-neutral-700 bg-opacity-50 text-white p-4 md:p-8 lg:p-12 rounded-lg text-center'>
                <h2 className="mb-2 text-lg md:text-xl lg:text-2xl font-bold">{title}</h2>
                {fields.map((field) => (
                    <input
                        key={field.name}
                        className="w-full mb-2 p-2 border rounded"
                        type="text"
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(e) => onChange(field.name, e.target.value)}
                    />
                ))}
            </div>
        </div>
    );
}

export const Createapl = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        companyName: '',
        orgNumber: '',
        industry: '',
        email: '',
        mobileNumber: '',
        address: '',
        name: '',
        mentor: '',
    });

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleFormChange = (field, value) => {
        setFormValues({
            ...formValues,
            [field]: value,
        });
    };

    const saveReport = () => {
        // Här kan du skicka eller spara rapporten
        console.log("Rapport sparad:", formValues);
        // Lägg till din logik för att spara rapporten
    };

    const formSections = [
        {
            title: 'Företags info',
            fields: [
                { name: 'companyName', placeholder: 'Namn', value: formValues.companyName },
                { name: 'orgNumber', placeholder: 'Organisationsnummer', value: formValues.orgNumber },
                { name: 'industry', placeholder: 'Bransch', value: formValues.industry },
            ],
        },
        {
            title: 'Kontaktinfo',
            fields: [
                { name: 'email', placeholder: 'Mail', value: formValues.email },
                { name: 'mobileNumber', placeholder: 'Mobilnummer', value: formValues.mobileNumber },
                { name: 'address', placeholder: 'Adress', value: formValues.address },
            ],
        },
        {
            title: 'Handledare',
            fields: [
                { name: 'name', placeholder: 'Namn', value: formValues.name },
                { name: 'mentor', placeholder: 'Handledare', value: formValues.mentor },
            ],
        },
    ];

    return (
        <div>
            <Navbar toggleMenu={toggleMenu} />
            {formSections.map((section) => (
                <FormSection
                    key={section.title}
                    title={section.title}
                    fields={section.fields}
                    onChange={handleFormChange}
                />
            ))}
            <div className="container mx-auto mt-8 flex justify-center">
                <button onClick={saveReport} className="p-2 border-2 rounded bg-white text-purple-800">
                    Skapa APL
                </button>
            </div>
        </div>
    );
}
