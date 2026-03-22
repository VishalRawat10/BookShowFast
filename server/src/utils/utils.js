export const generateOTP = (noOfDigits = 6) => {
    return Math.floor(10 ** (noOfDigits - 1) * (Math.random() + 1)).toString();
}

export const getSafeUser = (user) => {
    if (typeof user !== "object") {
        user = user.toObject();
    }

    const safeUser = {
        email: user.email || null,
        phone: user.phone || null,
        name: user.name || null,
        role: user.role || null,
        isProfileComplete: user.isProfileComplete
    }
    return safeUser;
}