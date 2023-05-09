import {io} from "socket.io-client";
import Cookies from "js-cookie";

const wsEndpoint = process.env.REACT_APP_WS_URL ?? "";

/**
 * class WS
 */
export class WS {
    private static client: any = null
    private static status: number = 0
    private static token: string = Cookies.get('token') ?? ''

    static async w4(time = 50) {
        await setTimeout(() => {}, time)
    }

    /**
     * Get Socket
     */
    static async getSocket() {
        if (this.status) {
            await this.w4()
            await this.getSocket()
        }

        if (this.client !== null) {
            return this.client;
        }

        this.status = 1

        this.client = await io(wsEndpoint, {
            reconnection: true,
            reconnectionDelay: 500,
            extraHeaders: {
                Authorization: `${this.token}`
            },
        });

        this.status = 0;

        return this.client
    }

    /**
     * Reconnect socket
     * @param token
     */
    static async reconnectSocket(token: string) {
        this.token = token
        this.client = await io(wsEndpoint, {
            reconnection: true,
            reconnectionDelay: 500,
            extraHeaders: {
                Authorization: `${this.token}`
            },
        });
    }
}
