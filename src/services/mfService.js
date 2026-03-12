import axios from "axios";

class MutualFundService {
  constructor() {
    this.baseURL = "https://api.mfapi.in";
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  /**
   * Search mutual funds by query
   * @param {string} query - Search query
   * @returns {Promise<Array>} Raw search results from API
   */
  async searchMutualFunds(query) {
    try {
      const response = await this.client.get(`/mf/search`, {
        params: { q: query },
      });

      return response.data;
    } catch (error) {
      const apiError = new Error("Failed to fetch search results");

      apiError.statusCode = error.response?.status || 500;
      apiError.originalError = error;

      throw apiError;
    }
  }

  /**
   * Get latest NAV for a scheme
   * @param {string} schemeCode - Mutual fund scheme code
   * @returns {Promise<Object>} Raw latest NAV data from API
   */
  async getLatestNAV(schemeCode) {
    try {
      const response = await this.client.get(`/mf/${schemeCode}/latest`);
      return response.data;
    } catch (error) {
      const apiError = new Error("Failed to fetch latest NAV data");

      apiError.statusCode = error.response?.status || 500;
      apiError.originalError = error;

      throw apiError;
    }
  }

  /**
   * Get historical NAV data for a scheme
   * @param {string} schemeCode - Mutual fund scheme code
   * @param {string} startDate - Start date (optional)
   * @param {string} endDate - End date (optional)
   * @returns {Promise<Object>} Raw historical NAV data from API
   */
  async getHistoricalNAV(schemeCode, startDate, endDate) {
    try {
      const params = {};

      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response = await this.client.get(`/mf/${schemeCode}`, { params });
      return response.data;
    } catch (error) {
      const apiError = new Error("Failed to fetch historical NAV data");

      apiError.statusCode = error.response?.status || 500;
      apiError.originalError = error;

      throw apiError;
    }
  }
}

export default MutualFundService;
