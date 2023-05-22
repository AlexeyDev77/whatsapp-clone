class GreenApiService {

    getInstanceStatus = async (idInstance, token) => {
        let url = `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${token}`
        let res = await fetch(url);

        if (res.status !== 200) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getNotification = async (idInstance, token) => {
        let url = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${token}`
        let res = await fetch(url);

        if (res.status !== 200) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    deleteNotification = async (idInstance, token, idNotification) => {
        let url = `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${token}/${idNotification}`
        let res = await fetch(url, {method: "delete"});

        if (res.status !== 200) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    sendMessage = async (idInstance, token, body) => {
        let url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${token}`
        let res = await fetch(url, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })

        if (res.status !== 200) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }
}

export default GreenApiService;