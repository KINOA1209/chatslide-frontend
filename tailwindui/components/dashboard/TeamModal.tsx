import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { FaClipboard, FaClone } from 'react-icons/fa';
import { InputBox } from '../ui/InputBox';
import { BigBlueButton } from '../button/DrlambdaButton';
import { SmallTitle } from '../ui/Text';
import { DropDown } from '../button/DrlambdaButton';
import TeamService from '@/services/TeamService';
import { useUser } from '@/hooks/use-user';
import { toast } from 'react-toastify';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface TeamModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  teamId: string;
}

const TeamModal: React.FC<TeamModalProps> = ({ showModal, setShowModal, teamId }) => {
  const [teamName, setTeamName] = useState<string>('');
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [newMemberEmail, setNewMemberEmail] = useState<string>('');
  const [inviteCode, setInviteCode] = useState<string>('');
  const { token } = useUser();

  useEffect(() => {
    if (showModal && teamId) {
      fetchTeamMembers();
    }
  }, [showModal, teamId]);

  const fetchTeamMembers = async () => {
    try {
      const data = await TeamService.getTeamMembers(teamId, token);
      const membersList: TeamMember[] = [
        { id: data.owner.id, name: data.owner.username, email: data.owner.email, role: 'Owner' },
        ...data.admins.map((admin: any) => ({ id: admin.id, name: admin.username, email: admin.email, role: 'Admin' })),
        ...data.members.map((member: any) => ({ id: member.id, name: member.username, email: member.email, role: 'Member' })),
      ];
      setMembers(membersList);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMember = () => {
    setMembers([...members, { id: '', name: newMemberEmail, email: newMemberEmail, role: 'Member' }]);
    setNewMemberEmail('');
  };

  const handleRoleChange = (index: number, role: string) => {
    const updatedMembers = members.map((member, i) => (i === index ? { ...member, role } : member));
    setMembers(updatedMembers);
  };

  const handleRemoveMember = async (index: number) => {
    try {
      const memberId = members[index].id; // Assuming member objects have an id property
      await TeamService.removeMember(teamId, memberId, token);
      const updatedMembers = members.filter((_, i) => i !== index);
      setMembers(updatedMembers);
    } catch (err) {
      console.error('Error removing member:', err);
    }
  };

  const handleSubmit = () => {
    // Handle modal submit action
    console.log('Team name:', teamName);
    console.log('Members:', members);
  };

  const generateInviteCode = async () => {
    try {
      const inviteCode = await TeamService.generateInviteCode(teamId, false, token);
      setInviteCode(inviteCode);
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Invite code copied to clipboard!');
    }, (err) => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="team-management">
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onConfirm={handleSubmit}
        title="Team Members"
        description="Manage your team members and their roles."
        width="600px"
        hasInputArea={false}
      >
        <div>
          <div className="mb-4">
            <SmallTitle>Generate Invite Code</SmallTitle>
            <div className="mt-2">
              <BigBlueButton onClick={generateInviteCode}>Generate Code</BigBlueButton>
            </div>
            {inviteCode && (
              <div className="mt-4 flex items-center">
                <span className="text-gray-800">Invite Code:</span>
                <span className="ml-2 font-bold text-blue-600">{inviteCode}</span>
                <button
                  onClick={() => copyToClipboard(inviteCode)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <FaClone />
                </button>
              </div>
            )}
          </div>

          <div className="mb-4">
            {members.map((member, index) => (
              <div key={index} className="flex items-center justify-between mb-2">
                <div>
                  <p>{member.name}</p>
                  <p className="text-gray-500 text-sm">{member.email}</p>
                </div>
                <div className="flex items-center">
                  <DropDown
                    onChange={(e) => handleRoleChange(index, e.target.value)}
                    displayText="Select role"
                    value={member.role}
                  >
                    <option value="Member">Member</option>
                    <option value="Admin">Admin</option>
                  </DropDown>
                  <button
                    onClick={() => handleRemoveMember(index)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeamModal;
