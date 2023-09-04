import { useEffect, useState } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { Transition } from "@headlessui/react";

export default function IframeGallery() {
    const iframeList = [
        <iframe className="w-full" src="https://www.linkedin.com/embed/feed/update/urn:li:share:7099576842361212929" height="600" title="Embedded post"></iframe>,
        <iframe className="w-full" src="https://cards.producthunt.com/cards/comments/2713233?v=1" height="400"></iframe>,
        <iframe className="w-full" src="https://cards.producthunt.com/cards/comments/2713836?v=1" height="400"></iframe>,
        <div className="relative w-full scale-[1.05]"><TwitterTweetEmbed tweetId={'1698513465143353696'} /></div>,
        <iframe className="w-full" src="https://cards.producthunt.com/cards/comments/2714561?v=1" height="400"></iframe>,
        <iframe className="w-full" src="https://cards.producthunt.com/cards/comments/2714642?v=1" height="400"></iframe>,
    ]

    const [list1, setList1] = useState<JSX.Element[]>([]);
    const [list2, setList2] = useState<JSX.Element[]>([]);
    const [list3, setList3] = useState<JSX.Element[]>([]);
    const [mobileOnDisplay, setMobileOnDisplay] = useState<number>(0);
    const [display, setDisplay] = useState(false);

    var interval: any;

    const turnPageNext = () => {
        setDisplay(false);
        setTimeout(() => {
            setMobileOnDisplay(old => {
                if (old + 1 < iframeList.length) {
                    return old + 1;
                } else {
                    return 0;
                }
            })
        }, 300);

        setTimeout(() => {
            setDisplay(true);
        }, 900);
    };

    const turnPagePrevious = () => {
        setDisplay(false);
        setTimeout(() => {
            setMobileOnDisplay(old => {
                if (old - 1 >= 0) {
                    return old - 1;
                } else {
                    return iframeList.length - 1;
                }
            })
        }, 300);

        setTimeout(() => {
            setDisplay(true);
        }, 900);
    };

    useEffect(() => {
        const whenResize = () => {
            if (interval) {
                clearInterval(interval);
            }
            setDisplay(false);

            const width = window.innerWidth;
            var cols = 1;
            const l1: JSX.Element[] = [];
            const l2: JSX.Element[] = [];
            const l3: JSX.Element[] = [];
            const ll = [l1, l2, l3];
            if (width >= 1536) {
                cols = 3;
            } else if (width >= 1280) {
                cols = 3;
            } else if (width >= 1024) {
                cols = 3;
            } else if (width >= 640) {
                cols = 2;
            } else {
                setDisplay(true);
            };

            if (cols >= 2) {
                var currentCol = 0;
                for (let i = 0; i < iframeList.length; i++) {
                    ll[currentCol].push(iframeList[i]);
                    currentCol++;
                    if (currentCol >= cols) {
                        currentCol = 0;
                    }

                }
                setList1(l1);
                setList2(l2);
                setList3(l3);
            } else {
                interval = setInterval(() => {
                    turnPageNext();
                }, 6000);
            }
        }

        window.addEventListener('resize', whenResize);
        whenResize();
    }, []);

    return (
        <div className="py-12 md:py-20 w-full" data-aos="fade-right">
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                    <h3 className="h3 mb-3 w-fit text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500" style={{ fontFamily: 'Lexend, sans-serif' }}>Testimonial</h3>
                </div>
            </div>

            <div className="px-4 sm:px-6 w-full max-w-[1152px] mx-auto hidden sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">

                <div className="w-full h-fit flex flex-col">
                    {list1.map((iframeEl, index) => {
                        return <div key={'1-' + index} className="w-full mb-4" data-aos="fade-up" data-aos-delay="300">
                            <div className="flex flex-row w-full h-full drop-shadow-md overflow-hidden rounded-2xl border border-gray-300">
                                {iframeEl}
                            </div>
                        </div>
                    })}
                </div>
                <div className="h-fit flex flex-col">
                    {list2.map((iframeEl, index) => {
                        return <div key={'2-' + index} className="w-full mb-4" data-aos="fade-up" data-aos-delay="300">
                            <div className="flex flex-row w-full h-full drop-shadow-md overflow-hidden rounded-2xl border border-gray-300">
                                {iframeEl}
                            </div>
                        </div>
                    })}
                </div>
                <div className="h-fit flex flex-col">
                    {list3.map((iframeEl, index) => {
                        return <div key={'3-' + index} className="w-full mb-4" data-aos="fade-up" data-aos-delay="300">
                            <div className="flex flex-row w-full h-full drop-shadow-md overflow-hidden rounded-2xl border border-gray-300">
                                {iframeEl}
                            </div>
                        </div>
                    })}
                </div>


            </div>
            <div className="px-4 w-full mx-auto grid grid-cols-1 sm:hidden">
                <div className="h-[600px] flex flex-col items-center justify-center">
                    <div key={'mobile-frame'} className="w-full mb-4" data-aos="fade-up" data-aos-delay="300">
                        <Transition
                            className="w-full h-full"
                            show={display}
                            enter="transition-opacity duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            unmount={false}
                        >
                            <div className="flex flex-row w-full h-full drop-shadow-md overflow-hidden rounded-2xl border border-gray-300">
                                {iframeList[mobileOnDisplay]}
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </div >
    )
};