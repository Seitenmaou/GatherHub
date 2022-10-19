//all routes not listed will lead here

function Error404() {
    return (
        <main>
            <h1>404: PAGE NOT FOUND</h1>
            <p>Nothing at this address!</p>
            <a href='/gatherhub'>
                <button className="btn btn-primary">To GatherHub!</button>
            </a>
        </main>
    );
}

export default Error404;