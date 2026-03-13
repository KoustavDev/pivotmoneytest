// Serializer for search results
// Extracts only schemeCode and schemeName from raw API response
const serializeSearchResults = (rawData) => {
  if (!Array.isArray(rawData)) {
    return [];
  }

  return rawData.map((item) => ({
    schemeCode: item.schemeCode,
    schemeName: item.schemeName,
  }));
};

// Serializer for latest NAV data
// Extracts only schemeName, schemeCode, latestNav, and date

const serializeLatestNAV = (rawData) => {
  if (!rawData || !rawData.data || rawData.data.length === 0) {
    throw new Error("No NAV data available for this scheme");
  }

  const latestData = rawData.data[0]; // Latest entry is typically the first one

  return {
    schemeName: rawData.meta?.scheme_name || "",
    schemeCode: rawData.meta?.scheme_code || "",
    latestNav: parseFloat(latestData.nav) || 0,
    date: latestData.date || "",
  };
};

// Serializer for historical NAV data
// Returns array of NAV data points with date and nav value

const serializeHistoricalNAV = (rawData) => {
  if (!rawData || !rawData.data || !Array.isArray(rawData.data)) {
    return {
      schemeName: "",
      schemeCode: "",
      data: [],
    };
  }

  return {
    schemeName: rawData.meta?.scheme_name || "",
    schemeCode: rawData.meta?.scheme_code || "",
    data: rawData.data.map((item) => ({
      date: item.date,
      nav: parseFloat(item.nav) || 0,
    })),
  };
};

// Serializer for scheme details
// Maps raw BSE-style keys to frontend-safe response shape
const serializeSchemeResponse = (rawData) => {
  if (!rawData) {
    return {
      schemeName: "",
      isin: "",
      category: "",
      amcCode: "",
      isSipAllowed: false,
    };
  }

  return {
    schemeName: rawData.scheme_name || "",
    isin: rawData.isin_no || "",
    category: rawData.category_name || "",
    amcCode: rawData.amc_code || "",
    isSipAllowed: rawData.sip_allowed_flag === "Y",
  };
};

export {
  serializeSearchResults,
  serializeLatestNAV,
  serializeHistoricalNAV,
  serializeSchemeResponse,
};
