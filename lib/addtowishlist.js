export const addtowishlist = async (productId, action) => {
    try {
        console.log(action)
        const res = await fetch("/api/update-wishlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId,
                action
            }),
        })
        const data = await res.json();
        console.log("data added / removed")
        if(!res.ok){
            console.log(err, data.error)
            throw new Error(data.error || "server error")
        }
        return data;
    }
    catch(err){
        console.log(err, "error hai")
    }
}