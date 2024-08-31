


export type IQuota = {
    userId: number;
    type: QuotaTypes;
    limit: number;
    used: number;
    isResettable: boolean;
    resetFrequency: 'DAILY' | 'MONTHLY' | 'WEEKLY' | 'NONE';
    lastResetTimestamp: Date;
}

enum QuotaTypes {
    AI
}