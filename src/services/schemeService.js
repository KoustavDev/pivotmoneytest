import { simulateApiCallDelay } from "../utils/apiCallDelaySimulator.js";

class SchemeService {
  /**
   * Get scheme details from a mock raw BSE-like response
   * @param {string} schemeCode - Mutual fund scheme code
   * @returns {Promise<Object>} Raw scheme details in BSE response style
   */
  async getSchemeDetails(schemeCode) {
    // simulating api call delay
    await simulateApiCallDelay(1, 3);
    return {
      scheme_code: schemeCode,
      scheme_name: "Axis Bluechip Fund Direct Growth",
      isin_no: "INF846K01DP8",
      category_name: "Equity - Large Cap",
      amc_code: "AMC001",
      sip_allowed_flag: "Y",
      amc_active_flag: "Y",
      stp_in_flag: "N",
      rta_code: "CAMS",
      reopen_date: "2026-03-20",
    };
  }
}

export default SchemeService;
