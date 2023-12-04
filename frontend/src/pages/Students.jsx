const Student = () => {
    return (
        <div className="bg-neutral-400 rounded-lg flex place-items-center gap-4 py-1 px-1">
            <table>
                <tr>
                    <th className="text-center">Status</th>
                    <th className="text-center">Rapport</th>
                    <th className="text-center">Namn</th>
                    <th className="text-center">Skola</th>
                    <th className="text-center"></th>
                </tr>
                <tr className="">
                    <td className="text-center">
                        <img className="rounded-full w-10 h-10 bg-red-500 text-[10px] text-center" src="" alt="status" />
                    </td>
                    <td className="text-center">
                        <img className="rounded-full w-10 h-10 bg-red-500 text-[10px] text-center" src="" alt="rapport" />
                    </td>
                    <td>
                        <h1>Student name 1</h1>
                    </td>
                    <td>
                        <h1>School name</h1>
                    </td>  
                    <td>
                        <button className="bg-neutral-500 text-white py-1 px-2 rounded-md" href="/">Visa profil</button>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export const AllStudentaPage = () => {
    return (
        <>
            <div className='bg-neutral-700 bg-opacity-50 container mx-auto mt-4 px-10 pt-0 pb-4 rounded-xl'>
                <div className="text-center p-6 ">
                    <h1 className="text-3xl">Alla elever</h1>
                </div>

                <div className='bg-neutral-700 px-10 py-6 rounded-lg flex flex-col lg:flex-wrap xl:flex-nowrap flex-wrap gap-4 text-black justify-around'>
                    <Student />
                </div>    
            </div>
        </>
    )
}
