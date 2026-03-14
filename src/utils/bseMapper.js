/**
 * Converts a date string (any format parseable by Date) into DD/MM/YYYY as required by BSE StAR MF 2.0.
 * @param {string} dateStr
 * @returns {string}
 */
const formatDOB = (dateStr) => {
  const d = new Date(dateStr);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

/**
 * Maps a validated frontend signup payload to the BSE StAR MF 2.0 request body.
 * @param {Object} frontendPayload - Validated data from signupSchema
 * @returns {Object} BSE-formatted request body
 */
const mapToBSEPayload = (frontendPayload) => {
  const {
    fullName,
    panNumber,
    dateOfBirth,
    email,
    mobile,
    gender = "M",
    address = "",
    city = "",
    state = "",
    pincode = "",
    country = "IN",
    occupation = "01",
    testError = false,
  } = frontendPayload;

  return {
    client_name: fullName.trim(),
    pan_no: panNumber.toUpperCase(),
    dob: formatDOB(dateOfBirth),
    email_id: email.toLowerCase(),
    mobile_no: mobile,
    gender,
    address,
    city,
    state,
    pin_code: pincode,
    country,
    occ_code: occupation,
    holding_nature: "SI",
    tax_status: "01",
    test_error: testError,
  };
};

/**
 * Formats the order amount to two decimal places.
 * @param {number} amount 
 * @returns {string}
 */
const formatOrderAmount = (amount) => {
  return Number(amount).toFixed(2);
};

/**
 * Maps the frontend order payload to the BSE StAR MF 2.0 order request body.
 * @param {Object} frontendPayload - Validated data from orderSchema
 * @param {string} clientRefNo - Unique reference number for the order
 * @returns {Object} BSE-formatted order request body
 */
const mapToBSEOrderPayload = (frontendPayload, clientRefNo) => {
  const { fundIsin, investmentAmount, folioNumber = "" } = frontendPayload;

  return {
    client_ref_no: clientRefNo,
    isin_growth: fundIsin.trim(),
    buy_val: formatOrderAmount(investmentAmount),
    folio_no: folioNumber.trim(),
    order_type: "P",
    buy_qty: "",
  };
};

export { mapToBSEPayload, mapToBSEOrderPayload };
