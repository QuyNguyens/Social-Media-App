export async function GET(){

    try {

        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/Post/posts`;
    
        const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
        });

        const result = await res.json();

        return Response.json(result);
    } catch (error) {
        console.error(error);
        return Response.json({error: "Internal server error"}, {status: 500})
    }
}