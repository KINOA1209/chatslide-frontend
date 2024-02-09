import { FaTwitter, FaFacebookF, FaRedditAlien, FaLinkedinIn } from 'react-icons/fa';

const PostPlatformConfigs = {
  twitter: {
    displayName: '𝕏',
    shareUrl: 'https://twitter.com/intent/tweet?text=',
    textTemplate: (title:string, link:string) => `${encodeURIComponent(title)}${encodeURIComponent(link)}`,
    icon: <FaTwitter />,
  },
  facebook: {
    displayName: 'Facebook',
    shareUrl: 'https://www.facebook.com/sharer/sharer.php?u=',
    textTemplate: (title:string, link:string) => `${encodeURIComponent(link)}`,
    icon: <FaFacebookF />,
  },
  reddit: {
    displayName: 'Reddit',
    shareUrl: 'https://www.reddit.com/submit?url=',
    textTemplate: (title:string, link:string) => `${encodeURIComponent(link)}&title=${encodeURIComponent(title)}`,
    icon: <FaRedditAlien />,
  },
  linkedin: {
    displayName: 'LinkedIn',
    shareUrl: 'https://www.linkedin.com/sharing/share-offsite/?url=',
    textTemplate: (title:string, link:string) => `${link}`,
    icon: <FaLinkedinIn />,
  },
};

export default PostPlatformConfigs;