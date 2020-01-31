const reservationForm = async (id) => {
    let availableSpots = 0;
    const checkAvailableSpots = async () => {
       let dataArr = [];       
       await fetch("/api/meals?availableReservations=true")
           .then(response => response.json())
           .then(data => dataArr = data.filter(meal => meal.id == id));

        if (dataArr.length > 0) availableSpots = dataArr[0].max_guests - dataArr[0].number_of_guests;
        
        return dataArr.length > 0 && dataArr[0].number_of_guests < dataArr[0].max_guests;
   }

    if (await checkAvailableSpots()) {
        const root = document.getElementById("root");
        const sectionForm = document.createElement("section");
        sectionForm.className = "reservation";
        root.append(sectionForm);
        // a form for making a reservation for that meal The form should have phonenumber, name and email
        sectionForm.innerHTML = `
           <form id="reservation-form">
                <h3>Reserve a spot</h3>
                <label>Name: &#42;</label>
                <input type="text" name="name" placeholder="Enter your name" id="name" pattern="[A-Za-z]+$" required/>
                
                <label>Email: &#42;</label>
                <input type="email" name="email" placeholder="Enter your email" id="email" required/>
                
                <label>Phonenumber: &#42;</label>
                <input type="tel" name="phone-number" placeholder="Enter your phonenumber" id="phone-number" pattern="[0-9]{8}" required/>
    
                <label>How many guests? (max ${availableSpots}) &#42;</label>
                <input type="number" name="number-of-guests" id="number-of-guests" min="1" max="${availableSpots}" required/>
               
                <input type="submit" value="Reserve" id="submit" />
                <p id="response"></p>
            </form>
        `;
        
        const submit = document.getElementById("submit");
        
        const fetchPostData = () => {
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phoneNumber = document.getElementById("phone-number").value;
            const numberGuests = document.getElementById("number-of-guests").value;
        
            const data = {
                name,
                email,
                phone_number: phoneNumber,
                number_of_guests: numberGuests,
                meals_id: id
            }
    
            if (name && email && phoneNumber && numberGuests) {
                console.log(data);
                fetch("/api/reservations", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.text())
                    .then(text => {
                        const response = document.getElementById("response");
                        response.innerHTML = text;
                    });
            }
        }
    
        submit.addEventListener("click", (e) => {
            e.preventDefault();
            if (!document.getElementById("reservation-form").checkValidity()) {
                document.getElementById("reservation-form").className = "invalid";
                return;
            }
            else fetchPostData();
            setTimeout(() => window.open("/meals"), 3000);
        });     
    } else {
        const mealTile = document.querySelector("div.meal-tile");
        const divBadge = document.createElement("div");
        mealTile.append(divBadge);
        divBadge.className = "badge";
        divBadge.innerHTML = `<img src="/public/images/sold-out.png" alt="Sold Out" />`;
    }
}    

export { reservationForm };