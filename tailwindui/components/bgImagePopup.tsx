import React, { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { useRouter } from 'next/navigation';


interface bgImagePopupProps {
    onClose: () => void;
  }

const BgImagePopup: React.FC<bgImagePopupProps> = ({ onClose }) =>{
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('No file chosen');
    const [selectedOption, setSelectedOption] = useState<string>('None');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const convertImageToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result);
            } else {
              reject(new Error('Failed to convert image to Base64.'));
            }
          };
          reader.readAsDataURL(file);
        });
    };
    const convertImagePathToBase64 = (imagePath: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            fetch(imagePath)
            .then((response) => response.blob())
            .then((blob) => {
              const file = new File([blob], 'imageFile'); 
              const reader = new FileReader();
              reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                  resolve(reader.result);
                } else {
                  reject(new Error('Failed to convert image path to Base64.'));
                }
              };
              reader.readAsDataURL(file);
            })
        });
    };

    const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value);
    };
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
          setFileName(e.target.files[0].name);
        }    
    };


    const [outlineData, setOutlineData] = useState<any[]>([]);
    useEffect(() => {
        const outlineCopy = sessionStorage.getItem('outline');
        console.log("here");
        if (outlineCopy) {
            const parsedOutline = JSON.parse(outlineCopy);
            const updatedOutline = JSON.parse(parsedOutline.res);
            setOutlineData(updatedOutline);
        }
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true);
        console.log("submitting");
        event.preventDefault();

        let formData;
        // remove empty entries
        console.log(outlineData);
        const audience = typeof window !== 'undefined' ? sessionStorage.getItem('audience') : null;
        const foldername = typeof window !== 'undefined' ? sessionStorage.getItem('foldername') : null;
        const topic = typeof window !== 'undefined' ? sessionStorage.getItem('topic') : null;
        const language = typeof window !== 'undefined' ? sessionStorage.getItem('language') : 'English';
        const project_id = typeof window !== 'undefined' ? sessionStorage.getItem('project_id') : null;
        const addEquations = typeof window !== 'undefined' ? sessionStorage.getItem('addEquations') : null;

       
        console.log(selectedOption)
        
        if(selectedOption === 'customize'){
            if(file){
                const imageBase64 = await convertImageToBase64(file);
                formData = {
                    res: JSON.stringify({ ...outlineData }),
                    audience: audience,
                    foldername: foldername,
                    topic: topic,
                    language: language,
                    additional_requirements: 'test',
                    project_id: project_id,
                    addBackgroundImage: true,
                    file:imageBase64,
                    addEquations: addEquations
                };
            }
        }else if(selectedOption === 'default1'){
            const imagePath = "../../../../slidesBackground/theme1.jpg";
            const imageBase64 = await convertImagePathToBase64(imagePath);
            formData = {
                res: JSON.stringify({ ...outlineData }),
                audience: audience,
                foldername: foldername,
                topic: topic,
                language: language,
                additional_requirements: 'test',
                project_id: project_id,
                addBackgroundImage: true,
                file:imageBase64,
                addEquations: addEquations
            };
        }else if(selectedOption === 'default2'){
            const imagePath = "../../../../slidesBackground/theme2.jpg";
            const imageBase64 = await convertImagePathToBase64(imagePath);
            formData = {
                res: JSON.stringify({ ...outlineData }),
                audience: audience,
                foldername: foldername,
                topic: topic,
                language: language,
                additional_requirements: 'test',
                project_id: project_id,
                addBackgroundImage: true,
                file:imageBase64,
                addEquations: addEquations
            };
            }
        
        console.log(formData);
        try {
            const response = await fetch('/api/generate_slides', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                const resp = await response.json();
                console.log(resp);
                setIsSubmitting(false);
                // Store the data in local storage
                console.log(resp.data);
                sessionStorage.setItem('image_files', JSON.stringify(resp.data.image_files));
                sessionStorage.setItem('pdf_file', resp.data.pdf_file);
                sessionStorage.setItem('page_count', resp.data.page_count);

                router.push('workflow-review-slides');
            } else {
                alert("Request failed: " + response.status);
                console.log(response)
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsSubmitting(false);
        }finally {
            onClose(); 
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                    >
                    &#8203;
                </span>
                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div>
                    <h3
                    className="mt-5 flex flex-col items-center text-xl leading-6 font-bold text-gray-900"
                    id="modal-headline"
                    >
                    Customize Your Slides
                    </h3>
                </div>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="text-gray-800 text-sm font-medium mb-1" style={{display: 'flex', alignItems: 'center'}}>
                        <div className="px-10 mt-1">
                            <label><input type="radio" value="default1" checked={selectedOption === 'default1'} onChange={handleOptionChange} />
                                <span className='mx-2'>Theme 1</span>
                            </label>
                            {selectedOption === "default1" && (
                                <img src="../../../../slidesBackground/theme1.jpg" style={{width: "200px", height: "150px"}}/>
                            )}
                            <br/>
                            <label><input type="radio" value="default2" checked={selectedOption === 'default2'} onChange={handleOptionChange} />
                                <span className='mx-2'>Theme 2</span>
                            </label>
                            {selectedOption === "default2" && (
                                <img src="../../../../slidesBackground/theme2.jpg" style={{width: "200px", height: "150px"}}/>
                            )}
                            <br/>
                            <label><input type="radio" value="customize" checked={selectedOption === 'customize'} onChange={handleOptionChange} />
                                <span className='mx-2'>Choose your own</span>
                            </label>
                            {selectedOption === 'customize' && (
                                <div>
                                    <label htmlFor="imageUpload" className="btn text-white bg-blue-600 hover:bg-blue-700 mx-6">
                                        Choose File
                                    </label>
                                    <span>{fileName}</span>
                                    <input type="file" id="imageUpload" accept="image/*"  onChange={handleFileChange}  style={{display: 'none'}}/>
                                </div>
                            )}
                            <div className="px-10 mt-10 flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 absolute bottom-5 right-10 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
                                >
                                    {isSubmitting ? 'Customizing...' : 'Customize'}
                                </button>
                            </div>
                        </div>
                    </form>
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-12 text-gray-400 hover:text-gray-800 focus:outline-none"
                    >
                        <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button> 
                </div>
            </div>
        </div>
    );
};
export default BgImagePopup;