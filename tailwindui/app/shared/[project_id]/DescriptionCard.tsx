'use client';

import React, { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { Explanation, Instruction, Title } from '@/components/ui/Text';
import Project from '@/models/Project';
import ProjectService from '@/services/ProjectService';
import { useUser } from '@/hooks/use-user';
import { getBrand } from '@/utils/getHost';
import { ChangeProjectDescriptionButton } from '@/components/dashboard/changeProjectDescriptionButton';

interface DescriptionCardProps {
    project_id: string;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({
    project_id,
}) => {
    const { token } = useUser();
    const [project, setProject] = useState<any>(null);
    const [description, setDescription] = useState<String>('');
    const [showChangeProjectDescriptionModal, setShowChangeProjectDescriptionModal] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const project = await ProjectService.getProjectDetails(token, project_id);
                setProject(project);
                setDescription(project.description || '')
            } catch (error) {
                console.error('Error fetching project details:', error);
            }
        };

        fetchProject();
    }, [token, project_id]);

    if (!project || description == '') {
        return <p>Loading project details...</p>;
    }
    return (
        <div className='hidden sm:flex m-4'>
            <Card>
                <div className='flex flex-row items-center gap-x-4'>
                    <Title>{project.topic}</Title>
                    <Instruction>Created using {getBrand()}</Instruction>
                    <ChangeProjectDescriptionButton
                        project={project}
                        showChangeProjectDescriptionModal={showChangeProjectDescriptionModal}
                        setShowChangeProjectDescriptionModal={setShowChangeProjectDescriptionModal}
                        setDescription={setDescription}
                    />
                </div>
                <Explanation>{description}</Explanation>
            </Card>
        </div>
    );
};

export default DescriptionCard;