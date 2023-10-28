'use client'

import React, { useState, useRef, useEffect, Fragment } from 'react'
import ProjectProgress from '@/components/newWorkflowSteps'
import FeedbackForm from '@/components/slides/feedback'
import 'react-toastify/dist/ReactToastify.css'
import NewOutlineVisualizer from '@/components/outline/NewOutlineVisulizer'
import GenerateSlidesSubmit from '@/components/outline/GenerateSlidesSubmit'
import {
    AddSectionIcon,
    AddTopicIcon,
    DeleteIcon,
    LeftChangeIcon,
    RightChangeIcon,
    LeftTurnArrowIcon,
    RightTurnArrowIcon,
    QuestionExplainIcon,
} from '../icons'
import NewWorkflowGPTToggle from '@/components/button/NewWorkflowGPTToggle'
import { useRouter } from 'next/navigation'

interface OutlineSection {
    title: string
    content: string[]
    detailLevel: string
    section_style: string
}

export default function WorkflowStep2() {
    const [activeSection, setActiveSection] = useState(-1)
    const router = useRouter()
    const storedOutline =
        typeof sessionStorage !== 'undefined'
            ? sessionStorage.getItem('outline')
            : null
    const outline = storedOutline ? JSON.parse(storedOutline) : null
    const outlineRes = outline ? JSON.parse(outline.res) : null
    const contentRef = useRef<HTMLDivElement>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showPopup, setShowPopup] = useState(false) // State for the popup visibility
    const [outlineContent, setOutlineContent] = useState<OutlineSection[] | null>(null)

    useEffect(() => {
        if (outlineRes) {
            const newOutlineContent = Object.keys(outlineRes).map((key) => {
                return {
                    title: outlineRes[key]['title'],
                    content: outlineRes[key]['content'],
                    detailLevel: outlineRes[key]['detailLevel'],
                    section_style: outlineRes[key]['section_style'],
                }
            })
            setOutlineContent(newOutlineContent)
        }
    }, [outlineRes])


    const [isGpt35, setIsGpt35] = useState(true)

    // Function to scroll to a specific section
    const scrollToSection = (sectionId: number) => {
        const sectionElement = document.getElementById(String(sectionId))
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' })
            setActiveSection(sectionId)
        }
    }

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }
    // Function to open the popup
    const openPopup = () => {
        setShowPopup(true)
    }

    // Function to close the popup
    const closePopup = () => {
        setShowPopup(false)
    }
    // useEffect(() => {
    //   if (typeof window !== 'undefined') {
    //     // Calculate the offset due to the fixed navbar's height
    //     // const navbarHeight = 112 // 7rem * 16px/rem

    //     // Scroll to the adjusted position
    //     window.scrollTo(0, 0)
    //   }
    // }, [])
    return (
        <div className=' bg-zinc-100'>
            {/* flex col container for steps, title, generate slides button etc */}
            <div className='fixed mt-[3rem] flex flex-col w-full bg-Grey-50 justify-center z-10 gap-1 border-b-2'>
                {/* steps bar */}
                <div className='self-center'>
                    <ProjectProgress currentInd={1} contentRef={contentRef} />
                </div>

                {/* gpt model switch area */}
                <div className='self-end mx-[5rem] flex flex-row gap-4 cursor-pointer'>
                    <NewWorkflowGPTToggle isGpt35={isGpt35} setIsGpt35={setIsGpt35} />
                    <div className='cursor-pointer' onClick={openPopup}>
                        <QuestionExplainIcon />
                    </div>
                </div>

                {/* Popup for explaining model difference */}
                {showPopup && (
                    <div className='fixed top-[15%] left-[70%] w-[27rem] h-48 bg-gradient-to-l from-gray-950 to-slate-600 rounded-md shadow backdrop-blur-2xl flex flex-col'>
                        {/* Popup content */}
                        {/* You can add content, explanations, and close button here */}
                        <div
                            onClick={closePopup}
                            className='text-gray-50 cursor-pointer self-end px-4 py-2'
                        >
                            Close
                        </div>
                        {/* columns for two models */}
                        <div className='grid grid-cols-2 gap-8'>
                            <div className='flex flex-col justify-center items-center border-r-2 border-black/25'>
                                <div className='w-32 h-10 text-center mb-4'>
                                    <span className='text-zinc-100 text-2xl font-normal font-creato-medium leading-loose tracking-wide'>
                                        GPT
                                    </span>
                                    <span className='text-zinc-100 text-2xl font-bold font-creato-medium leading-loose tracking-wide'>
                                        {' '}
                                        3.5
                                    </span>
                                </div>
                                <div className="w-40 h-12 text-center text-neutral-300 text-xs font-normal font-['Creato Display'] leading-tight tracking-tight mb-[1.5rem]">
                                    Fast generation, great for small projects.
                                </div>
                                <div className="w-40 h-5 text-center text-zinc-100 text-xs font-medium font-['Creato Display'] leading-tight tracking-tight">
                                    Available to All Users
                                </div>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='w-32 h-10 text-center mb-4'>
                                    <span className='text-zinc-100 text-2xl font-normal font-creato-medium leading-loose tracking-wide'>
                                        GPT
                                    </span>
                                    <span className='text-zinc-100 text-2xl font-bold font-creato-medium leading-loose tracking-wide'>
                                        {' '}
                                    </span>
                                    <span className='text-violet-500 text-2xl font-bold font-creato-medium leading-loose tracking-wide'>
                                        4.0
                                    </span>
                                </div>
                                <div className='w-40 h-12 text-center text-neutral-300 text-xs font-normal font-creato-medium leading-tight tracking-tight mb-[1.5rem]'>
                                    Master of deep & complex subjects.
                                </div>
                                <div className='w-40 h-5 text-center text-zinc-100 text-xs font-medium font-creato-medium leading-tight tracking-tight'>
                                    Exclusive to Plus & Pro Users
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* flex row container for backlink, title and generate button */}
                <div className='flex justify-between items-center mx-[5rem]'>
                    <div
                        className='flex flex-row justify-center items-center gap-4 cursor-pointer'
                        onClick={() => router.push('/workflow-generate-outlines')}
                    >
                        <LeftTurnArrowIcon></LeftTurnArrowIcon>
                        <div className='text-center text-gray-700 text-sm font-medium font-creato-medium leading-normal tracking-[0.035rem] whitespace-nowrap'>
                            Back to Summary
                        </div>
                    </div>

                    <div className='w-[50rem] h-9 text-center text-neutral-900 text-xl font-medium font-creato-medium leading-snug tracking-tight whitespace-nowrap'>
                        Please review or edit the outlined sections and topics.
                    </div>

                    {outlineContent && <GenerateSlidesSubmit outline={outlineContent} />}
                </div>
            </div>

            <div className='mt-[12rem] mb-[3rem]'>
                <div className='w-1/4 fixed top-[16.5rem] overflow-y-auto flex justify-center' >
                    <div className='w-2/3 bg-neutral-50 rounded-md border border-gray-200 hidden sm:block'>
                        <div className='h-5 text-neutral-900 text-xs font-bold font-creato-medium leading-tight tracking-wide px-4 py-3'>
                            OVERVIEW
                        </div>
                        <ol className='list-none px-4 py-4'>
                            {outlineContent?.map((section, index) => (
                                <li
                                    className='pb-2 opacity-60 text-neutral-900 text-s font-medium font-creato-medium leading-normal tracking-tight cursor-pointer hover:text-black  hover:rounded-md hover:bg-gray-200'
                                    key={index}
                                    onClick={() => scrollToSection(index)}
                                >
                                    <span className=''>
                                        {index + 1}. {section.title}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                <div className='flex justify-end'>
                    <div className='w-full sm:w-3/4 gap-10 auto-rows-min'>
                        <div className='lg:col-span-2 flex flex-col'>
                            {outlineContent && <NewOutlineVisualizer outline={outlineContent} />}
                        </div>
                    </div>
                </div>
            </div>
            {/* <ProjectProgress currentInd={1} contentRef={contentRef} /> */}
            {/* <div className='pt-32 max-w-3xl mx-auto text-center pb-12 md:pb-20'>
        <h1 className='h1'>Edit Outlines</h1>
      </div> */}
            {/* <div className='max-w-4xl mx-auto px-6 pt-[10rem]' ref={contentRef}> */}
            {/* <p>This is the outline generated. You can edit the details below.</p> */}
            {/* <br /> */}

            {/* </div> */}
            {/* feedback from fixed on the page */}
            <div className='fixed bottom-10 right-10 hidden sm:block'>
                <button
                    onClick={handleOpenModal}
                    className='bg-gradient-to-r from-blue-600  to-purple-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-700'
                >
                    Feedback
                </button>

                {showModal && <FeedbackForm onClose={handleCloseModal} />}
            </div>
        </div>
    )
}
