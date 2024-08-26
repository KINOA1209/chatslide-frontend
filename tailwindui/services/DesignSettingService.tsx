export default class DesignSettingsService {
    static async createDesignSettings(data: any, token: string) {
        const response = await fetch('/api/design/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const resp = await response.json();
            return resp;
        } else {
            const errorResp = await response.json();
            throw new Error('Error when creating design settings: ' + errorResp.message);
        }
    }

    static async getDesignSettings(token: string) {
        if (!token) {
            throw new Error('No token provided');
        }

        const response = await fetch(`/api/design/load`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const resp = await response.json();
            return resp;
        } else {
            throw new Error('Error fetching design settings: ' + response.statusText);
        }
    }
}
