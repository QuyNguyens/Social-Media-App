"use client"

function isTokenExpired(expiryDateStr : string) : boolean {
    const expiryDate = new Date(expiryDateStr);
    const currentDate = new Date();

    return currentDate > expiryDate;
}

export const validateRequest = async () => {

    const accessToken = localStorage.getItem("access_token") ?? null;
    const expireDay = localStorage.getItem("expire_day") ?? null;

    if (!accessToken || expireDay == null || isTokenExpired(expireDay)) {
        return {};
    }

    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/User/loginToken`
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(accessToken)
        })

        if(res.ok){
            return await res.json();
        }

        return {};

    } catch (error) {
        console.error("Token validation error:", error);
        return {};
    }   
};

