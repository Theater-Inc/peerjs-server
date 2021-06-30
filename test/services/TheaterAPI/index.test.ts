import TheaterAPI from "../../../src/services/TheaterAPI";
import axios, { AxiosInstance } from "axios";


describe("TheaterAPI", () => {
    it("should initialize the http member, base url, and request headers", () => {
        const sessionId = "not-a-real-session-id";
        const theaterApi: TheaterAPI = new TheaterAPI(sessionId);
        const axiosInstance: AxiosInstance = theaterApi['http'];
        expect(axiosInstance).toBeTruthy();
        expect(axiosInstance.defaults.baseURL).toMatch(/http:\/\/.*\/api\/v1/);
        expect(axiosInstance.defaults.headers.TheaterSID).toBe(sessionId);
    })
})