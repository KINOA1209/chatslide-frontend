'use client'


import React, { useEffect, useState } from 'react'
import NewWorkflowToggle from './NewWorkflowToggle'
import UserService from '../utils/UserService'
import PaywallModal from '@/components/forms/paywallModal'

interface GPTToggleProps {
  setIsGpt35: (value: boolean) => void
}

const GPTToggle: React.FC<GPTToggleProps> = ({ setIsGpt35 }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isPaidUser, setIsPaidUser] = useState(false)
  const [isGpt35, setIsGpt35Locally] = useState(() => {
    // Load the value from sessionStorage, defaulting to true if it's not set
    const storedValue = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('isGpt35') : null;
    return storedValue ? JSON.parse(storedValue) : true
  })
  useEffect(() => {
    ;(async () => {
      const isPaidUser = await UserService.isPaidUser()
      setIsPaidUser(isPaidUser)
    })()
  }, [])

  useEffect(() => {
    // Update sessionStorage whenever isGpt35 changes
    sessionStorage.setItem('isGpt35', JSON.stringify(isGpt35))
    console.log(
      'sessionStorage isGpt35 updated',
      sessionStorage.getItem('isGpt35')
    )
  }, [isGpt35])

  const handleToggle = (value: boolean) => {
    if (!value && !isPaidUser) {
      // if switched to right (GPT-4) and user is not paid
      setShowPaymentModal(true)
    } else {
      setIsGpt35Locally(value) // Update the local state
      setIsGpt35(value) // Update the parent component's state
      console.log('isGpt35', value)
    }
  }

  return (
    <div>
      <NewWorkflowToggle
        isLeft={isGpt35}
        setIsLeft={handleToggle}
        leftText='GPT 3.5'
        rightText='GPT 4'
        leftColor='bg-[#A6B1BB]'
        rightColor='bg-[#455BE8]'
      />

      {showPaymentModal && (
        <PaywallModal
          setShowModal={setShowPaymentModal}
          message='Upgrade to unlock more features. 🚀'
        />
      )}
    </div>
  )
}

export default GPTToggle
