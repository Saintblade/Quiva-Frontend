import {Header} from '@/components/global/comic-detail/Header'

export default function MainPage({children}) {
    return (
        <div className="min-h-screen bg-black w-full font-recursive">
            {/* Mobile Layout */}
            <div className=" w-full">
                <Header/>

                <main className="p-4 overflow-y-auto bg-[#110C03] w-full">

                    {children}

                </main>
            </div>

        </div>
    )
}