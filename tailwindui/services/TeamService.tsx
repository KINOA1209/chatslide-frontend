export default class TeamService {
  static async createTeam(teamName: string, token: string) {
    const response = await fetch('/api/team/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ team_name: teamName }),
    });

    if (response.ok) {
      const resp = await response.json();
      return {
        message: resp.message,
        team_id: resp.team_id,
      };
    } else {
      const errorResp = await response.json();
      throw new Error('Error when creating team: ' + errorResp.message);
    }
  }

  static async deleteTeam(teamId: string, token: string) {
    const response = await fetch('/api/team/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ team_id: teamId }),
    });

    if (response.ok) {
      const resp = await response.json();
      return resp.message;
    } else {
      const errorResp = await response.json();
      throw new Error('Error when deleting team: ' + errorResp.message);
    }
  }

  static async getTeamMembers(teamId: string, token: string) {
    const response = await fetch('/api/team/get_members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ team_id: teamId }),
    });

    if (response.ok) {
      const resp = await response.json();
      return resp.data;
    } else {
      const errorResp = await response.json();
      throw new Error('Error when getting team members: ' + errorResp.message);
    }
  }

  static async setAdmin(teamId: string, memberId: string, token: string) {
    const response = await fetch('/api/team/add_admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ team_id: teamId, member_id: memberId }),
    });

    if (response.ok) {
      const resp = await response.json();
      return resp.message;
    } else {
      const errorResp = await response.json();
      throw new Error('Error when setting admin: ' + errorResp.message);
    }
  }

  static async removeAdmin(teamId: string, memberId: string, token: string) {
    const response = await fetch('/api/team/remove_admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ team_id: teamId, member_id: memberId }),
    });

    if (response.ok) {
      const resp = await response.json();
      return resp.message;
    } else {
      const errorResp = await response.json();
      throw new Error('Error when removing admin: ' + errorResp.message);
    }
  }

  static async generateInviteCode(teamId: string, disable: boolean, isFree: boolean, token: string) {
    const response = await fetch('/api/team/invite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ team_id: teamId, disable, is_free: isFree }),
    });

    if (response.ok) {
      const resp = await response.json();
      return resp.code;
    } else {
      const errorResp = await response.json();
      throw new Error('Error when generating invite code: ' + errorResp.message);
    }
  }

  static async joinTeam(inviteCode: string, token: string) {
    const response = await fetch('/api/team/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ invite_code: inviteCode }),
    });

    if (response.ok) {
      const resp = await response.json();
      return resp.message;
    } else {
      const errorResp = await response.json();
      throw new Error('Error when joining team: ' + errorResp.message);
    }
  }

  static async leaveTeam(teamId: string, token: string) {
    const response = await fetch('/api/team/leave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ team_id: teamId }),
    });

    if (response.ok) {
      const resp = await response.json();
      return resp.message;
    } else {
      const errorResp = await response.json();
      throw new Error('Error when leaving team: ' + errorResp.message);
    }
  }

  static async createFolder(teamId: string, folderType: string, folderName: string, token: string) {
    const response = await fetch('/api/team_folder/manage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ team_id: teamId, action: 'create', folder_type: folderType, folder_name: folderName }),
    });

    if (response.ok) {
      const resp = await response.json();
      return resp.message;
    } else {
      const errorResp = await response.json();
      throw new Error('Error when creating folder: ' + errorResp.message);
    }
  }

  static async deleteFolder(teamId: string, folderType: string, folderId: string, token: string) {
    const response = await fetch('/api/team_folder/manage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ team_id: teamId, action: 'delete', folder_type: folderType, folder_id: folderId }),
    });

    if (response.ok) {
      const resp = await response.json();
      return resp.message;
    } else {
      const errorResp = await response.json();
      throw new Error('Error when deleting folder: ' + errorResp.message);
    }
  }

  static async renameFolder(teamId: string, folderType: string, folderId: string, newFolderName: string, token: string) {
    const response = await fetch('/api/team_folder/manage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ team_id: teamId, action: 'change_name', folder_type: folderType, folder_id: folderId, folder_name: newFolderName }),
    });

    if (response.ok) {
      const resp = await response.json();
      return resp.message;
    } else {
      const errorResp = await response.json();
      throw new Error('Error when renaming folder: ' + errorResp.message);
    }
  }

  static async moveProjectToFolder(teamId: string, itemId: string, token: string) {
    const response = await fetch('/api/team_folder/manage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ team_id: teamId, action: 'move', folder_type: 'project', item_id: itemId }),
    });

    if (response.ok) {
      const resp = await response.json();
      return resp.message;
    } else {
      const errorResp = await response.json();
      throw new Error('Error when moving project to folder: ' + errorResp.message);
    }
  }

  static async getUserTeams(token: string) {
    if (!token) {
      throw new Error('Token is missing')
    }

    const response = await fetch('/api/team/get_user_teams', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const resp = await response.json();
      return resp.data;
    } else {
      const errorResp = await response.json();
      throw new Error('Error when getting user teams: ' + errorResp.message);
    }
  }

  static async getTeamProjects(teamId: string, token: string) {
    const response = await fetch('/api/team/get_team_projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ team_id: teamId }),
    });

    if (response.ok) {
      const resp = await response.json();
      return {
        projects: resp.projects,
        empty_groups: resp.empty_groups,
      };
    } else {
      const errorResp = await response.json();
      throw new Error('Error when getting team projects: ' + errorResp.message);
    }
  }

  static async manageGroupAccess(teamId: string, folderId: string, folderType: string, shared: string, token: string) {
    const response = await fetch('/api/group_access/manage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ team_id: teamId, folder_id: folderId, folder_type: folderType, shared }),
    });

    if (response.ok) {
      const resp = await response.json();
      return resp.message;
    } else {
      const errorResp = await response.json();
      throw new Error('Error when managing group access: ' + errorResp.message);
    }
  }

  static async removeMember(teamId: string, memberId: string, token: string) {
    const response = await fetch('/api/team/remove_member', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ team_id: teamId, member_id: memberId }),
    });

    if (response.ok) {
      const resp = await response.json();
      return resp.message;
    } else {
      const errorResp = await response.json();
      throw new Error('Error when removing member: ' + errorResp.message);
    }
  }

  static async getTeamDetails(teamId: string, token: string) {
    const response = await fetch('/api/team/get_team_details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ team_id: teamId }),
    });

    if (response.ok) {
      const resp = await response.json();
      return resp.data;
    } else {
      const errorResp = await response.json();
      throw new Error('Error when getting team details: ' + errorResp.message);
    }
  }

  static async changeProjectType(projectId: string, action: string, token: string, teamId?: string) {
    const response = await fetch('/api/team/change_project_type', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ project_id: projectId, action, team_id: teamId }),
    });

    if (response.ok) {
      const resp = await response.json();
      return {
        status: resp.status,
        message: resp.message,
      };
    } else {
      const errorResp = await response.json();
      throw new Error('Error when changing project type: ' + errorResp.message);
    }
  }

}
