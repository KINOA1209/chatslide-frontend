"use client"
import AuthService from '@/services/AuthService';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, RefObject } from 'react';
import Pricing from '@/components/landing/pricing'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from "@/services/UserService";
import Link from 'next/link';
import AOS from 'aos'
import 'aos/dist/aos.css'
import ClickableLink from '@/components/ui/ClickableLink';
import ReferralLink from '@/components/ReferralLink';
import Modal from '@/components/ui/Modal';
import { FeedbackForm } from '@/components/ui/feedback';
import { BigBlueButton } from '@/components/button/DrlambdaButton';
import { InputBox } from '@/components/ui/InputBox';
import { FaInbox, FaKey, FaLock, FaMailBulk, FaUser, FaVoicemail } from 'react-icons/fa';

const Profile = () => {
  const [username, setUsername] = useState<string>('');
  const [editUsername, setEditUsername] = useState('');
  const [email, setEmail] = useState('drlambda@gmail.com');
  const [changed, setChanged] = useState(false);

  function userFirstName(): string {
    return username.split(' ')[0];
  }

  const fetchUser = async () => {
    const user = await AuthService.getCurrentUser();
    setEmail(user.attributes.email);
    setUsername(user.attributes.name);
    setChanged(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // useEffect(() => {
  //     UserService.forceUpdateUserInfo();
  // }, []);

  useEffect(() => {
    setEditUsername(username);
  }, [username])

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChanged(true);
    setEditUsername(e.target.value);
  };

  const handleSubmitUsername = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!changed) {
      toast.error('This username is the same as your old username.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // Set the character limit for editUsername
    const maxCharacterLimit = 50;
    if (editUsername.length > maxCharacterLimit) {
      toast.error('Username must be 50 characters or less.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    await AuthService.updateName(editUsername);
    const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();

    await fetch(`/api/user/update_username`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 'username': editUsername }),
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response.status, response;
      }
    }).then(data => {
      const status = data['status'];
      const message = data['message'];
      if (status === 'success') {
        toast.success("Username successfully updated", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }).catch(error => {
      toast.error(error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });

    setChanged(false);
    fetchUser();
  };


  return <div className='w-full px-4 sm:px-6'>
    <div className="mb-8 w-full">
      <div className="w-fit text-[#525C6A] text-[17px] font-bold">Profile</div>
      <div className="w-fit text-[#212121] text-[50px] md:text-[80px] font-light">Hi, {userFirstName()}</div>
    </div>
    <div className='w-fit mx-auto'>
      <div className="w-full">
        <label
          className="block text-[14px] mb-1 text-gray-700"
          htmlFor="email"
        >
          Email
        </label>

        <InputBox >
          <FaInbox className='text-gray-600' />
          <input
            id="email"
            type="text"
            className="w-full border-0 p-0 focus:outline-none focus:ring-0 cursor-text text-gray-800 bg-gray-100"
            // disabled
            value={email}
            readOnly
          />
          <FaLock className='text-gray-600' />
        </InputBox>
      </div>
      <form onSubmit={handleSubmitUsername}>
        <div className="w-full mt-4">
          <label
            className="block text-[14px] mb-1 text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <div className='flex w-full flex-row gap-4 justify-center mt-2'>
            <InputBox>
            <FaUser className='text-gray-600' />
              <input
                id="username"
                type="text"
                className="w-full border-0 p-0 focus:outline-none focus:ring-0 cursor-text text-gray-800 bg-gray-100"
                onChange={e => handleUsernameChange(e)}
                value={editUsername}
              />
            </InputBox>
            <button className='btn text-white bg-blue-600 whitespace-nowrap rounded-lg'>Update</button>
          </div>
        </div>

      </form>
    </div>
  </div>
}

// no longer used 
const PasswordModule = () => {
  const router = useRouter();

  return <div className='w-full px-4 sm:px-6'>
    <div className='w-fit mx-auto'>
      <div className='w-full flex flex-row justify-center mb-5'>
        <button className='btn text-white font-bold bg-gradient-to-r from-blue-600 to-teal-500 whitespace-nowrap rounded-xl' onClick={e => router.push('/reset-password')}>Change Password</button>
      </div>
    </div>
  </div>
}

const Referral = () => {
  return <div className='w-full px-4 sm:px-6'>
    <div className="mb-8 w-full">
      <div className="w-fit text-[#363E4A] text-[17px] font-bold">Referral</div>
      <div className="w-fit text-[#212121] text-[80px]">50<span className='text-[24px]'>credit/invite</span></div>
      <ReferralLink />
    </div>
  </div>
}

const OpenAIKey = () => {
  const [key, setKey] = useState('sk-......');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchKey = async () => {
    const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
    UserService.getOpenaiApiKey(token).then(data => {
      if (data)
        setKey(data);
    })
  }

  const updateKey = async () => {
    setIsSubmitting(true);
    console.log(isSubmitting)
    const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
    await UserService.updateOpenaiApiKey(token, key)
    setIsSubmitting(false);
    console.log(isSubmitting)
  }

  useEffect(() => {
    fetchKey();
  }, [])

  return (
    <div className='w-full px-4 sm:px-6'>
      <div className="mb-8 w-full">
        <div className="w-fit text-[#363E4A] text-[17px] font-bold">Your OpenAI Key</div>
        <div>Paste your own OpenAI key here so that generation does not cost credits:</div>
        <div className='flex w-full flex-row gap-4 justify-center mt-2'>
          <InputBox onClick={e => (e.target as HTMLInputElement).select()}>
            <FaKey className='text-gray-600' />
            <input
              id="key"
              type="text"
              className="w-full border-0 p-0 focus:outline-none focus:ring-0 cursor-text text-gray-800 bg-gray-100"
              onChange={e => setKey(e.target.value)}
              onClick={e => (e.target as HTMLInputElement).select()}
              value={key}
            />
          </InputBox>
          <button className='btn text-white font-bold bg-blue-600 disabled:bg-gray-500 whitespace-nowrap rounded-xl'
            onClick={updateKey}
            disabled={isSubmitting}
          >Update</button>
        </div>
      </div>
    </div>
  )
}

const Subscription = () => {
  const [portalURL, setPortalURL] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTier = async () => {
      const { userId, idToken: token } = await AuthService.getCurrentUserTokenAndId();
      UserService.getUserCreditsAndTier(token).then(data => {
        if (data.tier !== 'FREE') {
          UserService.createStripePortalSession(token).then(data => {
            setPortalURL(data);
          })
        }
      }).catch(error => console.error)
    }
    fetchTier();
  }, [])

  const cancelButton = (
    <div>
      <Link href={portalURL} target='_blank'>Cancel Subscription</Link>
    </div>
  )


  return (

    <div className='w-full pb-4'>
      {showModal &&
        <FeedbackForm onClose={() => setShowModal(false)} message="😭 We are sorry to see you go!" successDiv={cancelButton} textRequired={true} />
      }

      <div className="mb-8 w-full max-w-none 2xl:max-w-[80%] mx-auto px-4 sm:px-6">
        <div className="w-fit text-[#363E4A] text-[17px] font-bold">Subscription</div>
        <div className="w-fit text-[#212121] text-[80px]">Plans</div>
      </div>

      <Pricing />
      {portalURL &&
        <button onClick={() => { setShowModal(true) }} className='w-full py-4 sm:px-6 flex flex-col justify-center items-center max-w-none 2xl:max-w-[80%] mx-auto'>
          Manage Subscription
        </button>
      }
    </div>
  )
}

const CreditHistory = () => {
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const fetchCredit = async () => {
      const { userId, idToken } = await AuthService.getCurrentUserTokenAndId();
      UserService.getUserCreditsAndTier(idToken)
        .then(fetched => {
          setCredits(fetched.credits)
          // setTier(fetched.tier)
        })
        .catch(() => setCredits(0))
    }
    fetchCredit();
  }, []);

  return <div className='w-full px-4 sm:px-6'>
    <div className="mb-8 w-full">
      <div className="w-fit text-[#363E4A] text-[17px] font-bold">Credit Balance</div>
      <div className="w-fit text-[#212121] text-[80px]">{credits}</div>
    </div>
  </div>
}

export default function Account() {
  // To add a new section
  // Add tabRef for header animation
  // Add section ref for scrollIntoView in function toSection
  // Add IntersectionObserver in function observeElements

  const [currentDisplay, setCurrentDisplay] = useState(0);
  const [selectDisplay, setSelectDisplay] = useState(0);
  const [hoverTo, setHoverTo] = useState(-1);
  const tabUnderlineRef = useRef<HTMLDivElement>(null);

  // refs for sub-header animation
  const tab1Ref = useRef<HTMLDivElement>(null);
  const tab2Ref = useRef<HTMLDivElement>(null);
  const tab3Ref = useRef<HTMLDivElement>(null);
  const tab4Ref = useRef<HTMLDivElement>(null);

  //ref for sections
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);

  const toSection = (index: number) => {
    setSelectDisplay(index);
    if (ref1.current && ref2.current && ref3.current && ref4.current) {
      if (index === 0) {
        ref1.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      } else if (index === 1) {
        ref2.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      } else if (index === 2) {
        ref3.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
      } else if (index === 3) {
        ref4.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
    }
  }

  const handleMouseOver = (index: number) => {
    setHoverTo(index);
  }

  const handleMouseOut = () => {
    setHoverTo(-1);
  }

  useEffect(() => {
    if (hoverTo !== -1) {
      setCurrentDisplay(hoverTo);
    } else {
      setCurrentDisplay(selectDisplay);
    }
  }, [hoverTo, selectDisplay])

  useEffect(() => {
    const handleIntersect1 = (entry: IntersectionObserverEntry[]) => {
      if (entry[0].isIntersecting) {
        setSelectDisplay(0);
      }
    }
    const handleIntersect2 = (entry: IntersectionObserverEntry[]) => {
      if (entry[0].isIntersecting) {
        setSelectDisplay(1);
      }
    }
    const handleIntersect3 = (entry: IntersectionObserverEntry[]) => {
      if (entry[0].isIntersecting) {
        setSelectDisplay(2);
      }
    }
    const handleIntersect4 = (entry: IntersectionObserverEntry[]) => {
      if (entry[0].isIntersecting) {
        setSelectDisplay(3);
      }
    }

    const observeElements = () => {
      if (ref1.current && ref2.current && ref3.current && ref4.current) {
        let options = {
          root: null,
          rootMargin: "0px",
          threshold: [0.3],
        };

        let observer1 = new IntersectionObserver(handleIntersect1, options);
        observer1.observe(ref1.current);
        let observer2 = new IntersectionObserver(handleIntersect2, options);
        observer2.observe(ref2.current);
        let observer3 = new IntersectionObserver(handleIntersect3, options);
        observer3.observe(ref3.current);
        let observer4 = new IntersectionObserver(handleIntersect4, options);
        observer4.observe(ref4.current);
      }
    }

    observeElements();

  }, [ref1, ref2, ref3, ref4])

  useEffect(() => {
    if (tabUnderlineRef.current && tab1Ref.current && tab2Ref.current && tab3Ref.current && tab4Ref.current) {
      const margin = tab1Ref.current.offsetLeft;
      if (currentDisplay === 0) {
        tabUnderlineRef.current.style.width = tab1Ref.current.offsetWidth + 'px';
        tabUnderlineRef.current.style.marginLeft = margin + 'px';
      } else if (currentDisplay === 1) {
        tabUnderlineRef.current.style.width = tab2Ref.current.offsetWidth + 'px';
        tabUnderlineRef.current.style.marginLeft = tab1Ref.current.offsetWidth + margin * 3 + 'px';
      } else if (currentDisplay === 2) {
        tabUnderlineRef.current.style.width = tab3Ref.current.offsetWidth + 'px';
        tabUnderlineRef.current.style.marginLeft = tab1Ref.current.offsetWidth + tab2Ref.current.offsetWidth + margin * 5 + 'px';
      } else if (currentDisplay === 3) {
        tabUnderlineRef.current.style.width = tab4Ref.current.offsetWidth + 'px';
        tabUnderlineRef.current.style.marginLeft = tab1Ref.current.offsetWidth + tab2Ref.current.offsetWidth + tab3Ref.current.offsetWidth + margin * 7 + 'px';
      }
    }
  }, [currentDisplay])

  const bar = <div className='w-full h-0 border-b-2 border-[#CAD0D3]'></div>
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    })
  })

  return (
    <div className='flex flex-col items-center gap-[70px] mx-auto'>
      <ToastContainer />
      {/* <div className='fixed w-full top-0 h-[130px] md:h-[160px] bg-[#E7E9EB] flex flex-col z-20 max-w-none 2xl:max-w-[80%]'> */}
      {/* <div className='grow flex flex-row mb-2 items-end'>
                    <div className='text-[#363E4A] text-[16px] mx-1 md:mx-5 cursor-pointer' onClick={e => { toSection(0) }} onMouseMove={e => { handleMouseOver(0) }} onMouseOut={handleMouseOut} ref={tab1Ref}>Account Settings</div>
                    <div className='text-[#363E4A] text-[16px] mx-1 md:mx-5 cursor-pointer' onClick={e => { toSection(1) }} onMouseMove={e => { handleMouseOver(1) }} onMouseOut={handleMouseOut} ref={tab4Ref}>Credits</div>
                    <div className='text-[#363E4A] text-[16px] mx-1 md:mx-5 cursor-pointer' onClick={e => { toSection(2) }} onMouseMove={e => { handleMouseOver(2) }} onMouseOut={handleMouseOut} ref={tab3Ref}>Subscription</div>
                </div> */}
      {/* <div className='w-full flex flex-row'>
                    <div className='border-b-2 w-fit border-black h-0 overflow-hidden text-[16px] mx-1 md:mx-5 transition-all duration-300' ref={tabUnderlineRef}></div>
                </div> */}
      {/* </div> */}
      <div className='w-full mt-[20px] md:mt-0 max-w-none 2xl:max-w-[80%]' ref={ref1}><Profile /></div>
      {/* <div className='w-full max-w-none 2xl:max-w-[80%]'><PasswordModule /></div> */}
      {bar}
      <div className='w-full max-w-none 2xl:max-w-[80%]' ref={ref4}><CreditHistory /></div>
      <div className='w-full max-w-none 2xl:max-w-[80%]' ref={ref2}><Referral /></div>
      <div className='w-full max-w-none 2xl:max-w-[80%]'><OpenAIKey /></div>
      {bar}
      <div className='w-full' ref={ref3}><Subscription /></div>

    </div >)
};