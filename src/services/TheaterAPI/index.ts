import axios, { AxiosInstance } from "axios";
import { environmentConfig } from "../../config/";

export default class TheaterAPI {

    private http: AxiosInstance;

    constructor(sessionId: string) {
        this.http = axios.create({
            baseURL: `http://${environmentConfig.THEATER_API_HOST}:${environmentConfig.THEATER_API_PORT}/api/v1/`,
            headers: {TheaterSID: sessionId}
        });
    }

    public async isSubscriptionValid(): Promise<boolean> {
        try {
            await this.http.get("users/subscription");
            return true;
        } catch (error) {
            return false;
        }
    }
}