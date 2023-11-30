import React, { useState } from 'react';

const ActiveAPL = () => {

    return (
        <>
            <div className="bg-neutral-400 p-4 rounded-md grid place-items-center"> 
                <h2 className="text-2xl">Aktiva APL:er</h2>
                <h2 className='text-4xl pt-2 pb-4'>30</h2>
                <button className='bg-neutral-500 hover:bg-neutral-600 px-10 py-1 rounded-lg '>
                    <a className='text-white' href="/all-apl">Visa alla</a>
                </button>
            </div>
        </>
    );

}

const TodayMood = () => {

    return (
        <>
            <div className="bg-neutral-400 p-4 rounded-md grid place-items-center"> 
                <h2 className="text-2xl text-center">Dagens humör</h2>
                
            </div>
        </>
    );

}

const ActiveCompanies = () => {

    return (
        <>
            <div className="bg-neutral-400 p-4 rounded-md grid place-items-center">  
                <h2 className="text-2xl">Aktiva företag</h2>
                <h2 className='text-4xl pt-2 pb-4'>30</h2>
                <button className='bg-neutral-500 hover:bg-neutral-600 px-10 py-1 rounded-lg '>
                    <a className='text-white' href="/all-companies">Visa alla</a>
                </button>
            </div>
        </>
    );

}

const TodayReport = () => {

    return (
        <>
            <div className="bg-neutral-400 p-4 rounded-md grid place-items-center"> 
                <h2 className="text-2xl">Dagens rapport</h2>
                <h2 className='text-4xl pt-2 pb-4'>30</h2>
                <button className='bg-neutral-500 hover:bg-neutral-600 px-10 py-1 rounded-lg '>
                    <a className='text-white' href="/all-companies">Visa alla</a>
                </button>
            </div>
        </>
    );

}

const ActiveStudents = () => {

    return (
        <>
            <div className="bg-neutral-400 p-4 rounded-md grid place-items-center">
                <h2 className="text-2xl">Aktiva elever</h2>
                <h2 className='text-4xl pt-2 pb-4'>30</h2>
                <button className='bg-neutral-500 hover:bg-neutral-600 px-10 py-1 rounded-lg '>
                    <a className='text-white' href="/all-companies">Visa alla</a>
                </button>
            </div>
        </>
    );

}

const CreateNewObject = () => {

    return (
        <>
            <div>
                <div className="bg-neutral-400 p-4 rounded-md grid grid-cols-1 grid-rows-5 gap-4 place-items-center"> 
                    <h2 className="text-2xl">Skapa nytt objekt</h2>
                    <button className='bg-neutral-500 hover:bg-neutral-600 py-1 rounded-lg w-40 text-center'>
                        <a className='text-white' href="/create-student">Skapa Elev</a>
                    </button>

                    <button className='bg-neutral-500 hover:bg-neutral-600 py-1 rounded-lg w-40 text-center'>
                        <a className='text-white' href="/create-company">Skapa Företag</a>
                    </button>

                    <button className='bg-neutral-500 hover:bg-neutral-600 py-1 rounded-lg w-40 text-center'>
                        <a className='text-white' href="/create-apl">Skapa APL</a>
                    </button>

                    <button className='bg-neutral-500 hover:bg-neutral-600 py-1 rounded-lg w-40 text-center'>
                        <a className='text-white' href="/create-handledare">Skapa Handledare</a>
                    </button>
                </div>
            </div>
        </>
    );

}

const MailTemplates = () => {
    
    return (
        <>
            <div className="bg-neutral-400 p-4 rounded-md ">
                <h2 className="text-2xl">Mailmallar</h2>
                <div className='grid grid-cols-2 auto-rows-auto gap-4'>
                    <button className='bg-neutral-500 hover:bg-neutral-600 px-2 py-1 rounded-lg '>
                        <a className='text-white' href="/">Närvaro &#8658; elev</a>
                    </button>
                    <button className='bg-neutral-500 hover:bg-neutral-600 px-2 py-1 rounded-lg '>
                        <a className='text-white' href="/">Närvaro &#8658; handledare</a>
                    </button>
                    <button className='bg-neutral-500 hover:bg-neutral-600 px-2 py-1 rounded-lg '>
                        <a className='text-white' href="/">Rapport påminnelse &#8658; elev</a>
                    </button>
                    <button className='bg-neutral-500 hover:bg-neutral-600 px-2 py-1 rounded-lg '>
                        <a className='text-white' href="/">Rapport påminnelse &#8658; handledare</a>
                    </button>
                </div>
            </div>
        </>
    );
}



export const TeacherPage = () => {

    return (
        <>
            <div className='bg-neutral-700 bg-opacity-50 xl:container xl:mx-auto mx-4 mt-4 px-10 pt-0 pb-4 rounded-xl '>
                <div className="text-center p-6">
                    <h1 className="text-3xl">Välkommen lärare</h1>-
                </div>

                <div className='bg-neutral-700 px-10 py-6 rounded-lg grid gap-8 text-black'>
                    <div className="grid gap-6 sm:grid-cols-2 sm:grid-rows-1 grid-cols-1 grid-rows-2">
                        <ActiveAPL />
                        <TodayMood />
                    </div>

                    <div className="grid gap-10 sm:grid-cols-3 sm:grid-rows-1 grid-cols-2 grid-rows-2 xl:px-10 lg:px-8 md:px-6 sm:px-4 px-0">
                        <ActiveCompanies />
                        <TodayReport />
                        <ActiveStudents />
                    </div>

                    <div className="grid gap-6 grid-cols-2 grid-rows-1">
                        <CreateNewObject />
                        <MailTemplates />
                    </div>
                </div>
                
            </div>
        </>
    );
}
                