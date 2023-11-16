import React, { useState, useRef, useEffect, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import AuthService from '@/components/utils/AuthService'
import 'react-toastify/dist/ReactToastify.css'
import UserService from '../utils/UserService'

interface OutlineSection {
  title: string
  content: Array<string>
  detailLevel: string
  section_style: string
}

interface OutlineDataType extends Array<OutlineSection> { }

// this class has no UI, it is used to submit the outline to the backend when isSubmitting is true
const GenerateSlidesSubmit = ({
  outline,
  isGPT35,
  isSubmitting,
  setIsSubmitting,
}: {
  outline: OutlineDataType
  isGPT35: boolean
  isSubmitting: boolean
  setIsSubmitting: (submitting: boolean) => void
}) => {
  const router = useRouter()
  const [outlineData, setOutlineData] = useState(outline)
  //   const [isGpt35, setIsGpt35] = useState(true)
  const [slidePages, setSlidePages] = useState(20)
  const [wordPerSubpoint, setWordPerSubpoint] = useState(10)

  useEffect(() => {
    if (isSubmitting) {
      handleSubmit()
    }
  }, [isSubmitting])

  const updateOutlineSessionStorage = (updatedOutline: any) => {
    const entireOutline = JSON.parse(sessionStorage.outline)
    entireOutline.res = JSON.stringify({ ...updatedOutline })
    sessionStorage.setItem('outline', JSON.stringify(entireOutline))
  }

  const [isSubmittingSlide, setIsSubmittingSlide] = useState(false)
  const [timer, setTimer] = useState(0)

  async function query_resources(
    project_id: any,
    resources: any,
    outlineData: any
  ) {
    const { userId, idToken: token } =
      await AuthService.getCurrentUserTokenAndId()
    const headers = new Headers()
    if (token) {
      headers.append('Authorization', `Bearer ${token}`)
    }

    const response = await fetch('/api/query_resources', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        outlines: JSON.stringify({ ...outlineData }),
        resources: resources,
        project_id: project_id,
      }),
    })

    if (response.ok) {
      return await response.json()
    } else {
      // alert("Request failed: " + response.status);
      console.log(response)
      // setIsSubmittingScript(false);
      // setIsSubmittingSlide(false);
    }
  }

  async function generateSlidesPreview(formData: any, token: string) {
    const response = await fetch('/api/generate_html', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      const resp = await response.json()
      setIsSubmittingSlide(false)
      sessionStorage.setItem('html', JSON.stringify(resp.data.res))
      router.push('workflow-review-slides')
    } else {
      alert(
        `Server is busy now. Please try again later. Reference code: ` +
        sessionStorage.getItem('project_id')
      )
      console.log(response)
      setIsSubmittingSlide(false)
    }
  }

  const handleSubmit = async () => {
    setTimer(0)
    let formData: any = {}

    // remove empty entries
    const outlineCopy = [...outlineData]
    for (let i = 0; i < outlineCopy.length; i++) {
      outlineCopy[i].content = outlineCopy[i].content.filter((s) => {
        return s.length > 0
      })
    }
    setOutlineData(outlineCopy)
    updateOutlineSessionStorage(outlineCopy)

    const audience =
      typeof window !== 'undefined' ? sessionStorage.getItem('audience') : null
    const foldername =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('foldername')
        : null
    const topic =
      typeof window !== 'undefined' ? sessionStorage.getItem('topic') : null
    const language =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('language')
        : 'English'
    const project_id =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('project_id')
        : null
    const resources =
      typeof window !== 'undefined' ? sessionStorage.getItem('selectedResourceId') : null
    const addEquations =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('addEquations')
        : null
    const extraKnowledge =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('extraKnowledge')
        : null
    const outline_item_counts =
      typeof window !== 'undefined'
        ? sessionStorage.getItem('outline_item_counts')
        : null

    formData = {
      res: JSON.stringify({ ...outlineData }),
      outlines: JSON.stringify({ ...outlineData }),
      audience: audience,
      foldername: foldername,
      topic: topic,
      language: language,
      project_id: project_id,
      addEquations: addEquations,
      extraKnowledge: extraKnowledge,
      outline_item_counts: outline_item_counts,
      model_name: isGPT35 ? 'gpt-3.5-turbo' : 'gpt-4',
      slidePages: slidePages,
      wordPerSubpoint: wordPerSubpoint,
      // endIndex: 2,  // generate first 2 sections only
    }

    if (resources && resources.length > 0 && !extraKnowledge) {
      try {
        console.log('querying vector database')
        const extraKnowledge = await query_resources(
          project_id,
          resources,
          outlineData
        )
        sessionStorage.setItem(
          'extraKnowledge',
          JSON.stringify(extraKnowledge.data.res)
        )
        sessionStorage.setItem(
          'outline_item_counts',
          JSON.stringify(extraKnowledge.data.outline_item_counts)
        )
        formData.extraKnowledge = extraKnowledge.data.res
        formData.outline_item_counts = extraKnowledge.data.outline_item_counts
        console.log('formData', formData)
      } catch (error) {
        console.log('Error querying vector database', error)
        // return;
      }
    } else {
      console.log('no need to query vector database')
    }

    try {
      const { userId, idToken: token } =
        await AuthService.getCurrentUserTokenAndId()
      await generateSlidesPreview(formData, token)
    } catch (error) {
      console.error('Error:', error)
      setIsSubmittingSlide(false)
    }
  }

  return (
    <div>
    </div>
  )
}

export default GenerateSlidesSubmit
