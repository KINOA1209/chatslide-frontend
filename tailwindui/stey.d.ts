export enum SdkMode {
	production = "production",
	debug = "debug",
}

export interface UserViewUser {
	uid?: string | number;
	info?: Record<string, string | number>;
}

export interface UserViewOptions {
	userInfo?: UserViewUser;
	config?: {
		mode?: SdkMode;
	};
}

export interface UserView {
	/**
	 * 初始化 SDK
	 * @param projectKey 项目 id
	 * @param options 可选配置
	 */
	initialize: (projectKey: string, options?: UserViewOptions) => void;
	identify: (user?: UserViewUser) => void;
	quicklyClose?: () => {
		sessionId: number;
		streamId: string;
		projectId: string;
	};
	setMode?: (mode: SdkMode) => void;
}

declare global {
	interface Window {
		steyAIRecord: UserView;
	}
}
