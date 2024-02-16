import { useState } from "react";
import Resource from "@/models/Resource";
import WebService from "@/services/WebpageService";
import YoutubeService from "@/services/YoutubeService";
import { useUser } from "@/hooks/use-user";
import { SmallBlueButton } from "../button/DrlambdaButton";
import { FiYoutube } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";

const LinkInput = ({
  selectedResources,
  setSelectedResources,
}: {
  selectedResources: Resource[];
  setSelectedResources: React.Dispatch<React.SetStateAction<Resource[]>>;
}) => {

  const [linkError, setLinkError] = useState('');
  const { token, isPaidUser } = useUser();
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState('' as string);
  const [urlIsYoutube, setUrlIsYoutube] = useState(false);

  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch (error) {
      return false;
    }
  };

  async function addLink(link: string) {
    if (!isValidUrl(link)) {
      setLinkError('This does not seem like a valid link.');
      return;
    }
    // check if it is like file:///path/to/file
    if (link.startsWith('file:///')) {
      setLinkError('This is a file link, please use the window above to upload.');
      return;
    }

    if (!isPaidUser && selectedResources.length >= 1) {
      setLinkError('Please subscribe to add more resources.');
      return;
    }
    setLinkError('');
    setIsAddingLink(true);
    if (urlIsYoutube) {
      addYoutubeLink(link);
    } else {
      addWebpageLink(link);
    }
  }

  async function addYoutubeLink(link: string) {
    try {
      const videoDetails = await YoutubeService.getYoutubeInfo(link, token);

      if (!videoDetails?.id) {
        setLinkError('The Youtube link is invalid.');
        setIsAddingLink(false);
        return;
      }

      setSelectedResources((prevList) => [...prevList, videoDetails]);
    } catch (error: any) {
      console.error('Error fetching YouTube video details: ', error);
      setLinkError('Error fetching YouTube video details');
    } 
    setIsAddingLink(false);
  }

  async function addWebpageLink(link: string) {
    try {
      const pageDetails = await WebService.getWebpageInfo(link, token);

      if (!pageDetails?.id) {
        setLinkError('The webpage link is invalid.');
        setIsAddingLink(false);
        return;
      }

      setSelectedResources((prevList) => [...prevList, pageDetails]);
    } catch (error: any) {
      console.error('Error reading webpage details: ', error);
      setLinkError('This webpage does not allow being read.');
    }
    setIsAddingLink(false);
  }


  const handleLinkChange = (link: string) => {
    // url format: https://gist.github.com/rodrigoborgesdeoliveira/987683cfbfcc8d800192da1e73adc486
    // search params will be ignored
    // sample: https://www.youtube.com/watch?v=Ir3eJ1t13fk
    // sample: http://youtu.be/lalOy8Mbfdc?t=1s
    // sample: https://www.youtube.com/v/-wtIMTCHWuI?app=desktop

    if (link === '') {
      setLinkUrl('');
      setLinkError('');
      return;
    }
    setLinkUrl(link);
    setLinkError('');
    // validate url against youtube
    const regex1 = /youtube\.com\/watch\?v=[a-zA-z0-9_-]{11}/;
    const regex2 = /youtu\.be\/[A-Za-z0-9_-]{11}/;
    const regex3 = /youtube\.com\/v\/[a-zA-z0-9_-]{11}/;
    if (regex1.test(link)) {
      const essentialLink = link.match(regex1);
      if (essentialLink && essentialLink.length > 0) {
        setLinkUrl('https://www.' + essentialLink[0]);
        setUrlIsYoutube(true);
      }
    } else if (regex2.test(link)) {
      const essentialLink = link.match(regex2);
      if (essentialLink && essentialLink.length > 0) {
        const vID = essentialLink[0].match(/[A-Za-z0-9_-]{11}/);
        if (vID && vID.length > 0) {
          setLinkUrl('https://www.youtube.com/watch?v=' + vID[0]);
          setUrlIsYoutube(true);
        }
      }
    } else if (regex3.test(link)) {
      const essentialLink = link.match(regex3);
      if (essentialLink && essentialLink.length > 0) {
        const vID = essentialLink[0].match(/[A-Za-z0-9_-]{11}/);
        if (vID && vID.length > 0) {
          setLinkUrl('https://www.youtube.com/watch?v=' + vID[0]);
          setUrlIsYoutube(true);
        }
      }
    } else {
      // url is not youtube, assuming it is a web link
      setUrlIsYoutube(false);
    }
  };


  return (
    <div className='link_container bg-gray-100 border border-2 border-gray-200'>
      <div
        id='link_text_container'
        className='flex justify-center items-center w-full'
      >
        <div className='flex items-center gap-1'>
          <IoIosLink />
          <FiYoutube />
          𝕏
        </div>
        <div className='w-full'>
          <label htmlFor='link_text'></label>
          <input
            id='link'
            type='text'
            className='text-sm md:text-l form-input w-full border-none bg-gray-100'
            value={linkUrl}
            onChange={(e) => handleLinkChange(e.target.value)}
            placeholder='Paste webpage, Youtube, or 𝕏 link'
          />
        </div>
        <SmallBlueButton
          onClick={(e) => {
            addLink(linkUrl);
          }}
          isSubmitting={isAddingLink}
        >
          {isAddingLink ? 'Adding...' : 'Add'}
        </SmallBlueButton>
      </div>

      {linkError && (
        <div className='text-sm text-red-500 mb-3 ml-3'>
          {linkError}
        </div>
      )}
    </div>
  );
};

export default LinkInput;