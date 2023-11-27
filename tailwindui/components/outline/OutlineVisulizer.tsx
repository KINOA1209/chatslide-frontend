import React, { useState, useRef, useEffect, Fragment, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  AddSectionIcon,
  AddTopicIcon,
  DeleteIcon,
  LeftChangeIcon,
  RightChangeIcon,
} from '@/app/(feature)/icons'

const minOutlineDetailCount = 1
const maxOutlineDetailCount = 6
const minOutlineSectionCount = 1
const maxOutlineSectionCount = 10
const maxLength = 60

interface OutlineSection {
  title: string
  content: Array<string>
  detailLevel: string
  section_style: string
}

interface OutlineDataType extends Array<OutlineSection> {}

const OutlineVisualizer = ({
  outlineData,
  setOutlineData,
  isGPT35,
}: {
  outlineData: OutlineDataType
  setOutlineData: (outline: OutlineDataType) => void
  isGPT35: boolean
}) => {
  const [detailOptions, setDetailOptions] = useState([
    { detailLevel: 'Default', description: 'moderate' },
    { detailLevel: 'More Slides', description: 'detailed' },
    { detailLevel: 'Fewer Slides', description: 'concise' },
    // { detailLevel: 'Normal Slides', description: 'Medium' },
  ])
  //   const [selectedDetail, setSelectedDetail] = useState(detailOptions[0])
  const router = useRouter()

  const mapDetailLevels = (section: OutlineSection) => {
    const detailLevel = section.detailLevel
    switch (detailLevel) {
      case 'Default':
        return 0
      case 'More Slides':
        return 1
      case 'Fewer Slides':
        return 2
      default:
        return 0 // You can set a default value if needed
    }
  }
  const [detailLevels, setDetailLevels] = useState(
    outlineData.map((section) => mapDetailLevels(section))
  )
  const [titleCache, setTitleCache] = useState('')
  const [hoveredDetailIndex, setHoveredDetailIndex] = useState(-1)
  const [hoveredSectionIndex, setHoveredSectionIndex] = useState(-1)

  useEffect(() => {
    // Function to reverse map numeric detail levels to string values
    const reverseMapDetailLevels = (detailLevel: number) => {
      switch (detailLevel) {
        case 0:
          return 'Default'
        case 1:
          return 'More Slides'
        case 2:
          return 'Fewer Slides'
        default:
          return 'Default' // You can set a default value if needed
      }
    }

    // Create a new copy of outlineData with updated detailLevels
    const updatedOutlineData = outlineData.map((section, index) => {
      section.detailLevel = reverseMapDetailLevels(detailLevels[index])
      return section
    })

    // Update outlineData
    setOutlineData(updatedOutlineData)
    // update session storage too
    updateOutlineSessionStorage(updatedOutlineData)
    console.log('outlineData', outlineData)
  }, [detailLevels])

  //   const handleDetailLevelOptionChange = (increment: number) => {
  //     const currentIndex = detailOptions.indexOf(selectedDetail)
  //     const totalOptions = detailOptions.length
  //     //If the selectedDetail is found in the array (meaning currentIndex is not -1),
  //     if (currentIndex !== -1) {
  //       const newIndex = (currentIndex + increment + totalOptions) % totalOptions
  //       setSelectedDetail(detailOptions[newIndex])
  //     }
  //   }
  const handleDetailLevelOptionChange = (
    sectionIndex: number,
    increment: number
  ) => {
    setDetailLevels((prevDetailLevels) => {
      const newDetailLevels = [...prevDetailLevels]

      // Calculate the new detail level in a circular manner
      const currentLevel = newDetailLevels[sectionIndex]
      const numberOfOptions = detailOptions.length
      const newIndex = (currentLevel + increment) % numberOfOptions

      // Handle negative results by adding the number of options
      newDetailLevels[sectionIndex] = (
        newIndex >= 0 ? newIndex : newIndex + numberOfOptions
      ) as 0 | 1 | 2

      return newDetailLevels
    })
  }

  //   const handleSlidPagesChange = (n: number) => {
  //     setSlidePages(20 + n * 10)
  //   }

  //   const handleDetailLevelChange = (n: number) => {
  //     setWordPerSubpoint(15 + n * 10)
  //   }

  const updateOutlineSessionStorage = (updatedOutline: any) => {
    const entireOutline = JSON.parse(sessionStorage.outline)
    entireOutline.res = JSON.stringify({ ...updatedOutline })
    sessionStorage.setItem('outline', JSON.stringify(entireOutline))
  }

  const handleDetailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number,
    detailIndex: number,
    key: string
  ) => {
    const { value } = e.target
    if (value.length <= maxLength) {
      const updatedOutlineData = [...outlineData] // Directly use the current state
      updatedOutlineData[sectionIndex]['content'][detailIndex] = value
      setOutlineData(updatedOutlineData) // Pass the updated data directly
      updateOutlineSessionStorage(updatedOutlineData)
    }
  }

  const handleAddDetail = (
    e: React.MouseEvent<HTMLDivElement>,
    sectionIndex: number,
    detailIndex: number
  ) => {
    e.preventDefault()
    let newOutlineData = [...outlineData]
    newOutlineData[sectionIndex].content.splice(detailIndex, 0, '')
    setOutlineData(newOutlineData)
    updateOutlineSessionStorage(newOutlineData)
  }

  const handleDeleteDetail = (
    e: React.MouseEvent<HTMLDivElement>,
    sectionIndex: number,
    detailIndex: number
  ) => {
    e.preventDefault()
    let newOutlineData = [...outlineData]
    newOutlineData[sectionIndex].content.splice(detailIndex, 1)
    setOutlineData(newOutlineData)
    updateOutlineSessionStorage(newOutlineData)
  }

  const handleDeleteSection = (
    e: React.MouseEvent<HTMLDivElement>,
    sectionIndex: number
  ) => {
    e.preventDefault()
    let newOutlineData = [...outlineData]
    newOutlineData.splice(sectionIndex, 1)
    setOutlineData(newOutlineData)
    updateOutlineSessionStorage(newOutlineData)
  }

  const handleAddSection = (sectionIndex: number) => {
    console.log('Add section after section index: ' + sectionIndex)
    let newOutlineData = [...outlineData]
    newOutlineData.splice(sectionIndex, 0, {
      title: 'New Section',
      content: ['Provide some details about this section'],
      detailLevel: 'Default',
      section_style: 'default',
    })

    // Create a new detailLevels array with the same length as newOutlineData
    const newDetailLevels = [...detailLevels]
    newDetailLevels.splice(sectionIndex + 1, 0, 0)

    console.log('Add section after section index: ' + sectionIndex)
    setOutlineData(newOutlineData)
    setDetailLevels(newDetailLevels)
    updateOutlineSessionStorage(newOutlineData)
  }

  const handleEnterEditSection = (
    e: React.MouseEvent<HTMLDivElement>,
    sectionIndex: number
  ) => {
    e.preventDefault()
    setTitleCache(outlineData[sectionIndex].title)
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLDivElement>,
    sectionIndex: number
  ) => {
    e.preventDefault()
    if (outlineData[sectionIndex].title.length == 0) {
      toast.error("Outline section can't be empty!", {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      const updatedOutlineData = [...outlineData] // Directly use the current state
      updatedOutlineData[sectionIndex].title = titleCache
      setOutlineData(updatedOutlineData) // Pass the updated data directly
      updateOutlineSessionStorage(updatedOutlineData)

      setTitleCache('')
    }
  }

  const handleSectionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number
  ) => {
    const { value } = e.target
    if (value.length <= maxLength) {
      const updatedOutlineData = [...outlineData] // Directly use the current state
      updatedOutlineData[sectionIndex].title = value
      setOutlineData(updatedOutlineData) // Pass the updated data directly
      updateOutlineSessionStorage(updatedOutlineData)
    }
  }

  return (
    <div>
      <ToastContainer />

      {outlineData &&
        outlineData.map((section: OutlineSection, sectionIndex: number) => (
          <div key={sectionIndex}>
            <div
              className={`my-[1.5rem] ${
                outlineData.length >= maxOutlineSectionCount
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              <button
                disabled={outlineData.length >= maxOutlineSectionCount}
                onClick={(e) => {
                  if (outlineData.length < maxOutlineSectionCount) {
                    handleAddSection(sectionIndex)
                  }
                }}
                className='focus:outline-none'
              >
                <AddSectionIcon />
              </button>
            </div>

            <div className='flex flex-row gap-4'>
              <div
                id={String(sectionIndex)}
                key={sectionIndex + 1}
                className='relative w-full sm:w-2/3 bg-neutral-50 rounded-md shadow border border-gray-200 px-4 py-2'
                onMouseEnter={() => setHoveredSectionIndex(sectionIndex)}
                onMouseLeave={() => setHoveredSectionIndex(-1)}
              >
                {/* section index and title */}
                <div
                  className='flex flex-col flex-wrap md:flex-nowrap'
                  onClick={(e) => {
                    handleEnterEditSection(e, sectionIndex)
                  }}
                >
                  <h3 className='text-lg'>Section {sectionIndex + 1}</h3>
                  <input
                    key={sectionIndex}
                    className='border-none outline-none focus:outline-slate-300 bg-neutral-50 rounded inline text-xl font-bold grow overflow-ellipsis'
                    value={section.title}
                    onChange={(e) => handleSectionChange(e, sectionIndex)}
                    onBlur={(e) => handleBlur(e, sectionIndex)}
                  />
                </div>
                {hoveredSectionIndex === sectionIndex &&
                  outlineData.length > minOutlineSectionCount && (
                    <div
                      className='absolute -top-[7%] right-[10%]'
                      onClick={(e) => {
                        handleDeleteSection(e, sectionIndex)
                      }}
                    >
                      <DeleteIcon shadow={true}/>
                    </div>
                  )}
                <div className='mt-4'>
                  {section.content.map((content: any, detailIndex: number) => (
                    <ul key={detailIndex} className='flex mb-2 list-disc px-8'>
                      <li
                        className='w-full relative '
                        onMouseEnter={() => setHoveredDetailIndex(detailIndex)}
                        onMouseLeave={() => setHoveredDetailIndex(-1)}
                      >
                        <input
                          key={detailIndex}
                          className={`form-input border-none w-full text-gray-800 grow overflow-ellipsis ${
                            hoveredDetailIndex === detailIndex &&
                            sectionIndex === hoveredSectionIndex
                              ? 'bg-gray-200'
                              : 'bg-neutral-50 '
                          }`}
                          value={content}
                          onChange={(e) =>
                            handleDetailChange(
                              e,
                              sectionIndex,
                              detailIndex,
                              'content'
                            )
                          }
                          placeholder={`Detail ${detailIndex + 1}`}
                        />
                        {hoveredDetailIndex === detailIndex &&
                          sectionIndex === hoveredSectionIndex && (
                            <div className='absolute flex flex-row gap-4 bottom-[70%] right-0 mt-1 mr-1'>
                              {outlineData[sectionIndex].content.length >
                                minOutlineDetailCount && (
                                <div
                                  onClick={(e) =>
                                    handleDeleteDetail(
                                      e,
                                      sectionIndex,
                                      detailIndex
                                    )
                                  }
                                >
                                  <DeleteIcon shadow={true}/>
                                </div>
                              )}

                              {outlineData[sectionIndex].content.length <
                                maxOutlineDetailCount && (
                                <div
                                  onClick={(e) =>
                                    handleAddDetail(
                                      e,
                                      sectionIndex,
                                      detailIndex
                                    )
                                  }
                                >
                                  <AddTopicIcon />
                                </div>
                              )}
                            </div>
                          )}
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        ))}
    </div>
  )
}

export default OutlineVisualizer
