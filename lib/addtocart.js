export const addtocart = async (productId, action) => {
    try {
        const res = await fetch("/api/update-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId,
                action,
                quantity: 1
            }),
        })
        const response = await res.json();
        console.log(response)
        if(!res.ok){
            console.log(err, data.error)
            throw new Error(data.error || "server error")
        }
        return response;
    }
    catch(err){
        console.log(err, "error hai")
    }
}