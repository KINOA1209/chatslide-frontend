import { useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import AuthService from '@/components/utils/AuthService';
import { LoadingIcon } from '@/components/progress';

interface ImgModuleProp {
    src: string[]
}

export const ImgModule = ({ src }: ImgModuleProp) => {
    const [showModal, setShowModal] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [showImgSearch, setShowImgSearch] = useState(false);
    const [searchResult, setSearchResult] = useState<string[]>([]);
    const [resources, setResources] = useState<string[]>([]);
    const [searching, setSearching] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
        setSearching(false);
    }

    const handleImageSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("searching")
        setSearching(true);
        const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
        const response = await fetch('/api/search_images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify({
                search_keyword: (e.target as HTMLFormElement).search_keyword.value
            })
        }).then(response => {
            return response.json();
        }).then(parsedResponse => {
            console.log(parsedResponse);
            setSearchResult(parsedResponse.data.images);
        }).catch(e => {
            console.error(e);
        });
        setSearching(false);
    }

    function handleClickSearchInput(e: React.MouseEvent<HTMLDivElement>, textRef: React.RefObject<HTMLInputElement>) {
        if (textRef.current) {
            textRef.current.focus();
        }
    };

    return <>
        <Transition
            className='h-[100vh] w-[100vw] z-10 bg-slate-200/80 fixed top-0 left-0 flex flex-col md:items-center md:justify-center'
            show={showModal}
            onClick={closeModal}
            enter="transition ease duration-300 transform"
            enterFrom="opacity-0 translate-y-12"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease duration-300 transform"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-12"
        >
            <div className='grow md:grow-0'></div>
            <Transition
                className='bg-gray-100 w-full h-3/4 md:h-1/2
                    md:max-w-2xl z-20 rounded-t-xl md:rounded-xl drop-shadow-2xl 
                    overflow-hidden flex flex-col p-4'
                show={showModal}
                enter="transition ease duration-500 transform delay-300"
                enterFrom="opacity-0 translate-y-12"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease duration-300 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-12"
                onClick={e => { e.stopPropagation() }}
            >
                <h4 className="h4 text-blue-600 text-center">Select Image</h4>
                <div className='grow mt-4 flex flex-col overflow-hidden'>
                    <div className='w-full flex flex-row justify-between'>
                        <button className='btn rounded-lg cursor-pointer shadow-none bg-[#ECF1FE] hover:bg-[#B4C5FA] disabled:shadow-inner disabled:bg-[#B4C5FA]'
                            onClick={e => { setShowImgSearch(false) }}
                            disabled={!showImgSearch}>My Resources</button>
                        <button
                            className='btn rounded-lg cursor-pointer shadow-none bg-[#ECF1FE] hover:bg-[#B4C5FA] disabled:shadow-inner disabled:bg-[#B4C5FA]'
                            onClick={e => { setShowImgSearch(true) }}
                            disabled={showImgSearch}>Web Search</button>
                    </div>
                    <div className='mt-3 grow overflow-hidden'>
                        {!showImgSearch &&
                            <div className='w-full h-full'>
                                <div className='w-full h-full flex flex-col'>
                                    <div className='w-full h-full overflow-y-auto'>
                                        <div className='w-full h-fit grid grid-cols-3 md:grid-cols-5 gap-2'>
                                            {resources.map((url, index) => {
                                                return <div key={index} className='w-full h-fit hover:border-3 border-white rounded-md overflow-hidden aspect-square'><img className='w-full h-full object-cover' src={url} /></div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {showImgSearch &&
                            <div className='w-full h-full flex flex-col'>
                                <div>
                                    <form onSubmit={handleImageSearchSubmit}>
                                        <div className="form-input flex flex-row flex-nowrap mb-2 focus-within:border focus-within:border-gray-500 p-0 cursor-text"
                                            onClick={e => handleClickSearchInput(e, searchRef)}>
                                            <input
                                                id="search_keyword"
                                                type="text"
                                                className=" text-gray-800 grow border-0 p-0 h-6 focus:outline-none focus:ring-0 mx-4 my-3"
                                                placeholder="Search image from web"
                                                required
                                                ref={searchRef}
                                                onChange={e => { setKeyword(e.target.value); }}
                                                value={keyword}
                                            />
                                            <div className='h-[22px] mr-2' hidden={!searching}><LoadingIcon /></div>
                                            {!searching && <button
                                                type="submit"
                                                className="my-1 mr-1 opacity-40 hover:opacity-100"
                                            >
                                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                                                        stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>}
                                        </div>
                                    </form>
                                </div>
                                <div className='w-full h-full overflow-y-auto'>
                                    <div className='w-full h-fit grid grid-cols-3 md:grid-cols-5 gap-2'>
                                        {searchResult.map((url, index) => {
                                            return <div key={index} className='w-full h-fit hover:border-3 border-white rounded-md overflow-hidden aspect-square'><img className='w-full h-full object-cover' src={url} /></div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                </div>
                <div className="max-w-sm mx-auto">
                    <div className="flex flex-wrap -mx-3 mt-6">
                        <div className="w-full px-3">
                            <button
                                className="btn text-white font-bold bg-gradient-to-r from-blue-600  to-teal-500 w-full"
                                type="button"
                                onClick={e => { e.preventDefault(); closeModal(); }}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </Transition>
        <div onClick={openModal}
            className="w-full h-full bg-[#E7E9EB] transition ease-in-out duration-150 hover:bg-[#CAD0D3] flex flex-col items-center justify-center cursor-pointer">
            <div>
                {src.length > 0 ? <svg className="w-20 h-20 opacity-50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" fill="none" width="24" height="24" />
                    <g>
                        <path
                            d="M23 4v2h-3v3h-2V6h-3V4h3V1h2v3h3zm-8.5 7c.828 0 1.5-.672 1.5-1.5S15.328 8 14.5 8 13 8.672 13 9.5s.672 1.5 1.5 1.5zm3.5 3.234l-.513-.57c-.794-.885-2.18-.885-2.976 0l-.655.73L9 9l-3 3.333V6h7V4H6c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2v-7h-2v3.234z" />
                    </g>
                </svg>
                    :
                    <img className="w-full h-full transition ease-in-out duration-150 hover:brightness-90" src={src[0]}></img>}
            </div>
            <div className="text-black opacity-50">
                Click to add image
            </div>
        </div>
    </>
}