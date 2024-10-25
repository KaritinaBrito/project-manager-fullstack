"use client"
import { useAuth } from '@clerk/nextjs';
import { Description, DevicesRounded, ListAltRounded, SortRounded } from '@mui/icons-material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Image from 'next/image';
import Link from 'next/link';

export default function page(){
    return (
        <div className='poppins'>
            <Navbar />
            <CTASection />
            <Features />
        </div>
    );

    function Navbar(){
        return(
            <nav className="flex m-7 p-2 max-sm:mt-9 mx-8 items-center justify-between max-sm:flex-col">
                <Logo />
                <Buttons />
            </nav>
        );

        function Logo(){
            return(
                <div className="flex items-center gap-2">
                    {/* Icon Container */}

                    {/* Icon */}

                    <TaskAltIcon sx={{fontSize: 34}} className='text-orange-600'/>

                    {/* App Name */}
                    <div className='flex gap-1 text-[22px]'>
                        <span className={`font-bold text-orange-600`}>Project</span>
                        <span className='text-slate-600'>Master</span>
                    </div>
                </div>
            );
        }

        function Buttons (){
            const { userId } = useAuth();

            return (
                <div className='flex gap-2 max-sm:flex-col max-sm:w-full max-sm:mt-8'>
                    {!userId ? (
                        <>
                            <Link href="/sign-in">
                                <button
                                    className={`max-sm:w-full text-sm border border-orange-600 px-9 py-3 hover:bg-orange-600 rounded-md font-medium hover:text-white`}
                                >
                                    Sign In
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/sign-up">
                            <button
                                    className={`max-sm:w-full text-sm border border-orange-600 px-9 py-3 hover:bg-orange-600 rounded-md font-medium hover:text-white`}
                                >
                                    Dashboard
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            )
        }
    }

    function CTASection(){
        return(
            <div className='flex flex-col mx-16 items-center mt-[120px] gap-6'>
                <h2 className='font-bold text-2xl text-center'>
                    Manage Your Projects and Tasks
                    <span className={`text-orange-600`}>Effortlessly!</span>
                </h2>

                <p className='text-center text-[15px] w-[510px] max-sm:w-full text-slate-500'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente, nam sit. Ipsa eaque ullam laudantium adipisci accusamus dolores, cum nam vero quis iste impedit omnis minima incidunt, quidem, molestias doloribus?
                </p>

                <button
                    className={`block bg-orange-600 rounded-md px-9 py-3 text-sm font-medium text-white hover:bg-orange-600`}
                    type='button'
                >
                    {`Let's get started!`}
                </button>

                <Image
                    src={""}
                    alt='dashboard'
                    width={900}
                    height={400}
                    className='shadow-xl mt-9 aspect-auto sm:w-auto w-[398px] rounded-lg max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl'
                />
            </div>
        );
    }

    function Features(){
        const features = [
            {
                id: 4,
                name: "Seamless Project and Task Management",
                icon: <ListAltRounded className='text-orange-600 text-[32px]'/>,
                description: `Create, edit, and delete projects and taks with ease. Use sorting, filtering, and tabs to keep you`,
            },
            {
                id: 5,
                name: "Dynamic Interface with Responsive Design",
                icon: <DevicesRounded className='text-orange-600 text-[32px]'/>,
                description: `Navigate through a responsive dashboard and task pages that adapt to any screen size. Open and close...`,
            },
            {
                id: 6,
                name: "Advanced Task Sorting and Progress Tracking",
                icon: <SortRounded className='text-orange-600 text-[32px]'/>,
                description: `Tracking ongoing and completed tasks, switch between tabs, and sort tasks or projects based status,`,
            },
        ];
        return (
            <section className='py-12 bg-slate-50 mt-12 px-9'>
                <div className='mx-auto px-4'>
                    <h2 className='text-2xl font-bold text-center'>Key Features</h2>

                    <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 px-10'>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className='p-6 bg-white rounded-lg shadow-sm flex flex-col items-center'
                            >
                                <div className='w-20 h-20 rounded-full items-center justify-center flex bg-orange-100'>
                                    {feature.icon}
                                </div>
                                <h3 className='text-lg font-semibold text-orange-600 mt-6 text-center'>
                                    {feature.name}
                                </h3>
                                <p className='text-slate-600 text-[13px] mt-2 text-center w-[80%]'>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}