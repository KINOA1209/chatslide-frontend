import Features from '@/components/landing/features'
import Header from '@/components/ui/header';

export default function Page() {
    return (
        <div>
            <Header loginRequired={false} isLanding={true} />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Features />
        </div>
    )

}
