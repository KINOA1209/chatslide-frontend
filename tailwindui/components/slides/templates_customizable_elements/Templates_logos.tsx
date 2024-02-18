import Image from 'next/image';
import { TemplateKeys } from '../slideTemplates';
import drlambdaLogo from '@/public/images/template/drlambdaLogo.png';
import drlambdaLogoSingle from '@/public/images/template/drlambdaLogoSingle.png';
import BerkeleyLogo from '@/public/images/template/Berkeley/Berkeley_logo.png';
import BerkeleyLogoWhite from '@/public/images/template/Berkeley/Berkeley_logo_white.png';
import StanfordLogo from '@/public/images/template/Stanford/StanfordLogo.png';
import StanfordLogoLetters from '@/public/images/template/Stanford/Stanford_logo_letters.png';
import HarvardLogo from '@/public/images/template/Harvard/Harvard_logo.png';
import MITLogo from '@/public/images/template/MIT/MIT_Logo.png';
import PrincetonLogo from '@/public/images/template/Princeton/Princeton_University_Logo.png';
import UPennLogo from '@/public/images/template/UPenn/University_of_Pennsylvania-Logo.png';
import CaltechLogo from '@/public/images/template/Caltech/CaltechLogo.png';
import UChicagoLogo from '@/public/images/template/UChicago/University_of_Chicago-Logo.png';
import YaleLogo from '@/public/images/template/Yale/Yale_logo.png';
import JHULogo from '@/public/images/template/JHU/Johns_Hopkins_University-Logo.png';
import ColumbiaLogo from '@/public/images/template/Columbia/ColumbiaLogo.png';

const DrLambdaLogo = ({
  isCoverPage,
  custom_logo,
}: {
  isCoverPage: boolean;
  custom_logo: string;
}) => {
  //console.log('custom_logo:', custom_logo);
  if (isCoverPage) {
    if (
      custom_logo === 'Default'
    ) {
      return (
        <div className='absolute inset-0 top-[90%] w-full justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] z-50'>
          <Image
            src={drlambdaLogo}
            alt='drlambdaLogo'
            className='w-[8rem] h-auto'
          />
          {/* logo cover */}
        </div>
      );
    } else {
      return (
        <div className='absolute inset-0 top-[90%] w-full justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] z-50'>
          <Image
            unoptimized={true}
            src={custom_logo}
            alt='CustomLogo'
            width={70}
            height={70}
            className='h-auto'
          />
        </div>
      );
    }
  } else {
    if (
      custom_logo === 'Default'
    ) {
      return (
        <div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] z-50'>
          <Image
            unoptimized={true}
            src={drlambdaLogoSingle}
            alt='drlambda logo'
            className='w-[1.5rem] mr-4'
          />
          <div
            className={`grow basis-0 opacity-50 border border-black border-opacity-40`}
          ></div>
          {/* logo non cover */}
        </div>
      );
    } else {
      return (
        <div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] z-50'>
          <Image
            unoptimized={true}
            src={custom_logo}
            alt='custom logo'
            width={44}
            height={41}
            className='mr-4'
          />
          <div
            className={`grow basis-0 opacity-50 border border-black border-opacity-40`}
          ></div>
          {/* logo non cover */}
        </div>
      );
    }
  }
};

// Inside DefaultTemplateLogo component
export const DefaultTemplateLogo = DrLambdaLogo;
export const BerkeleyTemplateLogo = ({
  isCoverPage,
  custom_logo,
}: {
  isCoverPage: boolean;
  custom_logo: string;
}) => {
  return (
    <div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem] z-50'>
      <Image
        unoptimized={true}
        width='70'
        height='70'
        src={custom_logo || (isCoverPage ? BerkeleyLogoWhite : BerkeleyLogo)}
        alt='Berkeley Logo'
        className='w-[5rem] h-auto'
      />
    </div>
  );
};
export const StanfordTemplateLogo = ({
  isCoverPage,
  custom_logo,
}: {
  isCoverPage: boolean;
  custom_logo: string;
}) => {
  return (
    <div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem]'>
      <Image
        unoptimized={true}
        width='70'
        height='70'
        src={custom_logo || StanfordLogo}
        alt='Standford Logo'
        className='w-[3.75rem] h-auto'
      />
      <div
        className={`grow basis-0 opacity-50 border ${isCoverPage ? 'border-white' : 'border-red-800'
          }  border-opacity-40`}
      ></div>
    </div>
  );
};
export const HarvardTemplateLogo = ({
  isCoverPage,
  custom_logo,
}: {
  isCoverPage: boolean;
  custom_logo: string;
}) => {
  return (
    <div
      className={`absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pb-[2rem] pl-[2rem]`}
    >
      <Image
        unoptimized={true}
        width='70'
        height='70'
        src={custom_logo || HarvardLogo}
        alt='Harvard Logo'
        className='w-[4rem] h-auto'
      />
    </div>
  );
};
export const MITTemplateLogo = ({
  isCoverPage,
  custom_logo,
}: {
  isCoverPage: boolean;
  custom_logo: string;
}) => {
  return (
    <div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem]'>
      <Image
        unoptimized={true}
        width='70'
        height='70' src={custom_logo || MITLogo} alt='MIT Logo' className='w-[3.75rem] h-auto' />
    </div>
  );
};
export const PrincetonTemplateLogo = ({
  isCoverPage,
  custom_logo,
}: {
  isCoverPage: boolean;
  custom_logo: string;
}) => {
  return (
    <div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] '>
      <Image
        unoptimized={true}
        width='70'
        height='70'
        src={custom_logo || PrincetonLogo}
        alt='Princeton Logo'
        className='w-[4rem] h-auto'
      />
    </div>
  );
};
export const CaltechTemplateLogo = ({
  isCoverPage,
  custom_logo,
}: {
  isCoverPage: boolean;
  custom_logo: string;
}) => {
  return (
    <div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem]'>
      <Image
        unoptimized={true}
        width='70'
        height='70'
        src={custom_logo || CaltechLogo}
        alt='Caltech Logo'
        className='w-[4rem] h-auto'
      />
    </div>
  );
};
export const UPennTemplateLogo = ({
  isCoverPage,
  custom_logo,
}: {
  isCoverPage: boolean;
  custom_logo: string;
}) => {
  return (
    <div className='fixed inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] '>
      <Image
        unoptimized={true}
        width='70'
        height='70' src={custom_logo || UPennLogo} alt='UPenn Logo' className='w-[4rem] h-auto' />
    </div>
  );
};
export const UChicagoTemplateLogo = ({
  isCoverPage,
  custom_logo,
}: {
  isCoverPage: boolean;
  custom_logo: string;
}) => {
  return (
    <div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] '>
      <Image
        unoptimized={true}
        width='70'
        height='70'
        src={custom_logo || UChicagoLogo}
        alt='UChicago Logo'
        className='w-[4rem] h-auto'
      />
    </div>
  );
};
export const YaleTemplateLogo = ({
  isCoverPage,
  custom_logo,
}: {
  isCoverPage: boolean;
  custom_logo: string;
}) => {
  return (
    <div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] '>
      <Image
        unoptimized={true}
        width='70'
        height='70' src={custom_logo || YaleLogo} alt='Yale Logo' className='w-[3.75rem] h-auto' />
    </div>
  );
};
export const JHUTemplateLogo = ({
  isCoverPage,
  custom_logo,
}: {
  isCoverPage: boolean;
  custom_logo: string;
}) => {
  return (
    <div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] '>
      <Image
        unoptimized={true}
        width='70'
        height='70' src={custom_logo || JHULogo} alt='JHU Logo' className='w-[4rem] h-auto' />
    </div>
  );
};
export const ColumbiaTemplateLogo = ({
  isCoverPage,
  custom_logo,
}: {
  isCoverPage: boolean;
  custom_logo: string;
}) => {
  return (
    <div className='absolute inset-0 top-[90%] w-full h-14 justify-start items-center gap-7 inline-flex pl-[2rem] pb-[2rem]'>
      <Image
        unoptimized={true}
        width='70'
        height='70'
        src={custom_logo || ColumbiaLogo}
        alt='Columbia Logo'
        className='w-[4rem]  h-auto'
      />
    </div>
  );
};

export const Fun_Education_004_TemplateLogo = ({
  isCoverPage,
  custom_logo,
}: {
  isCoverPage: boolean;
  custom_logo: string;
}) => {
  if (
    custom_logo === 'Default'
  ) {
    return (
      <div className='absolute inset-0 top-[90%] w-full justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] z-50'>
        <Image
          unoptimized={true}
          src={drlambdaLogo}
          alt='drlambdaLogo'
          className='w-[8rem] h-auto'
        />
        {/* logo cover */}
      </div>
    );
  } else {
    return (
      <div className='absolute inset-0 top-[90%] w-full justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] z-50'>
        <Image
          unoptimized={true}
          src={custom_logo}
          alt='CustomLogo'
          width={70}
          height={70}
          className='h-auto'
        />
      </div>
    );
  }
};

export const Business_002_TemplateLogo = ({
  isCoverPage,
  custom_logo,
}: {
  isCoverPage: boolean;
  custom_logo: string;
}) => {
  if (
    custom_logo === 'Default'
  ) {
    return (
      <div className='absolute inset-0 top-[90%] w-full justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] z-50'>
        <Image
          unoptimized={true}
          src={drlambdaLogo}
          alt='drlambdaLogo'
          className='w-[8rem] h-auto'
        />
        {/* logo cover */}
      </div>
    );
  } else {
    return (
      <div className='absolute inset-0 top-[90%] w-full justify-start items-center gap-7 inline-flex pl-[1rem] pb-[1rem] z-50'>
        <Image
          unoptimized={true}
          src={custom_logo}
          alt='CustomLogo'
          width={70}
          height={70}
          className='h-auto'
        />
      </div>
    );
  }
};

// Define the type for template logo information
type TemplateLogoInfo = {
  templateName: TemplateKeys;
  templateLogo: React.ComponentType<{
    isCoverPage: boolean;
    custom_logo: string;
  }>;
};

// Define the available templates and their logos
const templatesInfo: TemplateLogoInfo[] = [
  {
    templateName: 'Default' as TemplateKeys,
    templateLogo: DefaultTemplateLogo,
  },
  {
    templateName: 'Fun_Education_004' as TemplateKeys,
    templateLogo: Fun_Education_004_TemplateLogo,
  },
  {
    templateName: 'Business_002' as TemplateKeys,
    templateLogo: Business_002_TemplateLogo,
  },
  {
    templateName: 'Berkeley' as TemplateKeys,
    templateLogo: BerkeleyTemplateLogo,
  },
  {
    templateName: 'Stanford' as TemplateKeys,
    templateLogo: StanfordTemplateLogo,
  },
  {
    templateName: 'Harvard' as TemplateKeys,
    templateLogo: HarvardTemplateLogo,
  },
  {
    templateName: 'MIT' as TemplateKeys,
    templateLogo: MITTemplateLogo,
  },
  {
    templateName: 'Princeton' as TemplateKeys,
    templateLogo: PrincetonTemplateLogo,
  },
  {
    templateName: 'UPenn' as TemplateKeys,
    templateLogo: UPennTemplateLogo,
  },
  {
    templateName: 'Caltech' as TemplateKeys,
    templateLogo: CaltechTemplateLogo,
  },
  {
    templateName: 'UChicago' as TemplateKeys,
    templateLogo: UChicagoTemplateLogo,
  },
  {
    templateName: 'Yale' as TemplateKeys,
    templateLogo: YaleTemplateLogo,
  },
  {
    templateName: 'JHU' as TemplateKeys,
    templateLogo: JHUTemplateLogo,
  },
  {
    templateName: 'Columbia' as TemplateKeys,
    templateLogo: ColumbiaTemplateLogo,
  },
];

export const TemplatesLogos = Object.fromEntries(
  templatesInfo.map(({ templateName, templateLogo }) => [
    templateName,
    templateLogo,
  ]),
) as Record<
  TemplateKeys,
  React.ComponentType<{ isCoverPage: boolean; custom_logo: string }>
>;

/*
const TemplatesLogos = {
  Default: DefaultTemplateLogo, // Assuming DefaultTemplateLogo is a React component
  Berkeley: BerkeleyTemplateLogo, // Assuming BerkeleyTemplateLogo is a React component
  // ... other template entries
} as Record<TemplateKeys, React.ComponentType<{ isCoverPage: boolean }>>;

*/
