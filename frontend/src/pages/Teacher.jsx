import React, { useState } from 'react';

const TeacherPage1 = () => {

    const ActiveAPL = () => {
        return (
            <>
                <div className="lg:basis-[49%] basis-full bg-neutral-400 p-4 rounded-md grid place-items-center"> 
                    <h2 className="text-2xl">Aktiva APL:er</h2>
                    <h2 className='text-4xl pt-2 pb-4'>30</h2>
                    <button className='bg-neutral-500 hover:bg-neutral-600 px-10 py-1 rounded-lg '>
                        <a className='text-white' href="/all-apl">Visa alla</a>
                    </button>
                </div>
            </>
        );
    }

    const TodayMood1 = () => {

        return (
            <>
                <div className="lg:basis-[49%] basis-full bg-neutral-400 p-4 rounded-md grid place-items-center"> 
                    <h2 className="text-2xl text-center">Dagens humör</h2>
                    
                </div>
            </>
        );
    
    }

    const Statistics1 = ({ title, count, link }) => {

        return (
            <>
                <div className="bg-neutral-400 flex-1 p-4 rounded-md grid place-items-center">  
                    <h2 className="text-1xl">{title}</h2>
                    <h2 className='text-3xl pt-2 pb-4'>{count}</h2>
                    <button className='bg-neutral-500 hover:bg-neutral-600 px-10 py-1 rounded-lg '>
                        <a className='text-white text-sm' href={link}>Visa alla</a>
                    </button>
                </div>
            </>
        );
    
    }

    const CreateNewObject = () => {

        return (
            <>
                    <div className="sm:basis-[49%] basis-full bg-neutral-400 p-4 rounded-md grid grid-cols-1 gap-2 place-items-center"> 
                        <h2 className="text-[22px]">Skapa nytt objekt</h2>
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
            </>
        );
    }

    const MailTemplates = () => {
    
        return (
            <>
                <div className="sm:basis-[49%] basis-full bg-neutral-400 p-4 rounded-md">
                    <h2 className="text-[22px] text-center pb-2">Mailmallar</h2>
                    <div className='grid grid-cols-1 auto-rows-auto gap-2'>
                        <button className='bg-neutral-500 hover:bg-neutral-600 px-2 py-1 rounded-lg'>
                            <a className='text-white' href="/">Närvaro &#8658; elev</a>
                        </button>
                        <button className='bg-neutral-500 hover:bg-neutral-600 px-2 py-1 rounded-lg'>
                            <a className='text-white' href="/">Närvaro &#8658; handledare</a>
                        </button>
                        <button className='bg-neutral-500 hover:bg-neutral-600 px-2 py-1 rounded-lg'>
                            <a className='text-white' href="/">Rapport påminnelse &#8658; elev</a>
                        </button>
                        <button className='bg-neutral-500 hover:bg-neutral-600 px-2 py-1 rounded-lg'>
                            <a className='text-white' href="/">Rapport påminnelse &#8658; handledare</a>
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className='bg-neutral-700 bg-opacity-50 container mx-auto mt-4 px-10 pt-0 pb-4 rounded-xl '>
                
                <div className="text-center p-6">
                    <h1 className="text-3xl">Välkommen lärare</h1>
                </div>

                <div className='bg-neutral-700 px-10 py-6 rounded-lg flex lg:flex-wrap xl:flex-nowrap flex-wrap gap-4 text-black justify-around'>
                    <div className='xl:basis-[60%] basis-full grid gap-4'>
                        <div className="flex flex-row flex-wrap justify-between xl:gap-2 gap-4">
                            <ActiveAPL />
                            <TodayMood1 />
                        </div>

                        <div className="flex flex-wrap justify-between gap-4">
                            <Statistics1 title='Aktiva Elever' count='30' link='/all-students' />
                            <Statistics1 title='Inlämnade Rapporter' count='30' link='/all-handledare' />
                            <Statistics1 title='Aktiva Företag' count='30' link='/all-companies' />
                        </div>

                        <div className="flex flex-wrap justify-between sm:gap-0 gap-4">
                            <CreateNewObject />
                            <MailTemplates />
                        </div>
                    </div>
                    
                    <div className="xl:basis-[39%] basis-full bg-neutral-400 p-4 rounded-md grid place-items-center">
                        <h2 className="text-2xl">Företags kontakt</h2>

                        <table>
                            <thead>
                                <tr>
                                    <th>Företag</th>
                                    <th>Senast kontakt</th>
                                    <th>Mail</th>
                                    <th>Mobil</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='bg-neutral-300 bg-opacity-60 text-center '>
                                    <td className='px-3 py-1'>elgiganten</td>
                                    <td className='px-3 py-1'>2 timmar</td>
                                    <td className='px-3 py-1'>info@elgiganten.se</td>
                                    <td className='px-3 py-1'>2345678901</td>
                                </tr>
                                <tr className='bg-neutral-300 bg-opacity-40 text-center '>
                                    <td className='px-3 py-1'>Zync</td>
                                    <td className='px-3 py-1'>2 dagar</td>
                                    <td className='px-3 py-1'>info@zync.se</td>
                                    <td className='px-3 py-1'>1234567890</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    );
}

const SideBar = () => {
    return (
        <>
            <div className='md:basis-[30%] rounded-s-md bg-neutral-400 min-h-[50vh]'>
                <div className='flex flex-wrap flex-col border-r-2 border-solid border-neutral-700 h-full'>   
                    <h1 className='h-fit text-2xl text-center py-4 border-b-2 border-solid border-neutral-700'>
                        Översikt
                    </h1>
                    <div className='h-fit mx-auto'>
                        <h1 className='text-2xl pt-3'>Statistik</h1>
                        <h2 className='text-xl pl-3'>Dagens humör</h2>
                        <h2 className='text-xl pl-3'>Rapporter</h2>
                        <h2 className='text-xl pl-3'>Senast Kontakt</h2>

                        <h1 className='text-2xl pt-3'>Aktivt</h1>
                        <h2 className='text-xl pl-3'>Elever</h2>
                        <h2 className='text-xl pl-3'>APL:er</h2>
                        <h2 className='text-xl pl-3'>Företag</h2>
                        <h2 className='text-xl pl-3'>Handledare</h2>

                        <h1 className='text-2xl pt-3'>Kontakt Lista</h1>
                        <h2 className='text-xl pl-3'>Företag</h2>
                        <h2 className='text-xl pl-3'>Elev</h2>
                        <h2 className='text-xl pl-3'>Handledare</h2>

                        <h1 className='text-2xl pt-3'>Skapa nytt</h1>

                    </div>
                </div>
            </div>
        </>
    );
}

const Main = () => {

    const Statistics =  () => {

        const TodayMood = () => {
            return (
                <>
                    <div className="basis-full visited:bg-neutral-400 rounded-md grid place-items-center"> 
                        <h2 className="text-2xl p-4 text-center">Dagens humör</h2>
                        
                    </div>
                </>
            );
        }
    
        const SentInRepports = () => {
            return ( 
                <>
                    <div className="basis-full bg-neutral-400 p-4 rounded-md grid">  
                        <h2 className="text-2xl p-4 text-center">Rapporter Idag</h2> 
                        <table>{/* Auto genererad ???? */}
                            <thead> 
                                <tr>
                                    <th>Rapport</th>
                                    <th>Elever</th>
                                    { <th>Apl plats</th> /* Fasta termer */}
                                    <th>Handledare</th>
                                    <th>Kontakta</th>
                                </tr>
                            </thead>
                        <tbody>
                                <tr>
                                    <td className='px-2'> <img className="rounded-full w-10 h-10 bg-red-400 text-[10px] text-center" src="" alt="Saknas" /> </td>
                                    <td className='px-2'> <h1>Student name 1</h1> </td>
                                    <td className='px-2'> <h1>Arbestplats</h1> </td>
                                    <td className='px-2'> <h1>Handledare</h1> </td>
                                    <td className='px-2'>
                                        <button className="mx-1 bg-neutral-500 text-white py-1 px-2 rounded-md" href="/">Kontakta</button>
                                        <button className="mx-1 bg-neutral-500 text-white py-1 px-2 rounded-md" href="/">Visa Elev</button>
                                    </td>
                                </tr>
    
                                <tr>
                                    <td className='px-2'> <img className="rounded-full w-10 h-10 bg-green-400 text-[10px] text-center" src="" alt="Inlämnad" /> </td>
                                    <td className='px-2'> <h1>Student name 1</h1> </td>
                                    <td className='px-2'> <h1>Arbestplats</h1> </td>
                                    <td className='px-2'> <h1>Handledare</h1> </td>
                                    <td className='px-2'>
                                        <button className="mx-1 bg-neutral-500 text-white py-1 px-2 rounded-md" href="/">Kontakta</button>
                                        <button className="mx-1 bg-neutral-500 text-white py-1 px-2 rounded-md" href="/">Visa Elev</button>
                                    </td>
                                </tr>
                        </tbody>
                        </table>
                        <button className="bg-neutral-500 text-white py-1 px-2 rounded-md" href="/">Visa alla</button>
                    </div>
                </>
            );
        }
    
        const LatestContact = () => {
            return (
                <>
                    <div className="basis-full bg-neutral-400 p-4 rounded-md grid place-items-center">  
                        <h2 className="text-2xl p-4 text-center">Senast kontakt</h2>
                        <h2 className='text-2xl pb-1'>Företag</h2>
                        <table>{/* Auto genererad ???? */}
                            <thead> 
                                <tr>
                                    <th>Företag</th>
                                    <th>Senast kontakt</th>
                                    <th>Mail</th>
                                    <th>Mobil</th>
                                </tr>
                            </thead>
                        <tbody>
                                <tr>
                                    <td className='px-2'> <h1>elgiganten</h1> </td>
                                    <td className='px-2'> <h1>2 timmar</h1> </td>
                                    <td className='px-2'> <h1>  </h1></td>
                                    <td className='px-2'> <h1>  </h1></td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="bg-neutral-500 text-white py-1 px-2 rounded-md" href="/">Visa alla</button>
    
                        <h2 className='text-2xl pb-1'>Elever</h2>
                        <table>{/* Auto genererad ???? */}
                            <thead> 
                                <tr>
                                    <th>Elever</th>
                                    <th>Senast kontakt</th>
                                    <th>Apl plats</th>
                                    <th>Mail</th>
                                    <th>Mobil</th>
                                </tr>
                            </thead>
                        <tbody>
                                <tr>
                                    <td className='px-2'> <h1>Skola</h1> </td>
                                    <td className='px-2'> <h1>2 timmar</h1> </td>
                                    <td className='px-2'> <h1>apl plats</h1></td>
                                    <td className='px-2'> <h1>  </h1></td>
                                    <td className='px-2'> <h1>  </h1></td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="bg-neutral-500 text-white py-1 px-2 rounded-md" href="/">Visa alla</button>
                    </div>
                </>
            );             
        }
    
        return (
            <>
                <div className="basis-full bg-neutral-400 p-4 rounded-md grid place-items-center">  
                    <TodayMood />
                    <SentInRepports />
                    <LatestContact />
                </div>
            </>
        );
    }
    
    const Active = () => { 
    
        const AllAktive = ({ title, count, module }) => {
            return (
                <>
                    <div className="flex-1 p-4 grid place-items-center">  
                        <h2 className="text-1xl">{title}</h2>
                        <h2 className='text-3xl pt-2 pb-4'>{count}</h2>
                        <button className='bg-neutral-500 hover:bg-neutral-600 px-4 py-1 rounded-lg '>
                            <a className='text-white text-xs' href={module}>Visa alla Aktiva</a>
                        </button>
                    </div>
                </>
            );
        }
        
        const ActiveStudents = () => {
            return (
                <>
                    <div className="basis-full bg-neutral-400 p-4 rounded-md grid place-items-center"> 
                        <h2 className="text-2xl">Aktiva Elever - {/* Antal aktiva elever */}</h2>
                        <table>
                            <thead> {/* Statik */}
                                <tr> 
                                    <th>Elev</th>
                                    <th>Skola</th>
                                    <th>Handledare</th>
                                    <th>APL plats</th>
                                    <th>Visa Profil</th>
                                </tr>
                            </thead>

                            <tbody  className='text-center'> {/* Info */}
                                <tr>
                                    <td>Namn</td>
                                    <td>Skola</td>
                                    <td>Handledare</td>
                                    <td>APL-plats</td>
                                    <td>
                                        <button className="bg-neutral-500 text-white py-1 px-2 rounded-md" href="/">Visa Profil</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Namn</td>
                                    <td>Skola</td>
                                    <td>Handledare</td>
                                    <td>APL-plats</td>
                                    <td>
                                        <button className="bg-neutral-500 text-white py-1 px-2 rounded-md" href="/">Visa Profil</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className='bg-neutral-500 hover:bg-neutral-600 px-10 py-1 rounded-lg '>
                            <a className='text-white' href="/all-students">Visa alla Elever</a>
                        </button>
                    </div>
                </>
            );
        }

        const ActiveAPL = () => {
            return (
                <>
                    <div className="basis-full bg-neutral-400 p-4 rounded-md grid place-items-center"> 
                        <h2 className="text-2xl">Aktiva APL:er - {/* Antal aktiva elever */}</h2>
                        <table>
                            <thead> {/* Statik */}
                                <tr> 
                                    <th>APL Namn</th>
                                    <th>Företag</th>
                                    <th>Elev</th>
                                    <th>Handledare</th>
                                    <th>Visa Profil</th>
                                </tr>
                            </thead>

                            <tbody className='text-center'> {/* Info */}
                                <tr>
                                    <td>APL Namn</td>
                                    <td>Företag</td>
                                    <td>Elev</td>
                                    <td>Handledare</td>
                                    <td>
                                        <button className="bg-neutral-500 text-white py-1 px-2 rounded-md" href="/">Visa Profil</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>APL Namn</td>
                                    <td>Företag</td>
                                    <td>Elev</td>
                                    <td>Handledare</td>
                                    <td>
                                        <button className="bg-neutral-500 text-white py-1 px-2 rounded-md" href="/">Visa Profil</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className='bg-neutral-500 hover:bg-neutral-600 px-10 py-1 rounded-lg '>
                            <a className='text-white' href="/all-students">Visa alla APL:er</a>
                        </button>
                    </div>
                </>
            );
        }

        const ActiveCompanies = () => {
            return (
                <>
                    <div className="basis-full bg-neutral-400 p-4 rounded-md grid place-items-center"> 
                        <h2 className="text-2xl">Aktiva APL:er - {/* Antal aktiva elever */}</h2>
                        <table>
                            <thead> {/* Statik */}
                                <tr> 
                                    <th>Företag</th>
                                    <th>Handledare</th>
                                    <th>Senast kontakt</th>
                                    <th>Antal APL:er</th>
                                    <th>Visa Profil</th>
                                </tr>
                            </thead>

                            <tbody className='text-center'> {/* Info */}
                                <tr>
                                    <td>Företag</td>
                                    <td>Handledare</td>
                                    <td>2 dagar</td>
                                    <td>2</td>
                                    <td>
                                        <button className="bg-neutral-500 text-white py-1 px-2 rounded-md" href="/">Visa Profil</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Företag</td>
                                    <td>Handledare</td>
                                    <td>2 dagar</td>
                                    <td>2</td>
                                    <td>
                                        <button className="bg-neutral-500 text-white py-1 px-2 rounded-md" href="/">Visa Profil</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className='bg-neutral-500 hover:bg-neutral-600 px-10 py-1 rounded-lg '>
                            <a className='text-white' href="/all-students">Visa alla APL:er</a>
                        </button>
                    </div>
                </>
            );
        }

        const ActAllAktive = () => {}
    
        return ( 
            <>  
                <div className='flex flex-wrap px-2 divide-x-2 divide-neutral-700'>
                    <AllAktive title='Aktiva Elever' count='30' module='/all-students' />
                    <AllAktive title='Aktiva APL:er' count='30' module='/all-apl' />
                    <AllAktive title='Aktiva Företag' count='30' module='/all-companies' />
                    <AllAktive title='Aktiva Handledare' count='30' module='/all-handledare' />
                </div>
                <div>
                    <ActiveStudents />
                    <ActiveAPL />
                    <ActiveCompanies />
                    <ActAllAktive />
                </div>
            </>
        );
    }

    return (
        <>
            <div className='basis-[70%] flex flex-col rounded-e-md bg-neutral-400'>
                <div className='flex flex-col justify-between my-10'>
                    <Statistics />
                    <Active />
                </div>    
            </div>
        </>
    );
}

export const TeacherPage = () => {
    
        return (
            <>  
                <div className='container mx-auto rounded-xl px-10 pb-2 bg-neutral-700 bg-opacity-40'>
                     <h1 className="text-center text-3xl p-6">Välkommen {/* här vill jag ha lärarens namn berornde på ven som loggar in*/}</h1> 
                    <div className="flex flex-wrap container justify-center rounded-lg p-6 bg-neutral-700 bg-opacity-70 ">
                        <SideBar />
                        <Main />
                    </div>
                </div>

                <TeacherPage1 />
            </>
        );
}
