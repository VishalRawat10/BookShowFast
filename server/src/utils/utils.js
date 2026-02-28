export const generateOTP = (noOfDigits = 6) => {
    return Math.floor(10 ** noOfDigits * Math.random()).toString();
}