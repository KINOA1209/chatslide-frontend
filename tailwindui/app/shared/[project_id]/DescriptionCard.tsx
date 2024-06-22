import Card from '@/components/ui/Card';
import { Explanation, Instruction, Title } from '@/components/ui/Text';
import Project from '@/models/Project';
import { getBrand } from '@/utils/getHost';
import { ChangeProjectDescriptionButton } from '@/components/dashboard/changeProjectDescriptionButton';

interface DescriptionCardProps {
	project: Project;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({ project }) => {

	if (!project || project.description == '') {
		return <p>Loading project details...</p>;
	}
	return (
		<div className='hidden sm:flex m-4'>
			<Card>
				<div className='flex flex-row items-center gap-x-4'>
					<Title>{project.topic}</Title>
					<Instruction>
						Created using {getBrand()}
					</Instruction>
				</div>
				<Explanation>{project.description}</Explanation>
			</Card>
		</div>
	);
};

export default DescriptionCard;
