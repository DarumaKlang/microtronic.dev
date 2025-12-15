/**
 * Web3 Protocol-Agnostic Interface
 * ออกแบบตามหลัก Interface Segregation Principle (ISP)
 * เพื่อรองรับการเชื่อมต่อกับ Wallet หลากหลายรูปแบบ (Lightning, WebAuthn, FIDO2) 
 * โดยไม่ผูกติดกับ Implementation เฉพาะเจาะจง
 */

export interface WalletConnection {
    connect(): Promise<WalletSession>;
    disconnect(): Promise<void>;
    isConnected(): boolean;
    getAddress(): string | null;
}

export interface WalletSession {
    sessionId: string;
    address: string;
    protocol: 'LND' | 'LNbits' | 'WebAuthn' | 'Ethereum' | 'Mock';
}

export interface PaymentProvider {
    createInvoice(amount: number, description: string): Promise<PaymentInvoice>;
    checkPaymentStatus(paymentHash: string): Promise<PaymentStatus>;
}

export interface PaymentInvoice {
    paymentRequest: string; // Bolt11 or equivalent
    paymentHash: string;
    amount: number;
}

export type PaymentStatus = 'PENDING' | 'PAID' | 'EXPIRED' | 'FAILED';

// Example Mock Implementation structure (to be replaced with real libraries later)
export class MockWalletService implements WalletConnection {
    private connected: boolean = false;

    async connect(): Promise<WalletSession> {
        this.connected = true;
        return {
            sessionId: 'mock-session-123',
            address: 'mock-address-xyz',
            protocol: 'Mock'
        };
    }

    async disconnect(): Promise<void> {
        this.connected = false;
    }

    isConnected(): boolean {
        return this.connected;
    }

    getAddress(): string | null {
        return this.connected ? 'mock-address-xyz' : null;
    }
}
