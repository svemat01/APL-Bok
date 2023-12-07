const PersonalInfo = () => {
    return (
        <>
            <div className="flex flex-col w-full place-items-center">
                <h1 className="text-xl pt-8">Person info</h1>

                <div className="flex flex-row">
                    <div className="flex-col gap-4">
                        <h1 className="w-16">Namn:</h1>
                        <h1 className="w-16">Född:</h1>
                    </div>
                    <div className="flex-col gap-4">
                        <h1>Student Namn</h1>
                        <h1>2006 09 11</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

const ContactInfo = () => {
    return (
        <>
            <div className="flex flex-col w-full place-items-center">
                <h1 className="text-xl pt-8">Kontakt info</h1>

                <div className="flex flex-row">
                    <div className="flex-col gap-4">
                        <h1 className="w-20">Email:</h1>
                        <h1 className="w-20">Telefon:</h1>
                    </div>
                    <div className="flex-col gap-4">
                        <h1>Mailen.maila@mailat.mail</h1>
                        <h1>295 655 91 49</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

const SchoolInfo = () => {
    return (
        <>
            <div className="flex flex-col w-full place-items-center">
                <h1 className="text-xl pt-8">Skola info</h1>

                <div className="flex flex-row">
                    <div className="flex-col gap-4">
                        <h1 className="w-20">Skola:</h1>
                        <h1 className="w-20">Klass:</h1>
                        <h1 className="w-20">Grupper:</h1>
                    </div>
                    <div className="flex-col gap-4">
                        <h1>Skolan</h1>
                        <h1>3_it_1</h1>
                        <h1>Grupp 1, Grupp 2</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

const MentorInfo = () => {
    return (
        <>
            <div className="flex flex-col md:w-1/2 w-full place-items-center">
                <h1 className="text-xl pt-8">Mentor info</h1>

                <div className="flex flex-row">
                    <div className="flex-col gap-4">
                        <h1 className="w-20">Namn:</h1>
                        <h1 className="w-20">Email:</h1>
                        <h1 className="w-20">Telefon:</h1>
                    </div>
                    <div className="flex-col gap-4">
                        <h1>Mentor Namn</h1>
                        <h1>mailen.maila@mailat.mail</h1>
                        <h1>295 655 91 49</h1>
                    </div> 
                </div>
            </div>
        </>
    );
}

const APLResponsibleInfo = () => {
    return (
        <>
            <div className="flex flex-col md:w-1/2 w-full place-items-center">
                <h1 className="text-xl pt-8">APL ansvarig info</h1>

                <div className="flex flex-row">
                    <div className="flex-col gap-4">
                        <h1 className="w-20">Namn:</h1>
                        <h1 className="w-20">Email:</h1>
                        <h1 className="w-20">Telefon:</h1>
                    </div>
                    <div className="flex-col gap-4">
                        <h1>APL Namn</h1>
                        <h1>iehfoeifhoeifhnoe </h1>
                        <h1>295 655 91 49</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export const ProfileStudent = () => {
    return (
        <>
            <div className='bg-neutral-700 bg-opacity-50 container mx-auto mt-4 px-10 pt-0 pb-4 rounded-xl'>
                <div className="text-center p-6 ">
                    <h1 className="text-3xl">Elev profil</h1>
                </div>

                <div className='bg-neutral-700 p-8 pt-0 rounded-lg flex flex-col gap-8 text-white justify-around '>
                    <div><PersonalInfo /></div>
                    <div><ContactInfo /></div>
                    <div><SchoolInfo /></div>
                    <div className="w-full flex flex-wrap md:divide-y-2 md:divide-none divide-y-2 divide-neutral-800 md:gap-0 gap-8 2xl:px-60 xl:px-36 lg:px-20 px-0">
                        <APLResponsibleInfo />
                        <MentorInfo />
                    </div>
                </div>    
            </div>
        </>
    )
}