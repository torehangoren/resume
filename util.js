export function getJSON(model, fnSuccess, fnError) {
    fetch(model)
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            if (fnSuccess) {
                fnSuccess(data);
            }
        }
            // getEducationItems(data)
        ).catch((error) => {
            console.error("Unable to fetch data:", error)

            if (fnError) {
                fnError(error);
            }
        }
        );


}