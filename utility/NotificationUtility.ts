export const GenerateOtp = () => {

    const otp = Math.floor(10000 + Math.random() * 900000);
    let expiry: Date = new Date();
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000));

    return {otp, expiry};
}

export const onRequestOTP = async(otp: number, toPhoneNumber: string) => {

    const accountSid = "ACa637aa1d24f565b585ff37f75429294a";
    const authToken = "3805ca16f4694d0aa67c32f9424c8ebc";
    const client = require('twilio')(accountSid, authToken);

    const response = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: '+14696091298',
        to: `+91${toPhoneNumber}` // recipient phone number // Add country before the number
    })

    return response;
}