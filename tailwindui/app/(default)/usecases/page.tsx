import UseCases from '@/components/landing/use_cases'
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
            <UseCases />
        </div>
    )

}
