'use client';

import React, { useEffect, useRef, useState } from 'react';
import WorkflowStepsBanner from '@/components/layout/WorkflowStepsBanner';
import { toast, ToastContainer } from 'react-toastify';
import VideoService from '@/services/VideoService';
import { useUser } from '@/hooks/use-user';
import { Column } from '@/components/layout/Column';
import { useSlides } from '@/hooks/use-slides';
import { Instruction, BigTitle, Explanation, WarningMessage } from '@/components/ui/Text';
import Card from '@/components/ui/Card';
import { useProject } from '@/hooks/use-project';
import VoiceSelector, { previewVoice } from '@/components/language/VoiceSelector';
import { useRouter, useSearchParams } from 'next/navigation';
import { addIdToRedir } from '@/utils/redirWithId';
import dynamic from 'next/dynamic';
import useHydrated from '@/hooks/use-hydrated';
import { BigBlueButton, DropDown, EarlyAccessButton } from '@/components/button/DrlambdaButton';
import UserService from '@/services/UserService';
import AvatarSelector from '@/components/language/AvatarSelector';
import { GrayLabel } from '@/components/ui/GrayLabel';
import { Blank } from '@/components/ui/Loading';
import { bgmDisplayNames } from '@/components/language/bgmData';
import ButtonWithExplanation from '@/components/button/ButtonWithExplanation';
import { FiPlay } from 'react-icons/fi';
import Modal from '@/components/ui/Modal';
import RangeSlider from '@/components/ui/RangeSlider';
import { WrappableRow } from '@/components/layout/WrappableRow';
import { isOpenaiVoice } from '@/components/language/voiceData';
import Toggle from '@/components/button/Toggle';


const ScriptSection = dynamic(
  () => import('@/components/script/ScriptSection'),
  { ssr: false },
);

export default function WorkflowStep5() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { slides, updateSlidePage } = useSlides();
  const { project, updateProject } = useProject();
  const { username, token, updateCreditsFE, isPaidUser } = useUser();
  const router = useRouter();
  const [voice, setVoice] = useState('en-US-AvaNeural');
  const [style, setStyle] = useState('');
  const [avatar, setAvatar] = useState('');
  const [posture, setPosture] = useState('casual-sitting');
  const [size, setSize] = useState('medium');
  const [position, setPosition] = useState('bottom-right');
  const [bgm, setBgm] = useState('');
  const [bgmVolume, setBgmVolume] = useState(0.2);
  const [showConfirmRegenModal, setShowConfirmRegenModal] = useState(false);
  const [voiceIsHD, setVoiceIsHD] = useState(false);
  const [creditCost, setCreditCost] = useState(20);

  const params = useSearchParams();

  useEffect(() => {
    if (avatar)
      setCreditCost(400);
    else
      setCreditCost(20);
  }, [avatar]);

  const CreditCost = () => {
    function getCreditCostPerPageAndReason() {
      if (avatar)
        return { cost: 30, reason: '🦹‍♂️ You are using an avatar' };
      if (voiceIsHD || isOpenaiVoice(voice))
        return { cost: 5, reason: '🎧 You are using a hi-fi voice' };
      return { cost: 1, reason: 'You are using a standard voice' };
    }

    const { cost: pageCost, reason } = getCreditCostPerPageAndReason();
    const totalCost = Math.max(slides.length * pageCost, 20);
    setCreditCost(totalCost);
    const waitMinPerSlide = avatar ? 1 : 0.3;

    return (
      <Card>
        <BigTitle>⭐️ Cost</BigTitle>
        <Instruction>Number of pages: {slides.length} </Instruction>
        <Instruction>
          Estimated wait time: {' '}
          {Math.round(slides.length * waitMinPerSlide)} minutes
        </Instruction>

        <div>
          <Instruction>
            Total Credit Cost: {totalCost} ⭐️
          </Instruction>
          {slides.length * pageCost < 20 ? (
            <Explanation>
              The minimum deck cost is 20 ⭐️.
            </Explanation>
          ) : (
            <>
              <Instruction>
                Credit cost per page: {pageCost} ⭐️
              </Instruction>
              <Explanation>{reason}</Explanation>
            </>
          )
          }
        </div>
      </Card>
    )
  }

  if (!project) {
    if (params.get('id')) {
      router.push(`/project/${params.get('id')}`);
    }
    return <Blank>Project not found</Blank>;
  }

  const ConfirmVideoRegenModal: React.FC<{}> = () => {
    return (
      <Modal
        showModal={showConfirmRegenModal}
        setShowModal={setShowConfirmRegenModal}
        title='Confirm Video Regeneration'
      >
        <Instruction>
          You have a video generation job running. Do you want to regenerate the video? <br />
          This will cancel the current job and start a new one.
        </Instruction>
        <div className='flex flex-col gap-2 items-center'>
          <BigBlueButton
            onClick={() => {
              router.push(addIdToRedir('/video'))
            }}
          >
            No, View Running Job
          </BigBlueButton>


          <BigBlueButton
            onClick={handleSubmitVideo}
          >
            Yes, Regenerate Video
          </BigBlueButton>
        </div>
      </Modal>
    )
  }

  async function confirmVideoJob() {
    if (!project) {
      console.error('No project found');
      return;
    }
    const hasRunningVideoJob = await VideoService.hasRunningVideoJob(project.id, token);
    if (hasRunningVideoJob)
      setShowConfirmRegenModal(true);
    else
      handleSubmitVideo();
  }

  async function handleSubmitVideo() {
    console.log('handleSubmitVideo');
    if (!project) {
      console.error('No project found');
      return;
    }
    const foldername = project?.foldername;
    const project_id = project.id;
    if (!foldername || !project_id) {
      console.error('No pid or foldername or project_id found');
      setIsSubmitting(false);
      return;
    }

    const generateVideo = async () => {
      try {
        console.log('project_id:', project_id);
        updateProject('video_url', '');
        VideoService.generateVideo(
          project_id, foldername,
          voice,
          token,
          style, avatar, posture, size, position,
          bgm, bgmVolume,
          creditCost);
        updateCreditsFE(-20);
        router.push(addIdToRedir('/video'));
      } catch (error) {
        console.error('Error in fetchData:', error);
        setIsSubmitting(false);
      }
    };
    generateVideo();
  };


  useEffect(() => {
    if (isSubmitting) {
      confirmVideoJob();
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  // avoid hydration error during development caused by persistence
  if (!useHydrated()) return <></>;

  return (
    <div className='h-full w-full bg-white flex flex-col'>
      {/* flex col container for steps, title, etc */}

      <WorkflowStepsBanner
        currentIndex={4}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        isPaidUser={isPaidUser}
        nextIsPaidFeature={true}
        // todo: change credits
        nextText={'Create Video (' + creditCost + '⭐️)'}
      />

      <ToastContainer enableMultiContainer containerId={'script'} />

      {showConfirmRegenModal && <ConfirmVideoRegenModal />}

      <Column>
        {/* <CreditCost /> */}
        <Card>
          <WrappableRow type='flex' justify='between'>
            <BigTitle>🎙️ Voice</BigTitle>

            {!isOpenaiVoice(voice) &&
              <Toggle
                isLeft={!voiceIsHD}
                setIsLeft={(value: boolean) => setVoiceIsHD(!value)}
                leftText='Standard'
                rightText='Hi-Fi 🎧'
              />
            }
          </WrappableRow>

          <Instruction>
            Select the voice you want to use for your video.
          </Instruction>
          <VoiceSelector
            selectedVoice={voice}
            setSelectedVoice={setVoice}
            style={style}
            setStyle={setStyle}
            isHD={voiceIsHD}
          />
        </Card>

        <Card>
          <BigTitle>
            🎵 Background Music
          </BigTitle>
          <WrappableRow type='grid' cols={2}>
            <div>
              <Instruction>
                Background Music:
              </Instruction>
              <div className='flex flex-row gap-4 items-center'>
                <DropDown
                  width='12rem'
                  onChange={(e) => setBgm(e.target.value)}
                  value={bgm}
                  style='input'
                >
                  {Object.entries(bgmDisplayNames).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </DropDown>
                {bgm &&
                  <ButtonWithExplanation
                    explanation='Preview'
                    button={
                      <a href={`/bgm/${bgm}.mp3`} target='_blank'>
                        <FiPlay
                          style={{
                            strokeWidth: '2',
                            flex: '1',
                            width: '1.5rem',
                            height: '1.5rem',
                            fontWeight: 'bold',
                            color: '#344054',
                          }}
                        />
                      </a>
                    }
                  />}
              </div>
            </div>
            {bgm &&
              <div>
                <Instruction>
                  Volume: {bgmVolume * 100}
                </Instruction>
                <RangeSlider
                  onChange={(value: number) => {
                    if (value !== 0) {
                      console.log(value)
                      setBgmVolume(value)
                    }
                  }}
                  value={bgmVolume}
                  minValue={0.1}
                  choices={[0, 0.1, 0.2, 0.3, 0.4]}
                />
              </div>
            }
          </WrappableRow>

        </Card>

        <Card>
          <BigTitle>🦹‍♂️ Avatar</BigTitle>
          <Instruction>
            Select the avatar you want to use for your video.<GrayLabel>Beta</GrayLabel>
          </Instruction>
          <Explanation>
            Due to the limitation of our resources, we can only provide a limited number of video generations with avatars. <br />
            This feature will cost more credits. <br />
            The credit cost for videos with avatar is 30⭐️ per page. This may change in the future.
          </Explanation>
          {
            isOpenaiVoice(voice) ? (
              <WarningMessage>
                The voice you selected does not support avatars yet.
              </WarningMessage>
            ) : (
              <AvatarSelector
                avatar={avatar}
                setAvatar={setAvatar}
                posture={posture}
                setPosture={setPosture}
                size={size}
                setSize={setSize}
                position={position}
                setPosition={setPosition}
              />
            )
          }
        </Card>
        {/* <Card>
					<BigTitle>🦹‍♂️ Avatar</BigTitle>
					<div className='flex flex-row gap-x-4 items-end'>
						<Instruction>
							This is coming soon... We are finding some pilot users to test this feature.
						</Instruction>
						<EarlyAccessButton
							username={username}
							token={token}
							feature='avatar'
							project_id={project.id}
						/>
					</div>
				</Card> */}
        <Card>
          <BigTitle>📝 Scripts</BigTitle>
          {
            !isOpenaiVoice(voice) && (
              <Instruction>
                <div className='flex flex-col gap-y-1'>
                  <p>💡 Script to voice tips: </p>
                  <p>⏸️ Use <span className='text-green-600'>...</span> to denote pause </p>
                  <p>*️⃣ Use <span className='text-green-600'>*word*</span> to denote emphasis </p>
                  <p>🔤 Use <span className='text-green-600'>[word]</span> to spell out the word. </p>
                  <p>🌟 For example: {' '}
                    <span className='text-blue-600 hover:cursor-pointer' onClick={() => previewVoice('denotation')}>🔈 We also support creating *slides* from... [doc] files. </span>
                  </p>
                </div>
              </Instruction>
            )
          }

          <div className='flex flex-col gap-y-2'>
            {slides.map((_, index) => (
              <ScriptSection
                key={index}
                slides={slides}
                index={index}
                voice={voice}
                voiceStyle={style}
                updateSlidePage={updateSlidePage}
              />
            ))}
          </div>
        </Card>
      </Column>
    </div>
  );
}
